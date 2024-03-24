<script setup>
import { RouterLink, RouterView } from "vue-router";
import { reactive, ref, watchEffect, computed } from "vue";
import { useProductsStore } from "../stores/productsStore";
import ItemswiperView from "../components/itemswiperView.vue";

const showValue = ref(false);
const productsStore = useProductsStore();
const productInCarts = reactive(
  JSON.parse(localStorage.getItem("productsInCart")) || []
);
const cartCost = reactive(JSON.parse(localStorage.getItem("cartCost")) || "00");

const countCosts = computed(() => {
  let totalCost = ref(0); // 初始化總成本為 0

  productsStore.productInCart.forEach((item) => {
    totalCost.value += item.price * item.inCart;
  });

  return totalCost;
});
</script>

<template>
  <body>
    <section class="step-section">
      <div class="step">
        <ul>
          <li class="stepnow">1</li>
          <span></span>

          <li>2</li>
          <span></span>

          <li>3</li>
        </ul>
      </div>
      <div class="step-title">
        <ul>
          <li>購物清單</li>
          <li>填寫資料</li>
          <li>確認訂單</li>
        </ul>
      </div>
    </section>
    <section class="carts">
      <h2>購物車</h2>
      <hr />
      <template v-if="productsStore.cartNums">
        <div
          v-for="product in productsStore.productInCart"
          :key="product.id"
          class="cart-item"
          v-show="product.inCart !== 0"
        >
          <div class="cart-item-img-container">
            <img :src="product.image" alt="" />
          </div>
          <div class="right-item">
            <div>
              <h3 class="item-name">{{ product.name }}</h3>
            </div>
            <div class="volume">
              <i
                @click="productsStore.addCartNums(product.id)"
                class="bi bi-caret-up"
              ></i
              >{{ product.inCart
              }}<i
                @click="productsStore.decreaseCartNums(product.id)"
                class="bi bi-caret-down"
              ></i>
            </div>
            <div class="total-price">
              NT${{ product.price * product.inCart }}
            </div>
            <div class="delete-btn">
              <a @click.prevent="productsStore.deleteItem(product.id)" href="">
                <i class="bi bi-trash3"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="count">
          <div class="total-count">
            <p>總額</p>
            <h1>NT${{ countCosts }}元</h1>
          </div>
          <div>
            <a href="">
              <RouterLink class="gotocart" to="/information"
                ><button @click="productsStore.submitLoading">
                  買單
                </button></RouterLink
              >
            </a>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="more-item">
          <div class="noCart">
            <i class="bi bi-emoji-frown"></i>
            <p>購物車空空的哦</p>
          </div>
          <a href=""
            ><RouterLink to="/item"
              ><button @click="console.log(productsStore.productInCart)">
                來去逛逛吧
              </button></RouterLink
            ></a
          >
        </div>
      </template>
    </section>
    <ItemswiperView />
  </body>
</template>
