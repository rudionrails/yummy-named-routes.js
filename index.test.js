const test = require('ava');

const {createRoutes} = require('./index');

test('to be an object', t => {
  const routes = createRoutes({});
  t.is('object', typeof routes);
});

test('to set copmuted property (set getType)', t => {
  const routes = createRoutes({tasks: '/tasks/:id'});

  t.is('/tasks/:id', routes.tasksPath.getType);
});

test('to return tasksRoute => /tasks', t => {
  const routes = createRoutes({tasks: '/tasks'});
  t.is('/tasks', routes.tasksPath());
});

test('to return taskPath => /tasks/:id', t => {
  const routes = createRoutes({task: '/tasks/:id'});
  t.is('/tasks/123', routes.taskPath({id: '123'}));
});

test('to return peopleTaskPath => people/:id/tasks/:taskId', t => {
  const routes = createRoutes({peopleTask: '/people/:personId/tasks/:id'});
  t.is(
    '/people/abc/tasks/123',
    routes.peopleTaskPath({id: '123', personId: 'abc'}),
  );
});
