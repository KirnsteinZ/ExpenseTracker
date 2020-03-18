const { buildSchema } = require('graphql');
const expressGraphql = require('express-graphql');

const parentRoute = '/tag';

const schema = buildSchema(`
input TagInput {
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
    time: String,
    createdAt: String,
    updatedAt: String
},
type Query {
    get: [Tag]
}
type Mutation {
    create(input: TagInput): Tag,
    update(input: TagInput): Tag,
    delete(id: String): Tag
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