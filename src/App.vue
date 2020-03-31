<template>
  <div id="app">
    <v-app id="inspire">
      <v-system-bar>
        <v-icon>mdi-gmail</v-icon>
        <v-spacer></v-spacer>
        <span>ISLAND TIME</span>
        <span class="ml-2">{{ displayGameTime }}</span>
      </v-system-bar>
      <v-content>
        <v-container fluid>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card
                class="elevation-12 d-flex flex-column"
                style="height: 400px"
              >
                <v-toolbar color="primary" class="flex-grow-0" dark flat dense>
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text class="flex-grow-1"></v-card-text>
                <v-card-actions class="grey darken-3 d-flex">
                  <v-text-field
                    solo
                    flat
                    dense
                    hide-details
                    class="pr-4"
                  ></v-text-field>
                  <v-btn color="white" icon>
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-layout class="mt-4" align-center justify-center>
                <v-btn class="elevation-6 mx-2" icon fab small>
                  <v-icon>mdi-cellphone-sound</v-icon>
                </v-btn>
                <v-btn class="elevation-6 mx-2" icon fab small>
                  <v-icon>mdi-bag-personal-outline</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import TimeController from "./controllers/TimeController";

export default {
  data() {
    return {
      displayGameTime: ""
    };
  },
  created() {
    this.bindTime();
  },
  methods: {
    bindTime() {
      TimeController.onTimeChange(tm => {
        this.displayGameTime = tm.format("HH:mm");
      });
    }
  }
};
</script>
<style>
html {
  overflow-y: hidden;
}
</style>
