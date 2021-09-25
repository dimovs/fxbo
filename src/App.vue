<template>
  <reg-exp-controller :config="data" />
</template>

<script>
import RegExpController from '@/components/RegExpController.vue';
import data from '@/fake/data';

export default {
  name: 'App',
  components: {
    RegExpController,
  },
  setup() {
    return {
      data,
    };
  },
};
</script>
