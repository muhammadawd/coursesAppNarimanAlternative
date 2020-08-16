<template>
    <div id="app">
        <notifications position="bottom right"/>
        <fade-transition origin="center" mode="out-in" :duration="250">
            <router-view/>
        </fade-transition>
    </div>
</template>

<script>
    import {FadeTransition} from "vue2-transitions";

    export default {
        name: 'App',
        components: {FadeTransition},
        watch: {
            '$route'() {
                this.handleToken()
                $('.nav-menus-wrapper-close-button').trigger('click')
                // this.socketConnection()
            }
        },
        methods: {
            handleToken() {
                let userType = localStorage.getItem("userType");
                let token = localStorage.getItem("token");
                let tokenAdmin = localStorage.getItem("tokenAdmin");
                // console.log(this.$route.meta.isAdmin)
                userType = this.$route.meta.isAdmin ? 'admin' : 'user'
                if (userType == "user" && token) {
                    console.log('user token : ' + token)
                    this.$store.dispatch('moduleAuth/setBearer', token);
                }
                if (userType == "admin" && tokenAdmin) {

                    console.log('admin token : ' + tokenAdmin)
                    this.$store.dispatch('moduleAdmin/setBearer', tokenAdmin);
                }
            }
        },
        async created() {
            //axios token bearer
            this.handleToken();
        }
    }
</script>
<style>
</style>