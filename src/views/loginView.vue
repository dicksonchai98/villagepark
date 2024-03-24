<script setup>
import { reactive, ref, computed } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const route = useRouter();
const errMsg = ref();
const auth = getAuth();
const loginPage = ref("login");

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((result) => {
      console.log("success");
      console.log(result);
      route.push("/");
    })
    .catch(function (error) {
      console.log(error.message);
      console.log("shit");
    });
};

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log(auth.currentUser);
      route.push("/");
      console.log("success log in");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        case "auth/invalid-email":
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
</script>

<template>
  <div class="login">
    <div class="login-container">
      <div class="login-title">
        <h3><a @click.prevent="loginPage = 'login'" href="">用戶登入</a></h3>
        <h3><a @click.prevent="loginPage = 'signup'" href="">用戶註冊</a></h3>
      </div>
      <form v-if="loginPage === 'login'" @submit.prevent="login">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
        <br />
        <label for="password">密碼:</label>
        <input type="password" v-model="password" required />
        <br />
        <button @click="signin" type="submit">登入</button>
      </form>
      <form v-else @submit.prevent="register">
        <label for="registerEmail">Email:</label>
        <input type="email" v-model="email" required />
        <br />
        <label for="registerPassword">密碼:</label>
        <input type="password" v-model="password" required />
        <br />
        <button @click="register" type="submit">註冊</button>
      </form>
    </div>
  </div>
</template>
