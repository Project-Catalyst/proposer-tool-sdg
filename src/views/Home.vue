<template>
  <div class="home">
    <section class="box">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="title">{{$t('general.TITLE')}}</div>
        </div>
        <div class="column is-12">
          {{ $t('general.EXPLANATION') }}
        </div>
      </div>
      <div class="buttons">
        <b-button tag="router-link"
          :to="{ name: 'step' }" type="is-primary">
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
