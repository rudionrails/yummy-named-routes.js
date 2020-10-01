function createRoute(route) {
  const routeFn = (params = {}) =>
    Object.entries(params).reduce(
      (acc, [key, value]) => acc.replace(new RegExp(`:${key}`, 'g'), value),
      route,
    );
  routeFn.getType = route;

  return routeFn;
}

const createRoutes = routes =>
  Object.entries(routes).reduce(
    (acc, [key, value]) => ({...acc, [`${key}Path`]: createRoute(value)}),
    {},
  );

module.exports = {createRoutes};
