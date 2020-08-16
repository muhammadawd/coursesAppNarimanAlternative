<template>
    <div class="gray mb-4">
        <div class="page-title shadow mt-2">
            <div class="container bg-white pt-4">
                <div class="row">
                    <div class="col-lg-12 col-md-12">

                        <div class="breadcrumbs-wrap">
                            <h1 class="breadcrumb-title">{{$t('search')}}</h1>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item active" aria-current="page">"{{query}}"</li>
                                </ol>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="container bg-white mt-3 pt-3 mb-4">
            <div class="row direction">
                <div class="col-lg-4 col-md-12 col-sm-12 order-2 order-lg-1 order-md-2">
                    <div class="page_sidebar hide-23">
                        <!-- Search Form -->
                        <form class="form-inline addons mb-3 text-left" dir="ltr" @submit.prevent="triggerSearch()">
                            <div class="form-group w-100">
                                <input class="form-control" type="search" v-model="query"
                                       :placeholder="$t('search_query')"
                                       style="width: 88%">
                                <button class="btn my-2 my-sm-0" type="submit"><i class="ti-search"></i></button>
                            </div>
                        </form>

                        <h4 class="side_title">{{$t('course_categories')}}</h4>
                        <ul class="no-ul-list mb-3">
                            <li v-for="(category , index) in getAllCategories">
                                <input :id="'aa-'+category.id" class="checkbox-custom" :name="'aa-'+category.id"
                                       type="checkbox"
                                       v-model="category_ids" :value="category.id">
                                <label :for="'aa-'+category.id"
                                       class="checkbox-custom-label">{{category.translated.title}}</label>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="col-lg-8 col-md-12 col-sm-12 order-1 order-lg-2 order-md-1">

                    <!-- Row -->
                    <div class="row align-items-center mb-3">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            {{$t('we_found')}} <strong>{{total}}</strong> {{$t('course_for_you')}}
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 ordering">
                            <div class="filter_wraps">
                                <div class="dn db-991 mt30 mb0 show-23">
                                    <div id="main2">
                                        <a href="javascript:void(0)" class="btn btn-theme arrow-btn filter_open"
                                           @click="openNav()" id="open2">{{$t('show_filter')}}<span><i
                                                class="fas fa-arrow-alt-circle-right"></i></span></a>
                                    </div>
                                </div>
                                <!--<div class="dropdown show">-->
                                <!--<a class="btn btn-custom dropdown-toggle" href="#" role="button"-->
                                <!--data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                                <!--Recent Courses-->
                                <!--</a>-->
                                <!--</div>-->
                            </div>
                        </div>
                    </div>
                    <!-- /Row -->

                    <div class="row">
                        <!-- Cource Grid 1 -->
                        <div v-for="(item , index) in lists" :key="index" class="col-lg-6 col-md-6 col-sm-6">
                            <div class="education_block_grid style_2" style="cursor: pointer"
                                 @click="$router.push({name:'course_detail',params:{id:item.id}})">
                                <div class="education_block_thumb n-shadow">
                                    <img :src="item.image_path ? item.image_path :  require('@/assets/img/banner-2.jpg')"
                                         class="img-fluid"
                                         alt="">
                                </div>
                                <div class="education_block_body">
                                    <h4 class="bl-title">
                                        {{item.translated.title}}
                                    </h4>
                                </div>
                                <div class="cources_info">
                                    <div class="cources_info_first">
                                        <ul>
                                            <li><strong>{{item.watch_number}} {{$t('views')}}</strong></li>
                                            <li class="theme-cl">{{item.hours_number}} {{$t('time')}}</li>
                                        </ul>
                                    </div>
                                    <div class="cources_info_last">
                                        <h3>
                                            <del style="font-size: 15px">{{item.price_before_discount}}</del>
                                            {{item.price}} {{$t('currency')}}
                                        </h3>
                                    </div>
                                </div>

                                <div class="education_block_footer">
                                    <div class="education_block_author">
                                        <div class="path-img">
                                            <img
                                                    :src="require('@/assets/img/user-2.jpg')" class="img-fluid" alt="">
                                        </div>
                                        <h5>{{$t('nariman_saad')}}</h5>
                                    </div>
                                    <span class="education_block_time"><i class="ti-calendar mr-1"></i>{{item.created_at}}</span>
                                </div>

                            </div>
                        </div>

                    </div>

                    <!-- Row -->
                    <div class="row mb-3 ">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <!-- Pagination -->
                            <infinite-loading @infinite="search">
                                <div slot="no-more"></div>
                                <div slot="no-results">{{$t('no_data')}}</div>
                            </infinite-loading>
                            <h3 class="text-center mt-2" v-if="noData">
                                {{$t('no_result_search')}}
                            </h3>
                        </div>
                    </div>
                    <!-- /Row -->

                </div>
            </div>
            <!-- ============================ Find Courses with Sidebar ================================== -->
            <section class="pt-0">
                <div class="container">

                    <!-- Onclick Sidebar -->
                    <div class="row direction">
                        <div class="col-md-12 col-lg-12">
                            <div id="filter-sidebar" class="filter-sidebar">
                                <div class="filt-head">
                                    <h4 class="filt-first">{{$t('Advanced_option')}}</h4>
                                    <a href="javascript:void(0)" class="closebtn" @click="closeNav()">Close <i
                                            class="ti-close"></i></a>
                                </div>
                                <div class="show-hide-sidebar">

                                    <!-- Find New Property -->
                                    <div class="sidebar-widgets">
                                        <!-- Search Form -->
                                        <form class="form-inline addonss mb-3 text-left" dir="ltr"
                                              @submit.prevent="triggerSearch()">
                                            <div class="form-group w-100">
                                                <input class="form-control text-left" type="search" v-model="query"
                                                       :placeholder="$t('search_query')"
                                                       style="width: 100%">
                                                <button class="btn btn-info btn-block" type="submit"><i
                                                        class="ti-search"></i>
                                                </button>
                                            </div>
                                        </form>

                                        <h4 class="side_title">{{$t('course_categories')}}</h4>
                                        <ul class="no-ul-list mb-3">
                                            <li v-for="(category , index) in getAllCategories">
                                                <input :id="'aa-'+category.id" class="checkbox-custom"
                                                       :name="'aa-'+category.id"
                                                       type="checkbox"
                                                       v-model="category_ids" :value="category.id">
                                                <label :for="'aa-'+category.id"
                                                       class="checkbox-custom-label">{{category.translated.title}}</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div class="gray">&nbsp;.</div>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import newsLetter from './components/Home/newsLetter'

    export default {
        name: "Search",
        components: {InfiniteLoading, newsLetter},
        data() {
            return {
                category_ids: [],
                lists: [],
                noData: false,
                query: null,
                page: 1,
                total: 0,
            }
        },
        mounted() {
            this.query = this.$route.query.query;
        },
        watch: {
            category_ids() {
                this.triggerSearch()
            }
        },
        methods: {
            infiniteHandler($state) {
            },
            openNav() {
                document.getElementById("filter-sidebar").style.width = "320px";
            },
            closeNav() {
                document.getElementById("filter-sidebar").style.width = "0";
            },
            prepareFilters() {
                return {
                    query: this.query,
                    category_ids: this.category_ids,
                    paginated: true,
                    limit: 10,
                    page: this.page
                }
            },
            triggerSearch() {
                this.lists = [];
                this.page = 1;
                this.search(null)
            },
            search($state) {
                let vm = this;
                // vm.$helper.showLoader();
                let filters = vm.prepareFilters();
                let dispatch = this.$store.dispatch('moduleList/getAllList', filters);
                dispatch.then((response) => {
                    response = response.data;
                    vm.total = response.data.lists.total
                    if ($state) {

                        if (response.data.lists.data.length) {
                            this.page += 1;
                            this.lists.push(...response.data.lists.data);
                            $state.loaded();
                        } else {
                            $state.complete();
                        }

                    } else {
                        vm.lists = response.data.lists.data;
                    }
                    if (vm.lists.length == 0) {
                        vm.noData = true;
                    }
                    // vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.noData = true;
                    vm.$helper.handleError(error, vm);
                    // vm.$helper.hideLoader();
                });
            }
        },
        computed: {
            getAllCategories() {
                return this.$store.getters['moduleCategory/getAllCategories'];
            },
        },
    }
</script>

<style scoped>

</style>