<!--Navigation Bar -->
<template>
  <b-navbar toggleable="md" type="dark" variant="primary">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand>{{$t('topBar.title')}}</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="https://github.com/laalaguer/VeChain-Address"><font-awesome-icon class="github-icon" :icon="['fab','github']" />Github</b-nav-item>
        <b-nav-item href="https://github.com/laalaguer/VeChain-Address/releases"><font-awesome-icon class="github-icon" :icon="['fas','download']"/>{{$t('topBar.releases')}}</b-nav-item>
      </b-navbar-nav>
      <b-dropdown variant="link" no-caret class="m-2">
        <template slot="button-content">
          <font-awesome-icon class="globe-icon" :icon="['fas','globe']" />
        </template>
        <b-dropdown-item v-for="lang in langs" :key="lang.key" @click="changeLang(lang.key)">{{lang.name}}</b-dropdown-item>
      </b-dropdown>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data(){
    return {
      langs: [
        { key: 'en', name: 'English' },
        { key: 'zh', name: '简体中文' },
        { key: 'kr', name: '한국어' }
      ]
    }
  },
  methods: {
    changeLang: function(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('lang', lang)
    }
  }
}
</script>

<style>
.github-icon {
  margin-right: 0.5rem;
}
.globe-icon {
  color: rgba(255,255,255,.5);
}
.globe-icon:hover {
  color: rgba(255,255,255,.75);
}
</style>
