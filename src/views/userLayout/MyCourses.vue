<template>
    <div class="gray">
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
                                            {{$t('profile')}} - {{$t('my_courses')}}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-2">
                <div class="dashboard_container container mt-3 direction">
                    <div class="dashboard_container_body p-4 ">
                        <div class="viewer_detail_wraps ">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12" v-if="!lists.length">
                                        <h1 class="text-center mt-5 mb-5">{{$t('no_data')}}</h1>
                                    </div>
                                    <div v-for="(item , index) in lists" :key="index" class="col-md-12" style="cursor: pointer"
                                         @click.prevent="$router.push({name:'course_detail',params:{id:item.id}})">
                                        <!-- Single Course -->
                                        <div
                                                class="dashboard_single_course">
                                            <div class="dashboard_single_course_thumb">
                                                <img :src="item.image_path ? item.image_path :  require('@/assets/img/banner-2.jpg')"
                                                     class="img-fluid" alt="">
                                                <div class="dashboard_action">
                                                    <!--<a href="#" class="btn btn-ect">View</a>-->
                                                </div>
                                            </div>
                                            <div class="dashboard_single_course_caption p-3 pt-0 ">
                                                <div class="dashboard_single_course_head">
                                                    <div class="dashboard_single_course_head_flex">
                                                        <div v-if="item.status">
                                                            <h4 class="fun_font font-weight-bold  text-success">
                                                                {{$t('paid_till')}} <br>
                                                                <span class="text-dark">{{item.expired_at}}</span>
                                                            </h4>
                                                        </div>
                                                        <!--<span class="dashboard_instructor">{{$t('nariman_saad')}}</span>-->
                                                        <h4 class="dashboard_course_title">
                                                            {{item.translated.title}}
                                                        </h4>
                                                    </div>
                                                    <div class="dc_head_right">
                                                        <h4 class="dc_price_rate theme-cl">
                                                            <del style="font-size: 15px">
                                                                {{item.price_before_discount}}
                                                            </del>
                                                            {{item.price}} {{$t('currency')}}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div class="dashboard_single_course_des">
                                                    <p>
                                                        {{item.translated.description}}
                                                    </p>
                                                </div>
                                                <div class="dashboard_single_course_progress">
                                                    <div class="dashboard_single_course_progress_2">
                                                        <ul class="m-0">
                                                            <li class="list-inline-item"><i class="ti-user mr-1"></i>{{item.hours_number}}
                                                                {{$t('views')}}
                                                            </li>
                                                            <li class="list-inline-item"><i
                                                                    class="ti-eye mr-1"></i>{{item.hours_number}}
                                                                {{$t('time')}}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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
        name: "my_courses",
        components: {newsLetter},
        data() {
            return {
                user: null,
                lists: [],

            }
        },
        mounted() {
            this.getUserLists();
        },
        methods: {
            getUserLists() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = {};
                let dispatch = this.$store.dispatch('moduleList/getUserLists', filters);
                dispatch.then((response) => {
                    response = response.data;
                    vm.user = response.data.user;
                    vm.lists = response.data.lists;
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            },
        }
    }
</script>

<style scoped>

</style>