<script setup>
import { reactive, ref, inject } from "vue";
import { useProductsStore } from "../stores/productsStore";
import ScrollToView from "../components/scrolltoView.vue";
import SwiperView from "../components/swiperView.vue";

const productsStore = useProductsStore();
</script>

<template>
  <body>
    <section class="container">
      <div class="carousel">
        <div class="img1">
          <img src="../assets/villagecover.jpg" alt="" />
        </div>
        <div class="banner-title">
          <img src="../assets/villageparklogo.png" alt="" />
          <p>Ayam, Sambal, and Nasi Lemak.</p>
          <a href=""
            ><RouterLink to="/item"
              ><button @click="productsStore.submitLoading">
                來去逛逛吧
              </button></RouterLink
            ></a
          >
        </div>
      </div>
      <div class="sales">
        <div class="sales-item">
          <ul>
            <li class="column-reverse">
              <div>
                <img src="../assets/villagepark4.jpg" alt="" />
              </div>
              <div>
                <div>
                  <h3 class="sales-item-title">國民美食椰漿飯</h3>
                  <p>
                    椰漿飯是馬來西亞的國民美食，以椰漿煮飯而成。椰漿賦予米飯濃郁的香氣，常配以香辣的蝦醬、水煮雞蛋、炸魚片等配料。這道菜常見於馬來西亞的街頭小販攤，深受當地人和遊客喜愛。
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <h3 class="sales-item-title">辣椒的選用</h3>
                  <p>
                    我們的辣椒採用墨西哥進口辣椒，精心挑選的優質辣椒為我們的菜餚增添了獨特的風味和香氣，讓每一道料理都充滿濃郁的口感和香辣的滋味。
                  </p>
                </div>
              </div>
              <div>
                <img src="../assets/villagepark.jpg" alt="" />
              </div>
            </li>
            <li class="column-reverse">
              <div>
                <img src="../assets/villagepark3.jpg" alt="" />
              </div>
              <div>
                <div>
                  <h3 class="sales-item-title">叁巴醬</h3>
                  <p>
                    叁巴醬是馬來西亞和新加坡的一種風味濃郁的辣椒醬，以辣椒、香料和其他調味料為基礎製作而成。這種醬料常用於烹調各種菜餚，給料理帶來豐富的口味和香氣，讓人垂涎欲滴。
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
    </section>
    <ScrollToView />
  </body>
</template>
