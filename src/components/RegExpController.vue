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
      <div class="popup">
        <div class="popup__header">
          <span class="popup__title">Condition Expression</span>
          <button @click="hidePopup" type="button" class="popup__breaker">
            Close
          </button>
        </div>
        <div class="popup__content">
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
        </div>
        <div class="popup__actions">
          <button
            @click="hidePopup"
            type="button"
            class="popup__action popup__action--close"
          >
            Close
          </button>
          <button
            @click="hidePopup"
            type="button"
            class="popup__action popup__action--apply"
          >
            Apply changes
          </button>
        </div>
      </div>
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

.popup {
  background-color: rgba(255, 255, 255, 1);
}

.popup__header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 2px solid rgba(241, 241, 241, 1);
  font-size: 1.5rem;
  padding: 15px 10px;
}

.popup__actions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
}

.popup__breaker {
  position: relative;
  width: 16px;
  height: 15px;
  margin: 0;
  padding: 0;
  align-self: flex-start;
  border: none;
  background-color: transparent;
  font-size: 0;
}

.popup__breaker:before,
.popup__breaker:after {
  position: absolute;
  content: '';
  top: 0;
  left: 6px;
  height: 15px;
  width: 4px;
  background-color: gray;
}

.popup__breaker:before {
  transform: rotate(45deg);
}

.popup__breaker:after {
  transform: rotate(-45deg);
}

.popup__content {
  padding: 10px 10px 30px;
}

.popup__actions {
  border-top: 2px solid rgba(241, 241, 241, 1);
}

.popup__action {
  padding: 0.5em 1em;
  border: 1px solid;
  border-radius: 5px;
}

.popup__action--close {
  background-color: rgba(241, 241, 241, 1);
  border-color: lightgray;
}

.popup__action--apply {
  color: rgba(255, 255, 255, 1);
  background-color: green;
  border-color: darkgreen;
}
</style>
