<template>
    <div id="wrap">
        <Header/>
        <div id="main-container" class="container main-container">
            <router-view/>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from "@/components/layouts/Header";
    // 引入 Footer.vue 的默认值
    import Footer from '@/components/layouts/Footer';

    export default {
        name: 'App',
        components: {
            Header,
            // 注册 Footer
            Footer
        },
    }
</script>

<style lang="scss">
    $container-large-desktop: 1200px;
    $btn-primary-bg: #00b5ad;
    $btn-primary-border: #00b5ad;
    $label-primary-bg: #00b5ad;
    $pagination-active-bg: #00b5ad;
    $pagination-active-border: #00b5ad;
    $pagination-color: #00b5ad;
    $input-border-focus: #00b5ad;
    $link-color: #12c4c5;
    $link-hover-color: #22ddde;
    $icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
    $fa-font-path: "~font-awesome/fonts/";

    @import "~bootstrap-sass/assets/stylesheets/_bootstrap";
    @import "~font-awesome/scss/font-awesome";
    @import "styles/main";
    @import "styles/extra";
    @import "~simplemde/dist/simplemde.min.css";
    @import '~highlight.js/styles/paraiso-dark.css';
    @import "~animate.css/animate.min.css";
</style>