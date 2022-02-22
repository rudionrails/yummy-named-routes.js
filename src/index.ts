import * as qs from "query-string";

interface Route {
  (params?: object): string;

  readonly pattern: string;
  // getType(): string;
  toString(): string;
}

interface Routes {
  [key: string]: Route;
}

interface CreateRoute {
  (pattern: string): Route;
}

export const createRoute: CreateRoute = (pattern) => {
  function route(params: object = {}): string {
    let path: string = pattern.repeat(1); // make a copy
    let search = "";

    Object.entries(params).forEach(([key, value]: [string, string]): void => {
      const regexp = new RegExp(`:${key}`, "g");

      if (regexp.test(path)) {
        path = path.replace(regexp, value);
      } else {
        search = qs.stringify({ ...qs.parse(search), [key]: value });
      }
    });

    return search === "" ? path : `${path}?${search}`;
  }

  // route.getType = () => "number";
  route.toString = () => pattern;
  route.pattern = pattern;

  return route;
};

/*
 * @example Pass object
 *   const routes = createRoutes({
 *     task: "/tasks/:id",
 *     userTask: "/users/:userId/tasks/:id",
 *   });
 *
 *   const { task, userTask } = routes;
 *
 * @example Pass a function
 *   const routes = createRoutes((createRoute) => ({
 *     tasks: createRoute("/tasks"),
 *   }));
 *
 *   const { tasks } = routes;
 */
export function createRoutes(
  objectOrFn: object | ((fn: CreateRoute) => object),
): Routes {
  const routes: object =
    typeof objectOrFn === "function" ? objectOrFn(createRoute) : objectOrFn;

  return Object.entries(routes).reduce(
    (acc: object, [key, value]: [string, string | Route]): object => {
      const route: (o: object) => string =
        typeof value === "function" ? value : createRoute(value);

      return {
        ...acc,
        [`${key}Route`]: route,
      };
    },
    {},
  );
}
