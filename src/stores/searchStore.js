import * as PORTAL from './mutation-types'

// initial state

const state = {
    params:{}
}

// mutations
const mutations = {
  [PORTAL.SEARCHINFO] (state, p) {
      state.params = p;
  }
}

export default {
  state,
  mutations
}
