<template>
  <div class="step-d">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{"Step 4: Select your Universal Human Rights Index"}}</div>
          <div class="subtitle" v-html="$t('step.STEP4_SUBTITLE')"></div>
          <div v-html="$t('step.UHRI_MSG')"></div>
        </div>
        <div class="column is-12"><b-field label="1. CHOOSE HOW TO FILTER THE UHRI INDEXES">
          <div class="column is-4"><b-field label="Country">
            <b-autocomplete
                ref="autocomplete"
                v-model="search_country"
                :data="filteredDataCountry(this.uhriCountries)"
                placeholder="Filter UHRI by country"
                icon="filter"
                max-height="450px"
                :open-on-focus="true"
                :field="'name'"
                @select="option => selectFilter('country', option)">
                <template #empty>No results found</template>
            </b-autocomplete>  
          </b-field></div>
          <div class="column is-4"><b-field label="Region">
            <b-autocomplete
                ref="autocomplete"
                v-model="search_region"
                :data="filteredDataRegion(this.uhriRegions)"
                placeholder="Filter UHRI by region"
                icon="filter"
                max-height="450px"
                :open-on-focus="true"
                :field="'name'"
                @select="option => selectFilter('region', option)">
                <template #empty>No results found</template>
            </b-autocomplete>  
          </b-field></div>
          <div class="column is-4"><b-field label="Theme">
            <b-autocomplete
                ref="autocomplete"
                v-model="search_theme"
                :data="filteredDataTheme(this.uhriThemes)"
                placeholder="Filter UHRI by theme"
                icon="filter"
                max-height="450px"
                :open-on-focus="true"
                :field="'name'"
                @select="option => selectFilter('theme', option)">
                <template #empty>No results found</template>
            </b-autocomplete>  
          </b-field></div>
        </b-field></div>
      </div>
    </section>
    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle" v-html="$t('step.SELECTED_FILTERS')"></div>
        </div>
        <div class="column is-12">
          <b-field label="Selected Country Filters:">
            <b-taglist v-if="selectedFilters.country.length > 0">
              <b-tag type="is-primary is-light"
                closable
                size="is-medium"
                @close="unselectFilter('country', filter)"
                :key="`filter-selected-${index}`"
                v-for="filter, index in selectedFilters.country">{{filter.name}}</b-tag>
            </b-taglist>
            <div class="content" v-if="selectedFilters.country.length === 0">
              No Country filters selected
            </div>
          </b-field>
          <b-field label="Selected Region Filters:">
            <b-taglist v-if="selectedFilters.region.length > 0">
              <b-tag type="is-primary is-light"
                closable
                size="is-medium"
                @close="unselectFilter('region',filter)"
                :key="`filter-selected-${index}`"
                v-for="filter, index in selectedFilters.region">{{filter.name}}</b-tag>
            </b-taglist>
            <div class="content" v-if="selectedFilters.region.length === 0">
              No Region filters selected
            </div>
          </b-field>
          <b-field label="Selected Theme Filters:">
            <b-taglist v-if="selectedFilters.theme.length > 0">
              <b-tag type="is-primary is-light"
                closable
                size="is-medium"
                @close="unselectFilter('theme',filter)"
                :key="`filter-selected-${index}`"
                v-for="filter, index in selectedFilters.theme">{{filter.name}}</b-tag>
            </b-taglist>
            <div class="content" v-if="selectedFilters.theme.length === 0">
              No Theme filters selected
            </div>
          </b-field>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

import UhriAPI from '@/api/uhri.js'

export default {
  name: 'StepD',
  props: ['goals', 'selectedGoals', 'selectedSubgoals', 'selectedFilters'],
  data() {
    return {
      search_country: '',
      search_region: '',
      search_theme: '',
      // populate dropdown
      uhriCountries: [],
      uhriRegions: [], 
      uhriThemes: []
      
    }
  },
  methods: {
    selectFilter(filter, value) {
      if (value) {
        this.$emit('select-filter', filter, value)
      }

      if(filter==='country'){
        setTimeout(() => this.search_country = '', 10)
      }
      else if(filter==='region'){
        setTimeout(() => this.search_region = '', 10)
      }
      else if(filter==='theme'){
        setTimeout(() => this.search_theme = '', 10)
      }
    },
    unselectFilter(filter, value) {
      this.$emit('unselect-filter', filter, value)
    },
    filteredDataCountry(values) {
      if (this.search_country.length > 0) {
        return values.filter((option) => {
          return option.name
              .toString()
              .toLowerCase()
              .indexOf(this.search_country.toLowerCase()) >= 0
        })
      }
      return values
    },
    filteredDataRegion(values) {
      if (this.search_region.length > 0) {
        return values.filter((option) => {
          return option.name
              .toString()
              .toLowerCase()
              .indexOf(this.search_region.toLowerCase()) >= 0
        })
      }
      return values
    },
    filteredDataTheme(values) {
      if (this.search_theme.length > 0) {
        return values.filter((option) => {
          // option.id
          return option
              .toString()
              .toLowerCase()
              .indexOf(this.search_theme.toLowerCase()) >= 0
        })
      }
      return values
    },
  },
  mounted(){

    // let g_ids = this.selectedGoals.map((goal) => {return goal.id})
    // let sg_ids = this.selectedSubgoals.map((sgoal) => {return sgoal.id})

    UhriAPI.countries().then((r) => {
      let data = r.data.countries
      data.forEach(c => {
        this.uhriCountries.push(c)        
      })
    })
    UhriAPI.regions().then((r) => {
      let data = r.data.regions
      data.forEach(el => {
        this.uhriRegions.push(el)        
      })
    })
    UhriAPI.themes().then((r) => {
      let data = r.data.themes
      data.forEach(el => {
        this.uhriThemes.push(el)        
      })
    })
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
