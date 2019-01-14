import http from '@/api/http'


/**
 * 通用功能api接口
 */
export default {
  imageUpload: async (img_input_id) => {
    let files = document.getElementById(img_input_id).files
    if (!files || files.length < 1) {
      return { code: 1, message: '请选择上传图片' }
    }
    if (files.length != 1) {
      return { code: 1, message: '目前暂不支持一次上传多张图片' }
    }
    let data =  new FormData()
    let file = files[0]
    data.append('file', file)
    data.append('chunk','0')
    return (await http.post('/images', data, 'file')).data
  },
}