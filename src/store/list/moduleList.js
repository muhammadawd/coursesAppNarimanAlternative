/*=========================================================================================
  File Name: moduleCaptain.js
  Description: Common Module
==========================================================================================*/


import state from './moduleListState.js'
import mutations from './moduleListMutations.js'
import actions from './moduleListActions.js'
import getters from './moduleListGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

