<template>
    <div id="contact" class="item tm-bg-white tm-block tm-form-section" data-desktop-seq-no="9" data-mobile-seq-no="7">
        <div class="tm-form-container tm-block-pad tm-pb-0">
            <header>
                <h2 class="tm-text-uppercase tm-text-gray-light tm-mb">
                    {{ $t('contact_me') }}
                </h2>
            </header>
            <form @submit.prevent="submitForm" class="tm-contact-form">
                <div class="tm-form-group">
                    <input v-model="name" type="text" id="contact_name" name="contact_name" class="form-control"
                        placeholder="Name">
                    <span v-if="nameError" class="error">{{ nameError }}</span>
                </div>
                <div class="tm-form-group">
                    <input v-model="email" type="email" id="contact_email" name="contact_email" class="form-control"
                        placeholder="Email">
                    <span v-if="emailError" class="error">{{ emailError }}</span>
                </div>
                <div class="tm-form-group">
                    <textarea v-model="message" rows="5" id="contact_message" name="contact_message"
                        class="form-control" placeholder="Message"></textarea>
                    <span v-if="messageError" class="error">{{ messageError }}</span>
                    <br v-if="generalMessage || successMessage">
                    <span v-if="generalMessage" class="error">{{ generalMessage }}</span>
                    <span v-if="successMessage" class="success">{{ successMessage }}</span>
                </div>
                <div class="tm-text-right">
                    <button type="submit" class="tm-btn tm-btn-secondary tm-btn-pad-big">{{ $t('send') }}</button>
                </div>
            </form>
        </div>

        <div class="tm-form-section-tag">
            <div class="tm-bg-secondary tm-text-white tm-block-pad tm-form-section-tag-inner">
                <header>
                    <h2>{{ $t('contact.title') }}</h2>
                </header>
                <ul>
                    <!-- li> <a href="" target="_blank">Instagram</a> </li -->
                    <li> <a href="https://www.facebook.com/annachiara.osteospot" target="_blank">Facebook</a> </li>
                    <li> <a :href="getLinkWhastapp('+34666795883', $t('contact.message_whatsapp'))" target="_blank">Whatsapp</a> </li>
                </ul>
                <p>Carrer de Tous i Maroto, 12, Centre, 07001 Palma, Illes Balears</p>
                <!-- insert google map here with the address and the link to the google maps -->
                <div class="google-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.6986500000003!2d1.267736076104013!3d39.56960947945679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12978975d6422573%3A0x6810950412796a3!2sCarrer%20de%20Tous%20i%20Maroto%2C%2012%2C%20Centre%2C%2007001%20Palma%2C%20Illes%20Balears!5e0!3m2!1ses!2ses!4v1758702400000!5m2!1ses!2ses" style="border:0; width: 100%; height: 350px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <p><strong> {{ $t('contact.treatments_message') }} </strong></p>
                <a href="tel:+34666795883">{{ $t('call_me') }}</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            message: "",
            nameError: "",
            emailError: "",
            messageError: "",
            generalMessage: "",
            successMessage: "",
            successMessageTimer: null,
            waiting: false,
            success: false,
            errors: false,
            checkFields: false
        };
    },
    computed: {
        formInvalid() {
            return this.nameError || this.emailError || this.messageError || this.generalMessage;
        },
    },
    beforeUnmount() {
        clearTimeout(this.successMessageTimer);
    },
    methods: {
        showSuccessMessage() {
            clearTimeout(this.successMessageTimer);
            this.successMessage = this.$t('contact.sent_succesfully');
            this.successMessageTimer = setTimeout(() => {
                this.successMessage = "";
                this.successMessageTimer = null;
            }, 30000);
        },
        async submitForm() {
            const newURL = window.location.protocol + "//" + window.location.host;
            this.checkFields = true;
            const name = this.name.trim();
            const email = this.email.trim();
            const message = this.message.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!name || !emailRegex.test(email) || !message) {
                this.generalMessage = "Please fill all fields";
                return
            }
            this.generalMessage = "";
            this.waiting = true;
            await $fetch(newURL + '/api/contact', {
                method: 'POST',
                body: {
                    name,
                    email: 'info@osteorevolucion.com',
                    subject: this.$t('contact.mail_subject'),
                    message: message + " ++++ RECEIVED FROM ++++ " + email,
                },
            }).then(() => {
                this.checkFields = false;
                this.errors = false;
                this.success = true;
                this.waiting = false;
                this.name = "";
                this.email = "";
                this.message = "";
                this.nameError = "";
                this.emailError = "";
                this.messageError = "";
                this.showSuccessMessage();
            });
        },
        validateName() {
            if (!this.name.trim()) {
                this.nameError = "Name is required";
            } else {
                this.nameError = "";
            }
        },
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.email.trim())) {
                this.emailError = "Please enter a valid email address";
            } else {
                this.emailError = "";
            }
        },
        validateMessage() {
            if (!this.message.trim()) {
                this.messageError = "Message is required";
            } else {
                this.messageError = "";
            }
        },
        getLinkWhastapp(number, message) {
            var url = 'https://api.whatsapp.com/send?phone=' 
                + number 
                + '&text=' 
                + encodeURIComponent(message)

            return url
            }
    },
    watch: {
        name() {
            if (this.generalMessage) this.generalMessage = "";
            if (this.checkFields) this.validateName();
        },
        email() {
            if (this.generalMessage) this.generalMessage = "";
            if (this.checkFields) this.validateEmail();
        },
        message() {
            if (this.generalMessage) this.generalMessage = "";
            if (this.checkFields) this.validateMessage();
        },
    },
};
</script>

<style scoped lang="css">
.error {
    color: red;
    font-size: 14px;
}
.success {
    color: #2e7d32;
    font-size: 14px;
}
</style>