<template>
  <div class="step-phdi-home">
    <section class="box">
        <div class="columns is-multiline is-12">
            
            <div class="column is-12">
              <div class="title">{{$t('phdi.HOME_TITLE')}}</div>
            </div>
            
            <div id="filter" class="column is-12 mt-4">
              <b-field label="Select a country">
                <b-autocomplete
                  ref="autocomplete"
                  placeholder="Country"
                  max-height="450px"
                  :open-on-focus="true">
                  <template #empty>No results found</template>
                </b-autocomplete>
              </b-field>
            </div>
            
            <div id="message-display" class="column is-6 mt-4">
              <div id="selection-message" class="p-4">
                <i18n path="phdi.HOME_MSG_SELECTION" tag="p" class="">
                  <br/>
                </i18n>
              </div>
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
                      <b-checkbox></b-checkbox>
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

export default {
  name: 'StepPhdiHome',
  props: ['selectedIndexes'],
  data() {
    return {
      isOpen: {
        card1: false,
        card2: true,
        card3: true
      },
    }
  },
  computed: {
  },
  methods: {
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
