<template>
  <div class="step-sdg-home">
    <section class="box">
        <div class="columns is-multiline is-12">
            <div class="column is-12">
                <div class="title"> {{ $t('sdg.HOME_TITLE') }}</div>
            </div>
            <div class="column is-12">
                <div class="subtitle"> {{ $t('sdg.HOME_SUBTITLE') }} </div>
                <i18n path="sdg.HOME_MSG" tag="p" class=""> 
                  <template v-slot:enter>
                    <br/>
                  </template>
                  <template v-slot:informationUrl>
                    <a href='https://sdgs.un.org/goals/' target='_blank'>https://sdgs.un.org/goals</a>
                  </template>
                </i18n>
            </div>
        </div>
        <div class="content has-text-centered">
            <div class="column is-12">
                <div class="subtitle" v-html="$t('sdg.HOME_PROCEED_MSG')"></div>
            </div>
            <div class="column is-12 is-centered">
                <b-button
                @click="goSdgSelection"
                type="is-primary is-medium"> {{ buttonMsg }}</b-button>
            </div>
        </div>
    </section>

    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle"> <b> {{ $t('sdg.SELECTED_INDEXES') }} </b> </div>
        </div>
        <div class="column is-12">
          <div class="content" v-if="selection.goals.length === 0">
            <em>No SDG selection</em>
          </div>
          <div class="content" v-else>
              <h5>SDG Goals</h5>
                <p v-for="goal in selectedGoals"
                :key="`goal-${goal.id}`">
                {{goal.id}} - {{goal.title}}
                </p>
              <h5>SDG Subgoals</h5>
                <p v-for="subgoal in selectedSubgoals"
                :key="`subgoal-${subgoal.id}`">
                {{subgoal.id}} - {{subgoal.title}}
                </p>
              <h5>Key Performance Indicator (KPI)</h5>
                <p v-for="metric in selectedMetrics"
                :key="`metric-${metric.id}`">
                {{metric.id}} - {{metric.title}}
                </p>
                <div v-if="selectedMetrics.length === 0">
                  No KPI metrics selected
                </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'StepSdgHome',
  props: ['selectedGoals', 'selectedSubgoals', 'selectedMetrics'],
  data() {
    return {
      selection: {
        goals: [],
        subgoals: [],
        metrics: []
      }
    }
  },
  computed: {
    buttonMsg() {
      return (this.selection.goals.length===0) ? 'Begin SDG selection' : 'Edit SDG selection'
    }
  },
  mounted() {
    this.selection.goals = this.selectedGoals
    this.selection.subgoals = this.selectedSubgoals
    this.selection.metrics = this.selectedMetrics
  },
  methods: {
    goSdgSelection() {
      this.$emit('begin-sdg')
    },
  },
  watch: {
    selectedGoals(newValue) { // watch it
      this.selection.goals = newValue
    },
    selectedSubgoalsn(newValue) { // watch it
      this.selection.subgoals = newValue
    },
    selectedMetrics(newValue) { // watch it
      this.selection.metrics = newValue
    },
  },
}
</script>

<style lang="scss">
.step-sdg-home {
  .results {
    .tag {
      height: auto;
      white-space: initial !important;
      padding-top: 0.75em;
      padding-bottom: 0.75em;
    }
  }
  .autocomplete .dropdown-item {
    white-space: initial;
    overflow: initial;
    text-overflow: initial;
    span {
      white-space: initial;
    }
  }
}
</style>
