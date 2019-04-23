import storage from "./Storage.js";

const InventoryItemsStorageKey = "Inventory";

class InventoryStore {
  /** the inventory categories */
  get categories() {
    return this._categories;
  }

  /** the inventory items */
  get items() {
    return this._items;
  }

  get isLoaded() {
    return this._isLoaded;
  }

  constructor() {
    // define and initialize properties (which happen to be "private")
    this._categories = [];
    this._items = [];

    // load initial set of data
    this._isLoaded = this._load();
  }

  /**
   * Locates a specific item from inventory
   *
   * @param {string} trackingNumber the item's tracking number
   * @returns the inventory item with the given tracking number, or null
   */
  getItem(trackingNumber) {
    return this._items.find(x => x.trackingNumber === trackingNumber);
  }

  /**
   * Adds an item to inventory
   *
   * @param {InventoryItem} item the item to add to inventory   *
   * @returns {Promise<InventoryItem>} promise containing the updated item after it's been saved
   */
  addItem(item) {
    const errors = this.validateItem(item);

    if (errors.length) {
      return Promise.reject(errors);
    }

    const trackingNumber = Math.random()
      .toString(36)
      .substr(2, 9);

    item.trackingNumber = trackingNumber;

    this._items.push(item);

    return this._save().then(() => item);
  }

  /**
   * validate an inventory item
   *
   * @param {InventoryItem} item the inventory item to validate
   * @returns {ValidationError[]} an array of validation errors
   */
  validateItem(item) {
    let errors = [];

    function addError(field, message) {
      errors.push({ field, message });
    }

    //#region Validation logic applying to any/all types of inventory items

    if (item == null) {
      addError("", "item is null");
      return errors;
    }

    if (!item.type) {
      addError("type", "Please select a valid Category");
    }

    if (!item.name) {
      addError("name", "Name must be greater then 5 characters long");
    }

    if (!item.assignedTo) {
      addError("assignedTo", "Please select the person this is assigned to");
    }

    if (!item.subCategory) {
      addError("assignedTo", "Please select a Sub-Category");
    }

    //#endregion

    switch (item.type) {
      // Computer-specific validation
      case "computer":
        if (item.year > new Date().getFullYear()) {
          addError("name", "item year cannot be in the future");
        }

        if (isNullOrEmpty(item.serialNumber)) {
          addError("serialNumber", "item must have a valid serial number");
        }
        break;

      // Furniture-specific validation
      case "furniture":
        if (isNullOrEmpty(item.category)) {
          addError("category", "item must have a category");
        }

        if (isNullOrEmpty(item.manufacturer)) {
          addError("manufacturer", "item must have a manufacturer");
        }
        break;
    }

    return errors;
  }

  /**
   * Removes an item from inventory
   *
   * @param {InventoryItem} item the item to remove from inventory   *
   * @returns {Promise<void>} a promise which resolves once the task is complete
   *
   */
  removeItem(item) {
    this._items.splice(this._items.findIndex(item), 1);
    return this._save();
  }

  //#region Private methods

  /*  NOTE:
   *  This demo uses local storage to save and load inventory items,
   *  but in a real app these would be AJAX calls to a server.
   */

  /**
   * Load the current inventory items.
   *
   * @returns {Promise<boolean>} a promise with the loading state
   *
   * @private  <-- just information, doesn't actually do anything at runtim
   */
  _load() {
    return Promise.all([
      storage.get("Categories").then(categories => this._categories = categories),
      storage.get(InventoryItemsStorageKey).then(items => this._items = items),
    ]).then(() => true);
  }

  /**
   * Save the inventory items to the data source
   *
   * @returns {Promise<void>} a promise which resolves once the task is complete
   *
   * @private  <-- just information, doesn't actually do anything at runtim
   */
  _save() {
    return storage.save(InventoryItemsStorageKey, this._items);
  }

  //#endregion
}

/**
 * checks to see if a string value is null or empty (true) or not (false)
 * @param {string} value the value to evaluate
 * @returns {boolean} `true` if value is null or empty, or `false` if not
 */
const isNullOrEmpty = value => !value || value.length < 1;

// Create a "static" singleton instance for the entire application to use
InventoryStore.instance = new InventoryStore();

// Expose the singleton as the default export
export default InventoryStore.instance;
