<template>
  <div>
    <home-ctrls v-if="state === ActivityStates.ATHOME" />
    <hunting-ctrls v-else-if="state === ActivityStates.HUNTING"/>
  </div>
</template>
<script>
import HeroineController from "../controllers/HeroineController";
import { ActivityStates } from "../models/Heroine";
import HomeCtrls from "./HomeCtrls.vue";
import HuntingCtrls from "./HuntingCtrls.vue";

export default {
  data() {
    return {
      ActivityStates,
      HeroineController
    };
  },
  computed: {
    state() {
      return this.HeroineController.heroine.activityState;
    }
  },
  components: {
    HomeCtrls,
    HuntingCtrls,
  }
};
</script>
