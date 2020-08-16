<template>
    <div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" @click.prevent>{{$t('dashboard')}}</a></li>
                        <li class="breadcrumb-item active" aria-current="page" @click.prevent>{{$t('edit_teacher')}}
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
                            <h2 class="font-weight-bold fun_font text-center">{{$t('edit_teacher')}}</h2>
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

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">{{$t('bio')}}</label>
                                    <vue-editor dir="ltr" v-model="dataModel.bio"
                                                :placeholder="$t('bio')"></vue-editor>
                                    <span class="text-danger text-sm">{{ errors.first('bio') }}</span>
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
        name: "Add",
        components: {VueCropper},
        data() {
            return {
                roles: [],
                dataModel: {
                    name: '',
                    password: '',
                    email: '',
                    phone: '',
                    bio: '',
                },
                imgSrc: null,
            }
        },
        mounted() {
            this.findTeacher();
        },
        methods: {
            findRole() {
                let vm = this;
                // vm.$helper.showLoader();
                // let id = vm.$route.params.id;
                // let dispatch = this.$store.dispatch('moduleAdmin/findAdmin', {id: id});
                // dispatch.then((response) => {
                //     let admin = response.data.data.admin;
                //     delete admin.role;
                //     vm.dataModel = admin;
                //     vm.dataModel.password = '';
                //     vm.$helper.hideLoader();
                // }).catch((error) => {
                //     vm.$helper.handleError(error, vm);
                //     vm.$helper.hideLoader();
                // });
            },
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