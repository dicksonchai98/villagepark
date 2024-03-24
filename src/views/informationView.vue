<script setup>
import { useProductsStore } from "../stores/productsStore";
import { reactive, ref } from "vue";
import ItemswiperView from "../components/itemswiperView.vue";
import { useRouter } from "vue-router";

const route = useRouter();
const productsStore = useProductsStore();

const productInCarts = reactive(
  JSON.parse(localStorage.getItem("productsInCart")) || []
);
const cartNums = reactive(
  JSON.parse(localStorage.getItem("cartNumbers")) || ""
);
const foamInfo = ref({
  name: " ",
  phone: " ",
  address: " ",
  email: " ",
  備注: " ",
});

const information = () => {
  if (cartNums == null || cartNums == false) {
    route.push("/");
  } else route.push("information");
};
</script>

<template>
  <body>
    <section class="step-section">
      <div class="step">
        <ul>
          <li class="stepnow">1</li>
          <span></span>

          <li class="stepnow">2</li>
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
    <div class="info-container">
      <section class="carts-info">
        <h2>購物車</h2>
        <hr />

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
              {{ product.inCart }}
            </div>
            <div class="total-price">
              NT${{ product.price * product.inCart }}
            </div>
          </div>
        </div>
      </section>
      <section class="client-info">
        <div class="form-container">
          <h2>填寫資料</h2>
          <hr />

          <form @submit.prevent="productsStore.handleSubmit(foamInfo)">
            <label for="name">姓名：</label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="foamInfo.name"
              required
            />

            <label for="phone">電話：</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              v-model="foamInfo.phone"
            />

            <label for="address">郵送地址：</label>
            <input
              type="text"
              id="address"
              name="address"
              required
              v-model="foamInfo.address"
            />

            <label for="email">電子郵件：</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              v-model="foamInfo.email"
            />

            <label for="備注">備注：</label>
            <input
              class="textarea"
              type="textarea"
              id="備注"
              name="備注"
              v-model="foamInfo.備注"
            />

            <button type="submit">提交</button>
          </form>
        </div>
      </section>
    </div>
    <!-- <ItemswiperView /> -->
  </body>
</template>
