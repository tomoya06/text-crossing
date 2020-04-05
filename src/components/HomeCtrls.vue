<template>
  <div class="d-flex justify-center flex-wrap">
    <v-btn class="mx-1" @click="handleGoHunting">HUNTING</v-btn>
    <v-btn class="mx-1" @click="handleGoFinding">FIND MATERIAL</v-btn>
  </div>
</template>
<script>
import HeroineController from '../controllers/HeroineController';
import { ActivityStates } from '../models/Heroine';

export default {
  methods: {
    handleGoHunting() {
      HeroineController.changeActivity(ActivityStates.HUNTING);
    },
    handleGoFinding() {
      HeroineController.changeActivity(ActivityStates.FINDING);
    }
  },
};
</script>
