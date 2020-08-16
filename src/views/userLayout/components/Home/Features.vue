<template>
    <div>
        <!-- ============================ Featured Courcses Start ================================== -->
        <section v-if="category" :style="{background: bgColor}">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12 col-md-12 mb-3">
                        <div class="sec-heading">
                            <div class="float-right pull-right text-right d-none d-md-block" v-if="category.lists.length">
                                <a href="#"
                                   @click.prevent="$router.push({name:'search',query:{query:category.translated.title}})"
                                   class="btn text-white font-weight-bold bg-green btn_all"
                                   :class="category.lists.length > 4 ? 'btn_all_'+$i18n.locale : ''">
                                    {{$t('all')}}
                                </a>
                            </div>
                            <div class="sec-left text-left float-left pull-left">
                                <h1 class="fun_font font-weight-bold" v-if="category.translated">
                                    {{category.translated.title}}</h1>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 p-0">

                        <div class="arrow_slide three_slide arrow_middles direction">

                            <slick
                                    ref="slick"
                                    :options="slickOptions"
                                    @afterChange="handleAfterChange"
                                    @beforeChange="handleBeforeChange"
                                    @breakpoint="handleBreakpoint"
                                    @destroy="handleDestroy"
                                    @edge="handleEdge"
                                    @init="handleInit"
                                    @reInit="handleReInit"
                                    @setPosition="handleSetPosition"
                                    @swipe="handleSwipe"
                                    @lazyLoaded="handleLazyLoaded"
                                    @lazyLoadError="handleLazeLoadError">

                                <oneFeature v-for="(listItem, index) in category.lists" :listItem="listItem"
                                            :key="index"/>

                            </slick>
                        </div>
                    </div>

                </div>

            </div>
        </section>
        <!-- ============================ Featured Courcses End ================================== -->

    </div>
</template>

<script>
    import Slick from 'vue-slick';
    import oneFeature from './oneFeature';

    export default {
        name: "Features",
        components: {Slick, oneFeature},
        props: ['bgColor', 'category'],
        data() {
            return {
                slickOptions: {
                    slidesToShow: 4,
                    arrows: true,
                    autoplay: true,
                    dots: true,
                    rtl: this.$i18n.locale == 'ar' ? true : false,
                    responsive: [
                        {
                            breakpoint: 1199,
                            settings: {
                                arrows: true,
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: true,
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                arrows: true,
                                slidesToShow: 2
                            }
                        }
                    ]
                },
            };
        },
        // All slick methods can be used too, example here
        methods: {
            next() {
                this.$refs.slick.next();
            },

            prev() {
                this.$refs.slick.prev();
            },

            reInit() {
                // Helpful if you have to deal with v-for to update dynamic lists
                this.$nextTick(() => {
                    this.$refs.slick.reSlick();
                });
            },

            // Events listeners
            handleAfterChange(event, slick, currentSlide) {
                // console.log('handleAfterChange', event, slick, currentSlide);
            },
            handleBeforeChange(event, slick, currentSlide, nextSlide) {
                // console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
            },
            handleBreakpoint(event, slick, breakpoint) {
                // console.log('handleBreakpoint', event, slick, breakpoint);
            },
            handleDestroy(event, slick) {
                // console.log('handleDestroy', event, slick);
            },
            handleEdge(event, slick, direction) {
                // console.log('handleEdge', event, slick, direction);
            },
            handleInit(event, slick) {
                // console.log('handleInit', event, slick);
            },
            handleReInit(event, slick) {
                // console.log('handleReInit', event, slick);
            },
            handleSetPosition(event, slick) {
                // console.log('handleSetPosition', event, slick);
            },
            handleSwipe(event, slick, direction) {
                // console.log('handleSwipe', event, slick, direction);
            },
            handleLazyLoaded(event, slick, image, imageSource) {
                // console.log('handleLazyLoaded', event, slick, image, imageSource);
            },
            handleLazeLoadError(event, slick, image, imageSource) {
                // console.log('handleLazeLoadError', event, slick, image, imageSource);
            },
        },
    }
</script>

<style scoped>

</style>