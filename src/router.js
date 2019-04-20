function getCurrentRoute() {
  return window.location.hash.replace(/^#\//, "");
}

export default Vue.extend({
  data: () => ({
    currentRoute: null,
    ViewComponent: null
  }),
  watch: {
    currentRoute() {
      this.ViewComponent = "loading";

      import(`./pages/${this.currentRoute || "home"}.js`)
        .then(x => (this.ViewComponent = x.default))
        .catch(err => {
          console.warn(err);
          this.ViewComponent = "notFound";
        });
    }
  },
  mounted() {
    const syncRoute = () => (this.currentRoute = getCurrentRoute());
    window.addEventListener("hashchange", syncRoute);
    syncRoute();
  },
  render(h) {
    const vc = this.ViewComponent;

    if (vc == null) {
      return null;
    }

    return typeof vc === "string" ? this.$slots[vc] : h(this.ViewComponent);
  }
});
