import * as types from 'stores/mutation-types'

export const textChange = ({ dispatch, state }, text) => {
    if(text) dispatch(types.TEST, text)
}

export const triggerChange = ({ dispatch, state }, params) => {
  dispatch(types.SEARCHINFO, params)
}
