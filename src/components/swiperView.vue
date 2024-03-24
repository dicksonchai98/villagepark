<script setup>
import { useProductsStore } from "../stores/productsStore";
import { ref, onMounted, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { RouterLink, RouterView } from "vue-router";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = [Navigation, Pagination, Autoplay, EffectCoverflow];
const components = { Swiper, SwiperSlide };
const productsStore = useProductsStore();
const swiper = {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
};
</script>

<template>
  <div>
    <Swiper
      :modules="modules"
      :space-between="50"
      :navigation="true"
      :breakpoints="swiper.breakpoints"
      autoplay
      class="swiper-slide"
    >
      <SwiperSlide
        v-for="item in productsStore.products"
        :key="item.id"
        class="swiper-slide"
      >
        <ul>
          <li>
            <RouterLink
              :to="{
                name: 'itemdetail',
                params: { id: item.id },
              }"
            >
              <img :src="item.image" alt="" />
            </RouterLink>
            <div class="price-detail">
              <div class="item-detail">
                <p>{{ item.name }}</p>
                <p>NT${{ item.price }}</p>
              </div>
              <div class="addtocart">
                <a @click.prevent="productsStore.addCartNums(item.id)" href=""
                  ><i class="bi bi-cart-plus"></i
                ></a>
              </div>
            </div>
          </li>
        </ul>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
// .swiper-slide-inner img {
//   width: 200px;
//   height: 200px;
// }
// .swiper-slide {
//   height: 21rem;
//   .card {
//     background-color: #ffffff;
//     border-radius: 1rem;
//     .swiper-slide-inner {
//       border-radius: 1rem;
//       height: 18rem;
//       background-position: center center;
//       background-size: cover;
//       &:hover {
//         opacity: 0.7;
//       }
//     }
//   }
// }
// .product-title {
//   font-size: 0.75rem;
// }
// @media screen and (min-width: 1200px) {
//   .product-title {
//     font-size: 0.875rem;
//   }
// }
// .product-price {
//   font-size: 0.875rem;
// }
// @media screen and (min-width: 1200px) {
//   .product-price {
//     font-size: 1rem;
//   }
// }
//
</style>
