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
                El arte del bienestar físico y mental, tratamientos personalizado
            </p>
        </div>
        <div class="item" data-desktop-seq-no="2" data-mobile-seq-no="4">
            <img src="~/assets/images/image-01.jpg" alt="Image" class="tm-img-left">
        </div>
        <div class="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2"
            data-desktop-seq-no="3" data-mobile-seq-no="5">
            <i class="fas fa-award fa-4x tm-block-icon"></i>
            <h2>Masaje Deportivo</h2>
            <p>Sus objetivos consisten en la prevenci&oacute;n y tratamiento de lesiones deportivas. - Preparando el
                tejido muscular para el esfuerzo deportivo, manteni&eacute;ndolo en un estado &oacute;ptimo. -
                Previniendo las lesiones tanto en entrenamiento como en competici&oacute;n. - Favoreciendo la
                recuperaci&oacute;n de las lesiones que se presenten y de la forma f&iacute;sica del deportista.</p>
            <br />
            <h2>masaje energetico</h2>
            <p>Tratamiento reequilibrante con aceite esencial de menta. es un masaje de cuerpo completo con
                presi&oacute;n en los puntos energ&eacute;tico de los pies y los o&iacute;dos. Te da una
                sensaci&oacute;n de energ&iacute;a renovada.</p>
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
                <h2>Masaje Descontracturante o Terap&eacute;utico</h2>
                <p>Incre&iacute;ble tratamiento para aliviar el estr&eacute;s. un masaje de cuerpo completo
                    profundamente relajante con movimientos suaves y profundos. Al principio sin aceite usando una
                    t&eacute;cnica de fascioterapia para estirar el m&uacute;sculo y luego con aceite para inducir un
                    estado de calma total. podemos mezclar con t&eacute;cnicas de reflexolog&iacute;a craneo sacra y
                    podal</p>
                <br />
                <p>An incredible stress relief treatment. a deeply relaxing full body massage with softly and deep
                    moviments. At strats witout oil using a fascioterapy technic to stretching muscle and then by oil to
                    inducing a complte stete of calm.&nbsp; we can mix with&nbsp; craneo sacral&nbsp; and podal
                    reflexology technic.</p>
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