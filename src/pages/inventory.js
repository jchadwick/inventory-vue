import inventoryStore from "../inventoryStore.js";

const InventoryList = Vue.extend({
  props: ["selectedItem", "inventory"],
  template: `
    <div class="inventory-list list-group">
      <a class="list-group-item"
        v-on:click="$emit('item-selected', item)"
        v-for="item in inventory"
        v-bind:class="{ active: selectedItem && selectedItem.trackingNumber == item.trackingNumber }"
      >
        {{ item.name }}
      </a>
    </div>
  `
});

const InventoryItemDetails = Vue.extend({
  props: { item: Object },
  template: `
    <div v-if="item">
      <div class="inventory-panel panel panel-default">
        <div class="panel-heading">{{ item.name }}</div>
        <div class="panel-body">
          <p>
            <label>Tracking Number:</label>
            {{ item.trackingNumber }}
          </p>
          <p>
            <label>Assigned to:</label>
            {{ item.assignedTo }}
          </p>
        </div>
      </div>
    </div>
  `
});

export default Vue.extend({
  components: { InventoryList, InventoryItemDetails },
  data: () => ({
    inventory: inventoryStore.items,
    selectedItem: null
  }),
  template: `
    <div>
      <h2 class="title">Current Inventory</h2>

      <div class="flex">
      
        <inventory-list 
          :inventory="inventory" 
          :selectedItem="selectedItem" 
          @item-selected="selectedItem = $event" 
        />

        <inventory-item-details  
          class="grow full-height" 
          :item="selectedItem" 
        />

      </div>
    </div>
  `
});
