<script setup>
import { useProductsStore } from "../stores/productsStore";
import { computed, reactive } from "vue";

const productsStore = useProductsStore();
console.log(productsStore.foamData);
const orderInfo = productsStore.foamData;
const cartCost = reactive(JSON.parse(localStorage.getItem("cartCost")) || "00");
</script>

<template>
  <div class="orderInfo">
    <div class="orderInfo-container">
      <i class="bi bi-bag"></i>
      <h1>訂單已完成</h1>
      <p>請確認訂單資訊，如有錯誤麻煩立即和我們聯係</p>
      <p>姓名：{{ orderInfo.name }}</p>
      <p>聯絡電話：{{ orderInfo.phone }}</p>
      <p>寄送地址：{{ orderInfo.address }}</p>
      <p>電子信箱：{{ orderInfo.email }}</p>
      <p>總金額：NT${{ cartCost }}元</p>
    </div>
    <div class="more-item">
      <a href=""
        ><RouterLink to="/item"
          ><button @click="productsStore.clearOrder">
            繼續購物
          </button></RouterLink
        ></a
      >
    </div>
  </div>
</template>
