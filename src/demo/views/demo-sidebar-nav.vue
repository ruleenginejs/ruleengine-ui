<template>
  <ul class="demo-sidebar__nav">
    <li v-for="item in items" :key="item.title" class="demo-sidebar__nav__item">
      <router-link :to="item.route">
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
