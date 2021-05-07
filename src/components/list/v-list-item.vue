<template>
  <div ref="itemEl" class="v-list-item" :class="cssClasses" @click="onClick">
    <div v-if="icon" class="v-list-item__icon" :style="{ color: iconColor }">
      <component :is="icon" />
    </div>
    <div class="v-list-item__text">
      {{ text }}
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, toRefs, watch } from "vue";

export default {
  name: "v-list-item",
  props: {
    text: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconColor: {
      type: String,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    scrollIntoOnFocus: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const { selected, focused, disabled, scrollIntoOnFocus } = toRefs(props);

    const itemEl = ref(null);

    const cssClasses = computed(() => ({
      "v-list-item--focused": focused.value,
      "v-list-item--selected": selected.value,
      "v-list-item--disabled": disabled.value
    }));

    const scrollIntoItem = () => {
      if (focused.value && scrollIntoOnFocus.value) {
        itemEl.value?.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    };

    watch(focused, () => {
      scrollIntoItem();
    });

    onMounted(() => {
      scrollIntoItem();
    });

    const onClick = (e) => {
      emit("click", e);
    };

    return {
      cssClasses,
      itemEl,
      onClick
    };
  }
};
</script>
