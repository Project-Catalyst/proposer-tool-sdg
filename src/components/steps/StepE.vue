<template>
  <div class="step-e">
    <section class="box">
        <div class="columns is-multiline is-12">
            <div class="column is-12">
                <div class="title" v-html="$t('step.SUMMARY_TITLE')"></div>
                <div class="subtitle" v-html="$t('step.SUMMARY_SUBTITLE')"></div>
            </div>
        </div>
    </section>
    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle">{{$t('step.SELECTED_SUMMARY')}}</div>
        </div>
        <div class="column is-12">
            <div class="content">
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
              <h5>Universal Human Rights Index (UHRI)</h5>
                <p v-for="uhri in selectedIndexes"
                :key="`uhri-${uhri.id}`">
                {{uhri.title}}
                </p>
              <b-button
                @click="copy"
                type="is-primary"
                size="is-small"
                icon-left="content-copy">
                Copy text to be included in IdeaScale proposal
              </b-button>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// [REMOVE] THIS CODE WAS IMPORTED FROM STEP-C FOR ADAPTATION
// @ is an alias to /src

export default {
  name: 'StepE',
  props: ['goals', 'selectedGoals', 'selectedSubgoals', 'selectedMetrics'],
  data() {
    return {
    }
  },
  computed: {
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
  methods: {
    copy() {
      this.$clipboard(this.textToCopy)
      this.$buefy.notification.open({
        message: this.$t('general.TEXT_COPIED'),
        type: 'is-primary',
        position: 'is-bottom-right'
      })
    },
  }
}
</script>
