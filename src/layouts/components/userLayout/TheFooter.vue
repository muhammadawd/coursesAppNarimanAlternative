<template>
    <div>
        <!-- ============================ Footer Start ================================== -->
        <footer class="light-footer" v-if="settings">
            <div>
                <div class="container">
                    <div class="row direction">
                        <div class="text-center col-md-12">
                            <div class="footer-widget">
                                <img :src="require('@/assets/logo.png')" class="img-footer" alt=""/>
                                <div class="footer-add">
                                    <p v-if="settings.address">{{settings.address[0].value}}</p>
                                    <p v-if="settings.email">{{settings.email[0].value}}</p>
                                    <p v-if="settings.phone">{{settings.phone[0].value}}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="container">
                    <div class="row align-items-center direction">

                        <div class="col-lg-6 col-md-6">
                            <p class="mb-0">© 2020 Nariman Saad . Designd By <a href="">Approc</a>.
                            </p>
                        </div>

                        <div class="col-lg-6 col-md-6 text-right">
                            <ul class="footer-bottom-social">
                                <li v-if="settings.facebook"><a :href="settings.facebook[0].value"><i
                                        class="ti-facebook"></i></a></li>
                                <li v-if="settings.twitter"><a :href="settings.twitter[0].value"><i
                                        class="ti-twitter"></i></a></li>
                                <li v-if="settings.instagram"><a :href="settings.instagram[0].value"><i
                                        class="ti-instagram"></i></a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
        <!-- ============================ Footer End ================================== -->
    </div>
</template>

<script>
    export default {
        name: "TheFooter",
        data() {
            return {
                settings: null
            }
        },
        mounted() {
            this.getAllSettings();
        },
        methods: {
            prepareFilters() {
                return {
                    lang: this.$i18n.locale
                };
            },
            getAllSettings() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = vm.prepareFilters();
                let dispatch = this.$store.dispatch('moduleCommon/fetchSettings', filters);
                dispatch.then((response) => {
                    response = response.data;
                    // vm.pageTotal = response.data.users.last_page;
                    let settings = this.$store.getters['moduleCommon/getAllSettings'];
                    let _settings = _.groupBy(settings, 'name');
                    vm.settings = _settings;
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            }
        }
    }
</script>

<style scoped>

</style>