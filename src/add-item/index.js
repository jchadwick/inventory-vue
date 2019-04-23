import inventoryStore from "../inventoryStore.js";
import editItem from "./edit-item.js";

export default Vue.extend({
  components: { editItem },
  data: () => ({
    errors: [],
    item: {},
    saving: false,
    showSavedMessage: false
  }),
  methods: {
    onSubmit() {
      this.saving = true;

      inventoryStore.addItem(this.item)
        .then(() => {
          this.reset();
          this.showSavedMessage = true;
          this.saving = false;
          setTimeout(() => this.showSavedMessage = false, 4000);
        })
        .catch(errors => {
          this.errors.splice(0, Infinity, ...errors);
          this.saving = false;
        });
    },
    reset() {
      this.item = {};
      this.errors = [];
      this.showErrors = false;
    }
  },
  template: `
    <div>
      <div v-if="showSavedMessage" class="alert alert-success alert-dismissible" role="alert">
        <button @click="showSavedMessage = false" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <strong>Inventory item saved!</strong>
        You have successfully saved your new item!
        Check it out on the <a href="#/inventory">Inventory page</a>!
      </div>

      <h1>Add Inventory Item</h1>

      <div class="form-container">
        <div class="saving" v-if="saving">
          Saving...
        </div>

        <form @submit.prevent="onSubmit">

          <div v-if="errors.length">
            <p>Please correct the following error(s):</p>
            <ul>
              <li class="error" v-for="error in errors">
                <span>{{ error.message }}</span>
              </li>
            </ul>
          </div>

          <edit-item :item="item" />

          <div class="text-right">
            <button type="submit" class="btn btn-primary">Save</button>
          </div>

        </form>
      </div>
    </div>
    `
});
