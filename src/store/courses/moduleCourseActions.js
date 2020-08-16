import axios from "@/axios.js"
import requests from "@/requests.js"

export default {
    getAllCourses({commit}, filters) {
        return new Promise((resolve, reject) => {
            axios.get(requests.GET_ALL_COURSES, {
                params: filters
            }).then((response) => {
                if (response.data.status) {
                    commit('SET_COURSES', response.data.data.courses.data)
                }
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    addCourse({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(requests.CREATE_COURSE, payload.data, payload.config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    findCourse({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`${requests.FIND_COURSE}/${payload.id}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    updateCourse({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.UPDATE_COURSE}`, payload.data, payload.config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    removeCourse({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.DELETE_COURSE}`, payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
}
