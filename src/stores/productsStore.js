import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import Swal from "sweetalert2";
import { useLoading } from "vue-loading-overlay";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter, useRoute } from "vue-router";

export const useProductsStore = defineStore("productsStore", () => {
  const router = useRouter();
  const route = useRoute();
  const cartNums = ref(0);
  let productInCart = reactive([]);
  let cartCost = ref(0);
  const fullPage = ref(true);
  const onCancel = ref(false);
  const formContainer = ref(null);
  const auth = getAuth();
  const foamData = ref({});
  const $loading = useLoading({
    // options
  });

  const products = reactive([
    {
      id: 0,
      name: "椰漿飯",
      price: 100,
      inCart: 0,
      image:
        "https://www.andy-cooks.com/cdn/shop/articles/20231116072724-c2-a9andy_cooks_thumbnails_nasi_lemak_01.jpg?v=1700389619",
      describe: "馬來西亞國民美食椰漿飯，配上香辣叁巴醬、水煮蛋及一些小魚乾",
      catagory: "主食",
    },
    {
      id: 1,
      name: "炸鷄腿椰漿飯",
      inCart: 0,
      price: 150,
      image:
        "https://lifeofaworkingadult.com/wp-content/uploads/2022/01/Village-Park-Nasi-Lemak-Ayam-Goreng.jpg",
      describe:
        "馬來西亞國民美食椰漿飯，,配上一個十幾種香料腌製過的炸鷄、香辣叁巴醬、水煮蛋及一些小魚乾",
      catagory: "主食",
    },
    {
      id: 2,
      name: "叁巴魷魚椰漿飯",
      inCart: 0,
      price: 150,
      image:
        "https://omnivorescookbook.com/wp-content/uploads/2019/12/1911_Beef-Rendang_550.jpg",
      describe:
        "馬來西亞國民美食椰漿飯，,配上叁巴魷魚、香辣叁巴醬、水煮蛋及一些小魚乾",

      catagory: "主食",
    },
    {
      id: 3,
      name: "美祿",
      inCart: 0,
      price: 50,
      image:
        "https://www.wandercooks.com/wp-content/uploads/2023/03/malaysian-milo-dinosaur-3-683x1024.jpg",
      describe: "馬來西亞國民飲料美祿，濃厚香醇",

      catagory: "飲料",
    },
    {
      id: 4,
      name: "咖啡",
      inCart: 0,
      price: 50,
      image:
        "https://mocktail.net/wp-content/uploads/2022/03/homemade-Iced-Americano-recipe_1ig.jpg",
      describe:
        "咖啡烏，來自怡保特有的咖啡豆，使用碳烤烘烤製作而成，香氣散發出一股碳香味",

      catagory: "飲料",
    },
    {
      id: 5,
      name: "叁巴醬",
      inCart: 0,
      price: 120,
      image:
        "https://jggp.jayagrocer.com/cdn/shop/products/172847-1-1_5678ad5e-ce39-488d-aa70-0d9f75638095_600x.jpg?v=1698326034",
      describe:
        "由幾十種香料製作而成的叁巴醬，無防腐劑，可自由搭配各種葷食烹調",

      catagory: "其他商品",
    },
  ]);

  const handleSubmit = (foamInfo) => {
    Object.assign(foamData.value, foamInfo);
    submitLoading();
    router.push("/order");
    console.log(foamData.value);
  };

  const clearOrder = () => {
    productInCart.splice(0, productInCart.length);
    localStorage.clear();
    submitLoading();
    onLoadCartNumbers();
    cartNums.value = 0;
    reload();
    console.log(productInCart);

    return productInCart;
  };

  const addCartNums = (productsId) => {
    console.log(productInCart);
    if (auth.currentUser) {
      console.log("已登入");
      countCost(productsId);
      let productNumbers = localStorage.getItem("cartNumbers");

      productNumbers = parseInt(productNumbers);

      if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        cartNums.value = computed(() => {
          return productNumbers + 1;
        });
      } else {
        localStorage.setItem("cartNumbers", 1);
        cartNums.value = computed(() => {
          return 1;
        });
      }
      setItem(productsId);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "購物車已更新！",
      });
    } else {
      console.log("未登入");
      alert("麻煩請先登入");
    }
  };

  function reload() {
    if (localStorage.getItem("test")) {
      productInCart = JSON.parse(localStorage.getItem("test"));
      console.log(productInCart);
    }
  }

  const decreaseCartNums = (productsId) => {
    let cartCost = localStorage.getItem("cartCost");
    cartCost = parseInt(cartCost);
    localStorage.setItem("cartCost", (cartCost -= products[productsId].price));

    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    localStorage.setItem("cartNumbers", productNumbers - 1);

    cartNums.value = productNumbers - 1;
    let cartItem = localStorage.getItem("productsInCart");
    cartItem = JSON.parse(cartItem);
    cartItem[products[productsId].name].inCart -= 1;
    const existingProductIndex = productInCart.findIndex(
      (product) => product.name === products[productsId].name
    );
    if (existingProductIndex !== -1) {
      productInCart[existingProductIndex].inCart -= 1;
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItem));
    localStorage.setItem("test", JSON.stringify(productInCart));

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "購物車已更新！",
    });
  };

  const onLoadCartNumbers = () => {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);

    if (productInCart) {
      cartNums.value = productNumbers;
    }
  };

  function setItem(Id) {
    let cartItem = localStorage.getItem("productsInCart");
    cartItem = JSON.parse(cartItem);

    if (cartItem != null) {
      if (cartItem[products[Id].name] == undefined) {
        products[Id].inCart = 1;

        cartItem = {
          ...cartItem,
          [products[Id].name]: products[Id],
        };
        productInCart.push({ ...products[Id], inCart: 1 });
      } else {
        cartItem[products[Id].name].inCart += 1;
        const existingProductIndex = productInCart.findIndex(
          (product) => product.name === products[Id].name
        );
        if (existingProductIndex !== -1) {
          productInCart[existingProductIndex].inCart += 1;
        }
      }
    } else {
      products[Id].inCart = 1;
      cartItem = {
        [products[Id].name]: products[Id],
      };
      productInCart.push({ ...products[Id], inCart: 1 });
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItem));
    localStorage.setItem("test", JSON.stringify(productInCart));
    console.log(productInCart);
    return productInCart;
  }

  const deleteItem = (productId) => {
    let cartItem = localStorage.getItem("productsInCart");
    let productNumbers = localStorage.getItem("cartNumbers");
    let cartCost = localStorage.getItem("cartCost");

    if (cartItem != null) {
      cartItem = JSON.parse(cartItem);

      const indexToDelete = productInCart.findIndex(
        (product) => product.id === productId
      );

      if (indexToDelete !== -1) {
        const deletedProduct = productInCart[indexToDelete];

        localStorage.setItem(
          "cartCost",
          (
            parseInt(cartCost) -
            deletedProduct.price * deletedProduct.inCart
          ).toString()
        );

        localStorage.setItem(
          "cartNumbers",
          (parseInt(productNumbers) - deletedProduct.inCart).toString()
        );

        delete cartItem[products[productId].name];

        productInCart.splice(indexToDelete, 1);

        localStorage.setItem("productsInCart", JSON.stringify(cartItem));
        localStorage.setItem("test", JSON.stringify(productInCart));
      }
    }

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "購物車已更新！",
    });
    onLoadCartNumbers();
  };

  function countCost(Id) {
    let cartCost = localStorage.getItem("cartCost");

    if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("cartCost", (cartCost += products[Id].price));
    } else {
      localStorage.setItem("cartCost", products[Id].price);
    }
    onLoadCartNumbers();
    return cartCost;
  }

  const submitLoading = () => {
    const loader = $loading.show({
      container: null,
      canCancel: true,
      onCancel: false,
    });

    setTimeout(() => {
      loader.hide();
    }, 1000);
  };

  onLoadCartNumbers();
  reload();

  return {
    cartNums,
    productInCart,
    products,
    onLoadCartNumbers,
    addCartNums,
    setItem,
    deleteItem,
    countCost,
    decreaseCartNums,
    submitLoading,
    reload,
    auth,
    handleSubmit,
    foamData,
    clearOrder,
    router,
  };
});
