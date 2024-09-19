// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ListCustomers from '../components/customers/customer.vue'; // Ajoute l'extension .vue



// Importer les composants pour les produits
import ListProduct from '../components/products/product.vue'; // Liste des produits
import order from '../components/orders/order.vue'; // Liste des produits


const routes = [
  
  { path: '/customers', component: ListCustomers }, // Liste des clients
  
  { path: '/products', component: ListProduct }, // Liste des produits
  { path: '/orders', component: order }, // Liste des produits
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

