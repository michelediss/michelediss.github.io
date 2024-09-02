progetto-vue/
│
├── node_modules/              # Dipendenze del progetto installate
│
├── public/                    # File statici che non vengono processati da Webpack
│   ├── favicon.ico            # Icona del sito
│   └── index.html             # Template HTML principale
│
├── src/                       # Codice sorgente dell'applicazione
│   ├── assets/                # Risorse come immagini e stili
│   │   ├── images/            # Immagini utilizzate nell'applicazione
│   │   └── styles/            # Stili SASS/SCSS
│   │       ├── main.scss      # File SASS principale
│   │       └── _variables.scss # Partial SASS per variabili
│   │
│   ├── components/            # Componenti Vue
│   │   ├── HomePage.vue       # Componente per la pagina Home
│   │   ├── PortfolioPage.vue  # Componente per la pagina Portfolio
│   │   └── CVPage.vue         # Componente per la pagina Curriculum Vitae
│   │
│   ├── router/                # Configurazione del router Vue
│   │   └── index.js           # File di configurazione del router
│   │
│   ├── App.vue                # Componente radice dell'applicazione
│   └── main.js                # Punto di ingresso JavaScript dell'applicazione
│
├── .gitignore                 # Specifica quali file e cartelle ignorare in git
├── babel.config.js            # Configurazione di Babel
├── package.json               # Gestisce le dipendenze e gli script del progetto
├── package-lock.json          # Blocco delle versioni delle dipendenze
└── README.md                  # Documentazione del progetto
