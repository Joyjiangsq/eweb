import * as PORTAL from './mutation-types'

// initial state

const state = {
  tipData:{msg:"", type:"", datePicker:""}
}

// mutations
const mutations = {
  [PORTAL.TIPDATA] (state, data) {
      data.datePicker = Math.random();
      state.tipData = data;
  }
}

export default {
  state,
  mutations
}
