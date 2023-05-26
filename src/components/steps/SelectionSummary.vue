<template>
  <div class="selection-summary">
    <section class="box">
        <div class="columns is-multiline is-12">
            <div class="column is-12">
                <div class="title">{{"SDG SUMMARY"}}</div>
                <div class="subtitle" v-html="$t('step.STEP5_SUBTITLE')"></div>
            </div>
        </div>
    </section>
    <section class="results box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="content">
            <h5>SDG SELECTION</h5>
            <div class="px-3" v-if="selectedGoals.length !== 0">
              <p><b>- SDG Goals</b></p>
                <p v-for="goal in selectedGoals"
                :key="`goal-${goal.id}`">
                {{goal.id}} - {{goal.title}}
                </p>
              <p><b>- SDG Subgoals</b></p>
                <p v-for="subgoal in selectedSubgoals"
                :key="`subgoal-${subgoal.id}`">
                {{subgoal.id}} - {{subgoal.title}}
                </p>
              <p><b>- Key Performance Indicator (KPI)</b></p>
                <p class="mb-0" v-for="metric in selectedMetrics"
                :key="`metric-${metric.id}`">
                {{metric.id}} - {{metric.title}}
                </p>
                <p v-if="selectedMetrics.length === 0">
                  No KPI metrics selected
                </p>
            </div>
            <div v-if="selectedGoals.length === 0">
              No SDG indexes selected
            </div>

            <h5 class="mt-4">UHRI SELECTION</h5>
              <div class="px-3" v-if="selectedIndexes.length !== 0">
                <p>The following Universal Human Rights Index(es) were selected:</p>
                <div v-for="uhri in selectedIndexes"
                class="uhri-indexes mb-5"
                :key="`idx-${uhri.title}`"
                v-html="uhri.title">
                </div>
              </div>
              <div v-if="selectedIndexes.length === 0">
                No UHRI indexes selected
              </div>
            <h5 class="mt-4">Planetary pressures-adjusted Human Development Index (PHDI)</h5>
              <div class="columns">
                <div class="column is-6">
                  <div v-if="selectedPhdi">
                    <phdi-message ref="phdiMessage" :selectedPhdi="selectedPhdi"></phdi-message>
                  </div>
                  <div v-else>
                    No UHRI indexes selected
                  </div>
                </div>
                <div v-if="hasPhdiImage" class="column is-6">
                  <a href="https://hdr.undp.org/planetary-pressures-adjusted-human-development-index#/indicies/PHDI"
                    target="_blank">
                    <img width="100%" :src="`assets/images/phdi/PHDI_diagram.png`"/>
                  </a>
                  <div class="buttons is-right">
                    <b-button
                      class="mr-4"
                      @click="copyImage"
                      type="is-primary"
                      size="is-small"
                      icon-left="content-copy">
                      Copy image to clipboard
                    </b-button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="content has-text-centered">
        <b-button
          @click="copy"
          type="is-primary"
          size="is-small"
          icon-left="content-copy">
          Copy text to be included in IdeaScale proposal
        </b-button>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import PhdiMessage from '@/components/PhdiMessage.vue'

export default {
  name: 'SelectionSummary',
  props: ['selectedGoals', 'selectedSubgoals', 'selectedMetrics', 'selectedIndexes', 'selectedPhdi', 'hasPhdiImage'],
  components: {
    PhdiMessage
  },
  data() {
    return {
    }
  },
  computed: {
    textToCopy() {
      let text = ''
      if(this.selectedGoals.length > 0) {
        text += '>> SDG SELECTION:\n'
        text += '\n- SDG goals:\n'
        this.selectedGoals.forEach((g) => text += `* ${g.title}\n`)
        text += '\n- SDG subgoals:\n'
        this.selectedSubgoals.forEach((s) => text += `* ${s.title}\n`)
        text += '\n- Key Performance Indicator (KPI):\n'
        this.selectedMetrics.forEach((m) => text += `* ${m.title}\n`)
      }
      if(this.selectedIndexes.length > 0) {
        text += '\n>> UHRI SELECTION:\n'
        text += 'The following Universal Human Rights Index(es) are applied:\n'
        this.selectedIndexes.forEach((i) => text += `* ${i.title}\n`)
      }
      if(this.selectedPhdi) {
        text += '\n>> PHDI SELECTION:\n'
        text += 'The following report is applied for the selected Planetary pressures-adjusted Human Development Index:\n'
        text += "'''"
        text += `\n${this.$refs.phdiMessage.message()}\n`
        text += "'''"
      }
      text += '\n\n#proposertoolsdg'
      return this.removeHtmlTags(text)
    }
  },
  methods: {
    async copyImage() {
      const { ClipboardItem } = window;
      const imgURL = "assets/images/phdi/PHDI_diagram.png";
      const data = await fetch(imgURL);
      const blob = await data.blob();
      
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        this.$buefy.notification.open({
          message: this.$t('general.TEXT_COPIED'),
          type: 'is-primary',
          position: 'is-bottom-right'
        })
      } catch (err) {
        console.error(err.name, err.message);
        this.$buefy.notification.open({
          message: 'The clipboard service is not supported by this navigator. Click on the image to access its source page.',
          type: 'is-primary',
          position: 'is-bottom-right'
        })
      }
    },
    copy() {
      const { ClipboardItem } = window;
      const type = "text/plain";
      const blob = new Blob([this.textToCopy], { type });
      const data = [new ClipboardItem({ [type]: blob })];

      navigator.clipboard.write(data).then(
        () => {
          /* success */
          this.$buefy.notification.open({
            message: this.$t('general.TEXT_COPIED'),
            type: 'is-primary',
            position: 'is-bottom-right'
          })
        },
        () => {
          /* failure */
          this.$buefy.notification.open({
            message: this.$t('general.TEXT_NOT_COPIED'),
            type: 'is-primary',
            position: 'is-bottom-right'
          })
        }
      );
    },
    removeHtmlTags(str) {
      return str.replace(/<[^>]+>/g, '');
    },
  }
}
</script>

<style lang="scss">
  .uhri-indexes {
    p, h5 {
      font-weight: initial !important;
    }
  }
</style>
