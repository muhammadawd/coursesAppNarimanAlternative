<template>
    <div class="d-none d-md-flex">
        <div class="dashboard-navbar">
            <div class="d-navigation">
                <ul id="side-menu" class="text-left" dir="ltr">
                    <li :class="$route.name == 'dashboard' ? 'active': ''">
                        <a href="" @click.prevent="$router.push({name:'dashboard'})">
                            <i class="ti-dashboard"></i>{{$t('dashboard')}}</a>
                    </li>
                    <li :class="$route.name == 'teacher_dashboard' ? 'active': ''">
                        <a href="" @click.prevent="$router.push({name:'teacher_dashboard'})">
                            <i class="ti-dashboard"></i>{{$t('teacher_dashboard')}}</a>
                    </li>

                    <li class="dropdown"
                        v-if="$helper.hasAccessPermission('menu-report')"
                        :class="['all_universities','all_faculties','all_categories'].includes($route.name) ? 'active': ''">
                        <a href="#" @click.prevent="toggleMenu('universities_col')">
                            <i class="ti-cup"></i>
                            {{$t('universities_details')}}
                            <i class="ti-angle-left float-right"></i>
                        </a>
                        <ul class="nav nav-second-level in collapse" id="universities_col">
                            <li class="mt-2" v-if="$helper.hasAccessPermission('all-universities')"
                                :class="$route.name == 'all_universities' ? 'active': ''">
                                <a href=""
                                   @click.prevent="$router.push({name:'all_universities'})">{{$t('all_universities')}}</a>
                            </li>
                            <li class="mt-2" v-if="$helper.hasAccessPermission('all-faculties')"
                                :class="$route.name == 'all_faculties' ? 'active': ''">
                                <a href=""
                                   @click.prevent="$router.push({name:'all_faculties'})">{{$t('all_faculties')}}</a>
                            </li>
                            <li class="mt-2" v-if="$helper.hasAccessPermission('all-category')"
                                :class="$route.name == 'all_categories' ? 'active': ''">
                                <a href=""
                                   @click.prevent="$router.push({name:'all_categories'})">{{$t('all_categories')}}</a>
                            </li>
                        </ul>
                    </li>

                    <li v-if="$helper.hasAccessPermission('all-teachers')"
                        :class="$route.name == 'all_teachers' ? 'active': ''">
                        <a href="" @click.prevent="$router.push({name:'all_teachers'})">
                            <i class="ti-user"></i>{{$t('all_teachers')}}</a>
                    </li>

                    <li v-if="$helper.hasAccessPermission('all-list')"
                        :class="$route.name == 'all_lists' ? 'active': ''">
                        <a href="" @click.prevent="$router.push({name:'all_lists'})">
                            <i class="ti-list"></i>{{$t('all_lists')}}</a>
                    </li>
                    <li v-if="$helper.hasAccessPermission('all-assignments')"
                        :class="$route.name == 'all_assignments' ? 'active': ''">
                        <a href="" @click.prevent="$router.push({name:'all_assignments'})">
                            <i class="ti-ticket"></i>{{$t('all_assignments')}}</a>
                    </li>

                    <li v-if="$helper.hasAccessPermission('all-discussions')"
                        :class="$route.name == 'all_discussions' ? 'active': ''">
                        <a href="" @click.prevent="$router.push({name:'all_discussions'})">
                            <i class="ti-comment"></i>{{$t('all_discussions')}}</a>
                    </li>

                    <!--<li v-if="$helper.hasAccessPermission('all-user')"-->
                    <!--:class="$route.name == 'all_users' ? 'active': ''">-->
                    <!--<a href="" @click.prevent="$router.push({name:'all_users'})">-->
                    <!--<i class="ti-user"></i>{{$t('all_users')}}</a>-->
                    <!--</li>-->

                    <li class="dropdown"
                        v-if="$helper.hasAccessPermission('menu-report')"
                        :class="['getAllUsersReport'].includes($route.name) ? 'active': ''">
                        <a href="#" @click.prevent="toggleMenu('reports_col')">
                            <i class="ti-settings"></i>
                            {{$t('reports')}}
                            <i class="ti-angle-left float-right"></i>
                        </a>
                        <ul class="nav nav-second-level in collapse" id="reports_col">
                            <li class="mt-2" v-if="$helper.hasAccessPermission('users-report')"
                                :class="$route.name == 'getAllUsersReport' ? 'active': ''">
                                <a href=""
                                   @click.prevent="$router.push({name:'getAllUsersReport'})">{{$t('getAllUsersReport')}}</a>
                            </li>
                            <li class="mt-2" v-if="$helper.hasAccessPermission('all-list')"
                                :class="$route.name == 'getAllListReport' ? 'active': ''">
                                <a href=""
                                   @click.prevent="$router.push({name:'getAllListReport'})">{{$t('getAllListReport')}}</a>
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown"
                        v-if="$helper.hasAccessPermission('menu-setting')"
                        :class="['all_admins','all_roles','main_settings','all_sliders'].includes($route.name) ? 'active': ''">
                        <a href="#" @click.prevent="toggleMenu('setting_col')">
                            <i class="ti-settings"></i>
                            {{$t('settings')}}
                            <i class="ti-angle-left float-right"></i>
                        </a>
                        <ul class="nav nav-second-level in collapse" id="setting_col">
                            <li class="mt-2" :class="$route.name == 'main_settings' ? 'active': ''">
                                <a href=""
                                   @click.prevent="$router.push({name:'main_settings'})">{{$t('main_settings')}}</a>
                            </li>
                            <li v-if="$helper.hasAccessPermission('all-slider')"
                                :class="$route.name == 'all_sliders' ? 'active': ''">
                                <a href=""
                                   @click.prevent="$router.push({name:'all_sliders'})">{{$t('all_sliders')}}</a>
                            </li>
                            <li v-if="$helper.hasAccessPermission('all-admin')"
                                :class="$route.name == 'all_admins' ? 'active': ''">
                                <a href="" @click.prevent="$router.push({name:'all_admins'})">{{$t('all_admins')}}</a>
                            </li>
                            <li v-if="$helper.hasAccessPermission('all-role')"
                                :class="$route.name == 'all_roles' ? 'active': ''">
                                <a href="" @click.prevent="$router.push({name:'all_roles'})">{{$t('all_roles')}}</a>
                            </li>
                        </ul>
                    </li>

                    <!--<li><a href=""><i class="ti-shopping-cart"></i>My Order</a></li>-->
                    <!--<li><a href=""><i class="ti-settings"></i>Settings</a></li>-->
                    <!--<li><a href=""><i class="ti-comment-alt"></i>Reviews</a></li>-->
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