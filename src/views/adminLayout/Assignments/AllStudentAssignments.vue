<template>
    <div>
        <!--{{categories}}-->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('all_assignments')}}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="dashboard_container mb-0">
                    <div class="row">
                        <div class="col-12 pt-3">
                            <h2 class="font-weight-bold fun_font text-center">{{$t('show_student_assignment')}}</h2>
                        </div>
                        <div class="col-md-6 text-center text-md-left">
                            <ul>
                                <!--<li class="list-inline-item">-->
                                <!--<button class="btn btn-danger-light"-->
                                <!--v-if="$helper.hasAccessPermission('create-list')"-->
                                <!--@click="$router.push({name:'add_lists'})">-->
                                <!--<i class="ti-plus"></i>-->
                                <!--{{$t('add')}}-->
                                <!--</button>-->
                                <!--</li>-->
                                <!--<li class="list-inline-item">-->
                                <!--<button class="btn btn-warning-light">-->
                                <!--<i class="ti-printer"></i>-->
                                <!--{{$t('print')}}-->
                                <!--</button>-->
                                <!--</li>-->
                            </ul>
                        </div>
                        <div class="col-md-6">

                            <div class="dashboard_container_header">
                                <div class="dashboard_fl_1"></div>
                                <div class="dashboard_fl_2">
                                    <ul class="mb0">
                                        <li class="list-inline-item">
                                            <form class="form-inline my-2 my-lg-0" dir="ltr"
                                                  @submit.prevent="getAllAssignments()">
                                                <input class="form-control" type="search" :placeholder="$t('search')"
                                                       v-model="query"
                                                       aria-label="Search"/>
                                                <button class="btn my-2 my-sm-0" type="submit">
                                                    <i class="ti-search"></i>
                                                </button>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <u-animate-container>
            <div class="row">
                <div class="col-md-12" v-for="(list , index) in lists" :key="index">
                    <u-animate
                            name="bounceInDown"
                            :delay="index/10+'s'"
                            duration="1s"
                            :iteration="1"
                            :offset="0"
                            animateClass="animated"
                            :begin="false"
                    >
                        <div class="card mb-2 p-3">
                            <div class="card-body">
                                <div class="row direction text-left">
                                    <div class="col-md-6">
                                        <div class="d-flex">
                                            <div style="flex: 1">
                                                <img :src="require('@/assets/img/adult-learning.png')"
                                                     width="100px" alt="">
                                            </div>
                                            <div style="flex: 3">
                                                <h4>{{$t('student_name')}}</h4>
                                                <p>محمد عبدالله نصر</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <h5 class="bold">{{$t('date')}} : 2012-05-05</h5>
                                        <button class="btn btn-danger-light">
                                            <i class="ti ti-file"></i>
                                            {{$t('show_file')}}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </u-animate>
                </div>
            </div>
        </u-animate-container>

    </div>
</template>

<script>
    export default {
        name: "All",
        data() {
            return {
                lists: [],
                query: null,
            }
        },
        mounted() {
            this.getAllAssignments();
        },
        methods: {
            prepareFilters() {
                return {
                    query: this.query
                };
            },
            getAllAssignments() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = vm.prepareFilters();
                let dispatch = this.$store.dispatch('moduleList/getAllList', filters);
                dispatch.then((response) => {
                    vm.lists = this.$store.getters['moduleList/getAllList'];
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