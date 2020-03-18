const { buildSchema } = require('graphql');
const expressGraphql = require('express-graphql');

const parentRoute = '/expense';

const schema = buildSchema(`
input CategoryInput {
    id: String,
    name: String,
    desc: String
},
input TagInput {
    id: String,
    name: String,
    desc: String
},
input ExpenseInput {
    id: String,
    name: String,
    total: Int,
    tag: [TagInput],
    category: CategoryInput,
    out: Boolean,
    desc: String,
    time: Int
},
type Category {
    _id: String,
    name: String,
    desc: String,
    createdAt: String,
    updatedAt: String
},
type Tag {
    _id: String,
    name: String,
    desc: String,
    createdAt: String,
    updatedAt: String
},
type Expense {
    _id: String,
    name: String,
    total: Int,
    tag: [Tag],
    category: Category,
    out: Boolean,
    desc: String,
    time: String,
    createdAt: String,
    updatedAt: String
},
type Query {
    get: [Expense]
}
type Mutation {
    create(input: ExpenseInput): Expense,
    update(input: ExpenseInput): Expense,
    delete(id: String): Expense
}
`); 

const routes = (app,controller) => {
    const root = {
        get: async () => await controller.graphqlRead(),
        getById: async id => await controller.graphqlGetById(id.id),
        create: async input =>await controller.graphqlCreate(input.input),
        update: async input => await controller.graphqlUpdate(input.input),
        delete: async id => await controller.graphqlDelete(id.id)
    }
    app.get(parentRoute ,controller.findAll);
    app.get(parentRoute + '/today', controller.findToday)
    app.get(parentRoute + '/count', controller.countToday)
    app.put(parentRoute,controller.create);
    app.post(parentRoute,controller.update);
    app.delete(parentRoute,controller.remove);
    app.use(parentRoute + '/graphql',expressGraphql({
        schema,
        rootValue: root,
        graphiql: true
    }));
}

module.exports = routes;