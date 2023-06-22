// Validation of dtoIn for each endpoint

const listDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const createDtoInType = shape({
  name: string(1, 50).isRequired(),
  description: string(1, 100).isRequired(),
  members: array(uuIdentity()).isRequired(),
});

const deleteDtoInType = shape({
  id: mongoId().isRequired(),
});

const getDtoInType = shape({
  id: mongoId().isRequired(),
});

const updateDtoInType = shape({
  id: mongoId().isRequired(),
  name: string(1, 50).isRequired(),
  description: string(1, 100).isRequired(),
  members: array(uuIdentity()).isRequired(),
});

//----------------- List items ----------------
const createItemDtoInType = shape({
  shoppingListId: mongoId().isRequired(),
  name: string(1, 40).isRequired(),
});

const deleteItemDtoInType = shape({
  shoppingListId: mongoId().isRequired(),
  shoppingListItemId: mongoId().isRequired(),
});

const checkItemDtoInType = shape({
  shoppingListId: mongoId().isRequired(),
  shoppingListItemId: mongoId().isRequired(),
});
