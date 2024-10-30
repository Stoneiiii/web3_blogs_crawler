const resolvers = {
  Query: {
    getAllEntries: (_, { page=1, size=10 }, { dataSources }) =>
      dataSources.getBlogsApi.getAllEntries({ page, size}),
    getEntryById: (_, { id }, { dataSources }) =>
      dataSources.getBlogsApi.getEntryById(id),
  },
};

module.exports = resolvers;
