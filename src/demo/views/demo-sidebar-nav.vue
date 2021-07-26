<template>
  <ul class="demo-sidebar__nav">
    <li
      v-for="item in items"
      :key="item.routerName"
      class="demo-sidebar__nav__item"
    >
      <router-link :to="{ name: item.routeName }">
        {{ item.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "demo-sidebar-nav",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>
