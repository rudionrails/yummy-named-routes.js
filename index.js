function createRoute(route) {
  const routeFn = (params = {}) =>
    Object.entries(params).reduce(
      (acc, [key, value]) => acc.replace(new RegExp(`:${key}`, "g"), value),
      route
    );
  routeFn.getType = route;

  return routeFn;
}

function createRoutes(objectOrFn) {
  const routes =
    typeof objectOrFn === "function" ? objectOrFn(createRoute) : objectOrFn;

  return Object.entries(routes).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`${key}Path`]: typeof value === "function" ? value : createRoute(value)
    }),
    {}
  );
}

module.exports = { createRoute, createRoutes };
