import inventoryStore from "../inventoryStore.js";

export default Vue.extend({
  data: () => ({
    store: inventoryStore,
    selectedItem: null
  }),
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    }
  },
  template: `
  <div>
    <h1>Current Inventory</h1>

    <div class="flex">

        <div class="inventory-list list-group">
            <a v-on:click="selectItem(item)" class="list-group-item" 
                v-for="item in store.items"
                v-bind:class="{ active: selectedItem && selectedItem.trackingNumber == item.trackingNumber }">
                {{ item.name }}
            </a>
        </div>

        <div v-if="selectedItem" class="grow full-height">
            <div class="panel panel-default">
                <div class="panel-heading">{{selectedItem.name}}</div>
                <div class="panel-body">
                    <p>
                        <label>Assigned to:</label>
                        {{selectedItem.assignedTo}}
                    </p>
                    <p>
                        <label>Tracking Number:</label>
                        {{selectedItem.trackingNumber}}
                    </p>
                </div>
            </div>
        </div>

    </div>
  </div>
    `
});
