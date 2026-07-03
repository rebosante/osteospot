import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_0, a as __nuxt_component_0, b as __nuxt_component_1 } from './logo-Jf2gA3qI.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const _imports_1 = "" + buildAssetsURL("image-20.DJawdbl2.jpg");
const _imports_2 = "" + buildAssetsURL("image-22.DgwpEWMP.jpg");
const _imports_3 = "" + buildAssetsURL("image-19.C2nnQ4wm.jpg");
const _imports_4 = "" + buildAssetsURL("image-21.DOdmCn0v.jpg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  var _a, _b;
  const _component_Footer = __nuxt_component_0;
  const _component_Contact = __nuxt_component_1;
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "tm-container masonry tm-main-container" }, _attrs))}><div class="item tm-block tm-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1"><header class="tm-block-brand"><div class="tm-text-white tm-block-brand-inner"><img class="tm-logo-brand"${ssrRenderAttr("src", _imports_0)}></div></header><p id="intro-mobile" class="tm-hero-text">${ssrInterpolate(_ctx.$t("annachiara.intro"))}</p></div><div class="item" data-desktop-seq-no="2" data-mobile-seq-no="4"><img${ssrRenderAttr("src", _imports_1)} alt="Image" class="tm-img-left"></div><div class="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2" data-desktop-seq-no="3" data-mobile-seq-no="5"><div>${(_a = _ctx.$t("annachiara.mis_habilidades")) != null ? _a : ""}</div><div class="tm-text-right"><a href="#" class="tm-btn tm-btn-small tm-btn-primary tm-mt">${ssrInterpolate(_ctx.$t("read_more"))}</a></div></div><div class="item" data-desktop-seq-no="4" data-mobile-seq-no="8"><img${ssrRenderAttr("src", _imports_2)} alt="Image" class="tm-img-left"></div>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`<div class="item" data-desktop-seq-no="6" data-mobile-seq-no="2"><img${ssrRenderAttr("src", _imports_3)} alt="Image"></div><div class="item tm-block-right" data-desktop-seq-no="7" data-mobile-seq-no="3"><div class="tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad">${(_b = _ctx.$t("annachiara.filosofia")) != null ? _b : ""}</div></div><div class="item" data-desktop-seq-no="8" data-mobile-seq-no="6"><img${ssrRenderAttr("src", _imports_4)} alt="Image"></div>`);
  _push(ssrRenderComponent(_component_Contact, null, null, _parent));
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/annachiara.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const annachiara = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { annachiara as default };
//# sourceMappingURL=annachiara-DxzFUuai.mjs.map
