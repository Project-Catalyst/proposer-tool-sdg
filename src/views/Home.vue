<template>
  <div class="home">
    <section class="box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="title">{{$t('general.TITLE')}}</div>
        </div>
        <div class="column is-12">
          <div class="content" v-html="$t('general.EXPLANATION')"></div>
        </div>
        <div class="column is-8 is-offset-2">
          <b-image :src="require('@/assets/images/sdgs.png')" />
        </div>
      </div>
      <div class="buttons is-flex is-justify-content-center">
        <b-button tag="router-link"
          :to="{ name: 'step', params: { step: 1 } }" type="is-primary is-large">
          {{ $t('general.START') }}
        </b-button>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
