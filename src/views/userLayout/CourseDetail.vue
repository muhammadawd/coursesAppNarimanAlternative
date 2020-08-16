<template>
    <div>
        <CourseHeader :list="list"/>
        <CourseDetails :list="list"/>
    </div>
</template>

<script>
    import CourseHeader from './components/CourseDetail/CourseHeader'
    import CourseDetails from './components/CourseDetail/CourseDetails'

    export default {
        name: "CourseDetail",
        components: {
            CourseHeader, CourseDetails,
        },
        data() {
            return {
                list: null
            }
        },
        watch: {
            '$route'() {
                location.reload()
            }
        },
        mounted() {
            this.getListData()
        },
        methods: {
            prepareFilters() {
                return {
                    id: this.$route.params.id,
                    lang: this.$i18n.locale
                }
            },
            getListData() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = vm.prepareFilters();
                let dispatch = this.$store.dispatch('moduleList/findList', filters);
                dispatch.then((response) => {
                    vm.list = response.data.data.list;
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