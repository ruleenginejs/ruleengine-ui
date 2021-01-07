<template>
  <div class="v-tab">
    <div v-if="hasIcon" class="v-tab__icon">
      <slot name="icon" />
    </div>
    <div class="v-tab__label">
      <slot />
    </div>
    <div class="v-tab__actions">
      <div class="v-tab__action v-tab__action--close">
        <v-icon-close />
      </div>
      <div class="v-tab__action v-tab__action--modified">
        <v-icon-circle />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import VIconClose from "@/components/icons/v-icon-close";
import VIconCircle from "@/components/icons/v-icon-circle";

export default {
  name: "v-tab",
  components: {
    VIconClose,
    VIconCircle
  },
  props: {
    name: {
      type: String,
      default: null
    }
  },
  setup(props, { slots }) {
    //const { name } = toRefs(props);

    const hasIcon = computed(() => !!slots.icon);

    return {
      hasIcon
    };
  }
};
</script>

<style>
@import "tab";
</style>
