const { Validator } = require("uu_appg01_server").Validation; // Functions of validation schemas
const { ValidationHelper } = require("uu_appg01_server").AppServer; // Functions of validation schemas
const Errors = require("../api/errors/shopping-list-error.js"); // Functions of errors
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore; // Functions of DAO vrstvy and db

const ObjectID = require("bson").ObjectID; // Function of generating an ID

// Unsupported Keys (if a key in an object is not right)
const WARNINGS = {
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },

  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },

  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },

  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },

  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },

  // ------------ List Item Warnings -----------
  createItemUnsupportedKeys: {
    code: `${Errors.CreateItem.UC_CODE}unsupportedKeys`,
  },
  deleteItemUnsupportedKeys: {
    code: `${Errors.DeleteItem.UC_CODE}unsupportedKeys`,
  },

  checkItemUnsupportedKeys: {
    code: `${Errors.CheckItem.UC_CODE}unsupportedKeys`,
  },
};

// ABL
class ShoppingListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("shoppingList"); // DAO vrstva
  }

  // -------------------------------------------------------------------------------

  async list(awid, dtoIn) {
    const DEFAULTS = {
      pageIndex: 0,
      pageSize: 100,
    };

    let validationResult = this.validator.validate("listDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.invalidDtoIn
    );

    // Conditions that take the dtoIn values or the default values
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {}; // tells me its an object
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize; // if there's no dtoIn, then take default
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    // Declaration must be beforehand
    let list;

    // Logic of trying to fetch the list of shopping lists.. if smth fails, throws error
    try {
      // Try to fetch the list of shopping lists

      list = await this.dao.list(awid, dtoIn.pageInfo);
    } catch (error) {
      // Error if mongoDb method fails
      if (error instanceof ObjectStoreError) {
        throw new Errors.List.ShoppingListDaoListFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    // Returns

    const dtoOut = {
      ...list,
      uuAppErrorMap,
    };

    return dtoOut;
  }
  // -------------------------------------------------------------------------------
  async create(awid, dtoIn, identity) {
    let validationResult = this.validator.validate("createDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

    // Declaration of dtoOut object
    let dtoOut;

    // Declaration of object which will go to db
    let shoppingList = {
      awid: awid,
      name: dtoIn.name,
      description: dtoIn.description,
      author: identity,
      members: [],
      items: [],
    };

    try {
      // Same thing as previous endpoint
      dtoOut = await this.dao.create(shoppingList);
    } catch (error) {
      // Same thing as previous endpoint
      if (error instanceof ObjectStoreError) {
        throw new Errors.Create.ShoppingListDaoCreateFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  // -------------------------------------------------------------------------------

  async delete(awid, dtoIn) {
    // Validation of dtoIn
    let validationResult = this.validator.validate("deleteDtoInType", dtoIn);

    // Errors
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.invalidDtoIn
    );

    let shoppingList;

    try {
      // Try to fetch list from db
      shoppingList = await this.dao.get(awid, dtoIn.id);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Get.ShoppingListDaoGetFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    // If you cannot find list => error

    if (!shoppingList) {
      throw new Errors.Delete.shoppingListDoesNotExist(uuAppErrorMap, { shoppingListId: dtoIn.id });
    }

    try {
      // Try to delete list
      await this.dao.delete(awid, dtoIn.id);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Delete.ShoppingListDaoDeleteFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    // Return only error map
    let dtoOut = { uuAppErrorMap };

    return dtoOut;
  }

  // -------------------------------------------------------------------------------

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("getDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.invalidDtoIn
    );

    let shoppingList;

    try {
      // Try to fetch shopping list

      shoppingList = await this.dao.get(awid, dtoIn.id);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Get.ShoppingListDaoGetFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    // If I do not find the list => error
    if (!shoppingList) {
      throw new Errors.Get.shoppingListDoesNotExist(uuAppErrorMap, { shoppingListId: dtoIn.id });
    }

    // Declaration of final dtoOut object
    const dtoOut = { ...shoppingList, uuAppErrorMap };

    return dtoOut;
  }

  // -------------------------------------------------------------------------------

  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("updateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.invalidDtoIn
    );

    let shoppingList;

    // Logic of trying to get the shopping list. If smth fails => error
    try {
      // Try to get shopping list
      shoppingList = await this.dao.get(awid, dtoIn.id);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Get.ShoppingListDaoGetFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    // If I don't find shopping list => error
    if (!shoppingList) {
      throw new Errors.Get.shoppingListDoesNotExist(uuAppErrorMap, { shoppingListId: dtoIn.id });
    }

    // Logic of trying to update shopping list. If smth fails => error
    try {
      // Try to update shopping list
      shoppingList = await this.dao.update(awid, dtoIn);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Update.ShoppingListDaoUpdateFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    let dtoOut = { ...shoppingList, uuAppErrorMap };

    return dtoOut;
  }
  // ----------------------------------- List Item ABL -------------------------------------------

  async createItem(awid, dtoIn) {
    let validationResult = this.validator.validate("createItemDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createItemUnsupportedKeys.code,
      Errors.CreateItem.invalidDtoIn
    );

    // Declaration of List Item object in which we generate an ID for each list item

    let shoppingListItem = {
      id: new ObjectID(),
      name: dtoIn.name,
      checked: false,
    };

    // Declaration of objects for the shopping list we want to add list items to
    // Second object is for the final shopping list with pushed list items
    let shoppingList;
    let updatedShoppingList;

    // GET method for shopping list
    try {
      // Try to fetch shopping list

      shoppingList = await this.dao.get(awid, dtoIn.shoppingListId);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Get.ShoppingListDaoGetFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    // If I do not find the list => error
    if (!shoppingList) {
      throw new Errors.Get.shoppingListDoesNotExist(uuAppErrorMap, { shoppingListId: dtoIn.shoppingListId });
    }

    // Push list item object into array of items in shopping list

    shoppingList.items.push(shoppingListItem);

    // UPDATE method for shopping list

    // Logic of trying to update shopping list. If smth fails => error
    try {
      // Try to update shopping list with second constant
      updatedShoppingList = await this.dao.update(awid, shoppingList);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Update.ShoppingListDaoUpdateFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    // Return updated shopping list
    let dtoOut = { updatedShoppingList, uuAppErrorMap };

    return dtoOut;
  }

  // -------------------------------------------------------------------------------

  async deleteItem(awid, dtoIn) {
    let validationResult = this.validator.validate("deleteItemDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteItemUnsupportedKeys.code,
      Errors.DeleteItem.invalidDtoIn
    );

    let shoppingList;
    let updatedShoppingList;

    try {
      // Try to fetch shopping list

      shoppingList = await this.dao.get(awid, dtoIn.shoppingListId);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Get.ShoppingListDaoGetFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    // If I do not find the list => error
    if (!shoppingList) {
      throw new Errors.Get.shoppingListDoesNotExist(uuAppErrorMap, { shoppingListId: dtoIn.shoppingListId });
    }

    // For cycle that iterates through the array of items
    // If the ID fits the wanted ID, we delete it from array using method splice

    for (let i = 0; i < shoppingList.items.length; i++) {
      if (shoppingList.items[i].id == dtoIn.shoppingListItemId) {
        shoppingList.items.splice(i, 1);
      }
    }

    // Logic of trying to update shopping list. If smth fails => error
    try {
      // Try to update shopping list with second constant
      updatedShoppingList = await this.dao.update(awid, shoppingList);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Update.ShoppingListDaoUpdateFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    let dtoOut = { updatedShoppingList, uuAppErrorMap };

    return dtoOut;
  }
  // -------------------------------------------------------------------------------

  async checkItem(awid, dtoIn) {
    let validationResult = this.validator.validate("checkItemDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.checkItemUnsupportedKeys.code,
      Errors.CheckItem.invalidDtoIn
    );

    let shoppingList;
    let updatedShoppingList;

    try {
      // Try to fetch shopping list

      shoppingList = await this.dao.get(awid, dtoIn.shoppingListId);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Get.ShoppingListDaoGetFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    // If I do not find the list => error
    if (!shoppingList) {
      throw new Errors.Get.shoppingListDoesNotExist(uuAppErrorMap, { shoppingListId: dtoIn.shoppingListId });
    }

    // For cycle that iterates through the array of items
    // If the ID fits the wanted ID, we turn the checked boolean to the opposite

    for (let i = 0; i < shoppingList.items.length; i++) {
      if (shoppingList.items[i].id == dtoIn.shoppingListItemId) {
        shoppingList.items[i].checked = !shoppingList.items[i].checked;
      }
    }

    // Logic of trying to update shopping list. If smth fails => error
    try {
      // Try to update shopping list with second constant
      updatedShoppingList = await this.dao.update(awid, shoppingList);
    } catch (error) {
      if (error instanceof ObjectStoreError) {
        throw new Errors.Update.ShoppingListDaoUpdateFailed({ uuAppErrorMap }, error);
      }

      throw error;
    }

    let dtoOut = { updatedShoppingList, uuAppErrorMap };

    return dtoOut;
  }
}

module.exports = new ShoppingListAbl();
