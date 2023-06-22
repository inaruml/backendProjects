"use strict";

const ShoppingListAbl = require("../../abl/shopping-list-abl.js");

class ShoppingListController {
  list(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    let awid = ucEnv.getUri().getAwid();

    return ShoppingListAbl.list(awid, dtoIn);
  }
  // -------------------------------------------------------------------------------

  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    let awid = ucEnv.getUri().getAwid();

    let identity = ucEnv.getSession().getIdentity()._uuIdentity;

    return ShoppingListAbl.create(awid, dtoIn, identity);
  }
  // -------------------------------------------------------------------------------

  delete(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    let awid = ucEnv.getUri().getAwid();

    return ShoppingListAbl.delete(awid, dtoIn);
  }
  // -------------------------------------------------------------------------------

  get(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    let awid = ucEnv.getUri().getAwid();

    return ShoppingListAbl.get(awid, dtoIn);
  }
  // -------------------------------------------------------------------------------

  update(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    let awid = ucEnv.getUri().getAwid();

    return ShoppingListAbl.update(awid, dtoIn);
  }
  // ------------- List Item controller ------------------------------------------------------------------
  createItem(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    let awid = ucEnv.getUri().getAwid();

    return ShoppingListAbl.createItem(awid, dtoIn);
  }

  deleteItem(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    let awid = ucEnv.getUri().getAwid();

    return ShoppingListAbl.deleteItem(awid, dtoIn);
  }

  checkItem(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();

    let awid = ucEnv.getUri().getAwid();

    return ShoppingListAbl.checkItem(awid, dtoIn);
  }
}

module.exports = new ShoppingListController();
