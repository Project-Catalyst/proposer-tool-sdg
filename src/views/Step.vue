<template>
  <div class="step">
    <step-sdg-home
      v-if="step === 1"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedMetrics="selectedMetrics"
      @begin-sdg="goNext"
    />
    <step-sdg-goals
      v-if="step === 2"
      :selectedGoals="selectedGoals"
      @select-goal="selectGoal"
      @unselect-goal="unselectGoal" 
    />
    <step-sdg-subgoals
      v-if="step === 3"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      @select-subgoal="selectSubgoal"
      @unselect-subgoal="unselectSubgoal" 
    />
    <step-sdg-kpi
      v-if="step === 4"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedMetrics="selectedMetrics"
      @set-metric="setMetric" 
    />
    <step-uhri-home
      v-if="step === 5"
      :substepsIndex="subSteps.uhriSelection"
      :selectedGoals="selectedGoals"
      :selectedIndexes="selectedIndexes"
      @unselect-uhri="unselectIndex" 
    />
    <step-uhri-filters
      v-if="step === 6"
      :searchIndex="subSteps.uhriSelection.search"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedFilters="selectedFilters"
      :selectedIndexes="selectedIndexes"
      @select-filter="selectFilter"
      @unselect-filter="unselectFilter" 
    />
    <step-uhri-search
      v-if="step === 7"
      :filterIndex="subSteps.uhriSelection.filters"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedFilters="selectedFilters"
      :selectedIndexes="selectedIndexes"
      @set-uhri="setIndex"
    />
    <step-phdi-home
      v-if="step === 8"
      :selectedPhdi="selectedPhdi"
      :hasPhdiImage="hasPhdiImage"
      @set-phdi="setPhdi"
      @set-phdi-image="setPhdiImage"
    />
    <selection-summary
      v-if="step === 9"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedMetrics="selectedMetrics"
      :selectedIndexes="selectedIndexes"
      :selectedPhdi="selectedPhdi"
      :hasPhdiImage="hasPhdiImage"
    />
    <div class="container is-flex buttons mt-4">
      <b-button
        @click="goBack"
        v-if="step > 1"
        :disabled="!backAvailable"
        type="is-primary is-large">{{ backButton }}</b-button>
      <b-button
        @click="goNext"
        v-if="isSdgSubstep"
        :disabled="!nextAvailable"
        type="is-primary is-large">{{ nextButton }}</b-button>
      <b-button
        @click="SkipSelection"
        v-if="isHomeSelection && !isHomePhdi"
        type="is-primary is-large">{{ skipButtonMsg }}</b-button>
      <b-button
        @click="goFinish"
        v-if="isHomePhdi"
        type="is-primary is-light is-large" outlined> {{ finishButtonMsg }}</b-button>
    </div>
    <div class="container buttons mt-4">
      <b-button
        @click="reset"
        class="is-danger is-light"
        v-if="this.selectedGoals.length > 0"
        type="is-primary">Reset all selections</b-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from "vuex";

import StepSdgHome from "@/components/steps/StepSdgHome"
import StepSdgGoals from "@/components/steps/StepSdgGoals"
import StepSdgSubgoals from "@/components/steps/StepSdgSubgoals"
import StepSdgKpi from "@/components/steps/StepSdgKpi"
import StepUhriHome from "@/components/steps/StepUhriHome"
import StepUhriFilters from "@/components/steps/StepUhriFilters"
import StepUhriSearch from "@/components/steps/StepUhriSearch"
import StepPhdiHome from "@/components/steps/StepPhdiHome"
import SelectionSummary from "@/components/steps/SelectionSummary"

