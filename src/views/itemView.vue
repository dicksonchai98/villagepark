<script setup>
import { useProductsStore } from "../stores/productsStore";
import { RouterLink, RouterView } from "vue-router";
import { reactive, ref, computed } from "vue";
import ScrollToView from "../components/scrolltoView.vue";

const productsStore = useProductsStore();
const searchText = ref("");
const filter = ref("all");
const isVisible = ref(true);

const man = productsStore.products.filter((item) => item.catagory === "主食");
const girl = productsStore.products.filter((item) => item.catagory === "飲料");
const other = productsStore.products.filter(
  (item) => item.catagory === "其他商品"
);

const getFilteredProducts = (products, searchText) => {
  const searchTextLowerCase = searchText.value.toLowerCase();
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTextLowerCase)
  );
};

const filteredProducts1 = computed(() =>
  getFilteredProducts(productsStore.products, searchText)
);
const filteredProducts2 = computed(() => getFilteredProducts(man, searchText));
const filteredProducts3 = computed(() => getFilteredProducts(girl, searchText));
const filteredProducts4 = computed(() =>
  getFilteredProducts(other, searchText)
);
</script>

<template>
  <body>
    <div class="searchbar">
      <p>首頁/全部商品</p>
      <div>
        <input
          placeholder="請輸入關鍵字..."
          v-model="searchText"
          type="text"
        /><i class="bi bi-search"></i>
      </div>
    </div>

    <section class="item-section">
      <div class="filter-item">
        <div>
          <a href="">
            <h3 @click.prevent="filter = 'all'" href="">全部商品</h3>
          </a>
        </div>

        <div class="filter-item-content">
          <p>
            <a @click.prevent="filter = 'man'" href="">主食</a>
            <i class="bi bi-chevron-double-right"></i>
          </p>
          <p>
            <a @click.prevent="filter = 'girl'" href="">飲料</a>
            <i class="bi bi-chevron-double-right"></i>
          </p>
          <p>
            <a @click.prevent="filter = 'other'" href="">其他商品</a>
            <i class="bi bi-chevron-double-right"></i>
          </p>
        </div>
      </div>
      <div v-if="filter === 'all'" class="item-display item-display-all">
        <ul>
          <li v-for="product in filteredProducts1" :key="product.id">
            <RouterLink
              :to="{
                name: 'itemdetail',
                params: { id: product.id },
              }"
            >
              <img :src="product.image" alt="" />
            </RouterLink>
            <div class="price-detail">
              <div class="item-detail">
                <p>{{ product.name }}</p>
                <p>NT${{ product.price }}</p>
              </div>
              <div class="addtocart">
                <a
                  @click.prevent="productsStore.addCartNums(product.id)"
                  href=""
                  ><i class="bi bi-cart-plus"></i
                ></a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="filter === 'man'" class="item-display">
        <ul>
          <li v-for="product in filteredProducts2" :key="product.id">
            <RouterLink
              :to="{
                name: 'itemdetail',
                params: { id: product.id },
              }"
            >
              <img :src="product.image" alt="" />
            </RouterLink>
            <div class="price-detail">
              <div class="item-detail">
                <p>{{ product.name }}</p>
                <p>{{ product.price }}</p>
              </div>
              <div class="addtocart">
                <a
                  @click.prevent="productsStore.addCartNums(product.id)"
                  href=""
                  ><i class="bi bi-cart-plus"></i
                ></a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="filter === 'girl'" class="item-display">
        <ul>
          <li v-for="product in filteredProducts3" :key="product.id">
            <RouterLink
              :to="{
                name: 'itemdetail',
                params: { id: product.id },
              }"
            >
              <img :src="product.image" alt="" />
            </RouterLink>
            <div class="price-detail">
              <div class="item-detail">
                <p>{{ product.name }}</p>
                <p>{{ product.price }}</p>
              </div>
              <div class="addtocart">
                <a
                  @click.prevent="productsStore.addCartNums(product.id)"
                  href=""
                  ><i class="bi bi-cart-plus"></i
                ></a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="item-display">
        <ul>
          <li v-for="product in filteredProducts4" :key="product.id">
            <RouterLink
              :to="{
                name: 'itemdetail',
                params: { id: product.id },
              }"
            >
              <img :src="product.image" alt="" />
            </RouterLink>
            <div class="price-detail">
              <div class="item-detail">
                <p>{{ product.name }}</p>
                <p>{{ product.price }}</p>
              </div>
              <div class="addtocart">
                <a
                  @click.prevent="productsStore.addCartNums(product.id)"
                  href=""
                  ><i class="bi bi-cart-plus"></i
                ></a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <ScrollToView />
  </body>
</template>
