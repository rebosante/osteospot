<template>
    <main class="tm-container masonry tm-main-container">
        <div class="item tm-block tm-block-left" data-desktop-seq-no="1"
            data-mobile-seq-no="1">
            <header class="tm-block-brand">
                <div class="tm-text-white tm-block-brand-inner">
                    <img class="tm-logo-brand" src="~/assets/images/logo.svg">
                </div>
            </header>
            <p id="intro-mobile" class="tm-hero-text">
                {{ $t('annachiara.intro') }}
            </p>
        </div>
        <div class="item" data-desktop-seq-no="2" data-mobile-seq-no="4">
            <img src="~/assets/images/image-20.jpg" alt="Image" class="tm-img-left">
        </div>
        <div class="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2"
            data-desktop-seq-no="3" data-mobile-seq-no="5">
            <div v-html="$t('annachiara.mis_habilidades')" />
            <div class="tm-text-right">
                <a href="#" class="tm-btn tm-btn-small tm-btn-primary tm-mt">{{ $t('read_more') }}</a>
            </div>
        </div>
        <div class="item" data-desktop-seq-no="4" data-mobile-seq-no="8">
            <img src="~/assets/images/image-22.jpg" alt="Image" class="tm-img-left">
        </div>
        <Footer />
        <div class="item" data-desktop-seq-no="6" data-mobile-seq-no="2">
            <img src="~/assets/images/image-19.jpg" alt="Image">
        </div>
        <div class="item tm-block-right" data-desktop-seq-no="7" data-mobile-seq-no="3">
            <div class="tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad" v-html="$t('annachiara.filosofia')" />
            <!-- -->
        </div>

        <div class="item" data-desktop-seq-no="8" data-mobile-seq-no="6">
            <img src="~/assets/images/image-21.jpg" alt="Image">
        </div>

        <Contact />

    </main>
</template>