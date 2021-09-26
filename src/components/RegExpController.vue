<template>
  <section class="controller">
    <div class="controller__wrapper">
      <header class="controller__header">
        <div class="controller__title">
          Condition Expression
        </div>
        <div class="controller__mode">
          <span>Raw Mode:</span>
          <label class="mode" tabindex="0" @keyup.enter="toggleMode">
            <input v-model="mode" type="checkbox" hidden />
            <span class="mode__toggle" />
            <span class="mode__name">{{ modeName }}</span>
          </label>
       </div>
      </header>
      <textarea
        class="controller__expressions"
        @click="showPopup"
        v-model="expressions"
      />
      <footer class="controller__footer">
        Click to the textarea above for editing expression
      </footer>
    </div>
    <div v-if="isPopupShowed" class="controller__popup">
      <div class="popup">
        <div class="popup__header">
          <span class="popup__title">Condition Expression</span>
          <button @click="hidePopup" type="button" class="popup__breaker">
            Close
          </button>
        </div>
        <div class="popup__content">
          <div class="popup__content-wrapper">
            <div class="controller__controls">
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
              <button @click="addRule" type="button" class="popup__add">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                  <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                </svg>
                <span>Rule</span>
              </button>
            </div>
            <div class="popup__rules">
              <rule
                v-for="(rule, i) in rules"
                :key="i"
                :data="data"
              />
            </div>
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
            @click="applyRules"
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
import {
  ref, computed, reactive,
} from 'vue';
import Rule from './Rule.vue';

const OPERATORS = {
  AND: 'AND',
  OR: 'OR',
  ALWAYS: 'Always',
  NEVER: 'Never',
};

class RuleExp {
  constructor(field = '', op = '', choice = '') {
    this.field = field;
    this.op = op;
    this.choice = choice;
  }

  toString() {
    return `${this.field} ${this.op} ${this.choice}`;
  }
}

export default {
  name: 'RegExpController',
  components: {
    Rule,
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const mode = ref(false);
    const isPopupShowed = ref(false);
    const currentOperator = ref(OPERATORS.AND);
    const rules = reactive([]);

    const expressions = computed(() => rules.map((rule) => rule.toString()).join('\n'));
    const operators = computed(() => Object.values(OPERATORS));
    const modeName = computed(() => (mode.value ? 'Enabled' : 'Disabled'));

    const showPopup = () => {
      if (mode.value) {
        return;
      }
      isPopupShowed.value = true;
    };
    const hidePopup = () => {
      isPopupShowed.value = false;
    };
    const selectOperator = (operator) => {
      currentOperator.value = operator;
    };
    const addRule = () => {
      const rule = new RuleExp();
      rules.push(rule);
    };
    const applyRules = () => {
      expressions.value = rules.join(' ');
      hidePopup();
    };
    const toggleMode = () => {
      mode.value = !mode.value;
    };

    return {
      mode,
      isPopupShowed,
      currentOperator,
      operators,
      rules,
      modeName,
      hidePopup,
      selectOperator,
      showPopup,
      addRule,
      applyRules,
      toggleMode,
      data: props.config,
      expressions,
    };
  },
};
</script>

<style scoped>
.controller {
  width: 100%;
  height: 100%;
  font-family: 'PT Sans', sans-serif;
  font-size: 1rem;
  font-weight: normal;
}

.controller *,
.controller :before,
.controller :after {
  box-sizing: border-box;
}

.controller__header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid grey;
  border-bottom: none;
}

.controller__footer {
  margin-top: 10px;
  color: gray;
  font-size: 0.8rem;
}

.mode {
  color: rgba(28, 143, 184, 1);
  cursor: pointer;
}

.mode__toggle {
  display: inline-block;
  position: relative;
  width: 15px;
  height: 10px;
  border-radius: 10px;
  border: 2px solid rgba(28, 143, 184, 1);
  margin: 0 5px;
}

.mode__toggle:before {
  position: absolute;
  content: '';
  width: 10px;
  height: 10px;
  top: -2px;
  left: -2px;
  border-radius: 50%;
  border:  2px solid rgba(28, 143, 184, 1);
  transition: all 0.4s ease-out;
}

input:checked + .mode__toggle:before {
  transform: translateX(5px);
  background-color: rgba(28, 143, 184, 1);
}

.controller__expressions {
  display: block;
  width: 100%;
  background-color: rgba(241, 241, 241, 1);
  border: 1px solid grey;
}

.controller__controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px 10px;
  border-bottom: 2px solid lightgray;
  background-color: rgba(241, 241, 241, 1);
}

.controller__popup {
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 20vh 10vw;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
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

.popup__add {
  margin: 0;
  padding: 0.3em;
  border: 1px solid lightgray;
  cursor: pointer;
  border-radius: 5px;
  font-size: inherit;
  display: inline-flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  line-height: 1rem;
  vertical-align: center ;
}

.popup__add svg {
  margin-right: 0.3em;
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

.popup__content-wrapper {
  border-left: 2px solid lightblue;
  padding-left: 5px;
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
