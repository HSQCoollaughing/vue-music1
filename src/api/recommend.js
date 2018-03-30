import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import $ from 'jquery';
/**
 * 获取推荐数据
 */
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  // 合并对象
  const data = Object.assign({}, commonParams, {
    platfrom: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

/**
 * 获取歌单数据
 */
export function getDiscList() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "get",
      async: false,
      url: "http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js",
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: "JsonCallback",
      scriptCharset: 'GBK',//设置编码，否则会乱码
      success: function(data) {
        resolve(JSON.stringify(data))
      },
      error: function() {
      }
    });
  });

}
