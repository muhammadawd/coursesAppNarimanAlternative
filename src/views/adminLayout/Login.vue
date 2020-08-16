<template>
    <div>
        <div class="image-cover ed_detail_head lg theme-ov" style="background:#f4f4f4;"
             :style="{backgroundImage:'url('+require('@/assets/img/banner-2.jpg')+')'}" data-overlay="9">
            <div class="container">
                <div class="row direction">

                    <div class="col-lg-7 col-md-9">
                        <div class="ed_detail_wrap light">
                            <div class="ed_header_caption">
                                <h1 class="ed_title font-weight-bold fun_font">{{$t('login_admin')}}</h1>
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
                                    <h2 class="font-weight-bold fun_font">{{$t('login_admin')}}</h2>
                                    <span>{{$t('login_p')}}</span>
                                </div>
                            </div>

                            <div class="ed_view_price pl-4 direction">
                                <div class="form-group">
                                    <label>{{$t('username')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="username" v-model="username"
                                           class="form-control"
                                           :placeholder="$t('username')">
                                    <span class="text-danger text-sm">{{ errors.first('username') }}</span>
                                </div>

                                <div class="form-group">
                                    <label>{{$t('password')}}</label>
                                    <input v-validate="'required'" v-model="password" data-vv-name="password"
                                           type="password"
                                           class="form-control"
                                           placeholder="*******">
                                    <span class="text-danger text-sm">{{ errors.first('password') }}</span>
                                </div>

                            </div>
                            <div class="ed_view_link">
                                <a href="#" class="btn btn-theme enroll-btn"
                                   @click.prevent="submitForm()">{{$t('login')}}
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
    import {ValidationProvider} from 'vee-validate';

    export default {
        name: "Login",
        components: {ValidationProvider},
        data() {
            return {
                username: null,
                password: null,
            }
        },
        computed: {
            validateForm() {
                // return true
                // return !this.errors.any() && this.phone != '' && this.password != '';
            },
        },
        methods: {
            submitForm() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        // if form have no errors
                        this.loginJWT();
                    } else {
                        // form have errors
                    }
                })
            },
            loginJWT() {
                let vm = this;
                vm.$helper.showLoader();
                const payload = {
                    username: vm.username,
                    password: vm.password,
                };
                vm.$store.dispatch('moduleAdmin/loginJWT', payload)
                    .then((response) => {
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

<style scoped>

</style>