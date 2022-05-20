<template>
  <div class="step-d">
    <section class="box">
        <div class="columns is-multiline is-12">
            <div class="column is-12">
                <div class="title">{{"Step 4: Select your Universal Human Rights Indexes (UHRI)"}}</div>
            </div>
            <div class="column is-12">
                <div class="subtitle" v-html="$t('step.UHRI_SUBTITLE')"></div>
                <div v-html="$t('step.UHRI_MSG')"></div>
            </div>
        </div>
        <div class="content has-text-centered">
            <div class="column is-12">
                <div class="subtitle" v-html="$t('step.STEP4_SUBTITLE1')"></div>
            </div>
            <div class="column is-12 is-centered">
                <b-button 
                @click="goUhriFilters"
                type="is-primary is-medium">Open UHRI selection</b-button>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'StepD',
//   props: ['goals', 'selectedGoals', 'selectedSubgoals', 'selectedFilters', 'selectedIndexes'],
  data() {
    return {
      stepUhri: 4
    }
  },
  methods: {
    goUhriFilters() {
        this.$router.push({ name: "step", params: { step: this.stepUhri+1} })
    }
  }
}
</script>

<style lang="scss">
.step-d {
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
