<template>
  <div class="step-uhri-filters">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{ $t('uhri.FILTERS_TITLE') }}</div>
          <div class="subtitle mt-4">{{ $t('uhri.FILTERS_SUBTITLE') }}</div>
        </div>
      </div>
      <div class="columns filters">
          <div class="column is-4">
            <b-field label="Country">
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
            </b-field>
              <b-taglist v-if="selectedFilters.country.length > 0">
                <b-tag type="is-primary is-light"
                  closable
                  size="is-small"
                  @close="unselectFilter('country', filter)"
                  :key="`filter-selected-${index}`"
                  v-for="filter, index in selectedFilters.country">{{filter.name}}</b-tag>
              </b-taglist>
              <div class="content" v-if="selectedFilters.country.length === 0">
                <em>* Field required</em>
              </div>
          </div>
          <div class="column is-4">
            <b-field label="Region">
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
            </b-field>
              <b-taglist v-if="selectedFilters.region.length > 0">
                <b-tag type="is-primary is-light"
                  closable
                  size="is-small"
                  @close="unselectFilter('region',filter)"
                  :key="`filter-selected-${index}`"
                  v-for="filter, index in selectedFilters.region">{{filter.name}}</b-tag>
              </b-taglist>
              <div class="content" v-if="selectedFilters.region.length === 0">
                No filters selected
              </div>
          </div>
          <div class="column is-4">
            <b-field label="Theme">
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
            </b-field>
              <b-taglist v-if="selectedFilters.theme.length > 0">
                <b-tag type="is-primary is-light"
                  closable
                  size="is-small"
                  @close="unselectFilter('theme',filter)"
                  :key="`filter-selected-${index}`"
                  v-for="filter, index in selectedFilters.theme">{{filter.name}}</b-tag>
              </b-taglist>
              <div class="content" v-if="selectedFilters.theme.length === 0">
                No filters selected
              </div>
          </div>
      </div>
      <div class="content has-text-centered">
          <div class="column is-12">
              <b-button 
              @click="goUhriSearch"
              :disabled="!canLoadIndexes"
              type="is-primary is-medium">Load UHRI indexes</b-button>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

import UhriAPI from '@/api/api.js'

export default {
  name: 'StepUhriFilters',
  props: ['searchIndex', 'selectedGoals', 'selectedSubgoals', 'selectedFilters' , 'selectedIndexes'],
  data() {
    return {
      search_country: '',
      search_region: '',
      search_theme: '',
      uhriCountries: [],
      uhriRegions: [], 
      uhriThemes: [],
      stepUhri: 4
    }
  },
  methods: {
    goUhriSearch() {
        this.$router.push({ name: "step", params: { step: this.searchIndex} })
    },
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
  computed: {
    canLoadIndexes(){
      if (this.selectedFilters.country.length > 0) {
        return true
      }
      return false
    }
  },
  mounted(){
    UhriAPI.countries().then((r) => {
      this.uhriCountries = r.data.countries
    })
    UhriAPI.regions().then((r) => {
      this.uhriRegions = r.data.regions
    })
    UhriAPI.themes().then((r) => {
      this.uhriThemes = r.data.themes
      this.uhriThemes.sort((a, b) => a.name.localeCompare(b.name))
    })
  }
}
</script>

<style lang="scss">
.step-uhri-filters {
  .filters {
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
