import originJSONP from 'jsonp'

export default function jsonp(url, params, option) {
  url += (url.includes('?') ? '&' : '?') + param(params)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if(!err) {
        resolve(data)
      } else {
        reject()
      }
    })
  });
}

/**
 * 重组对象参数到url
 * @param data
 */
function param(data) {
  let url = ''
  for(let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // 如果有参数，去掉第一个&, 没有就返回空
  return url ? url.substring(1) : ''
}
