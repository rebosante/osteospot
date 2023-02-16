<template>
    <main class="tm-container masonry tm-main-container">
        <div class="item tm-block tm-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1">
            <header class="tm-block-brand">
                <div class="tm-text-white tm-block-brand-inner">
                    <img class="tm-logo-brand" src="~/assets/images/logo.svg">
                </div>
            </header>
            <p class="tm-hero-text tm-bg-white-transparence">
                {{ $t('treatments.intro_text') }}
            </p>
        </div>
        <div class="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2" data-desktop-seq-no="2" data-mobile-seq-no="4">
            <i class="fas fa-award fa-4x tm-block-icon"></i>
            <h2>CRANEO SACRAL</h2>
            <p>La osteopat&iacute;a sacro craneal se llama as&iacute; debido a que el conjunto que forman el cr&aacute;neo, las v&eacute;rtebras, y el sacro; forman una unidad de movimiento perceptible. Y esto es as&iacute; puesto que la osteopat&iacute;a contempla la llamada &ldquo;respiraci&oacute;n primordial&rdquo; que ejerce todo ese sistema y que sirve para llevar el L&iacute;quido cefalorraqu&iacute;deo a todo el cuerpo.</p>
            <p>CONSEJADO para:</p>
            <ul>
                <li>problema de sue&ntilde;o</li>
                <li>cefaleas</li>
                <li>estress</li>
                <li>problemas articulacion temporamandibular</li>
                <li>alergias</li>
            </ul>
        </div>
        <div class="item" data-desktop-seq-no="3"
            data-mobile-seq-no="5">
            <div class="treatment-2">
                <h2>Reflexologia NeuroMuscolare</h2>
                <p>Consiste en una t&eacute;cnica avanzada de&nbsp;reflexolog&iacute;a podal,</p>
                <p>destinado a regular el sistema nervioso y el&nbsp;tratamiento</p>
                <p>de lesiones del tejido muscolar.</p>
                <p>recomendado para:</p>
                <ul>
                    <li>tratamiento de procesos inflamatorios y doloros de los tejidos blando
                        <ul>
                            <li>muscolos</li>
                            <li>tendones</li>
                            <li>ligamentos</li>
                            <li>fascia</li>
                        </ul>
                    </li>
                </ul>
                <hr />
                <h2>Reflexologia Corporal</h2>
                <p>Tecnica natural que promuuove el restablecimiento del equilibrio del organismo</p>
                <p>se basa en el estimulo manual de las areas reflejas con el objetivo de facilitarle al organismo su proceso de homeostasis.</p>
                <ul>
                    <li>Estimula el desbloqueo energetico</li>
                    <li>Favorece la relajacion y alivia estres</li>
                    <li>Estimula los impulso nerviosos, la circulacion sanguinea y el sistema inmunologico</li>
                    <li>Despierta los mecanismo naturales de eliminacion</li>
                    <li>Excelente como metodo preventivo</li>
                </ul>
            </div>
        </div>
        <div class="item" data-desktop-seq-no="4" data-mobile-seq-no="8">
            <div class="treatment-3">
                <h2>Drenaje linfatico piernas y pies</h2>
                <p>Ayuda al efecto drenante sobre los vasos linf&aacute;ticos y drenaje fisiol&oacute;gico del l&iacute;quido estancado y ayuda a la reabsorci&oacute;n de los l&iacute;quidos en los vasos superficiales.</p>
                <p>La endocrina act&uacute;a sobre las gl&aacute;ndulas y el sistema para aumentar el sistema inmunol&oacute;gico.</p>
                <hr class="hr-pad"/>
                <h2>TRATAMIENTO ANTI ARTROSIS MANOS Y PIES</h2>
                <p>Ayuda a mejorar todas las modificationes de los dedosde los pies y de las manos que en los a&ntilde;os van aumentando y pueden causar problemas. Imporante con el tiempo.</p>
                <p>Mejora visibilmente la elasticidad de los tejidos.</p>
                <hr class="hr-pad"/>
                <h2>Massajes Corporales y Reiki</h2>
            </div>
        </div>
        <Footer />
        <div class="item" data-desktop-seq-no="6" data-mobile-seq-no="2">
            <div class="treatment-1">
                <h2>Osteopatia estructural + masaje miofascial</h2>
                <p>Masaje extremadamente relajante de las fascias musculares. Para contracturas y para mejorar las funciones de los ligamentos y tendones.</p>
                <p>Mas Normalizaciones osteopaticas. <br/>Recomendado para:</p>
                <ul>
                    <li>contracturas muscolares</li>
                    <li>cervicalgias, dorsalgias, lumbalgias</li>
                    <li>ciaticas, hernias discales, dolor artrosico</li>
                    <li>periartitris scapulo-humerales</li>
                    <li>esguince</li>
                    <li>menisco</li>
                    <li>cadera</li>
                    <li>elastification ventral y problemas mandibulares.</li>
                </ul>
            </div>
        </div>
        <div class="item tm-block-right" data-desktop-seq-no="7" data-mobile-seq-no="3">
            <div class="tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad">
                <header>
                    <h2 class="tm-text-uppercase">
                        TRATAMIENTOS VISCERAL
                    </h2>
                </header>
                <p>Tecnica osteopatica para dar alivio a los organos interno para que funcionen mas fluidamente</p>
                <p>indicato para quien tiene:</p>
                <ul>
                <li>molestias digestivas</li>
                <li>gastritis y molestias intestinales</li>
                <li>estre&ntilde;imiento</li>
                <li>hernias de hiato</li>
                <li>trastornos ginecologico, incontinencia etc.</li>
                <li>continuos dolor de espalda</li>
                </ul>
                <p>Alivia y mejoras molestias de los ciclos femininos y del tono muscolar.</p>
                <!-- -->
            </div>
        </div>

        <div class="item" data-desktop-seq-no="8" data-mobile-seq-no="6">
            <img src="~/assets/images/image-05.jpg" alt="Image">
        </div>

        <Contact />

    </main>
</template>