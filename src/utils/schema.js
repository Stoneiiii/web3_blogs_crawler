const typeDefs = `#graphql
  type blogs {
    id: ID!
    description: String
    time: String
    title: String
    url: String
    articlebody: String
  }

  type Query {
    getAllEntries(page: Int, size: Int): [blogs]
    getEntryById(id: ID!): blogs
  }
`;

module.exports = typeDefs;
