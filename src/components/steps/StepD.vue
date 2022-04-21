<template>
  <div class="step-d">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
            <div class="title">{{"STEP 4: Select your Universal Human Rights Index"}}</div>
          <div class="subtitle" v-html="$t('step.SELECT_UHRI')"></div>
        </div>
        <div class="column is-12"><b-field label="Specific UHRI filters">
          <div class="column is-4"><b-field label="UHRI Text">
            <b-autocomplete
                ref="autocomplete"
                v-model="search"
                :data="filteredDataArray(this.uhriIndexes)"
                placeholder="Search by UHRI text"
                icon="magnify"
                max-height="450px"
                :open-on-focus="true"
                :field="'title'"
                @select="option => printOption(option)">
                <template #empty>No results found</template>
            </b-autocomplete>  
          </b-field></div>
          <div class="column is-4"><b-field label="UHRI Theme">
            <b-autocomplete
                ref="autocomplete"
                v-model="search"
                :data="filteredDataArray(this.uhriIndexes)"
                placeholder="Search by UHRI theme"
                icon="magnify"
                max-height="450px"
                :open-on-focus="true"
                :field="'title'"
                @select="option => printOption(option)">
                <template #empty>No results found</template>
            </b-autocomplete>  
          </b-field></div>
          <div class="column is-4"><b-field label="UHRI Region">
            <b-autocomplete
                ref="autocomplete"
                v-model="search"
                :data="filteredDataArray(this.uhriIndexes)"
                placeholder="Search by UHRI region"
                icon="magnify"
                max-height="450px"
                :open-on-focus="true"
                :field="'title'"
                @select="option => printOption(option)">
                <template #empty>No results found</template>
            </b-autocomplete>  
          </b-field></div>
        </b-field></div>
        <div class="column is-12"><b-field label="Select your UHRI indexes">
          <b-autocomplete
              ref="autocomplete"
              v-model="search"
              :data="filteredDataArray(this.uhriIndexes)"
              placeholder="Search by UHRI indexes"
              icon="magnify"
              max-height="450px"
              :open-on-focus="true"
              :field="'title'"
              @select="option => selectIndex(option)">
              <template #empty>No results found</template>
          </b-autocomplete>  
        </b-field></div>
      </div>
    </section>
    <section class="results box">
      <div class="columns is-multiline">
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

export default {
  name: 'StepD',
  props: ['goals', 'selectedGoals', 'selectedSubgoals', 'selectedIndexes'],
  data() {
    return {
      search: ''
    }
  },
  computed: {
    uhriIndexes() {
      return this.selectedGoals.map((goal) => {
        return goal.subgoals
      }).flat()
    }
  },
  methods: {
    printOption(option) {
      console.log(option)
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
    filteredDataArray(values) {
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
