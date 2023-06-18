<template>
  <div>
    <div class="container" style="margin-top: 86px">
      <b-card title="Register" style="max-width: 22rem" class="mb-2">
        <form @submit.prevent="register">
          <div class="form-group mt-2">
            <label for="username" class="mt-3">Username:</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
              required
            />
          </div>
          <div class="form-group mt-1">
            <label for="password" class="mt-3">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
            />
          </div>
          <b-button
            type="submit"
            block
            variant="primary"
            class="mt-3 btn btn-primary"
            >Register</b-button
          >
        </form>
        <p v-if="errorMessage" class="mt-3 text-danger">{{ errorMessage }}</p>
      </b-card>
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
