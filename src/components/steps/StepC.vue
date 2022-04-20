<template>
  <div class="step-c">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{"STEP 3: Select your measurement Metrics"}}</div>
          <div class="subtitle" v-html="$t('step.SELECT_METRICS')"></div>
        </div>
        <div class="column is-12">
          <div class="metric mb-4"
            :key="`metric-${index}`"
            v-for="metric, index in metrics">
              <b-checkbox v-model="checkboxGroup"
                :native-value="metric">
                {{metric.title}}
              </b-checkbox>
          </div>
        </div>
      </div>
    </section>
    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle">{{$t('step.SELECTED_METRICS')}}</div>
        </div>
        <div class="column is-12">
          <div class="content" v-if="selectedMetrics.length > 0">
            <h5>SDG Goals</h5>
            <p v-for="goal in selectedGoals"
              :key="`goal-${goal.id}`">
              {{goal.title}}
            </p>
            <h5>SDG Subgoals</h5>
            <p v-for="subgoal in selectedSubgoals"
              :key="`subgoal-${subgoal.id}`">
              {{subgoal.title}}
            </p>
            <h5>Key Performance Indicator (KPI)</h5>
            <p v-for="metric in selectedMetrics"
              :key="`metric-${metric.id}`">
              {{metric.title}}
            </p>
            <b-button
              @click="copy"
              type="is-primary"
              size="is-small"
              icon-left="content-copy">
              Copy text to be included in IdeaScale proposal
            </b-button>
          </div>
          <div class="content" v-if="selectedMetrics.length === 0">
            No metrics selected
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'StepC',
  props: ['goals', 'selectedGoals', 'selectedSubgoals', 'selectedMetrics'],
  data() {
    return {
      checkboxGroup: []
    }
  },
  computed: {
    metrics() {
      return this.selectedSubgoals.map((subgoal) => {
        return subgoal.metrics
      }).filter((el) => (el)).flat()
    },
    textToCopy() {
      let text = 'SDG goals:\n'
      this.selectedGoals.forEach((g) => text += `${g.title}\n`)
      text += '\nSDG subgoals:\n'
      this.selectedSubgoals.forEach((s) => text += `${s.title}\n`)
      text += '\nKey Performance Indicator (KPI):\n'
      this.selectedMetrics.forEach((m) => text += `${m.title}\n`)
      text += '\n\n#proposertoolsdg'
      return text
    }
  },
  watch: {
    checkboxGroup(val) {
      this.$emit('set-metric', val)
    }
  },
  methods: {
    copy() {
      this.$clipboard(this.textToCopy)
      this.$buefy.notification.open({
        message: this.$t('general.TEXT_COPIED'),
        type: 'is-primary',
        position: 'is-bottom-right'
      })
    },
  },
  mounted() {
    this.checkboxGroup = this.selectedMetrics
  }
}
</script>

<style lang="scss">
.step-c {
}
</style>
