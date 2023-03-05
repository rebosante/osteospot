<template>
    <main class="tm-container masonry tm-main-container">
        <div class="item tm-block tm-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1">
            <header class="tm-block-brand">
                <div class="tm-text-white tm-block-brand-inner">
                    <img class="tm-logo-brand" src="~/assets/images/logo.svg">
                </div>
            </header>
            <p class="tm-hero-text">
                {{ $t('treatments.intro_text') }}
            </p>
        </div>
        <div class="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2" v-html="$t('treatments.craneo_sacral')" data-desktop-seq-no="2" data-mobile-seq-no="4" />
        <div class="item" data-desktop-seq-no="3"
            data-mobile-seq-no="5">
            <div class="treatment-2" v-html="$t('treatments.reflexology')" />
        </div>
        <div class="item" data-desktop-seq-no="4" data-mobile-seq-no="8">
            <div class="treatment-3">
                <div v-html="$t('treatments.drenaje_linfatico')" />
                <ReadMore to="massage" />
            </div>
        </div>
        <Footer />
        <div class="item" data-desktop-seq-no="6" data-mobile-seq-no="2">
            <div class="treatment-1" v-html="$t('treatments.osteopatia_estructural')"/>
        </div>
        <div class="item tm-block-right" data-desktop-seq-no="7" data-mobile-seq-no="3">
            <div class="tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad" v-html="$t('treatments.visceral')" />
        </div>

        <div class="item" data-desktop-seq-no="8" data-mobile-seq-no="6">
            <img src="~/assets/images/image-05.jpg" alt="Image">
        </div>

        <Contact />

    </main>
</template>