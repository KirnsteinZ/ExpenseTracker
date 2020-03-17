const controller = require('../controller/tag.controller');
const parentRoute = '/tag';

const routes = (app) => {
    app.get(parentRoute ,controller.findAll);
    app.put(parentRoute,controller.create);
    app.post(parentRoute,controller.update);
    app.delete(parentRoute,controller.remove);
}

module.exports = routes;