export default {
  name: 'Step',
  components: {
    StepSdgHome,
    StepSdgGoals,
    StepSdgSubgoals,
    StepSdgKpi,
    StepUhriHome,
    StepUhriFilters,
    StepUhriSearch,
    StepPhdiHome,
    SelectionSummary
  },
  data() {
    return {
      mainSteps: {
        sdgStep: 1,
        uhriStep: 5,
        phdiStep: 8,
        summaryStep: 9,
      },
      subSteps: {
        sdgSelection: {
          goals: 2,
          subgoals: 3,
          metrics: 4
        },
        uhriSelection: {
          filters: 6,
          search: 7
        },
      }
    }
  },
  methods: {
    selectGoal(goals) {
      goals.forEach((goal) => {
        if (this.selectedGoals.indexOf(goal) > -1) {
          this.$buefy.notification.open({
            message: this.$t('general.GOAL_ALREADY_SELECTED', { title: goal.title }),
            type: 'is-primary',
            position: 'is-bottom-right'
          })
        }
        this.$store.commit('goals/addGoal', goal)
      })
    },
    unselectGoal(goal) {
      this.$store.commit('goals/removeGoal', goal)
      // remove child subgoals
      if (this.selectedSubgoals.length > 0) {
        let unselec_sgoals = this.selectedSubgoals.filter((sgoal) => sgoal.SdgGoalId === goal.id)
        unselec_sgoals.forEach(sgoal => {
          this.unselectSubgoal(sgoal)
        });
      }
    },
    selectSubgoal(subgoals) {
      subgoals.forEach((subgoal) => {
        this.$store.commit('goals/addSubgoal', subgoal)
      })
    },
    unselectSubgoal(subgoal) {
      this.$store.commit('goals/removeSubgoal', subgoal)
      // remove child metrics
      if (this.selectedMetrics.length > 0) {
        let unselec_metrics = this.selectedMetrics.filter((metric) => metric.SubgoalId === subgoal.id)
        unselec_metrics.forEach(metric => {
          this.removeMetric(metric)
        });
      }
    },
    setMetric(metrics) {
      this.$store.commit('goals/setMetrics', metrics)
    },
    removeMetric(metric){
      this.$store.commit('goals/removeMetric', metric)
    },
    setIndex(uhris) {
      this.$store.commit('goals/setIndexes', uhris)
    },
    unselectIndex(uhri) {
      this.$store.commit('goals/removeIndex', uhri)
    },
    setPhdi(index) {
      this.$store.commit('goals/setPhdiIndex', index)
      if(!index) {
        this.$store.commit('goals/setPhdiImage', false)
      }
    },
    setPhdiImage(value) {
      this.$store.commit('goals/setPhdiImage', value)
    },
    selectFilter(key, value) {
      this.$store.commit('goals/addFilter', [key, value])
    },
    unselectFilter(key, value) {
      this.$store.commit('goals/removeFilter', [key, value])
    },
    goBack() {
      if (this.backAvailable) {
        if (this.isHomeUhri) {
          this.$router.push({ name: "step", params: { step: (this.mainSteps.sdgStep)} })
        }
        else if (this.isUhriSubstep ){
          this.$router.push({ name: "step", params: { step: (this.mainSteps.uhriStep)} })
        }
        else if (this.isHomePhdi) {
          this.$router.push({ name: "step", params: { step: (this.mainSteps.uhriStep)} })
        } 
        else {
          this.$router.push({ name: "step", params: { step: (this.step - 1)} })
        }
      }
    },
    goNext() {
      if (this.nextAvailable) {
        if (this.isSdgMetrics) {
          this.$router.push({ name: "step", params: { step: (this.mainSteps.sdgStep)} })  
        }
        else if (this.isHomeUhri && (this.selectedFilters.country.length === 0) ){
          this.$router.push({ name: "step", params: { step: (this.mainSteps.uhriStep + 1)} })  
        } else if (this.isHomeUhri && (this.selectedFilters.country.length > 0) ){
          this.$router.push({ name: "step", params: { step: (this.mainSteps.uhriStep + 2)} })  
        } else {
          this.$router.push({ name: "step", params: { step: (this.step + 1)} })
        }
      }
    },
    SkipSelection() {
      if(this.isHomeSdg) {
        this.$router.push({ name: "step", params: { step: (this.mainSteps.uhriStep)} })  
      }
      else if (this.isHomeUhri) {
        this.$router.push({ name: "step", params: { step: (this.mainSteps.phdiStep)} })
      }
      else if (this.isHomePhdi) {
        this.$router.push({ name: "step", params: { step: (this.mainSteps.summaryStep)} })
      }
    },
    goFinish() {
      this.$router.push({ name: "step", params: { step: this.maxSteps} })
    },
    reset() {
      this.$buefy.dialog.confirm({
        message: 'Do you want to start the process from the beginning? Your current progress will be lost.',
        confirmText: 'Reset progress',
        closeOnConfirm: true,
        cancelText: 'Cancel',
        onConfirm: () => {
          this.$buefy.toast.open(`Storage cleared!`)
          this.$store.commit('goals/resetState')
          this.$router.push({ name: "step", params: { step: 1} })
        }
      })
    },
  },
  computed: {
    ...mapState({
      selectedGoals: (state) => state.goals.selectedGoals,
      selectedSubgoals: (state) => state.goals.selectedSubgoals,
      selectedMetrics: (state) => state.goals.selectedMetrics,
      selectedFilters: (state) => state.goals.selectedFilters,
      selectedIndexes: (state) => state.goals.selectedIndexes,
      selectedPhdi: (state) => state.goals.selectedPhdi,
      hasPhdiImage: (state) => state.goals.hasPhdiImage
    }),
    maxSteps() {
      return this.mainSteps.summaryStep
    },
    step() {
      if (this.$route) {
        return parseInt(this.$route.params.step)
      }
      return 1
    },
    isHomeSelection() {
      return (this.step===this.mainSteps.sdgStep) || 
             (this.step===this.mainSteps.uhriStep) || 
             (this.step===this.mainSteps.phdiStep)
    },
    isHomeSdg() {
      return this.step===this.mainSteps.sdgStep
    },
    isSdgSubstep() {
      return Object.values(this.subSteps.sdgSelection).includes(this.step)
    },
    isSdgGoals() {
      return this.step===this.subSteps.sdgSelection.goals
    },
    isSdgSubgoals() {
      return this.step===this.subSteps.sdgSelection.subgoals
    },
    isSdgMetrics() {
      return this.step===this.subSteps.sdgSelection.metrics
    },
    isHomeUhri() {
      return this.step===this.mainSteps.uhriStep
    },
    isUhriSubstep() {
      return Object.values(this.subSteps.uhriSelection).includes(this.step)
    },
    isUhriFilter() {
      return this.step===this.subSteps.uhriSelection.filters
    },
    isUhriSearch() {
      return this.step===this.subSteps.uhriSelection.search
    },
    isHomePhdi() {
      return this.step===this.mainSteps.phdiStep
    },
    isSummary() {
      return this.step===this.mainSteps.summaryStep
    },
    backAvailable() {
      return this.step > 1
    },
    nextAvailable() {
      if (this.step === this.maxSteps ) {
        return false
      }
      if(this.isSdgGoals && this.selectedGoals.length===0) {
        return false
      } 
      if(this.isSdgSubgoals && this.selectedSubgoals.length===0) {
        return false
      }
      return true
    },
    skipButtonMsg() {
      let section = '';
      if(this.isHomeSdg) {section = "SDG"} 
      else if (this.isHomeUhri) {section = "UHRI"}
      else if (this.isHomePhdi) {section = "PHDI"}
      return `Skip ${section}`
    },
    nextButton() {
      if(this.isSdgMetrics) {
        return 'Finish selection'
      }
      return 'Next'
    },
    backButton(){
      if(this.isSdgGoals || this.isUhriSubstep) { return 'Close selection' }
      return 'Back'
    },
    finishButtonMsg() {
      return 'Finish process'
    }
  },
}
</script>
