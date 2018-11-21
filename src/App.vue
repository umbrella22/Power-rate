<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].setAttribute("style", "margin: 0");
  },
  name: "App"
};
</script>

<style>

</style>
