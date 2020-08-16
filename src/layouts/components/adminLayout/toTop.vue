<template>
    <div>
        <a id="back2Top" class="top-scroll" title="Back to top" href="#"><i class="ti-arrow-up"></i></a>
    </div>
</template>

<script>
    export default {
        name: "toTop",
        mounted() {
            this.triggerFunctionality();
        },
        methods: {
            triggerFunctionality() {

                // Bottom To Top Scroll Script
                $(window).on('scroll', function () {
                    var height = $(window).scrollTop();
                    if (height > 100) {
                        $('#back2Top').fadeIn();
                    } else {
                        $('#back2Top').fadeOut();
                    }
                });

                $("#back2Top").on('click', function (event) {
                    event.preventDefault();
                    $("html, body").animate({scrollTop: 0}, "slow");
                    return false;
                });

            }
        }
    }
</script>

<style scoped>

</style>