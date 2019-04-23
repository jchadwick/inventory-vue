import inventoryStore from "./inventoryStore.js";
import router from "./router.js";

const MainContent = () => ({
  delay: 200,
  loading: { template: `<p>Loading...</p>` },
  component: inventoryStore.isLoaded.then(() => ({
    components: { router },
    template: `
      <router>
        <template #loading>
          <p>Loading...</p>
        </template>

        <template #notFound>
          <h1>Page Not Found</h1>
        </template>
      </router>`
  })),
})

// initialize the app
const app = new Vue({
  el: "#app",
  components: { MainContent },
  data: () => ({
    loading: true
  }),
  template: `
    <div class="container">
        <div class="header clearfix">
            <nav>
                <ul class="nav nav-pills pull-right">
                    <li role="presentation">
                        <a href="#/">Inventory</a>
                    </li>
                    <li role="presentation">
                        <a href="#/add-item">Add Item</a>
                    </li>
                </ul>
            </nav>

            <h3 class="text-muted">Inventory Management System</h3>
        </div>

        <main-content />

    </div>`
});

inventoryStore.isLoaded.then(() => app.loading = false);