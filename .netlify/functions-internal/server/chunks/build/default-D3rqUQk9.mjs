import { _ as __nuxt_component_0 } from './nuxt-link-DSqC2w--.mjs';
import { useSSRContext, watch, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { useMq } from 'vue3-mq';
import { useRoute } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@intlify/core-base';
import '@intlify/shared';

const _sfc_main$1 = {
  __name: "MainNav",
  __ssrInlineRender: true,
  setup(__props) {
    const mq = useMq();
    const route = useRoute();
    function jump() {
      var url = (void 0).href;
      (void 0).href = "#intro-mobile";
      history.replaceState(null, null, url);
    }
    watch(() => route.name, () => {
      if (mq.mdMinus) {
        jump();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(_attrs)}><nav class="tm-navigation"><ul class="menu cf"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("menu.home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("menu.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "treatments" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("menu.treatments"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("menu.treatments")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><p>${ssrInterpolate(_ctx.$t("osteopathy"))}</p><ul class="submenu"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "pediatric-osteopathy" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("menu.pediatric"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("menu.pediatric")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "geriatric-osteopathy" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("menu.geriatric"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("menu.geriatric")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "massage" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("menu.massages"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("menu.massages")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "annachiara" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("menu.annachiara"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("menu.annachiara")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><a href="#contact">${ssrInterpolate(_ctx.$t("menu.contact"))}</a></li><li><form><label for="locale-select">${ssrInterpolate(_ctx.$t("language"))}: </label><select id="locale-select"><option value="es"${ssrIncludeBooleanAttr(Array.isArray(_ctx.$i18n.locale) ? ssrLooseContain(_ctx.$i18n.locale, "es") : ssrLooseEqual(_ctx.$i18n.locale, "es")) ? " selected" : ""}>es</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(_ctx.$i18n.locale) ? ssrLooseContain(_ctx.$i18n.locale, "en") : ssrLooseEqual(_ctx.$i18n.locale, "en")) ? " selected" : ""}>en</option></select></form></li></ul></nav></header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MainNav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  data: () => ({
    callAdjustLayout: () => ({}),
    currentLayout: "desktop",
    nextLayout: "desktop"
  }),
  mounted() {
    if (this.detectIE()) {
      alert("Please use the latest version of Chrome or Firefox for best browsing experience.");
    }
    this.adjustLayout();
    (void 0).addEventListener("resize", this.adjustLayoutWithDelay);
  },
  beforeUnmount() {
    (void 0).removeEventListener("resize", this.adjustLayoutWithDelay);
  },
  watch: {
    $route(to, from) {
      this.adjustLayoutWithDelay();
    }
  },
  methods: {
    adjustLayout() {
      let block1, block2, block3, block4, block5, block6, block7, block8, block9;
      this.currentLayout = "desktop";
      this.nextLayout = "desktop";
      if ((void 0).innerWidth <= 1199) {
        this.nextLayout = "mobile";
        block1 = (void 0).querySelector("div[data-mobile-seq-no='1']");
        block2 = (void 0).querySelector("div[data-mobile-seq-no='2']");
        block3 = (void 0).querySelector("div[data-mobile-seq-no='3']");
        block4 = (void 0).querySelector("div[data-mobile-seq-no='4']");
        block5 = (void 0).querySelector("div[data-mobile-seq-no='5']");
        block6 = (void 0).querySelector("div[data-mobile-seq-no='6']");
        block7 = (void 0).querySelector("div[data-mobile-seq-no='7']");
        block8 = (void 0).querySelector("div[data-mobile-seq-no='8']");
        block9 = (void 0).querySelector("div[data-mobile-seq-no='9']");
      } else {
        this.nextLayout = "desktop";
        block1 = (void 0).querySelector("div[data-desktop-seq-no='1']");
        block2 = (void 0).querySelector("div[data-desktop-seq-no='2']");
        block3 = (void 0).querySelector("div[data-desktop-seq-no='3']");
        block4 = (void 0).querySelector("div[data-desktop-seq-no='4']");
        block5 = (void 0).querySelector("div[data-desktop-seq-no='5']");
        block6 = (void 0).querySelector("div[data-desktop-seq-no='6']");
        block7 = (void 0).querySelector("div[data-desktop-seq-no='7']");
        block8 = (void 0).querySelector("div[data-desktop-seq-no='8']");
        block9 = (void 0).querySelector("div[data-desktop-seq-no='9']");
      }
      if (this.nextLayout !== this.currentLayout) {
        block2.parentNode.insertBefore(block2, block1.nextSibling);
        block3.parentNode.insertBefore(block3, block2.nextSibling);
        block4.parentNode.insertBefore(block4, block3.nextSibling);
        block5.parentNode.insertBefore(block5, block4.nextSibling);
        block6.parentNode.insertBefore(block6, block5.nextSibling);
        block7.parentNode.insertBefore(block7, block6.nextSibling);
        block8.parentNode.insertBefore(block8, block7.nextSibling);
        block9.parentNode.insertBefore(block9, block8.nextSibling);
        this.currentLayout = this.nextLayout;
      }
    },
    adjustLayoutWithDelay() {
      clearTimeout(this.callAdjustLayout);
      this.callAdjustLayout = setTimeout(this.adjustLayout, 350);
    },
    detectIE() {
      var ua = (void 0).navigator.userAgent;
      var msie = ua.indexOf("MSIE ");
      if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
      }
      var trident = ua.indexOf("Trident/");
      if (trident > 0) {
        var rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
      }
      var edge = ua.indexOf("Edge/");
      if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
      }
      return false;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_MainNav = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_MainNav, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-D3rqUQk9.mjs.map
