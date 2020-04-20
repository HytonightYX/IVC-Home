// export const BASE_URL = "http://172.20.10.2:9000"
export const BASE_URL = 'http://ivc.natapp1.cc'

export const API_URL = BASE_URL + '/api'
export const API_SERVER = process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : 'http://yunxi.site:7000'

export const API_UPLOAD = API_URL + '/upload'
export const API_CHECK = API_URL + '/done'

export const API_MEMBER_LIST = API_SERVER + '/member'
export const API_POST_LIST_SIMPLE = API_SERVER + '/post/simple'
export const API_POST_FULL = API_SERVER + '/post/full'
export const API_STATIC_IMAGE = API_SERVER + '/static/image'

export const API_HOME_IMAGES = API_SERVER + '/homeimage'