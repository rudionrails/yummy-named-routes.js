# A yummy named-routes library

## Usage

The library is simple javascript and not dependent on any framework:

```javascript
import { createRoute } from "@yummy/named-routes";

/*
 * Define the route and use the `:` prefix to have inline parameters.
 */
const userRoute = createRoute("/users/:id");

/*
 * Calling the function will replace parameters inside the path and
 * append others as query string.
 */
userRoute({ id: "123" }); // => "/users/123"
userRoute({ id: "123", foo: "bar" }); // => "/users/123?foo=bar"

/*
 * You can access the initially passed pattern in multiple ways
 */
const pattern = userRoute.pattern; // => "/users/:id"
const routes = { [userRoute]: true } // => { "/users/:id": true }
const text = `The pattern is "${userRoute}"`; // => The pattern is "/users/:id"

```

Define your routes. The below example could be in your `src/routes.js` and may use a framework, such as React, Vue, Angular, etc:

```javascript
import { createRoutes, createRoute } from "@yummy/named-routes";

// wherever you keep the page/view components
import TaskPage from "./src/pages/TaskPage";
import TasksPage from "./src/pages/TasksPage";

// Use the `createRoutes` helper to define multiple paths at once. The keys
// are used and the "Route" suffix is added.
export const { tasksRoute } = createRoutes({
  tasks: "/users/:userId/tasks/:id",
});

// or define every route individually with `createRoute`
export const myTaskRoute = createRoute("/tasks/:id");

export default {
  [tasksRoute]: TasksPage,
  [myTaskRoute]: TaskPage,
}

```

Now use a route in a component. The example uses React, but this could be any framework:

```javascript
import React from "react";

import { myTaskRoute } from "src/routes.js";

function List() {
  return (
    <div>
      <a href={myTaskRoute({ id: "123" })}>Task 123</a>
      <a href={myTaskRoute({ id: "987", foo: "bar })}>Task 987 with query string</a>
    </div>
  )
}

```
