// directives/hoverAnimate.js

export default {
  mounted(el) {
    // Aggiungi gli eventi hover al montaggio dell'elemento
    el.addEventListener('mouseenter', () => {
      el.classList.add('bg-secondary-color'); // Aggiungi la classe quando il mouse entra
      el.classList.add('main-text-color'); // Aggiungi anche la nuova classe quando il mouse entra
    });
    
    el.addEventListener('mouseleave', () => {
      el.classList.remove('bg-secondary-color'); // Rimuovi la classe quando il mouse lascia
      el.classList.remove('main-text-color'); // Rimuovi anche la nuova classe quando il mouse lascia
    });
  },
  unmounted(el) {
    // Rimuovi gli eventi hover quando l'elemento viene distrutto
    el.removeEventListener('mouseenter', () => {
      el.classList.add('bg-secondary-color');
      el.classList.add('main-text-color');
    });
    
    el.removeEventListener('mouseleave', () => {
      el.classList.remove('bg-secondary-color');
      el.classList.remove('main-text-color');
    });
  }
};
