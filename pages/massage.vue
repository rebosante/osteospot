<template>
    <main class="tm-container masonry tm-main-container">
        <div class="item tm-block tm-block-left" data-desktop-seq-no="1"
            data-mobile-seq-no="1">
            <header class="tm-block-brand">
                <div class="tm-text-white tm-block-brand-inner">
                    <img class="tm-logo-brand" src="~/assets/images/logo.svg">
                </div>
            </header>
            <p class="tm-hero-text" v-html="$t('massages.intro')" />
        </div>
        <div class="item" data-desktop-seq-no="2" data-mobile-seq-no="4">
            <img src="~/assets/images/image-01.jpg" alt="Image" class="tm-img-left">
        </div>
        <div class="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2"
            data-desktop-seq-no="3" data-mobile-seq-no="5" v-html="$t('massages.sport')" />
        <div class="item" data-desktop-seq-no="4" data-mobile-seq-no="8">
            <img src="~/assets/images/image-17.jpg" alt="Image" class="tm-img-left">
        </div>
        <Footer />
        <div class="item" data-desktop-seq-no="6" data-mobile-seq-no="2">
            <img src="~/assets/images/image-11.jpg" alt="Image">
        </div>
        <div class="item tm-block-right" data-desktop-seq-no="7" data-mobile-seq-no="3">
            <div class="tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad" v-html="$t('massages.therapeutic')" />
                <!-- -->
        </div>

        <div class="item" data-desktop-seq-no="8" data-mobile-seq-no="6">
            <img src="~/assets/images/image-18.jpg" alt="Image">
        </div>

        <Contact />
    </main>
</template>