<template>
  <ul class="demo-sidebar__nav">
    <template v-for="item in items" :key="item.title">
      <template v-if="item.items">
        <li class="demo-sidebar__nav__group v-fieldset__label">
          {{ item.title }}
        </li>
        <li
          v-for="subitem in item.items"
          :key="`${item.title}${subitem.title}`"
          class="demo-sidebar__nav__item"
        >
          <router-link :to="subitem.route">
            {{ subitem.title }}
          </router-link>
        </li>
      </template>
      <template v-else>
        <li class="demo-sidebar__nav__item">
          <router-link :to="item.route">
            {{ item.title }}
          </router-link>
        </li>
      </template>
    </template>
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
