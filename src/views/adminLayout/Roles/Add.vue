<template>
    <div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('add_roles')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('add_roles')}}</h2>
                        </div>
                    </div>
                    <div class="dashboard_container_body p-2">

                        <div class="row">

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('title_ar')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="title_ar" v-model="dataModel.title_ar"
                                           class="form-control"
                                           :placeholder="$t('title_ar')">
                                    <span class="text-danger text-sm">{{ errors.first('title_ar') }}</span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('title_en')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="title_en" v-model="dataModel.title_en"
                                           class="form-control"
                                           :placeholder="$t('title_en')">
                                    <span class="text-danger text-sm">{{ errors.first('title_en') }}</span>
                                </div>
                            </div>

                            <div class="col-md-12 text-center">
                                <div>
                                    <slot slot="defaults"></slot>
                                    <tabs>
                                        <tab v-for="(permission , index) in permissions" :title="index">
                                            <div class="row">
                                                <div class="col-md-4 text-left" v-for="(per , key) in permission"
                                                     :key="key">
                                                    <input type="checkbox" class="mr-2 ml-2" :id="'p_'+key+'_k_'"
                                                           v-model="dataModel.permission_ids" :value="per.id">
                                                    <label :for="'p_'+key+'_k_'">{{per.translated.title}}</label>
                                                </div>
                                            </div>
                                        </tab>
                                    </tabs>
                                </div>
                            </div>

                            <div class="col-md-12 text-center">
                                <button class="btn btn-danger-light" @click="submitForm()">
                                    {{$t('add')}}
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
                permissions: [],
                dataModel: {
                    title_ar: '',
                    title_en: '',
                    permission_ids: []
                }
            }
        },
        mounted() {
            this.getAllPermissions();
        },
        methods: {
            getAllPermissions() {
                let vm = this;
                vm.$helper.showLoader();
                let dispatch = this.$store.dispatch('moduleRole/fetchPermission', {});
                dispatch.then((response) => {
                    vm.permissions = this.$store.getters['moduleRole/getAllPermissions'];
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
                        this.addRole();
                    } else {
                        // form have errors
                    }
                })
            },
            addRole() {
                let vm = this;
                vm.$helper.showLoader();
                const payload = vm.dataModel;
                vm.$store.dispatch('moduleRole/addRole', payload)
                    .then(() => {
                        vm.$helper.hideLoader()
                        vm.$helper.showMessage('success', vm)
                        vm.$router.push({name: 'all_roles'})
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