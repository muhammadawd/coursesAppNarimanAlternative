import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
    addUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(requests.ADD_USER, payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    fetchUser({commit}, filters) {
        return new Promise((resolve, reject) => {
            axios.get(requests.ALL_USERS, {
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
    findUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`${requests.FIND_USER}/${payload.id}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    updateUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.UPDATE_USER}`, payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    removeUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.DELETE_USER}`, payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
}
