<template>
    <div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('edit_courses')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('edit_courses')}}</h2>
                            <h2 class="font-weight-bold fun_font text-center" v-if="dataModel.list">
                                {{$t('list')}} <b class="text-danger"> " {{dataModel.list.translated.title}} " </b>
                            </h2>
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
                            <!--<div class="col-md-6">-->
                            <!--<div class="form-group">-->
                            <!--<label class="font-weight-bold">{{$t('image')}}</label>-->
                            <!--<input type="file" accept="image/*" @change="previewImage()" ref="myImage"-->
                            <!--data-vv-name="image"-->
                            <!--class="form-control"-->
                            <!--:placeholder="$t('image')">-->
                            <!--<span class="text-danger text-sm">{{ errors.first('image') }}</span>-->
                            <!--<a target="_blank" v-if="dataModel.image_path" :href="dataModel.image_path">-->
                            <!--<i class="fa fa-image"></i>-->
                            <!--{{$t('show')}}-->
                            <!--</a>-->
                            <!--</div>-->
                            <!--</div>-->

                            <div class="col-md-2">
                                <label class="font-weight-bold">&nbsp;</label>
                                <div>
                                    <input type="radio" id="link" name="drone" value="link"
                                           v-model="selector_type">
                                    <label for="link">{{$t('link')}}</label>
                                </div>
                                <div>
                                    <input type="radio" id="video_audio" name="drone" value="video_audio"
                                           v-model="selector_type">
                                    <label for="video_audio">{{$t('video_audio')}}</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('link')}}</label>
                                    <input type="text" data-vv-name="link" v-model="dataModel.link"
                                           :disabled="selector_type == 'video_audio'"
                                           class="form-control"
                                           :placeholder="$t('link')">
                                    <span class="text-danger text-sm">{{ errors.first('link') }}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('video_audio')}}</label>
                                    <small class="font-weight-bold text-danger"> ({{$t('max_video')}})</small>
                                    <input type="file" @change="previewVideo()" ref="myVideo"
                                           :disabled="selector_type == 'link'"
                                           data-vv-name="file"
                                           accept="video/* , audio/*"
                                           class="form-control"
                                           :placeholder="$t('video_audio')">
                                    <span class="text-danger text-sm">{{ errors.first('file') }}</span>
                                </div>
                                <a href="#"
                                   v-if="dataModel.file_path"
                                   @click.prevent="openEmbeded(dataModel)">
                                    <i class="fa fa-video"></i>
                                    {{$t('show')}}
                                </a>
                            </div>
                            <sweet-modal ref="modal" class="p-0" overlay-theme="dark" modal-theme="dark">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-mds-12 w-100" v-if="videoID">
                                            <vue-vimeo-player ref="player" :video-id="videoID" @ready="onReady"
                                                              :player-height="height"
                                                              style="width: 100%">
                                            </vue-vimeo-player>
                                        </div>
                                    </div>
                                </div>
                            </sweet-modal>

                            <div class="col-md-12 mt-3 text-center">
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

    import {SweetModal} from 'sweet-modal-vue'
    import {vueVimeoPlayer} from 'vue-vimeo-player'

    export default {
        name: "Edit",
        components: {SweetModal, vueVimeoPlayer},
        data() {
            return {
                videoID: null,
                dataModel: {
                    title_ar: '',
                    title_en: '',
                    description_ar: '',
                    description_en: '',
                    link: '',
                },
                list: '',
                selector_type: '',
            }
        },
        mounted() {
            this.findCourse();
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
        methods: {
            openEmbeded(course) {
                if (!course.file_path) {
                    return
                }
                this.videoID = course.file_path.name;
                this.$refs.modal.open()
            },
            onReady() {
                this.playerReady = true
            },
            play() {
                this.$refs.player.play()
            },
            stop() {
                this.$refs.player.stop()
            },
            findCourse() {
                let vm = this;
                vm.$helper.showLoader();
                let dispatch = this.$store.dispatch('moduleCourse/findCourse', {
                    id: vm.$route.params.id
                });
                dispatch.then((response) => {
                    let course = response.data.data.course;
                    // delete list.video;
                    vm.$helper.replaceNullWithSingleQuote(course)
                    if (course.link) {
                        vm.selector_type = 'link'
                    } else {
                        vm.selector_type = 'video_audio'
                    }
                    vm.dataModel = course;
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
                this.dataModel.file = this.$refs.myVideo.files[0]
            },
            submitForm() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        // if form have no errors
                        this.updateCourse();
                    } else {
                        // form have errors
                    }
                })
            },
            updateCourse() {
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

                vm.$store.dispatch('moduleCourse/updateCourse', payload)
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

<style>

    .sweet-modal.is-visible .sweet-buttons, .sweet-modal.is-visible .sweet-content {
        padding: 0 !important;
        direction: ltr;
        margin-top: 60px;
    }

    .sweet-modal .sweet-box-actions {
        z-index: 9;
    }

    iframe {
        width: 100%;
    }
</style>