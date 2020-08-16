/*=========================================================================================
  File Name: moduleCaptain.js
  Description: Common Module
==========================================================================================*/


import state from './moduleSliderState.js'
import mutations from './moduleSliderMutations.js'
import actions from './moduleSliderActions.js'
import getters from './moduleSliderGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

