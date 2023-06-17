<template>
  <div class="login" id="#login">
    <LoginPage />
  </div>
</template>

<script setup>
import LoginPage from "../components/forms/LoginC.vue";
</script>

<script>
export default {
  name: "Login",
  components: {
    LoginPage,
  },
};
</script>

<style lang=""></style>
