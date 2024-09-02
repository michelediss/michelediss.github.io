<template>
  <div class="flex-none">
    <HeaderComponent :pageTitle="pageTitle" ref="header" />
  </div>

  <div class="intro-resume container mt-24 mb-16 mx-auto w-full lg:w-5/6 flex justify-center flex-wrap" ref="introResume">
    <p class="text-color text-xl md:text-2xl paragraph text-center mb-12">
      My name is Michele Paolino, I'm a web designer and front-end developer.
      My job involves designing and developing modern, lightweight, and high-performance web solutions.
      I apply to my works the knowledge I have gained from studying the processes that govern
      visual communication in its formal and functional aspects.
    </p>
    <a href="#" v-hover-animate target="_blank" class="text-color border-color button rounded-full px-8 py-1 text-lg">Download CV</a>
  </div>

  <div class="work-history" ref="workHistory">
    <div class="w-full lg:w-5/6 mx-auto">
      <h2 class="text-color mt-20 mb-12 heading uppercase text-3xl">
        Work history
      </h2>
      <div class="bg-secondary-color h-0.5 w-full opacity-50"></div>
    </div>

    <div class="container mx-auto w-full lg:w-5/6 mb-12 flex flex-wrap">
      <div v-for="(item, index) in items" :key="index">
        <div class="block md:flex py-4 my-4">
          <div class="w-full md:w-1/3 lg:w-1/4 pt-2">
            <h2 class="text-color text-xl heading mb-2">{{ item.job }}</h2>
          </div>
          <div class="w-full md:w-2/3 lg:w-3/4">
            <h3 class="text-color text-lg mb-1 paragraph">{{ item.position }}</h3>
            <p class="text-color text-base paragraph">
              {{ item.description }}
            </p>
          </div>
        </div>

        <div class="bg-secondary-color h-0.5 w-full opacity-50"></div>
      </div>
    </div>
  </div>

  <div class="tech-stack" ref="techStack">
    <div class="w-full lg:w-5/6 mx-auto">
      <h2 class="text-color mt-20 mb-12 heading uppercase technical-skills text-xl">
        Tech stack
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full lg:w-5/6 mx-auto gap-8 pb-32">
      <div v-for="(skill, index) in skills" :key="index">
        <h3 class="text-color text-base heading mb-2 uppercase">{{ skill.scope }}</h3>
        <p class="text-color text-lg paragraph">{{ skill.skill }}</p>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<script>
import { gsap } from "gsap";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "Resume",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      pageTitle: "Resume",
      items: [
        {
          job: "Dopolavoro ",
          position: "Web developer",
          description:
            "Specialized in creating websites that are both visually stunning and functionally robust, maintaining the firm’s reputation for design excellence. Continuously explored and implemented new web design trends, keeping the firm’s offerings innovative and competitive. Integrated technical and design expertise to achieve cohesive and engaging user experiences.",
        },
        {
          job: "Sari Advertising",
          position: "Web designer & developer",
          description:
            "Integral member of a team dedicated to producing advanced web designs and strategic advertising solutions. Developed SEO-optimized websites to maximize client visibility and improve user engagement and conversion rates. Collaborated with cross-functional teams to ensure a unified and effective brand message.",
        },
        {
          job: "Becoming Lab",
          position: "Web designer & developer",
          description:
            "Led a team in creating innovative web applications and marketing solutions, with a focus on elevating clients’ digital presence. Managed projects from concept to completion, emphasizing adherence to timelines without compromising quality. Built and maintained strong client relationships to ensure projects align with their business goals and brand identity.",
        },
      ],
      skills: [
        {
          scope: "Front-end Development",
          skill: "Vue.js, Bootstrap, Tailwind CSS, Sass, PHP, hsluv",
        },
        {
          scope: "CMS",
          skill: "WordPress, Prestashop",
        },
        {
          scope: "Design & Prototyping",
          skill: "Figma, Adobe Photoshop, Adobe Illustrator",
        },
        {
          scope: "UI design",
          skill: "User Interface design principles, typography, color theory",
        },
        {
          scope: "Animation & Effects",
          skill: "GreenSock Animation Platform (GSAP)",
        },
        {
          scope: "Version Control",
          skill: "Git, GitHub",
        },
      ],
    };
  },
  mounted() {
    // Timeline GSAP per animazioni sequenziali
    const tl = gsap.timeline();

    // Aggiunta delle animazioni alla timeline
    tl.from(this.$refs.introResume, { opacity: 0, y: 50, duration: 0.8 }, "-=0.4")
      .from(this.$refs.workHistory, { opacity: 0, y: 50, duration: 0.8 }, "-=0.4")
      .from(this.$refs.techStack, { opacity: 0, y: 50, duration: 0.8 }, "-=0.4");
  }
};
</script>

<style scoped>
.technical-skills {
  text-transform: uppercase !important;
}
</style>
