<template>
  <span
    v-if="index === tool[name].length - 1"
    class="minus"
    @click="$emit('remove', name)"
  >-</span>
</template>

<script>
export default {
  name: 'MinusButton',
  emits: [
    'remove'
  ],
  props: {
    name: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    tool: {
      type: Object,
      required: true
    }
  }
};
</script>
