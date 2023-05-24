<template>
  <div class="step">
    <step-sdg-home
      v-if="step === 1"
      @begin-sdg="goNext"
    />
    <step-sdg-goals
      v-if="step === 2"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
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
      :substepsIndex="subSteps.uhriRangeIndex"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedFilters="selectedFilters"
      :selectedIndexes="selectedIndexes"
      @unselect-uhri="unselectIndex" 
    />
    <step-uhri-filters
      v-if="step === 6"
      :searchIndex="subSteps.uhriRangeIndex.search"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedFilters="selectedFilters"
      :selectedIndexes="selectedIndexes"
      @select-filter="selectFilter"
      @unselect-filter="unselectFilter" 
    />
    <step-uhri-search
      v-if="step === 7"
      :filterIndex="subSteps.uhriRangeIndex.filters"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedFilters="selectedFilters"
      :selectedIndexes="selectedIndexes"
      @set-uhri="setIndex"
    />
    <step-phdi-home
      v-if="step === 8"
      :selectedPhdi="selectedPhdi"
      @select-phdi="setPhdi"
      @remove-phdi="removePhdi"
    />
    <selection-summary
      v-if="step === 9"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedMetrics="selectedMetrics"
      :selectedIndexes="selectedIndexes"
      :selectedPhdi="selectedPhdi"
    />
    <div class="container buttons mt-4">
      <b-button
        @click="goBack"
        v-if="step > 1"
        :disabled="!backAvailable"
        type="is-primary is-large">Back</b-button>
      <b-button
        @click="goNext"
        v-if="!isHomeSelection && step !== maxSteps"
        type="is-primary is-large">Next</b-button>
      <b-button
        @click="SkipSelection"
        v-if="isHomeSelection"
        type="is-primary is-large">{{ skipButtonMsg }}</b-button>
      <b-button style="float: right;"
        @click="goFinish"
        v-if="step !== maxSteps"
        type="is-primary is-light is-large" outlined>Go to summary</b-button>
    </div>
    <div class="container buttons mt-4">
      <b-button
        @click="reset"
        v-if="this.selectedGoals.length > 0"
        type="is-primary">Start from the beginning</b-button>
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
        sdgStepIndex: 1,
        uhriStepIndex: 5,
        phdiStepIndex: 8,
        summaryStepIndex: 9,
      },
      subSteps: {
        sdgRangeIndex: {
          goals: 2,
          subgoals: 3,
          kpi: 4
        },
        uhriRangeIndex: {
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
    },
    removePhdi(index) {
      this.$store.commit('goals/removePhdiIndex', index)
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
          this.$router.push({ name: "step", params: { step: (this.mainSteps.sdgStepIndex)} })
        }
        else if (this.isUhriSubstep ){
          this.$router.push({ name: "step", params: { step: (this.mainSteps.uhriStepIndex)} })
        }
        else if (this.isHomePhdi) {
          this.$router.push({ name: "step", params: { step: (this.mainSteps.uhriStepIndex)} })
        } 
        else {
          this.$router.push({ name: "step", params: { step: (this.step - 1)} })
        }
      }
    },
    goNext() {
      if (this.nextAvailable) {
        if (this.isHomeUhri && (this.selectedFilters.country.length === 0) ){
          this.$router.push({ name: "step", params: { step: (this.mainSteps.uhriStepIndex + 1)} })  
        } else if (this.isHomeUhri && (this.selectedFilters.country.length > 0) ){
          this.$router.push({ name: "step", params: { step: (this.mainSteps.uhriStepIndex + 2)} })  
        } else {
          this.$router.push({ name: "step", params: { step: (this.step + 1)} })
        }
      }
    },
    SkipSelection() {
      if(this.isHomeSdg) {
        this.$router.push({ name: "step", params: { step: (this.mainSteps.uhriStepIndex)} })  
      }
      else if (this.isHomeUhri) {
        this.$router.push({ name: "step", params: { step: (this.mainSteps.phdiStepIndex)} })
      }
      else if (this.isHomePhdi) {
        this.$router.push({ name: "step", params: { step: (this.mainSteps.summaryStepIndex)} })
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
    checkRouteConsistency(step) {
      if(step) {
        return
      }
      // if ((step === 2) && (this.selectedGoals.length === 0)) {
      //   this.$router.push({ name: "step", params: { step: 1} })
      // }
      // if ((step === 3) && (this.selectedSubgoals.length === 0)) {
      //   this.$router.push({ name: "step", params: { step: 2} })
      // }
    }
  },
  computed: {
    ...mapState({
      selectedGoals: (state) => state.goals.selectedGoals,
      selectedSubgoals: (state) => state.goals.selectedSubgoals,
      selectedMetrics: (state) => state.goals.selectedMetrics,
      selectedFilters: (state) => state.goals.selectedFilters,
      selectedIndexes: (state) => state.goals.selectedIndexes,
      selectedPhdi: (state) => state.goals.selectedPhdi
    }),
    maxSteps() {
      return this.mainSteps.summaryStepIndex
    },
    step() {
      if (this.$route) {
        return parseInt(this.$route.params.step)
      }
      return 1
    },
    isHomeSelection() {
      return (this.step===this.mainSteps.sdgStepIndex) || 
             (this.step===this.mainSteps.uhriStepIndex) || 
             (this.step===this.mainSteps.phdiStepIndex)
    },
    isHomeSdg() {
      return this.step===this.mainSteps.sdgStepIndex
    },
    isSdgSubstep() {
      return Object.values(this.subSteps.sdgRangeIndex).includes(this.step)
    },
    isHomeUhri() {
      return this.step===this.mainSteps.uhriStepIndex
    },
    isUhriSubstep() {
      return Object.values(this.subSteps.uhriRangeIndex).includes(this.step)
    },
    isHomePhdi() {
      return this.step===this.mainSteps.phdiStepIndex
    },
    isSummary() {
      return this.step===this.mainSteps.summaryStepIndex
    },
    backAvailable() {
      return this.step > 1
    },
    nextAvailable() {
      if (this.step === this.stepSdgGoals && this.selectedGoals.length === 0) {
        return false
      }
      // if (this.step === 2 && this.selectedSubgoals.length === 0) {
      //   return false
      // }
      if (this.step === this.maxSteps ) {
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
  },
  watch: {
    step(step) {
      this.checkRouteConsistency(step)
    }
  },
  mounted() {
    this.checkRouteConsistency(this.step)
  }
}
</script>
