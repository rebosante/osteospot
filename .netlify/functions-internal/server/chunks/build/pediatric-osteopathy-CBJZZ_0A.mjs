import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_0, a as __nuxt_component_0, b as __nuxt_component_1 } from './logo-Jf2gA3qI.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _imports_1 = "" + buildAssetsURL("image-07.DG3sC7xF.jpg");
const _imports_2 = "" + buildAssetsURL("image-09.ZVjhu4xp.jpg");
const _imports_3 = "" + buildAssetsURL("image-06.DfT7LthQ.jpg");
const _imports_4 = "" + buildAssetsURL("image-15.B-B-PSGm.jpg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  var _a, _b, _c;
  const _component_Footer = __nuxt_component_0;
  const _component_Contact = __nuxt_component_1;
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "tm-container masonry tm-main-container" }, _attrs))}><div class="item tm-block tm-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1"><header class="tm-block-brand"><div class="tm-text-white tm-block-brand-inner"><img class="tm-logo-brand"${ssrRenderAttr("src", _imports_0)}></div></header><div id="intro-mobile" class="tm-hero-text-titled">${(_a = _ctx.$t("pediatric.craneo_sacral")) != null ? _a : ""}</div></div><div class="item" data-desktop-seq-no="2" data-mobile-seq-no="4"><img${ssrRenderAttr("src", _imports_1)} alt="Image" class="tm-img-left"></div><div class="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2" data-desktop-seq-no="3" data-mobile-seq-no="5">${(_b = _ctx.$t("pediatric.sutherland_block")) != null ? _b : ""}</div><div class="item" data-desktop-seq-no="4" data-mobile-seq-no="8"><img${ssrRenderAttr("src", _imports_2)} alt="Image" class="tm-img-left"></div>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`<div class="item" data-desktop-seq-no="6" data-mobile-seq-no="2"><img${ssrRenderAttr("src", _imports_3)} alt="Image"></div><div class="item tm-block-right" data-desktop-seq-no="7" data-mobile-seq-no="3"><div class="tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad">${(_c = _ctx.$t("pediatric.osteopata_block")) != null ? _c : ""}</div></div><div class="item" data-desktop-seq-no="8" data-mobile-seq-no="6"><img${ssrRenderAttr("src", _imports_4)} alt="Image"></div>`);
  _push(ssrRenderComponent(_component_Contact, null, null, _parent));
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pediatric-osteopathy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pediatricOsteopathy = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { pediatricOsteopathy as default };
//# sourceMappingURL=pediatric-osteopathy-CBJZZ_0A.mjs.map
