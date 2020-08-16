import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  fetchDashboard({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.DASHBOARD_STATISTICS, {
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
  usersReport({commit}, filters) {
    return new Promise((resolve, reject) => {
      axios.get(requests.USERS_REPORT, {
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
}
