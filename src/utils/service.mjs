import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import app from '../../app.js';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import GetBlogsApi from './getblogsApi.js';


async function startServer() {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => {
        const { cache } = server;
        return {
          dataSources: {
            getBlogsApi: new GetBlogsApi({ cache }),
          },
        };
      },
    })
  );

  console.log("GraphQL endpoint set up successfully!");

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000`);
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});

