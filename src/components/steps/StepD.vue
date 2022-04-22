<template>
  <div class="step-d">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
            <div class="title">{{"STEP 4: Select your Universal Human Rights Index"}}</div>
          <div class="subtitle" v-html="$t('step.SELECT_UHRI')"></div>
        </div>
        <div class="column is-12"><b-field label="FILTERS">
          <div class="column is-4"><b-field label="Country">
            <b-autocomplete
                ref="autocomplete"
                v-model="search_country"
                :data="filteredDataCountry(this.uhriCountries)"
                placeholder="Search UHRI by country"
                icon="magnify"
                max-height="450px"
                :open-on-focus="true"
                :field="'title'"
                @select="option => filterOption(option, 'country')">
                <template #empty>No results found</template>
            </b-autocomplete>  
          </b-field></div>
          <div class="column is-4"><b-field label="Region">
            <b-autocomplete
                ref="autocomplete"
                v-model="search_region"
                :data="filteredDataRegion(this.uhriRegions)"
                placeholder="Search UHRI by region"
                icon="magnify"
                max-height="450px"
                :open-on-focus="true"
                :field="'title'"
                @select="option => filterOption(option, 'region')">
                <template #empty>No results found</template>
            </b-autocomplete>  
          </b-field></div>
          <div class="column is-4"><b-field label="Theme">
            <b-autocomplete
                ref="autocomplete"
                v-model="search_theme"
                :data="filteredDataTheme(this.uhriThemes)"
                placeholder="Search UHRI by theme"
                icon="magnify"
                max-height="450px"
                :open-on-focus="true"
                :field="'title'"
                @select="option => filterOption(option, 'theme')">
                <template #empty>No results found</template>
            </b-autocomplete>  
          </b-field></div>
        </b-field></div>
      </div>
    </section>
    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12"><b-field label="SELECT YOUR UHRI INDEXES">
          <b-autocomplete
              ref="autocomplete"
              v-model="search"
              :data="filteredDataIndex(this.uhriIndexesTemp)"
              placeholder="Search by UHRI indexes"
              icon="magnify"
              max-height="450px"
              :open-on-focus="true"
              :field="'title'"
              @select="option => selectIndex(option)">
              <template #empty>No results found</template>
          </b-autocomplete>  
        </b-field></div>
        <div class="column is-12">
          <div class="subtitle">{{$t('step.SELECTED_UHRI')}}</div>
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
// [REMOVE] THIS CODE WAS IMPORTED FROM STEP-C FOR ADAPTATION
// @ is an alias to /src

// import axios from 'axios';
// import CatalystAPI from '@/api/catalyst.js'

export default {
  name: 'StepD',
  props: ['goals', 'selectedGoals', 'selectedSubgoals', 'selectedIndexes'],
  data() {
    return {
      search: '',
      search_country: '',
      search_region: '',
      search_theme: '',
      
      filters: {
        "country": '',
        "region": '',
        "theme": ''
      },

      // populate with mounted api
      sdg_ids: [],
      uhriIndexes: [],
      uhriCountries: ["Sierra Leone", "Singapore", "Palau", "Latvia"],
      uhriRegions: ["Africa", "Asia-Pacific", "Eastern Europe"], 
      uhriThemes: ["- Right to education", "- Human trafficking & contemporary forms of slavery",
                "- Equality & non-discrimination", "- Ratification of & accession to international instruments"]
    }
  },
  computed: {
    uhriIndexesTemp() { // [REMOVE] WILL BE POPULATED ON THE DATA()
      return this.selectedGoals.map((goal) => {
        return goal.subgoals
      }).flat()
    }
  },
  methods: {
    loadUhriData(){
      console.log("CALL API.update(sdg_ids, **params)")
      console.log(this.sdg_ids)
      console.log(this.filters)
      // API.load() endpoint 
      // API.load(this.sdg_ids, this.filters).then((res) => {
      //   this.uhriIndexes = res.data.uhri_list
      //   this.uhriCountries = res.data.countries_list
      //   this.uhriRegions = res.data.region_list
      //   this.uhriThemes = res.data.themes_list
      // })
    },
    filterOption(option, filter) {
      if (option === null) {
        option = ''
      }
      this.filters[filter] = option
      this.loadUhriData()
    },
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
          return option.title
              .toString()
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) >= 0
        })
      }
      return values
    },
    filteredDataCountry(values) {
      if (this.search_country.length > 0) {
        return values.filter((option) => {
          return option
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
          return option
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
    this.sdg_ids = this.selectedGoals.map((goal) => {return goal.id.toString()}).concat(
              this.selectedSubgoals.map((sgoal) => {return sgoal.id})
            )
    this.loadUhriData()
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
