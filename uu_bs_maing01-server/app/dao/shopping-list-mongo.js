// DAO vrstva

"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ShoppingListMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  } // Indexes

  // -------------------------------------------------------------------------------

  async list(awid, pageInfo) {
    const filter = { awid };

    return await super.find(filter, pageInfo); // Method mongoDB
  }
  // -------------------------------------------------------------------------------

  async create(shoppingList) {
    return await super.insertOne(shoppingList);
  }
  // -------------------------------------------------------------------------------

  async delete(awid, id) {
    // I can name the parameters however, data comes from dtoIn from ABL
    await super.deleteOne({ awid, id });
  }
  // -------------------------------------------------------------------------------

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  // -------------------------------------------------------------------------------

  async update(awid, shoppingList) {
    let filter = { id: shoppingList.id, awid: awid };

    return await super.findOneAndUpdate(filter, shoppingList, "NONE");
  }
}

module.exports = ShoppingListMongo;
