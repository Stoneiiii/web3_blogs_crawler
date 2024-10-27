const resolvers = {
  Query: {
    getAllEntries: (_, __, { dataSources }) =>
      dataSources.getBlogsApi.getAllEntries(),
    getEntryById: (_, { id }, { dataSources }) =>
      dataSources.getBlogsApi.getEntryById(id),
  },
};

module.exports = resolvers;
