<template>
  <div class="step-sdg-home">
    <section class="box">
        <div class="columns is-multiline is-12">
            <div class="column is-12">
                <div class="title"> {{ $t('sdg.HOME_TITLE') }}</div>
            </div>
            <div class="column is-12">
                <div class="subtitle"> {{ $t('sdg.HOME_SUBTITLE') }} </div>
                <i18n path="sdg.HOME_MSG" tag="p" class=""> 
                  <template v-slot:enter>
                    <br/>
                  </template>
                  <template v-slot:informationUrl>
                    <a href='https://sdgs.un.org/goals/' target='_blank'>https://sdgs.un.org/goals</a>
                  </template>
                </i18n>
            </div>
        </div>
        <div class="content has-text-centered">
            <div class="column is-12">
                <div class="subtitle" v-html="$t('sdg.HOME_PROCEED_MSG')"></div>
            </div>
            <div class="column is-12 is-centered">
                <b-button
                @click="goSdgSelection"
                type="is-primary is-medium">Begin SDG selection</b-button>
            </div>
        </div>
    </section>
    <!-- <section class="results box">
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
              v-for="uhri, index in selectedIndexes">
                <div class="uhri-indexes" v-html="uhri.title" />
              </b-tag>
          </b-taglist>
          <div class="content" v-if="selectedIndexes.length === 0">
            <em>No UHRI selected</em>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'StepSdgHome',
  data() {
    return {}
  },
  methods: {
    goSdgSelection() {
      this.$emit('begin-sdg')
    },
  }
}
</script>

<style lang="scss">
.step-sdg-home {
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
