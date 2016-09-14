import * as types from 'stores/mutation-types'

export const textChange = ({ dispatch, state }, text) => {
    if(text) dispatch(types.TEST, text)
}

export const setTitle = ({ dispatch, state }, str) => {
    dispatch(types.TITLE, str)
}

export const setUser = ({ dispatch, state }, data) => {
    if(data) dispatch(types.USERINFO, JSON.stringify(data))
}

export const showTips = ({ dispatch, state }, data) => {
  console.log(data);
    if(data) dispatch(types.TIPDATA, data)
}
