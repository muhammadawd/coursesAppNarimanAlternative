<template>
    <div>
        <!--{{categories}}-->
        <div class="row ">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb d-print-none">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>
                            {{$t('getAllListReport')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('getAllListReport')}}</h2>
                        </div>
                    </div>
                    <div class="row p-2 mb-2 d-print-none">
                        <div class="col-md-4">
                            <div class="dashboard_container_header" style="border: 0;">
                                <div class="dashboard_fl_2">
                                    <label class="font-weight-bold">{{$t('search')}}</label>
                                    <form class="form-inline my-2 my-lg-0" dir="ltr"
                                          @submit.prevent="getAllLists()">
                                        <input class="form-control" type="search" :placeholder="$t('search')"
                                               v-model="query"
                                               aria-label="Search"/>
                                        <button class="btn my-2 my-sm-0" type="submit">
                                            <i class="ti-search"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 text-center">
                            <button class="btn btn-success-light" @click="getAllLists()">{{$t('filter')}}</button>
                            <button class="btn btn-danger-light" @click="print()">{{$t('print')}}</button>
                        </div>
                    </div>
                    <div class="row p-2 text-center" style="justify-content: center;">
                        <div class="col-4 d-none d-print-inline-block" v-if="query">
                            <div class="card">
                                <div class="card-body bg-primary text-white">
                                    <label class="font-weight-bold pt-2">{{$t('search')}}</label>
                                    <p>{{query}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dashboard_container_body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead class="thead-default">
                                <tr>
                                    <th class="text-left">#</th>
                                    <th class="text-left">{{$t('list')}}</th>
                                    <!--<th class="text-left">{{$t('course')}}</th>-->
                                    <th class="text-left">{{$t('views')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(list , index) in lists" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{list.translated.title}}</td>
                                    <!--<td>{{list.watch_number}}</td>-->
                                    <td>{{list.watch_number}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="text-center" v-if="last_page > 1">
                            <paginate
                                    :page-count="last_page"
                                    :page-range="3"
                                    :click-handler="handlePaginate"
                                    :prev-text="'Prev'"
                                    :next-text="'Next'"
                                    :container-class="'pagination'"
                                    :page-class="'page-item'">
                            </paginate>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {SweetModal} from 'sweet-modal-vue'
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        name: "All",
        components: {SweetModal, flatPickr},
        data() {
            return {
                lists: [],
                selectedList: null,
                users: [],
                user: null,
                query: null,
                page: 1,
                last_page: 1,
            }
        },
        mounted() {
            this.getAllLists();
        },
        watch: {
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
            handlePaginate(pageNum) {
                this.page = pageNum;
                this.getAllLists();
            },
            prepareFilters() {
                return {
                    query: this.query,
                    page: this.page,
                    // paginated: true,
                    // limit: 1,
                };
            },
        }
    }
</script>

<style>
    .sweet-modal .sweet-title > h2 {
        padding-top: 15px;
    }

    .multiselect__select {
        height: 55px;
    }

    .multiselect__tags {
        min-height: 55px;
        padding: 15px 40px 0 8px;
    }
</style>