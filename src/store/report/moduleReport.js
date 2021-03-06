/*=========================================================================================
  File Name: moduleCaptain.js
  Description: Common Module
==========================================================================================*/


import state from './moduleReportState.js'
import mutations from './moduleReportMutations.js'
import actions from './moduleReportActions.js'
import getters from './moduleReportGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

