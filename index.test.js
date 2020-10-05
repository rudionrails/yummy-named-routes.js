const test = require("ava");

const { createRoutes } = require("./index");

test("to be an object", t => {
  const routes = createRoutes({});
  t.is("object", typeof routes);
});

test("to accept object and return routes", t => {
  const routes = createRoutes({ tasks: "/tasks", people: "/people" });

  t.is("/tasks", routes.tasksPath());
  t.is("/people", routes.peoplePath());
});

test("to accept function and return routes", t => {
  const routes = createRoutes(route => ({
    tasks: route("/tasks"),
    people: route("/people")
  }));

  t.is("/tasks", routes.tasksPath());
  t.is("/people", routes.peoplePath());
});

test("to return route with params /tasks/:id", t => {
  const routes = createRoutes({ task: "/tasks/:id" });
  t.is("/tasks/123", routes.taskPath({ id: "123" }));
});

test("to return nested route, e.g. people/:id/tasks/:taskId", t => {
  const routes = createRoutes({ peopleTask: "/people/:personId/tasks/:id" });
  t.is(
    "/people/abc/tasks/123",
    routes.peopleTaskPath({ id: "123", personId: "abc" })
  );
});

test("to set computed property (set getType)", t => {
  const routes = createRoutes({ tasks: "/tasks/:id" });

  t.is("/tasks/:id", routes.tasksPath.getType);
});
