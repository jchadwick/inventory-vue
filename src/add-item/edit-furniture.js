import inventoryStore from "../inventoryStore.js";

export default Vue.extend({
    props: ["item"],
    data: () => ({
        categories: inventoryStore.categories.furniture
    }),
    template: `
      <div>
  
          <div class="form-group">
              <label for="item.manufacturer">Manufacturer</label>
              <input name="item.manufacturer" type="text"class="form-control" v-model="item.manufacturer" />
          </div>
  
          <div class="form-group">
              <label for="item.model">Model / Serial Number / Description</label>
              <input name="item.model" type="text"class="form-control" v-model="item.model" />
          </div>
  
          <div class="form-group">
              <label for="item.material">Material</label>
              <input name="item.material" type="text" class="form-control" v-model="item.material" />
          </div>
  
          <div class="form-group">
              <label for="item.color">Color(s)</label>
              <input name="item.color" type="text" class="form-control" v-model="item.color" />
          </div>
  
      </div>
      `
});
