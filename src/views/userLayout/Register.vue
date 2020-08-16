<template>
    <div>
        <div class="image-cover ed_detail_head lg theme-ov" style="background:#f4f4f4;"
             :style="{backgroundImage:'url('+require('@/assets/img/banner-2.jpg')+')'}" data-overlay="9">
            <div class="container">
                <div class="row direction">

                    <div class="col-lg-7 col-md-9">
                        <div class="ed_detail_wrap light">
                            <div class="ed_header_caption">
                                <h1 class="ed_title font-weight-bold fun_font">{{$t('new_account')}}</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="bg-light pt-0">
            <div class="container">
                <div class="row direction">
                    <div class="col-md-3"></div>
                    <div class="col-lg-6 col-md-6">
                        <div class="ed_view_box style_2 overlio">

                            <div class="ed_author direction">
                                <div class="ed_author_box">
                                    <h2 class="font-weight-bold fun_font">{{$t('new_account')}}</h2>
                                </div>
                            </div>

                            <div class="ed_view_price pl-4 pr-4 direction">
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
                                            <label>{{$t('password')}}</label>
                                            <input v-validate="'required'" v-model="password" data-vv-name="password"
                                                   type="password"
                                                   class="form-control"
                                                   placeholder="*******">
                                            <span class="text-danger text-sm">{{ errors.first('password') }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>{{$t('password_confirmation')}}</label>
                                            <input v-validate="'required'" v-model="password_confirmation"
                                                   data-vv-name="password_confirmation"
                                                   type="password"
                                                   class="form-control"
                                                   placeholder="*******">
                                            <span class="text-danger text-sm">{{ errors.first('password_confirmation') }}</span>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>{{$t('country')}}</label>
                                            <!--<select-->
                                            <!--v-validate="'required'" data-vv-name="country_id"-->
                                            <!--v-model="country_id"-->
                                            <!--class="form-control">-->
                                            <!--<option v-for="(country , index) in countries" :value="country.id"-->
                                            <!--:key="index">-->
                                            <!--{{country.translated.title}}-->
                                            <!--</option> -->
                                            <!--</select>-->
                                            <multiselect v-model="selectedCounrty" :options="countries"
                                                         track-by="id"
                                                         :placeholder="$t('select_country')"
                                                         :custom-label="nameWithLang"></multiselect>
                                            <span class="text-danger text-sm">{{ errors.first('country_id') }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">

                                        <div class="form-group">
                                            <label>{{$t('gender')}}</label>
                                            <select
                                                    v-validate="'required'" data-vv-name="gender" v-model="gender"
                                                    class="form-control">
                                                <option value="male">{{$t('male')}}</option>
                                                <option value="female">{{$t('female')}}</option>
                                            </select>
                                            <span class="text-danger text-sm">{{ errors.first('gender') }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <vue-recaptcha class="m-auto" :loadRecaptchaScript="true"
                                                           @verify="onCaptchaVerified"
                                                           :sitekey="getCaptchaKey()"></vue-recaptcha>
                                            <span class="text-danger text-sm">{{ errors.first('recaptchaToken') }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ed_view_link">
                                <a href="#" class="btn btn-theme enroll-btn"
                                   @click.prevent="submitForm()">{{$t('register')}}
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
    import VueRecaptcha from 'vue-recaptcha';

    export default {
        name: "Regsiter",
        components: {VueRecaptcha},
        data() {
            return {
                name: null,
                email: null,
                phone: null,
                password: null,
                password_confirmation: null,
                selectedCounrty: null,
                gender: 'male',
                countries: [],
                captcha: null
            }
        },
        mounted() {
            this.getAllCountries();
        },
        methods: {
            nameWithLang(o) {
                return o.translated.title;
            },
            getCaptchaKey() {
                return process.env.VUE_APP_GOOGLE_CAPATCHA
            },
            onCaptchaVerified(recaptchaToken) {
                this.captcha = recaptchaToken;
            },
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
            submitForm() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        // if form have no errors
                        this.registerJWT();
                    } else {
                        // form have errors
                    }
                })
            },
            registerJWT() {
                let vm = this;
                vm.$helper.showLoader()
                const payload = {
                    name: vm.name,
                    email: vm.email,
                    gender: vm.gender,
                    phone: vm.phone,
                    country_id: vm.selectedCounrty ? vm.selectedCounrty.id : '',
                    password: vm.password,
                    password_confirmation: vm.password_confirmation,
                    recaptchaToken: vm.captcha,
                };
                vm.$store.dispatch('moduleAuth/registerJWT', payload)
                    .then(() => {
                        vm.$helper.hideLoader()
                    })
                    .catch(error => {
                        vm.$helper.handleError(error, vm);
                        vm.$helper.hideLoader()
                    })
            },
        }
    }
</script>
<style>
    .multiselect__select {
        height: 55px;
    }

    .multiselect__tags {
        min-height: 55px;
        padding: 15px 40px 0 8px;
    }
</style>