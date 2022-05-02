<template>
  <div class="step">
    <step-a
      v-if="step === 1"
      :goals="goals"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      @select-goal="selectGoal"
      @unselect-goal="unselectGoal" 
    />
    <step-b
      v-if="step === 2"
      :goals="goals"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      @select-subgoal="selectSubgoal"
      @unselect-subgoal="unselectSubgoal" 
    />
    <step-c
      v-if="step === 3"
      :goals="goals"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedMetrics="selectedMetrics"
      @set-metric="setMetric" 
    />
    <step-d
      v-if="step === 4"
      :goals="goals"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedFilters="selectedFilters"
      @select-filter="selectFilter"
      @unselect-filter="unselectFilter" 
    />
    <step-e
      v-if="step === 5"
      :goals="goals"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedFilters="selectedFilters"
      :selectedIndexes="selectedIndexes"
      @select-uhri="selectIndex"
      @unselect-uhri="unselectIndex" 
    />
    <step-f
      v-if="step === 6"
      :goals="goals"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedMetrics="selectedMetrics"
      :selectedIndexes="selectedIndexes"
    />
    <div class="container buttons mt-4">
      <b-button
        @click="goBack"
        v-if="step > 1"
        :disabled="!backAvailable"
        type="is-primary is-large">Back</b-button>
      <b-button
        @click="goNext"
        :disabled="!nextAvailable"
        v-if="step !== maxSteps"
        type="is-primary is-large">Next</b-button>
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
import goals from "@/assets/data/goals.json";

import StepA from "@/components/steps/StepA"
import StepB from "@/components/steps/StepB"
import StepC from "@/components/steps/StepC"
import StepD from "@/components/steps/StepD"
import StepE from "@/components/steps/StepE"
import StepF from "@/components/steps/StepF"

export default {
  name: 'Step',
  components: {
    StepA,
    StepB,
    StepC,
    StepD,
    StepE,
    StepF
  },
  data() {
    return {
      goals: goals,
      maxSteps: 6
    }
  },
  methods: {
    selectGoal(goals) {
      // returns an array of goals to be added to selected
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
    },
    selectSubgoal(subgoals) {
      // returns an array of goals to be added to selected
      subgoals.forEach((subgoal) => {
        this.$store.commit('goals/addSubgoal', subgoal)
      })
    },
    unselectSubgoal(subgoal) {
      this.$store.commit('goals/removeSubgoal', subgoal)
    },
    setMetric(metrics) {
      this.$store.commit('goals/setMetrics', metrics)
    },
    selectIndex(uhris) {
      uhris.forEach((uhri) => {
        this.$store.commit('goals/addIndex', uhri)
      })
    },
    unselectIndex(uhri) {
      this.$store.commit('goals/removeIndex', uhri)
    },
    selectFilter(key, value) {
      this.$store.commit('goals/addFilter', [key, value])
    },
    unselectFilter(key, value) {
      this.$store.commit('goals/removeFilter', [key, value])
    },
    goBack() {
      if (this.backAvailable) {
        this.$router.push({ name: "step", params: { step: (this.step - 1)} })
      }
    },
    goNext() {
      if (this.nextAvailable) {
        this.$router.push({ name: "step", params: { step: (this.step + 1)} })
      }
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
      if ((step === 2) && (this.selectedGoals.length === 0)) {
        this.$router.push({ name: "step", params: { step: 1} })
      }
      if ((step === 3) && (this.selectedSubgoals.length === 0)) {
        this.$router.push({ name: "step", params: { step: 2} })
      }
    }
  },
  computed: {
    ...mapState({
      selectedGoals: (state) => state.goals.selectedGoals,
      selectedSubgoals: (state) => state.goals.selectedSubgoals,
      selectedMetrics: (state) => state.goals.selectedMetrics,
      selectedFilters: (state) => state.goals.selectedFilters,
      selectedIndexes: (state) => state.goals.selectedIndexes
    }),
    step() {
      if (this.$route) {
        return parseInt(this.$route.params.step)
      }
      return 1
    },
    backAvailable() {
      return this.step > 1
    },
    nextAvailable() {
      if (this.step === 1 && this.selectedGoals.length > 0) {
        return true
      }
      if (this.step === 2 && this.selectedSubgoals.length > 0) {
        return true
      }
      if (this.step !== this.maxSteps ) {
        return true
      }
      return false
    }
  },
  watch: {
    step(step) {
      this.checkRouteConsistency(step)
    }
  },
  mounted() {
    this.checkRouteConsistency(this.step)
    console.log(this.selectedIndexes)
  }
}
</script>
