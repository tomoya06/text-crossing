<template>
  <div class="d-flex justify-center flex-wrap">
    <v-btn class="mx-1" @click.stop="openBackpack">BACKPACK</v-btn>

    <v-dialog
      v-model="backpackDialog"
      overlay-color="#fff"
      scrollable
      :overlay-opacity="0.2"
    >
      <v-card class="package-container">
        <v-card-title>MY BACKPACK</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-row>
            <v-col
              cols="2"
              v-for="(item, index) in packageItems"
              :class="[
                'text-center',
                'package-item',
                selectedItemIdx === index && 'selected',
              ]"
              @click="selectedItemIdx = index"
              :key="index"
            >
              {{ item.item.icon }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions v-if="itemHasAction">
          <span class="pr-2">{{ selectedItem | foodItemDisplay }}</span>
          <v-divider></v-divider>
          <span v-if="selectedItem.item.type === ItemTypes.FOOD">
            <v-btn class="mr-1" @click="handleEatOne">EAT</v-btn>
            <v-btn class="mr-1" @click="handleDropOne">DROP</v-btn>
          </span>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import HeroinController from "../controllers/HeroineController";
import { ItemTypes } from "../models/Items/Item";

export default {
  data() {
    return {
      backpackDialog: false,
      selectedItemIdx: 0,
      HeroinController,
      ItemTypes,
    };
  },
  methods: {
    openBackpack() {
      this.backpackDialog = true;
      this.selectedItemIdx = 0;
    },
    handleEatOne() {
      this.HeroinController.eatFood(this.selectedItem.item.id, 1);
    },
    handleDropOne() {
      
    }
  },
  computed: {
    package() {
      return this.HeroinController.heroine.package;
    },
    packageItems() {
      return this.HeroinController.heroine.package.items;
    },
    itemHasAction() {
      return !!this.packageItems[this.selectedItemIdx];
    },
    selectedItem() {
      return this.packageItems[this.selectedItemIdx];
    },
  },
  filters: {
    foodItemDisplay(item) {
      return item
        ? `${item.item.id} x ${item.amount} +${item.item.typeValue} FOOD`
        : "NO ITEM SELECTED";
    },
  },
};
</script>
<style lang="scss">
.package-container {
  .package-item {
    &.selected {
      background-color: #ffffff96;
    }
  }
}
</style>
