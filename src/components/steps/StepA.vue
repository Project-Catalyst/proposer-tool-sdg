<template>
  <div class="step-a">
    <section class="box tags">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle">{{$t('step.SELECT_TAG')}}</div>
        </div>
        <div class="column is-12">
          <b-taglist>
            <b-tag
              :type="(selectedTags.includes(tag)) ? 'is-primary is-light' : 'is-primary'"
              :key="`tag-${index}`"
              @click="selectTag(tag)"
              v-for="tag, index in tags">{{tag}}</b-tag>
          </b-taglist>
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
              :open-on-focus="true"
              :field="'title'"
              @select="option => selectGoal(option)">
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
      search: ''
    }
  },
  computed: {
    tags() {
      let goalsTags = this.goals.map((goal) => {
        return goal.keywords
      }).flat()
      return goalsTags
    },
    selectedTags() {
      let goalsTags = this.selectedGoals.map((goal) => {
        return goal.keywords
      }).flat()
      return goalsTags
    }
  },
  methods: {
    selectTag(tag) {
      var relatedGoals = this.goals.filter((goal) => {
        return goal.keywords.includes(tag)
      })
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
      margin-right: 0 !important;
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
