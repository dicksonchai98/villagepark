<script setup>
import { useProductsStore } from "../stores/productsStore";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { reactive, ref } from "vue";
import ItemswiperView from "../components/itemswiperView.vue";

const productsStore = useProductsStore();
const products = productsStore.products;
const quantity = ref(1);
const filter = ref("paid");
const route = useRoute();

const product = products.find((item) => item.id === Number(route.params.id));

const add = (productId) => {
  for (let i = 0; i < quantity.value; i++) {
    productsStore.addCartNums(productId);
  }
};
</script>

<template>
  <body>
    <section class="item-container">
      <div class="item-container-img">
        <img :src="product.image" alt="" />
      </div>
      <div class="item-detail-container">
        <p>首頁/全部產品/{{ product.catagory }}</p>

        <h2>{{ product.name }}</h2>
        <p>NT$ {{ product.price }} 元</p>
        <p class="item-describe">{{ product.describe }}。</p>
        <div></div>
        <input class="volume" type="number" v-model="quantity" min="1" />
        <button @click.prevent="add(product.id)">加入購物車</button>
      </div>
    </section>
    <section class="item-mustknow">
      <div class="mustknow-title">
        <div :class="{ mustknowseleted: filter === 'paid' }">
          <a @click.prevent="filter = 'paid'" href="">付款/取貨</a>
        </div>
        <div :class="{ mustknowseleted: filter === 'mustknow' }">
          <a @click.prevent="filter = 'mustknow'" href="">購物須知</a>
        </div>
      </div>
      <div class="mustknow-content">
        <ul v-if="filter == 'paid'">
          <li>付款方式：現金付款、信用卡</li>
          <li>取/送貨方式：店面自取、黑貓-常溫（送貨需要2-3日）</li>
        </ul>
        <ul v-else>
          <li>
            品項有限，每款商品最多限購5個，如需大量訂購請與我們聯繫，將提供報價單！
          </li>
          <li>食品均無防腐劑，請注意保鮮，儘早食用完畢</li>
          <li>
            有任何問題都可以【聯繫我們】，我們會在看到你的來訊/來信的時候盡快回覆你的訊息！
          </li>
        </ul>
      </div>
    </section>
    <ItemswiperView />
  </body>
</template>
