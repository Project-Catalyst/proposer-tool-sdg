<template>
  <div class="step-a">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{"STEP 1: Select your tags and SDG Goals"}}</div>
          <div class="subtitle">{{$t('step.SELECT_TAG')}}</div>
        </div>
        <div class="column is-12">
            <b-taginput
                ref="tagInput"
                v-model="selectedTags"
                :data="filteredTags"
                autocomplete
                field="tag"
                icon="label"
                :open-on-focus="true"
                placeholder="Select a tag"
                max-height="450px"
                @add="selectTag"
                @remove="getFilteredTags(false)"
                @typing="getFilteredTags">
                <template v-slot="props">
                    {{props.option}}
                </template>
                <template #empty>
                    There are no items
                </template>
            </b-taginput>
        </div>
        <div class="column is-12">
          <div class="subtitle">{{$t('step.SELECT_GOAL')}}</div>
        </div>
        <div class="column is-12">
          <b-autocomplete
              ref="autocomplete"
              v-model="search"
              :data="filteredDataArray(this.goals)"
              placeholder="Search Goal"
              icon="magnify"
              max-height="450px"
              :open-on-focus="true"
              :field="'title'"
              @select="option => selectGoal(option)">
              <template slot-scope="props">
                  <div class="media">
                    <div class="media-left is-hidden-mobile">
                      <img width="80" :src="`assets/images/sdgs/${props.option.image}`">
                    </div>
                    <div class="media-content is-text is-size-4 is-size-6-mobile">
                      {{ props.option.title }}
                    </div>
                  </div>
                </template>
              <template #empty>No results found</template>
          </b-autocomplete>
        </div>
      </div>
    </section>
    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle">{{$t('step.SELECTED_GOALS')}}</div>
        </div>
        <div class="column is-12">
          <b-taglist v-if="selectedGoals.length > 0">
            <b-tag type="is-primary is-light"
              closable
              size="is-medium"
              @close="unselectGoal(goal)"
              :key="`goals-selected-${index}`"
              v-for="goal, index in selectedGoals">{{goal.title}}</b-tag>
          </b-taglist>
          <div class="content" v-if="selectedGoals.length === 0">
            No goals selected
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'StepA',
  props: ['goals', 'selectedGoals', 'subgoals', 'selectedSubgoals'],
  data() {
    return {
      search: '',
      filteredTags: [],
      selectedTags: []
    }
  },
  computed: {
    tags() {
      let goalsTags = this.goals.map((goal) => {
        return goal.keywords
      })
      .flat()
      .filter((x, i, a) => a.indexOf(x) === i)
      .sort(
        (a, b) => a.localeCompare(b)
      )
      return goalsTags
    },
    /*
    selectedTags() {
      let goalsTags = this.selectedGoals.map((goal) => {
        return goal.keywords
      }).flat()
      return goalsTags
    }
    */
  },
  methods: {
    selectTag(tag) {
      var relatedGoals = this.goals.filter((goal) => {
        return goal.keywords.includes(tag)
      })
      this.$refs.tagInput.$refs.autocomplete.isActive = false
      this.$emit('select-goal', relatedGoals)
    },
    selectGoal(goal) {
      if (goal) {
        this.$emit('select-goal', [goal])
        setTimeout(() => this.search = '', 10)
      }
    },
    unselectGoal(goal) {
      this.$emit('unselect-goal', goal)
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
    getFilteredTags(text) {
      let filteredTags
      if (text) {
        filteredTags = this.tags.filter((option) => {
          return option
              .toString()
              .toLowerCase()
              .indexOf(text.toLowerCase()) >= 0
        })
      } else {
        filteredTags = this.tags
      }
      this.filteredTags = filteredTags.filter((option) => {
        return this.selectedTags.indexOf(option) === -1
      })

    }
  },
  mounted() {
    this.getFilteredTags()
  }
}
</script>

<style lang="scss">
.step-a {
  .tags {
    .tag:not(.is-light) {
      cursor: pointer;
    }
  }
  .results {
    .tag {
      height: auto;
      white-space: initial !important;
      padding-top: 0.75em;
      padding-bottom: 0.75em;
    }

  }
  .autocomplete {
    .dropdown-menu {
      z-index: 2000;
      &.is-opened-top {
        .dropdown-content {
          max-height: 300px !important;
        }
      }
    }
    .dropdown-item {
      white-space: initial;
      overflow: initial;
      text-overflow: initial;
      span {
        white-space: initial;
      }
    }
  }
}
</style>
