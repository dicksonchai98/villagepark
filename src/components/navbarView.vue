<script setup>
import { RouterLink, RouterView } from "vue-router";
import { reactive, ref, computed } from "vue";
import { useProductsStore } from "../stores/productsStore";
import SidebarView from "./sidebarView.vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const route = useRouter();
const auth = getAuth();
const productsStore = useProductsStore();

const productInCarts = reactive(
  JSON.parse(localStorage.getItem("productsInCart")) || []
);
const isLogin = ref(false);
getAuth().onAuthStateChanged((user) => {
  if (user) {
    isLogin.value = true;
    console.log("login");
    console.log(isLogin.value);
  } else {
    isLogin.value = false;
    console.log(isLogin.value);
  }
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    route.push("/");
  });
};
</script>

<template>
  <nav class="navbar">
    <div class="title">
      <a href=""
        ><RouterLink to="/"
          ><img class="titlelogo" src="../assets/titlelogo.png" alt=""
        /></RouterLink>
      </a>
    </div>
    <div class="menu">
      <ul>
        <li>
          <RouterLink @click="productsStore.submitLoading" to="/item"
            >全部商品</RouterLink
          >
        </li>
        <li>
          <RouterLink @click="productsStore.submitLoading" to="/cart"
            >購物車</RouterLink
          >
        </li>
        <li v-if="!isLogin">
          <RouterLink
            class="islogin"
            @click="productsStore.submitLoading"
            to="/login"
            >登入</RouterLink
          >
        </li>
        <li v-else>
          <RouterLink class="dropdown-btn islogin" to="/">
            <span class="login-state"></span>已登入</RouterLink
          >
          <ul class="dropdown">
            <li>
              <button @click="handleSignOut">登出</button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div id="element" class="cart">
      <i @click="$emit('toggleSidebar')" class="bi bi-cart"
        ><span v-if="productsStore.cartNums">{{ productsStore.cartNums }}</span
        ><span v-else>0</span></i
      >
      <i class="bi bi-list">
        <ul class="dropdown">
          <li><RouterLink to="/item">全部商品</RouterLink></li>
          <li><RouterLink to="/cart">購物車</RouterLink></li>
          <li v-if="!isLogin">
            <RouterLink @click="productsStore.submitLoading" to="/login"
              >登入</RouterLink
            >
          </li>
          <li v-else>
            <a class="bi-list-btn" @click="handleSignOut">登出</a>
          </li>
        </ul>
      </i>
    </div>
    <div></div>
  </nav>
</template>
