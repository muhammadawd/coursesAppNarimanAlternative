/*=========================================================================================
  File Name: moduleCaptain.js
  Description: Subscribe Module
==========================================================================================*/


import state from './moduleSubscribeState.js'
import mutations from './moduleSubscribeMutations.js'
import actions from './moduleSubscribeActions.js'
import getters from './moduleSubscribeGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

