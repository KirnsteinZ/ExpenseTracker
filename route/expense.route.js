const expenseController = require('../controller/expense.controller');
const parentRoute = '/expense';

const routes = (app) => {
    app.get(parentRoute ,expenseController.findAll);
    app.put(parentRoute,expenseController.create);
    app.post(parentRoute,expenseController.update);
    app.delete(parentRoute,expenseController.remove);
}

module.exports = routes;