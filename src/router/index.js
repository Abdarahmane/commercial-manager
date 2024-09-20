// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import ListCustomers from "../components/customers/Customer.vue"; 

// Importer les composants pour les produits
import ListProduct from "../components/products/Product.vue"; 
import order from "../components/orders/Order.vue"; 

const routes = [
  { path: "/customers", component: ListCustomers },

  { path: "/products", component: ListProduct }, 
  { path: "/orders", component: order }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
