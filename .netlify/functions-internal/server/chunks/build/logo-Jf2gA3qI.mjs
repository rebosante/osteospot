import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _imports_0$1 = "" + buildAssetsURL("qr-link-tooplate.BczEOctX.png");
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  var _a;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "tm-footer",
    id: "tmFooter",
    "data-desktop-seq-no": "5",
    "data-mobile-seq-no": "9"
  }, _attrs))}><img${ssrRenderAttr("src", _imports_0$1)} alt="QR Code" class="tm-img-qr"><div><p class="tm-mb-small">${(_a = _ctx.$t("home.copyright")) != null ? _a : ""}</p><p> Built by <a href="https://mixapolis.com" rel="nofollow" target="_blank"><strong>Jay</strong></a></p></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
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
    }
  },
  methods: {
    async submitForm() {
      const newURL = (void 0).location.protocol + "//" + (void 0).location.host;
      this.checkFields = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.name.trim() || !emailRegex.test(this.email) || !this.message.trim()) {
        this.generalMessage = "Please fill all fields";
        return;
      }
      this.generalMessage = "";
      console.log("send mail here!");
      this.waiting = true;
      await $fetch(newURL + "/api/contact", {
        method: "POST",
        body: {
          name: this.name,
          email: "info@osteorevolucion.com",
          subject: this.$t("contact.mail_subject"),
          message: this.message + " ++++ RECEIVED FROM ++++ " + this.email
        }
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
        this.generalMessage = this.$t("contact.sent_succesfully");
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
      var url = "https://api.whatsapp.com/send?phone=" + number + "&text=" + encodeURIComponent(message);
      return url;
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
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "contact",
    class: "item tm-bg-white tm-block tm-form-section",
    "data-desktop-seq-no": "9",
    "data-mobile-seq-no": "7"
  }, _attrs))} data-v-46e28159><div class="tm-form-container tm-block-pad tm-pb-0" data-v-46e28159><header data-v-46e28159><h2 class="tm-text-uppercase tm-text-gray-light tm-mb" data-v-46e28159>${ssrInterpolate(_ctx.$t("contact_me"))}</h2></header><form class="tm-contact-form" data-v-46e28159><div class="tm-form-group" data-v-46e28159><input${ssrRenderAttr("value", $data.name)} type="text" id="contact_name" name="contact_name" class="form-control" placeholder="Name" data-v-46e28159>`);
  if ($data.nameError) {
    _push(`<span class="error" data-v-46e28159>${ssrInterpolate($data.nameError)}</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="tm-form-group" data-v-46e28159><input${ssrRenderAttr("value", $data.email)} type="email" id="contact_email" name="contact_email" class="form-control" placeholder="Email" data-v-46e28159>`);
  if ($data.emailError) {
    _push(`<span class="error" data-v-46e28159>${ssrInterpolate($data.emailError)}</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="tm-form-group" data-v-46e28159><textarea rows="5" id="contact_message" name="contact_message" class="form-control" placeholder="Message" data-v-46e28159>${ssrInterpolate($data.message)}</textarea>`);
  if ($data.messageError) {
    _push(`<span class="error" data-v-46e28159>${ssrInterpolate($data.messageError)}</span>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.generalMessage) {
    _push(`<br data-v-46e28159>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.generalMessage) {
    _push(`<span class="error" data-v-46e28159>${ssrInterpolate($data.generalMessage)}</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="tm-text-right" data-v-46e28159><button type="submit" class="tm-btn tm-btn-secondary tm-btn-pad-big" data-v-46e28159>${ssrInterpolate(_ctx.$t("send"))}</button></div></form></div><div class="tm-form-section-tag" data-v-46e28159><div class="tm-bg-secondary tm-text-white tm-block-pad tm-form-section-tag-inner" data-v-46e28159><header data-v-46e28159><h2 data-v-46e28159>${ssrInterpolate(_ctx.$t("contact.title"))}</h2></header><ul data-v-46e28159><li data-v-46e28159><a href="https://www.facebook.com/annachiara.osteospot" target="_blank" data-v-46e28159>Facebook</a></li><li data-v-46e28159><a${ssrRenderAttr("href", $options.getLinkWhastapp("+34666795883", _ctx.$t("contact.message_whatsapp")))} target="_blank" data-v-46e28159>Whatsapp</a></li></ul><p data-v-46e28159>Carrer del Deganat 2</p><p data-v-46e28159>Carrer Pere d&#39;Alc\xE0ntara Penya, 16, 07006. Palma, Illes Balears</p><p data-v-46e28159><strong data-v-46e28159>${ssrInterpolate(_ctx.$t("contact.treatments_message"))}</strong></p><a href="tel:+34666795883" data-v-46e28159>${ssrInterpolate(_ctx.$t("call_me"))}</a></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-46e28159"]]);
const _imports_0 = "" + buildAssetsURL("logo.BImcHjGe.svg");

export { _imports_0 as _, __nuxt_component_0 as a, __nuxt_component_1 as b };
//# sourceMappingURL=logo-Jf2gA3qI.mjs.map
