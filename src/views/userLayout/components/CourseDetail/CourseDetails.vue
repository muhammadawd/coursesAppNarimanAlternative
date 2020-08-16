<template>
    <div>
        <!-- ============================ Course Detail ================================== -->
        <section class="bg-light pt-0">
            <div class="container">
                <div class="row direction">

                    <div class="col-lg-8 col-md-8 pt-5">
                        <CourseShow :list="list"/>
                        <CourseList :list="list"/>
                    </div>

                    <div class="col-lg-4 col-md-4">

                        <CourseCheckout :list="list"/>

                    </div>

                </div>

            </div>
        </section>
        <!-- ============================ Course Detail ================================== -->
    </div>
</template>

<script>
    import CourseList from './CourseList'
    import CourseCheckout from './CourseCheckout'
    import CourseShow from './CourseShow'

    export default {
        name: "CourseDetails",
        components: {
            CourseCheckout, CourseShow, CourseList
        },
        props:['list']
    }
</script>

<style scoped>

</style>