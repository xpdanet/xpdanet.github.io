<template>
  <span
    v-if="index === tool[name].length - 1"
    @click="remove(name)"
    class="minus"
  >-</span>
</template>

<script>
module.exports = {
  name: 'minus',
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
  },
  methods: {
    remove: function (section) {
      this.tool[section].pop();
    }
  }
}
</script>
