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
                    <input v-model.trim="name" type="text" id="contact_name" name="contact_name" class="form-control"
                        placeholder="Name">
                    <span v-if="nameError" class="error">{{ nameError }}</span>
                </div>
                <div class="tm-form-group">
                    <input v-model.trim="email" type="email" id="contact_email" name="contact_email" class="form-control"
                        placeholder="Email">
                    <span v-if="emailError" class="error">{{ emailError }}</span>
                </div>
                <div class="tm-form-group">
                    <textarea v-model.trim="message" rows="5" id="contact_message" name="contact_message"
                        class="form-control" placeholder="Message"></textarea>
                    <span v-if="messageError" class="error">{{ messageError }}</span>
                    <br v-if="generalMessage">
                    <span v-if="generalMessage" class="error">{{ generalMessage }}</span>
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
                <p>Carrer del Deganat 2</p>
                <p>Carrer Pere d'Alc&agrave;ntara Penya, 16, 07006. Palma, Illes Balears</p>
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
    methods: {
        async submitForm() {
            const newURL = window.location.protocol + "//" + window.location.host;
            this.checkFields = true;
            // console.log(newURL + '/api/contact');
            // handle form submission
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.name.trim() || !emailRegex.test(this.email) || !this.message.trim()) {
                this.generalMessage = "Please fill all fields";
                return
            }
            this.generalMessage = "";
            console.log('send mail here!');
            // Send email using nuxt-mail
            this.waiting = true;
            await $fetch(newURL + '/api/contact', {
                method: 'POST',
                body: {
                    name: this.name,
                    email: 'info@osteorevolucion.com',
                    subject: this.$t('contact.mail_subject'),
                    message: this.message + " ++++ RECEIVED FROM ++++ " + this.email,
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
                this.generalMessage = this.$t('contact.sent_succesfully');
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
            if (!emailRegex.test(this.email)) {
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
            if (this.checkFields) this.validateName();
        },
        email() {
            if (this.checkFields) this.validateEmail();
        },
        message() {
            if (this.checkFields) this.validateMessage();
        },
    },
};
</script>

<style scoped lang="css">.error {
    color: red;
    font-size: 14px;
}</style>