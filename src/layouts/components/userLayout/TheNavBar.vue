<template>
    <div>
        <!-- ============================================================== -->
        <!-- Top header  -->
        <!-- ============================================================== -->
        <!-- Start Navigation -->
        <div class="header header-light head-shadow">
            <div class="container">
                <nav id="navigation" class="navigation navigation-landscape">
                    <div class="nav-header">
                        <a class="nav-brand" href=""  @click.prevent="$router.push({name:'home'})">
                            <img :src="require('@/assets/logo.png')" class="logo" alt=""/>
                        </a>
                        <div class="nav-toggle"></div>
                    </div>
                    <div class="nav-menus-wrapper" style="transition-property: none;">
                        <ul class="nav-menu float-left direction">

                            <li :class="$route.name == 'home' ? 'active' : ''"><a href=""  @click.prevent="$router.push({name:'home'})">{{$t('home')}}</a>
                            </li>

                            <li :class="$route.name == 'course_detail' ? 'active' : ''"><a
                                    href="#">{{$t('courses')}}<span class="submenu-indicator"></span></a>
                                <ul class="nav-dropdown nav-submenu">
                                    <li v-for="(category , index) in categories">
                                        <a href="#" @click.prevent>{{category.translated.title}}
                                            <span class="submenu-indicator"></span>
                                        </a>
                                        <ul class="nav-dropdown nav-submenu">
                                            <li v-for="(list , _index) in category.lists">
                                                <a href="#"
                                                   @click.prevent="$router.push({name:'course_detail',params:{id:list.id}})">{{list.translated.title}}</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li v-show="getAuth"><a href="#">{{$t('profile')}}<span class="submenu-indicator"></span></a>
                                <ul class="nav-dropdown nav-submenu">
                                    <li><a href="#"
                                           @click.prevent="$router.push({name:'profile'})">{{$t('my_info')}}</a></li>
                                    <li><a href="#"
                                           @click.prevent="$router.push({name:'update_password'})">{{$t('update_password')}}</a>
                                    </li>
                                    <li><a href="#"
                                           @click.prevent="$router.push({name:'my_courses'})">{{$t('my_courses')}}</a>
                                    </li>
                                </ul>
                            </li>

                            <li :class="$route.name == 'search' ? 'active' : ''">
                                <a href=""
                                   @click.prevent="$router.push({name:'search'})">{{$t('search')}}</a>
                            </li>

                            <li class="d-md-none"><a style="" v-if="locale != 'ar'" @click="updateLocale('ar')">{{$t('ar')}}</a>
                            </li>

                            <li class="d-md-none"><a style="" v-if="locale != 'en'" @click="updateLocale('en')">{{$t('en')}}</a>
                            </li>
                            <!--<li><a href="">{{$t('contact')}}</a></li>-->
                        </ul>

                        <ul class="nav-menu nav-menu-social float-right direction">
                            <li class="green light d-none d-md-flex text-capitalize" v-if="locale != 'ar'">
                                <a style="" @click="updateLocale('ar')">{{$t('ar')}}</a>
                            </li>
                            <li class="green light d-none d-md-flex text-capitalize" v-if="locale != 'en'">
                                <a class="" @click="updateLocale('en')">{{$t('en')}}</a>
                            </li>
                            <li class="text-dark d-none d-md-flex m-2"
                                style="margin-top: 32px!important;font-size: 12px"
                                v-if="getAuth">
                                <span>{{$t('welcome')}} ({{$helper.splitFirst(getAuth.name)}})
                                    {{$t('nice_day')}}
                                    </span>
                            </li>
                            <li class="login_click dark" v-if="getAuth">
                                <a href="#" @click.prevent="logout()">{{$t('logout')}}</a>
                            </li>
                            <li class="login_click green light" v-if="!getAuth">
                                <a href="#" @click.prevent="$router.push({name:'login'})">{{$t('login_teacher')}}</a>
                            </li>
                            <li class="login_click bg-green" v-if="!getAuth">
                                <a href="#" @click.prevent="$router.push({name:'register'})">{{$t('new_account_teacher')}}</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        <!-- End Navigation -->
        <div class="clearfix"></div>
        <!-- ============================================================== -->
        <!-- Top header  -->
        <!-- ============================================================== -->
    </div>
</template>

