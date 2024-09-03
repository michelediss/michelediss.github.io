<template>
  <div class="flex flex-col h-screen">
    <div class="flex-none">
      <header>
        <nav id="nav-back" class="flex mt-6 w-full lg:w-5/6 mx-auto justify-center">
          <div class="flex justify-center w-12/12">
            <div class="title-page-container">
              <h1 ref="carouselTitle" class="text-color title-page-text text-xl heading">{{ currentItemData.title
                }}</h1>
              <div ref="underline" class="bg-secondary-color title-page-underline h-0.5 bg-slate-900"></div>
            </div>
          </div>
        </nav>
      </header>
    </div>

    <div class="main home flex grow items-center w-full justify-center">
      <div class="container">

        <!-- GSAP Carousel per desktop -->
        <div class="hidden md:flex carousel justify-center items-center">
          <button ref="prevArrow" @click="prevItem"
            class="hidden border-color lg:block arrow prev border-t-2 border-l-2 h-4 w-4"></button>
          <p ref="carouselContent"
            class="text-color paragraph w-full lg:w-4/6 carousel text-center md:px-5 flex justify-center flex-wrap text-xl md:text-3xl">
            <span v-html="currentItemData.text"></span>
          </p>
          <button ref="nextArrow" @click="nextItem"
            class="hidden border-color lg:block arrow next border-t-2 border-l-2 h-4 w-4"></button>
        </div>

        <!-- Swiper Element Carousel per mobile -->
        <div ref="swiperContainer" class="opacity-0 block md:hidden carousel-swiper">
          <swiper-container slides-per-view="1" space-between="50" pagination="true">
            <swiper-slide v-for="(item, index) in items" :key="index">
              <div v-html="item.text"
                class="swiper-content text-color paragraph w-full lg:w-4/6 text-center md:px-5 flex justify-center flex-wrap text-xl md:text-3xl">
              </div>
            </swiper-slide>
          </swiper-container>
        </div>

        <div ref="buttonContainer" class="flex justify-center mt-8 md:mt-12">
          <router-link to="/portfolio"
            class="text-color border-color bg-transparent button py-2 px-8 mr-4 heading text-lg border-2 rounded-full"
            v-hover-animate>Portfolio</router-link>
          <router-link to="/resume"
            class="text-color border-color button py-2 px-8 mr-4 heading text-lg border-2 rounded-full"
            v-hover-animate>Resume</router-link>
        </div>
      </div>
    </div>

    <div class="flex-none footer" ref="footerIcons">
      <SocialComponent svgClass="fill" />
    </div>
  </div>

  <MenuComponent />

</template>

<script>
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin"; // Importa CSSPlugin per supportare le animazioni CSS standard
import MenuComponent from "@/components/MenuComponent.vue";
import SocialComponent from "@/components/SocialComponent.vue";


gsap.registerPlugin(CSSPlugin);

export default {
  name: "Home",
  components: {
    MenuComponent,
    SocialComponent
  },
  data() {
    return {
      currentItem: 0,
      items: [
        {
          title: "Hello",
          text: "My name is Michele Paolino, <br>I'm a Napoli based web designer <br>and front-end developer.",
        },
        {
          title: "Skills",
          text: "Vue, WordPress, Bootstrap, Tailwind, <br>Figma, Adobe, UI design, Typography, <br> GSAP, Sass, Git, SEO.",
        },
        {
          title: "Nerd Pr!de",
          text: `<p>I'm author of Nomenklatura, <br>a design system for web devs. <br>Take a look on my <span><a class="underline underline-offset-8" href="https://github.com/michelediss?tab=repositories" target="_blank"><strong>GitHub.</strong></a></span></p>`,
        },
        {
          title: "Let's play!",
          text: `<p>Press <kbd class="c-key text-color">c</kbd> on your keyboard<br> or swipe up on mobile to change<br> the color palette of the site!</p>`,
        },
      ],
    };
  },
  computed: {
    currentItemData() {
      return this.items[this.currentItem];
    },
  },
  methods: {
    nextItem() {
      this.transitionSlide(() => {
        this.currentItem = (this.currentItem + 1) % this.items.length;
      });
    },
    prevItem() {
      this.transitionSlide(() => {
        this.currentItem = (this.currentItem - 1 + this.items.length) % this.items.length;
      });
    },
    goToItem(index) {
      if (index !== this.currentItem) {
        this.transitionSlide(() => {
          this.currentItem = index;
        });
      }
    },
    handleKeydown(event) {
      if (event.key === 'ArrowRight') {
        this.nextItem();
      } else if (event.key === 'ArrowLeft') {
        this.prevItem();
      }
    },
    transitionSlide(callback) {
      const carouselContent = this.$refs.carouselContent;
      const carouselTitle = this.$refs.carouselTitle;
      const underline = this.$refs.underline;

      if (carouselContent && carouselTitle) {
        gsap.to([carouselContent, carouselTitle], {
          duration: 0.5,
          opacity: 0,
          onComplete: () => {
            callback();
            gsap.to([carouselContent, carouselTitle], {
              duration: 0.5,
              opacity: 1,
            });
          },
        });
      }

      if (underline) {
        gsap.to(underline, {
          duration: 0.5,
          width: 0,
          opacity: 0,
          onComplete: () => {
            gsap.to(underline, {
              duration: 0.5,
              width: '100%',
              opacity: 1,
            });
          },
        });
      }
    },
  },
  mounted() {
  const tl = gsap.timeline();

  // Assicurati che tutti i riferimenti siano disponibili
  const carouselTitle = this.$refs.carouselTitle;
  const underline = this.$refs.underline;
  const carouselContent = this.$refs.carouselContent;
  const prevArrow = this.$refs.prevArrow;
  const nextArrow = this.$refs.nextArrow;
  const buttonContainer = this.$refs.buttonContainer; // Riferimento per i pulsanti
  const footerIcons = this.$refs.footerIcons; // Nuovo riferimento per footerIcons

  if (carouselTitle && underline && carouselContent && prevArrow && nextArrow && buttonContainer && footerIcons) {
    tl.to(carouselTitle, { opacity: 1, y: 0, duration: 0.5 }, "+=0.5");
    tl.to(underline, { opacity: 1, width: '100%', duration: 0.5 }, "-=0.3");
    tl.to(carouselContent, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    tl.to(this.$refs.swiperContainer, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

    // Animazione per i pulsanti
    const buttons = buttonContainer.querySelectorAll('.button');
    if (buttons.length > 0) {
      tl.to([...buttons], { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }, "-=0.3");
    }

    // Animazione per frecce del carosello
    gsap.set([prevArrow, nextArrow], { display: 'block' });
    tl.to([prevArrow, nextArrow], { opacity: 1, duration: 0.5 }, "-=0.3");

    // Aggiunta animazione per il footerIcons
    tl.to(footerIcons, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
  }

  window.addEventListener('keydown', this.handleKeydown);
},
};
</script>

<style scoped>
.title-page-underline,
p,
h1,
.button,
.footer,
.arrow {
  opacity: 0;
}

.title-page-underline {
  width: 0;
}

span,
a,
strong {
  display: inline;
}

.bullet.active {
  background-color: #1a202c;
}

</style>
