export default {
  /**
   * sort的比较函数
   */
  compare (attr, sort) {
    if (sort == -1) {
      return (o1, o2) => {
        return o2[attr] - o1[attr]
      }  
    }
    return (o1, o2) => {
      return o1[attr] - o2[attr]
    }
  },
  /**
   * 获得年月日字符串:2017-01-01
   */
  getYMD (date = new Date()) {
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
  },
  // yyyy-MM-dd HH:mm:ss
  dateFmt (date = new Date(), fmt = "yyyy-MM-dd") { //author: meizz 
      var o = {
          "M+": date.getMonth() + 1, //月份 
          "d+": date.getDate(), //日 
          "h+": date.getHours(), //小时 
          "m+": date.getMinutes(), //分 
          "s+": date.getSeconds(), //秒 
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
          "S": date.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  },
  // 在光标处输入文本
  insertSomething(inputName, inputVal ,val) {
    let textArea = document.getElementById(inputName);
    let startPos = textArea.selectionStart,
    endPos = textArea.selectionEnd,
    cursorPos = startPos,
    tmpStr = textArea.value
    if (val === null) {
        return;
    }
    // move cursor:
    setTimeout(() => {
      cursorPos += val.length
      textArea.selectionStart = textArea.selectionEnd = cursorPos
      textArea.focus()
    }, 10)
    // insert:
    return tmpStr.substring(0, startPos) + val + tmpStr.substring(endPos, tmpStr.length)
  },
  /**
   * 字符串md5加密
   */
  md5Str (str) {
    return this.md5File(this._encodeUTF8(str))
  },
  /**
   * 文件MD5加密
   */
  md5File (file) {
    let data = new Uint8Array(file)
    let result = this._md5(data)
    return Array.prototype.map.call(result, function(e){
      return (e < 16 ? "0" : "") + e.toString(16)
    }).join("")
  },
  /**
   * 字符串转unicode编码
   */
  _encodeUTF8(s) {
    var i, r = [], c, x
    for (i = 0; i < s.length; i++) {
      if ((c = s.charCodeAt(i)) < 0x80) r.push(c)
      else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F))
      else {
        if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
          c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000, r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F))
        else 
          r.push(0xE0 + (c >> 12 & 0xF))
        r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
      }
    }
    return r
  },
  /**
   * md5算法
   */
  _md5(data) {
    let i, j, k
    let tis = [], abs = Math.abs, sin = Math.sin
    for (i = 1; i <= 64; i++) 
      tis.push(0x100000000 * abs(sin(i)) | 0)
    let l = ((data.length + 8) >>> 6 << 4) + 15, s = new Uint8Array(l << 2)
    s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer)
    s[data.length >> 2] |= 0x80 << (data.length << 3 & 31)
    s[l - 1] = data.length << 3
    let params = [
        [function(a, b, c, d, x, s, t) {
          return C(b & c | ~b & d, a, b, x, s, t);
        }, 0, 1, 7, 12, 17, 22],
        [function(a, b, c, d, x, s, t) {
          return C(b & d | c & ~d, a, b, x, s, t);
        }, 1, 5, 5, 9, 14, 20],
        [function(a, b, c, d, x, s, t) {
          return C(b ^ c ^ d, a, b, x, s, t);
        }, 5, 3, 4, 11, 16, 23],
        [function(a, b, c, d, x, s, t) {
          return C(c ^ (b | ~d), a, b, x, s, t);
        }, 0, 7, 6, 10, 15, 21]
      ],
      C = function(q, a, b, x, s, t) {
        return a = a + q + (x | 0) + t, (a << s | a >>> (32 - s)) + b | 0;
      },
      m = [1732584193, -271733879],
      o;
    m.push(~m[0], ~m[1]);
    for (i = 0; i < s.length; i += 16) {
      o = m.slice(0)
      for (k = 0, j = 0; j < 64; j++) 
        m[k & 3] = params[j >> 4][0](m[k & 3], m[++k & 3], m[++k & 3], m[++k & 3], s[i + (params[j >> 4][1] + params[j >> 4][2] * j) % 16], params[j >> 4][3 + j % 4], tis[j])
      for (j = 0; j < 4; j++) 
        m[j] = m[j] + o[j] | 0
    }
    return new Uint8Array(new Uint32Array(m).buffer)
  }
}
