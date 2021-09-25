<template>
  <section class="reg-exp-controller" />
</template>

<script>
export default {
  name: 'RegExpController',
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.reg-exp-controller {
  width: 100%;
  height: 100%;
}
</style>
