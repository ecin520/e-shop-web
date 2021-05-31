<template>
  <div>
    <div :key="index" v-for="(i, index) in 5">
      <br>
    </div>
    <v-footer color="#eaeaea" height="100" style="position: absolute;bottom: 0;width: 100%;margin-top: 100px" padless>
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center black--text" cols="12">
          © 2020 · <strong>Ecin520 designed by Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>

</style>
