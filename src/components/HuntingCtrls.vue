<template>
  <div class="d-flex justify-center flex-wrap">
    <v-btn class="mx-1" @click="handleTriggerHunting">GOOD LUCK!</v-btn>
    <v-btn class="mx-1" @click="handleGoHome">GO HOME</v-btn>
  </div>
</template>
<script>
import HeroineController, {
  OUTDOOR_ACTIVITY_TYPE,
} from "../controllers/HeroineController";
import MessageController from '../controllers/MessageController';

import { ActivityStates } from "../models/Heroine";

export default {
  methods: {
    handleTriggerHunting() {
      HeroineController.triggerActivityEvent(OUTDOOR_ACTIVITY_TYPE.HUNTING)
        .then(({ item, amount }) => {
          MessageController.sendMessage(`YOU FOUND ${amount} ${item.id}!`);
        })
        .catch(() => {
          MessageController.sendMessage('NOTHING FOUND. GOOD LUCK NEXT TIME.');
        });
    },
    handleGoHome() {
      HeroineController.changeActivity(ActivityStates.ATHOME);
    },
  },
};
</script>
