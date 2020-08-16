<template>
    <div class="edu_wraper" v-if="list">

        <div class="text-center" v-if="!list.courses.length">
            <h3>{{$t('no_data')}}</h3>
        </div>
        <div id="accordionExample" class="accordion d-nones shadows circullum">

            <!-- Part 1 -->
            <div class="card">
                <!--<div id="headingOne" class="card-header bg-white shadow-sm border-0">-->
                <!--<h2 class="mb-0 accordion_title font-weight-bold">-->
                <!--<a href="" data-toggle="collapse"-->
                <!--data-target="#collapseOne"-->
                <!--aria-expanded="true"-->
                <!--aria-controls="collapseOne"-->
                <!--class="d-block position-relative text-dark collapsible-link py-2">-->
                <!--{{list.translated.title}}-->
                <!--</a>-->
                <!--</h2>-->
                <!--</div>-->
                <div id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample"
                     class="collapse show">
                    <div class="card-body pl-3 pr-3">
                        <ul class="lectures_lists">
                            <li :title="course.link ? $t('download') : $t('media')"
                                v-for="(course , key) in list.courses" :key="key"
                                :class="!list.status ? 'unview' : ''"
                                @click="openEmbeded(course)">
                                <div class="lectures_lists_title" v-if="!course.link">
                                    <i class="ti-control-play"></i>
                                    <!--{{$t('media')}}-->
                                </div>
                                <div class="lectures_lists_title" v-if="course.link">
                                    <i class="ti-file"></i>
                                    <!--{{$t('file')}} -->
                                    <a class="font-weight-bold" :href="course.link"
                                       target="_blank">{{$t('download')}}</a>
                                </div>
                                <p>{{course.translated.title}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--blocking-->
            <sweet-modal ref="modal" class="p-0" overlay-theme="dark" modal-theme="dark">
                <div class="container">
                    <div class="row">
                        <div class="col-mds-12 w-100" v-if="videoID">
                            <vue-vimeo-player ref="player" :video-id="videoID" @ready="onReady" :player-height="height"
                                              style="width: 100%">
                            </vue-vimeo-player>
                        </div>
                    </div>
                </div>
            </sweet-modal>
        </div>
    </div>
</template>

<script>
    import {SweetModal} from 'sweet-modal-vue'
    import {vueVimeoPlayer} from 'vue-vimeo-player'

    export default {
        name: "CourseList",
        props: ['list'],
        components: {SweetModal, vueVimeoPlayer},
        data() {
            return {
                videoID: null,
                height: 320,
                options: {},
                playerReady: false,
            }
        },
        methods: {
            openEmbeded(course) {
                if (course.link) {
                    location.href = course.link;
                    return
                }
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
            }
        },
        mounted() {
            $('.collapsible-link').on('click', function (e) {
                e.preventDefault();
                let target = ($(this).attr('data-target'));
                $(target).toggleClass('show');
                $(this).toggleClass('collapsed');
            });
        }
    }
</script>

<style>
    .sweet-modal.is-visible .sweet-buttons, .sweet-modal.is-visible .sweet-content {
        padding: 0 !important;
        direction: ltr;
        margin-top: 60px;
    }

    .sweet-modal .sweet-box-actions {
        z-index: 9;
    }

    iframe {
        width: 100%;
    }
</style>