<template>
  <div class="step-d">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
            <div class="title">{{"STEP 4: Select your Universal Human Rights Index"}}</div>
          <div class="subtitle" v-html="$t('step.SELECT_UHRI_GOALS')"></div>
        </div>
        <!-- <div class="column is-12">
          <div class="uhri mb-4"
            :key="`uhri-${index}`"
            v-for="metric, index in metrics"
            >
              <b-checkbox v-model="checkboxGroup"
                :native-value="metric">
                {{metric.title}}
              </b-checkbox>
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
// [REMOVE] THIS CODE WAS IMPORTED FROM STEP-C FOR ADAPTATION
// @ is an alias to /src

export default {
  name: 'StepD',
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
