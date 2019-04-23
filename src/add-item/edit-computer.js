export default Vue.extend({
    props: ["item"],
    data: () => ({
        minYear: 2010,
        maxYear: new Date().getFullYear()
    }),
    template: `
      <div>
  
          <div class="form-group">
              <label for="item-serial-number">Serial Number</label>
              <input name="item-serial-number" type="text"class="form-control" v-model="item.serialNumber" />
          </div>
  
          <div class="form-group">
              <label for="item-year">Year</label>
              <input name="item-year" type="number":min="minYear" :max="maxYear" class="form-control" v-model="item.year" />
          </div>
  
          <div class="form-group">
              <label for="item-make">Make</label>
              <input name="item-make" type="text" class="form-control" v-model="item.make" />
          </div>
  
          <div class="form-group">
              <label for="item-model">Model</label>
              <input name="item-model" type="text" class="form-control" v-model="item.model" />
          </div>
  
      </div>
      `
});
