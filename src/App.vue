<template>
  <!-- Usa la direttiva v-touch:swipe.top per rilevare lo swipe up -->
  <main class="px-5" v-touch:swipe.top="onSwipeUp">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onSwipeUp() {
      // Aggiungi qui la logica che vuoi eseguire quando viene rilevato uno swipe up
    },
  },
  mounted() {
    // Codice eseguito al montaggio del componente, se necessario
  },
};
</script>

<style>
/* Stili globali o specifici di questo componente */
.app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
