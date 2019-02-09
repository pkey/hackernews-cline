const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: () => 'Some info',
    feed: (root, args, context, info) => {
      return context.prisma.links();
    },
    link: (_, args, context, info) => {
      return context.prisma.link({
        id: args.id
      })
    }
  },
  Mutation: {
    post: (_, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
    updateLink: (_, args, context) => {
      return context.prisma.updateLink({
        id: args.id,
        url: args.url,
        description: args.description
      })
    },
    deleteLink: (_, args, context) => {
      return context.prisma.deleteLink({
        id: args.id
      })
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
