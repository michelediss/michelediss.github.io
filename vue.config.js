// vue.config.js
module.exports = {
    // Configura il publicPath per GitHub Pages
    publicPath: process.env.NODE_ENV === "production" ? "michelepaolino.me" : "/",
    
    chainWebpack: (config) => {
      config.module
        .rule('vue')
        .use('vue-loader')
        .tap((options) => {
          // Assicurati che compilerOptions esista
          options.compilerOptions = options.compilerOptions || {};
          // Escludi gli elementi personalizzati swiper-container e swiper-slide dalla compilazione di Vue
          options.compilerOptions.isCustomElement = (tag) =>
            tag === 'swiper-container' || tag === 'swiper-slide';
          return options;
        });
    },
  };
  