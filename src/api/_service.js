import { Message } from 'element-ui'
import axios from 'axios'
import { get, isEmpty, merge } from 'lodash'
import util from "@/libs/util";
import qs from 'qs'
import router from '@/router'

class BusError extends Error {
  setResponse(res) {
    this.response = res
  }
}
function handleBusError(err) {
  Message({ message: err.message, type: 'error', duration: 5 * 1000 })
}

/**
 * @description 创建请求实例
 */
export function createService() {
  // 创建一个 axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    config => config,
    error => {
      // 发送失败
      return Promise.reject(error)
    }
  )
  // 响应拦截
  service.interceptors.response.use(
    response => {
      // 没有 code 视为非项目接口不作处理
      if (response.data.code === undefined
        || !(typeof response.data.code === 'number')) {
        return response.data
      }
      // 有 code 判断为项目接口请求
      switch (response.data.code) {

        // 返回响应内容
        case 200: return response.data
        // 401 411 情况下退回到登录页面
        case 401:
        case 411: {

          router.push({ name: 'login' })
          console.log('登陆超时，无权登陆')
        }
        // 根据需要添加其它判断
        default: {
          let error = new BusError(response.data.msg);
          error.setResponse(response);
          handleBusError(error)
          throw error;
        }
      }
    },
    error => {
      //原错误
      if (error.name === "AxiosError") {
        const ori = get(error, 'code');
        if (ori === "ECONNABORTED") {
          error.message = '请求超时'
        }
      }
      const status = get(error, 'response.status')
      switch (status) {
        case 400: error.message = '请求错误'; break
        case 401:
          error.message = '未授权，请登录';
          router.push({ name: 'login' });
          break;
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = '请求资源未找到'; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '服务网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = '版本不受支持'; break
        default: break
      }
      handleBusError(error)
      throw error
    }
  )
  return service
}

function stringify(data) {
  return qs.stringify(data, { allowDots: true, encode: false })
}
function paramsSerializer(params) {
  return qs.stringify(params, { indices: false })
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */
export function createRequest() {
  return function (config) {
    const token = util.cookies.get("token");
    let breanToken
    if (token && token !== 'undefined') breanToken = 'Bearer ' + token
    const configDefault = {
      headers: {
        Authorization: breanToken,
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      timeout: 1000 * 120,
      baseURL: process.env.VUE_APP_API,
      paramsSerializer: paramsSerializer,
    }
    const option = merge(configDefault, config)
    // 处理 get 请求的参数

    // 当需要以 form 形式发送时 处理发送的数据
    // 请根据实际需要修改
    if (!isEmpty(option.data) && option.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      option.data = stringify(option.data)
    }
    var service = createService()

    return service(option)
  }
}

// 用于网络请求的实例和请求方法
export const request = createRequest()