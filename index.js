const qs = require("query-string");

function createRoute(pattern) {
  function route(params = {}) {
    let path = pattern.repeat(1); // make a copy
    let search = "";

    Object.entries(params).forEach(([key, value]) => {
      const regexp = new RegExp(`:${key}`, "g");

      if (regexp.test(path)) {
        path = path.replace(regexp, value);
      } else {
        search = qs.stringify({ ...qs.parse(search), [key]: value });
      }
    });

    return search === "" ? path : `${path}?${search}`;
  }

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
      [`${key}Path`]: typeof value === "function" ? value : createRoute(value),
    }),
    {}
  );
}

module.exports = { createRoute, createRoutes };
