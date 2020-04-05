<template>
  <div id="app">
    <v-app id="inspire">
      <v-system-bar>
        <span>TEXT CROSSING</span>
        <v-spacer></v-spacer>
        <span class="ml-2">{{ displayGameTime }}</span>
      </v-system-bar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <v-flex xs12 sm8 md4>
              <v-card
                class="elevation-12 d-flex flex-column fill-height"
              >
                <v-toolbar color="primary" class="flex-grow-0" dark flat dense>
                  <v-toolbar-title>
                    <span>{{ heroine.name }} @ {{ island.name }}</span>
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text
                  class="flex-grow-1"
                  style="overflow-y: scroll; height: 0;"
                >
                  <div class="fill-height">
                    <div v-for="(msg, idx) in messageList" :key="idx">
                      {{ msg }}
                    </div>
                  </div>
                </v-card-text>
                <v-card-actions class="d-block px-0 pb-0">
                  <v-divider></v-divider>
                  <div class="d-flex justify-center flex-nowrap py-2">
                    <span class="px-2"
                      >LIFE: {{ heroine.health | fixedNumberFilter }}</span
                    >
                    <span class="px-2"
                      >FOOD: {{ heroine.food | fixedNumberFilter }}</span
                    >
                  </div>
                  <v-divider></v-divider>
                  <div class="px-6 py-2 grey darken-3">
                    <GameController />
                    <v-divider class="pt-2 mt-2"></v-divider>
                    <CommonController />
                  </div>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import WorldController from "./controllers/WorldController";
import TimeController from "./controllers/TimeController";
import WeatherController from "./controllers/WeatherController";
import HeroineController, {
  HEROINE_EVENTS,
} from "./controllers/HeroineController";
import MessageController from "./controllers/MessageController";

import { ActivityStates } from "./models/Heroine";

import GameController from "./components/GameController.vue";
import CommonController from "./components/CommonController.vue";

export default {
  data() {
    return {
      displayGameTime: "",
      TimeController,
      HeroineController,
      WeatherController,
      WorldController,
      MessageController,
      heroineState: "",
    };
  },
  created() {
    window.game = this;
    this.bindTime();

    this.HeroineController.addEventListener(
      HEROINE_EVENTS.FOUNDED,
      (result) => {
        console.log(`FOUNDED!!`, result);
        if (result) {
          this.HeroineController.confirmFounded(true);
        }
      }
    );
    this.HeroineController.addEventListener(
      HEROINE_EVENTS.FINISHED_FINDING,
      (result) => {
        if (result === true) {
          console.log("ADDED TO PACKAGE");
        } else if (result === false) {
          console.log("CANT ADD TO PACKAGE. MAYBE OVERWEIGHT");
        } else {
          console.log("NOTHING HAPPENDED TO YOUR PACKAGE");
        }
      }
    );
    this.HeroineController.onActivityStateChange((state) => {
      this.heroineState = state;
    });

    this.HeroineController.goHome();
  },
  filters: {
    fixedNumberFilter(number) {
      return Math.round(number);
    },
  },
  computed: {
    heroine() {
      return this.HeroineController.heroine;
    },
    island() {
      return this.WorldController.island;
    },
    messageList() {
      return this.MessageController.messages;
    },
  },
  methods: {
    bindTime() {
      TimeController.onTimeChange((tm) => {
        this.displayGameTime = tm.format("YYYY MMM DD HH:mm");
      });
    },
  },
  components: {
    GameController,
    CommonController,
  },
};
</script>
<style>
html {
  overflow-y: hidden;
}
</style>
