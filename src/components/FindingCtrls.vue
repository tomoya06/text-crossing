<template>
  <div class="d-flex justify-center flex-wrap">
    <v-btn class="mx-1" @click="handleTriggerHunting" :disabled="isHunting">
      <span v-if="!isHunting">GOOD LUCK!</span>
      <span v-else>...</span>
    </v-btn>
    <v-btn class="mx-1" @click="handleGoHome">GO HOME</v-btn>
  </div>
</template>
<script>
import HeroineController, {
  OUTDOOR_ACTIVITY_TYPE,
} from "../controllers/HeroineController";
import MessageController from "../controllers/MessageController";

import { ActivityStates } from "../models/Heroine";

export default {
  data() {
    return {
      isHunting: false,
    };
  },
  methods: {
    handleTriggerHunting() {
      this.isHunting = true;
      HeroineController.triggerActivityEvent(OUTDOOR_ACTIVITY_TYPE.FINDING)
        .then(({ item, amount }) => {
          MessageController.sendMessage(
            `YOU FOUND ${amount} ${item.icon}${item.id}!`
          );
        })
        .catch(() => {
          MessageController.sendMessage("NOTHING FOUND. GOOD LUCK NEXT TIME.");
        })
        .finally(() => {
          this.isHunting = false;
        });
    },
    handleGoHome() {
      HeroineController.changeActivity(ActivityStates.ATHOME);
    },
  },
};
</script>
