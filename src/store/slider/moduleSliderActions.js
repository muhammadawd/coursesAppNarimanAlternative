import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
    getAllSliders({commit}, filters) {
        return new Promise((resolve, reject) => {
            axios.get(requests.GET_ALL_SLIDERS, {
                params: filters
            }).then((response) => {
                if (response.data.status) {
                    commit('SET_SLIDERS', response.data.data.sliders.data)
                }
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    addSlider({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(requests.CREATE_SLIDERS, payload.data, payload.config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    findSlider({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`${requests.FIND_SLIDER}/${payload.id}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    updateSlider({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.UPDATE_SLIDERS}`, payload.data, payload.config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    removeSlider({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.DELETE_SLIDER}`, payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
}
