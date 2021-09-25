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
import { ref } from 'vue';

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

    const showPopup = () => {
      isPopupShowed.value = true;
    };
    const hidePopup = () => {
      isPopupShowed.value = false;
    };

    return {
      expressions,
      isPopupShowed,
      showPopup,
      hidePopup,
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
</style>
