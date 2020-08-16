<template>
    <div>
        <!--{{categories}}-->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('all_teachers')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('all_teachers')}}</h2>
                        </div>
                    </div>
                    <div class="dashboard_container_header">
                        <div class="dashboard_fl_1">
                            <ul>
                                <li class="list-inline-item">
                                    <button class="btn btn-danger-light"
                                            v-if="$helper.hasAccessPermission('create-teacher')"
                                            @click="$router.push({name:'add_teachers'})">
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
                        <div class="dashboard_fl_2">
                            <ul class="mb0">
                                <li class="list-inline-item">
                                    <form class="form-inline my-2 my-lg-0" dir="ltr"
                                          @submit.prevent="getAllTeachers()">
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
                    <div class="dashboard_container_body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class="thead-default">
                                <tr>
                                    <th class="text-left ">#</th>
                                    <th class="text-left ">{{$t('name')}}</th>
                                    <th class="text-left ">{{$t('phone')}}</th>
                                    <th class="text-left ">{{$t('email')}}</th>
                                    <th class="text-left " width="100px">{{$t('operation')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{{1}}</td>
                                    <td>محمد عوض</td>
                                    <td>+965 000 00 000</td>
                                    <td>example@gmail.com</td>
                                    <td>
                                        <div class="btn-group direction-inverse">
                                            <button class="btn custom_btn btn-primary-light"
                                                    v-if="$helper.hasAccessPermission('delete-teacher')"
                                                    @click="deleteTeacher(1)">
                                                {{$t('delete')}}
                                            </button>
                                            <button class="btn custom_btn btn-success-light"
                                                    v-if="$helper.hasAccessPermission('update-teacher')"
                                                    @click="$router.push({name:'edit_teacher',params:{id:1}})">
                                                {{$t('edit')}}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(teacher , index) in teachers" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{teacher.name}}</td>
                                    <td>{{teacher.username}}</td>
                                    <td>{{teacher.email}}</td
                                    <td>
                                        <div class="btn-group direction-inverse">
                                            <button class="btn custom_btn btn-primary-light"
                                                    v-if="$helper.hasAccessPermission('delete-teacher')"
                                                    @click="deleteTeacher(teacher.id)">
                                                {{$t('delete')}}
                                            </button>
                                            <button class="btn custom_btn btn-success-light"
                                                    v-if="$helper.hasAccessPermission('update-teacher')"
                                                    @click="$router.push({name:'edit_teachers',params:{id:teacher.id}})">
                                                {{$t('edit')}}
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
                teachers: [],
                query: null,
            }
        },
        mounted() {
            this.getAllTeachers();
        },
        methods: {
            prepareFilters() {
                return {
                    query: this.query
                };
            },
            getAllTeachers() {
                let vm = this;
                // vm.$helper.showLoader();
                // let filters = vm.prepareFilters();
                // let dispatch = this.$store.dispatch('moduleAdmin/fetchAdmin', filters);
                // dispatch.then((response) => {
                //     vm.admins = this.$store.getters['moduleAdmin/getAllAdmins'];
                //     vm.$helper.hideLoader();
                // }).catch((error) => {
                //     vm.$helper.handleError(error, vm);
                //     vm.$helper.hideLoader();
                // });
            },
            deleteTeacher(id) {
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
                        // vm.deleteRequest(id)
                    }
                });
            },
            deleteRequest(id) {
                let vm = this;
                vm.$helper.showLoader();
                let dispatch = this.$store.dispatch('moduleAdmin/removeAdmin', {
                    ids: [id]
                });
                dispatch.then((response) => {
                    vm.$helper.hideLoader();
                    vm.admins = vm.$helper.deleteMulti([id], vm.admins);
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