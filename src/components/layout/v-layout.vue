<template>
  <component :is="tag" class="v-layout" :class="cssClasses">
    <slot></slot>
  </component>
</template>

<script>
import { computed, toRefs } from 'vue';

export default {
  name: 'v-layout',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    vertical: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    gutter: {
      type: [Boolean, String],
      default: null
    },
    wrap: {
      type: Boolean,
      default: false
    },
    wFull: {
      type: Boolean,
      default: false
    },
    hFull: {
      type: Boolean,
      default: false
    },
    hStart: {
      type: Boolean,
      default: false
    },
    hEnd: {
      type: Boolean,
      default: false
    },
    hCenter: {
      type: Boolean,
      default: false
    },
    hStretch: {
      type: Boolean,
      default: false
    },
    hBaseline: {
      type: Boolean,
      default: false
    },
    wStart: {
      type: Boolean,
      default: false
    },
    wEnd: {
      type: Boolean,
      default: false
    },
    wCenter: {
      type: Boolean,
      default: false
    },
    wBetween: {
      type: Boolean,
      default: false
    },
    allDistr: {
      type: Boolean,
      default: false
    },
    distr: {
      type: Boolean,
      default: false
    },
    notShrink: {
      type: Boolean,
      default: false
    },
    noShrink: {
      type: Boolean,
      default: false
    },
    noOverflow: {
      type: Boolean,
      default: false
    },
    noFlex: {
      type: Boolean,
      default: false
    },
    minH0: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const {
      inline,
      vertical,
      reverse,
      gutter,
      wrap,
      hFull,
      wFull,
      hStart,
      hEnd,
      hCenter,
      hStretch,
      hBaseline,
      wStart,
      wEnd,
      wBetween,
      wCenter,
      allDistr,
      distr,
      notShrink,
      noShrink,
      noOverflow,
      noFlex,
      minH0
    } = toRefs(props);

    const cssClasses = computed(() => ({
      'v-layout--inline': inline.value,
      'v-layout--vertical': vertical.value,
      'v-layout--reverse': reverse.value,
      'v-layout--gutter-sm': gutter.value === 'sm',
      'v-layout--gutter-md': gutter.value === 'md' || gutter.value === true,
      'v-layout--gutter-lg': gutter.value === 'lg',
      'v-layout--wrap': wrap.value,
      'v-layout--h-full': hFull.value,
      'v-layout--w-full': wFull.value,
      'v-layout--h-start': hStart.value,
      'v-layout--h-end': hEnd.value,
      'v-layout--h-center': hCenter.value,
      'v-layout--h-stretch': hStretch.value,
      'v-layout--h-baseline': hBaseline.value,
      'v-layout--w-start': wStart.value,
      'v-layout--w-end': wEnd.value,
      'v-layout--w-between': wBetween.value,
      'v-layout--w-center': wCenter.value,
      'v-layout--all-distr': allDistr.value || distr.value,
      'v-layout--not-shrink': notShrink.value || noShrink.value,
      'v-layout--no-overflow': noOverflow.value,
      'v-layout--no-flex': noFlex.value,
      'v-layout--min-h-0': minH0.value
    }));

    return {
      cssClasses
    };
  }
};
</script>

<style>
@import 'layout';
</style>
