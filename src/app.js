import inventoryStore from "./inventoryStore.js";
import router from "./router.js";
import testData from "./testData.js";

// initialize the test data if it doesn't exist
if(inventoryStore.items.length === 0) {
  testData.map(item => inventoryStore.addItem(item));
}

// initialize the app
new Vue({
  el: "#app",
  components: { router },
  template: `
    <div class="container">
        <div class="header clearfix">
            <nav>
                <ul class="nav nav-pills pull-right">
                    <li role="presentation">
                        <a href="#/">Home</a>
                    </li>
                    <li role="presentation">
                        <a href="#/inventory">Inventory</a>
                    </li>
                    <li role="presentation">
                        <a href="#/add-item">Add Item</a>
                    </li>
                </ul>
            </nav>

            <h3 class="text-muted">Inventory Management System</h3>
        </div>

        <router>
          <template #loading>
            <p>Loading...</p>
          </template>

          <template #notFound>
            <h1>Page Not Found</h1>
          </template>
        </router>

    </div>`
});
