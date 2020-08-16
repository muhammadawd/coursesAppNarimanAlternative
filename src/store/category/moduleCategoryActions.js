import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
    getAllCategories({commit}, filters) {
        return new Promise((resolve, reject) => {
            axios.get(requests.GET_ALL_CATEGORIES, {
                params: filters
            }).then((response) => {
                if (response.data.status) {
                    commit('SET_CATEGORIES', response.data.data.categories.data)
                }
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    addCategory({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(requests.CREATE_CATEGORY, payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    findCategory({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`${requests.FIND_CATEGORY}/${payload.id}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    updateCategory({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.UPDATE_CATEGORY}`, payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    removeCategory({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.DELETE_CATEGORY}`, payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
}
