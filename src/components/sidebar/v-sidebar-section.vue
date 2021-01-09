<template>
  <div
    class="v-sidebar-section"
    :class="{
      'v-sidebar-section--expandable': expandable,
      'v-sidebar-section--expanded': expanded
    }"
    tabindex="-1"
    ref="container"
  >
    <div
      class="v-sidebar-section__header"
      @click.prevent.stop="onToggleExpand"
      :class="{
        'v-sidebar-section__border': headerBorder,
        'v-sidebar-section__header--compact': headerCompact
      }"
    >
      <div v-if="title" :title="title" class="v-sidebar-section__title">
        {{ title }}
      </div>
      <div v-if="expandable" class="v-sidebar-section__expand-btn">
        <v-icon-chevron-down />
      </div>
    </div>
    <transition
      name="v-sidebar-section__expand-anim"
      @enter="expandEnter"
      @after-enter="expandAfterEnter"
      @before-leave="expandBeforeLeave"
    >
      <div
        v-show="expanded"
        class="v-sidebar-section__content"
        :class="{ 'v-sidebar-section__border': bottomBorder }"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import useExpand from "./use-expand";
import VIconChevronDown from "@/components/icons/v-icon-chevron-down";

export default {
  name: "v-sidebar-section",
  components: {
    VIconChevronDown
  },
  props: {
    title: {
      type: String,
      default: null
    },
    expand: {
      type: Boolean,
      default: false
    },
    expandable: {
      type: Boolean,
      default: true
    },
    headerBorder: {
      type: Boolean,
      default: true
    },
    headerCompact: {
      type: Boolean,
      default: false
    },
    bottomBorder: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { expand, expandable } = toRefs(props);
    const expanded = ref(expandable.value === false ? true : expand.value);
    const container = ref(null);

    const { expandEnter, expandAfterEnter, expandBeforeLeave } = useExpand();

    const onToggleExpand = () => {
      if (!expandable.value) return;
      expanded.value = !expanded.value;

      if (container.value) {
        container.value.focus();
      }
    };

    return {
      expanded,
      container,
      expandEnter,
      expandAfterEnter,
      expandBeforeLeave,
      onToggleExpand
    };
  }
};
</script>

<style>
@import "sidebar-section";
</style>