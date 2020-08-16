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
                                            {{$t('profile')}} - {{$t('update_password')}}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dashboard_container mt-3 mb-3 direction">
                    <div class="dashboard_container_body p-4">
                        <div class="viewer_detail_wraps">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-4 text-center">
                                        <div class="caption">
                                            <div class="viewer_detail_thumb m-auto text-center">
                                                <img :src="user.gender == 'female' ? require('@/assets/img/femaleuser.jpg') : require('@/assets/img/user.jpg')" class="img-fluid" alt="">
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

                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>{{$t('old_password')}}</label>
                                                    <input v-validate="'required'" v-model="old_password"
                                                           data-vv-name="old_password"
                                                           type="password"
                                                           class="form-control"
                                                           placeholder="*******">
                                                    <span class="text-danger text-sm">{{ errors.first('old_password') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>{{$t('password')}}</label>
                                                    <input v-validate="'required'" v-model="new_password"
                                                           data-vv-name="new_password"
                                                           type="password"
                                                           class="form-control"
                                                           placeholder="*******">
                                                    <span class="text-danger text-sm">{{ errors.first('new_password') }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>{{$t('password_confirmation')}}</label>
                                                    <input v-validate="'required'" v-model="new_password_confirmation"
                                                           data-vv-name="new_password_confirmation"
                                                           type="password"
                                                           class="form-control"
                                                           placeholder="*******">
                                                    <span class="text-danger text-sm">{{ errors.first('new_password_confirmation') }}</span>
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
        name: "Password",
        components: {newsLetter},
        data() {
            return {
                user: null,
                old_password: null,
                new_password: null,
                new_password_confirmation: null,
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
                        this.updatePasswordJWT();
                    } else {
                        // form have errors
                    }
                })
            },
            updatePasswordJWT() {
                let vm = this;
                vm.$helper.showLoader();
                const payload = {
                    old_password: vm.old_password,
                    new_password: vm.new_password,
                    new_password_confirmation: vm.new_password_confirmation,
                };
                vm.$store.dispatch('moduleAuth/updatePasswordJWT', payload)
                    .then(() => {
                        vm.$helper.hideLoader()
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