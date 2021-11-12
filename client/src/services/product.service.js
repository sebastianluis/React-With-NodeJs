import http from '../http-common'

class ProductDataService {
    getAll(params) {
        return http.get('/product', { params })
    }
    search(params, data) {
        return http.post('/product', { params, data })
    }
}

export default new ProductDataService()
