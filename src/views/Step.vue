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
          :disabled="!backAvailable"
          type="is-primary">Back</b-button>
        <b-button
          @click="goNext"
          :disabled="!nextAvailable"
          type="is-primary">Next</b-button>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src

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
      goals: goals,
      selectedGoals: [],
      selectedSubgoals: [],
      selectedMetrics: []
    }
  },
  methods: {
    selectGoal(goals) {
      // returns an array of goals to be added to selected
      goals.forEach((goal) => {
        var found = this.selectedGoals.indexOf(goal)
        if (found === -1) {
          this.selectedGoals.push(goal)
        }
        this.selectedGoals = this.selectedGoals.sort((a, b) => a.id - b.id)
      })
    },
    unselectGoal(goal) {
      var found = this.selectedGoals.indexOf(goal)
      if (found > -1) {
        this.selectedGoals.splice(found, 1)
      }
    },
    selectSubgoal(subgoals) {
      // returns an array of goals to be added to selected
      subgoals.forEach((subgoal) => {
        var found = this.selectedSubgoals.indexOf(subgoal)
        if (found === -1) {
          this.selectedSubgoals.push(subgoal)
        }
        this.selectedSubgoals = this.selectedSubgoals.sort(
          (a, b) => a.id.localeCompare(b.id)
        )
      })
    },
    unselectSubgoal(subgoal) {
      var found = this.selectedSubgoals.indexOf(subgoal)
      if (found > -1) {
        this.selectedSubgoals.splice(found, 1)
      }
    },
    setMetric(metrics) {
      // returns an array of goals to be added to selected
      this.selectedMetrics = metrics
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
    }
  },
  computed: {
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
