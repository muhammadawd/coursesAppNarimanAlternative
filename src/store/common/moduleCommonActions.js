import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  fetchSettings({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.COMMON_GET_ALL_SETTINGS, {
        params: filters
      })
        .then((response) => {
          if (response.data.status) {
            commit('SET_SETTINGS', response.data.data.settings)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchCountries({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.COMMON_GET_ALL_COUNTRIES, {
        params: filters
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateSetting({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.COMMON_UPDATE_SETTINGS, payload)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
    })
  },
}
