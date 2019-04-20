import editComputer from "./edit-computer.js";

export default Vue.extend({
  props: ["item"],
  computed: {
    InventoryDetailsEditor() {
      switch (this.item.type) {
        case "computer":
          return editComputer;

        default:
          return null;
      }
    }
  },
  template: `
    <div>

        <div class="form-group">
            <label for="item-name">Name <em>(required)</em></label>
            <input name="item-name" type="text" class="form-control" v-model="item.name" />
        </div>

        <div class="form-group">
            <label for="item-assigned-to">Assigned To</label>
            <input name="item-assigned-to" type="text" class="form-control" v-model="item.assignedTo" />
        </div>

        <div class="form-group">
            <label for="item-type">Inventory Item Type</label>
            <select name="item-type" class="form-control" v-model="item.type">
            <option disabled value="">-- Select --</option>
            <option value="computer">Computer</option>
            <option value="furniture">Furniture</option>
            </select>
        </div>

        <component v-bind:is="InventoryDetailsEditor" :item="item"></component>

    </div>
    `
});
