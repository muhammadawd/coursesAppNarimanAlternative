import axios from "@/axios.js"
import requests from "@/requests.js"
import router from '@/router'
import jwt from "../../http/requests/auth/jwt/index.js"

export default {
    addAdmin({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(requests.ADD_ADMIN, payload)
                .then((response) => {
                    commit('ADD_ADMIN', Object.assign(payload, {id: response.data.data.admin.id}))
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    fetchAdmin({commit}, filters) {
        return new Promise((resolve, reject) => {
            axios.get(requests.ALL_ADMINS, {
                params: filters
            })
                .then((response) => {
                    if (response.data.status) {
                        commit('SET_ADMINS', response.data.data.admins.data)
                    }
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    findAdmin({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.get(`${requests.FIND_ADMIN}/${payload.id}`)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    updateAdmin({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.UPDATE_ADMIN}`, payload)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    removeAdmin({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${requests.DELETE_ADMIN}`, payload)
                .then((response) => {
                    commit('REMOVE_ADMIN', payload.ids)
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    loginJWT({commit}, payload) {
        console.log(payload)
        return new Promise((resolve, reject) => {
            jwt.login(requests.AUTH_JWT_LOGIN_ADMIN, payload)
                .then(response => {
                    response = response.data;

                    // If there's user data in response
                    if (response.data.admin) {

                        // set userType
                        localStorage.setItem("userType", "admin");

                        // Set accessToken
                        localStorage.setItem("tokenAdmin", response.data.token);

                        // Update user details
                        commit('UPDATE_ADMIN_INFO', response.data.admin, {root: true});

                        // Set bearer token in axios
                        commit("SET_BEARER", response.data.token);

                        // Navigate User to homepage
                        router.push(router.currentRoute.query.to || '/admin');

                        // location.reload()
                        let permissions = _.map(response.data.admin.role.permissions, 'name');
                        permissions = permissions ? permissions : [];
                        // Set accessToken
                        localStorage.setItem("myPermission", JSON.stringify(permissions));

                        resolve(response)
                    } else {
                        reject({message: payload.vm.$t('server_parse_error')})
                    }

                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    },
    setBearer({commit}, token) {
        // Set bearer token in axios
        commit("SET_BEARER", token);

    },
}
