import { createRouter, createWebHashHistory } from "vue-router";
import shopeeView from "../views/shopeeView.vue";
import itemView from "../views/itemView.vue";
import cartView from "../views/cartView.vue";
import informationView from "../views/informationView.vue";
import itemDetailView from "../views/itemdetailView.vue";
import loginView from "../views/loginView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { reactive, ref, watch, onMounted, watchEffect } from "vue";
import orderView from "../views/orderView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: shopeeView,
    },
    {
      path: "/item",
      name: "item",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: itemView,
    },
    {
      path: "/cart",
      name: "cart",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: cartView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/information",
      name: "information",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: informationView,
    },
    {
      path: "/item/:id",
      name: "itemdetail",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: itemDetailView,
      props: true,
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: loginView,
    },
    {
      path: "/order",
      name: "order",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: orderView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // return desired position
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("麻煩請先登入");
      next("/login");
    }
  } else {
    next();
  }
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

export default router;
