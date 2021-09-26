<template>
  <div class="rule">
    <dropdown :options="selection.fields" v-model="selection.field" />
    <dropdown :options="selection.ops" v-model="selection.op" />
    <input type="text">
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import Dropdown from './Dropdown.vue';

export default {
  name: 'Rule',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Dropdown,
  },
  setup(props) {
    const fields = Object.keys(props.data.fields);
    const field = ref(fields[0]);
    const ops = computed(() => props.data.fields[field.value].ops);

    const selection = reactive({
      field,
      fields,
      op: props.data.fields[fields[0]].ops[0],
      ops,
    });

    return {
      selection,
    };
  },
};
</script>

<style scoped>
.rule {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
