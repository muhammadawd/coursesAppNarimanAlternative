<template>
    <div>
        <!--{{categories}}-->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('add_faculty')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('add_faculty')}}</h2>
                        </div>
                    </div>
                    <div class="dashboard_container_body p-2">

                        <div class="row">

                            <div class="col-md-4">
                                <label class="font-weight-bold">{{$t('university')}}</label>
                                <multiselect
                                        :options="[]"
                                        track-by="id"
                                        :placeholder="$t('search')"></multiselect>
                            </div>

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

                        </div>

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <button class="btn btn-danger-light  btn-sm" @click="addLevelDom()">
                            {{$t('add_level')}}
                        </button>
                    </div>
                    <div class=" col-md-12" v-for="(level , index) in dataModel.levels">
                        <div class="card p-2">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="font-weight-bold">{{$t('level_name')}}</label>
                                        <input type="text" class="form-control" v-model="level.name">
                                    </div>
                                    <div class="col-md-12 mt-1">
                                        <button class="btn btn-warning-light btn-sm" @click="addLevelSubjectDom(index)">
                                            {{$t('add_subject')}}
                                        </button>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-4" v-for="(subject , index) in level.subjects">
                                                <label class="font-weight-bold">{{$t('subject_name')}}</label>
                                                <input type="text" class="form-control" v-model="subject.name">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
</template>

<script>
    export default {
        name: "Add",
        data() {
            return {
                dataModel: {
                    title_ar: '',
                    title_en: '',
                    levels: [{
                        subjects: []
                    }]
                }
            }
        },
        mounted() {

        },
        methods: {
            addLevelDom() {
                this.dataModel.levels.push({
                    subjects: []
                })
            },
            addLevelSubjectDom(index) {
                this.dataModel.levels[index].subjects.push({
                    name: ''
                })
            },
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