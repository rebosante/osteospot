<template>
    <main class="tm-container masonry tm-main-container">
        <div class="item tm-block tm-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1">
            <header class="tm-block-brand">
                <div class="tm-text-white tm-block-brand-inner">
                    <img class="tm-logo-brand" src="~/assets/images/logo.svg">
                </div>
            </header>
            <div id="intro-mobile" v-html="$t('geriatric.intro_text')" />
        </div>
        <div class="item" data-desktop-seq-no="2" data-mobile-seq-no="4">
            <img src="~/assets/images/image-04.jpg" alt="Image" class="tm-img-left">
        </div>
        <div class="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2" data-desktop-seq-no="3"
            data-mobile-seq-no="5">
            <div v-html="$t('geriatric.indicated_treatments')" />
            <div class="tm-text-right">
                <a href="#" class="tm-btn tm-btn-small tm-btn-primary tm-mt">{{ $t('read_more') }}</a>
            </div>
        </div>
        <div class="item" data-desktop-seq-no="4" data-mobile-seq-no="8">
            <img src="~/assets/images/image-14.jpg" alt="Image" class="tm-img-left">
        </div>
        <Footer />
        <div class="item" data-desktop-seq-no="6" data-mobile-seq-no="2">
            <img src="~/assets/images/image-13.jpg" alt="Image">
        </div>
        <div class="item tm-block-right" data-desktop-seq-no="7" data-mobile-seq-no="3">
            <div class="tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad" v-html="$t('geriatric.block_3')" />
        </div>

        <div class="item" data-desktop-seq-no="8" data-mobile-seq-no="6">
            <img src="~/assets/images/image-02.jpg" alt="Image">
        </div>

        <Contact />

    </main>
</template>