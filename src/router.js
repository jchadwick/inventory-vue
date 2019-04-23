export default Vue.extend({
  data: () => ({
    currentRoute: null,
    ViewComponent: null
  }),
  methods: {
    syncRoute() {
      this.currentRoute = window.location.hash.replace(/^#\//, "");
    }
  },
  watch: {
    currentRoute() {
      this.ViewComponent = "loading";

      import(`./${this.currentRoute || "inventory"}/index.js`)
        .then(x => (this.ViewComponent = x.default))
        .catch(err => {
          console.warn(err);
          this.ViewComponent = "notFound";
        });
    }
  },
  created() {
    window.addEventListener("hashchange", this.syncRoute);
    this.syncRoute();
  },
  render(h) {
    const vc = this.ViewComponent;

    if (vc == null) {
      return null;
    }

    return typeof vc === "string" ? this.$slots[vc] : h(this.ViewComponent);
  }
});
