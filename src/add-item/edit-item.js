import inventoryStore from "../inventoryStore.js";
import editComputer from "./edit-computer.js";
import editFurniture from "./edit-furniture.js";

export default Vue.extend({
  props: ["item"],
  data: () => ({
    category: null,
    categories: []
  }),
  mounted() {
  },
  watch: {
    item: {
      handler() {
        this.categories = inventoryStore.categories;
        this.category = inventoryStore.categories.find(x => x.name === this.item.type) || {};
      },
      deep: true
    }
  },
  computed: {
    subCategories() {
      return (this.category || {}).subCategories;
    },
    editorComponent() {
      switch (this.item.type) {
        case "computer":
          return editComputer;

        case "furniture":
          return editFurniture;

        default:
          return null;
      }
    }
  },
  template: `
    <div>

        <div class="form-group">
            <label for="item-name">Name</label>
            <input name="item-name" type="text"class="form-control" v-model="item.name" />
        </div>

        <div class="form-group">
            <label for="item-assigned-to">Assigned To</label>
            <input name="item-assigned-to" type="text"class="form-control" v-model="item.assignedTo" />
        </div>

        <div v-if="item.name && item.assignedTo" class="form-group">
            <label for="item-type">Category</label>
            <select name="item-type"class="form-control" v-model="item.type">
              <option disabled value="">-- Select --</option>
              <option v-for="category in categories" :value="category.name">
                {{category.displayName}}
              </option>
            </select>
        </div>

        <div v-if="subCategories" class="form-group">
            <label for="item-subCategory">Sub-Category</label>
            <select name="item-subCategory"class="form-control" v-model="item.subCategory">
              <option disabled value="">-- Select --</option>
              <option v-for="category in subCategories" :value="category.name">
                {{category.displayName}}
              </option>
            </select>
        </div>

        <component v-bind:is="editorComponent" :item="item"></component>

    </div>
    `
});
