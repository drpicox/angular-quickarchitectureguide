Angular quick Architecture Guide
==========================

_Opinionated Angular quick architecture guide for teams by @drpicox_

If you are looking for an opinionated guide for conventions, structures, and patterns programming large and scalable Angular applications, then step right in. This guide is based in many of my developments and close teams experience wiht Angular.

The purpose of this style guide is to provide guidance on building Angular applications by showing patterns and conventions but, more importantly, do it in a quick way so you can start as soon as possible.

### Assumptions

You must be familiar with: 

- John Papa styleguide https://github.com/johnpapa/angular-styleguide

- Browserify XXXX

- drpx-id, drpx-transcludeto & ng-transclude XXXX

It will leverage in drpx-updateable XXXX to synchronize states/computed values.


Main architecture
-----------------

This is an example of main architecture by example:

```
- .jshintrc
- Gruntfile.js
- package.json
- src/
    - index.html
    - main.js
    - app/
        - index.js
        - ProductsRemoteUrlConfig.config.js
        - RouteExceptionHandler.run.js
    - app.products
        - index.js
    - app.products.components
        - index.js
        - ProductForm.directive.js
        - ProductForm.spec.js
        - ProductForm.tpl.html
        - ProductItem.directive.js
        - ProductItem.spec.js
        - ProductItem.tpl.html
        - ProductsList.directive.js
        - ProductsList.spec.js
        - ProductsList.tpl.html
    - app.products.routes
        - index.js
        - ProductsRoute.spec.js
        - ProductsRoute.config.js
        - ProductsRoute.tpl.html
        - ProductsProductIdRoute.spec.js
        - ProductsProductIdRoute.config.js
        - ProductsProductIdRoute.tpl.html
    - app.products.services
        - index.js
        - Product.factory.js
        - Product.spec.js
        - ProductsService.factory.js
        - ProductsService.spec.js
        - ProductsState.factory.js
        - ProductsState.spec.js
        - ProductsStorage.factory.js
        - ProductsStorage.spec.js
        - ProductsRemote.provider.js
        - ProductsRemote.spec.js
        - ProductsSummaryState.factory.js
        - ProductsSummaryState.spec.js
    - acme.pager
        - index.js
        - Pager.directive.js
        - Pager.spec.js
        - Pager.tpl.html
    - acme.onscrollbottom
        - index.js
        - OnScrollBottom.directive.js
    - acme.toggle
        - index.js
        - Toggle.directive.js
        - Toggle.spec.js
+ node_modules/
+ www/
```

### Notation

- app: Are from 2 to 4 lowercase letters describing your app. Example of names may be bko for backoffice, tw for twitter, ff for friendlyfire, ... It is used to prefix module names, directive names, and filter names of the same app.

- acme: Are from 2 to 4 lowercase letters describing your organization. Example of names are appl for apple, ms for microsoft, fx for fedex, ... It is used to prefix module, directive and filter names of parts that can be potentially shared between multiple apps.

- module.name: Modules name are in reversed domain mode. Names are in lower case separed by dots. In app the first part is the app name, the second is the kind of resource that it handles, and third kind of functionality. Resource name it should follow the XXXXX rules for creating namespaces.

- services: Module that have services. They are sepparated because they should have no dependency with any other package of the same resource.

- components: Module with a collection of directives. The controllers of directives may access to services. It has no access to routes.

- routes: Module that contains many routes. It defines the logic to load/show a certain screen in the viewport given the flow of the application. It can be configurations of ngRoute, ui-route, or any other mechanism.

- pseudo-extension index, config, run, factory, provider: It describes the exact type of component exported. Index is does the module definitions and exports the module string name, others are for each kind of angular module resource.

- Config: Some kind of specific configuration. Name should be capitalized. Each configuration should be done in a different file.

- Handler: A special kind of process which performs an action. Name should be capitalized. They usually make non-interactive tasks like activate an screensaver, coordinate changes between states, ...

- Route: A configuration for a route with its resolves and controller. The route name should have the url, each route part should be capitalized. For example, for /products/productId, the name should be ProductsProductIdRoute.config.js

- State: A specific service which holds data in memory and has a special method called $update which triggers an update event. Name should be in capitalized and end with State. State should be accessible without promises or callbacks. Is responsibility of any process which modifies the state to trigger the $update.

- Storage: A specific service which stores data in a persistent fashion of for device. Name should be capitalized and end with Storage. It uses promises in its access methods. It should work offline.

- Remote: A specific service which communicates with a remote API. Name should be capitalized and end with Remote. It uses promises. It may not work in offline.

- Service: A generic service which serves as an abstraction for synchronizing States, Storages and Remotes. Name should be capitalized and end with Service. It gives advanced mechanisms of obtaining data and many times work with promises. An example of method may try to get data from State, if not present get it from Storage, if not present retrieve it from Remote, and at the end, make sure that there is a copy in the State and in the Storage, and trigger the $update method.

- Function, Factory, ...: A specific function that it is provided through factory or provider. Name should start in lowerCase. 
