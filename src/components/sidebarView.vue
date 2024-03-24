<script setup>
import { RouterLink, RouterView } from "vue-router";
import { reactive, ref, computed } from "vue";
import { useProductsStore } from "../stores/productsStore";
import NavbarView from "./navbarView.vue";

const isActive = ref(false);
const productsStore = useProductsStore();

function showSidebar() {
  return (isActive.value = !isActive.value);
}
const sidebar_Width = 400;
const sidebarWidthCollapsed = 0;
const sidebarWidth = computed(
  () => `${isActive.value ? sidebar_Width : sidebarWidthCollapsed}px`
);
const productInCarts = reactive(
  JSON.parse(localStorage.getItem("productsInCart")) || []
);
</script>

<template>
  <NavbarView @toggleSidebar="showSidebar" />
  <div :class="{ overlay: isActive }"></div>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <div class="sidebar-header">
      <h2>購物車</h2>
      <a href=""><i @click.prevent="showSidebar" class="bi bi-x"></i></a>
    </div>
    <div class="sidebar-content">
      <templates v-if="productsStore.cartNums">
        <ul
          v-for="product in productsStore.productInCart"
          :key="product.id"
          v-show="product.inCart !== 0"
        >
          <li>
            <a @click.prevent="productsStore.deleteItem(product.id)" href=""
              ><i class="bi bi-x-circle"></i
            ></a>
          </li>
          <li>
            <img :src="product.image" alt="" />
          </li>
          <li>
            <p>{{ product.name }}</p>
            <p>NT${{ product.price }}</p>
            <p>數量：{{ product.inCart }}</p>
          </li>
        </ul>

        <RouterLink @click="productsStore.submitLoading" to="/cart">
          <button @click="showSidebar">去購物車</button></RouterLink
        >
      </templates>
      <template v-else>
        <div class="more-item">
          <div class="noCart">
            <i class="bi bi-emoji-frown"></i>
            <p>購物車空空的哦</p>
          </div>
          <a href=""
            ><RouterLink @click="productsStore.submitLoading" to="/item"
              ><button @click="showSidebar">來去逛逛吧</button></RouterLink
            ></a
          >
        </div></template
      >
    </div>
  </div>
</template>
