<img width="1386" alt="image" src="https://github.com/inaruml/backendProjects/assets/54745005/c381b076-8a5d-4670-adb2-ac043bed44cb"># Assignment

The application should allow users to manage items in the shopping list (add, mark as already purchased). Each shopping list always has its owner, i.e. the user who creates the shopping list in the application. Subsequently, the user can also invite other users who can use the shopping list.

# Task 1

- Create an application using a stack based on Node.js and Express.js. This application will contain
identified end-points
- Validation of input data of individual end-points
- Authorization of end-points against application profiles
- Individual end-points will return received input data and error information in the output data 

# Task 2

- Fully implement the functionality of the designed end-points of the API
- Save the environment export from Insomnia in the folder with the project, which will contain the definition of the end-points created by you
- There should be an endpoint for:
  - providing a list of all shopping lists (e.g. shoppingList/list)
  - return a single shopping list (eg shoppingList/get)
  - create a shopping list (e.g. shoppingList/create)
  - delete a shopping list (e.g. shoppingList/delete)
  - editing a shopping list (e.g. shoppingList/update)

Along the mandatory endpoints I have also created endpoints for a list item in a shopping list. We can create, delete and "check off" an individual item in a shopping list. 

The result of the project should be fully implemented endpoints that can be initiated via a an environment like Insomnia or Postman.

Endpoint shoppingList/create:

<img width="1386" alt="image" src="https://github.com/inaruml/frontendProjects/assets/54745005/826f8041-86da-4087-8f8d-e18b24a07ea9">

Endpoint shoppingList/list:

<img width="1386" alt="image" src="https://github.com/inaruml/frontendProjects/assets/54745005/e1eabd72-d0b5-483e-afd2-61995a74915e">

Endpoint shoppingList/update:

<img width="1390" alt="image" src="https://github.com/inaruml/frontendProjects/assets/54745005/76b20046-2a0e-4338-a356-551519df2f41">

Endpoint shoppingList/listItem/create:

<img width="1384" alt="image" src="https://github.com/inaruml/backendProjects/assets/54745005/ed37953e-b28f-47fc-b0a5-90746ce3e81f">

These are the endpoints I chose to showcase :-)


# Development and Usage

See following guidelines:

- [uuAppg01Devkit Documentation](https://uuapp.plus4u.net/uu-bookkit-maing01/e884539c8511447a977c7ff070e7f2cf/book)
- [uuSubApp Instance Descriptor](https://uuapp.plus4u.net/uu-bookkit-maing01/289fcd2e11d34f3e9b2184bedb236ded/book/page?code=uuSubAppInstanceDescriptor)
- [uuApp Server Project (NodeJs)](https://uuapp.plus4u.net/uu-bookkit-maing01/2590bf997d264d959b9d6a88ee1d0ff5/book/page?code=getStarted)
- [uuApp Client Project (UU5)](https://uuapp.plus4u.net/uu-bookkit-maing01/ed11ec379073476db0aa295ad6c00178/book/page?code=getStartedHooks)
