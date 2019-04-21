/** helper function to reate an asynchronous action with a fake network delay */
function fakeNetworkCall(action) {
  return new Promise(done => {
    setTimeout(
      () => done(action()),
      Math.random() * 2000 // delay from 0-2 seconds
    );
  });
}

const StorageKey = "Inventory";

class InventoryStore {
  /** the inventory items */
  get items() {
    return this._items;
  }

  constructor() {
    this._items = [];
    this._load();
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
   * @param {InventoryItem} item the item to add to inventory
   * @returns the updated item
   */
  addItem(item) {
    item.trackingNumber = Math.random()
      .toString(36)
      .substr(2, 9);

    this._items.push(item);

    this._save();

    return item;
  }

  validateItem(item) {
    let errors = [];

    function addError(field, message) {
      errors.push({ field, message });
    }

    if (item == null) {
      addError("", "item is null");
    }

    if (!item.type) {
      addError("type", "item must have a valid type");
    }

    if (!item.name || item.name.length < 5) {
      addError("name", "item name must be greater then 5 characters long");
    }

    if (!item.assignedTo || item.assignedTo.length < 1) {
      addError("assignedTo", "item must be assigned to someone");
    }

    switch (item.type) {
      case "computer":
        if (item.year > new Date().getFullYear()) {
          addError("name", "item year cannot be in the future");
        }

        if (!item.serialNumber || item.serialNumber.length < 1) {
          addError("serialNumber", "item must have a valid serial number");
        }
        break;
    }

    return errors;
  }

  /**
   * Removes an item from inventory
   *
   * @param {InventoryItem} item the item to remove from inventory
   * @returns void
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
   * @private  <-- just information, doesn't actually make it private
   */
  _load() {
    return fakeNetworkCall(() => {
      const cachedItems = localStorage.getItem(StorageKey) || "[]";
      this._items = JSON.parse(cachedItems);
    });
  }

  /**
   * Save the inventory items to the data source
   * @private  <-- just information, doesn't actually make it private
   */
  _save() {
    return fakeNetworkCall(() =>
      localStorage.setItem(StorageKey, JSON.stringify(this._items))
    );
  }

  //#endregion
}
// Create a "static" singleton instance for the entire application to use
InventoryStore.instance = new InventoryStore();

// Expose the singleton as the default export
export default InventoryStore.instance;
