<template>
  <div class="step-f">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{"Step 4: Select your Universal Human Rights Indexes"}}</div>
          <div class="subtitle" v-html="$t('step.STEP4_SUBTITLE3')"></div>
        </div>
        <div class="column is-12">
          <b-field label="SELECT YOUR UHRI:"></b-field>
          <div class="uhri mb-4"
            :key="`uhri-${index}`"
            v-for="uhri, index in availableIndexes">
              <b-checkbox v-model="checkboxIndexes"
                :native-value="uhri">
                {{uhri.title}}
              </b-checkbox>
          </div>
        </div>
      </div>
      <div class="content has-text-centered">
        <div class="column is-12">
            <b-button 
            @click="goUhriFilter"
            type="is-primary is-small">Open UHRI filter selection</b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

// import UhriAPI from '@/api/uhri.js'

export default {
  name: 'StepF',
  props: ['selectedGoals', 'selectedSubgoals', 'selectedFilters' , 'selectedIndexes'],
  data() {
    return {
      checkboxIndexes: [],
      availableIndexes: [],
      count: 0,
      stepUhri: 4
    }
  },
  methods: {
    goUhriFilter() {
        this.$router.push({ name: "step", params: { step: this.stepUhri+1} })
    }
  },
  watch: {
    checkboxIndexes(val) {
      this.$emit('set-uhri', val)
    }
  },
  mounted(){
    // let goals_ids = this.selectedGoals.map((goal) => {return goal.id})
    // let subgoals_ids = this.selectedSubgoals.map((sgoal) => {return sgoal.id})

    // UhriAPI.uhriIndexes(goals_ids, 
    //                     subgoals_ids, 
    //                     this.selectedFilters.country,
    //                     this.selectedFilters.region,
    //                     this.selectedFilters.theme).then((r) => {
    //   console.log(r.data)
    //   this.indexes = r.data.humanRights
    //   this.count = r.data.count
    // })
    this.availableIndexes = this.goals
    this.count = this.goals.length

    this.checkboxIndexes = this.selectedIndexes
  }
}
</script>

<style lang="scss">
.step-f {
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
