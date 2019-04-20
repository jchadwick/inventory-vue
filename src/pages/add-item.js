import editItem from "../components/edit-item.js";
import inventoryStore from "../inventoryStore.js";

const EmptyItem = {
  type: "",
  name: "",
  assignedTo: ""
};

export default Vue.extend({
  components: { editItem },
  data: () => ({
    errors: [],
    item: Object.assign({}, EmptyItem)
  }),
  computed: {
    canSubmit() {
      return this.item.name && this.item.assignedTo && this.item.type;
    }
  },
  methods: {
    onSubmit() {
      if (!this.canSubmit) {
        return false;
      }

      inventoryStore.addItem(Object.assign({}, this.item));

      this.item = Object.assign({}, EmptyItem);
    }
  },
  template: `
    <div>
      <h1>Add Inventory Item</h1>
      <form @submit.prevent="onSubmit">

        {{item.name}}

        <div v-if="errors.length">
          <p>Please correct the following error(s):</p>
          <ul>
            <li v-for="error in errors">
              {{ error }}
            </li>
          </ul>
        </div>

        <edit-item :item="item" />

        <div class="text-right">
          <button :disabled="!canSubmit" type="submit" class="btn btn-primary">Save</button>
        </div>

      </form>
    </div>
    `
});
