<template>
  <div ref="message" id="phdi-message" class="p-4">
    <i18n v-if="selectedPhdi" path="phdi.HOME_MSG_SELECTION" tag="p" class="">
      <template v-slot:enter>
        <br/>
      </template>
      <template v-slot:msgCountry>
        <b>{{ msgGetValue('country') }}</b>
      </template>
      <template v-slot:msgHdiRank>
        <b>{{ msgGetValue('hdiRank') }}</b>
      </template>
      <template v-slot:msgHdiRankMinusDiff>
        <b>{{ msgGetValue('msgHdiRankMinusDiff') }}</b>
      </template>
      <template v-slot:msgRankDeriv>
        <b>{{ msgGetValue('msgRankDeriv') }}</b>
      </template>
      <template v-slot:msgHdiDiffRank>
        <b>{{ msgGetValue('hdiDiffRank') }}</b>
      </template>
      <template v-slot:msgHdi>
        <b>{{ msgGetValue('hdi') }}</b>
      </template>
      <template v-slot:msgPhdiValue>
        <b>{{ msgGetValue('phdiValue') }}</b>
      </template>
      <template v-slot:msgHdiDiffValuePerc>
        <b>{{ msgGetValue('hdiDiffValuePerc') }}</b>
      </template>
      <template v-slot:msgAdjFactor>
        <b>{{ msgGetValue('adjFactor') }}</b>
      </template>
      <template v-slot:msgCooPercap>
        <b>{{ msgGetValue('cooPercap') }}</b>
      </template>
      <template v-slot:msgCooIndex>
        <b>{{ msgGetValue('cooIndex') }}</b>
      </template>
      <template v-slot:msgMaterialPercap>
        <b>{{ msgGetValue('materialPercap') }}</b>
      </template>
      <template v-slot:msgMaterialIndex>
        <b>{{ msgGetValue('materialIndex') }}</b>
      </template>
      <template v-slot:msgInfoLink1>
        <a :href="messageKeys.links.msgInfoLink1" _target="blank">{{ msgInfoLink1 }}</a>
      </template>
      <template v-slot:msgInfoLink2>
        <a :href="messageKeys.links.msgInfoLink2" _target="blank">{{ msgInfoLink2 }}</a>
      </template>
      <template v-slot:msgSdgLink1>
        <a :href="messageKeys.links.msgSdgLink1" _target="blank">{{ msgSdgLink1 }}</a>
      </template>
      <template v-slot:msgSdgLink2>
        <a :href="messageKeys.links.msgSdgLink2" _target="blank">{{ msgSdgLink2 }}</a>
      </template>
      <template v-slot:msgSdgLink3>
        <a :href="messageKeys.links.msgSdgLink3" _target="blank">{{ msgSdgLink3 }}</a>
      </template>
      <template v-slot:msgSourceData>
        <a :href="messageKeys.links.msgSourceData" _target="blank">{{ msgSourceData }}</a>
      </template>
    </i18n>
  </div>
</template>

<script>
// @ is an alias toLowerCase() /src

export default {
  name: 'PhdiMessage',
  props: ['selectedPhdi'],
  expose: ['message'],
  data() {
    return {
      selection: null,
      messageKeys: {
        computed: [
          'msgHdiRankMinusDiff',
          'msgRankDeriv',
        ],
        links: {
          msgInfoLink1:"https://hdr.undp.org/planetary-pressures-adjusted-human-development-index#/indicies/PHDI",
          msgInfoLink2:"https://hdr.undp.org/system/files/documents/phdi2020technicalnotespdf.pdf",
          msgSdgLink1:"https://indicators.report/targets/9-4/",
          msgSdgLink2:"https://indicators.report/targets/8-4/",
          msgSdgLink3:"https://indicators.report/targets/12-2/",
          msgSourceData:"https://hdr.undp.org/sites/default/files/2021-22_HDR/HDR21-22_Statistical_Annex_PHDI_Table.xlsx",
        }
      }
    }
  },
  mounted() {
    this.selection = this.selectedPhdi
    this.$on('call', (methodName, callback) => {
      if (typeof this[methodName] === 'function') {
        const result = this[methodName]();
        if (typeof callback === 'function') {
          callback(result);
        }
      } else {
        console.error(`Method "${methodName}" does not exist.`);
      }
    });
  },
  watch: { 
    selectedPhdi: function() { // watch it
      this.selection = this.selectedPhdi
    },
  },
  computed: {
    msgNullVal() {
      return '[na]'
    },
    msgInfoLink1() {
      return this.messageKeys.links.msgInfoLink1
    },
    msgInfoLink2() {
      return this.messageKeys.links.msgInfoLink2
    },
    msgSdgLink1() {
      return this.messageKeys.links.msgSdgLink1
    },
    msgSdgLink2() {
      return this.messageKeys.links.msgSdgLink2
    },
    msgSdgLink3() {
      return this.messageKeys.links.msgSdgLink3
    },
    msgSourceData() {
      return this.messageKeys.links.msgSourceData 
    },
  },
  methods: {
    isLinkValue(property) {
      return Object.prototype.hasOwnProperty.call(this.messageKeys.links, property)
    },
    msgGetValue(property) {
      if(this.isLinkValue(property)) {
        return this.messageKeys.links[property]
      }
      else if (this.messageKeys.computed.includes(property)) {
        if (property==='msgHdiRankMinusDiff') {
          return this.msgHdiRankMinusDiff()
        }
        if (property==='msgRankDeriv'){
          return this.msgRankDeriv()
        }
      }
      else {
        const pattern = /msg(.*?)/g;
        const propertyName = property.replace(pattern, (match, group) => {
          const computedValue = group.trim();
          return computedValue !== undefined ? computedValue : match;
        });
        let p = this.getProperty(this.makeFirstLetterLowerCase(propertyName)) 
        return p ? p : this.msgNullVal
      }
    },
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
    makeFirstLetterLowerCase(str) {
      if (str.length === 0) {
        return str;
      }
      const firstLetter = str.charAt(0).toLowerCase();
      const restOfString = str.slice(1);
      return firstLetter + restOfString;
    },
    removeExtraWhitespace(str) {
      return str.replace(/[^\S\r\n]+/g, ' ').trim();
    },
    replacePatterns(inputString) {
      const pattern = /\{(.*?)\}/g;
      const replacedString = inputString.replace(pattern, (match, group) => {
        let computedValue;
        if(group==='enter') {
          computedValue = '\n';    
        } else {
          computedValue = this.msgGetValue(group.trim());
        }
        return computedValue !== undefined ? computedValue : match;
      });
      return this.removeExtraWhitespace(replacedString)
    },
    message() {
      let inputString = this.$t('phdi.HOME_MSG_SELECTION')

      const computedString = this.replacePatterns(inputString);
      return computedString.trim()
    }
  }
}
</script>

<style lang="scss">
</style>
