<template>
  <div id="#cart">
    <ShopPage />
  </div>
</template>

<script setup>
import ShopPage from "../components/forms/ShopC.vue";
</script>

<script>
export default {
  name: "cart",
  components: {
    ShopPage,
  },
};
</script>
