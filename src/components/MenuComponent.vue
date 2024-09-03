<template>

  <div
    class="hamburger-container z-50 fixed bottom-3.5 right-3.5 shadow-lg backdrop-blur-sm bg-white/50 container flex justify-center p-4 items-center rounded-full inline-block w-auto">
    <button class="hamburger flex items-center" @click="toggleMenu">
      <svg class="hamburger-icon fill-black" width="30px" height="30px" viewBox="0 0 12 12"
        enable-background="new 0 0 12 12" id="hamburger" version="1.1" xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g>
          <rect class="line top" height="1" width="11" x="0.5" y="2.5" />
          <rect class="line middle" height="1" width="11" x="0.5" y="5.5" />
          <rect class="line bottom" height="1" width="11" x="0.5" y="8.5" />
        </g>
      </svg>
    </button>
  </div>

  <!-- Menu Full Screen -->
  <div ref="modal" class="menu-fullscreen flex flex-col justify-between min-h-screen fixed inset-0 bg-menu-color z-40">

    <header>
      <nav id="nav-back" class="flex pt-6 w-full lg:w-5/6 mx-auto">
        <div class="flex justify-center w-full">
          <div class="title-page-container">
            <h2 ref="title" class="title-page-text text-xl heading text-menu-color opacity-0">Menu</h2>
            <div ref="underline" class="title-page-underline h-0.5 bg-secondary-menu-color w-0"></div>
          </div>
        </div>
      </nav>
    </header>

    <div class="menu-content flex flex-col items-center justify-center text-white">
      <ul class="text-center" ref="menuItems">
        <li class="paragraph my-4 menu-item-li">
          <div class="inline-block w-auto menu-item-wrapper">
            <router-link to="/" class="text-4xl md:text-5xl text-menu-color my-0"
              @click.native="toggleMenu">Home</router-link>
            <div class="w-0 h-1 bg-secondary-menu-color menu-item-line"></div>
          </div>
        </li>
        <li class="paragraph my-4 menu-item-li">
          <div class="inline-block w-auto menu-item-wrapper">
            <router-link to="/portfolio" class="text-4xl md:text-5xl text-menu-color my-0"
              @click.native="toggleMenu">Portfolio</router-link>
            <div class="w-0 h-1 bg-secondary-menu-color menu-item-line"></div>
          </div>

        </li>
        <li class="paragraph my-4 menu-item-li">
          <div class="inline-block w-auto menu-item-wrapper">
            <router-link to="/resume" class="text-4xl md:text-5xl text-menu-color my-0"
              @click.native="toggleMenu">Resume</router-link>
            <div class="w-0 h-1 bg-secondary-menu-color menu-item-line"></div>
          </div>

        </li>
        <li class="paragraph my-4 menu-item-li">
          <div class="inline-block w-auto menu-item-wrapper">
            <router-link to="/vision" class="text-4xl md:text-5xl text-menu-color my-0"
              @click.native="toggleMenu">Vision</router-link>
            <div class="w-0 h-1 bg-secondary-menu-color menu-item-line"></div>
          </div>

        </li>
      </ul>
    </div>

    <div class="flex-none footer" ref="footerIcons">
      <SocialComponent svgClass="fill-menu" />
    </div>

  </div>
</template>


<script>
import { gsap } from "gsap";
import SocialComponent from './SocialComponent.vue';


export default {
  components: {
    SocialComponent,
  },
  name: "MenuComponent",
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
  toggleMenu() {
    this.isModalOpen = !this.isModalOpen;

    if (this.isModalOpen) {
      document.querySelector('.hamburger-icon').classList.add('is-open');
      document.body.classList.add('no-scroll');

      this.$nextTick(() => {
        if (this.$refs.modal) {
          gsap.fromTo(
            this.$refs.modal,
            { y: '-100%' },
            { y: '0%', duration: 0.5, ease: "power2.out", onComplete: () => this.animateTitleAndUnderline() }
          );
        }

        if (this.$refs.menuItems && this.$refs.menuItems.children.length > 0) {
          gsap.fromTo(
            this.$refs.menuItems.children,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, delay: 0.5, stagger: 0.1, ease: "power2.out" }
          );
        }

        if (this.$refs.footerIcons) {
          gsap.fromTo(
            this.$refs.footerIcons,
            { opacity: 0 },  // Inizia con opacità 0 e spostato leggermente verso il basso
            { opacity: 1, duration: 0.5, ease: "power2.out", delay: 1.2 }  // Ritarda per sincronizzarsi con le altre animazioni
          );
        }
      });

    } else {
      document.querySelector('.hamburger-icon').classList.remove('is-open');
      document.body.classList.remove('no-scroll');

      if (this.$refs.modal) {
        gsap.to(this.$refs.modal, {
          y: '-100%',
          duration: 0.5,
          ease: "power1.in",
          onComplete: () => this.resetTitleAndUnderline()
        });
      }

      // Aggiungi un'animazione di uscita per footerIcons quando si chiude il menu
      if (this.$refs.footerIcons) {
        gsap.to(this.$refs.footerIcons, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.in"
        });
      }
    }
  },
  animateTitleAndUnderline() {
    this.$nextTick(() => {
      if (this.$refs.title && this.$refs.underline) {
        gsap.fromTo(
          this.$refs.title,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        gsap.fromTo(
          this.$refs.underline,
          { width: 0 },
          { width: '100%', duration: 0.5, ease: "power2.out" }
        );
      }
    });
  },
  resetTitleAndUnderline() {
    this.$nextTick(() => {
      if (this.$refs.title && this.$refs.underline) {
        gsap.set(this.$refs.title, { opacity: 0 });
        gsap.set(this.$refs.underline, { width: 0 });
      }
    });
  }
}
,
  // Aggiungi qui l'hook beforeRouteLeave
  beforeRouteLeave(to, from, next) {
    // Fermare tutte le animazioni GSAP sugli elementi target prima di lasciare la pagina
    if (this.$refs.title && this.$refs.underline) {
      gsap.killTweensOf([this.$refs.title, this.$refs.underline]);
    }
    next(); // Continua con la navigazione
  }
};
</script>




<style scoped>
.icon svg {
  height: auto;
  width: 1.8rem;
}

.hamburger-icon {
  cursor: pointer;
}

.line {
  transition: transform 0.4s ease, opacity 0.4s ease;
  transform-origin: center;
}

.is-open .line.top {
  transform: translateX(-1.5px) translateY(2px) rotate(45deg)
}

.is-open .line.middle {
  opacity: 0;
}

.is-open .line.bottom {
  transform: translateX(-1.5px) translateY(-2px) rotate(-45deg)
}


/* CSS per il menu full screen */
.menu-fullscreen {
  inset: 0;
  transform: translateY(-100%);
}

.menu-content {
  text-align: center;
}

.menu-item-wrapper {
  .menu-item-line {
    transition: 0.3s;
  }
}

.menu-item-wrapper:hover {
  .menu-item-line {
    width: 100%;
  }
}

.title-page-underline {
  width: 0;
}

.footer {
  opacity: 0;
}
</style>
