<template>
    <div>
        <!--{{categories}}-->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('all_discussions')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('all_discussions')}}</h2>
                        </div>
                        <div class="col-md-6 text-center text-md-left">
                            <ul>
                                <li class="list-inline-item pr-1 ">
                                    <button class="btn btn-danger-light"
                                            v-if="$helper.hasAccessPermission('create-list')"
                                            @click="$router.push({name:'add_discussions'})">
                                        <i class="ti-plus"></i>
                                        {{$t('add')}}
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
                    <div class="dashboard_container_body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class="thead-default">
                                <tr>
                                    <th class="text-left ">#</th>
                                    <th class="text-left ">{{$t('person_name')}}</th>
                                    <th class="text-left ">{{$t('subject_name')}}</th>
                                    <th class="text-left ">{{$t('teacher')}}</th>
                                    <th class="text-left ">{{$t('date')}}</th>
                                    <th class="text-left " width="100px">{{$t('operation')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(list , index) in lists" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>سامح محمود الشريف</td>
                                    <td>{{list.title_ar}}</td>
                                    <td>خالد الناصر</td>
                                    <td>{{list.created_at}}</td>
                                    <td>
                                        <div class="btn-group direction-inverse">
                                            <button class="btn custom_btn btn-danger-light"
                                                    v-if="$helper.hasAccessPermission('delete-discussion')"
                                                    @click="$router.push({name:'show_student_assignment',params:{id:list.id}})">
                                                {{$t('delete')}}
                                            </button>
                                            <button class="btn custom_btn btn-success-light"
                                                    @click="$router.push({name:'add_discussions',query:{list_id:list.id}})">
                                                {{$t('reply')}}
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