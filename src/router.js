/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store/store.js"

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [

        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
                {
                    path: '/',
                    redirect: '/home'
                },
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('./views/userLayout/Home.vue'),
                    meta: {
                        pageTitle: 'home',
                        authRequired: false,
                        isAdmin: false,
                    }
                },
                {
                    path: '/course_detail/:id',
                    name: 'course_detail',
                    component: () => import('./views/userLayout/CourseDetail.vue'),
                    meta: {
                        pageTitle: 'course detail',
                        authRequired: false,
                        isAdmin: false,
                    }
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import('./views/userLayout/Profile.vue'),
                    meta: {
                        pageTitle: 'profile',
                        authRequired: false,
                        isAdmin: false,
                    }
                },
                {
                    path: '/update_password',
                    name: 'update_password',
                    component: () => import('./views/userLayout/UpdatePassword.vue'),
                    meta: {
                        pageTitle: 'update_password',
                        authRequired: false,
                        isAdmin: false,
                    }
                },
                {
                    path: '/my_courses',
                    name: 'my_courses',
                    component: () => import('./views/userLayout/MyCourses.vue'),
                    meta: {
                        pageTitle: 'my_courses',
                        authRequired: false,
                        isAdmin: false,
                    }
                },
                {
                    path: '/search',
                    name: 'search',
                    component: () => import('./views/userLayout/Search.vue'),
                    meta: {
                        pageTitle: 'search',
                        authRequired: false,
                        isAdmin: false,
                    }
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('./views/userLayout/Login.vue'),
                    meta: {
                        pageTitle: 'login',
                        authRequired: false,
                        isAdmin: false,
                    }
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('./views/userLayout/Register.vue'),
                    meta: {
                        pageTitle: 'register',
                        authRequired: false,
                        isAdmin: false,
                    }
                },
                {
                    path: '/admin/login',
                    name: 'login_admin',
                    component: () => import('./views/adminLayout/Login.vue'),
                    meta: {
                        pageTitle: 'login admin',
                        authRequired: false,
                        isAdmin: false,
                    }
                },
            ],
        },

        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '/',
            component: () => import('./layouts/main/AdminMain.vue'),
            children: [
                {
                    path: '/admin',
                    redirect: '/admin/dashboard'
                },
                {
                    path: '/admin/dashboard',
                    name: 'dashboard',
                    component: () => import('./views/adminLayout/Dashboard.vue'),
                    meta: {
                        pageTitle: 'Dashboard',
                        authRequired: true,
                        isAdmin: true,
                    }
                },

                {
                    path: '/admin/all_categories',
                    name: 'all_categories',
                    component: () => import('./views/adminLayout/Categories/All.vue'),
                    meta: {
                        pageTitle: 'All Categories',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_categories/add',
                    name: 'add_categories',
                    component: () => import('./views/adminLayout/Categories/Add.vue'),
                    meta: {
                        pageTitle: 'Add Categories',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_categories/edit/:id',
                    name: 'edit_categories',
                    component: () => import('./views/adminLayout/Categories/Edit.vue'),
                    meta: {
                        pageTitle: 'Edit Categories',
                        authRequired: true,
                        isAdmin: true,
                    }
                },

                {
                    path: '/admin/all_lists',
                    name: 'all_lists',
                    component: () => import('./views/adminLayout/List/All.vue'),
                    meta: {
                        pageTitle: 'All Lists',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_lists/add',
                    name: 'add_lists',
                    component: () => import('./views/adminLayout/List/Add.vue'),
                    meta: {
                        pageTitle: 'Add Lists',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_lists/edit/:id',
                    name: 'edit_lists',
                    component: () => import('./views/adminLayout/List/Edit.vue'),
                    meta: {
                        pageTitle: 'Edit Lists',
                        authRequired: true,
                        isAdmin: true,
                    }
                },

                {
                    path: '/admin/all_admins',
                    name: 'all_admins',
                    component: () => import('./views/adminLayout/Admins/All.vue'),
                    meta: {
                        pageTitle: 'All Admins',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_admins/add',
                    name: 'add_admins',
                    component: () => import('./views/adminLayout/Admins/Add.vue'),
                    meta: {
                        pageTitle: 'Add Admin',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_admins/edit/:id',
                    name: 'edit_admins',
                    component: () => import('./views/adminLayout/Admins/Edit.vue'),
                    meta: {
                        pageTitle: 'Edit Admins',
                        authRequired: true,
                        isAdmin: true,
                    }
                },

                {
                    path: '/admin/all_roles',
                    name: 'all_roles',
                    component: () => import('./views/adminLayout/Roles/All.vue'),
                    meta: {
                        pageTitle: 'All Roles',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_roles/add',
                    name: 'add_roles',
                    component: () => import('./views/adminLayout/Roles/Add.vue'),
                    meta: {
                        pageTitle: 'Add Roles',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_roles/edit/:id',
                    name: 'edit_roles',
                    component: () => import('./views/adminLayout/Roles/Edit.vue'),
                    meta: {
                        pageTitle: 'Edit Roles',
                        authRequired: true,
                        isAdmin: true,
                    }
                },

                {
                    path: '/admin/all_sliders',
                    name: 'all_sliders',
                    component: () => import('./views/adminLayout/Sliders/All.vue'),
                    meta: {
                        pageTitle: 'All Sliders',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_sliders/add',
                    name: 'add_sliders',
                    component: () => import('./views/adminLayout/Sliders/Add.vue'),
                    meta: {
                        pageTitle: 'Add Sliders',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_sliders/edit/:id',
                    name: 'edit_sliders',
                    component: () => import('./views/adminLayout/Sliders/Edit.vue'),
                    meta: {
                        pageTitle: 'Edit Sliders',
                        authRequired: true,
                        isAdmin: true,
                    }
                },

                {
                    path: '/admin/all_courses',
                    name: 'all_courses',
                    component: () => import('./views/adminLayout/Courses/All.vue'),
                    meta: {
                        pageTitle: 'All Courses',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_courses/add/:list_id',
                    name: 'add_courses',
                    component: () => import('./views/adminLayout/Courses/Add.vue'),
                    meta: {
                        pageTitle: 'Add Courses',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/all_courses/edit/:id',
                    name: 'edit_courses',
                    component: () => import('./views/adminLayout/Courses/Edit.vue'),
                    meta: {
                        pageTitle: 'Edit Courses',
                        authRequired: true,
                        isAdmin: true,
                    }
                },

                {
                    path: '/admin/all_users',
                    name: 'all_users',
                    component: () => import('./views/adminLayout/Users/All.vue'),
                    meta: {
                        pageTitle: 'All Users',
                        authRequired: true,
                        isAdmin: true,
                    }
                },

                {
                    path: '/admin/main_settings',
                    name: 'main_settings',
                    component: () => import('./views/adminLayout/Settings/settings.vue'),
                    meta: {
                        pageTitle: 'Main Settings',
                        authRequired: true,
                        isAdmin: true,
                    }
                },

                {
                    path: '/admin/reports/getAllUsersReport',
                    name: 'getAllUsersReport',
                    component: () => import('./views/adminLayout/Reports/getAllUsersReport.vue'),
                    meta: {
                        pageTitle: 'getAllUsersReport',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
                {
                    path: '/admin/reports/getAllListReport',
                    name: 'getAllListReport',
                    component: () => import('./views/adminLayout/Reports/getAllListReport.vue'),
                    meta: {
                        pageTitle: 'getAllListReport',
                        authRequired: true,
                        isAdmin: true,
                    }
                },
            ],
        },
        // =============================================================================
        // FULL PAGE LAYOUTS
        // =============================================================================
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('preloader');
    if (appLoading) {
        setTimeout(() => {
            appLoading.style.display = "none";
        }, 1000);
    }
})

router.beforeEach((to, from, next) => {
    // If auth required, check login. If login fails redirect to login page
    // let userType = localStorage.getItem("userType");
    let token = localStorage.getItem("token");
    let tokenAdmin = localStorage.getItem("tokenAdmin");
    document.title = to.meta.pageTitle;
    if (to.meta.authRequired) {
        if (to.meta.isAdmin) {
            if (!tokenAdmin) router.push({name: 'login_admin', query: {to: to.path}})
        } else {
            if (!token) router.push({name: 'login', query: {to: to.path}})
        }
    }

    next();
});

export default router