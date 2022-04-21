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
    <!-- <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle">{{$t('step.SELECTED_METRICS')}}</div>
        </div>
        <div class="column is-12">
          <div v-if="selectedMetrics.length > 0">
            <div :key="`metric-${index}`" v-for="metric, index in checkboxGroup">
              {{metric.title}}
            </div>
          </div>
          <div class="content" v-if="selectedMetrics.length === 0">
            No metrics selected 
          </div>
        </div>
      </div>
    </section> -->
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
  mounted() {
    this.checkboxGroup = this.selectedMetrics
  }
}
</script>
