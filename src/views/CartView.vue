<template>
  <div class="cart" id="#cart">
    <CartPage />
  </div>
</template>

<script setup>
import CartPage from "../components/forms/CartC.vue";
</script>

<script>
export default {
  name: "Cart",
  components: {
    CartPage,
  },
};
</script>

<style lang=""></style>
