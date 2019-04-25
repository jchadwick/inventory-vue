import { initializeTestData } from "./testData.js";

/** General-purpose storage mechanism */
export class Storage {
  /**
   * Retrieves data from storage
   */
  get(key) {
    return delay(() => {
      const serialized = localStorage.getItem(key) || "";
      return JSON.parse(serialized);
    });
  }

  /**
   * Save data to storage
   */
  save(key, data) {
    return delay(() => {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    });
  }
}

/** helper function to introduce a random delay to simulate network conditions */
function delay(action) {
  return new Promise(done => {
    setTimeout(
      () => done(action()),
      Math.random() * 2000 // delay from 0-2 seconds
    );
  });
}

initializeTestData();

export default new Storage();
