// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/tailwind.css';
import hoverAnimate from './directives/hoverAnimate';
import { register } from 'swiper/element/bundle';
import PullToRefresh from 'pulltorefreshjs';

// Registrazione della direttiva touch con un listener passive
const touchDirective = {
  beforeMount(el, binding) {
    const handleSwipe = (event) => {
      if (event.type === 'swipe' && binding.arg === 'top') {
        binding.value();
      }
    };
    // Imposta l'event listener come passive
    el.addEventListener('touchmove', handleSwipe, { passive: true });
  },
  unmounted(el) {
    el.removeEventListener('touchmove');
  }
};

register();

const app = createApp(App);

// Usa la direttiva personalizzata
app.directive('hover-animate', hoverAnimate);
app.directive('touch', touchDirective);
app.use(router);
app.mount('#app');

// Configura PullToRefresh per ricaricare la pagina senza mostrare i messaggi di refreshing
PullToRefresh.init({
  mainElement: 'body',
  onRefresh() {
    console.log('Pull to refresh detected, reloading the page...');
    window.location.reload();
  },
  instructionsPullToRefresh: '',
  instructionsReleaseToRefresh: '',
  instructionsRefreshing: '',
  distThreshold: 60,
  distMax: 80,
  distReload: 50,
  refreshTimeout: 50,
});
