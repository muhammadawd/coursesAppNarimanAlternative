import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
    getAllList({commit}, filters) {
        return new Promise((resolve, reject) => {
            axios.get(requests.GET_ALL_LIST, {
                params: filters
            }).then((response) => {
                if (response.data.status) {
                    commit('SET_LIST', response.data.data.lists.data)
                }
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    getUserLists({commit}, filters) {
        return new Promise((resolve, reject) => {
            axios.get(requests.GET_ALL_USER_LIST, {
                params: filters
            }).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    checkoutList({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(requests.CHECK_OUT_LIST, payload).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error);
            })
        })
    },
    findList({commit}, filters) {
        return new Promise((resolve, reject) => {
            axios.get(requests.FIND_LIST + `${filters.id}`, {
                params: filters
            }).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    addList({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(requests.CREATE_LIST, payload.data, payload.config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    updateList({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.UPDATE_LIST}`, payload.data, payload.config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    removeList({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.DELETE_LIST}`, payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
}
