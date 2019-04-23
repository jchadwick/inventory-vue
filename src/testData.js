export const initializeTestData = () =>
  Object.keys(testData).forEach(key => {
    if (localStorage.getItem(key) == null) {
      localStorage.setItem(key, JSON.stringify(testData[key]));
    }
  });

const testData = {
  Categories: [
    {
      name: "computer",
      displayName: "Computer",
      subCategories: [
        { name: "laptop", displayName: "Laptop" },
        { name: "desktop", displayName: "Desktop" },
        { name: "tablet", displayName: "Tablet" },
        { name: "mobile", displayName: "Mobile Device" },
        { name: "other", displayName: "Other" },
      ]
    },
    {
      name: "furniture",
      displayName: "Furniture",
      subCategories: [
        { name: "chair", displayName: "Chair" },
        { name: "desk", displayName: "Desk" },
        { name: "storage", displayName: "Storage" },
        { name: "other", displayName: "Other" },
      ],
      colors: ["Brown", "Black", "White"]
    }
  ],
  Inventory: [
    {
      trackingNumber: "0012390421899",
      type: "computer",
      name: "Michael's Dell Laptop",
      year: 2010,
      make: "Dell",
      model: "Latitude 5100",
      serialNumber: "DELL12344",
      assignedTo: "Michael"
    },
    {
      trackingNumber: "gftt4aVxzd",
      type: "computer",
      name: "Nina's MacBook Pro",
      year: 2018,
      make: "Apple",
      model: "MacBook Pro 15",
      serialNumber: "APPL143223",
      assignedTo: "Nina"
    },
    {
      trackingNumber: "42166GVZ",
      type: "computer",
      name: "Jess's Surface Book",
      year: 2016,
      make: "Microsoft",
      model: "Surface Book",
      serialNumber: "MS19412412",
      assignedTo: "Jess"
    }
  ]
};

export default testData;