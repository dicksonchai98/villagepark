<template>
  <div v-show="visibleShow" class="scroll-btn">
    <a href="" @click.prevent="scrollToEllement">
      <i class="bi bi-chevron-bar-up"></i>
    </a>
  </div>
</template>

<script setup>
import { ref } from "vue";

const visibleShow = ref(false);

const showScrollBtn = () => {
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  visibleShow.value = scrollValue >= 10;
};

window.onscroll = showScrollBtn;
window.onload = showScrollBtn;

const scrollToEllement = () => {
  VueScrollTo.scrollTo("#element", 500, {
    easing: "ease-in-out",
    offset: 0,
    force: true,
    cancelable: true,
    onStart: function () {
      console.log("start");
    },
    onDone: function () {
      console.log("end");
    },
    onCancel: false,
    x: false,
    y: true,
  });
};
</script>
