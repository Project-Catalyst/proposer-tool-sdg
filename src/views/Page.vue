<template>
  <div class="page">
    <section class="box content">
      <vue-simple-markdown :source="md" />
    </section>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Page',
  components: {
  },
  computed: {
    slug() {
      if (this.$route) {
        return this.$route.params.slug
      }
      return false
    },
    md() {
      if (this.slug) {
        let mod = require(`@/assets/pages/${this.slug}.md`)
        return mod.default
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
.page {
  .markdown-body {
    white-space: pre-wrap !important;
    h1, h2, h3, h4, h5, h6 {
      margin-top: 0 !important;
      margin-bottom: 10px;
    }
    ul, ol {
      list-style: initial;
    }
  }
}
</style>
