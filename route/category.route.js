const { buildSchema } = require('graphql');
const expressGraphql = require('express-graphql');

const parentRoute = '/category';

const schema = buildSchema(`
input CategoryInput {
    id: String,
    name: String,
    desc: String
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
    tag: [Tag],
    category: Category,
    out: Boolean,
    desc: String,
    time: Int,
    createdAt: String,
    updatedAt: String
},
type Query {
    get: [Category],
    getById(id: String): Category
}
type Mutation {
    create(input: CategoryInput): Category,
    update(input: CategoryInput): Category,
    delete(id: String): Category
}
`); 

const routes = (app,controller) => {
    const root = {
        get: async () => await controller.graphqlRead(),
        getById: async id => await controller.graphqlGetById(id),
        create: async input =>await controller.graphqlCreate(input.input),
        update: async input => await controller.graphqlUpdate(input.input),
        delete: async id => await controller.graphqlDelete(id)
    }
    app.get(parentRoute ,controller.findAll);
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