<template>
    <div>
        <div class="container">
            <div class="bg_header_top">
                <div class="overlayblack"></div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-8 col-12 mt--5">
                    <div class="navigation_tool_bar">
                        <div class="card card_nav">
                            <div class="card-body">
                                <div class="p-2">
                                    <div class="row nav_items">
                                        <div class="col-3"
                                             @click.prevent="$router.push({name:'teacher_dashboard_courses',params:{id:1}})">

                                            <a href="" @click.prevent
                                               :class="$route.name == 'teacher_dashboard_courses' ?  'active' : ''">
                                                <i class="ti-tablet  fa-2x"></i>
                                                <h5 class="pt-2">{{$t('my_lessons')}}</h5>
                                            </a>
                                        </div>
                                        <div class="col-3"
                                             @click.prevent="$router.push({name:'teacher_dashboard_discussions',params:{id:1}})">

                                            <a href="" @click.prevent
                                               :class="$route.name == 'teacher_dashboard_discussions' ?  'active' : ''">
                                                <i class="ti-comment fa-2x"></i>
                                                <h5 class="pt-2">{{$t('discussions')}}</h5>
                                            </a>
                                        </div>
                                        <div class="col-3"
                                             @click.prevent="$router.push({name:'teacher_dashboard_assignments',params:{id:1}})">
                                            <a href="" @click.prevent
                                               :class="$route.name == 'teacher_dashboard_assignments' ?  'active' : ''">
                                                <i class="ti-file fa-2x"></i>
                                                <h5 class="pt-2">{{$t('assignments')}}</h5>
                                            </a>
                                        </div>
                                        <div class="col-3"
                                             @click.prevent="$router.push({name:'teacher_dashboard_students',params:{id:1}})">
                                            <a href="" @click.prevent
                                               :class="$route.name == 'teacher_dashboard_students' ?  'active' : ''">
                                                <i class="ti-user fa-2x"></i>
                                                <h5 class="pt-2">{{$t('reg_students')}}</h5>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style>
    .bg_header_top {
        background: url("../../../assets/img/appels.jpg") center center no-repeat;
        background-size: cover;
        position: relative;
        height: 160px;
        overflow: hidden;
        border-radius: 0 0 40px 40px;
    }

    .overlayblack {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }

    .mt--5 {
        margin-top: -50px;
    }

    .navigation_tool_bar {
        border-radius: 20px;
        overflow: hidden;
    }

    .navigation_tool_bar .card_nav {
        background: #fff;
        min-height: 110px;
    }

    .nav_items {
        text-align: center;
    }

    .nav_items a {
        color: #ccc;
    }

    .nav_items .col-3 {
        padding: 10px;
        border-left: 1px solid #ccc;
        align-items: center;
        display: flex;
        justify-content: center;
        vertical-align: middle;
    }

    .nav_items .col-3:last-child {
        border-left: 0;
        margin-left: 0;
    }

    .nav_items .active {
        color: #0f7dff;
        position: relative;
    }

    .nav_items .active:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 15%;
        width: 70%;
        margin: auto;
        height: 2px;
        background: #0f7dff;
    }

</style>