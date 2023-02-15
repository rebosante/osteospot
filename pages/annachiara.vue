<template>
    <main class="tm-container masonry tm-main-container">
        <div class="item tm-block tm-block-left" data-desktop-seq-no="1"
            data-mobile-seq-no="1">
            <header class="tm-block-brand">
                <div class="tm-text-white tm-block-brand-inner">
                    <img class="tm-logo-brand" src="~/assets/images/logo.svg">
                </div>
            </header>
            <p class="tm-hero-text tm-bg-white-transparence">
                Intro Annachiara about
            </p>
        </div>
        <div class="item" data-desktop-seq-no="2" data-mobile-seq-no="4">
            <img src="~/assets/images/image-01.jpg" alt="Image" class="tm-img-left">
        </div>
        <div class="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2"
            data-desktop-seq-no="3" data-mobile-seq-no="5">
            <i class="fas fa-award fa-4x tm-block-icon"></i>
            <h2>Mis habilidades</h2>
            <ul>
                <li>Osteopata por la escuela de osteopatia Gaia en Mallorca.</li>
                <li>Especialista en Osteopat&iacute;a infantil y visceral.</li>
                <li>Especializaci&oacute;n en reflexolog&iacute;a craneal, podal y neuromuscular.</li>
                <li>Formaci&oacute;n en terapia manual para el s&iacute;ndrome de dolor miofascial.</li>
                <li>Formaci&oacute;n en digitopresi&oacute;n para el tratamiento de artrosis.</li>
                <li>Especialista en tratamientos antiaging y rejuvenecimiento facial y corporal.</li>
            </ul>
            <h2>Idiomas</h2>
            <ul>
                <li>Castellano</li>
                <li>Ingl&eacute;s</li>
                <li>Italiano</li>
            </ul>
            <div class="tm-text-right">
                <a href="#" class="tm-btn tm-btn-small tm-btn-primary tm-mt">{{ $t('read_more') }}</a>
            </div>
        </div>
        <div class="item" data-desktop-seq-no="4" data-mobile-seq-no="8">
            <img src="~/assets/images/image-04.jpg" alt="Image" class="tm-img-left">
        </div>
        <Footer />
        <div class="item" data-desktop-seq-no="6" data-mobile-seq-no="2">
            <img src="~/assets/images/image-02.jpg" alt="Image">
        </div>
        <div class="item tm-block-right" data-desktop-seq-no="7" data-mobile-seq-no="3">
            <div class="tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad">
                <h2>Filosof&iacute;a</h2>
                <p>El descubrimiento de la belleza y perfecci&oacute;n del cuerpo humano fue el acontecimiento m&aacute;s importante de mi vida.</p>
                <p>Con la m&aacute;xima atenci&oacute;n y partiendo de las limitaciones personales y los problemas f&iacute;sicos que me acercaron a estos estudios, descubr&iacute; la belleza y la integridad de la osteopat&iacute;a, que con su visi&oacute;n integral del ser humano puede ayudarte a vivir y conocerte mejor. La disciplina del Yoga ha sido y es de gran ayuda y apoyo para m&iacute; y para ayudar a las personas a realizar estiramientos adecuados en casa, mejorando y prolongando los efectos positivos del trabajo de consulta y la salud de sus m&uacute;sculos.</p>
                <!-- -->
            </div>
        </div>

        <div class="item" data-desktop-seq-no="8" data-mobile-seq-no="6">
            <img src="~/assets/images/image-03.jpg" alt="Image">
        </div>

        <div id="contact" class="item tm-bg-white tm-block tm-form-section" data-desktop-seq-no="9" data-mobile-seq-no="7">
            <div class="tm-form-container tm-block-pad tm-pb-0">
                <header>
                    <h2 class="tm-text-uppercase tm-text-gray-light tm-mb">
                        {{ $t('contact') }}
                    </h2>
                </header>
                <form action="index.html" class="tm-contact-form" method="POST">
                    <div class="tm-form-group">
                        <input type="text" id="contact_name" name="contact_name" class="form-control"
                            :placeholder="$t('name')" required />
                    </div>
                    <div class="tm-form-group">
                        <input type="email" id="contact_email" name="contact_email" class="form-control"
                            :placeholder="$t('email')" required />
                    </div>
                    <div class="tm-form-group">
                        <textarea rows="5" id="contact_message" name="contact_message" class="form-control"
                            :placeholder="$t('message')" required></textarea>
                    </div>
                    <div class="tm-text-right">
                        <button type="submit" class="tm-btn tm-btn-secondary tm-btn-pad-big">{{ $t('send') }}</button>
                    </div>
                </form>
            </div>

            <div class="tm-form-section-tag">
                <div class="tm-bg-secondary tm-text-white tm-block-pad tm-form-section-tag-inner">
                    <h2>tratamiento facial</h2>
                    <p>ligero masaje muy relajante de los puntos linfatico de la cara, liberacion de los musclos y
                        estiramiento de los mismos, descoaptaciones de las articulaciones faciales y de la cabeza y
                        masaje final descongestionante ojeras.</p>
                </div>
            </div>
        </div>

    </main>
</template>