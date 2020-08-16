import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
  createSubscribe({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(requests.CREATE_SUBSCRIBE, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
