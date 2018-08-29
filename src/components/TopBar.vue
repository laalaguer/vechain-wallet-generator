<!--Navigation Bar -->
<template>
  <b-navbar toggleable="md" type="dark" variant="primary">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand>VeChain Address Generator</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-nav-text></b-nav-text>
      <b-navbar-nav>
        <b-nav-item href="https://github.com/laalaguer/VeChain-Address"><font-awesome-icon class="github-icon" :icon="['fab','github']" />Github</b-nav-item>
        <b-nav-item href="https://github.com/laalaguer/VeChain-Address/releases">Releases</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data(){
    return {}
  }
}
</script>

<style>
.github-icon {
  margin-right: 0.5rem;
}
</style>
