<template>
  <div class="step-c">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="subtitle">{{$t('step.SELECT_METRICS')}}</div>
        </div>
        <div class="column is-12">
          <div class="metric"
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
            <p v-for="metric in selectedMetrics"
              :key="`metric-${metric.id}`">
              {{metric.title}}
            </p>
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
    }
  },
  watch: {
    checkboxGroup(val) {
      this.$emit('set-metric', val)
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.step-c {
}
</style>
