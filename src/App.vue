<template>
  <div id="app">
    <b-navbar class="is-primary" :mobile-burger="true">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'home' }">
          <img src="@/assets/images/catalyst.png" alt="Project Catalyst" />
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="router-link" :to="{ name: 'step' }">
          {{ $t('general.START') }}
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'home' }">
          {{ $t('general.HOME') }}
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
        <p>{{$t('general.MADE_BY')}}</p>
        <p><img class="aim-logo" src="@/assets/images/aim-logo.png" alt="Cardano AIM" /></p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">

.aim-logo {
  width: 150px;
}
</style>
