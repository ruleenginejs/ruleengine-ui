<template>
  <div
    class="v-sidebar-section"
    :class="{
      'v-sidebar-section--expandable': expandable,
      'v-sidebar-section--expanded': expanded,
      'v-sidebar-section--h-full': hFull
    }"
    :tabindex="tabIndex"
  >
    <div
      class="v-sidebar-section__header"
      @click.prevent.stop="onToggleExpand"
      :class="{
        'v-sidebar-section__border': headerBorder,
        'v-sidebar-section__header--compact': headerCompact,
        'v-sidebar-section__header--strong': headerStrong
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
        :class="{
          'v-sidebar-section__border': bottomBorder,
          'v-sidebar-section__content--scroll': scroll,
          'v-scrollbar': scroll,
          'v-scrollbar--md': scroll === 'md',
          'v-scrollbar--sm': scroll === 'sm'
        }"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, ref, toRefs } from 'vue';
import useExpand from './use-expand';
import VIconChevronDown from '@/components/icons/v-icon-chevron-down.vue';

export default {
  name: 'v-sidebar-section',
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
    headerStrong: {
      type: Boolean,
      default: false
    },
    bottomBorder: {
      type: Boolean,
      default: true
    },
    hFull: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props) {
    const { expand, expandable } = toRefs(props);
    const expanded = ref(expandable.value === false ? true : expand.value);

    const { expandEnter, expandAfterEnter, expandBeforeLeave } = useExpand();

    const onToggleExpand = () => {
      if (!expandable.value) return;
      expanded.value = !expanded.value;
    };

    const tabIndex = computed(() => (expandable.value ? 0 : null));

    return {
      expanded,
      tabIndex,
      expandEnter,
      expandAfterEnter,
      expandBeforeLeave,
      onToggleExpand
    };
  }
};
</script>

<style>
@import 'sidebar-section';
</style>
