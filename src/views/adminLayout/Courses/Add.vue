<template>
    <div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('add_courses')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('add_courses')}}</h2>
                            <h2 class="font-weight-bold fun_font text-center" v-if="list">
                                {{$t('list')}} <b class="text-danger"> " {{list.translated.title}} " </b>
                            </h2>
                        </div>
                    </div>
                    <div class="dashboard_container_body p-2">

                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('course_type')}}</label>
                                    <select v-validate="'required'" data-vv-name="course_type"
                                            v-model="dataModel.course_type"
                                            class="form-control">
                                        <option v-for="(course_type , index) in course_types" :value="course_type">
                                            {{$t(course_type)}}
                                        </option>
                                    </select>
                                    <span class="text-danger text-sm">{{ errors.first('course_type') }}</span>
                                </div>
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

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('description_ar')}}</label>
                                    <vue-editor dir="ltr" type="text"
                                                data-vv-name="description_ar"
                                                v-model="dataModel.description_ar"></vue-editor>
                                    <span class="text-danger text-sm">{{ errors.first('description_ar') }}</span>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('description_en')}}</label>
                                    <vue-editor dir="ltr"
                                                data-vv-name="description_en"
                                                v-model="dataModel.description_en"></vue-editor>
                                    <span class="text-danger text-sm">{{ errors.first('description_en') }}</span>
                                </div>
                            </div>
                        </div>


                        <div class="row">

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('file')}}</label>
                                    <input type="file" @change="previewFile()" ref="myfile"
                                           data-vv-name="file"
                                           class="form-control"
                                           :placeholder="$t('file')">
                                    <span class="text-danger text-sm">{{ errors.first('file') }}</span>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('video_audio')}}</label>
                                    <small class="font-weight-bold text-danger"> ({{$t('max_video')}})</small>
                                    <input type="file" @change="previewVideo()" ref="myVideo"
                                           data-vv-name="file"
                                           accept="video/* , audio/*"
                                           class="form-control"
                                           :placeholder="$t('video_audio')">
                                    <span class="text-danger text-sm">{{ errors.first('file') }}</span>
                                </div>
                            </div>

                            <div class="col-md-12 direction">
                                <hr>
                                <input type="checkbox" id="isLive" v-model="isLive" value="1">
                                <label for="isLive" class="p-1 font-weight-bold">{{$t('live')}}</label>
                            </div>

                            <div class="col-md-12" v-if="isLive">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="font-weight-bold">{{$t('meeting_info')}}</label>
                                            <input type="text"
                                                   v-validate="'required'" data-vv-name="meeting_info"
                                                   v-model="dataModel.meeting_info"
                                                   class="form-control"
                                                   :placeholder="$t('meeting_info')">
                                            <span class="text-danger text-sm">{{ errors.first('meeting_info') }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="font-weight-bold">{{$t('password')}}</label>
                                            <input type="password"
                                                   v-validate="'required'" data-vv-name="password"
                                                   v-model="dataModel.password"
                                                   class="form-control"
                                                   :placeholder="$t('password')">
                                            <span class="text-danger text-sm">{{ errors.first('password') }}</span>
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
                    link: '',
                    list_id: '',
                },
                list: '',
                selector_type: 'link',
                course_types: ['assignment', 'video'],
                isLive: false
            }
        },
        watch: {
            'selector_type'(newVal, oldVal) {
                if (newVal == 'link') {
                    delete this.dataModel.file
                    this.$refs.myVideo.value = null
                    return
                }
                delete this.dataModel.link

            }
        },
        mounted() {
            this.dataModel.list_id = this.$route.params.list_id
            this.findList();
        },
        methods: {
            findList() {
                let vm = this;
                vm.$helper.showLoader();
                let dispatch = this.$store.dispatch('moduleList/findList', {
                    id: vm.$route.params.list_id
                });
                dispatch.then((response) => {
                    let list = response.data.data.list;
                    delete list.video;
                    vm.list = list;
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            },
            previewImage() {
                this.dataModel.image = this.$refs.myImage.files[0]
            },
            previewVideo() {
                this.dataModel._file = this.$refs.myVideo.files[0]
            },
            previewFile() {
                this.dataModel.file = this.$refs.myVideo.files[0]
            },
            submitForm() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        // if form have no errors
                        this.addCourse();
                    } else {
                        // form have errors
                    }
                })
            },
            addCourse() {
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

                vm.$store.dispatch('moduleCourse/addCourse', payload)
                    .then(() => {
                        vm.$helper.hideLoader()
                        vm.$helper.showMessage('success', vm);
                        vm.$router.push({name: 'all_courses'});
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