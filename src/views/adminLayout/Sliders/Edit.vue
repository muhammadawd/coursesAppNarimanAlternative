<template>
    <div>
        <!--{{categories}}-->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('edit_sliders')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('edit_sliders')}}</h2>
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
                                           data-vv-name="image"
                                           class="form-control"
                                           :placeholder="$t('image')">
                                    <span class="text-danger text-sm">{{ errors.first('image') }}</span>
                                    <a v-if="dataModel.file_path" :href="dataModel.file_path" target="_blank"
                                       class="font-weight-bold">
                                        <i class="ti-image"></i>
                                        {{$t('show')}}
                                    </a>
                                    <div v-if="imgSrc">
                                        <vue-cropper
                                                ref="cropper"
                                                :src="imgSrc"
                                                :aspect-ratio="2 / 3"
                                                alt="Source Image">
                                        </vue-cropper>
                                    </div>
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
    import VueCropper from 'vue-cropperjs';
    import 'cropperjs/dist/cropper.css';

    export default {
        name: "Edit",
        components: {VueCropper},
        data() {
            return {
                dataModel: {
                    title_ar: '',
                    title_en: '',
                    description_ar: '',
                    description_en: '',
                },
                imgSrc: null,
            }
        },
        mounted() {
            this.findSlider();
        },
        methods: {
            findSlider() {
                let vm = this;
                vm.$helper.showLoader();
                let dispatch = this.$store.dispatch('moduleSlider/findSlider', {
                    id: vm.$route.params.id
                });
                dispatch.then((response) => {
                    let slider = response.data.data.slider;
                    vm.$helper.replaceNullWithSingleQuote(slider)
                    vm.dataModel = slider;
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            },
            previewImage() {
                // this.dataModel.file = this.$refs.myImage.files[0]
                let image = this.$refs.myImage.files[0];
                this.readFile(image)
            },
            readFile(file) {
                if (file.type.indexOf('image/') === -1) {
                    console.log('Please select an image file');
                    return;
                }
                if (typeof FileReader === 'function') {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.imgSrc = event.target.result;
                        // this.$refs.cropper.replace(event.target.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    console.log('Sorry, FileReader API not supported');
                }
            },
            setImageToModel() {
                let cropper = this.$refs.cropper;
                if (cropper) {
                    let data = cropper.getCroppedCanvas().toDataURL();
                    this.dataModel.image = this.convertToBlob(data);
                }
            },
            convertToBlob(data) {
                let vm = this;
                let block = data.split(";");
                let contentType = block[0].split(":")[1];
                let realData = block[1].split(",")[1];
                let image_file = vm.b64toBlob(realData, contentType);
                let extension = '';
                try {
                    extension = image_file.type.split('/')[1];
                } catch (e) {
                    extension = 'jpg'
                }
                let image_file_name = `image_name_example.${extension}`;
                image_file = vm.blobToFile(image_file, image_file_name);
                return image_file

            },
            b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                var byteCharacters = atob(b64Data);
                var byteArrays = [];

                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                var blob = new Blob(byteArrays, {type: contentType});
                return blob;
            },
            blobToFile(theBlob, fileName) {
                theBlob.lastModifiedDate = new Date();
                theBlob.lastModified = new Date().getTime();
                theBlob.name = fileName;
                return theBlob;
                // return new File(theBlob, fileName);
            },
            submitForm() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        // if form have no errors
                        this.editSliders();
                    } else {
                        // form have errors
                    }
                })
            },
            editSliders() {
                let vm = this;
                vm.$helper.showLoader();
                const payload = {};

                vm.setImageToModel();

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

                vm.$store.dispatch('moduleSlider/updateSlider', payload)
                    .then(() => {
                        vm.$helper.hideLoader();
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