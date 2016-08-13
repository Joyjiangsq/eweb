import * as PORTAL from './mutation-types'

// initial state

const state = {
    text:'demo'
}

// mutations
const mutations = {
  [PORTAL.TEST] (state, text) {
      state.text = text;
  }
}

export default {
  state,
  mutations
}
