<template>
  <div id="app">
    <div id="nav" v-if="display">
      <router-link to="/">paged-table-test</router-link>|
      <router-link to="/three">Three</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/uploadHead">UploadHead</router-link>|
      <router-link to="/typing">Typing</router-link>|
      <router-link to="/config">Config</router-link>|
      <router-link to="/listenersTest">ListenersTest</router-link>|
      <router-link to="/xlsxTest">xlsxTest</router-link>|
      <router-link to="/cubeSugar">CubeSugar</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    display(){
      return this.notShowNav.indexOf(this.$route.path) === -1
    }
  },
  data() {
    return {
      notShowNav:['/login','/config','/uploadHead','/typing']
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app,
body,
html {
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
