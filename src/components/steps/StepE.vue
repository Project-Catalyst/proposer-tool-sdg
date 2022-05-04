<template>
  <div class="step-e">
    <section class="box">
        <div class="columns is-multiline is-12">
            <div class="column is-12">
                <div class="title">{{"Step 4: Select your Universal Human Rights Index"}}</div>
                <div class="subtitle" v-html="$t('step.STEP4_SUBTITLE')"></div>
                <div v-html="$t('step.UHRI_MSG')"></div>
            </div>
            <div class="column is-12"><b-field label="1. CHOOSE HOW TO FILTER THE UHRI INDEXES"></b-field>
            </div>
            <div class="column is-12">
              <b-field label="Country">
                <b-taglist v-if="selectedFilters.country.length > 0">
                  <b-tag type="is-primary is-light"
                    size="is-medium"
                    :key="`filter-selected-${index}`"
                    v-for="filter, index in selectedFilters.country">{{filter.name}}</b-tag>
                </b-taglist>
                <div class="content" v-if="selectedFilters.country.length === 0">
                  No Country filters selected
                </div>
              </b-field>
              <b-field label="Region">
                <b-taglist v-if="selectedFilters.region.length > 0">
                  <b-tag type="is-primary is-light"
                    size="is-medium"
                    :key="`filter-selected-${index}`"
                    v-for="filter, index in selectedFilters.region">{{filter.name}}</b-tag>
                </b-taglist>
                <div class="content" v-if="selectedFilters.region.length === 0">
                  No Region filters selected
                </div>
              </b-field>
              <b-field label="Theme">
                <b-taglist v-if="selectedFilters.theme.length > 0">
                  <b-tag type="is-primary is-light" 
                    size="is-medium"
                    :key="`filter-selected-${index}`"
                    v-for="filter, index in selectedFilters.theme">{{filter.name}}</b-tag>
                </b-taglist>
                <div class="content" v-if="selectedFilters.theme.length === 0">
                  No Theme filters selected
                </div>
              </b-field>
            </div>
            <div class="column is-12"><b-field label="2. SELECT YOUR UHRI INDEXES">
                <b-autocomplete
                    v-if="indexes.length > 0"
                    ref="autocomplete"
                    v-model="search"
                    :data="filteredDataIndex(this.indexes)"
                    placeholder="Search UHRI by text"
                    icon="magnify"
                    max-height="450px"
                    :open-on-focus="true"
                    :field="'title'"
                    @select="option => selectIndex(option)">
                    <template #empty>No results found</template>
                </b-autocomplete>
                <div class="content" v-if="indexes.length > 0">
                  Loaded {{count}} indexes
                </div>
                <div class="content" v-if="indexes.length === 0">
                  <b-progress size="is-small"></b-progress>Loading indexes from database
                </div></b-field>
            </div>
        </div>
    </section>
    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle" v-html="$t('step.SELECTED_UHRI')"></div>
        </div>
        <div class="column is-12">
          <b-taglist v-if="selectedIndexes.length > 0">
            <b-tag type="is-primary is-light"
              closable
              size="is-medium"
              @close="unselectIndex(uhri)"
              :key="`uhri-selected-${index}`"
              v-for="uhri, index in selectedIndexes">{{uhri.title}}</b-tag>
          </b-taglist>
          <div class="content" v-if="selectedIndexes.length === 0">
            No UHRI indexes selected
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

import UhriAPI from '@/api/uhri.js'

export default {
  name: 'StepE',
  props: ['goals', 'selectedGoals', 'selectedSubgoals', 'selectedFilters' , 'selectedIndexes'],
  data() {
    return {
      search: '',
      indexes: [],
      count: 0
    }
  },
  methods: {
    selectIndex(uhri) {
      if (uhri) {
        this.$emit('select-uhri', [uhri])
        setTimeout(() => this.search = '', 10)
      }
    },
    unselectIndex(uhri) {
      this.$emit('unselect-uhri', uhri)
    },
    filteredDataIndex(values) {
      if (this.search.length > 0) {
        return values.filter((option) => {
          // return option.title
          return option
              .toString()
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) >= 0
        })
      }
      return values
    },
  },
  mounted(){
    let goals_ids = this.selectedGoals.map((goal) => {return goal.id})
    let subgoals_ids = this.selectedSubgoals.map((sgoal) => {return sgoal.id})

    UhriAPI.uhriIndexes(goals_ids, 
                        subgoals_ids, 
                        this.selectedFilters.country,
                        this.selectedFilters.region,
                        this.selectedFilters.theme).then((r) => {
      console.log(r.data)
      this.indexes = r.data.humanRights
      this.count = r.data.count
    })
  }
}
</script>

<style lang="scss">
.step-e {
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
