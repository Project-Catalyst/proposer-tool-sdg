<template>
  <div class="step-sdg-goals">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{$t('sdg.GOALS_TITLE')}}</div>
          <div class="subtitle" v-html="$t('sdg.GOALS_SUBTITLE')"></div>
        </div>
        <div class="column is-12">
          <div class="column is-12"><b-field label="SELECT YOUR SDG's:">
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
          </b-field></div>
        </div>
        <div class="column is-12">
          <div class="column is-12"><b-field label="(OR/AND) SELECT YOUR TAGS:">
            <b-taginput
                ref="tagInput"
                v-model="selectedTags"
                :data="filteredTags"
                autocomplete
                field="title"
                icon="label"
                :open-on-focus="true"
                placeholder="Search a tag"
                max-height="450px"
                @add="selectTag"
                @remove="getFilteredTags(false)"
                @typing="getFilteredTags">
                <template v-slot="props">
                    {{props.option.title}}
                </template>
                <template #empty>
                    There are no items
                </template>
            </b-taginput>
          </b-field></div>
        </div>
      </div>
    </section>
    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle" v-html="$t('sdg.GOALS_SELECTED')"></div>
        </div>
        <div class="column is-12">
          <b-taglist v-if="selectedGoals.length > 0">
            <b-tag type="is-primary is-light"
              closable
              size="is-medium"
              @close="unselectGoal(goal)"
              :key="`goals-selected-${index}`"
              v-for="goal, index in selectedGoals">{{goal.id}} - {{goal.title}}</b-tag>
          </b-taglist>
          <div class="content" v-if="selectedGoals.length === 0">
            <em>No SDG Goals selected</em>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/api/api.js'

export default {
  name: 'StepSdgGoals',
  props: ['selectedGoals', 'selectedSubgoals'],
  data() {
    return {
      search: '',
      filteredTags: [],
      selectedTags: [],
      goals: [],
      tags: []
    }
  },
  computed: { },
  methods: {
    selectTag(tag) {
      var relatedGoals = this.goals.filter((goal) => {
        return goal.Keywords.map((keyword) => {
                return keyword.id
              }).includes(tag.id)
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
          return option.title
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
    API.goals().then((r) => {
      this.goals = r.data.sdgGoals
    })
    API.tags().then((r) => {
      this.tags = r.data.keywords
      this.getFilteredTags()
    })
  }
}
</script>

<style lang="scss">
.step-sdg-goals {
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
