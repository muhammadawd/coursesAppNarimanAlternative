<template>
    <div class="gray" v-if="user">
        <div class="row align-items-center">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div data-overlay="9" class="image-cover ed_detail_head lg theme-ov"
                     :style="{backgroundImage:'url('+require('@/assets/img/banner-2.jpg')+')'}">
                    <div class="container">
                        <div class="row direction">
                            <div class="col-12">
                                <div class="ed_detail_wrap light">
                                    <div class="ed_header_caption">
                                        <h1 class="ed_title text-center font-weight-bold fun_font">
                                            {{$t('profile')}} - {{$t('my_info')}}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dashboard_container direction mt-4">
                    <div class="dashboard_container_body p-4">
                        <div class="viewer_detail_wraps">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-4 text-center">
                                        <div class="caption">
                                            <div class="viewer_detail_thumb m-auto text-center">
                                                <img :src="user.gender == 'female' ? require('@/assets/img/femaleuser.jpg') : require('@/assets/img/user.jpg')"
                                                     class="img-fluid" alt="">
                                                <div class="viewer_status">{{user.gender}}</div>
                                            </div>
                                            <div class="viewer_header mt-3">
                                                <h4>{{user.name}}</h4>
                                                <span class="viewer_location">{{user.phone}}</span>
                                            </div>
                                            <div class="viewer_header">
                                                <ul class="badge_info">
                                                    <li class="platinum"><i class="ti-thumb-up"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-8">

                                        <div class="form-group">
                                            <label>{{$t('name')}}</label>
                                            <input type="text"
                                                   v-validate="'required'" data-vv-name="name" v-model="name"
                                                   class="form-control"
                                                   :placeholder="$t('name')">
                                            <span class="text-danger text-sm">{{ errors.first('name') }}</span>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>{{$t('email')}} ({{$t('optional')}})</label>
                                                    <input type="text" data-vv-name="email" v-model="email"
                                                           class="form-control"
                                                           :placeholder="$t('email')">
                                                    <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">

                                                <div class="form-group">
                                                    <label>{{$t('phone')}}</label>
                                                    <input type="text"
                                                           v-validate="'required'" data-vv-name="phone" v-model="phone"
                                                           class="form-control"
                                                           :placeholder="$t('phone')">
                                                    <span class="text-danger text-sm">{{ errors.first('phone') }}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>{{$t('country')}}</label>
                                                    <select
                                                            v-validate="'required'" data-vv-name="country_id"
                                                            v-model="country_id"
                                                            class="form-control">
                                                        <option v-for="(country , index) in countries"
                                                                :value="country.id"
                                                                :key="index">
                                                            {{country.translated.title}}
                                                        </option>
                                                        <option value="female">{{$t('female')}}</option>
                                                    </select>
                                                    <span class="text-danger text-sm">{{ errors.first('country_id') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">

                                                <div class="form-group">
                                                    <label>{{$t('gender')}}</label>
                                                    <select
                                                            v-validate="'required'" data-vv-name="gender"
                                                            v-model="gender"
                                                            class="form-control">
                                                        <option value="male">{{$t('male')}}</option>
                                                        <option value="female">{{$t('female')}}</option>
                                                    </select>
                                                    <span class="text-danger text-sm">{{ errors.first('gender') }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" class="btn btn-theme text-white enroll-btn"
                                           @click.prevent="submitForm()">{{$t('update')}}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import newsLetter from './components/Home/newsLetter'

    export default {
        name: "Profile",
        components: {newsLetter},
        data() {
            return {
                user: null,
                name: null,
                email: null,
                phone: null,
                password: null,
                password_confirmation: null,
                country_id: 119,
                gender: 'male',
                countries: [],
                captcha: null
            }
        },
        mounted() {
            this.getAllCountries();
            this.getAuth();
        },
        methods: {
            getAllCountries() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = {};
                let dispatch = this.$store.dispatch('moduleCommon/fetchCountries', filters);
                dispatch.then((response) => {
                    response = response.data;
                    vm.countries = (response.data.countries)
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            },
            getAuth() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = {};
                let dispatch = this.$store.dispatch('moduleAuth/getAuth', filters);
                dispatch.then((response) => {
                    response = response.data;

                    vm.user = response.data.user;
                    vm.name = response.data.user.name;
                    vm.phone = response.data.user.phone;
                    vm.email = response.data.user.email;
                    vm.gender = response.data.user.gender;
                    vm.country_id = response.data.user.country_id;

                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            },
            submitForm() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        // if form have no errors
                        this.updateProfileJWT();
                    } else {
                        // form have errors
                    }
                })
            },
            updateProfileJWT() {
                let vm = this;
                vm.$helper.showLoader();
                const payload = {
                    name: vm.name,
                    email: vm.email,
                    gender: vm.gender,
                    phone: vm.phone,
                    country_id: vm.country_id,
                    password: vm.password,
                    password_confirmation: vm.password_confirmation,
                };
                vm.$store.dispatch('moduleAuth/updateProfileJWT', payload)
                    .then((response) => {
                        vm.$helper.hideLoader()
                        vm.user = response.data.user
                        vm.$helper.showMessage('success', vm)
                    })
                    .catch(error => {
                        vm.$helper.handleError(error, vm);
                        vm.$helper.hideLoader()
                    })
            },
        }
    }
</script>

<style scoped>

</style>