<template>
    <div id="main-wrapper">
        <TheNavBar/>
        <router-view></router-view>
        <toTop/>
        <TheFooter/>
    </div>
</template>

<script>
    import TheNavBar from '../components/userLayout/TheNavBar'
    import TheFooter from '../components/userLayout/TheFooter'
    import toTop from '../components/userLayout/toTop'

    export default {
        name: "Main",
        components: {
            TheNavBar,
            toTop,
            TheFooter
        }
    }
</script>

<style scoped>

</style>