<template>
    <div>
        <!--{{categories}}-->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('add_sliders')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('add_sliders')}}</h2>
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
                        </div>
                        <div class="row">

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('description_ar')}}</label>
                                    <textarea type="text"
                                              data-vv-name="description_ar" v-model="dataModel.description_ar"
                                              class="form-control"
                                              :placeholder="$t('description_ar')"></textarea>
                                    <span class="text-danger text-sm">{{ errors.first('description_ar') }}</span>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('description_en')}}</label>
                                    <textarea type="text"
                                              data-vv-name="description_en" v-model="dataModel.description_en"
                                              class="form-control"
                                              :placeholder="$t('description_en')"></textarea>
                                    <span class="text-danger text-sm">{{ errors.first('description_en') }}</span>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('image')}}</label>
                                    <input type="file" accept="image/*" @change="previewImage()" ref="myImage"
                                           v-validate="'required'" data-vv-name="image"
                                           class="form-control"
                                           :placeholder="$t('image')">
                                    <span class="text-danger text-sm">{{ errors.first('image') }}</span>
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
                    description_ar: '',
                    description_en: '',
                }
            }
        },
        mounted() {

        },
        methods: {
            previewImage() {
                this.dataModel.file = this.$refs.myImage.files[0]
            },
            submitForm() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        // if form have no errors
                        this.addSlider();
                    } else {
                        // form have errors
                    }
                })
            },
            addSlider() {
                let vm = this;
                vm.$helper.showLoader();
                const payload = {};

                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    onUploadProgress: function (progressEvent) {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        $('#loader_message').text(percentCompleted + ' %')
                    }
                };

                const formData = new FormData();
                _.forEach(vm.dataModel, (value, key) => {
                    formData.append(key, value)
                });

                payload.data = formData;
                payload.config = config;

                vm.$store.dispatch('moduleSlider/addSlider', payload)
                    .then(() => {
                        vm.$helper.hideLoader()
                        vm.$helper.showMessage('success', vm);
                        vm.$router.push({name: 'all_sliders'});
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