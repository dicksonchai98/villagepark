<script setup>
import SwiperView from "../components/swiperView.vue";
</script>

<template>
  <div class="item">
    <div class="item-list-title">
      <h2>推薦商品</h2>
    </div>
    <div class="item-list">
      <SwiperView />
    </div>
    <div class="more-item">
      <a href=""
        ><RouterLink to="/item"
          ><button @click="productsStore.submitLoading">
            更多商品
          </button></RouterLink
        ></a
      >
    </div>
  </div>
</template>
