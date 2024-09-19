
// Import Bootstrap CSS et JS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';


import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous que le fichier `router/index.js` existe.

const app = createApp(App);

app.use(router); // Utilisation de Vue Router

app.mount('#app');

