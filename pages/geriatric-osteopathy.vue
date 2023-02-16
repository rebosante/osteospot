<template>
    <main class="tm-container masonry tm-main-container">
        <div class="item tm-block tm-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1">
            <header class="tm-block-brand">
                <div class="tm-text-white tm-block-brand-inner">
                    <img class="tm-logo-brand" src="~/assets/images/logo.svg">
                </div>
            </header>
            <p class="tm-hero-text tm-bg-white-transparence">A medida que envejecemos nos encontramos con una serie de patolog&iacute;as y problemas f&iacute;sicos que pueden afectar seriamente la calidad de vida de una persona. Estos problemas suelen depender de factores como el trabajo realizado en el pasado, los traumas sufridos, las patolog&iacute;as previas o los dolores que se presentan con frecuencia a lo largo de los a&ntilde;os.</p>
        </div>
        <div class="item" data-desktop-seq-no="2" data-mobile-seq-no="4">
            <img src="~/assets/images/image-01.jpg" alt="Image" class="tm-img-left">
        </div>
        <div class="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2" data-desktop-seq-no="3"
            data-mobile-seq-no="5">
            <i class="fas fa-award fa-4x tm-block-icon"></i>
            <p>Los tratamientos osteop&aacute;ticos est&aacute;n indicados en caso de:</p>
            <ul>
                <li>Dolores musculares</li>
                <li>Disminuci&oacute;n o p&eacute;rdida de la movilidad articular</li>
                <li>Trastornos del sue&ntilde;o</li>
                <li>Disminuci&oacute;n temporal de las capacidades intelectuales</li>
                <li>Ca&iacute;da sin p&eacute;rdida del conocimiento o sin fracturas</li>
                <li>Problemas otorrinolaringol&oacute;gicos</li>
                <li>dolores de cabeza</li>
                <li>Hacer un balance de la salud</li>
                <li>Cuando deja de trabajar</li>
                <li>Antes de iniciar una nueva actividad motora.</li>
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
                <p>La osteopat&iacute;a puede ser una ayuda muy valiosa para esta fase de la vida: con tratamientos suaves e indoloros, se pueden abordar los diversos problemas que afectan a la persona mayor en su d&iacute;a a d&iacute;a. El tratamiento osteop&aacute;tico alivia el dolor y reduce las molestias, ayudando a los ancianos a conservar el tono y la vitalidad.</p>
                <br/>
                <p>Patolog&iacute;as como la osteoartritis y el dolor articular deben considerarse fisiol&oacute;gicas, normales a cierta edad, pero no se puede permitir que estas condiciones comprometan a una persona de manera debilitante.</p>
                <br/>
                <p>El tratamiento osteop&aacute;tico ayuda a mejorar la movilidad de las articulaciones ya elastificar todos los tejidos para permitir un mejor movimiento de las extremidades..</p>
                <br />
                <p>Il trattamento osteopatico allevia notevolmente la sintomatologia, promuovendo la mobilit&agrave; e la funzionalit&agrave; del corpo e aiutando il paziente a ritrovare il benessere ed una vita pi&ugrave; serena.</p>
                <br />
                <p>Adem&aacute;s de los problemas relacionados con el sistema musculoesquel&eacute;tico, el tratamiento osteop&aacute;tico es eficaz para enfermedades muy comunes como la hipertensi&oacute;n y la hipotensi&oacute;n, las dificultades intestinales, la incontinencia urinaria y los problemas vasculares, mejorando el metabolismo y la funcionalidad de los distintos &oacute;rganos y favoreciendo la circulaci&oacute;n y el drenaje sangu&iacute;neo.</p>
                <!-- -->
            </div>
        </div>

        <div class="item" data-desktop-seq-no="8" data-mobile-seq-no="6">
            <img src="~/assets/images/image-03.jpg" alt="Image">
        </div>

        <Contact />

    </main>
</template>