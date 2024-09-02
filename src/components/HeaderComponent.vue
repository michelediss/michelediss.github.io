<template>
  <header>
    <nav id="nav-back" class="flex pt-6 w-full lg:w-5/6 mx-auto">
      <div class="flex justify-center w-full">
        <div class="title-page-container">
          <h2 ref="title" class="title-page-text text-color transition-all duration-500 text-xl font-heading">{{ pageTitle }}</h2>
          <div ref="underline" class="title-page-underline bg-secondary-color h-0.5 bg-slate-900"></div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'HeaderComponent',
  props: {
    pageTitle: {
      type: String,
      required: true
    }
  },
  mounted() {
    // Animazione GSAP per la linea sottolineata
    gsap.fromTo(this.$refs.underline, 
      { width: '0%' }, // Stato iniziale
      { width: '100%', duration: 1, ease: 'power2.out' } // Stato finale
    );
    gsap.fromTo(this.$refs.title, 
      { opacity: '0' }, // Stato iniziale
      { opacity: '1', duration: 1, ease: 'power2.out' } // Stato finale
    );
  }
};
</script>

<style scoped>
.title-page-underline {
  width: 0; 
}
.title-page-text {
  opacity: 0;
}


</style>
