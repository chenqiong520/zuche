export default {
  getParam (callid, param, pagemap) {
    if (!pagemap) pagemap = {}
    // let token =  sessionStorage.getItem('token');
    let map = {
      'cmd': callid,
      'code': '',
      'type': '1',
      'data': param,
      'pagemap': pagemap
    }
    return JSON.stringify(map)
  },
  postData (thisval, params, token) {
    return thisval.$http.post('http://' + thisval.$store.getters.base + '/openapi/service', params,
      {
        withCredentials: true,
        headers: {
          'token': token != null ? token : localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'cid': '000',
          'ver': '1.0'
        }
      })
      .then((res) => {
        if (res.data.code === 9000) {
          window.localStorage.clear()
          this.$router.push('/login')
        } else {
          return res.data
        }
      })
      .catch((res) => {
        return res
      })
  }
}
