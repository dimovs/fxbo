<template>
  <div class="dropdown">
    <div @click="open">{{$props.modelValue}}</div>
    <ul v-if="isOpen" @click="select" class="menu">
      <li class="item" v-for="(item, i) in items" :key="i" :data-value="item" >{{item}}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Dropdown',
  props: {
    options: Array,
    modelValue: String,
  },
  emits: {
    'update:modelValue': null,
  },
  setup(props, { emit }) {
    const isOpen = ref(false);

    const open = () => {
      isOpen.value = !isOpen.value;
    };

    const select = (e) => {
      const { value } = e.target.dataset;

      if (value) {
        emit('update:modelValue', value);
      }

      isOpen.value = !isOpen.value;
    };

    return {
      select,
      open,
      isOpen,
      items: props.options,
    };
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  cursor: pointer;
}

.menu {
  position: absolute;
  top: 10px;
  left: 0;
  list-style: none;
  padding: 10px;
  background-color: lightcyan;
  border-radius: 10%;
  min-width: content-box;
  z-index: 10;
}

.item {
  padding: 5px;
  white-space: nowrap;
}
</style>
