<template>

    <!-- ============================ Hero Banner  Start================================== -->
    <div class="image-cover hero_banner hero-inner-2 shadow rlt"
         style="background:#0d1f29" :style="{backgroundImage:'url('+require('@/assets/img/star-banner.png')+')'}"
         data-overlay="0">
        <div class="container">
            <!--<img src="@/assets/img/star-banner.png" alt="">-->
            <!-- Type -->
            <div class="row align-items-center direction">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="transparent" v-if="sliders.length">
                        <h1 class="big-header-capt cl_2 fun_font mb-2"> {{sliders[sliders.length -
                            1].translated.title}}</h1>
                        <p class="mb-4"> {{sliders[sliders.length - 1].translated.description}}</p>
                        <a href="#"
                           @click.prevent="getAuthUser() ? $router.push({name:'search'}) : $router.push({name:'register'}) "
                           class="btn btn-modern mb-3 green_dark">{{$t('enroll_now')}}
                            <span>
                                <i class="ti-arrow-right"></i>
                            </span>
                        </a>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="position-relative hts-100 text-center vw-lg-50">
                        <!--w-50-->
                        <img class="img-fluid rounded rotate_y_180_ar rounded-lg-right-0"
                             v-if="sliders[sliders.length - 1]"
                             :src="sliders[sliders.length - 1].file_path ?sliders[sliders.length - 1].file_path : require('@/assets/img/h-2.png')"
                             alt="Image Description">
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- ============================ Hero Banner End ================================== -->

</template>

<script>
    export default {
        name: "Header",
        data() {
            return {sliders: []}
        },
        mounted() {
            this.getAllSliders();
        },
        methods: {
            prepareFilters() {
                return {
                    lang: this.$i18n.locale
                };
            },
            getAuthUser() {
                return this.$helper.getLocalStorage('userInfo')
            },
            getAllSliders() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = vm.prepareFilters();
                let dispatch = this.$store.dispatch('moduleSlider/getAllSliders', filters);
                dispatch.then((response) => {
                    response = response.data;
                    let sliders = this.$store.getters['moduleSlider/getAllSliders'];
                    vm.sliders = sliders;
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            }
        }
    }
</script>

<style scoped>

</style>