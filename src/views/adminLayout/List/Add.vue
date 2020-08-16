<template>
    <div>
        <!--{{categories}}-->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('add_list')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('add_list')}}</h2>
                        </div>
                    </div>
                    <div class="dashboard_container_body p-2">

                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('code')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="code" v-model="dataModel.code"
                                           class="form-control"
                                           :placeholder="$t('code')">
                                    <span class="text-danger text-sm">{{ errors.first('code') }}</span>
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
                                    <label class="font-weight-bold">{{$t('what_you_learn')}}</label>
                                    <vue-editor dir="ltr" v-model="dataModel.what_you_learn"></vue-editor>
                                    <span class="text-danger text-sm">{{ errors.first('what_you_learn') }}</span>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('list_requirement')}}</label>
                                    <vue-editor dir="ltr" v-model="dataModel.list_requirement"></vue-editor>
                                    <span class="text-danger text-sm">{{ errors.first('list_requirement') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('price')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="price" v-model="dataModel.price"
                                           class="form-control"
                                           :placeholder="$t('price')">
                                    <span class="text-danger text-sm">{{ errors.first('price') }}</span>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('price_before_discount')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="price_before_discount"
                                           v-model="dataModel.price_before_discount"
                                           class="form-control"
                                           :placeholder="$t('price_before_discount')">
                                    <span class="text-danger text-sm">{{ errors.first('price_before_discount') }}</span>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('lectures_count')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="lectures_count"
                                           v-model="dataModel.lectures_count"
                                           class="form-control"
                                           :placeholder="$t('lectures_count')">
                                    <span class="text-danger text-sm">{{ errors.first('lectures_count') }}</span>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('start_date')}}</label>
                                    <flat-pickr
                                            v-validate="'required'" data-vv-name="start_date"
                                            v-model="dataModel.start_date"
                                            class="form-control"
                                            :placeholder="$t('start_date')"/>
                                    <span class="text-danger text-sm">{{ errors.first('start_date') }}</span>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('list_type')}}</label>
                                    <select v-validate="'required'" data-vv-name="list_type_id"
                                            v-model="dataModel.list_type_id"
                                            class="form-control">
                                        <option v-for="(list_type , index) in []" :value="list_type.id">
                                            {{list_type.translated.title}}
                                        </option>
                                    </select>
                                    <span class="text-danger text-sm">{{ errors.first('list_type_id') }}</span>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('list_method')}}</label>
                                    <select v-validate="'required'" data-vv-name="list_method"
                                            v-model="dataModel.list_method"
                                            class="form-control">
                                        <option v-for="(list_method , index) in list_methods" :value="list_method">
                                            {{$t(list_method)}}
                                        </option>
                                    </select>
                                    <span class="text-danger text-sm">{{ errors.first('list_method') }}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="col-md-12" v-if="dataModel.list_method == 'live'">
                <div class="dashboard_container">
                    <div class="row">
                        <div class="col-12 pt-3">
                            <h2 class="font-weight-bold fun_font text-center">{{$t('create_group')}}</h2>
                        </div>
                    </div>
                    <div class="dashboard_container_body p-2">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('group_name')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="group_name"
                                           v-model="dataModel.group_name"
                                           class="form-control"
                                           :placeholder="$t('group_name')">
                                    <span class="text-danger text-sm">{{ errors.first('group_name') }}</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('limit_numbers')}}</label>
                                    <input type="text"
                                           v-validate="'required'" data-vv-name="limit_numbers"
                                           v-model="dataModel.limit_numbers"
                                           class="form-control"
                                           :placeholder="$t('limit_numbers')">
                                    <span class="text-danger text-sm">{{ errors.first('limit_numbers') }}</span>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('times')}}</label>
                                    <ul>
                                        <li class="mb-1" >
                                            <div class="row">
                                                <div class="col-md-6 mb-1" v-for="(day,index) in $helper.getDays()" :key="index">
                                                    <div class="row">

                                                        <div class="col-md-4">
                                                            <input :id="'day_'+index" type="checkbox" name="day_index[]"/>
                                                            <label :for="'day_'+index"
                                                                   class="font-weight-bold p-1">{{day}}</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <flat-pickr
                                                                    :config="{
                                                            enableTime: true,
                                                            noCalendar: true,
                                                            dateFormat: 'H:i'}"
                                                                    v-model="dataModel.days[index]"
                                                                    class="form-control text-center"
                                                                    :placeholder="'00:00'"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="dashboard_container">
                    <div class="row">
                        <div class="col-12 pt-3">
                            <h2 class="font-weight-bold fun_font text-center">{{$t('intro_video')}}</h2>
                        </div>
                    </div>
                    <div class="dashboard_container_body p-2">
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
                                <div v-if="imgSrc">
                                    <vue-cropper
                                            ref="cropper"
                                            :src="imgSrc"
                                            :aspect-ratio="1 / 1"
                                            alt="Source Image">
                                    </vue-cropper>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('video')}}</label>
                                    <small class="font-weight-bold text-danger"> ({{$t('max_video')}})</small>
                                    <input type="file" accept="video/*" @change="previewVideo()" ref="myVideo"
                                           data-vv-name="video"
                                           class="form-control"
                                           :placeholder="$t('video')">
                                    <span class="text-danger text-sm">{{ errors.first('video') }}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="dashboard_container">
                    <div class="dashboard_container_body p-2">
                        <div class="row">
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
    import VueCropper from 'vue-cropperjs';
    import 'cropperjs/dist/cropper.css';

    export default {
        name: "Add",
        components: {VueCropper},
        data() {
            return {
                dataModel: {
                    code: '',
                    title_ar: '',
                    title_en: '',
                    description_ar: '',
                    description_en: '',
                    price: '',
                    price_before_discount: '',
                    hours_number: '',
                    price_duration: '',
                    category_id: '',
                    list_method: '',
                    days: [],
                },
                imgSrc: null,
                categories: [],
                list_methods: ['recorded', 'live'],
            }
        },
        mounted() {
            // this.getAllCategories()
        },
        methods: {
            previewImage() {
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
            previewVideo() {
                this.dataModel.video = this.$refs.myVideo.files[0]
            },
            getAllCategories() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = {};
                let dispatch = this.$store.dispatch('moduleCategory/getAllCategories', filters);
                dispatch.then((response) => {
                    vm.categories = this.$store.getters['moduleCategory/getAllCategories'];
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
                        this.addList();
                    } else {
                        // form have errors
                    }
                })
            },
            addList() {
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

                vm.$store.dispatch('moduleList/addList', payload)
                    .then(() => {
                        vm.$helper.hideLoader()
                        vm.$helper.showMessage('success', vm)
                        vm.$router.push({name: 'all_lists'})
                        $('#loader_message').text('')
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