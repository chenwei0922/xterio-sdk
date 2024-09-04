import Cookies from 'js-cookie'
import qs from 'query-string'
import { IResponse } from './interfaces'
import { XterioAuthInfo } from 'modules/XterAuthInfo'

async function resolveResp<T>(resp: Response): Promise<T> {
  const res: IResponse<T> = await resp.json()
  if (res.err_code != 0) {
    if (resp.status === 401 && res.err_code === 91001) {
      // TOAST.noti('error', 'Your session has expired, please sign in again.')
      // loginEvent.emit('Expired')
    } else if (resp.status === 429) {
      // TOAST.noti('error', 'Operating too frequently, please try again later.')
    }
    return Promise.reject(res)
    // throw new Error(`[${res.err_code}]: ${res.err_msg}`)
  }
  return res.data
}

function fullUrl(apiPath: string, apiBase?: string): string {
  if (!apiBase || /^https?:\/\//i.test(apiPath)) {
    return apiPath
  }
  if (apiPath.startsWith('/')) {
    return `${apiBase}${apiPath}`
  } else {
    return `${apiBase}/${apiPath}`
  }
}

interface FetcherConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  params?: Record<string, unknown>
  headers?: Record<string, string>
  data?: unknown
}

export async function fetcher<T>(config: string | (FetcherConfig & { Authorization?: string })): Promise<T> {
  let cfg: FetcherConfig
  let Authorization = ''
  if (typeof config === 'string' || config instanceof String) {
    cfg = {
      method: 'GET',
      path: config as string
    }
  } else {
    cfg = config
    Authorization = config.Authorization || Cookies.get('_id_token') || ''
  }
  let path = cfg.path
  if (!path) {
    throw new Error('Error: fetch path is required')
  }
  if (cfg.params) {
    const queryParam = qs.stringify(cfg.params)
    path = `${path}?${queryParam}`
  }
  if (typeof window === 'undefined') {
    // running on the server, we use an inner api_base to avoid freq limit of WAF
    cfg.headers = { ...cfg.headers }
    // if (!process.env.NEXT_API_KEY) {
    //   console.error('NEXT_API_KEY not configured, will be rate limited by WAF')
    // }
  }
  // const url = fullUrl(path, process.env.NEXT_PUBLIC_API_BASE)
  const url = fullUrl(path, XterioAuthInfo.baseURL) // TODO:

  let sensorsdataCookieValue
  if (typeof document !== 'undefined') {
    sensorsdataCookieValue = document?.cookie
      .split('; ')
      .find((row) => row.startsWith('sensorsdata2015jssdkcross='))
      ?.split('=')[1]
  }

  const requestOptions: RequestInit = {
    method: cfg.method,
    headers: {
      sensorsdatajssdkcross: sensorsdataCookieValue ?? '',
      ...cfg.headers
    }
  }

  if (cfg.method !== 'PUT') {
    requestOptions.headers = {
      'content-type': 'application/json',
      ...requestOptions.headers,
      Authorization
    }
  }

  if (cfg.data) {
    // PUT 和 pplication/x-www-form-urlencoded 提交的是表单数据，不能stringify
    const needStringify = cfg.method !== 'PUT' && cfg?.headers?.['content-type'] !== 'application/x-www-form-urlencoded'
    requestOptions.body = needStringify ? JSON.stringify(cfg.data) : (cfg.data as ReadableStream)
  }

  const req = new Request(url, requestOptions)
  try {
    const resp = await fetch(req)
    return cfg.method === 'PUT' ? (resp as T) : resolveResp<T>(resp)
  } catch {
    throw new Error('Network error')
  }
}

export async function getFetchers<T extends Array<unknown>>(
  ...paths: (string | [string, Record<string, unknown>])[]
): Promise<T> {
  const datas = await Promise.all(
    paths.map((path) => {
      const rest: [string, Record<string, unknown> | undefined] = typeof path === 'string' ? [path, undefined] : path
      return getFetcher(...rest)
    })
  )
  return datas as T
}

export async function getFetcher<T>(
  path: string,
  params?: Record<string, unknown>,
  Authorization?: string
): Promise<T> {
  return fetcher({
    method: 'GET',
    path,
    params,
    Authorization
  })
}

export async function postFetcher<T, D>(
  path: string,
  data: D,
  Authorization?: string,
  headers?: Record<string, string>
): Promise<T> {
  return fetcher({
    method: 'POST',
    path,
    data,
    headers,
    Authorization
  })
}

export async function deleteFetcher<T, D>(path: string, data: D): Promise<T> {
  return fetcher({
    method: 'DELETE',
    path,
    data
  })
}

export async function putFetcher<T, D>(path: string, data: D, headers?: Record<string, string>): Promise<T> {
  return fetcher({
    method: 'PUT',
    path,
    data,
    headers
  })
}

export async function patchFetcher<T, D>(
  path: string,
  data: D,
  headers?: Record<string, string>,
  Authorization?: string
): Promise<T> {
  return fetcher({
    method: 'PATCH',
    path,
    data,
    headers,
    Authorization
  })
}

// mocks
