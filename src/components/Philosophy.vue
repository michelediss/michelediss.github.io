<template>
  <div class="flex flex-col h-screen">
    <div class="flex-none">
      <HeaderComponent :pageTitle="pageTitle" ref="header" />
    </div>

    <div class="philosophy w-full lg:w-4/6 mx-auto pt-8" ref="philosophyContent">
      <div class="philosophy-title">
      <h1 class="mt-20 mb-12 heading text-4xl leading-tight">
        Suspension of disbelief in digital design: a narrative approach to Ui/Ux
      </h1>
    </div>

    <div class="philosophy-paragraph">
      <p class="text-xl md:text-2xl paragraph text-start mb-12">
        The concept of <a class="underline" target="_blank" href="https://en.wikipedia.org/wiki/Suspension_of_disbelief">suspension of disbelief</a>, originally articulated by the poet and literary critic <a class="underline" target="_blank" href="https://en.wikipedia.org/wiki/Samuel_Taylor_Coleridge">Samuel Taylor
          Coleridge</a>, refers to the intentional act of setting aside one's skepticism to engage with and enjoy elements
        within a narrative that may not conform to the laws of reality or logic. This cognitive process enables the
        audience to immerse themselves in a narrative by willingly accepting fantastical or non-realistic aspects as
        plausible within the context of the story. In essence, suspension of disbelief is a mental state where the
        audience consents to overlook the implausibility of certain elements to fully engage with the narrative
        experience.
      </p>
    </div>
    <div class="philosophy-paragraph">

      <p class="text-xl md:text-2xl paragraph text-start mb-12">
        When applied to the domain of UI/UX design and frontend web development, the principle of suspension of
        disbelief assumes a pivotal role in crafting digital experiences that captivate and retain user engagement.
        Digital interfaces, much like narratives, can benefit from designing elements that encourage users to transcend
        their everyday realities and immerse themselves in the digital environment presented to them. This immersion is
        achieved through a combination of visual design, animation, interactive storytelling, and consistency in user
        experience. By carefully orchestrating these elements, designers are able to construct digital environments that
        not only attract the user's attention but also sustain their engagement over time.
      </p>
    </div>


      <div class="philosophy-paragraph">
      <p class="text-xl md:text-2xl paragraph text-start mb-12">
        Visual design in this context is more than just aesthetic appeal; it serves as a gateway to an immersive
        experience. Through the use of color schemes, typography, imagery, and spatial arrangements, designers create a
        visually cohesive environment that supports the narrative or thematic elements of the digital experience. This
        visual coherence helps users to suspend their disbelief and accept the digital environment as a coherent,
        navigable space. Furthermore, animation and micro-interactions contribute to a dynamic sense of realism,
        providing immediate feedback and enhancing the perceived interactivity of the digital interface, which further
        supports the user's suspension of disbelief.
      </p>
    </div>

      <div class="philosophy-paragraph">
      <p class="text-xl md:text-2xl paragraph text-start mb-12">
        Moreover, storytelling in UI/UX design extends beyond mere content; it encompasses the entire journey of the
        user through the digital product. Storytelling can manifest through carefully crafted user flows that guide
        users seamlessly from one interaction to the next, creating a narrative-like progression that mirrors the
        structure of a traditional story. Consistency in design, such as maintaining uniform patterns, behaviors, and
        interface elements across the user journey, reinforces trust and familiarity, enabling users to focus on the
        narrative or interactive experience without being distracted by inconsistencies or unexpected deviations.
      </p>
    </div>

      <div class="philosophy-paragraph pb-8">
      <p class="text-xl md:text-2xl paragraph text-start">
        In conclusion, the application of the suspension of disbelief in UI/UX design and development is integral to
        creating digital experiences that are engaging and memorable. By leveraging the principles of visual design,
        animation, storytelling, and consistency, designers can craft immersive digital environments that encourage
        users to momentarily transcend the limitations of their everyday experiences, fostering deeper engagement and
        sustained interaction with digital products. This approach not only enhances user satisfaction but also
        establishes a meaningful connection between the user and the digital experience, ultimately contributing to the
        overall effectiveness and success of the design.
      </p>
    </div>

    </div>
    
    <div class="flex-none">
      <SocialComponent/>
    </div>
  </div>
  <MenuComponent />

</template>

<script>
import { gsap } from "gsap";
import HeaderComponent from "@/components/HeaderComponent.vue";
import MenuComponent from "@/components/MenuComponent.vue";
import SocialComponent from "@/components/SocialComponent.vue";


export default {
  name: "Philosophy",
  components: {
    HeaderComponent,
    MenuComponent,
    SocialComponent
  },
  data() {
    return {
      pageTitle: "What I think",
    };
  },
  mounted() {
    // Timeline GSAP per animazioni sequenziali
    const tl = gsap.timeline();

    // Animazione del Philosophy Title
    tl.from(this.$refs.philosophyContent.querySelector('.philosophy-title'), { 
      opacity: 0, 
      y: 50, 
      duration: 0.8 
    }, "+=0.8");

    // Animazioni delle paragrafi in modo sequenziale
    this.$refs.philosophyContent.querySelectorAll('.philosophy-paragraph').forEach((paragraph, index) => {
      tl.from(paragraph, { 
        opacity: 0, 
        y: 50, 
        duration: 0.8 
      }, "-=0.4"); // Utilizzo di "-=0.4" per sovrapporre le animazioni
    });
  }
};
</script>


<style scoped>
.philosophy-title {
  line-height: 1.15!important;
}
</style>
