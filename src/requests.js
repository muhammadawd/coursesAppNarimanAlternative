import helper from './helpers/helper'

export default {
    BASE: process.env.VUE_APP_API,

    REFRESH_ACCESS_TOKEN: '',

    AUTH_JWT_LOGIN_ADMIN: '/admin/login',
    ALL_ADMINS: '/admin',
    ADD_ADMIN: '/admin/create',
    UPDATE_ADMIN: '/admin/update',
    FIND_ADMIN: '/admin/find',
    DELETE_ADMIN: '/admin/delete',

    ALL_USERS: '/user',
    ADD_USER: '/user/create',
    UPDATE_USER: '/user/update',
    FIND_USER: '/user/find',
    DELETE_USER: '/user/delete',

    AUTH_JWT_LOGIN_USER: '/user/login',
    AUTH_JWT_GET_USER: '/user/auth',
    AUTH_JWT_UPDATE_PROFILE: '/user/updateProfile',
    AUTH_JWT_UPDATE_PASSWORD: '/common/updatePassword',
    AUTH_JWT_REGISTER_USER: '/user/create',
    CHECK_OUT_LIST: 'user/payList',

    DASHBOARD_STATISTICS: 'report/getReportTotal',
    USERS_REPORT: 'report/getAllUsersReport',

    COMMON_GET_ALL_SETTINGS: 'common/getSetting',
    COMMON_UPDATE_SETTINGS: 'common/updateSetting',
    COMMON_GET_ALL_COUNTRIES: 'common/getCountries',

    GET_ALL_CATEGORIES: 'category/all',
    CREATE_CATEGORY: 'category/create',
    FIND_CATEGORY: 'category/find',
    UPDATE_CATEGORY: 'category/update',
    DELETE_CATEGORY: 'category/delete',

    CREATE_SUBSCRIBE: 'subscribe/create',

    GET_ALL_SLIDERS: 'slider/all',
    CREATE_SLIDERS: 'slider/create',
    FIND_SLIDER: 'slider/find',
    UPDATE_SLIDERS: 'slider/update',
    DELETE_SLIDER: 'slider/delete',

    GET_ALL_COURSES: 'course/all',
    CREATE_COURSE: 'course/create',
    FIND_COURSE: 'course/find',
    UPDATE_COURSE: 'course/update',
    DELETE_COURSE: 'course/delete',

    GET_ALL_LIST: 'list/all',
    FIND_LIST: 'list/find/',
    CREATE_LIST: 'list/create',
    UPDATE_LIST: 'list/update',
    DELETE_LIST: 'list/delete',

    GET_ALL_USER_LIST: 'user/getUserLists',

    ADD_ROLES: 'admin/role/create-update',
    ALL_ROLES: 'admin/role',
    ALL_PERMISSIONS: 'admin/role/permissions',
    DELETE_ROLE: 'admin/role/delete',
    FIND_ROLES: 'admin/role',
    UPDATE_ROLES: 'admin/role/create-update',
}
