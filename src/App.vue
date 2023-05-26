<template>
  <div id="app">
    <b-navbar class="is-primary" :mobile-burger="true">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'home' }">
          <img src="@/assets/images/catalyst.png" alt="Project Catalyst" />
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="router-link" :to="{ name: 'home' }">
          {{ $t('general.HOME') }}
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'step', params: { step: 1 } }">
          {{ $t('general.START') }}
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'step', params: { step: 9 } }">
          {{ $t('general.SUMMARY') }}
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'page', params: {slug: 'about'}}">
          {{ $t('general.ABOUT') }}
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="section container">
      <div class="content-wrapper">
        <router-view/>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <!-- <p class="has-text-weight-bold">
          {{$t('general.DONATE')}}
          <br />
          <span class="is-ellipsis">
            addr1q9hh7nqmantwkd5upsamc6p54ckseksmngh858ng788hwfa99jp2g3s20g7k2hvj6rtl00l647hxvw3a5a84m3mzzlmqvartlu
          </span>
          <b-button
            @click="copy"
            type="is-primary"
            size="is-small"
            icon-left="content-copy">
          </b-button>
        </p> -->
        <p>{{ $t('general.MADE_BY')}} </p>
        <p><img class="aim-logo" src="@/assets/images/aim-logo.png" alt="Cardano AIM" /></p>
        <p class="is-size-4 has-text-weight-bold">
          <a href="https://cardanoscan.io/pool/b61f05ec1e907ab9b069eaec6c664056c16f56cab59076109c66d2ae" target="_blank">
            Stake with [AIM] pool
          </a>
        </p>
        <p class="icons">
          <a href="https://github.com/Project-Catalyst/ca-tool" target="_blank">
            <b-icon icon="github" size="small" />
          </a>
          <a href="https://twitter.com/AimCardano" target="_blank">
            <b-icon icon="twitter" size="small" />
          </a>
          <a href="https://t.me/joinchat/Ivl50eWG7r0zODI1" target="_blank">
            <b-icon icon="telegram" size="small" />
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'App',
  data() {
    return {}
  },
  methods: { }
}
</script>

<style lang="scss">

.aim-logo {
  width: 150px;
}
</style>
