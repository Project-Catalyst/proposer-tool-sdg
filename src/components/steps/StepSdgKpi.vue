<template>
  <div class="step-sdg-kpi">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{$t('sdg.METRICS_TITLE')}}</div>
          <div class="subtitle" v-html="$t('sdg.METRICS_SUBTITLE')"></div>
        </div>
        <div class="column is-12">
          <b-field label="SELECT YOUR KPI:"></b-field>
          <div class="metric mb-4"
            :key="`metric-${index}`"
            v-for="metric, index in metrics">
              <b-checkbox v-model="checkboxGroup"
                :native-value="metric">
                {{metric.id}} - {{metric.title}}
              </b-checkbox>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/api/api.js'

export default {
  name: 'StepSdgKpi',
  props: ['selectedSubgoals', 'selectedMetrics'],
  data() {
    return {
      checkboxGroup: [],
      metrics: []
    }
  },
  watch: {
    checkboxGroup(val) {
      this.$emit('set-metric', val)
    }
  },
  mounted() {
    let subgoals_ids = this.selectedSubgoals.map((sgoal) => {return sgoal.id})
    API.metrics(subgoals_ids).then((r) => {
      this.metrics = r.data.metrics
    })
    this.checkboxGroup = this.selectedMetrics
  }
}
</script>
