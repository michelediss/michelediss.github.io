// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/home.vue';
import PortfolioPage from '../components/portfolio.vue';
import ResumePage from '../components/Resume.vue';
import PhilosophyPage from '../components/Philosophy.vue';
import { getRandomHSLuvColor } from '../utils/colorGenerator'; // Importa la funzione di generazione colore

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: PortfolioPage
  },
  {
    path: '/resume',
    name: 'Resume',
    component: ResumePage
  },
  {
    path: '/vision',
    name: 'vision',
    component: PhilosophyPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Hook del router per cambiare il colore di sfondo del body ad ogni cambio di pagina
router.beforeEach((to, from, next) => {
  getRandomHSLuvColor();
  next();
});

// Aggiungi un listener per la barra spaziatrice
window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyC') {
    getRandomHSLuvColor();
  }
});

export default router;
