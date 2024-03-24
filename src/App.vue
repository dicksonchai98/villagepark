<script setup>
import { RouterLink, RouterView } from "vue-router";
import { reactive, ref, computed } from "vue";
import shopeeView from "./views/shopeeView.vue";
import cartView from "./views/cartView.vue";
import { useProductsStore } from "./stores/productsStore";
import navbarView from "./components/navbarView.vue";
import sidebarView from "./components/sidebarView.vue";
import footerView from "./components/footerView.vue";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDOizo30IP3JsaUVfL6hKu1F-VwxOzyaK0",
  authDomain: "villagepark1-38271.firebaseapp.com",
  projectId: "villagepark1-38271",
  storageBucket: "villagepark1-38271.appspot.com",
  messagingSenderId: "738029769841",
  appId: "1:738029769841:web:aaa702497a70d13f24b7d0",
};

const app = initializeApp(firebaseConfig);
</script>

<template>
  <sidebarView />
  <RouterView />
  <footerView />
</template>
