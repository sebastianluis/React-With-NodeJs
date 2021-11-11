import http from "../http-common";

class ProductTypeDataService {
  getAll() {
    return http.get("/types", { });
  }
}

export default new ProductTypeDataService();
