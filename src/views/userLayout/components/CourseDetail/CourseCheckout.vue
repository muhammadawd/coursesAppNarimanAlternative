<template>

    <!-- Course info -->
    <div v-if="list" class="ed_view_box style_2 overlio">

        <div class="ed_author direction">
            <div class="ed_author_thumb">
                <img class="img-fluid" :src="require('@/assets/img/user-2.jpg')" alt="7.jpg">
            </div>
            <div class="ed_author_box">
                <h4 class="font-weight-bold">{{$t('nariman_saad')}}</h4>
                <span>{{$t('lecture')}}</span>
            </div>
        </div>

        <div class="ed_view_price pl-4 direction">
            <span>{{$t('price')}}</span>
            <h2 class="theme-cl">
                <del style="font-size: 15px">{{list.price_before_discount}}</del>
                {{list.price}} {{$t('currency')}}
            </h2>
        </div>
        <ul class="edu_list p-4 direction right">
            <li><i class="ti-user"></i>{{$t('users_enrolled')}}<strong>{{list.paid_count}}</strong></li>
            <li><i class="ti-files"></i>{{$t('lecture')}}<strong>{{list.course_count}}</strong></li>
            <li><i class="ti-time"></i>{{$t('time')}}<strong>{{list.hours_number}}</strong></li>
            <li><i class="ti-time"></i>{{$t('price_duration')}}<strong>{{list.price_duration}}</strong></li>
            <li><i class="ti-eye"></i>{{$t('views')}}<strong>{{list.watch_number}}</strong></li>
        </ul>
        <div class="ed_view_link">
            <div v-if="list.status">
                <h4 class="fun_font font-weight-bold text-center text-success">
                    {{$t('paid_till')}} <br>
                    <span class="text-dark">{{list.expired_at}}</span>
                </h4>
            </div>
            <a v-if="getAuth && list.courses.length && list.status == 0" href="#" @click.prevent="checkOut()"
               class="btn btn-theme enroll-btn">{{$t('buy_now')}}<i
                    class="ti-angle-right"></i></a>
            <a v-if="!getAuth" href="#"
               @click.prevent="$router.push({name:'login', query: {to: `course_detail/${$route.params.id}`}})"
               class="btn btn-info enroll-btn">{{$t('login')}}<i
                    class="ti-angle-right"></i></a>
        </div>

    </div>

</template>

<script>
    export default {
        name: "CourseCheckout",
        props: ['list'],
        data() {
            return {
                auth: null,
            }
        },
        computed: {
            getAuth() {
                return this.auth
            }
        },
        mounted() {
            this.auth = this.$helper.getLocalStorage('userInfo');
        },
        methods: {
            checkOut() {
                let vm = this;
                vm.$helper.showLoader(vm.$t('checkout_msg'));
                const payload = {
                    list_id: vm.$route.params.id,
                    payment_type: 'knet',
                };

                vm.$store.dispatch('moduleList/checkoutList', payload)
                    .then((response) => {
                        response = response.data;
                        vm.$helper.hideLoader()
                        location.href = response.data.link;
                    })
                    .catch(error => {
                        vm.$helper.handleError(error, vm);
                        vm.$helper.hideLoader()
                    })
            }
        }
    }
</script>

<style scoped>

</style>