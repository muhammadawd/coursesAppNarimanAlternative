import moment from 'moment'

const CryptoJS = require("crypto-js");

const helper = {
    replaceNullWithSingleQuote(obj) {
        Object.keys(obj).forEach(function (key) {
            if (obj[key] === null || obj[key] === "null") {
                obj[key] = '';
            }
        });
        return obj;
    },
    splitFirst(str) {
        return str.split(' ')[0]
    },
    showLoader(message = null) {
        // show initial loading
        const appLoading = document.getElementById('loader_overlay');
        const appLoadingText = document.getElementById('loader_message');
        if (appLoading) {
            appLoading.style.display = "block";
            if (message) {
                appLoadingText.innerText = message
            }
        }
    },
    hideLoader() {
        // show initial loading
        const appLoading = document.getElementById('loader_overlay');
        const appLoadingText = document.getElementById('loader_message');
        if (appLoading) {
            appLoading.style.display = "none";
            appLoadingText.innerText = "";
        }
    },
    setLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
        return JSON.parse(localStorage.getItem(key))
    },
    getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    removeLocalStorage(key) {
        return localStorage.removeItem(key)
    },
    prepareObjectToSend: (request_data) => {
        return request_data;
    },
    removeFromArray: (array, remove) => {
        const index = array.indexOf(remove);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array
    },
    generateRandomValues() {
        return Math.random().toString(36).slice(-8);
    },
    diffForhuman(date) {
        if (!date) return '';
        let delta = Math.round((new Date() - new Date(date)) / 1000);

        let minute = 60;
        let hour = minute * 60;
        let day = hour * 24;
        let week = day * 7;

        let fuzzy = '';

        if (delta < 30) {
            fuzzy = 'just then.';
        } else if (delta < minute) {
            fuzzy = delta + ' seconds ago.';
        } else if (delta < 2 * minute) {
            fuzzy = 'a minute ago.'
        } else if (delta < hour) {
            fuzzy = Math.floor(delta / minute) + ' minutes ago.';
        } else if (Math.floor(delta / hour) == 1) {
            fuzzy = '1 hour ago.'
        } else if (delta < day) {
            fuzzy = Math.floor(delta / hour) + ' hours ago.';
        } else if (delta < day * 2) {
            fuzzy = 'yesterday';
        } else if (delta < week) {
            fuzzy = Math.floor(delta / day) + 1 + ' days ago.';
        } else {
            fuzzy = ''
        }

        return fuzzy
    },
    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    hasAccessPermission: (permission) => {
        // return true;
        let myPermission = JSON.parse(localStorage.getItem('myPermission'));
        if (permission == 'ALLOW_ALL') {
            return true
        } else if (myPermission.includes(permission)) {

            return true;
        } else {

            return false;
        }
        // if (user.permissions.includes(permission)) return true;
    },
    deleteMulti(ids, collection) {
        return _.dropWhile(collection, function (n) {
            return _.includes(ids, n.id);
        });
    },
    getTranslatedData(model, l = 'ar') {
        let lang = _.map(model.details, function (o) {
            if (o.lang == l) return o;
        });
        lang = _.without(lang, undefined);
        return lang[0];
    },
    JSON_to_URLEncoded(element, key, list) {
        var list = list || [];
        if (typeof (element) == 'object') {
            for (var idx in element)
                JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
        } else {
            list.push(key + '=' + encodeURIComponent(element));
        }
        return list.join('&');
    },
    showMessage: (type, vm, message = '') => {
        vm.$notify({
            icon: 'icon-alert-circle',
            iconPack: 'feather',
            horizontalAlign: 'center',
            verticalAlign: 'top',
            title: `${type == 'success' ? vm.$t('success') : vm.$t('error')}`,
            text: `${type == 'success' ? vm.$t('success_msg') + ' ' + message : vm.$t('error_msg') + ' ' + message}`,
            type: type
        });
    },
    validationGroupingData: (xs, key) => {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    },
    addErrors: (inputs, errors) => {
        for (let input in inputs) {
            try {
                // console.log(input)
                document.getElementById(input + '_error').innerText = ' ';
            } catch (e) {

                console.log(e)
            }
        }
        for (const [key, value] of Object.entries(errors)) {
            try {
                // console.log(key)
                $(`#${key}_error`).text(value[0]);
                setTimeout(() => {
                    document.getElementById(key + '_error').innerText = value[0];
                }, 300)
            } catch (e) {
                console.log(e)
            }
        }
    },
    handleError: (error, vm) => {
        // request error cause of offline using
        if (!navigator.onLine) return;

        if (error.response) {
            // The request was made and the server responded with a status code

            // validation error over api
            if (error.response.status == 422) {
                let validationApi = error.response.data.data.validation_errors;
                for (let [key, value] of Object.entries(validationApi)) {
                    let msg = value[0];
                    vm.$validator.errors.add({
                        field: key,
                        msg: msg,
                    })
                }
                return;
            }

            // un authenticated
            if (error.response.status == 401) {
                vm.$router.push({name: 'login'});
                return;
            }

            // permission denied
            if (error.response.status == 403) {
                // vm.$router.push({name: 'pageError403'})
                return;
            }

            // default 500 message
            let message = vm.$t('server_error');
            if (error.response.status == 401) message = vm.$t('server_error_401');
            if (error.response.status == 403) message = vm.$t('server_error_403');
            if (error.response.status == 404) message = vm.$t('server_error_404');

            vm.$notify({
                // icon: "ti-info",
                horizontalAlign: 'center',
                verticalAlign: 'top',
                text: `Server Error Code : ${error.response.status}`,
                title: `${message}`,
                type: 'error'
            });
            // console.log(error.response.data, error.response.status, error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            vm.$notify({
                horizontalAlign: 'center',
                verticalAlign: 'top',
                text: `${vm.$t('error')}`,
                title: `${vm.$t('server_error')}`,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                type: 'error'
            });
            // console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            vm.$notify({
                horizontalAlign: 'center',
                verticalAlign: 'top',
                title: `${vm.$t('error')}`,
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                type: 'error'
            });
            // console.log('Error', error.message);
        }
    },
    formatDate: (value, format = 'MM-DD hh:mm a') => {
        if (value) {
            return moment(new Date(value)).format(format)
        }
    },
    diffTwoDates: (from_date, to_date) => {
        return moment(new Date(from_date)).diff(to_date, 'days')
    },
    splitHostname() {
        let result = {};
        let url = window.location.href;

        url = url.replace(new RegExp(/^\s+/), "");
        url = url.replace(new RegExp(/\s+$/), "");
        url = url.replace(new RegExp(/\\/g), "/");
        url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i), "");
        url = url.replace(new RegExp(/^www\./i), "");
        url = url.replace(new RegExp(/\/(.*)/), "");
        if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) {
            url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i), "");
        } else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))) {
            url = url.replace(new RegExp(/\.[a-z]{2,4}$/i), "");
        }
        result.hasSubdomain = (url.match(new RegExp(/\./g))) ? true : false;
        result.data = url.split('.');
        return result;
    },
    saveAccountCredential(data) {
        let key = 'accountApi';
        let accountApi = JSON.parse(localStorage.getItem(key));
        if (accountApi) {
            // append data
            _.forEach(data, (v, k) => {
                accountApi[k] = v
            })
            localStorage.setItem(key, JSON.stringify(accountApi));
        } else {
            localStorage.setItem(key, JSON.stringify(data));
        }
    },
    validateFormErrors(vm) {
        return vm.errors.any();
    },
    getCurrentBranch() {
        return 1;
    },
    checkNestedObjectProp(obj /*, level1, level2, ... levelN*/) {
        let args = Array.prototype.slice.call(arguments, 1);

        for (let i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return false;
            }
            obj = obj[args[i]];
        }
        return true;
    },
    getMapDarkStyle() {
        return [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8ec3b9"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1a3646"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#64779e"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#334e87"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#283d6a"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6f9ba5"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3C7680"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#304a7d"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2c6675"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#255763"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#b0d5ce"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#283d6a"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3a4762"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#0e1626"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#4e6d70"
                    }
                ]
            }
        ]
    }
};
export default helper;
