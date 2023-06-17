<template>
  <div>
    <div class="container" style="margin-top: 86px">
      <h2>Register</h2>
      <form @submit.prevent="register">
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
        <button type="submit" class="mt-3 btn btn-primary">Register</button>
      </form>
      <p v-if="errorMessage" class="mt-3 text-danger">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    register() {
      axios
        .post("https://reqres.in/api/register", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          // Successful login
          alert("Register successfully!");
          this.$router.push("/");
        })
        .catch((error) => {
          // Failed login
          this.errorMessage = "Invalid username or password";
        });
    },
  },
};
</script>
