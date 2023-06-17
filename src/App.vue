<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import HomeView from "./views/HomeView.vue";
import FirstPage from "./components/FirstPage.vue";
</script>

<template>
  <div>
    <div>
      <b-navbar class="px-3" type="dark" variant="primary">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <div>
          <b-nav>
            <RouterLink class="nav-link text-light" to="/">Login</RouterLink>
            <RouterLink class="btn btn-outline-light" to="/cart"
              >Cart</RouterLink
            >
          </b-nav>
        </div>
      </b-navbar>
    </div>
  </div>
  <header
    class="position-absolute top-50 start-50 translate-middle"
    style="margin-left: 14rem"
  >
    <div class="d-flex">
      <div class="wrapper">
        <HelloWorld msg="We Are The Best" />
        <div>
          <ul class="d-flex" style="margin-left: 160px">
            <li class="m-3">Active</li>
            <li class="m-3">Link</li>
            <li class="m-3">Home</li>
          </ul>
        </div>
      </div>
      <img
        alt="Vue logo"
        style="object-fit: contain"
        src="@/assets/casual-life-3d.png"
        width="365"
        height="365"
      />
    </div>
  </header>

  <RouterView />
</template>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
