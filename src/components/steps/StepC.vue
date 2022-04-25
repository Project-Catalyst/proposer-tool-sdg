<template>
  <div class="step-c">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{"Step 3: Select your Key Performance Indicator (KPI)"}}</div>
          <div class="subtitle" v-html="$t('step.STEP3_SUBTITLE')"></div>
        </div>
        <div class="column is-12">
          <b-field label="SELECT YOUR KPI:"></b-field>
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
