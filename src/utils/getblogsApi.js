const { RESTDataSource } = require("@apollo/datasource-rest");

class GetBlogsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3456/api/";
  }

  async getAllEntries(param) {
    const pageIndex = param.page - 1;
    const size = param.size;
    let url = `blogs?_p=${pageIndex}&_size=${size}`
    const response = await this.get(url);
    return response
  }

  async getEntryById(id) {
    const response = await this.get(`blogs/${id}`);
    return response[0];
  }
}

module.exports = GetBlogsApi;
