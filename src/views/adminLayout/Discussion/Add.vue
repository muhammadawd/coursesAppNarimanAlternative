<template>
    <div>
        <!--{{categories}}-->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('add_discussion')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('add_discussion')}}</h2>
                        </div>
                    </div>
                    <div class="dashboard_container_body p-2">

                        <div class="row">

                            <div class="col-md-4">
                                <label class="font-weight-bold">{{$t('list')}}</label>
                                <multiselect
                                        :options="[]"
                                        track-by="id"
                                        :placeholder="$t('search')"></multiselect>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('reply')}}</label>
                                    <vue-editor dir="ltr" v-model="dataModel.reply"
                                                :placeholder="$t('reply')"></vue-editor>
                                    <span class="text-danger text-sm">{{ errors.first('reply') }}</span>
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
                dataModel: {
                    title_ar: '',
                    title_en: '',
                }
            }
        },
        mounted() {

        },
        methods: {
            submitForm() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        // if form have no errors
                        this.addCategory();
                    } else {
                        // form have errors
                    }
                })
            },
            addCategory() {
                let vm = this;
                vm.$helper.showLoader();
                const payload = vm.dataModel;
                vm.$store.dispatch('moduleCategory/addCategory', payload)
                    .then(() => {
                        vm.$helper.hideLoader()
                        vm.$helper.showMessage('success', vm)
                        vm.$router.push({name: 'all_categories'})
                    })
                    .catch(error => {
                        vm.$helper.handleError(error, vm);
                        vm.$helper.hideLoader()
                    })
            },
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