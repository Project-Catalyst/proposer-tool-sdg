<template>
  <div class="step-uhri-home">
    <section class="box">
      <div class="columns is-multiline is-12">
        <div class="column is-12">
          <div class="title">{{ $t('uhri.HOME_TITLE') }}</div>
        </div>
        <div class="column is-12">
          <div class="subtitle"> 
            {{$t('uhri.HOME_SUBTITLE')}} 
          </div>
          <i18n path="uhri.HOME_MSG" tag="p" class=""> 
            <template v-slot:enter>
              <br/>
            </template>
            <template v-slot:informationUrl>
              <a href='https://uhri.ohchr.org/en/' target='_blank'>https://uhri.ohchr.org/en/</a>
            </template>
            <template v-slot:dataUrl>
              <a href='https://uhri.ohchr.org/en/our-data-api' target='_blank'>https://uhri.ohchr.org/en/our-data-api</a>
            </template>
          </i18n>
        </div>
      </div>
      <div class="content has-text-centered">
        <div class="column is-12">
            <div class="subtitle"> <b>{{$t('uhri.HOME_PROCEED_MSG')}}</b> </div>
        </div>
        <div class="column is-12 is-centered">
          <b-tooltip 
            label="This selection requires SDG selection"
            type="is-danger is-light"
            :active="!hasSdgSelection"
            position="is-bottom">
            <b-button
              @click="goUhriFilters"
              :disabled="!hasSdgSelection"
              type="is-primary is-medium"> {{ buttonMsg }}</b-button>
          </b-tooltip>
        </div>
      </div>
    </section>

    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="subtitle"> <b> {{ $t('uhri.SELECTED_INDEXES') }} </b> </div>
        </div>
        <div class="column is-12">
          <b-taglist v-if="selectedIndexes.length > 0">
            <b-tag type="is-primary is-light"
              closable
              size="is-medium"
              @close="unselectIndex(uhri)"
              :key="`uhri-selected-${index}`"
              v-for="uhri, index in selectedIndexes">
                <div class="uhri-indexes" v-html="uhri.title" />
              </b-tag>
          </b-taglist>
          <div class="content" v-if="selectedIndexes.length === 0">
            <em>No UHRI selected</em>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'StepUhriHome',
  props: ['substepsIndex', 'selectedIndexes', 'selectedGoals'],
  data() {
    return {
      stepUhri: 4,
      hasSdgSelection: false,
    }
  },
  mounted() {
    this.hasSdgSelection = (this.selectedGoals.length > 0)
  },
  computed: {
    buttonMsg() {
      return (this.selectedIndexes.length===0) ? 'Begin UHRI selection' : 'Edit UHRI selection'
    }
  },
  watch: {
    selectedGoals(newValue) { // watch it
      this.selection.goals = (newValue.length>0)
    },
  },
  methods: {
    goUhriFilters() {
        this.$router.push({ name: "step", params: { step: this.substepsIndex.filters} })
    },
    unselectIndex(uhri){
      this.$emit('unselect-uhri', uhri)
    }
  }
}
</script>

<style lang="scss">
.step-uhri-home {
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
