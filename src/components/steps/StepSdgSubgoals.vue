<template>
  <div class="step-sdg-subgoals">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{$t('sdg.SUBGOALS_TITLE')}}</div>
          <div class="subtitle" v-html="$t('sdg.SUBGOALS_SUBTITLE')"></div>
          <div class="column is-12"><b-field label="Selected Goals:">
                <b-taglist v-if="selectedGoals.length > 0">
                  <b-tag type="is-primary is-light"
                    size="is-small"
                    :key="`goal-selected-${index}`"
                    v-for="goal, index in selectedGoals">{{goal.id}} - {{goal.title}}</b-tag>
                </b-taglist>
                <div class="content" v-if="selectedGoals.length === 0">
                  No Region filters selected
                </div>
              </b-field>
          </div>
        </div>
        <div class="column is-12">
          <div class="column is-12"><b-field label="SELECT YOUR SDG SUB-GOALS:">
            <b-autocomplete
              ref="autocomplete"
              v-model="search"
              :data="filteredDataArray(this.subgoals)"
              placeholder="Search Subgoal"
              icon="magnify"
              max-height="450px"
              :open-on-focus="true"
              :field="'title'"
              @select="option => selectSubgoal(option)">
              <template slot-scope="props"> {{ props.option.id }} - {{ props.option.title }} </template>
              <template #empty>No results found</template>
            </b-autocomplete>
          </b-field></div>
        </div>
      </div>
    </section>
    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle" v-html="$t('sdg.SUBGOALS_SELECTED')"></div>
        </div>
        <div class="column is-12">
          <b-taglist v-if="selectedSubgoals.length > 0">
            <b-tag type="is-primary is-light"
              closable
              size="is-medium"
              @close="unselectSubgoal(subgoal)"
              :key="`subgoals-selected-${index}`"
              v-for="subgoal, index in selectedSubgoals">{{subgoal.id}} - {{subgoal.title}}</b-tag>
          </b-taglist>
          <div class="content" v-if="selectedSubgoals.length === 0">
            <em>No Subgoals selected</em>
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
  name: 'StepSdgSubgoals',
  props: ['selectedGoals', 'selectedSubgoals'],
  data() {
    return {
      search: '',
      subgoals: []
    }
  },
  methods: {
    selectSubgoal(subgoal) {
      if (subgoal) {
        this.$emit('select-subgoal', [subgoal])
        setTimeout(() => this.search = '', 10)
      }
    },
    unselectSubgoal(subgoal) {
      this.$emit('unselect-subgoal', subgoal)
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
  },
  mounted() {
    let goals_ids = this.selectedGoals.map((goal) => {return goal.id})
    API.subgoals(goals_ids).then((r) => {
      this.subgoals = r.data.subgoals
    })
  }
}
</script>

<style lang="scss">
.step-sdg-subgoals {
  .tag {
    height: auto;
    white-space: initial !important;
    padding-top: 0.75em;
    padding-bottom: 0.75em;
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
