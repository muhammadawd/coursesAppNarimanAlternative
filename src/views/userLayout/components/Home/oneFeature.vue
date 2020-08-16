<template>
    <!-- Single Slide -->
    <router-link v-if="listItem" :to="{name:'course_detail',params:{id:listItem.id}}">
        <div class="singles_items direction">
            <div class="education_block_grid style_2">
                <div class="education_block_thumb n-shadow">
                    <img :src="listItem.image_path" class="img-fluid"
                         alt=""/>
                    <div class="cources_price">{{listItem.price}} {{$t('currency')}}</div>
                </div>

                <div class="education_block_body">
                    <h5 class="bl-title font-weight-bold">
                        <router-link class="text-dark" :to="{name:'course_detail',params:{id:listItem.id}}">
                            {{listItem.translated.title}}
                        </router-link>
                    </h5>
                </div>

                <div class="cources_info_style3 direction">
                    <ul class="direction">
                        <li><i class="ti-eye mr-2"></i>{{listItem.watch_number}} <span
                                class="fun_font font-weight-bold text-success">{{$t('views')}}</span>
                        </li>
                        <li><i class="ti-time mr-2"></i>{{listItem.hours_number}}h <span
                                class="fun_font font-weight-bold text-success">{{$t('time')}}</span>
                        </li>
                    </ul>
                </div>

                <div class="education_block_footer">
                    <div class="education_block_author">
                        <div class="path-img">
                            <router-link :to="{name:'course_detail',params:{id:listItem.id}}">
                                <img :src="require('@/assets/img/user-2.jpg')" class="img-fluid"
                                     alt="">
                            </router-link>
                        </div>
                        <h5>
                            {{$t('nariman_saad')}}
                        </h5>
                    </div>
                    <div class="foot_lecture direction"><i
                            class="ti-control-skip-forward mr-2"></i>{{listItem.course_count}}
                        {{$t('lecture')}}
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: "oneFeature",
        props: ['listItem']
    }
</script>

<style scoped>

</style>