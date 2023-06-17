<template>
  <div class="container" style="margin-top: 86px">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group mt-2 w-50">
        <label for="username" class="mt-3">Username:</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
          required
        />
      </div>
      <div class="form-group mt-1 w-50">
        <label for="password" class="mt-3">Password:</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          required
        />
      </div>
      <button type="submit" class="mt-3 btn btn-primary">Log in</button>
    </form>
    <div class="d-flex">
      <span>Don't have an account ? </span>
      <RouterLink class="nav-link text-primary" to="/register"
        >Register</RouterLink
      >
    </div>

    <p v-if="errorMessage" class="mt-3 text-danger">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { RouterLink, RouterView } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      axios
        .post("https://reqres.in/api/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          // Successful login
          alert("Logged in successfully!");
          this.$router.push("/shop");
        })
        .catch((error) => {
          // Failed login
          this.errorMessage = "Invalid username or password";
        });
    },
  },
};
</script>
