<template>
    <div v-if="list">
        <div class="image-cover ed_detail_head lg theme-ov" style="background:#f4f4f4;"
             :style="{backgroundImage:'url('+require('@/assets/img/banner-2.jpg')+')'}" data-overlay="9">
            <div class="container">
                <div class="row direction">
                    <div class="col-lg-7 col-md-9">
                        <div class="ed_detail_wrap light">
                            <ul class="cources_facts_list d-none">
                                <li class="facts-1">SOCAIL</li>
                                <li class="facts-4">UI/UX</li>
                                <li class="facts-2">DEVELOPMENT</li>
                                <li class="facts-3">PROGRAMING</li>
                                <li class="facts-5">DATA BASE</li>
                            </ul>
                            <div class="ed_header_caption">
                                <h1 class="ed_title font-weight-bold fun_font">{{list.translated.title}}</h1>
                                <p class="ed_title font-weight-bold">{{list.translated.description}}</p>
                                <ul class="direction">
                                    <li><i class="ti-alarm-clock"></i> <span
                                            class="font-weight-bold">{{list.hours_number}}</span>
                                        <span> {{$t('time')}}</span>
                                    </li>
                                    <li><i class="ti-eye"></i> <span
                                            class="font-weight-bold">{{list.watch_number}}</span>
                                        <span> {{$t('views')}}</span>
                                    </li>
                                </ul>
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
        name: "CourseHeader",
        props: ['list']
    }
</script>

<style scoped>

</style>