<template>
  <div class="step">
    <step-a
      v-if="step === 1"
      :goals="goals"
      :selectedGoals="selectedGoals"
      @select-goal="selectGoal"
      @unselect-goal="unselectGoal" />
    <step-b
      v-if="step === 2"
      :goals="goals"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      @select-subgoal="selectSubgoal"
      @unselect-subgoal="unselectSubgoal" />
    <step-c
      v-if="step === 3"
      :goals="goals"
      :selectedGoals="selectedGoals"
      :selectedSubgoals="selectedSubgoals"
      :selectedMetrics="selectedMetrics"
      @set-metric="setMetric" />
      <div class="container buttons mt-4">
        <b-button
          @click="goBack"
          v-if="step > 1"
          :disabled="!backAvailable"
          type="is-primary is-large">Back</b-button>
        <b-button
          @click="goNext"
          :disabled="!nextAvailable"
          v-if="step !== 3"
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

export default {
  name: 'Step',
  components: {
    StepA,
    StepB,
    StepC
  },
  data() {
    return {
      step: 1,
      goals: goals
    }
  },
  methods: {
    selectGoal(goals) {
      // returns an array of goals to be added to selected
      goals.forEach((goal) => {
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
    goBack() {
      if (this.backAvailable) {
        this.step -= 1
      }
    },
    goNext() {
      if (this.nextAvailable) {
        this.step += 1
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
          this.step = 1
        }
      })
    }
  },
  computed: {
    ...mapState({
      selectedGoals: (state) => state.goals.selectedGoals,
      selectedSubgoals: (state) => state.goals.selectedSubgoals,
      selectedMetrics: (state) => state.goals.selectedMetrics
    }),
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
      return false
    }
  }
}
</script>
