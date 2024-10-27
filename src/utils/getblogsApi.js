const { RESTDataSource } = require("@apollo/datasource-rest");

class GetBlogsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3456/api/";
  }

  async getAllEntries() {
    return this.get("blogs");
  }

  async getEntryById(id) {
    const response = await this.get(`blogs/${id}`);
    return response[0];
  }
}

module.exports = GetBlogsApi;
