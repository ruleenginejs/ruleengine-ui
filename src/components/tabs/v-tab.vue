<template>
  <div class="v-tab" :class="tabClasses" @click="onSelect">
    <div v-if="hasIcon" class="v-tab__icon" :style="iconStyle">
      <slot name="icon" />
    </div>
    <div class="v-tab__label">
      <slot />
    </div>
    <div class="v-tab__actions">
      <div
        class="v-tab__action v-tab__action-close"
        :class="{ 'v-tab__action--modified': modified }"
        @click.prevent.stop="onClose"
      >
        <v-icon-close class="v-tab__action__icon--close" />
        <v-icon-circle v-if="modified" class="v-tab__action__icon--modified" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, inject, toRefs } from "vue";
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
    },
    modified: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: null
    }
  },
  emits: ["close"],
  setup(props, { slots, emit }) {
    const instance = getCurrentInstance();
    const { name, iconColor } = toRefs(props);

    const updateSelectedTab = inject("updateSelectedTab");
    const selectedTab = inject("selectedTab");

    const hasIcon = computed(() => !!slots.icon);
    const tabName = computed(() => name || instance.uid);
    const selected = computed(
      () => selectedTab && tabName.value === selectedTab.value
    );

    const tabClasses = computed(() => ({
      "v-tab--selected": selected.value
    }));

    const iconStyle = computed(() => ({
      color: iconColor.value
    }));

    const onSelect = () => {
      debugger;
      if (updateSelectedTab) {
        updateSelectedTab(tabName);
      }
    };

    const onClose = () => emit("close");

    return {
      hasIcon,
      tabClasses,
      iconStyle,
      onSelect,
      onClose
    };
  }
};
</script>

<style>
@import "tab";
</style>
