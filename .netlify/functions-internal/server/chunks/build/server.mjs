import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import * as Vue from 'vue';
import { hasInjectionContext, getCurrentInstance as getCurrentInstance$1, inject, defineComponent, h, getCurrentScope, onScopeDispose, createElementBlock, shallowRef, provide, cloneVNode, defineAsyncComponent, computed, unref, shallowReactive, ref, Suspense, Fragment, createApp, watch, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, reactive, effectScope, mergeProps, withCtx, toRef, nextTick, isReadonly, useSSRContext, isRef, isShallow, isReactive, toRaw, Text } from 'vue';
import { p as parseURL, e as encodePath, k as decodePath, l as hasProtocol, m as isScriptProtocol, n as joinURL, w as withQuery, o as sanitizeStatusCode, q as getContext, $ as $fetch, t as defu, v as createHooks, c as createError$1, x as executeAsync } from '../nitro/nitro.mjs';
import { u as useHead$1, h as headSymbol, b as baseURL } from '../routes/renderer.mjs';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { registerMessageCompiler, compile, registerMessageResolver, resolveValue, registerLocaleFallbacker, fallbackWithLocaleChain, setDevToolsHook, createCompileError, DEFAULT_LOCALE, updateFallbackLocale, setFallbackContext, createCoreContext, clearDateTimeFormat, clearNumberFormat, isMessageAST, AST_NODE_PROPS_KEYS, setAdditionalMeta, getFallbackContext, NOT_REOSLVED, CORE_ERROR_CODES_EXTEND_POINT, parseTranslateArgs, translate, MISSING_RESOLVE_VALUE, parseDateTimeArgs, datetime, parseNumberArgs, number, isMessageFunction, NUMBER_FORMAT_OPTIONS_KEYS, DATETIME_FORMAT_OPTIONS_KEYS } from '@intlify/core-base';
import { makeSymbol, assign, create, isString, isObject, isNumber, isEmptyObject, getGlobalThis, isBoolean, isArray, isPlainObject, isRegExp, isFunction, inBrowser, deepCopy, hasOwn } from '@intlify/shared';
import { Vue3Mq } from 'vue3-mq';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.21.8";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance$1()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
const HTML_ATTR_ENCODE_MAP = {
  "&": "%26",
  '"': "%22",
  "'": "%27",
  "<": "%3C",
  ">": "%3E"
};
function encodeForHtmlAttr(value) {
  return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedHeader = encodeURL(location2, isExternalHost);
        const encodedLoc = encodeForHtmlAttr(encodedHeader);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    const pathname = url.pathname.replace(/^\/{2,}/, "/");
    return pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
function freezeHead(head) {
  const realPush = head.push;
  head.push = () => ({ dispose: () => {
  }, patch: () => {
  }, _poll: () => {
  } });
  return () => {
    head.push = realPush;
  };
}
const unhead_9YuqrfyVCxaYDggUgLQzTzOLW7HNxIvMDggjhbtjfIs = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    if (nuxtApp.ssrContext.islandContext) {
      const unfreeze = freezeHead(head);
      nuxtApp.hooks.hookOnce("app:created", unfreeze);
    }
    nuxtApp.vueApp.use(head);
  }
});
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
const matcher = (m, p) => {
  return [];
};
const _routeRulesMatcher = (path) => defu({}, ...matcher("", typeof path === "string" ? path.toLowerCase() : path).map((r) => r.data).reverse());
const routeRulesMatcher$1 = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher$1(path.toLowerCase());
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const _routes = [
  {
    name: "index",
    path: "/",
    component: () => import('./index-C3c-cYyK.mjs')
  },
  {
    name: "massage",
    path: "/massage",
    component: () => import('./massage-B-SlY9E_.mjs')
  },
  {
    name: "annachiara",
    path: "/annachiara",
    component: () => import('./annachiara-DxzFUuai.mjs')
  },
  {
    name: "treatments",
    path: "/treatments",
    component: () => import('./treatments-B8iJYZ55.mjs')
  },
  {
    name: "geriatric-osteopathy",
    path: "/geriatric-osteopathy",
    component: () => import('./geriatric-osteopathy-DwuP2Qrr.mjs')
  },
  {
    name: "pediatric-osteopathy",
    path: "/pediatric-osteopathy",
    component: () => import('./pediatric-osteopathy-CBJZZ_0A.mjs')
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function _mergeTransitionProps(routeProps) {
  const _props = [];
  for (const prop of routeProps) {
    if (!prop) {
      continue;
    }
    _props.push({
      ...prop,
      onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0,
      onBeforeLeave: prop.onBeforeLeave ? toArray(prop.onBeforeLeave) : void 0
    });
  }
  return defu(..._props);
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    if (from === START_LOCATION) {
      return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
    }
    return new Promise((resolve) => {
      const doScroll = () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      };
      nuxtApp.hooks.hookOnce("page:loading:end", () => {
        const transitionPromise = nuxtApp["~transitionPromise"];
        if (transitionPromise) {
          transitionPromise.then(doScroll);
        } else {
          doScroll();
        }
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    status: result && (result.status || result.statusCode) || 404,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
Object.assign(/* @__PURE__ */ Object.create(null), {});
const pageIslandRoutes = Object.assign(/* @__PURE__ */ Object.create(null), {});
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      const lastTo = to.matched.at(-1)?.components?.default;
      const lastFrom = from.matched.at(-1)?.components?.default;
      if (lastTo === lastFrom) {
        syncCurrentRoute();
        return;
      }
      if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const error = /* @__PURE__ */ useError();
    const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
    if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    const hasDeferredRoute = false;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext && !isServerPage) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$1(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        const routeRules = getRouteRules({ path: to.path });
        if (routeRules.appMiddleware) {
          for (const key in routeRules.appMiddleware) {
            if (routeRules.appMiddleware[key]) {
              middlewareEntries.add(key);
            } else {
              middlewareEntries.delete(key);
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    if (isServerPage) {
      router.beforeResolve((to) => {
        const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
        const actual = to.matched.find((m) => m.components?.default?.__nuxt_island)?.components?.default;
        if (!expected || expected !== actual?.__nuxt_island) {
          nuxtApp.ssrContext["~renderResponse"] = {
            statusCode: 400,
            statusMessage: "Invalid island request path"
          };
          return false;
        }
      });
    }
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0 && !error.value) {
        return nuxtApp.runWithContext(() => showError(createError({
          status: 404,
          fatal: false,
          statusText: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        if (hasDeferredRoute) ;
        else {
          await router.replace({
            ...resolvedInitialRoute,
            force: true
          });
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || tryUseNuxtApp();
  return nuxt?.ssrContext?.head || nuxt?.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  });
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_mlAYqO7UcgyQ9VNgUlurhpf5tSrRXPIrbitujOzOfDs = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const VERSION = "11.4.6";
function initFeatureFlags() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: CORE_ERROR_CODES_EXTEND_POINT,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32,
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function createI18nError(code, ...args) {
  return createCompileError(code, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  if (isMessageAST(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (subKeys[i] === "__proto__") {
          throw new Error(`unsafe key: ${subKeys[i]}`);
        }
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = create();
        }
        if (!isObject(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        if (!isMessageAST(currentObj)) {
          currentObj[subKeys[lastIndex]] = obj[key];
          delete obj[key];
        } else {
          if (!AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex])) {
            delete obj[key];
          }
        }
      }
      if (!isMessageAST(currentObj)) {
        const target = currentObj[subKeys[lastIndex]];
        if (isObject(target)) {
          handleFlatJson(target);
        }
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? create() : { [locale]: create() };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource: resource2 } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || create();
          deepCopy(resource2, ret[locale2]);
        } else {
          deepCopy(resource2, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages = isObject(options.messages) ? options.messages : create();
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
function getCurrentInstance() {
  const key = "currentInstance";
  if (key in Vue) {
    return Vue[key];
  } else {
    return Vue.getCurrentInstance();
  }
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return ((ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  });
}
const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = inBrowser ? ref : shallowRef;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _context.locale = val;
      _locale.value = val;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _context.fallbackLocale = val;
      _fallbackLocale.value = val;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if ("production" !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
        setAdditionalMeta(/* @__PURE__ */ getMetaInfo());
      }
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (__INTLIFY_PROD_DEVTOOLS__) {
        setAdditionalMeta(null);
      }
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && // for not `te` (e.g `t`)
    isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val) || isArray(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val) || isArray(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps((context) => {
      let ret;
      const _context2 = context;
      try {
        _context2.processor = processor;
        ret = Reflect.apply(translate, null, [_context2, ...args]);
      } finally {
        _context2.processor = null;
      }
      return ret;
    }, () => parseTranslateArgs(...args), "translate", (root) => root[TranslateVNodeSymbol](...args), (key) => [createTextNode(key)], (val) => isArray(val));
  }
  function numberParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
  }
  function datetimeParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const locales = isString(locale2) ? [targetLocale] : fallbackWithLocaleChain(_context, _fallbackLocale.value, targetLocale);
      for (let i = 0; i < locales.length; i++) {
        const message = getLocaleMessage(locales[i]);
        let resolved = _context.messageResolver(message, key);
        if (resolved === null) {
          resolved = message[key];
        }
        if (isMessageAST(resolved) || isMessageFunction(resolved) || isString(resolved)) {
          return true;
        }
      }
      return false;
    }, () => [key], "translate exists", (root) => {
      return Reflect.apply(root.te, root, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message };
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message = _message[locale2];
    }
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message = _message[locale2];
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, create());
  }
}
function getFragmentableTag() {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const renderChildren = () => {
        const keys = Object.keys(slots).filter((key) => key[0] !== "_");
        const options = create();
        if (props.locale) {
          options.locale = props.locale;
        }
        if (props.plural !== void 0) {
          options.plural = isString(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys);
        return i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      };
      const assignedAttrs = assign(create(), attrs);
      const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
      return isObject(tag) ? h(tag, assignedAttrs, { default: renderChildren }) : h(tag, assignedAttrs, renderChildren());
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const renderChildren = () => {
      const options = { part: true };
      let overrides = create();
      if (props.locale) {
        options.locale = props.locale;
      }
      if (isString(props.format)) {
        options.key = props.format;
      } else if (isObject(props.format)) {
        if (isString(props.format.key)) {
          options.key = props.format.key;
        }
        overrides = Object.keys(props.format).reduce((options2, prop) => {
          return slotKeys.includes(prop) ? assign(create(), options2, { [prop]: props.format[prop] }) : options2;
        }, create());
      }
      const parts = partFormatter(...[props.value, options, overrides]);
      let children = [options.key];
      if (isArray(parts)) {
        children = parts.map((part, index) => {
          const slot = slots[part.type];
          const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
          if (isVNode(node)) {
            node[0].key = `${part.type}-${index}`;
          }
          return node;
        });
      } else if (isString(parts)) {
        children = [parts];
      }
      return children;
    };
    const assignedAttrs = assign(create(), attrs);
    const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
    return isObject(tag) ? h(tag, assignedAttrs, { default: renderChildren }) : h(tag, assignedAttrs, renderChildren());
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
function getComposer$1(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$1(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [Translation.name, "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  const i18n = {
    // mode
    get mode() {
      return "composition";
    },
    // install plugin
    async install(app, ...options2) {
      app.__VUE_I18N_SYMBOL__ = symbol;
      app.provide(app.__VUE_I18N_SYMBOL__, i18n);
      if (isPlainObject(options2[0])) {
        const opts = options2[0];
        i18n.__composerExtend = opts.__composerExtend;
        i18n.__vueI18nExtend = opts.__vueI18nExtend;
      }
      let globalReleaseHandler = null;
      if (__globalInjection) {
        globalReleaseHandler = injectGlobalFields(app, i18n.global);
      }
      {
        apply(app, i18n, ...options2);
      }
      const unmountApp = app.unmount;
      app.unmount = () => {
        globalReleaseHandler && globalReleaseHandler();
        i18n.dispose();
        unmountApp();
      };
    },
    // global accessor
    get global() {
      return __global;
    },
    dispose() {
      globalScope.stop();
    },
    // @internal
    __instances,
    // @internal
    __getInstance,
    // @internal
    __setInstance,
    // @internal
    __deleteInstance
  };
  return i18n;
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl;
    }
    return composer2;
  }
  if (scope === "isolated") {
    if (i18n.mode !== "composition") {
      throw createI18nError(I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
    }
    const i18nInternalIso = i18n;
    const composerOptions = assign({}, options);
    const parentComposer = getComposer(i18n, instance);
    composerOptions.__root = parentComposer || gl;
    const composer2 = createComposer(composerOptions);
    if (i18nInternalIso.__composerExtend) {
      composer2[DisposeSymbol] = i18nInternalIso.__composerExtend(composer2);
    }
    const currentScope = getCurrentScope();
    if (currentScope) {
      onScopeDispose(() => {
        const dispose = composer2[DisposeSymbol];
        if (dispose) {
          dispose();
          delete composer2[DisposeSymbol];
        }
      });
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode) {
  const scope = effectScope();
  const obj = scope.run(() => createComposer(options));
  if (obj == null) {
    throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
  }
  return [scope, obj];
}
function getI18nInstance(instance) {
  const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
  if (!i18n) {
    throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
  }
  return i18n;
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  return !useComponent ? target.parent : target.vnode.ctx || target.parent;
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
{
  initFeatureFlags();
}
registerMessageCompiler(compile);
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const resource$2 = {
  "call_me": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Call me at +34 666 795 883 for more information" } },
  "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Language" } },
  "contact_me": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contact me" } },
  "name": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Name" } },
  "email": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Email" } },
  "message": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Message" } },
  "send": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Send" } },
  "read_more": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Read more" } },
  "osteopathy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteopathy" } },
  "metas": {
    "title": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "OsteoSpot by Annachiara" }, { "t": 2, "i": [{ "t": 3 }], "s": "Professional Osteopathy in Palma de Mallorca" }] } },
    "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "OsteoSpot by Annachiara offers professional osteopathy in Palma de Mallorca. Personalized treatments to relieve pain, restore balance and enhance physical and emotional well-being." } },
    "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "osteospot, annachiara, osteopath palma mallorca, osteopathy mallorca, therapeutic massages, craniosacral therapy, reflexology, wellness treatments" } }
  },
  "menu": {
    "home": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Home" } },
    "treatments": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Treatments" } },
    "osteopathy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteopathy" } },
    "massages": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Massages" } },
    "annachiara": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Annachiara" } },
    "contact": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contact" } },
    "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Language" } },
    "pediatric": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pediatric osteopathy" } },
    "geriatric": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Geriatric osteopathy" } }
  },
  "home": {
    "welcome": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteo Spot is my dedicated space for well-being, physical recovery and emotional balance. I provide high-quality, personalized care for people seeking a professional osteopath in Palma de Mallorca." } },
    "expert_title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "I am an osteopath" } },
    "expert_paragraph_1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p>I specialize in structural, fascial, visceral and craniosacral osteopathy, always using a fully manual and holistic approach.</p><p>My techniques help reduce pain, improve mobility and support the body’s natural balance and healing capacity.</p><p>Osteopathic treatment focuses on identifying and correcting tissue dysfunctions that affect natural movement, restoring functionality and promoting recovery.</p><p>The body functions as a unified system; when one area is affected, others compensate. Osteopathy works to identify and treat these imbalances to restore overall harmony.</p>" } },
    "expert_paragraph_2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteopathic treatment aims to identify and correct dysfunctions that alter the body’s natural mobility, restoring function and supporting recovery." } },
    "reason": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The human body operates as an interconnected system. When one structure becomes dysfunctional, others compensate, creating imbalance. Osteopathy restores harmony by addressing these compensations." } },
    "history_brief": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteopathic Medicine originated in 1874 through the work of Dr. A.T. Still, who developed a therapeutic approach based on stimulating the body's natural self-healing mechanisms." } },
    "history_title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Historical background" } },
    "copyright": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "© Annachiara Villa 2023" } }
  },
  "treatments": {
    "intro_text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteopathy · Reflexology · Craniosacral Therapy" } },
    "craneo_sacral": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Craniosacral Therapy</h2><p>Craniosacral therapy is based on the subtle motion between the skull, vertebrae and sacrum, known as the “primary respiratory movement,” which supports the flow of cerebrospinal fluid throughout the body.</p><p><strong>Recommended for:</strong></p><ul><li>Sleep disorders</li><li>Headaches</li><li>Stress</li><li>TMJ dysfunction</li><li>Allergies</li></ul>" } },
    "reflexology": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Neuromuscular Reflexology</h2><p>An advanced foot reflexology technique designed to regulate the nervous system and treat soft-tissue injuries.</p><p><strong>Recommended for:</strong></p><ul><li>Inflammation and soft-tissue pain</li><li>Muscle tension</li><li>Tendon issues</li><li>Ligament strain</li><li>Fascial tension and foot pain</li></ul><h2>Body Reflexology</h2><p>A natural therapy that stimulates reflex areas to support the body’s homeostasis.</p><ul><li>Releases energetic blockages</li><li>Reduces stress</li><li>Improves circulation and immune response</li><li>Activates natural detoxification</li><li>Acts as an excellent preventive method</li></ul>" } },
    "drenaje_linfatico": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Lymphatic Drainage (Legs and Feet)</h2><p>Stimulates lymphatic flow, reduces fluid retention and supports natural detoxification processes.</p><hr class='hr-pad'/><h2>Anti-Arthrosis Treatment (Hands and Feet)</h2><p>Improves joint mobility and reduces stiffness associated with natural wear over time.</p><p>Enhances tissue elasticity and comfort.</p><hr class='hr-pad'/><h2>Body Massages and Reiki</h2>" } },
    "osteopatia_estructural": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Osteopathy & Fasciotherapy</h2><p>A deeply relaxing massage focusing on the muscular fascia, complemented by osteopathic adjustments.</p><p><strong>Recommended for:</strong></p><ul><li>Muscle contractures</li><li>Neck, back and lumbar pain</li><li>Sciatica and herniated discs</li><li>Scapulohumeral periarthritis</li><li>Sprains</li><li>Meniscus problems</li><li>Hip pain</li><li>Mandibular tension and abdominal restrictions</li></ul>" } },
    "visceral": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Visceral Massage</h2><p>An osteopathic technique that releases tension in internal organs, improving their mobility and function.</p><p><strong>Indicated for:</strong></p><ul><li>Digestive discomfort</li><li>Gastritis and intestinal problems</li><li>Constipation</li><li>Hiatal hernia</li><li>Gynecological issues and incontinence</li><li>Chronic back pain</li></ul><p>Also beneficial for menstrual discomfort and improving muscular tone.</p>" } }
  },
  "geriatric": {
    "indicated_treatments": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p>Osteopathic treatments are particularly indicated for:</p><ul><li>Muscle pain</li><li>Limited joint mobility</li><li>Sleep disturbances</li><li>Temporary cognitive decline</li><li>Non-serious falls</li><li>ENT issues</li><li>Recurring headaches</li><li>General health assessment</li><li>Life transitions such as retirement</li><li>Starting new physical activities</li></ul>" } },
    "block_3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p>Osteopathy is especially valuable in older adults. Gentle, non-invasive techniques help reduce pain, improve mobility and restore vitality.</p><p>Age-related conditions like osteoarthritis are common, but they should not limit quality of life. Osteopathy enhances mobility, flexibility and overall comfort.</p><p>It supports circulation, organ function and systemic balance.</p><p>Additionally, it is helpful for issues such as hypertension, intestinal problems, urinary incontinence and vascular disorders.</p>" } },
    "intro_text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p class='tm-hero-text'>As we age, various physical challenges can emerge due to past habits, injuries or natural wear. Osteopathy helps address these changes and maintain well-being.</p>" } }
  },
  "pediatric": {
    "intro_text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Specialized treatments for babies, children and adolescents using gentle, safe and non-invasive techniques." } },
    "craneo_sacral": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Craniosacral Therapy for Children</h2><p>Pediatric osteopathy uses gentle techniques to release tensions in areas related to the central nervous system, supporting healthy psychomotor development.</p>" } },
    "sutherland_block": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p>According to Dr. Sutherland, “the bones of the skull and sacrum function as a unit with involuntary motion,” known as the Primary Respiratory Movement. This subtle rhythm is essential for health.</p><p>Craniosacral therapy identifies and normalizes restrictions, especially effective in newborns and children due to their structural plasticity.</p>" } },
    "osteopata_block": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p>The pediatric osteopath identifies tensions and dysfunctions, restoring balance and helping the child's body reach its full potential.</p><p>I first learned through my own son, who improved sleep and stress response thanks to craniosacral therapy. I’ve since worked with children experiencing allergies, headaches and breathing issues, with excellent results.</p><p>Ideal for newborns after childbirth, and beneficial for school-age children with learning difficulties, bruxism, sleep problems and more.</p>" } }
  },
  "massages": {
    "intro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The art of physical and emotional well-being <br/> Personalized treatments tailored to your needs." } },
    "sports": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Sports Massage</h2><p>Focused on preventing and recovering from sports injuries.</p><ul><li>Prepares muscles for exertion</li><li>Prevents injuries</li><li>Improves recovery</li></ul><h2>Energetic Massage</h2><p>Full-body treatment with mint essential oil and stimulation of energy points.</p><h2>Facial Treatment</h2><p>Gentle facial massage for drainage, muscle relaxation and eye-area decongestion.</p>" } },
    "therapeutic": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Therapeutic Massage</h2><p>A deep, relaxing full-body massage using fasciotherapy techniques followed by oil work to induce calm.</p><p>Can be combined with craniosacral and foot reflexology techniques.</p>" } }
  },
  "annachiara": {
    "mis_habilidades": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>My Skills</h2><ul><li>Certified osteopath trained at Gaia Osteopathy School (Mallorca).</li><li>Specialist in pediatric and visceral osteopathy.</li><li>Advanced reflexology training.</li><li>Myofascial therapy and acupressure training.</li><li>Expert in anti-aging and rejuvenation treatments.</li></ul><h2>Languages</h2><ul><li>Spanish</li><li>English</li><li>Italian</li></ul>" } },
    "filosofia": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Philosophy</h2><p>I discovered the beauty and complexity of the human body through personal experience. Osteopathy allows me to help others improve their well-being and live with awareness.</p><p>I integrate Yoga to support long-term muscular health and amplify treatment benefits.</p>" } },
    "intro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "About me:" } }
  },
  "contact": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contact information" } },
    "treatments_message": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Home treatments available depending on availability." } },
    "message_whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Hello, I would like more information about your services." } },
    "mail_subject": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contact from Osteorevolución.com website" } },
    "sent_succesfully": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your message has been sent successfully. I will contact you shortly." } }
  }
};
const resource$1 = {
  "call_me": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Llámmame al +34 666 795 883 para más información y reservas" } },
  "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Idioma" } },
  "contact_me": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contáctame" } },
  "name": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nombre" } },
  "email": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Correo electrónico" } },
  "message": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mensaje" } },
  "send": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Enviar" } },
  "read_more": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ver más" } },
  "osteopathy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteopatía" } },
  "metas": {
    "title": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "OsteoSpot by Annachiara" }, { "t": 2, "i": [{ "t": 3 }], "s": "Osteópata en Palma de Mallorca" }] } },
    "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "OsteoSpot by Annachiara: osteopatía profesional en Palma de Mallorca. Tratamientos personalizados para mejorar tu bienestar físico y emocional." } },
    "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "osteospot, annachiara, osteópata palma, osteopatía mallorca, masajes terapéuticos, reflexología podal, craneosacral, bienestar" } }
  },
  "menu": {
    "home": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Inicio" } },
    "treatments": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tratamientos" } },
    "osteopathy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteopatía" } },
    "massages": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Masajes" } },
    "annachiara": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Annachiara" } },
    "contact": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contacto" } },
    "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Idioma" } },
    "pediatric": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteopatía pediátrica" } },
    "geriatric": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteopatía geriátrica" } }
  },
  "home": {
    "welcome": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteo Spot es mi espacio de bienestar integral, donde combino recuperación física y equilibrio emocional para ofrecer un servicio profesional y personalizado en Palma de Mallorca." } },
    "expert_title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Soy osteópata" } },
    "expert_paragraph_1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p>Soy especialista en osteopatía estructural, fascial, visceral y craneosacral, con un enfoque totalmente manual.</p><p>Mis técnicas ayudan a reducir el dolor, mejorar la movilidad y promover la homeostasis del organismo.</p><p>La osteopatía identifica disfunciones que alteran la movilidad de los tejidos, restaurando la función natural del cuerpo para favorecer la recuperación.</p><p>El cuerpo es una unidad funcional; una disfunción en una zona puede generar compensaciones a distancia. El osteópata analiza y trata estos desequilibrios para restaurar el equilibrio global.</p>" } },
    "expert_paragraph_2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "El tratamiento osteopático identifica y corrige disfunciones que alteran la movilidad natural del cuerpo." } },
    "reason": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "El cuerpo funciona como un sistema integrado. Una alteración en una estructura afecta a otras y genera desequilibrios. La osteopatía busca restaurar ese equilibrio." } },
    "history_brief": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "La medicina osteopática surge en 1874 gracias al Dr. A.T. Still, quien desarrolló una terapia basada en estimular los mecanismos curativos del cuerpo." } },
    "history_title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Realidad histórica" } },
    "copyright": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "© Annachiara Villa 2023" } }
  },
  "treatments": {
    "intro_text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Osteopatía · Reflexología · Terapia Craneosacral" } },
    "craneo_sacral": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Terapia Craneosacral</h2><p>Basada en el movimiento sutil entre cráneo, vértebras y sacro, conocido como “respiración primordial”, que impulsa el líquido cefalorraquídeo.</p><p><strong>Recomendada para:</strong></p><ul><li>Problemas de sueño</li><li>Cefaleas</li><li>Estrés</li><li>Disfunción temporomandibular (ATM)</li><li>Alergias</li></ul>" } },
    "reflexology": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Reflexología Neuromuscular</h2><p>Técnica avanzada de reflexología podal destinada a regular el sistema nervioso y tratar lesiones musculares.</p><p><strong>Recomendada para:</strong></p><ul><li>Inflamación y dolor en tejidos blandos</li><li>Problemas musculares</li><li>Tendinopatías</li><li>Lesiones ligamentarias</li><li>Tensión fascial</li></ul><h2>Reflexología Corporal</h2><p>Ayuda al equilibrio del organismo mediante estimulación manual de áreas reflejas.</p><ul><li>Desbloqueo energético</li><li>Reducción del estrés</li><li>Mejora de la circulación e inmunidad</li><li>Activación natural de la eliminación</li><li>Prevención activa</li></ul>" } },
    "drenaje_linfatico": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Drenaje Linfático (Piernas y Pies)</h2><p>Favorece el drenaje de líquidos y la eliminación de toxinas, estimulando la función linfática e inmunológica.</p><hr class='hr-pad'/><h2>Tratamiento Antiartrosis (Manos y Pies)</h2><p>Mejora la movilidad articular y reduce la rigidez vinculada al desgaste.</p><hr class='hr-pad'/><h2>Masajes Corporales y Reiki</h2>" } },
    "osteopatia_estructural": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Osteopatía y Fascioterapia</h2><p>Masaje profundo de fascias combinado con normalizaciones osteopáticas.</p><p><strong>Indicado para:</strong></p><ul><li>Contracturas</li><li>Cervicalgias, dorsalgias, lumbalgias</li><li>Ciática y hernias discales</li><li>Periartritis escapulohumeral</li><li>Esguinces</li><li>Menisco</li><li>Dolor de cadera</li><li>Problemas mandibulares</li></ul>" } },
    "visceral": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Masaje Visceral</h2><p>Técnica para liberar tensión en órganos internos y mejorar su movilidad.</p><p><strong>Indicado para:</strong></p><ul><li>Problemas digestivos</li><li>Gastritis</li><li>Estreñimiento</li><li>Hernia de hiato</li><li>Trastornos ginecológicos</li><li>Dolor lumbar persistente</li></ul><p>Alivia molestias menstruales y mejora el tono muscular.</p>" } }
  },
  "geriatric": {
    "indicated_treatments": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p>Los tratamientos osteopáticos están especialmente indicados en casos de:</p><ul><li>Dolores musculares</li><li>Disminución o pérdida de movilidad articular</li><li>Trastornos del sueño</li><li>Disminución temporal de capacidades cognitivas</li><li>Caídas sin pérdida de conciencia o fracturas</li><li>Problemas otorrinolaringológicos</li><li>Cefaleas recurrentes</li><li>Revisión general del estado de salud</li><li>Cambios vitales como la jubilación</li><li>Inicio de nuevas actividades físicas</li></ul>" } },
    "block_3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p>La osteopatía es especialmente valiosa en la etapa adulta mayor. Con técnicas suaves e indoloras, permite abordar dolencias frecuentes como la rigidez, el dolor articular y la pérdida de movilidad. Estos tratamientos ayudan a reducir molestias, recuperar vitalidad y mejorar la calidad de vida.</p><br/><p>Aunque patologías como la artrosis o el desgaste articular son comunes con los años, no deben condicionar de manera incapacitante la vida diaria. La osteopatía trabaja para devolver movilidad y elasticidad a los tejidos, favoreciendo un movimiento más libre y cómodo.</p><br/><p>A nivel general, el tratamiento osteopático mejora la función global del cuerpo, la circulación y la capacidad del organismo para mantener un equilibrio saludable.</p><br/><p>También resulta útil en problemas habituales como hipertensión, hipotensión, molestias intestinales, incontinencia urinaria o dificultades vasculares, ayudando a mejorar la función de los órganos y la circulación sanguínea.</p>" } },
    "intro_text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p class='tm-hero-text'>A medida que envejecemos, pueden aparecer patologías y molestias físicas que impactan la calidad de vida. Suelen deberse a hábitos pasados, traumas, patologías previas o el propio desgaste natural.</p>" } }
  },
  "pediatric": {
    "intro_text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tratamientos especializados para bebés, niños y adolescentes basados en técnicas suaves, seguras y no invasivas que favorecen su desarrollo y bienestar." } },
    "craneo_sacral": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2 class='tm-hero-header'>Terapia Craneosacral Infantil</h2><p class='tm-hero-block'>La osteopatía infantil utiliza manipulaciones suaves para liberar tensiones relacionadas con el sistema nervioso central, favoreciendo el desarrollo psicomotor y emocional.</p>" } },
    "sutherland_block": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p>Según William Sutherland, “los huesos del cráneo y el sacro funcionan como una unidad con movilidad involuntaria”, un movimiento sutil llamado Movimiento Respiratorio Primario. Este ritmo es esencial para el equilibrio del organismo.</p><p>La terapia craneosacral identifica y normaliza zonas de tensión o restricción, especialmente efectivas en bebés y niños debido a su gran plasticidad. El objetivo es devolver funcionalidad a los tejidos y favorecer los procesos naturales de autorregulación.</p>" } },
    "osteopata_block": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<p>El osteópata infantil detecta tensiones y disfunciones en la micromecánica articular del niño, mejorando su equilibrio corporal.</p><br/><p>Mi experiencia comenzó con mi propio hijo, quien sufría insomnio e hiperactividad. Gracias a la terapia craneosacral mejoró su descanso, relajación y manejo del estrés. He trabajado con niños con alergias, cefaleas y problemas de respiración, con mejoras significativas.</p><br/><p>Esta técnica también ayuda en casos de bruxismo, dificultades de aprendizaje y alteraciones del sueño, evitando que progresen hacia patologías crónicas.</p><br/><p>Es ideal para recién nacidos por el esfuerzo del parto, y muy útil en edad escolar para mejorar el rendimiento general.</p>" } }
  },
  "massages": {
    "intro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "El arte del bienestar físico y mental <br/> Tratamientos personalizados para cada necesidad." } },
    "sports": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Masaje Deportivo</h2><p>Enfocado en la prevención y recuperación de lesiones deportivas.</p><ul><li>Prepara la musculatura para el esfuerzo</li><li>Previene lesiones</li><li>Acelera la recuperación tras la actividad física</li></ul><h2>Masaje Energético</h2><p>Masaje corporal completo con aceite esencial de menta y presión en puntos energéticos, ideal para recuperar vitalidad.</p><h2>Tratamiento Facial</h2><p>Masaje suave para drenar, liberar tensión muscular y descongestionar la zona ocular.</p>" } },
    "therapeutic": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Masaje Descontracturante / Terapéutico</h2><p>Relajación profunda mediante técnicas de fascioterapia y masaje con aceite. Ayuda a liberar tensión y reducir el estrés.</p><p>Puede combinarse con reflexología craneosacral y podal.</p>" } }
  },
  "annachiara": {
    "mis_habilidades": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Mis habilidades</h2><ul><li>Osteópata formada en Gaia Osteopathy School (Mallorca).</li><li>Especialista en osteopatía infantil y visceral.</li><li>Formación avanzada en reflexología craneal, podal y neuromuscular.</li><li>Formación en terapia miofascial y digitopresión para artrosis.</li><li>Especialista en tratamientos antiaging y rejuvenecimiento facial y corporal.</li></ul><h2>Idiomas</h2><ul><li>Castellano</li><li>Inglés</li><li>Italiano</li></ul>" } },
    "filosofia": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "<h2>Filosofía</h2><p>Descubrí la belleza y complejidad del cuerpo humano gracias a mis propias experiencias físicas. La osteopatía me permite ayudar a otros a vivir mejor, entendiendo su cuerpo y respetando sus límites.</p><p>Integro principios del Yoga para enseñar estiramientos útiles que prolongan los beneficios del tratamiento.</p>" } },
    "intro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Acerca de mí:" } }
  },
  "contact": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Información de contacto" } },
    "treatments_message": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tratamientos a domicilio según disponibilidad." } },
    "message_whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Hola, me gustaría recibir más información sobre tus servicios." } },
    "mail_subject": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contacto desde la página web de Osteorevolución.com" } },
    "sent_succesfully": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tu mensaje ha sido enviado correctamente. En breve me pondré en contacto contigo." } }
  }
};
const resource = {
  "hello": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Hello, " }, { "t": 4, "k": "name" }, { "t": 3, "v": "!" }] } },
  "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Language" } }
};
const i18n_M6WuPocwmDZfR2LKAqoIP7SPPiCebMfT5sB7ls3Be_c = /* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    globalInjection: true,
    locale: "es",
    messages: {
      en: resource$2,
      es: resource$1,
      it: resource
    }
  });
  vueApp.use(i18n);
});
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance$1();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const vue3_mq_AJBNESX0a_eStqkDDYVicG05BoY2qrHF8cmWzm7ChDY = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Mq, {
    preset: "bootstrap5"
  });
});
const plugins = [
  unhead_9YuqrfyVCxaYDggUgLQzTzOLW7HNxIvMDggjhbtjfIs,
  plugin,
  revive_payload_server_mlAYqO7UcgyQ9VNgUlurhpf5tSrRXPIrbitujOzOfDs,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  i18n_M6WuPocwmDZfR2LKAqoIP7SPPiCebMfT5sB7ls3Be_c,
  vue3_mq_AJBNESX0a_eStqkDDYVicG05BoY2qrHF8cmWzm7ChDY
];
const layouts = {
  default: defineAsyncComponent(() => import('./default-D3rqUQk9.mjs').then((m) => m.default || m))
};
const routeRulesMatcher = _routeRulesMatcher;
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? routeRulesMatcher(route?.path).appLayout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = !!layout.value && layout.value in layouts;
      const hasTransition = hasLayout && !!(route?.meta.layoutTransition ?? appLayoutTransition);
      const transitionProps = hasTransition && _mergeTransitionProps([
        route?.meta.layoutTransition,
        appLayoutTransition,
        {
          onBeforeLeave() {
            nuxtApp["~transitionPromise"] = new Promise((resolve) => {
              nuxtApp["~transitionFinish"] = resolve;
            });
          },
          onAfterLeave() {
            nuxtApp["~transitionFinish"]?.();
            delete nuxtApp["~transitionFinish"];
            delete nuxtApp["~transitionPromise"];
          }
        }
      ]);
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(transitionProps, {
        default: () => h(
          Suspense,
          {
            suspensible: true,
            onResolve: async () => {
              await nextTick(done);
            }
          },
          {
            default: () => h(
              LayoutProvider,
              {
                layoutProps: mergeProps(context.attrs, route.meta.layoutProps ?? {}, { ref: layoutRef }),
                key: layout.value || void 0,
                name: layout.value,
                shouldProvide: !props.name,
                isRenderingNewLayout: (name) => {
                  return name !== previouslyRenderedLayout && name === layout.value;
                },
                hasTransition
              },
              context.slots
            )
          }
        )
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        // When name=false, always return true so NuxtPage doesn't skip rendering
        isCurrent: (route) => name === false || name === (route.meta.layout ?? routeRulesMatcher(route.path).appLayout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute$1();
    const { t } = useI18n();
    const title = t("metas.title");
    const keywords = t("metas.keywords");
    const description = t("metas.description");
    console.log(title);
    useHead({
      title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "keywords", name: "keywords", content: keywords }
      ],
      bodyAttrs: {
        class: "tm-bg-dark"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const status = Number(_error.statusCode || 500);
    const is404 = status === 404;
    const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-BwJyeoUp.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-BKYswY-P.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ status: unref(status), statusText: unref(statusText), statusCode: unref(status), statusMessage: unref(statusText), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.21.8_@parcel+watcher@2.5.6_@types+node@26.1.0_@vue+compiler-sfc@3.5.39_cac@6.7.1_b7100f3dd4dc5b370276f956ba828dd9/node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    function invokeAppErrorHandler(err, target, info) {
      const errorHandler = nuxtApp.vueApp.config.errorHandler;
      if (errorHandler && !errorHandler.__nuxt_default) {
        try {
          errorHandler(err, target, info);
        } catch (handlerError) {
          console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
        }
      }
    }
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        invokeAppErrorHandler(err, target, info);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.21.8_@parcel+watcher@2.5.6_@types+node@26.1.0_@vue+compiler-sfc@3.5.39_cac@6.7.1_b7100f3dd4dc5b370276f956ba828dd9/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));

export { useRouter as a, useNuxtApp as b, useRuntimeConfig as c, nuxtLinkDefaults as d, entry_default as default, encodeRoutePath as e, navigateTo as n, resolveRouteObject as r, useHead as u };
//# sourceMappingURL=server.mjs.map
