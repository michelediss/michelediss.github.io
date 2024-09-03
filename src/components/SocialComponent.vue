<template>
    <footer class="flex justify-center w-full left-0 z-50">

  <div class="container flex justify-center items-center relative inline-block w-auto mt-16 mb-8">
    <!-- Icona Mail -->
    <a href="mailto:hello@michelepaolino.me" target="_blank" class="icon flex items-center px-8">
      <svg xmlns="http://www.w3.org/2000/svg" 
        width="32" 
        height="32" 
        :class="svgClass" 
        viewBox="0 0 15.6 16"
        preserveAspectRatio="xMidYMid meet"
        >
        <path d="M15.6,7.1c0-4.2-3.2-7.1-7.7-7.1C3.2,0,0,3.3,0,8c0,4.9,3.1,8,8.1,8c1.2,0,2.4-0.2,3.2-0.5v-1.2c-0.6,0.3-1.9,0.5-3.2,0.5
	c-4.1,0-6.7-2.6-6.7-6.7c0-4,2.7-6.8,6.4-6.8c3.8,0,6.5,2.4,6.5,5.8c0,2.4-0.8,3.9-2,3.9c-0.7,0-1.1-0.4-1.1-1.1V4.2H9.7v1.2H9.6
	C9.2,4.6,8.3,4,7.3,4C5.4,4,4,5.7,4,8c0,2.4,1.3,4.1,3.3,4.1c1.1,0,2-0.5,2.4-1.5h0.2c0.1,0.9,1,1.6,2.1,1.6
	C14.2,12.2,15.6,10.2,15.6,7.1L15.6,7.1z M5.5,8c0-1.7,0.8-2.7,2-2.7c1.3,0,2.1,1,2.1,2.7s-0.8,2.7-2.2,2.7C6.3,10.7,5.5,9.7,5.5,8"
	/>      </svg>
    </a>

    <!-- Icona Linkedin -->
    <a href="https://www.linkedin.com/in/michele-paolino/" target="_blank" class="icon flex items-center px-8">
      <svg xmlns="http://www.w3.org/2000/svg" 
        width="32" 
        height="32" 
        :class="svgClass" 
        viewBox="0 0 16 16">
        <path
          d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
      </svg>
    </a>

    <!-- Icona GitHub -->
    <a href="https://github.com/michelediss?tab=repositories" target="_blank" class="icon flex items-center px-8">
      <svg xmlns="http://www.w3.org/2000/svg" 
      width="32" 
      height="32" 
      :class="svgClass"
      viewBox="0 0 32 32">
        <g class="st0">
          <path class="st1" d="M16,2.7C8.7,2.7,2.7,8.7,2.7,16s6,13.4,13.4,13.4s13.4-6,13.4-13.4S23.4,2.7,16,2.7z M0,16C0,7.2,7.2,0,16,0
		s16,7.2,16,16s-7.2,16-16,16S0,24.9,0,16z" />
          <path class="st1" d="M12.8,30.4c-0.1-0.2-0.1-1.7,0-4.5c-1.4,0-2.3,0-2.6-0.3c-0.5-0.4-1.1-1.5-1.6-2.3s-1.6-0.9-2-1.1
		c-0.4-0.2-0.5-0.9,1.2-0.3c1.7,0.5,1.8,2,2.4,2.4c0.6,0.3,1.9,0.2,2.5-0.1c0.6-0.3,0.6-1.3,0.7-1.7c0.1-0.4-0.3-0.5-0.4-0.5
		c-0.6,0-3.6-0.7-4.5-3.6c-0.8-3,0.2-4.9,0.8-5.7c0.4-0.6,0.4-1.7-0.1-3.6c1.6-0.2,2.9,0.3,3.8,1.6c0,0,1.2-0.7,3-0.7
		c1.9,0,2.5,0.6,3,0.7c0.5,0.1,0.9-2.2,4-1.6c-0.7,1.3-1.2,2.9-0.8,3.6c0.4,0.7,2.1,2.8,1.1,5.7c-0.7,2-2,3.2-4,3.6
		c-0.2,0.1-0.3,0.2-0.3,0.3c0,0.2,0.3,0.3,0.7,1.4c0.3,0.8,0.3,2.9,0.1,6.4c-0.6,0.2-1.1,0.3-1.5,0.3c-0.6,0.1-1.3,0.2-2,0.2
		c-0.7,0-0.9,0-1.8-0.1C14,30.6,13.4,30.5,12.8,30.4z" />
        </g>
      </svg>
    </a>
  </div>
</footer>

</template>

<script>
export default {
  name: "SocialComponent",
  props: {
    svgClass: {
      type: String,
      default: "fill",
    },
  },
};
</script>

<style scoped>
/* Stili addizionali se necessari */
</style>
