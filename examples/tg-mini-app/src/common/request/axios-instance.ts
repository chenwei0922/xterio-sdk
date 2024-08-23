import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { IResponse } from 'src/services/interfaces'
// const isDevelopment = import.meta.env.MODE === 'development'

export const BASE_URL = import.meta.env.VITE_API_ROOT

const config = {
  baseURL: BASE_URL,
  timeout: 30000
  // withCredentials: true
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    this.service.interceptors.request.use(
      (config: any) => {
        config.headers = { ...config.headers }
        if (this.isExcludeAuthorization(config.url ?? '')) {
          // 部分api路径排除携带token
          // eslint-disable-next-line
          config?.headers && delete config?.headers?.Authorization
        } else if (!config.headers.Authorization) {
          // // 鉴权 token
          const localToken = Cookies.get('access_token')
          console.log({ localToken })

          config.headers.Authorization = `${localToken}`
          // if (!localToken) {
          //   window.location.href = import.meta.env.VITE_BASE_URL + '/login'
          // }
        }

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        if (data.code === '1A0101') {
          // 接口在token过期依然会返回200http码，需要通过data.code 字段判断
          const messageText = data.tips || data.desc
          // message.error(messageText)
          this.redirectToLogin()
          return
        }

        // // 下载返回Blob对象
        // const isBlob = data instanceof Blob
        // // 成功 resultCode === 200 或 code === '200'
        // const success = data.resultCode === 200 || data.code === '200' || isBlob
        // if (!success) {
        //   const messageText = data.tips || data.desc
        //   // message.error(messageText)
        //   return Promise.reject(messageText)
        // }

        // return data
        return data
      },
      async (error: AxiosError<any, any>) => {
        const { response } = error

        // 权限不通过，跳转到登录页
        if (response?.status === 403) {
          this.redirectToLogin()
          return
        }

        if (response?.data?.resultCode > 0) {
          return Promise.reject(response?.data?.resultMsg ?? `服务异常`)
        }

        return Promise.reject(error)
      }
    )
  }

  private isExcludeAuthorization(url: string) {
    // 退出登录 loginOut 需要携带token,不做排除，以和login 区分
    if (url.includes('loginOut')) {
      return false
    }
    const excludePaths = ['/checkToken', '/login2', '/login']
    return excludePaths.some((item) => url.includes(item))
  }

  private redirectToLogin() {
    window.location.href = '/login'
  }

  get<T>(url: string, params?: object, _object = {}): Promise<IResponse<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<IResponse<T>> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<IResponse<T>> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<IResponse<T>> {
    return this.service.delete(url, { params, ..._object })
  }

  /**
   * 通用 get 方法，返回内容不需要符合 IResponse 接口规则
   * @param url
   * @param params
   * @returns
   */
  generalGet<T>(url: string, params?: object, config?: object): Promise<T> {
    return this.service.get(url, { params, ...config })
  }

  /**
   * 通用 post 方法，返回内容不需要符合 IResponse 接口规则
   * @param url
   * @param params
   * @returns
   */
  generalPost<T>(url: string, params?: object, config?: object): Promise<IResponse<T>> {
    return this.service.post(url, params, config)
  }
}

export default new RequestHttp(config)
