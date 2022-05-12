<template>
  <div class="v-tab" :class="tabClasses" @click="onSelect" ref="container">
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
import { computed, getCurrentInstance, inject, ref, toRefs } from 'vue';
import VIconClose from '@/components/icons/v-icon-close.vue';
import VIconCircle from '@/components/icons/v-icon-circle.vue';

export default {
  name: 'v-tab',
  components: {
    VIconClose,
    VIconCircle
  },
  props: {
    name: {
      type: [String, Number],
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
  emits: ['close'],
  setup(props, { slots, emit }) {
    const instance = getCurrentInstance();
    const selectedTab = inject('selectedTab');
    const { name, iconColor } = toRefs(props);
    const container = ref(null);

    const hasIcon = computed(() => !!slots.icon);
    const tabName = computed(() => name.value || instance.uid);
    const selected = computed(
      () => selectedTab && tabName.value === selectedTab.value
    );

    const tabClasses = computed(() => ({
      'v-tab--selected': selected.value
    }));

    const iconStyle = computed(() => ({
      color: iconColor.value
    }));

    const onSelect = () => {
      if (selectedTab) {
        selectedTab.value = tabName.value;
      }

      if (container.value) {
        container.value.scrollIntoView();
      }
    };

    const onClose = () => emit('close');

    return {
      container,
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
@import 'tab';
</style>
