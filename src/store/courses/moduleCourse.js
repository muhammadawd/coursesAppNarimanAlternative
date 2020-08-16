/*=========================================================================================
  File Name: moduleCaptain.js
  Description: Common Module
==========================================================================================*/


import state from './moduleCourseState.js'
import mutations from './moduleCourseMutations.js'
import actions from './moduleCourseActions.js'
import getters from './moduleCourseGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

