<template>
    <div>
        <a href="https://play.google.com/store" target="_blank">
            <div class="bg_header direction">
                <div class="overlayblack"></div>
                <div class="fixed_data text-left">
                    <h2 class="font-weight-bold">ذاكر من أي مكان!</h2>
                    <h3 class="text-white">حمل التطبيق دلوقتي! مجاناً!</h3>
                </div>
            </div>
        </a>
        <!--<Header/>-->
        <!--<Features v-for="(category , index) in getAllCategories" :bgColor="(index % 2 == 0) ? '#fff' : '#eee'"-->
        <!--:category="category"/>-->
        <!--<newsLetter/>-->
    </div>
</template>

<script>
    import Header from './components/Home/Header'
    import Features from './components/Home/Features'
    import newsLetter from './components/Home/newsLetter'

    export default {
        name: "Home",
        components: {
            Header, Features, newsLetter
        },
        mounted() {
            this.chatra();
        },
        computed: {
            getAllCategories() {
                return this.$store.getters['moduleCategory/getAllCategories'];
            },
        },
        methods: {
            chatra() {
                window.dataLayer = window.dataLayer || [];

                function gtag() {
                    dataLayer.push(arguments);
                }

                gtag('js', new Date());

                gtag('config', 'UA-168630662-1');

                if (window.navigator && navigator.serviceWorker) {
                    navigator.serviceWorker.getRegistrations()
                        .then(function (registrations) {
                            for (let registration of registrations) {
                                registration.unregister();
                            }
                        });
                }

                (function (d, w, c) {
                    w.ChatraID = 'tDiNjjYpdFmabKWmL';
                    var s = d.createElement('script');
                    w[c] = w[c] || function () {
                        (w[c].q = w[c].q || []).push(arguments);
                    };
                    s.async = true;
                    s.src = 'https://call.chatra.io/chatra.js';
                    if (d.head) d.head.appendChild(s);
                })(document, window, 'Chatra');
            }
        }
    }
</script>

<style>
    .overlayblack {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
    }

    .bg_header {
        position: relative;
        background: url("../../assets/img/mobile-ad.jpg") center center no-repeat;
        background-size: cover;
        min-height: 100vh;
    }

    .fixed_data {
        background: rgba(0, 0, 0, 0.6);
        padding: 10px;
        position: fixed;
        right: 20px;
        bottom: 80px;
    }
</style>