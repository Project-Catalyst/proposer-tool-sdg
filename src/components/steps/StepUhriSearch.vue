<template>
  <div class="step-uhri-search">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{"Step 4: Select your Universal Human Rights Indexes"}}</div>
          <div class="subtitle" v-html="$t('step.STEP4_SUBTITLE3')"></div>
        </div>
        <div class="column is-12">
          <b-field label="SELECT YOUR UHRI:">
            <div class="content" v-if="count === false">
              <b-progress size="is-small"></b-progress>Loading indexes from database
            </div>
            <div class="content" v-if="count !== false">
              <em>>> Loaded {{count}} indexes</em>
            </div>
            <div class="uhri mb-4"
              :key="`uhri-${index}`"
              v-for="uhri, index in availableIndexes">
                <b-checkbox
                v-if="availableIndexes.length > 0"
                v-model="checkboxIndexes"
                :native-value="uhri">
                  <div class="uhri-indexes" v-html="uhri.title" />
                </b-checkbox>
            </div>
          </b-field>
        </div>
      </div>
      <div class="content has-text-centered">
        <div class="column is-12">
            <b-button
            @click="goUhriFilters"
            type="is-primary is-small">Open UHRI filter selection</b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/api/api.js'

export default {
  name: 'StepUhriSearch',
  props: ['filterIndex', 'selectedGoals', 'selectedSubgoals', 'selectedFilters' , 'selectedIndexes'],
  data() {
    return {
      checkboxIndexes: [],
      availableIndexes: [],
      count: false,
      stepUhri: 4
    }
  },
  methods: {
    goUhriFilters() {
        this.$router.push({ name: "step", params: { step: this.filterIndex.filters} })
    }
  },
  watch: {
    checkboxIndexes(val) {
      this.$emit('set-uhri', val)
    }
  },
  mounted(){
    let goals_ids = this.selectedGoals.map((goal) => {return goal.id})
    let subgoals_ids = this.selectedSubgoals.map((sgoal) => {return sgoal.id})

    API.uhriIndexes(goals_ids,
                        subgoals_ids,
                        this.selectedFilters.country,
                        this.selectedFilters.region,
                        this.selectedFilters.theme).then((r) => {
      this.availableIndexes = r.data.humanRights
      this.count = r.data.count
    })
    this.checkboxIndexes = this.selectedIndexes
  }
}
</script>

<style lang="scss">
.step-uhri-search {
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
