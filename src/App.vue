<template>
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
            <v-card class="elevation-12 d-flex flex-column fill-height">
              <v-toolbar color="primary" class="flex-grow-0" dark flat dense>
                <v-toolbar-title>
                  <span>{{ heroine.name }} @ {{ island.name }}</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text
                class="flex-grow-1 pa-0 my-2"
                style="overflow-y: scroll; height: 0;"
                id="msgContainer"
              >
                <div v-for="(msg, idx) in messageList" :key="idx" class="px-2">
                  {{ msg }}
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
      heroineState: "",
      messageList: [],
      TimeController,
      HeroineController,
      WeatherController,
      WorldController,
      MessageController,
    };
  },
  created() {
    window.game = this;
    this.bindTime();
    this.HeroineController.onActivityStateChange((state) => {
      this.heroineState = state;
    });
    this.MessageController.handleNewMessage((msg) => {
      this.messageList.push(msg);
      this.$nextTick(() => {
        this.scrollMsg();
      });
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
  },
  methods: {
    bindTime() {
      TimeController.onTimeChange((tm) => {
        this.displayGameTime = tm.format("YYYY MMM DD HH:mm");
      });
    },
    scrollMsg() {
      let container = this.$el.querySelector("#msgContainer");
      container.scrollTop = container.scrollHeight;
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
#inspire,
#inspire .v-application--wrap {
  height: 100% !important;
  min-height: 100% !important;
}
</style>
