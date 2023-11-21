<template>
  <div class="step-phdi-home">
    <section class="box">
        <div class="columns is-multiline is-12">
            
            <div class="column is-12">
              <div class="title">{{$t('phdi.HOME_TITLE')}}</div>
            </div>
            
            <div id="filter" class="column is-12 mt-4 columns">
              <div id="filter-selection" class="column is-10">
                <b-field label="Select a country">
                  <b-autocomplete
                    ref="autocomplete"
                    placeholder="Country"
                    max-height="450px"
                    v-model="search"
                    :data="filteredDataArray(this.data)"
                    :open-on-focus="true"
                    :field="'country'"
                    :clearable="true"
                    @select="option => selectIndex(option)"
                    :select-on-click-outside="true">
                    <template #empty>No results found</template>
                  </b-autocomplete>
                </b-field>
              </div>
              <div id="remove-selection" class="column is-2 is-flex is-justify-content-center is-align-items-end">
                <b-button
                  @click="removeIndex()"
                  :disabled="!selectedPhdi"
                  type="is-primary is-small">Clear PHDI selection</b-button>
              </div>
            </div>
            
            <div id="message-display" class="column is-6 mt-4">
              <phdi-message :selectedPhdi="selectedPhdi" class="message"></phdi-message>
            </div>

            <div id="info" class="column is-6 mt-4">
              
              <!-- Card 1 -->
              <b-collapse
                class="card"
                animation="slide"
                :open="isOpen.card1"
                @open="isOpen.card1 = !isOpen.card1">
                <template #trigger="props">
                  <div
                    class="card-header"
                    role="button">
                      <p class="card-header-title">
                        {{ $t('phdi.INFOGRAPHIC_TITLE') }}
                      </p>
                      <a class="card-header-icon">
                        <b-icon :icon="props.open ? 'menu-down' : 'menu-right'"></b-icon>
                      </a>
                  </div>
                </template>
                <div class="card-content">
                  <div class="content"> 
                    <img :src="`assets/images/phdi/PHDI_diagram.png`">
                    <div class="is-flex is-flex-direction-row is-justify-content-flex-end is-align-content-center">
                      <p class="m-0 mr-3">Include graphic in proposal</p>
                      <b-checkbox
                        v-model="addImage" 
                        @input="setPhdiImage"
                        :disabled="!selection">
                      </b-checkbox>
                    </div>
                  </div>
                </div>
              </b-collapse>

              <!-- Card 2 -->
              <b-collapse
                class="card mt-2"
                animation="slide"
                :open="isOpen.card2"
                @open="isOpen.card2 = !isOpen.card2">
                <template #trigger="props">
                  <div
                    class="card-header"
                    role="button">
                      <p class="card-header-title">
                        {{ $t('phdi.USABILITY_TITLE') }}
                      </p>
                      <a class="card-header-icon">
                        <b-icon :icon="props.open ? 'menu-down' : 'menu-right'"></b-icon>
                      </a>
                  </div>
                </template>
                <div class="card-content">
                  <i18n path="phdi.USABILITY_TEXT" tag="p" class="">
                    <br/>
                  </i18n>
                </div>
              </b-collapse>

              <!-- Card 3 -->
              <b-collapse
                class="card mt-2"
                animation="slide"
                :open="isOpen.card3"
                @open="isOpen.card3 = !isOpen.card3">
                <template #trigger="props">
                  <div
                    class="card-header"
                    role="button">
                      <p class="card-header-title">
                        {{ $t('phdi.INTERPRETATION_TITLE') }}
                      </p>
                      <a class="card-header-icon">
                        <b-icon :icon="props.open ? 'menu-down' : 'menu-right'"></b-icon>
                      </a>
                  </div>
                </template>
                <div class="card-content">
                  <i18n path="phdi.INTERPRETATION_TEXT" tag="p" class="">
                    <br/>
                  </i18n>
                </div>
              </b-collapse>

            </div>
        </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/api/api.js'
import PhdiMessage from '@/components/PhdiMessage.vue'

export default {
  name: 'StepPhdiHome',
  props: ['selectedPhdi', 'hasPhdiImage'],
  components: {
    PhdiMessage
  },
  data() {
    return {
      data: [],
      selection: null,
      search: '',
      addImage: null,
      isOpen: {
        card1: false,
        card2: true,
        card3: true
      },
    }
  },
  mounted() {
    API.phdiIndexes().then((r) => {
      this.data = r
    })
    this.selection = this.selectedPhdi
    if(this.selection){
      this.search = this.getProperty('country')
      this.triggerCards(true)
      this.addImage = this.hasPhdiImage
    }
  },
  watch: { 
    selectedPhdi: function() { // watch it
      this.selection = this.selectedPhdi
      if(!this.selection) {
        this.addImage = this.hasPhdiImage
      }
    },
  },
  computed: {
    msgNullVal() {
      return '[na]'
    }
  },
  methods: {
    getProperty(property) {
      if(this.selection) {
        if(!Object.keys(this.selection).includes(property)) { return null }
        else {
          let numericRoundedProps = ['hdiDiffValuePerc', 'adjFactor', 'cooPercap', 'cooIndex', 'materialIndex']
          return (numericRoundedProps.includes(property))
          ? this.selection[property] ? this.selection[property].toFixed(2) : this.selection[property]
          : this.selection[property] 
        }
      }
      return null
    },
    msgGetProperty(property) {
      let p = this.getProperty(property) 
      return p ? p : this.msgNullVal
    },
    msgHdiRankMinusDiff() {
      let hdiRank = this.getProperty('hdiRank')
      let hdiDiffRank = this.getProperty('hdiDiffRank')
      return (hdiRank && hdiDiffRank) ? this.selection.hdiRank - this.selection.hdiDiffRank : this.msgNullVal
    },
    msgRankDeriv() {
      let hdiDiffRank = this.getProperty('hdiDiffRank')
      if(hdiDiffRank) {
        return (hdiDiffRank >= 0) ? 'rise' : 'fall'
      }
      return this.msgNullVal
    },
    selectIndex(index) {
      if (index) {
        this.$emit('set-phdi', index)
        this.triggerCards(true)
      }
    },
    removeIndex() {
      if(this.selection) {
        this.$emit('set-phdi', null)
        setTimeout(() => this.search = '', 10)
        this.triggerCards(false)
      }
    },
    setPhdiImage() {
      this.$emit('set-phdi-image', this.addImage)
    },
    closeSelection() {
      if(this.search === '') {
        this.search = this.country
      }
    },
    triggerCards(isSelection) {
      if(isSelection) {
        this.isOpen.card1 = true;
        this.isOpen.card2 = false;
        this.isOpen.card3 = false;
      } else {
        this.isOpen.card1 = false;
        this.isOpen.card2 = true;
        this.isOpen.card3 = true;
      }
    },
    filteredDataArray(values) {
      if (this.search.length > 0) {
        return values.filter((option) => {
          return option.country
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
#selection-message {
  height:100%;
  outline-style: solid;
  outline-color: rgba(0, 0, 0, 0.555);
  outline-width: 2px;
}
.message {
  height:100%;
  outline-style: solid;
  outline-color: rgba(0, 0, 0, 0.555);
  outline-width: 2px;
}
.step-phdi-home {
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
