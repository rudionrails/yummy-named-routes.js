const test = require("ava");

const { createRoutes } = require("./index");

test("to be an awesome object", (t) => {
  const routes = createRoutes({});
  t.is("object", typeof routes);
});

test("to accept objectand return routes", (t) => {
  const routes = createRoutes({ tasks: "/tasks", people: "/people" });

  t.is("/tasks", routes.tasksPath());
  t.is("/people", routes.peoplePath());
});

test("to accept function and return routes", (t) => {
  const routes = createRoutes((route) => ({
    tasks: route("/tasks"),
    people: route("/people"),
  }));

  t.is("/tasks", routes.tasksPath());
  t.is("/people", routes.peoplePath());
});

test("to set pattern property", (t) => {
  const routes = createRoutes({ tasks: "/tasks/:id" });
  t.is("/tasks/:id", routes.tasksPath.pattern);
});

test("to set getType property", (t) => {
  const routes = createRoutes({ tasks: "/tasks/:id" });
  t.is("/tasks/:id", routes.tasksPath.getType());
  t.deepEqual({ "/tasks/:id": true }, { [routes.tasksPath]: true });
});

test("to set toString property", (t) => {
  const routes = createRoutes({ tasks: "/tasks/:id" });
  t.is("/tasks/:id", routes.tasksPath.toString());
  t.is("/tasks/:id", `${routes.tasksPath}`);
});

test("to return route with params /tasks/:id", (t) => {
  const routes = createRoutes({ task: "/tasks/:id" });
  t.is("/tasks/123", routes.taskPath({ id: "123" }));
});

test("to return nested route, e.g. people/:personId/tasks/:id", (t) => {
  const routes = createRoutes({ peopleTask: "/people/:personId/tasks/:id" });
  t.is(
    "/people/abc/tasks/123",
    routes.peopleTaskPath({ id: "123", personId: "abc" })
  );
});

test("to return route with query string, e.g. tasks/:id?foo=bar", (t) => {
  const routes = createRoutes({ task: "/tasks/:id" });
  t.is("/tasks/123?foo=bar", routes.taskPath({ id: "123", foo: "bar" }));
});
