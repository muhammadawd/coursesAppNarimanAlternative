<template>
    <div v-if="list">
        <div class="property_video mb-3 xl" v-if="!playNow">
            <div class="thumb">
                <img class="pro_img img-fluid w100"
                     :src="list.image_path ? list.image_path : require('@/assets/img/banner-2.jpg')" alt="7.jpg">
                <div class="overlay_icon" v-if="list.video">
                    <div class="bb-video-box">
                        <div class="bb-video-box-inner">
                            <div class="bb-video-box-innerup">
                                <a href="" @click.prevent="triggerPlayNow()" class="theme-cl">
                                    <i class="ti-control-play" style="line-height: 2"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="instructor_over_info">
                <ul class="direction">
                    <li>
                        <div class="ins_infos ">
                            <div class="ins_info_caption text-left">
                                <span>{{list.translated.title}} </span>
                                <h4>{{$t('nariman_saad')}}</h4>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="playNow">
            <div class="col-mds-12 w-100" v-if="videoID">
                <vue-vimeo-player ref="player" :video-id="videoID" @ready="onReady" :player-height="height"
                                  style="width: 100%">
                </vue-vimeo-player>
            </div>
        </div>
    </div>
</template>

<script>
    import {vueVimeoPlayer} from 'vue-vimeo-player';

    export default {
        name: "CourseShow",
        props: ['list'],
        data() {
            return {
                videoID: null,
                height: 420,
                options: {},
                playerReady: false,
                playNow: false
            }
        },
        components: {vueVimeoPlayer},
        mounted() {
            // this.videoID = this.list.video;

        },
        methods: {
            openEmbeded(course) {
                if (!course.file_path) {
                    return
                }
                this.videoID = course.file_path.name;
                this.$refs.modal.open()
            },
            onReady() {
                this.playerReady = true
            },
            play() {
                this.$refs.player.play()
            },
            stop() {
                this.$refs.player.stop()
            },
            triggerPlayNow() {
                this.videoID = this.list.video;
                this.playNow = true
                // this.videoID = this.list.video;
            }
        }
    }
</script>

<style scoped>

</style>