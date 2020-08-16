<template>

    <!-- ============================== Start Newsletter ================================== -->
    <section class="bg-cover newsletter inverse-theme"
             :style="{backgroundImage:'url('+require('@/assets/img/banner-2.jpg')+')'}"
             style="background-attachment:fixed"
             data-overlay="9">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 col-md-8 col-sm-12">
                    <div class="text-center">
                        <h1 class="fun_font font-weight-bold text-white">{{$t('news_letter_head')}}</h1>
                        <p>{{$t('news_letter_p')}}</p>
                        <form class="sup-form direction" @submit.prevent="submitNewsLetter()">
                            <input type="text" class="form-control sigmup-me" v-model="email"
                                   :placeholder="$t('type_your_email')">
                            <input type="submit" class="btn btn-theme text-white" :value="$t('get_start')">
                        </form>
                        <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- ================================= End Newsletter =============================== -->

</template>

<script>
    export default {
        name: "newsLetter",
        data() {
            return {
                email: null
            }
        },
        mounted() {

        },
        methods: {
            submitNewsLetter() {
                let vm = this;
                vm.$helper.showLoader();
                const payload = {
                    email: vm.email,
                };
                vm.$store.dispatch('moduleSubscribe/createSubscribe', payload)
                    .then((response) => {
                        response = response.data;
                        vm.$helper.hideLoader()
                        vm.$helper.showMessage('success', vm, this.$t('subscribe_msg'))
                        vm.email = null;
                    })
                    .catch(error => {
                        vm.$helper.handleError(error, vm);
                        vm.$helper.hideLoader()
                    })

            }
        }
    }
</script>

<style scoped>

</style>