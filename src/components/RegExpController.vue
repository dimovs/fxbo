<template>
  <section class="reg-exp-controller">
    <div @click="showPopup" class="reg-exp-controller__wrapper">
      <span class="reg-exp-controller__text">
        Condition Expression
      </span>
      <textarea class="reg-exp-controller__expressions" v-model="expressions" />
      <span class="reg-exp-controller__text">
        Click to the textarea above for editing expression
      </span>
    </div>
    <div v-if="isPopupShowed" class="reg-exp-controller__popup">
      <span class="reg-exp-controller__text">Condition Expression</span>

      <div class="reg-exp-controller__controls">
        <ul class="operators">
          <template v-for="(operator, i) in operators" :key="i">
            <li
              @click="selectOperator(operator)"
              @keyup.enter="selectOperator(operator)"
              :class="{'operators__item': true, 'active': currentOperator === operator}"
              tabindex="0"
            >
              {{ operator }}
            </li>
          </template>
        </ul>
      </div>

      <button @click="hidePopup" type="button">
        <svg @click="hidePopup" height="24" role="img" width="24" viewBox="0 0 24 24">
          <path d="M4.93,4.93,19.07,19.07m-14.14,0L19.07,4.93"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
          />
        </svg>
      </button>
      <button @click="hidePopup" type="button">Close</button>
      <button @click="hidePopup" type="button">Apply changes</button>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue';

const OPERATORS = {
  AND: 'AND',
  OR: 'OR',
  ALWAYS: 'Always',
  NEVER: 'Never',
};

export default {
  name: 'RegExpController',
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const expressions = ref('');
    const isPopupShowed = ref(false);
    const currentOperator = ref(OPERATORS.AND);

    const operators = computed(() => Object.values(OPERATORS));

    const showPopup = () => {
      isPopupShowed.value = true;
    };
    const hidePopup = () => {
      isPopupShowed.value = false;
    };
    const selectOperator = (operator) => {
      currentOperator.value = operator;
    };

    return {
      expressions,
      isPopupShowed,
      currentOperator,
      operators,
      hidePopup,
      selectOperator,
      showPopup,
    };
  },
};
</script>

<style scoped>
.reg-exp-controller {
  width: 100%;
  height: 100%;
}

.reg-exp-controller__expressions {
  display: block;
  width: 100%;
  background-color: rgba(241, 241, 241, 1);
}

.reg-exp-controller__controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px 10px;
  border-bottom: 2px solid lightgray;
  background-color: rgba(241, 241, 241, 1);
}

.operators {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  border: 1px solid lightgray;
  border-radius: 5px;
  overflow: hidden;
  list-style-type: none;
}

.operators__item {
  padding: 0.3em;
  cursor: pointer;
}

.operators__item.active {
  background-color: lightblue;
}

.operators__item:not(:last-child) {
  border-right: 1px solid lightgray;
}
</style>
