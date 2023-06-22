"use strict";

const BsMainUseCaseError = require("./bs-main-use-case-error");

// Errors for each endpoint
const List = {
  UC_CODE: `${BsMainUseCaseError.ERROR_PREFIX}shoppingList/list`,

  // Invalid dtoIn
  invalidDtoIn: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}/invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  // Shopping List Dao failed
  ShoppingListDaoListFailed: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}/ShoppingListDaoListFailed`;
      this.message = `ShoppingList Dao list failed`;
    }
  },
};

const Create = {
  UC_CODE: `${BsMainUseCaseError.ERROR_PREFIX}shoppingList/create`,

  invalidDtoIn: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}/invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  // Method DAO create failed
  ShoppingListDaoCreateFailed: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}/ShoppingListDaoCreateFailed`;
      this.message = `ShoppingList Dao create failed`;
    }
  },
};

const Delete = {
  UC_CODE: `${BsMainUseCaseError.ERROR_PREFIX}shoppingList/delete`,

  invalidDtoIn: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}/invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  // Shopping list does not exist
  shoppingListDoesNotExist: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}/shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  }, // Method DAO delete failed
  ShoppingListDaoDeleteFailed: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}/ShoppingListDaoDeleteFailed`;
      this.message = "Shopping list Dao Delete failed.";
    }
  },
};

const Get = {
  UC_CODE: `${BsMainUseCaseError.ERROR_PREFIX}shoppingList/get`,

  invalidDtoIn: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}/invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },

  shoppingListDoesNotExist: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}/shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },
  // DAO method get failed

  ShoppingListDaoGetFailed: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}/ShoppingListDaoGetFailed`;
      this.message = `ShoppingList Dao Get failed`;
    }
  },
};

const Update = {
  UC_CODE: `${BsMainUseCaseError.ERROR_PREFIX}shoppingList/update`,

  invalidDtoIn: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}/invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  shoppingListDoesNotExist: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}/shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },

  ShoppingListDaoUpdateFailed: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}/ShoppingListDaoUpdateFailed`;
      this.message = `ShoppingList Dao Update failed.`;
    }
  },




  
};

//-------------- List Item Errors -----------------

const CreateItem = {
  UC_CODE: `${BsMainUseCaseError.ERROR_PREFIX}shoppingList/listItem/create`,

  invalidDtoIn: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateItem.UC_CODE}/invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
};

const DeleteItem = {
  UC_CODE: `${BsMainUseCaseError.ERROR_PREFIX}shoppingList/listItem/delete`,

  invalidDtoIn: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteItem.UC_CODE}/invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
};

const CheckItem = {
  UC_CODE: `${BsMainUseCaseError.ERROR_PREFIX}shoppingList/listItem/check`,

  invalidDtoIn: class extends BsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CheckItem.UC_CODE}/invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
};


module.exports = {
  List,
  Create,
  Delete,
  Get,
  Update,
  CreateItem,
  DeleteItem,
  CheckItem,
};
