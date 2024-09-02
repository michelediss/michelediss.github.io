<template>
  <!-- Usa la direttiva v-touch:swipe.top per rilevare lo swipe up -->
  <main class="px-5" v-touch:swipe.top="onSwipeUp">
    <router-view></router-view>
  </main>
</template>

<script>
import { getRandomHSLuvColor } from './utils/colorGenerator'; // Assicurati di importare la funzione corretta

export default {
  data() {
    return {
      fontFamily: null,
    };
  },
  methods: {

  },
  async mounted() {
    try {
      const fontChoice = await import('./swell-scales/font-pairing/fontChoice.json');
      const fontFamily = await import(`./swell-scales/font-pairing/pairing-list/${fontChoice.chosenPair}`);
      this.fontFamily = fontFamily;

      // Aggiungi il font al documento
      const link = document.createElement('link');
      link.href = fontFamily.fontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      console.log('Font configuration loaded successfully.'); // Log per confermare il caricamento del font
    } catch (error) {
      console.error('Failed to load font configuration:', error);
    }
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
