/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------

==========================================================================================*/


///////////////////////////////////////////////
// Helper
///////////////////////////////////////////////

// *From Auth - Data will be received from auth provider
const userDefaults = {}
const adminDefaults = {}

const userInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo")) || {}
const adminInfoLocalStorage = JSON.parse(localStorage.getItem("adminInfo")) || {}

// Set default values for active-user
// More data can be added by auth provider or other plugins/packages
const getUserInfo = () => {
    let userInfo = {}

    // Update property in user
    Object.keys(userDefaults).forEach((key) => {
        // If property is defined in localStorage => Use that
        userInfo[key] = userInfoLocalStorage[key] ? userInfoLocalStorage[key] : userDefaults[key]
    })

    // Include properties from localStorage
    Object.keys(userInfoLocalStorage).forEach((key) => {
        if (userInfo[key] == undefined && userInfoLocalStorage[key] != null) userInfo[key] = userInfoLocalStorage[key]
    })

    return userInfo
}
const getAdminInfo = () => {
    let adminInfo = {}

    // Update property in admin
    Object.keys(adminDefaults).forEach((key) => {
        // If property is defined in localStorage => Use that
        adminInfo[key] = adminInfoLocalStorage[key] ? adminInfoLocalStorage[key] : adminDefaults[key]
    })

    // Include properties from localStorage
    Object.keys(adminInfoLocalStorage).forEach((key) => {
        if (adminInfo[key] == undefined && adminInfoLocalStorage[key] != null) adminInfo[key] = adminInfoLocalStorage[key]
    })

    return adminInfo
}

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
    AppActiveUser: getUserInfo(),
    AppActiveAdmin: getAdminInfo(),

    // Can be used to get current window with
    // Note: Above breakpoint state is for internal use of sidebar & navbar component
    windowWidth: null,
}

export default state
