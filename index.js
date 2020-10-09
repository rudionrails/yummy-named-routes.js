function createRoute(pattern) {
  const route = (params = {}) =>
    Object.entries(params).reduce(
      (acc, [key, value]) => acc.replace(new RegExp(`:${key}`, "g"), value),
      pattern
    );

  route.pattern = pattern;
  route.getType = () => pattern;
  route.toString = () => pattern;

  return route;
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
