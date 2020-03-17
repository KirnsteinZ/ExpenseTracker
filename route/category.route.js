const controller = require('../controller/category.controller');
const parentRoute = '/category';

const routes = (app) => {
    app.get(parentRoute ,controller.findAll);
    app.put(parentRoute,controller.create);
    app.post(parentRoute,controller.update);
    app.delete(parentRoute,controller.remove);
}

module.exports = routes;