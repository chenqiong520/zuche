<template>
  <div id="app" ref="app">
    <keep-alive><router-view v-if="$route.meta.keepAlive" /></keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  beforeCreate () {
    Object.assign(this.$root, this.$tools)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  height: 100%;
}
  body {
  }
</style>
