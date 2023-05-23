<template>
  <div class="step-uhri-home">
    <section class="box">
        <div class="columns is-multiline is-12">
            <div class="column is-12">
                <div class="title">{{"Step 4: Select your Universal Human Rights Indexes (UHRI)"}}</div>
            </div>
            <div class="column is-12">
                <div class="subtitle" v-html="$t('step.UHRI_SUBTITLE')"></div>
                <div v-html="$t('step.UHRI_MSG')"></div>
            </div>
        </div>
        <div class="content has-text-centered">
            <div class="column is-12">
                <div class="subtitle" v-html="$t('step.STEP4_SUBTITLE1')"></div>
            </div>
            <div class="column is-12 is-centered">
                <b-button
                @click="goUhriFilters"
                type="is-primary is-medium">Open UHRI selection</b-button>
            </div>
        </div>
    </section>
    <section class="results box">
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
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'StepUhriHome',
  props: ['substepsIndex', 'selectedIndexes'],
  data() {
    return {
      stepUhri: 4
    }
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
