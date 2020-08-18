<template>
    <div id="main-wrapper">
        <div class="header fixed-top bg-transparent">
            <div class="container">
                <nav id="navigation" class="navigation navigation-landscape">
                    <div class="nav-header">
                        <a class="nav-brand" href="" @click.prevent="$router.push({name:'home'})">
                            <img :src="require('@/assets/logo.png')" class="logo" alt=""/>
                        </a>
                    </div>
                </nav>

            </div>
        </div>
        <router-view></router-view>
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