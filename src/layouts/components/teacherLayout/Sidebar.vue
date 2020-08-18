<template>
    <div class="d-none d-md-flex">
        <div class="dashboard-navbar">
            <div class="d-navigation">
                <ul id="side-menu" class="text-left" dir="ltr">
                    <li :class="$route.name == 'teacher_dashboard' ? 'active': ''">
                        <a href="" @click.prevent="$router.push({name:'teacher_dashboard'})">
                            <i class="ti-dashboard"></i>{{$t('teacher_dashboard')}}</a>
                    </li>
                    <li><a href="#" @click.prevent="logout()"><i class="ti-power-off"></i>{{$t('logout')}}</a></li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {}
        },
        mounted() {

        },
        methods: {
            toggleMenu(id) {
                $(`#${id}`).toggleClass('collapse show collapsed')
                $(`#${id}`).toggleClass('')
            },
            logout() {
                this.$helper.removeLocalStorage('adminInfo');
                this.$helper.removeLocalStorage('tokenAdmin');
                location.reload()
            }
        }
    }
</script>

<style scoped>

</style>