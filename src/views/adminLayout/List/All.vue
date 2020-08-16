<template>
    <div>
        <!--{{categories}}-->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('all_lists')}}
                        </li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="dashboard_container">
                    <div class="row">
                        <div class="col-12 pt-3">
                            <h2 class="font-weight-bold fun_font text-center">{{$t('all_lists')}}</h2>
                        </div>
                        <div class="col-md-6 text-center text-md-left">
                            <ul>
                                <li class="list-inline-item">
                                    <button class="btn btn-danger-light"
                                            v-if="$helper.hasAccessPermission('create-list')"
                                            @click="$router.push({name:'add_lists'})">
                                        <i class="ti-plus"></i>
                                        {{$t('add')}}
                                    </button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-warning-light" @click="$router.push({name:'all_courses'})"
                                            v-if="$helper.hasAccessPermission('all-course')">
                                        {{$t('all_courses')}}
                                    </button>
                                </li>
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
                                                  @submit.prevent="getAllLists()">
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
                    <div class="dashboard_container_body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class="thead-default">
                                <tr>
                                    <th class="text-left ">#</th>
                                    <th class="text-left ">{{$t('title_ar')}}</th>
                                    <th class="text-center">{{$t('rating')}}</th>
                                    <th class="text-center ">{{$t('all_register_students')}}</th>
                                    <th class="text-left " width="100px">{{$t('operation')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(list , index) in lists" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{list.title_ar}}</td>
                                    <td class="text-center">
                                        <h4 class="font-weight-bold">4/5</h4>
                                        <button class="btn btn-outline-info btn-sm" @click="showRating()">
                                            {{$t('show_rating')}}
                                        </button>
                                    </td>
                                    <td class="text-center">
                                        <div class="font-weight-bold">{{list.price}}</div>
                                        <button class="btn btn-outline-warning btn-sm">{{$t('show_list')}}</button>
                                    </td>
                                    <td>
                                        <div class="btn-group direction-inverse">
                                            <button class="btn custom_btn btn-primary-light"
                                                    @click="deleteList(list.id)">
                                                {{$t('delete')}}
                                            </button>
                                            <button class="btn custom_btn btn-success-light"
                                                    v-if="$helper.hasAccessPermission('delete-list')"
                                                    @click="$router.push({name:'edit_lists',params:{id:list.id}})">
                                                {{$t('edit')}}
                                            </button>
                                            <button class="btn custom_btn btn-danger-light"
                                                    v-if="$helper.hasAccessPermission('all-course')"
                                                    @click="$router.push({name:'all_courses',query:{list_id:list.id}})">
                                                {{$t('all_courses')}}
                                            </button>
                                            <button class="btn custom_btn btn-warning-light"
                                                    v-if="$helper.hasAccessPermission('update-list')"
                                                    @click="$router.push({name:'add_courses',params:{list_id:list.id}})">
                                                {{$t('add_courses')}}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <sweet-modal ref="ratingModal" :title="$t('show_rating')">
            <u-animate-container>
                <div class="row">
                    <div class="col-md-12" v-for="(list , index) in [1,2,3,4,5]" :key="index">
                        <u-animate
                                name="bounceInDown"
                                :delay="index/10+'s'"
                                duration="1s"
                                :iteration="1"
                                :offset="0"
                                animateClass="animated"
                                :begin="false"
                        >
                            <div class="card mb-2 mt-0 p-3">
                                <div class="card-body">
                                    <div class="row direction text-left">
                                        <div class="col-md-6">
                                            <div class="d-flex">
                                                <div style="flex: 1">
                                                    <img :src="require('@/assets/img/adult-learning.png')"
                                                         width="70px" alt="">
                                                </div>
                                                <div class="pr-1 pl-1" style="flex: 3">
                                                    <h4>{{$t('student_name')}}</h4>
                                                    <p>محمد عبدالله نصر</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 text-right">
                                            <div v-html="$helper.getRate(index+1)"></div>
                                        </div>
                                        <div class="col-md-12">
                                            <p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص
                                                من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص
                                                الأخرى</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </u-animate>
                    </div>
                </div>
            </u-animate-container>
        </sweet-modal>
    </div>
</template>

<script>
    import {SweetModal} from 'sweet-modal-vue'

    export default {
        name: "All",
        components: {SweetModal},
        data() {
            return {
                lists: [],
                query: null,
            }
        },
        mounted() {
            this.getAllLists();
        },
        methods: {
            showRating() {
                this.$refs.ratingModal.open()
            },
            prepareFilters() {
                return {
                    query: this.query
                };
            },
            getAllLists() {
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
            deleteList(id) {
                let vm = this;
                vm.$swal({
                    title: vm.$t('warning'),
                    text: vm.$t('are_you_sure'),
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: vm.$t('yes'),
                    cancelButtonText: vm.$t('no'),
                }).then((result) => {
                    if (result.value) {
                        vm.deleteRequest(id)
                    }
                });
            },
            deleteRequest(id) {
                let vm = this;
                vm.$helper.showLoader();
                let dispatch = this.$store.dispatch('moduleList/removeList', {
                    ids: [id]
                });
                dispatch.then((response) => {
                    vm.$helper.hideLoader();
                    vm.lists = vm.$helper.deleteMulti([id], vm.lists);
                    location.reload()
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