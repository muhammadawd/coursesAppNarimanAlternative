<!--<template>-->
    <!--<div>-->
        <!--<div class="row">-->
            <!--<div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">-->
                <!--<nav aria-label="breadcrumb">-->
                    <!--<ol class="breadcrumb">-->
                        <!--<li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>-->
                        <!--<li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('all_users')}}-->
                        <!--</li>-->
                    <!--</ol>-->
                <!--</nav>-->
            <!--</div>-->
        <!--</div>-->

        <!--<div class="row">-->
            <!--<div class="col-md-12">-->
                <!--<div class="dashboard_container">-->
                    <!--<div class="row">-->
                        <!--<div class="col-12 pt-3">-->
                            <!--<h2 class="font-weight-bold fun_font text-center">{{$t('all_users')}}</h2>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="dashboard_container_header">-->
                        <!--<div class="dashboard_fl_2">-->
                            <!--<ul class="mb0">-->
                                <!--<li class="list-inline-item">-->
                                    <!--<form class="form-inline my-2 my-lg-0" dir="ltr"-->
                                          <!--@submit.prevent="getAllUsers()">-->
                                        <!--<input class="form-control" type="search" :placeholder="$t('search')"-->
                                               <!--v-model="query"-->
                                               <!--aria-label="Search"/>-->
                                        <!--<button class="btn my-2 my-sm-0" type="submit">-->
                                            <!--<i class="ti-search"></i>-->
                                        <!--</button>-->
                                    <!--</form>-->
                                <!--</li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="dashboard_container_body">-->
                        <!--<div class="table-responsive">-->
                            <!--<table class="table">-->
                                <!--<thead class="thead-default">-->
                                <!--<tr>-->
                                    <!--<th class="text-left ">#</th>-->
                                    <!--<th class="text-left ">{{$t('name')}}</th>-->
                                    <!--<th class="text-left ">{{$t('phone')}}</th>-->
                                    <!--<th class="text-left ">{{$t('email')}}</th>-->
                                    <!--<th class="text-left " width="100px">{{$t('operation')}}</th>-->
                                <!--</tr>-->
                                <!--</thead>-->
                                <!--<tbody>-->
                                <!--<tr v-for="(user , index) in users" :key="index">-->
                                    <!--<td>{{index+1}}</td>-->
                                    <!--<td>{{user.name}}</td>-->
                                    <!--<td>{{user.phone}}</td>-->
                                    <!--<td>{{user.email}}</td>-->
                                    <!--<td>-->
                                        <!--<div class="btn-group direction-inverse">-->
                                            <!--<button class="btn custom_btn btn-primary-light"-->
                                                    <!--@click="deleteUser(user.id)">-->
                                                <!--{{$t('delete')}}-->
                                            <!--</button>-->
                                            <!--<button class="btn custom_btn btn-success-light"-->
                                                    <!--@click="showUser(user.id)">-->
                                                <!--{{$t('show')}}-->
                                            <!--</button>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                <!--</tr>-->
                                <!--</tbody>-->
                            <!--</table>-->
                        <!--</div>-->
                        <!--<div class="text-center" v-if="last_page > 1">-->
                            <!--<paginate-->
                                    <!--:page-count="last_page"-->
                                    <!--:page-range="3"-->
                                    <!--:click-handler="handlePaginate"-->
                                    <!--:prev-text="'Prev'"-->
                                    <!--:next-text="'Next'"-->
                                    <!--:container-class="'pagination'"-->
                                    <!--:page-class="'page-item'">-->
                            <!--</paginate>-->
                        <!--</div>-->

                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<sweet-modal ref="userModal" :title="$t('su_courses')">-->
            <!--<div class="row" v-if="user">-->
                <!--<div class="col-md-6">-->
                    <!--<div class="card">-->
                        <!--<div class="card-body bg-primary text-white text-center">-->
                            <!--<label class="font-weight-bold pt-2">{{$t('name')}}</label>-->
                            <!--<p>{{user.name}}</p>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="col-md-6">-->
                    <!--<div class="card">-->
                        <!--<div class="card-body bg-primary text-white text-center">-->
                            <!--<label class="font-weight-bold pt-2">{{$t('phone')}}</label>-->
                            <!--<p>{{user.phone}}</p>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--&lt;!&ndash;<div class="col-md-6">&ndash;&gt;-->
                <!--&lt;!&ndash;<label class="font-weight-bold">{{$t('email')}}</label>&ndash;&gt;-->
                <!--&lt;!&ndash;<p>{{user.email}}</p>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="col-md-6">&ndash;&gt;-->
                <!--&lt;!&ndash;<label class="font-weight-bold">{{$t('gender')}}</label>&ndash;&gt;-->
                <!--&lt;!&ndash;<p>{{user.gender}}</p>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--<div class="col-md-12">-->
                    <!--<div class="table-responsive">-->
                        <!--<table class="table table-bordered">-->
                            <!--<thead>-->
                            <!--<tr>-->
                                <!--<th class="text-left ">{{$t('title_ar')}}</th>-->
                                <!--<th class="text-left ">{{$t('paid_at')}}</th>-->
                                <!--<th class="text-left ">{{$t('expired_at')}}</th>-->
                            <!--</tr>-->
                            <!--</thead>-->
                            <!--<tbody>-->
                            <!--<tr v-for="(list , key) in user.lists" :key="key">-->
                                <!--<td>{{list.translated.title}}</td>-->
                                <!--<td>{{list.pivot.paid_at}}</td>-->
                                <!--<td>{{list.pivot.expired_at}}</td>-->
                            <!--</tr>-->
                            <!--</tbody>-->
                        <!--</table>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</sweet-modal>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import {SweetModal} from 'sweet-modal-vue'-->

    <!--export default {-->
        <!--name: "All",-->
        <!--components: {SweetModal},-->
        <!--data() {-->
            <!--return {-->
                <!--users: [],-->
                <!--user: null,-->
                <!--query: null,-->
                <!--page: 1,-->
                <!--last_page: 1,-->
            <!--}-->
        <!--},-->
        <!--mounted() {-->
            <!--this.getAllUsers();-->
        <!--},-->
        <!--methods: {-->
            <!--handlePaginate(pageNum) {-->
                <!--this.page = pageNum;-->
                <!--this.getAllUsers();-->
            <!--},-->
            <!--prepareFilters() {-->
                <!--return {-->
                    <!--query: this.query,-->
                    <!--page: this.page,-->
                    <!--paginated: true,-->
                    <!--// limit: 1,-->
                <!--};-->
            <!--},-->
            <!--getAllUsers() {-->
                <!--let vm = this;-->
                <!--vm.$helper.showLoader();-->
                <!--let filters = vm.prepareFilters();-->
                <!--let dispatch = this.$store.dispatch('moduleUser/fetchUser', filters);-->
                <!--dispatch.then((response) => {-->
                    <!--vm.users = response.data.data.users.data;-->
                    <!--vm.last_page = response.data.data.users.last_page;-->
                    <!--vm.$helper.hideLoader();-->
                <!--}).catch((error) => {-->
                    <!--vm.$helper.handleError(error, vm);-->
                    <!--vm.$helper.hideLoader();-->
                <!--});-->
            <!--},-->
            <!--showUser(id) {-->
                <!--let vm = this;-->
                <!--vm.$helper.showLoader();-->
                <!--let dispatch = this.$store.dispatch('moduleUser/findUser', {-->
                    <!--id: id-->
                <!--});-->
                <!--dispatch.then((response) => {-->
                    <!--vm.$helper.hideLoader();-->
                    <!--vm.user = response.data.data.user;-->
                    <!--vm.$refs.userModal.open();-->
                <!--}).catch((error) => {-->
                    <!--vm.$helper.handleError(error, vm);-->
                    <!--vm.$helper.hideLoader();-->
                <!--});-->
            <!--},-->
            <!--deleteUser(id) {-->
                <!--let vm = this;-->
                <!--vm.$swal({-->
                    <!--title: vm.$t('warning'),-->
                    <!--text: vm.$t('are_you_sure'),-->
                    <!--type: 'warning',-->
                    <!--showCancelButton: true,-->
                    <!--confirmButtonColor: '#3085d6',-->
                    <!--cancelButtonColor: '#d33',-->
                    <!--confirmButtonText: vm.$t('yes'),-->
                    <!--cancelButtonText: vm.$t('no'),-->
                <!--}).then((result) => {-->
                    <!--if (result.value) {-->
                        <!--vm.deleteRequest(id)-->
                    <!--}-->
                <!--});-->
            <!--},-->
            <!--deleteRequest(id) {-->
                <!--let vm = this;-->
                <!--vm.$helper.showLoader();-->
                <!--let dispatch = this.$store.dispatch('moduleUser/removeUser', {-->
                    <!--ids: [id]-->
                <!--});-->
                <!--dispatch.then((response) => {-->
                    <!--vm.$helper.hideLoader();-->
                    <!--vm.users = vm.$helper.deleteMulti([id], vm.users);-->
                <!--}).catch((error) => {-->
                    <!--vm.$helper.handleError(error, vm);-->
                    <!--vm.$helper.hideLoader();-->
                <!--});-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style>-->
    <!--.sweet-modal .sweet-title > h2 {-->
        <!--padding-top: 15px;-->
    <!--}-->
<!--</style>-->