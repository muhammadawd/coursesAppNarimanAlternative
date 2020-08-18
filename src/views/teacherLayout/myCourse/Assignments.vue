<template>
    <div>
        <Navigation/>

        <u-animate-container>
            <div class="row">
                <div class="col-md-12">
                    <div class="card pt-0 mt-0">
                        <div class="card-header border-bottom-1">
                            <h4 class="font-weight-bold">{{$t('my_assignments')}} (0)</h4>
                        </div>
                        <div class="card-body">
                            <div class="p-5 text-center">
                                <i class="ti-book fa-3x color--primary"></i>
                                <h3>{{$t('no_data')}}</h3>
                            </div>
                            <div class="p-2" v-for="(list,index) in []" :key="index">
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
                                                    <h4>الدرس الحالى</h4>
                                                    <p>
                                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
                                                        هذا النص من مولد النص العربى ..
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
            </div>
        </u-animate-container>
    </div>
</template>

<script>
    import Navigation from './Navigation'

    export default {
        name: "Discussions",
        components: {Navigation}
    }
</script>

<style>
    section {
        padding: 0;
    }
</style>