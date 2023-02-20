<template>
    <div id="contact" class="item tm-bg-white tm-block tm-form-section" data-desktop-seq-no="9" data-mobile-seq-no="7">
            <div class="tm-form-container tm-block-pad tm-pb-0">
                <header>
                    <h2 class="tm-text-uppercase tm-text-gray-light tm-mb">
                        {{ $t('contact') }}
                    </h2>
                </header>
                <form action="index.html" class="tm-contact-form" method="POST">
                    <div class="tm-form-group">
                        <input type="text" id="contact_name" name="contact_name" class="form-control" :placeholder="$t('name')" required/>
                    </div>
                    <div class="tm-form-group">
                        <input type="email" id="contact_email" name="contact_email" class="form-control" :placeholder="$t('email')" required/>
                    </div>
                    <div class="tm-form-group">
                        <textarea rows="5" id="contact_message" name="contact_message" class="form-control" :placeholder="$t('message')" required></textarea>
                    </div>
                    <div class="tm-text-right">
                        <button type="submit" class="tm-btn tm-btn-secondary tm-btn-pad-big">{{ $t('send') }}</button>
                    </div>
                </form>
            </div>

            <div class="tm-form-section-tag">
                <div class="tm-bg-secondary tm-text-white tm-block-pad tm-form-section-tag-inner">
                    <header>
                        <h2>Información de contacto</h2>
                    </header>
                    <ul>
                        <li>
                            <a href="" target="_blank">Instagram</a>
                        </li>
                        <li>
                            <a href="" target="_blank">Facebook</a>
                        </li>
                        <li>
                            <a href="" target="_blank">Whatsapp</a>
                        </li>
                    </ul>
                    <p>Carrer del deganat 2</p>
                    <p>Carrer d'Eivissa 3 A</p>
                    <p>Calle Bonaire, 16 &ndash; 1&ordm;</p>
                    <p><strong>
                        Posibilidad de tratamiento a domicilio.
                    </strong></p>
                </div>
            </div>
        </div>
</template>