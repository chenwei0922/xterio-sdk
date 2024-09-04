// import { BigNumber } from 'bignumber.js'
/**
 * kSeparator
 * @param {number | string} x
 * @returns string | number
 */
export const kSeparator = (x: string | number) => {
  const parts = x?.toString().split('.')
  if (parts.length > 0) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }
  return x
}

/**
 * 按量级格式化数字
 * @param {*} v
 * @param {*} decimalPlaces
 */
export const formatScaleNumber = (value: number | string | undefined, suffix = '') => {
  const unit = ['', 'K', 'M', 'B', 'T', 'Q', 'S', 'O', 'N', 'D', 'U']
  let index = 0
  let v = value
  if (typeof value === 'string' || typeof value === 'undefined') {
    v = Number(v)
  }
  v = Number(v)
  if (v === 0) {
    v = 0
  } else {
    while (v >= 1000) {
      v = v / 1000
      index++
    }
  }
  // return formatNumber(v, decimalPlaces) + ' ' + unit[index] + suffix
  return v.toFixed(Number(value) < 1000 ? 0 : 2) + ' ' + unit[index]
}

// /**
//  * 格式化数据
//  * @param {string|number} value 要格式化的值
//  * @param {number} decimalPlaces 保留的小树位数
//  */
// export const formatNumber = (
//   value: string | number | undefined,
//   decimalPlaces: number,
//   ignoreZero = true
// ): string => {
//   try {
//     if (isNaN(Number(value)) || value === '' || value === null || value === undefined) {
//       return ''
//     }
//     if (ignoreZero && (value === '0' || value === 0)) {
//       return '0'
//     }

//     let result
//     result = new BigNumber(value)

//     return result.toFormat(decimalPlaces).toString().replace(/\,/g, '')
//   } catch (error) {
//     return ''
//   }
// }
