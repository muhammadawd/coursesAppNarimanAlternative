<template>
    <div>
        <Header/>
        <Features v-for="(category , index) in getAllCategories" :bgColor="(index % 2 == 0) ? '#fff' : '#eee'"
                  :category="category"/>
        <newsLetter/>
    </div>
</template>

<script>
    import Header from './components/Home/Header'
    import Features from './components/Home/Features'
    import newsLetter from './components/Home/newsLetter'

    export default {
        name: "Home",
        components: {
            Header, Features, newsLetter
        },
        mounted() {

        },
        computed: {
            getAllCategories() {
                return this.$store.getters['moduleCategory/getAllCategories'];
            },
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>