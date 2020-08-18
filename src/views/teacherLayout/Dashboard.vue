<template>
    <div class="container">
        <u-animate-container>
            <div class="row mt-2">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header border-bottom-1">
                            <h4 class="font-weight-bold">{{$t('my_courses')}} (5)</h4>
                        </div>
                        <div class="card-body">
                            <div class="p-2" v-for="(list,index) in [1,2,3,4]" :key="index">
                                <u-animate
                                        name="bounceInDown"
                                        :delay="index/10+'s'"
                                        duration="1s"
                                        :iteration="1"
                                        :offset="0"
                                        animateClass="animated"
                                        :begin="false"
                                >
                                    <div @click="$router.push({name:'teacher_dashboard_courses',params:{id:1}})"
                                         class="row direction text-left pointer">
                                        <div class="col-md-12">
                                            <div class="d-flex">
                                                <div class="text-center" style="flex: 1">
                                                    <img :src="require('@/assets/img/3180572.png')"
                                                         width="60px" alt="">
                                                </div>
                                                <div style="flex: 4">
                                                    <h4>{{$t('course')}}</h4>
                                                    <p>A Neural Network-Based Ensemble Real-Time Detection of Drifted
                                                        Twitter Spam
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12" v-if="index < [1,2,3,4].length -1">
                                            <hr class="hr_bg">
                                        </div>
                                    </div>
                                </u-animate>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-12">
                            <u-animate
                                    name="fadeInDown"
                                    delay="0.5s"
                                    duration="1s"
                                    :iteration="1"
                                    :offset="0"
                                    animateClass="animated"
                                    :begin="false">
                                <div class="card bg-danger pt-4 pb-4 pointer"
                                     @click="$router.push({name:'teacher_dashboard_courses',params:{id:1}})">
                                    <div class="card-body text-center text-white">
                                        <div class="p-2">
                                            <i class="ti-comment fa-3x"></i>
                                            <h3 class="text-white pt-1">{{$t('my_discussion')}}</h3>
                                        </div>
                                    </div>
                                </div>
                            </u-animate>
                        </div>
                        <div class="col-md-12">
                            <u-animate
                                    name="fadeInDown"
                                    delay="0.75s"
                                    duration="1s"
                                    :iteration="1"
                                    :offset="0"
                                    animateClass="animated"
                                    :begin="false">
                                <div class="card bg-warning pt-4 pb-4 pointer"
                                     @click="$router.push({name:'teacher_dashboard_courses',params:{id:1}})">
                                    <div class="card-body text-center text-white">
                                        <div class="p-2">
                                            <i class="ti-file fa-3x"></i>
                                            <h3 class="text-white pt-1">{{$t('my_assignments')}}</h3>
                                        </div>
                                    </div>
                                </div>
                            </u-animate>
                        </div>
                    </div>
                </div>
            </div>
        </u-animate-container>
    </div>
</template>

<script>


    export default {
        name: "Teacher Dashboard",
        data() {
            return {}
        },
        mounted() {
        },
    }
</script>

<style>
    .border-bottom-1 {
        border-bottom: 1px solid #ccc;
    }

    .pointer {
        cursor: pointer;
    }

    .hr_bg {
        height: 1px;
        border: 0;
        background: linear-gradient(to right, #fff, #555, #fff);
    }
</style>