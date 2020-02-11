<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  body {
    height: 100vh;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
  section {
    height: 85%;
  }
  textarea:first-line {
    font-weight: bold;
    line-height: 3;
  }
  .polygonBtn {
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .popper {
    padding: 4px 10px !important;
    box-shadow: rgb(58, 58, 58) 0 0 3px 0 !important;
    border: 0 !important;
    background-color: white !important;
  }
  #notesBloc {
    height: 600px;
    overflow-y: auto;
  }
  /* width */
  #notesBloc::-webkit-scrollbar {
    width: 8px;
    margin: 2px 4px;
  }

  /* Track */
  #notesBloc::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px grey;
    border-radius: 10px;
  }

  /* Handle */
  #notesBloc::-webkit-scrollbar-thumb {
    background: #888888;
    border-radius: 10px;
  }
</style>
