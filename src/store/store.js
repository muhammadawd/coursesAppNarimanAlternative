import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex);

import moduleAuth from './auth/moduleAuth.js'
import moduleAdmin from './admin/moduleAdmin.js'
import moduleRole from './role/moduleRole.js'
import moduleSubscribe from './subscribe/moduleSubscribe.js'
import moduleSlider from './slider/moduleSlider.js'
import moduleCategory from './category/moduleCategory.js'
import moduleCommon from './common/moduleCommon.js'
import moduleList from './list/moduleList.js'
import moduleReport from './report/moduleReport.js'
import moduleCourse from './courses/moduleCourse.js'
import moduleUser from './user/moduleUser.js'

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        moduleAuth: moduleAuth,
        moduleAdmin: moduleAdmin,
        moduleUser: moduleUser,
        moduleRole: moduleRole,
        moduleCommon: moduleCommon,
        moduleList: moduleList,
        moduleReport: moduleReport,
        moduleCourse: moduleCourse,
        moduleSubscribe: moduleSubscribe,
        moduleCategory: moduleCategory,
        moduleSlider: moduleSlider,
    },
    strict: process.env.NODE_ENV !== 'production'
})
