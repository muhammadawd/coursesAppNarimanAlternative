<template>
    <div class="container">
        <u-animate-container>
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header border-bottom-1">
                            <h4 class="font-weight-bold">{{$t('my_courses')}} (2)</h4>
                        </div>
                        <div class="card-body">
                            <div class="p-2" v-for="(list,index) in [1,2]" :key="index">
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
                                        <div class="col-md-6">
                                            <div class="d-flex">
                                                <div class="text-center" style="flex: 1">
                                                    <img :src="require('@/assets/img/3180572.png')"
                                                         width="60px" alt="">
                                                </div>
                                                <div style="flex: 6">
                                                    <h4>{{$t('course')}}</h4>
                                                    <p>A Neural Network-Based Ensemble Real-Time Detection of Drifted
                                                        Twitter Spam
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4"></div>
                                        <div class="col-md-2">
                                            <div class="text-right direction-inverse">
                                                <i class="ti-calendar text-danger theme-cl"></i>
                                                <span class="font-weight-bold text-dark text-small">
                                                    21-05-2019
                                                </span>
                                            </div>
                                            <div class="text-right pt-2 direction-inverse">
                                                <i class="ti-user text-danger theme-cl"></i>
                                                <span class="font-weight-bold text-dark text-small">
                                                    50 Student
                                                </span>
                                            </div>
                                            <div class="text-right pt-2 direction-inverse">
                                                <i class="ti-credit-card text-danger theme-cl"></i>
                                                <span class="font-weight-bold text-dark text-small">
                                                    50 KWD
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-12" v-if="index < [1,2].length -1">
                                            <hr class="hr_bg">
                                        </div>
                                    </div>
                                </u-animate>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header border-bottom-1">
                            <h4 class="font-weight-bold">{{$t('my_discussion')}} (5)</h4>
                        </div>
                        <div class="card-body">
                            <div class="p-2" v-for="(list,index) in [1,2]" :key="index">
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
                                            <div class="row">
                                                <div class="col-md-8">
                                                    <h4 class="text-danger">
                                                        <i class="ti-user text-danger"></i>
                                                        عبدالله محمد احمد
                                                    </h4>
                                                    <p>
                                                        هذا النص تجريبي يستبدل لاحقا
                                                        هذا النص تجريبي يستبدل لاحقا
                                                    </p>
                                                </div>
                                                <div class="col-md-4 direction-inverse text-right">
                                                    <div>
                                                        <i class="ti-calendar text-danger theme-cl"></i><span
                                                            class="font-weight-bold text-dark text-small"> 21-05-2019 </span>
                                                    </div>
                                                    <div>
                                                        <label class="badge badge-danger">فرنسية</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12" v-if="index < [1,2].length -1">
                                            <hr class="hr_bg">
                                        </div>
                                    </div>
                                </u-animate>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header border-bottom-1">
                            <h4 class="font-weight-bold">{{$t('my_assignments')}} (2)</h4>
                        </div>
                        <div class="card-body">
                            <div class="p-2" v-for="(list,index) in [1,2]" :key="index">
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
                                            <div class="row">
                                                <div class="col-md-8">
                                                    <h4 class="text-danger">
                                                        <i class="ti-user text-danger"></i>
                                                        عبدالله محمد احمد
                                                    </h4>
                                                    <h6>واجب الدرس الاول</h6>
                                                </div>
                                                <div class="col-md-4 direction-inverse text-right">
                                                    <div>
                                                        <i class="ti-calendar text-danger theme-cl"></i><span
                                                            class="font-weight-bold text-dark text-small"> 21-05-2019 </span>
                                                    </div>
                                                    <div>
                                                        <label class="badge badge-danger">فرنسية</label>
                                                    </div>
                                                </div>
                                                <div class="col-12 text-center">
                                                    <button class="btn btn-danger-light btn-sm">
                                                        {{$t('show_file')}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12" v-if="index < [1,2].length -1">
                                            <hr class="hr_bg">
                                        </div>
                                    </div>
                                </u-animate>
                            </div>
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

    .text-small {
        font-size: 14px;
        padding: 0 5px;
    }
</style>