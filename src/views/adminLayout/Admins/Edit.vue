<template>
    <div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('edit_admins')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('edit_admins')}}</h2>
                        </div>
                    </div>
                    <div class="dashboard_container_body p-2">

                        <div class="row">

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('name')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="name" v-model="dataModel.name"
                                           class="form-control"
                                           :placeholder="$t('name')">
                                    <span class="text-danger text-sm">{{ errors.first('name') }}</span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('username')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="username" v-model="dataModel.username"
                                           class="form-control"
                                           :placeholder="$t('username')">
                                    <span class="text-danger text-sm">{{ errors.first('username') }}</span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('password')}}</label>
                                    <input type="password"  data-vv-name="password" v-model="dataModel.password"
                                           class="form-control"
                                           :placeholder="$t('password')">
                                    <span class="text-danger text-sm">{{ errors.first('password') }}</span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('phone')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="phone" v-model="dataModel.phone"
                                           class="form-control"
                                           :placeholder="$t('phone')">
                                    <span class="text-danger text-sm">{{ errors.first('phone') }}</span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('email')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="email" v-model="dataModel.email"
                                           class="form-control"
                                           :placeholder="$t('email')">
                                    <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('role')}}</label>
                                    <select v-validate="'required'" data-vv-name="role_id"
                                            v-model="dataModel.role_id"
                                            class="form-control">
                                        <option v-for="(role , index) in roles" :value="role.id" :key="index">
                                            {{role.translated.title}}
                                        </option>
                                    </select>
                                    <span class="text-danger text-sm">{{ errors.first('role_id') }}</span>
                                </div>
                            </div>

                            <div class="col-md-12 text-center">
                                <button class="btn btn-danger-light" @click="submitForm()">
                                    {{$t('edit')}}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Add",
        data() {
            return {
                roles: [],
                dataModel: {
                    name: '',
                    username: '',
                    password: '',
                    email: '',
                    phone: '',
                    role_id: '',
                }
            }
        },
        mounted() {
            this.getAllRoles();
            this.findRole();
        },
        methods: {
            findRole() {
                let vm = this;
                vm.$helper.showLoader();
                let id = vm.$route.params.id;
                let dispatch = this.$store.dispatch('moduleAdmin/findAdmin', {id: id});
                dispatch.then((response) => {
                    let admin = response.data.data.admin;
                    delete admin.role;
                    vm.dataModel = admin;
                    vm.dataModel.password = '';
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            },
            getAllRoles() {
                let vm = this;
                vm.$helper.showLoader();
                let dispatch = this.$store.dispatch('moduleRole/fetchRole', {});
                dispatch.then((response) => {
                    vm.roles = this.$store.getters['moduleRole/getAllRoles'];
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            },
            submitForm() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        // if form have no errors
                        this.editAdmin();
                    } else {
                        // form have errors
                    }
                })
            },
            editAdmin() {
                let vm = this;
                vm.$helper.showLoader();
                const payload = vm.dataModel;
                vm.$store.dispatch('moduleAdmin/updateAdmin', payload)
                    .then(() => {
                        vm.$helper.hideLoader()
                        vm.$helper.showMessage('success', vm)
                        vm.$router.push({name: 'all_admins'})
                    })
                    .catch(error => {
                        vm.$helper.handleError(error, vm);
                        vm.$helper.hideLoader()
                    })
            },
        }
    }
</script>

<style scoped>

</style>