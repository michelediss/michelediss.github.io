import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/tailwind.css';
import hoverAnimate from './directives/hoverAnimate'; // Importa la direttiva
import { register } from 'swiper/element/bundle';
import PullToRefresh from 'pulltorefreshjs'; // Importa PullToRefresh.js

register();

const app = createApp(App);

app.directive('hover-animate', hoverAnimate);
app.use(router);
app.mount('#app');

// Configura PullToRefresh per ricaricare la pagina senza mostrare i messaggi di refreshing
PullToRefresh.init({
    mainElement: 'body', // Elemento principale dove verrà applicato il pull-to-refresh
    onRefresh() {
      console.log('Pull to refresh detected, reloading the page...');
      window.location.reload(); // Ricarica la pagina
    },
    instructionsPullToRefresh: '', // Rimuove il testo di istruzioni per il pull
    instructionsReleaseToRefresh: '', // Rimuove il testo di istruzioni per il rilascio
    instructionsRefreshing: '', // Rimuove il testo "Refreshing..."
    distThreshold: 60,  // Distanza minima per attivare il pull-to-refresh
    distMax: 80, // Distanza massima per il pull prima di forzare il refresh
    distReload: 50, // Distanza necessaria per attivare il refresh
    refreshTimeout: 50, // Tempo di attesa per il refresh in millisecondi
  });