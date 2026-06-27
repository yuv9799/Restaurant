/**
 * Embedded Database Layer — Uses NeDB (file-based) when MongoDB is unavailable.
 * Data is stored as JSON files in the .data/ directory.
 */
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb-promises');

const DATA_DIR = path.join(__dirname, '..', '.data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Create collections
const collections = {
  dishes: Datastore.create({ filename: path.join(DATA_DIR, 'dishes.db'), autoload: true }),
  drinks: Datastore.create({ filename: path.join(DATA_DIR, 'drinks.db'), autoload: true }),
  users: Datastore.create({ filename: path.join(DATA_DIR, 'users.db'), autoload: true }),
  reservations: Datastore.create({ filename: path.join(DATA_DIR, 'reservations.db'), autoload: true }),
  tables: Datastore.create({ filename: path.join(DATA_DIR, 'tables.db'), autoload: true }),
  awards: Datastore.create({ filename: path.join(DATA_DIR, 'awards.db'), autoload: true }),
  reviews: Datastore.create({ filename: path.join(DATA_DIR, 'reviews.db'), autoload: true }),
};

/**
 * Creates a Mongoose-like Model wrapper around a NeDB collection.
 */
function createModel(name, collection) {
  // Return an object with Mongoose-compatible methods
  const Model = function (data) {
    Object.assign(this, data);
  };

  Model.collection = collection;

  Model.find = async function (filter = {}) {
    let docs = await collection.find(filter);
    return {
      sort(sortObj) {
        if (sortObj) {
          const key = Object.keys(sortObj)[0];
          const dir = sortObj[key] === -1 ? -1 : 1;
          docs.sort((a, b) => {
            if (a[key] < b[key]) return -dir;
            if (a[key] > b[key]) return dir;
            return 0;
          });
        }
        return docs;
      },
      skip(n) {
        return docs.slice(n);
      },
      limit(n) {
        return docs.slice(0, n);
      },
      then(resolve) { resolve(docs); },
      catch() { return this; }
    };
  };

  Model.findOne = async function (filter = {}) {
    return await collection.findOne(filter) || null;
  };

  Model.findById = async function (id) {
    if (!id) return null;
    return await collection.findOne({ _id: id }) || null;
  };

  Model.findByIdAndUpdate = async function (id, data, opts = {}) {
    const doc = await collection.findOne({ _id: id });
    if (!doc) return null;
    delete data._id;
    await collection.update({ _id: id }, { $set: data });
    if (opts.new) {
      return await collection.findOne({ _id: id });
    }
    return doc;
  };

  Model.findByIdAndDelete = async function (id) {
    const doc = await collection.findOne({ _id: id });
    if (doc) await collection.remove({ _id: id });
    return doc || null;
  };

  Model.insertMany = async function (docs) {
    const inserted = [];
    for (const doc of docs) {
      const d = await collection.insert({ ...doc, createdAt: new Date(), updatedAt: new Date() });
      inserted.push(d);
    }
    return inserted;
  };

  Model.deleteMany = async function (filter = {}) {
    const count = await collection.count(filter);
    await collection.remove(filter, { multi: true });
    return { deletedCount: count };
  };

  Model.countDocuments = async function (filter = {}) {
    return await collection.count(filter);
  };

  Model.prototype.save = async function () {
    if (this._id) {
      const data = { ...this };
      delete data._id;
      await collection.update({ _id: this._id }, { $set: data });
      const updated = await collection.findOne({ _id: this._id });
      Object.assign(this, updated);
    } else {
      const doc = await collection.insert({ ...this, createdAt: new Date(), updatedAt: new Date() });
      Object.assign(this, doc);
    }
    return this;
  };

  // Create instance
  Model.create = function (data) {
    const instance = new Model(data);
    return instance.save();
  };

  return Model;
}

// Create all models
const Dish = createModel('Dish', collections.dishes);
const Drink = createModel('Drink', collections.drinks);
const User = createModel('User', collections.users);
const Reservation = createModel('Reservation', collections.reservations);
const Table = createModel('Table', collections.tables);
const Award = createModel('Award', collections.awards);
const Review = createModel('Review', collections.reviews);

// Seed data
const seedData = require('./seedData.js');

async function seedDatabase() {
  const counts = {
    dishes: await collections.dishes.count({}),
    drinks: await collections.drinks.count({}),
    tables: await collections.tables.count({}),
    awards: await collections.awards.count({}),
    reviews: await collections.reviews.count({}),
    users: await collections.users.count({}),
  };

  if (counts.dishes === 0 && seedData.dishes) {
    await Dish.insertMany(seedData.dishes);
    console.log(`  Seeded ${seedData.dishes.length} dishes`);
  }
  if (counts.drinks === 0 && seedData.drinks) {
    await Drink.insertMany(seedData.drinks);
    console.log(`  Seeded ${seedData.drinks.length} drinks`);
  }
  if (counts.tables === 0 && seedData.tables) {
    await Table.insertMany(seedData.tables);
    console.log(`  Seeded ${seedData.tables.length} tables`);
  }
  if (counts.awards === 0 && seedData.awards) {
    await Award.insertMany(seedData.awards);
    console.log(`  Seeded ${seedData.awards.length} awards`);
  }
  if (counts.reviews === 0 && seedData.reviews) {
    await Review.insertMany(seedData.reviews);
    console.log(`  Seeded ${seedData.reviews.length} reviews`);
  }
  if (counts.users === 0 && seedData.adminUser) {
    await User.create(seedData.adminUser);
    console.log('  Created admin user: admin@renorth.com');
  }
}

module.exports = {
  Dish, Drink, User, Reservation, Table, Award, Review,
  collections,
  seedDatabase
};
