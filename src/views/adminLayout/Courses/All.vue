<template>
    <div>
        <!--{{categories}}-->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('all_courses')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('all_courses')}}</h2>
                        </div>
                    </div>
                    <div class="row p-2 mb-2 d-print-none">
                        <div class="col-md-4">
                            <label class="font-weight-bold">{{$t('list')}}</label>
                            <multiselect v-model="selectedList" :options="lists"
                                         track-by="id"
                                         :placeholder="$t('select_list')"
                                         :custom-label="nameWithLang"></multiselect>
                        </div>
                        <div class="col-md-4">
                            <label class="font-weight-bold">{{$t('search')}}</label>
                            <input class="form-control w-100" type="search" :placeholder="$t('search')"
                                   v-model="query"
                                   aria-label="Search"/>
                        </div>
                        <div class="col-md-12 text-center mt-2">
                            <button class="btn btn-success-light" @keyup.enter="getAllCourses()"
                                    @click="getAllCourses()">{{$t('filter')}}
                            </button>
                            <!--<button class="btn btn-danger-light" @click="print()">{{$t('print')}}</button>-->
                        </div>
                    </div>
                    <div class="dashboard_container_body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class="thead-default">
                                <tr>
                                    <th class="text-left ">#</th>
                                    <th class="text-left ">{{$t('list')}}</th>
                                    <th class="text-left ">{{$t('title_ar')}}</th>
                                    <th class="text-left ">{{$t('title_en')}}</th>
                                    <th class="text-left " width="100px">{{$t('operation')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(course , index) in courses" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>
                                        <slot v-if="course.list">
                                            {{course.list.translated.title}}
                                        </slot>
                                    </td>
                                    <td>{{course.title_ar}}</td>
                                    <td>{{course.title_en}}</td>
                                    <td>
                                        <div class="btn-group direction-inverse">
                                            <button class="btn custom_btn btn-primary-light"
                                                    v-if="$helper.hasAccessPermission('delete-course')"
                                                    @click="deleteCourse(course.id)">
                                                {{$t('delete')}}
                                            </button>
                                            <button class="btn custom_btn btn-success-light"
                                                    v-if="$helper.hasAccessPermission('update-course')"
                                                    @click="$router.push({name:'edit_courses',params:{id:course.id}})">
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
                lists: [],
                selectedList: null,
                courses: [],
                query: null,
            }
        },
        mounted() {
            this.getAllLists();
            this.getAllCourses();
        },
        methods: {
            nameWithLang(o) {
                return o.translated.title;
            },
            print() {
                window.print();
            },
            getAllLists() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = {};
                let dispatch = this.$store.dispatch('moduleList/getAllList', filters);
                dispatch.then((response) => {
                    let lists = this.$store.getters['moduleList/getAllList'];
                    vm.lists = lists;
                    let list_id = this.$route.query.list_id;
                    if (list_id) {
                        _.forEach(lists, (list) => {
                            if (list.id == list_id) {
                                vm.selectedList = list
                            }
                        })

                    }
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            },
            prepareFilters() {
                let list_id = this.selectedList ? this.selectedList.id : (this.$route.query.list_id);
                return {
                    query: this.query,
                    list_id: list_id
                };
            },
            getAllCourses() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = vm.prepareFilters();
                let dispatch = this.$store.dispatch('moduleCourse/getAllCourses', filters);
                dispatch.then((response) => {
                    vm.courses = this.$store.getters['moduleCourse/getAllCourses'];
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            },
            deleteCourse(id) {
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
                let dispatch = this.$store.dispatch('moduleCourse/removeCourse', {
                    ids: [id]
                });
                dispatch.then((response) => {
                    vm.$helper.hideLoader();
                    vm.courses = vm.$helper.deleteMulti([id], vm.courses);
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            }
        }
    }
</script>

<style>
    .multiselect__select {
        height: 55px;
    }

    .multiselect__tags {
        min-height: 55px;
        padding: 15px 40px 0 8px;
    }
</style>