<script>
    export default {
        name: "TheNavBar",
        mounted() {
            this.locale = this.$i18n.locale
            this.getAllCategories();
            this.auth = this.$helper.getLocalStorage('userInfo');
        },
        data() {
            return {
                locale: 'ar',
                auth: null,
                categories: []
            }
        },
        watch: {
            '$route'(to, from) {
                this.auth = this.$helper.getLocalStorage('userInfo');
                setTimeout(() => {
                    this.navigationBarFunctionality();
                }, 500)

            }
        },
        computed: {
            getAuth() {
                return this.auth
            }
        },
        methods: {
            navigationBarFunctionality() {
                $(function () {
                    "use strict";

                    // Script Navigation
                    !function (n, e, i, a) {
                        n.navigation = function (t, s) {
                            var o = {
                                    responsive: !0,
                                    mobileBreakpoint: 992,
                                    showDuration: 300,
                                    hideDuration: 300,
                                    showDelayDuration: 0,
                                    hideDelayDuration: 0,
                                    submenuTrigger: "hover",
                                    effect: "fade",
                                    submenuIndicator: !0,
                                    hideSubWhenGoOut: !0,
                                    visibleSubmenusOnMobile: !1,
                                    fixed: !1,
                                    overlay: !0,
                                    overlayColor: "rgba(0, 0, 0, 0.5)",
                                    hidden: !1,
                                    offCanvasSide: "left",
                                    onInit: function () {
                                    },
                                    onShowOffCanvas: function () {
                                    },
                                    onHideOffCanvas: function () {
                                    }
                                },
                                u = this,
                                r = Number.MAX_VALUE,
                                d = 1,
                                f = "click.nav touchstart.nav",
                                l = "mouseenter.nav",
                                c = "mouseleave.nav";
                            u.settings = {};
                            var t = (n(t), t);
                            n(t).find(".nav-menus-wrapper").prepend("<span class='nav-menus-wrapper-close-button'>✕</span>"), n(t).find(".nav-search").length > 0 && n(t).find(".nav-search").find("form").prepend("<span class='nav-search-close-button'>✕</span>"), u.init = function () {
                                u.settings = n.extend({}, o, s), "right" == u.settings.offCanvasSide && n(t).find(".nav-menus-wrapper").addClass("nav-menus-wrapper-right"), u.settings.hidden && (n(t).addClass("navigation-hidden"), u.settings.mobileBreakpoint = 99999), v(), u.settings.fixed && n(t).addClass("navigation-fixed"), n(t).find(".nav-toggle").on("click touchstart", function (n) {
                                    n.stopPropagation(), n.preventDefault(), u.showOffcanvas(), s !== a && u.callback("onShowOffCanvas")
                                }), n(t).find(".nav-menus-wrapper-close-button").on("click touchstart", function () {
                                    u.hideOffcanvas(), s !== a && u.callback("onHideOffCanvas")
                                }), n(t).find(".nav-search-button").on("click touchstart", function (n) {
                                    n.stopPropagation(), n.preventDefault(), u.toggleSearch()
                                }), n(t).find(".nav-search-close-button").on("click touchstart", function () {
                                    u.toggleSearch()
                                }), n(t).find(".megamenu-tabs").length > 0 && y(), n(e).resize(function () {
                                    m(), C()
                                }), m(), s !== a && u.callback("onInit")
                            };
                            var v = function () {
                                n(t).find("li").each(function () {
                                    n(this).children(".nav-dropdown,.megamenu-panel").length > 0 && (n(this).children(".nav-dropdown,.megamenu-panel").addClass("nav-submenu"), u.settings.submenuIndicator && n(this).children("a").append("<span class='submenu-indicator'><span class='submenu-indicator-chevron'></span></span>"))
                                })
                            };
                            u.showSubmenu = function (e, i) {
                                g() > u.settings.mobileBreakpoint && n(t).find(".nav-search").find("form").slideUp(), "fade" == i ? n(e).children(".nav-submenu").stop(!0, !0).delay(u.settings.showDelayDuration).fadeIn(u.settings.showDuration) : n(e).children(".nav-submenu").stop(!0, !0).delay(u.settings.showDelayDuration).slideDown(u.settings.showDuration), n(e).addClass("nav-submenu-open")
                            }, u.hideSubmenu = function (e, i) {
                                "fade" == i ? n(e).find(".nav-submenu").stop(!0, !0).delay(u.settings.hideDelayDuration).fadeOut(u.settings.hideDuration) : n(e).find(".nav-submenu").stop(!0, !0).delay(u.settings.hideDelayDuration).slideUp(u.settings.hideDuration), n(e).removeClass("nav-submenu-open").find(".nav-submenu-open").removeClass("nav-submenu-open")
                            };
                            var h = function () {
                                    n("body").addClass("no-scroll"), u.settings.overlay && (n(t).append("<div class='nav-overlay-panel'></div>"), n(t).find(".nav-overlay-panel").css("background-color", u.settings.overlayColor).fadeIn(300).on("click touchstart", function (n) {
                                        u.hideOffcanvas()
                                    }))
                                },
                                p = function () {
                                    n("body").removeClass("no-scroll"), u.settings.overlay && n(t).find(".nav-overlay-panel").fadeOut(400, function () {
                                        n(this).remove()
                                    })
                                };
                            u.showOffcanvas = function () {
                                h(), "left" == u.settings.offCanvasSide ? n(t).find(".nav-menus-wrapper").css("transition-property", "left").addClass("nav-menus-wrapper-open") : n(t).find(".nav-menus-wrapper").css("transition-property", "right").addClass("nav-menus-wrapper-open")
                            }, u.hideOffcanvas = function () {
                                n(t).find(".nav-menus-wrapper").removeClass("nav-menus-wrapper-open").on("webkitTransitionEnd moztransitionend transitionend oTransitionEnd", function () {
                                    n(t).find(".nav-menus-wrapper").css("transition-property", "none").off()
                                }), p()
                            }, u.toggleOffcanvas = function () {
                                g() <= u.settings.mobileBreakpoint && (n(t).find(".nav-menus-wrapper").hasClass("nav-menus-wrapper-open") ? (u.hideOffcanvas(), s !== a && u.callback("onHideOffCanvas")) : (u.showOffcanvas(), s !== a && u.callback("onShowOffCanvas")))
                            }, u.toggleSearch = function () {
                                "none" == n(t).find(".nav-search").find("form").css("display") ? (n(t).find(".nav-search").find("form").slideDown(), n(t).find(".nav-submenu").fadeOut(200)) : n(t).find(".nav-search").find("form").slideUp()
                            };
                            var m = function () {
                                    u.settings.responsive ? (g() <= u.settings.mobileBreakpoint && r > u.settings.mobileBreakpoint && (n(t).addClass("navigation-portrait").removeClass("navigation-landscape"), D()), g() > u.settings.mobileBreakpoint && d <= u.settings.mobileBreakpoint && (n(t).addClass("navigation-landscape").removeClass("navigation-portrait"), k(), p(), u.hideOffcanvas()), r = g(), d = g()) : k()
                                },
                                b = function () {
                                    n("body").on("click.body touchstart.body", function (e) {
                                        0 === n(e.target).closest(".navigation").length && (n(t).find(".nav-submenu").fadeOut(), n(t).find(".nav-submenu-open").removeClass("nav-submenu-open"), n(t).find(".nav-search").find("form").slideUp())
                                    })
                                },
                                g = function () {
                                    return e.innerWidth || i.documentElement.clientWidth || i.body.clientWidth
                                },
                                w = function () {
                                    n(t).find(".nav-menu").find("li, a").off(f).off(l).off(c)
                                },
                                C = function () {
                                    if (g() > u.settings.mobileBreakpoint) {
                                        var e = n(t).outerWidth(!0);
                                        n(t).find(".nav-menu").children("li").children(".nav-submenu").each(function () {
                                            n(this).parent().position().left + n(this).outerWidth() > e ? n(this).css("right", 0) : n(this).css("right", "auto")
                                        })
                                    }
                                },
                                y = function () {
                                    function e(e) {
                                        var i = n(e).children(".megamenu-tabs-nav").children("li"),
                                            a = n(e).children(".megamenu-tabs-pane");
                                        n(i).on("click.tabs touchstart.tabs", function (e) {
                                            e.stopPropagation(), e.preventDefault(), n(i).removeClass("active"), n(this).addClass("active"), n(a).hide(0).removeClass("active"), n(a[n(this).index()]).show(0).addClass("active")
                                        })
                                    }

                                    if (n(t).find(".megamenu-tabs").length > 0)
                                        for (var i = n(t).find(".megamenu-tabs"), a = 0; a < i.length; a++) e(i[a])
                                },
                                k = function () {
                                    w(), n(t).find(".nav-submenu").hide(0), navigator.userAgent.match(/Mobi/i) || navigator.maxTouchPoints > 0 || "click" == u.settings.submenuTrigger ? n(t).find(".nav-menu, .nav-dropdown").children("li").children("a").on(f, function (i) {
                                        if (u.hideSubmenu(n(this).parent("li").siblings("li"), u.settings.effect), n(this).closest(".nav-menu").siblings(".nav-menu").find(".nav-submenu").fadeOut(u.settings.hideDuration), n(this).siblings(".nav-submenu").length > 0) {
                                            if (i.stopPropagation(), i.preventDefault(), "none" == n(this).siblings(".nav-submenu").css("display")) return u.showSubmenu(n(this).parent("li"), u.settings.effect), C(), !1;
                                            if (u.hideSubmenu(n(this).parent("li"), u.settings.effect), "_blank" == n(this).attr("target") || "blank" == n(this).attr("target")) e.open(n(this).attr("href"));
                                            else {
                                                if ("#" == n(this).attr("href") || "" == n(this).attr("href")) return !1;
                                                e.location.href = n(this).attr("href")
                                            }
                                        }
                                    }) : n(t).find(".nav-menu").find("li").on(l, function () {
                                        u.showSubmenu(this, u.settings.effect), C()
                                    }).on(c, function () {
                                        u.hideSubmenu(this, u.settings.effect)
                                    }), u.settings.hideSubWhenGoOut && b()
                                },
                                D = function () {
                                    w(), n(t).find(".nav-submenu").hide(0), u.settings.visibleSubmenusOnMobile ? n(t).find(".nav-submenu").show(0) : (n(t).find(".nav-submenu").hide(0), n(t).find(".submenu-indicator").removeClass("submenu-indicator-up"), u.settings.submenuIndicator ? n(t).find(".submenu-indicator").on(f, function (e) {
                                        return e.stopPropagation(), e.preventDefault(), u.hideSubmenu(n(this).parent("a").parent("li").siblings("li"), "slide"), u.hideSubmenu(n(this).closest(".nav-menu").siblings(".nav-menu").children("li"), "slide"), "none" == n(this).parent("a").siblings(".nav-submenu").css("display") ? (n(this).addClass("submenu-indicator-up"), n(this).parent("a").parent("li").siblings("li").find(".submenu-indicator").removeClass("submenu-indicator-up"), n(this).closest(".nav-menu").siblings(".nav-menu").find(".submenu-indicator").removeClass("submenu-indicator-up"), u.showSubmenu(n(this).parent("a").parent("li"), "slide"), !1) : (n(this).parent("a").parent("li").find(".submenu-indicator").removeClass("submenu-indicator-up"), void u.hideSubmenu(n(this).parent("a").parent("li"), "slide"))
                                    }) : k())
                                };
                            u.callback = function (n) {
                                s[n] !== a && s[n].call(t)
                            }, u.init()
                        }, n.fn.navigation = function (e) {
                            return this.each(function () {
                                if (a === n(this).data("navigation")) {
                                    var i = new n.navigation(this, e);
                                    n(this).data("navigation", i)
                                }
                            })
                        }
                    }
                    (jQuery, window, document), $(document).ready(function () {
                        $("#navigation").navigation()
                    });
                });

                // Script For Fix Header on Scroll
                $(window).on('scroll', function () {
                    var scroll = $(window).scrollTop();

                    if (scroll >= 50) {
                        $(".header").addClass("header-fixed");
                    } else {
                        $(".header").removeClass("header-fixed");
                    }
                });
            },
            updateLocale(locale) {
                document.documentElement.setAttribute('lang', locale);
                this.$helper.setLocalStorage('language', locale);
                location.reload();
            },
            prepareFilters() {
                return {
                    lang: this.$i18n.locale
                };
            },
            getAllCategories() {
                let vm = this;
                vm.$helper.showLoader();
                let filters = vm.prepareFilters();
                let dispatch = this.$store.dispatch('moduleCategory/getAllCategories', filters);
                dispatch.then((response) => {
                    let categories = this.$store.getters['moduleCategory/getAllCategories'];
                    vm.categories = categories;
                    vm.navigationBarFunctionality()
                    vm.$helper.hideLoader();
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$helper.hideLoader();
                });
            },
            logout() {
                this.$helper.removeLocalStorage('userInfo');
                this.$helper.removeLocalStorage('token');
                location.reload()
            }
        }
    }
</script>

<style scoped>

</style>