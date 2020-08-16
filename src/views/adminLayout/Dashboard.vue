<template>
    <div v-if="response">
        <div class="dashboard_container p-2 mt-2">
            <div class="dashboard_container_body">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="dashboard_stats_wrap widget-4">
                            <div class="dashboard_stats_wrap_content">
                                <h4>{{response.total_lists}}</h4>
                                <span>{{$t('total_lists')}}</span>
                            </div>
                            <div class="dashboard_stats_wrap-icon">
                                <i class="ti-list"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="dashboard_stats_wrap widget-2">
                            <div class="dashboard_stats_wrap_content">
                                <h4>{{response.total_subscribes}}</h4>
                                <span>{{$t('total_subscribes')}}</span>
                            </div>
                            <div class="dashboard_stats_wrap-icon">
                                <i class="ti-money"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="dashboard_stats_wrap widget-4">
                            <div class="dashboard_stats_wrap_content">
                                <h4>{{response.current_subscribes_count}}</h4>
                                <span>{{$t('total_subscribes_count')}}</span>
                            </div>
                            <div class="dashboard_stats_wrap-icon">
                                <i class="ti-ticket"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="dashboard_stats_wrap widget-2">
                            <div class="dashboard_stats_wrap_content">
                                <h4>{{response.total_subscribes_count}}</h4>
                                <span>{{$t('total_subscribes_count')}}</span>
                            </div>
                            <div class="dashboard_stats_wrap-icon">
                                <i class="ti-ticket"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="dashboard_stats_wrap widget-4">
                            <div class="dashboard_stats_wrap_content">
                                <h4>{{response.total_users}}</h4>
                                <span>{{$t('total_users')}}</span>
                            </div>
                            <div class="dashboard_stats_wrap-icon">
                                <i class="ti-user"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dashboard_container p-2 mt-2">
            <div class="dashboard_container_body">
                <div class="row" style="justify-content: center">
                    <div class="col-md-4" v-if="data_collection_1">
                        <h3 class="text-center">{{$t('top_list')}}</h3>
                        <donut-chart
                                id="donut"
                                :data="data_collection_1"
                                colors='[ "#FF6384", "#36A2EB", "#FFCE56", "#1b2132", "#9c27b0" ]'
                                resize="true">
                        </donut-chart>
                    </div>
                    <div class="col-md-4" v-if="data_collection_3">
                        <h3 class="text-center">{{$t('top_list_seen')}}</h3>
                        <donut-chart
                                id="donut2"
                                :data="data_collection_3"
                                colors='[ "#FF6384", "#36A2EB", "#FFCE56", "#1b2132", "#9c27b0" ]'
                                resize="true">
                        </donut-chart>
                    </div>
                    <div class="col-md-12" v-if="data_collection_2">
                        <h3 class="text-center">{{$t('users_month')}}</h3>
                        <bar-chart
                                id="bar"
                                xkey="month"
                                ykey="value"
                                :data="data_collection_2"
                                bar-colors='[ "#36A2EB"]'
                                resize="true">
                        </bar-chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Raphael from 'raphael/raphael'

    global.Raphael = Raphael

    import {DonutChart, BarChart, LineChart, AreaChart} from 'vue-morris'

    export default {
        name: "Dashboard",
        data() {
            return {
                response: null,
                data_collection_1: null,
                data_collection_2: null,
                data_collection_3: null
            }
        },
        components: {DonutChart, BarChart, LineChart, AreaChart},
        mounted() {
            let tokenAdmin = localStorage.getItem("tokenAdmin");
            if (!tokenAdmin) this.$router.push({name: 'login_admin'});

            this.getDashboard();
        },
        methods: {
            fillChartData(c1, c2, c3) {

                this.data_collection_1 = _.map(c1, (data) => {
                    return {label: data.translated.title, value: data.users_count}
                });

                this.data_collection_3 = _.map(c3, (data) => {
                    return {label: data.translated.title, value: data.watch_number}
                });

                let monthes = ['', 'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يوينو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
                this.data_collection_2 = _.map(c2, (data, key) => {
                    return {month: monthes[key], value: data.length}
                });

            },
            getDashboard() {
                let vm = this;
                vm.$helper.showLoader();
                let dispatch = this.$store.dispatch('moduleReport/fetchDashboard', {});
                dispatch.then((response) => {
                    vm.response = response.data.data;
                    vm.fillChartData(vm.response.top_lists, vm.response.users, vm.response.lists)
                    vm.$helper.hideLoader();
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