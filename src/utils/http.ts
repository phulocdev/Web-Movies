import axios, { AxiosInstance } from 'axios'
import config from '~/constants/config'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10 * 1000
    })
  }
}

class HttpFilter {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrlFilter,
      timeout: 10 * 1000
    })
  }
}

const http = new Http().instance
const httpFilter = new HttpFilter().instance
export { http, httpFilter }
