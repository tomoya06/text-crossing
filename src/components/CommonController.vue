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
          <v-row
            v-for="({ title, items }, typeIndex) in packageItems"
            :key="typeIndex"
          >
            <v-col cols="12">
              <span>{{ title }}</span>
            </v-col>
            <v-col
              cols="2"
              v-for="(item, index) in items"
              :class="[
                'text-center',
                'package-item',
                item.item.id === selectedItemId && 'selected',
              ]"
              @click="selectedItemId = item.item.id"
              :key="index"
            >
              {{ item.item.icon }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions v-if="itemHasAction">
          <v-row>
            <v-col :cols="6">
              <div
                class="d-flex flex-column"
                v-html="itemDisplay(selectedItem)"
              ></div>
            </v-col>
            <v-col :cols="6" class="d-flex align-center">
              <template v-if="selectedItem.item.type === ItemTypes.FOOD">
                <v-btn class="mr-1" @click="handleEatOne">EAT</v-btn>
                <v-btn class="mr-1" @click="handleDropOne">DROP</v-btn>
              </template>
              <template v-else-if="selectedItem.item.type === ItemTypes.HOUSE">
                <v-btn class="mr-1" @click="handleDropOne">DROP</v-btn>
              </template>
            </v-col>
          </v-row>
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
      selectedItemId: undefined,
      HeroinController,
      ItemTypes,
    };
  },
  methods: {
    openBackpack() {
      this.backpackDialog = true;
      if (!this.selectedItemId) {
        if (this.HeroinController.heroine.package.firstItem) {
          this.selectedItemId = this.HeroinController.heroine.package.firstItem.item.id;
        }
      }
    },
    handleEatOne() {
      this.HeroinController.eatFood(this.selectedItem.item.id, 1);
    },
    handleDropOne() {
      this.HeroinController.dropItem(this.selectedItem.item.id, 1);
    },
    itemDisplay(item) {
      if (!item) {
        return "NO ITEM SELECTED";
      }
      if (item.item.type === ItemTypes.FOOD) {
        return `
        <div>${item.item.id} x ${item.amount}</div>
        <div>FOOD+${item.item.typeValue}</div>
        `;
      }
      if (item.item.type === ItemTypes.HOUSE) {
        return `
        <div>${item.item.id} x ${item.amount}</div>
        <div>ANTI-RAIN+${item.item.antiRain}</div>
        <div>ANTI-WIND+${item.item.antiWind}</div>
        `;
      }
      return "???";
    },
    // actionDisplay(item) {
    //   if (!item) {
    //     return "";
    //   }
    //   if (item.item.type === ItemTypes.FOOD) {
    //     return `
    //     <v-btn class="mr-1" @click="handleEatOne">EAT</v-btn>
    //     <v-btn class="mr-1" @click="handleDropOne">DROP</v-btn>
    //     `;
    //   }
    //   if (item.item.type === ItemTypes.HOUSE) {
    //     return `
    //     <v-btn class="mr-1" @click="handleDropOne">DROP</v-btn>
    //     `;
    //   }
    //   return `<v-btn class="mr-1">???</v-btn>`;
    // },
  },
  computed: {
    package() {
      return this.HeroinController.heroine.package;
    },
    packageItems() {
      const sortedItems = this.HeroinController.heroine.package.sortedItems;
      const mappedItems = [];
      for (let key of Object.keys(sortedItems)) {
        if (sortedItems[key].length) {
          mappedItems.push({
            title: key,
            items: sortedItems[key],
          });
        }
      }
      return mappedItems;
    },
    itemHasAction() {
      return !!this.selectedItemId;
    },
    selectedItem() {
      const packageItems = this.HeroinController.heroine.package.items;
      return packageItems.find((item) => item.item.id === this.selectedItemId);
    },
  },
  filters: {},
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
