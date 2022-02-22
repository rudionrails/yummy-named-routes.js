import { createRoutes } from "./index";

test("to be an awesome object", () => {
  const routes = createRoutes({});
  expect(typeof routes).toEqual("object");
});

test("to accept objectand return routes", () => {
  const routes = createRoutes({ tasks: "/tasks", people: "/people" });

  expect(routes.tasksRoute()).toEqual("/tasks");
  expect(routes.peopleRoute()).toEqual("/people");
});

test("to accept function and return routes", () => {
  const routes = createRoutes((route) => ({
    tasks: route("/tasks"),
    people: route("/people"),
  }));

  expect(routes.tasksRoute()).toEqual("/tasks");
  expect(routes.peopleRoute()).toEqual("/people");
});

test("to set pattern property", () => {
  const routes = createRoutes({ tasks: "/tasks/:id" });
  expect(routes.tasksRoute.pattern).toEqual("/tasks/:id");
});

test("to set toString property", () => {
  const routes = createRoutes({ tasks: "/tasks/:id" });

  expect(routes.tasksRoute.toString()).toEqual("/tasks/:id");
  expect(`${routes.tasksRoute}`).toEqual("/tasks/:id");
});

test("to return computed property", () => {
  const routes = createRoutes({ tasks: "/tasks/:id" });

  expect({ [routes.tasksRoute as any]: true }).toEqual({ "/tasks/:id": true });
});

test("to return route with params /tasks/:id", () => {
  const routes = createRoutes({ task: "/tasks/:id" });

  expect(routes.taskRoute({ id: "123" })).toEqual("/tasks/123");
});

test("to return nested route, e.g. people/:personId/tasks/:id", () => {
  const routes = createRoutes({ peopleTask: "/people/:personId/tasks/:id" });

  expect(routes.peopleTaskRoute({ id: "123", personId: "abc" })).toEqual(
    "/people/abc/tasks/123",
  );
});

test("to return route with query string, e.g. tasks/:id?foo=bar", () => {
  const routes = createRoutes({ task: "/tasks/:id" });

  expect(routes.taskRoute({ id: "123", foo: "bar" })).toEqual(
    "/tasks/123?foo=bar",
  );
});
