/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/input.css":
/*!***********************!*\
  !*** ./src/input.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/tailwind.css":
/*!**************************!*\
  !*** ./src/tailwind.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/nullstack.js":
/*!**************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/nullstack.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_client__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/anchorableNode.js":
/*!**************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/anchorableNode.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "anchorableElement": () => (/* binding */ anchorableElement)
/* harmony export */ });
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/router.js");

function anchorableElement(element) {
    const links = element.querySelectorAll('a[href^="/"]:not([target])');
    for (const link of links){
        if (link.dataset.nullstack) return;
        link.dataset.nullstack = true;
        link.addEventListener("click", (event)=>{
            if (!event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
                event.preventDefault();
                _router__WEBPACK_IMPORTED_MODULE_0__["default"].url = link.getAttribute("href");
            }
        });
    }
}


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/client.js":
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/client.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_generateTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/generateTree */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/generateTree.js");
/* harmony import */ var _shared_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/plugins */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/plugins.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/context.js");
/* harmony import */ var _rerender__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rerender */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/rerender.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./router */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/router.js");





const client = {};
client.initialized = false;
client.hydrated = false;
client.initializer = null;
client.instances = {};
_context__WEBPACK_IMPORTED_MODULE_2__["default"].instances = client.instances;
client.initiationQueue = [];
client.renewalQueue = [];
client.hydrationQueue = [];
client.realHydrationQueue = [];
client.virtualDom = {};
client.selector = null;
client.events = {};
client.generateContext = _context__WEBPACK_IMPORTED_MODULE_2__.generateContext;
client.renderQueue = null;
client.update = async function update() {
    if (client.initialized) {
        clearInterval(client.renderQueue);
        client.renderQueue = setTimeout(async ()=>{
            const scope = client;
            scope.context = _context__WEBPACK_IMPORTED_MODULE_2__["default"];
            scope.plugins = (0,_shared_plugins__WEBPACK_IMPORTED_MODULE_1__.loadPlugins)(scope);
            client.initialized = false;
            client.renewalQueue = [];
            client.nextVirtualDom = await (0,_shared_generateTree__WEBPACK_IMPORTED_MODULE_0__["default"])(client.initializer(), scope);
            (0,_rerender__WEBPACK_IMPORTED_MODULE_3__["default"])(client.selector);
            client.virtualDom = client.nextVirtualDom;
            client.nextVirtualDom = null;
            client.processLifecycleQueues();
        }, 16);
    }
};
client.processLifecycleQueues = async function processLifecycleQueues() {
    if (!client.initialized) {
        client.initialized = true;
        client.hydrated = true;
    }
    let shouldUpdate = false;
    while(client.initiationQueue.length){
        const instance = client.initiationQueue.shift();
        instance.initiate && await instance.initiate();
        instance._self.initiated = true;
        instance.launch && instance.launch();
        shouldUpdate = true;
    }
    shouldUpdate && client.update();
    shouldUpdate = false;
    while(client.realHydrationQueue.length){
        shouldUpdate = true;
        const instance = client.realHydrationQueue.shift();
        instance.hydrate && await instance.hydrate();
        instance._self.hydrated = true;
    }
    shouldUpdate && client.update();
    shouldUpdate = false;
    while(client.hydrationQueue.length){
        shouldUpdate = true;
        const instance = client.hydrationQueue.shift();
        client.realHydrationQueue.push(instance);
    }
    shouldUpdate && client.update();
    for(const key in client.instances){
        const instance = client.instances[key];
        if (!client.renewalQueue.includes(instance) && !instance._self.terminated) {
            instance.terminate && await instance.terminate();
            if (instance._self.persistent) {
                instance._self.terminated = true;
            } else {
                delete client.instances[key];
            }
        }
    }
    _router__WEBPACK_IMPORTED_MODULE_4__["default"]._changed = false;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (client);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/context.js":
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/context.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "generateContext": () => (/* binding */ generateContext)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/client.js");
/* harmony import */ var _objectProxyHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objectProxyHandler */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/objectProxyHandler.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/state.js");



const context = {};
for (const key of Object.keys(_state__WEBPACK_IMPORTED_MODULE_2__["default"].context)){
    context[key] = (0,_objectProxyHandler__WEBPACK_IMPORTED_MODULE_1__.generateObjectProxy)(key, _state__WEBPACK_IMPORTED_MODULE_2__["default"].context[key]);
}
const contextProxyHandler = {
    set (target, name, value) {
        context[name] = (0,_objectProxyHandler__WEBPACK_IMPORTED_MODULE_1__.generateObjectProxy)(name, value);
        _client__WEBPACK_IMPORTED_MODULE_0__["default"].update();
        return true;
    },
    get (target, name) {
        if (name === "_isProxy") return true;
        return target[name] === undefined ? context[name] : target[name];
    }
};
function generateContext(temporary) {
    return new Proxy(temporary, contextProxyHandler);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (context);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/environment.js":
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/environment.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/state.js");

const environment = {
    ..._state__WEBPACK_IMPORTED_MODULE_0__["default"].environment,
    client: true,
    server: false
};
Object.freeze(environment);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (environment);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/index.js":
/*!*****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/index.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Nullstack)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/state.js");
/* harmony import */ var _shared_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/element */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/element.js");
/* harmony import */ var _shared_fragment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/fragment */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/fragment.js");
/* harmony import */ var _shared_generateTree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/generateTree */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/generateTree.js");
/* harmony import */ var _shared_getProxyableMethods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/getProxyableMethods */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/getProxyableMethods.js");
/* harmony import */ var _shared_plugins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/plugins */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/plugins.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./client */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/client.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./context */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/context.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./environment */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/environment.js");
/* harmony import */ var _instanceProxyHandler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./instanceProxyHandler */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/instanceProxyHandler.js");
/* harmony import */ var _invoke__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./invoke */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/invoke.js");
/* harmony import */ var _liveReload__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./liveReload */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/liveReload.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./page */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/page.js");
/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./params */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/params.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./project */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/project.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./render */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/render.js");
/* harmony import */ var _rerender__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./rerender */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/rerender.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./router */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/router.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./settings */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/settings.js");
/* harmony import */ var _worker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./worker */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/worker.js");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}




















_context__WEBPACK_IMPORTED_MODULE_7__["default"].page = _page__WEBPACK_IMPORTED_MODULE_12__["default"];
_context__WEBPACK_IMPORTED_MODULE_7__["default"].router = _router__WEBPACK_IMPORTED_MODULE_17__["default"];
_context__WEBPACK_IMPORTED_MODULE_7__["default"].settings = _settings__WEBPACK_IMPORTED_MODULE_18__["default"];
_context__WEBPACK_IMPORTED_MODULE_7__["default"].worker = _worker__WEBPACK_IMPORTED_MODULE_19__["default"];
_context__WEBPACK_IMPORTED_MODULE_7__["default"].params = _params__WEBPACK_IMPORTED_MODULE_13__["default"];
_context__WEBPACK_IMPORTED_MODULE_7__["default"].project = _project__WEBPACK_IMPORTED_MODULE_14__["default"];
_context__WEBPACK_IMPORTED_MODULE_7__["default"].environment = _state__WEBPACK_IMPORTED_MODULE_0__["default"].environment;
_client__WEBPACK_IMPORTED_MODULE_6__["default"].memory = _state__WEBPACK_IMPORTED_MODULE_0__["default"].instances;
const scope = _client__WEBPACK_IMPORTED_MODULE_6__["default"];
scope.generateContext = _context__WEBPACK_IMPORTED_MODULE_7__.generateContext;
scope.context = _context__WEBPACK_IMPORTED_MODULE_7__["default"];
_client__WEBPACK_IMPORTED_MODULE_6__["default"].plugins = (0,_shared_plugins__WEBPACK_IMPORTED_MODULE_5__.loadPlugins)(scope);
class Nullstack {
    static start(Starter) {
        setTimeout(async ()=>{
            window.addEventListener("popstate", ()=>{
                _router__WEBPACK_IMPORTED_MODULE_17__["default"]._popState();
            });
            _client__WEBPACK_IMPORTED_MODULE_6__["default"].routes = {};
            (0,_params__WEBPACK_IMPORTED_MODULE_13__.updateParams)(_router__WEBPACK_IMPORTED_MODULE_17__["default"].url);
            _client__WEBPACK_IMPORTED_MODULE_6__["default"].currentInstance = null;
            _client__WEBPACK_IMPORTED_MODULE_6__["default"].initializer = ()=>(0,_shared_element__WEBPACK_IMPORTED_MODULE_1__["default"])(Starter)
            ;
            _client__WEBPACK_IMPORTED_MODULE_6__["default"].selector = document.querySelector("#application");
            if (_environment__WEBPACK_IMPORTED_MODULE_8__["default"].mode === "spa") {
                scope.plugins = (0,_shared_plugins__WEBPACK_IMPORTED_MODULE_5__.loadPlugins)(scope);
                _worker__WEBPACK_IMPORTED_MODULE_19__["default"].online = navigator.onLine;
                typeof _context__WEBPACK_IMPORTED_MODULE_7__["default"].start === "function" && await _context__WEBPACK_IMPORTED_MODULE_7__["default"].start(_context__WEBPACK_IMPORTED_MODULE_7__["default"]);
                _context__WEBPACK_IMPORTED_MODULE_7__["default"].environment = _environment__WEBPACK_IMPORTED_MODULE_8__["default"];
                _client__WEBPACK_IMPORTED_MODULE_6__["default"].virtualDom = await (0,_shared_generateTree__WEBPACK_IMPORTED_MODULE_3__["default"])(_client__WEBPACK_IMPORTED_MODULE_6__["default"].initializer(), scope);
                const body = (0,_render__WEBPACK_IMPORTED_MODULE_15__["default"])(_client__WEBPACK_IMPORTED_MODULE_6__["default"].virtualDom);
                _client__WEBPACK_IMPORTED_MODULE_6__["default"].selector.replaceWith(body);
                _client__WEBPACK_IMPORTED_MODULE_6__["default"].selector = body;
            } else {
                _client__WEBPACK_IMPORTED_MODULE_6__["default"].virtualDom = await (0,_shared_generateTree__WEBPACK_IMPORTED_MODULE_3__["default"])(_client__WEBPACK_IMPORTED_MODULE_6__["default"].initializer(), scope);
                _context__WEBPACK_IMPORTED_MODULE_7__["default"].environment = _environment__WEBPACK_IMPORTED_MODULE_8__["default"];
                scope.plugins = (0,_shared_plugins__WEBPACK_IMPORTED_MODULE_5__.loadPlugins)(scope);
                _worker__WEBPACK_IMPORTED_MODULE_19__["default"].online = navigator.onLine;
                typeof _context__WEBPACK_IMPORTED_MODULE_7__["default"].start === "function" && await _context__WEBPACK_IMPORTED_MODULE_7__["default"].start(_context__WEBPACK_IMPORTED_MODULE_7__["default"]);
                _client__WEBPACK_IMPORTED_MODULE_6__["default"].nextVirtualDom = await (0,_shared_generateTree__WEBPACK_IMPORTED_MODULE_3__["default"])(_client__WEBPACK_IMPORTED_MODULE_6__["default"].initializer(), scope);
                (0,_rerender__WEBPACK_IMPORTED_MODULE_16__["default"])(_client__WEBPACK_IMPORTED_MODULE_6__["default"].selector);
                _client__WEBPACK_IMPORTED_MODULE_6__["default"].virtualDom = _client__WEBPACK_IMPORTED_MODULE_6__["default"].nextVirtualDom;
                _client__WEBPACK_IMPORTED_MODULE_6__["default"].nextVirtualDom = null;
            }
            _client__WEBPACK_IMPORTED_MODULE_6__["default"].processLifecycleQueues();
            delete _state__WEBPACK_IMPORTED_MODULE_0__["default"].context;
        }, 0);
        return (0,_context__WEBPACK_IMPORTED_MODULE_7__.generateContext)({});
    }
    render() {
        return false;
    }
    constructor(){
        _defineProperty(this, "_self", {
            prerendered: false,
            initiated: false,
            hydrated: false,
            terminated: false
        });
        const methods = (0,_shared_getProxyableMethods__WEBPACK_IMPORTED_MODULE_4__["default"])(this);
        const proxy = new Proxy(this, _instanceProxyHandler__WEBPACK_IMPORTED_MODULE_9__["default"]);
        for (const method of methods){
            this[method] = this[method].bind(proxy);
        }
        return proxy;
    }
}
_defineProperty(Nullstack, "element", _shared_element__WEBPACK_IMPORTED_MODULE_1__["default"]);
_defineProperty(Nullstack, "invoke", _invoke__WEBPACK_IMPORTED_MODULE_10__["default"]);
_defineProperty(Nullstack, "fragment", _shared_fragment__WEBPACK_IMPORTED_MODULE_2__["default"]);
_defineProperty(Nullstack, "use", (0,_shared_plugins__WEBPACK_IMPORTED_MODULE_5__.usePlugins)("client"));



/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/instanceProxyHandler.js":
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/instanceProxyHandler.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/client.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/context.js");
/* harmony import */ var _objectProxyHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objectProxyHandler */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/objectProxyHandler.js");



const instanceProxyHandler = {
    get (target, name) {
        var ref, ref1, ref2;
        if (name === "_isProxy") return true;
        if (((ref = target.constructor[name]) === null || ref === void 0 ? void 0 : ref.name) === "_invoke") return target.constructor[name].bind(target.constructor);
        if (!((ref1 = target[name]) === null || ref1 === void 0 ? void 0 : (ref2 = ref1.name) === null || ref2 === void 0 ? void 0 : ref2.startsWith("_")) && !name.startsWith("_") && typeof target[name] == "function" && name !== "constructor") {
            const { [name]: named  } = {
                [name]: (args)=>{
                    const context = (0,_context__WEBPACK_IMPORTED_MODULE_1__.generateContext)({
                        ...target._attributes,
                        ...args,
                        self: target._self
                    });
                    return target[name](context);
                }
            };
            return named;
        }
        return Reflect.get(...arguments);
    },
    set (target, name, value) {
        var ref;
        if (!(value === null || value === void 0 ? void 0 : (ref = value.name) === null || ref === void 0 ? void 0 : ref.startsWith("_")) && !name.startsWith("_")) {
            target[name] = (0,_objectProxyHandler__WEBPACK_IMPORTED_MODULE_2__.generateObjectProxy)(name, value);
            _client__WEBPACK_IMPORTED_MODULE_0__["default"].update();
        } else {
            target[name] = value;
        }
        return true;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instanceProxyHandler);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/invoke.js":
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/invoke.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ invoke)
/* harmony export */ });
/* harmony import */ var _shared_deserialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/deserialize */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/deserialize.js");
/* harmony import */ var _shared_prefix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/prefix */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/prefix.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/page.js");
/* harmony import */ var _worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./worker */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/worker.js");




function invoke(name, hash) {
    return async function _invoke(params = {}) {
        var ref;
        let payload;
        _worker__WEBPACK_IMPORTED_MODULE_3__["default"].fetching = true;
        if (Object.isFrozen(_worker__WEBPACK_IMPORTED_MODULE_3__["default"].queues[name])) {
            _worker__WEBPACK_IMPORTED_MODULE_3__["default"].queues[name] = [
                params
            ];
        } else {
            _worker__WEBPACK_IMPORTED_MODULE_3__["default"].queues[name] = [
                ..._worker__WEBPACK_IMPORTED_MODULE_3__["default"].queues[name],
                params
            ];
        }
        const finalHash = hash === this.hash ? hash : `${hash}-${this.hash}`;
        let url = `${_worker__WEBPACK_IMPORTED_MODULE_3__["default"].api}/${_shared_prefix__WEBPACK_IMPORTED_MODULE_1__["default"]}/${finalHash}/${name}.json`;
        let body = JSON.stringify(params || {});
        const options = {
            headers: _worker__WEBPACK_IMPORTED_MODULE_3__["default"].headers,
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            redirect: "follow",
            referrerPolicy: "no-referrer"
        };
        if (/get[A-Z]([*]*)/.test(name)) {
            options.method = "GET";
            url += `?payload=${encodeURIComponent(body)}`;
        } else {
            options.body = body;
            if (/patch[A-Z]([*]*)/.test(name)) {
                options.method = "PATCH";
            } else if (/put[A-Z]([*]*)/.test(name)) {
                options.method = "PUT";
            } else if (/delete[A-Z]([*]*)/.test(name)) {
                options.method = "DELETE";
            } else {
                options.method = "POST";
            }
        }
        try {
            const response = await fetch(url, options);
            _page__WEBPACK_IMPORTED_MODULE_2__["default"].status = response.status;
            const text = await response.text();
            payload = (0,_shared_deserialize__WEBPACK_IMPORTED_MODULE_0__["default"])(text).result;
            _worker__WEBPACK_IMPORTED_MODULE_3__["default"].responsive = true;
        } catch (e) {
            _worker__WEBPACK_IMPORTED_MODULE_3__["default"].responsive = false;
        }
        if (((ref = _worker__WEBPACK_IMPORTED_MODULE_3__["default"].queues[name]) === null || ref === void 0 ? void 0 : ref.length) === 1) {
            delete _worker__WEBPACK_IMPORTED_MODULE_3__["default"].queues[name];
        } else {
            _worker__WEBPACK_IMPORTED_MODULE_3__["default"].queues[name] = _worker__WEBPACK_IMPORTED_MODULE_3__["default"].queues[name].filter((task)=>task !== params
            );
        }
        _worker__WEBPACK_IMPORTED_MODULE_3__["default"].fetching = !!Object.keys(_worker__WEBPACK_IMPORTED_MODULE_3__["default"].queues).length;
        return payload;
    };
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/liveReload.js":
/*!**********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/liveReload.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worker */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/worker.js");

let shouldReloadNext = false;
let timer = null;
function reload() {
    if (shouldReloadNext) {
        clearInterval(timer);
        timer = setTimeout(()=>{
            location.reload();
        }, 10);
    } else {
        shouldReloadNext = true;
    }
}
function liveReload() {
    const url = _worker__WEBPACK_IMPORTED_MODULE_0__["default"].api ? `${_worker__WEBPACK_IMPORTED_MODULE_0__["default"].api.replace("http", "ws")}` : `${location.protocol.replace("http", "ws")}//${location.host}`;
    const socket = new WebSocket(url);
    socket.addEventListener("open", reload);
    socket.addEventListener("close", liveReload);
}
liveReload();


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/objectProxyHandler.js":
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/objectProxyHandler.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "generateObjectProxy": () => (/* binding */ generateObjectProxy)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/client.js");

const objectProxyHandler = {
    set (target, name, value) {
        if (isProxyable(name, value)) {
            value._isProxy = true;
            target[name] = new Proxy(value, this);
        } else {
            target[name] = value;
        }
        if (!name.startsWith("_")) {
            _client__WEBPACK_IMPORTED_MODULE_0__["default"].update();
        }
        return true;
    },
    get (target, name) {
        if (name === "_isProxy") return true;
        return Reflect.get(...arguments);
    }
};
function isProxyable(name, value) {
    return !name.startsWith("_") && value !== null && typeof value === "object" && value._isProxy === undefined && !(value instanceof Date);
}
function generateObjectProxy(name, value) {
    if (isProxyable(name, value)) {
        if (typeof value === "object") {
            for (const key of Object.keys(value)){
                value[key] = generateObjectProxy(key, value[key]);
            }
        }
        return new Proxy(value, objectProxyHandler);
    } else {
        return value;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (objectProxyHandler);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/page.js":
/*!****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/page.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/client.js");
/* harmony import */ var _windowEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./windowEvent */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/windowEvent.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/state.js");



const page = {
    ..._state__WEBPACK_IMPORTED_MODULE_2__["default"].page,
    event: "nullstack.page"
};
delete _state__WEBPACK_IMPORTED_MODULE_2__["default"].page;
const pageProxyHandler = {
    set (target, name, value) {
        if (name === "title") {
            document.title = value;
        }
        const result = Reflect.set(...arguments);
        if (name === "title") {
            (0,_windowEvent__WEBPACK_IMPORTED_MODULE_1__["default"])("page");
        }
        _client__WEBPACK_IMPORTED_MODULE_0__["default"].update();
        return result;
    }
};
const proxy = new Proxy(page, pageProxyHandler);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (proxy);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/params.js":
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/params.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "updateParams": () => (/* binding */ updateParams)
/* harmony export */ });
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/router.js");
/* harmony import */ var _shared_getQueryStringParams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/getQueryStringParams */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/getQueryStringParams.js");
/* harmony import */ var _shared_serializeParam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/serializeParam */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/serializeParam.js");
/* harmony import */ var _shared_serializeSearch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/serializeSearch */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/serializeSearch.js");
/* harmony import */ var _segments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./segments */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/segments.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/state.js");






const paramsProxyHandler = {
    set (target, name, value) {
        const serializedValue = (0,_shared_serializeParam__WEBPACK_IMPORTED_MODULE_2__["default"])(value);
        target[name] = serializedValue;
        const search = (0,_shared_serializeSearch__WEBPACK_IMPORTED_MODULE_3__["default"])(target);
        _router__WEBPACK_IMPORTED_MODULE_0__["default"].url = _router__WEBPACK_IMPORTED_MODULE_0__["default"].path + (search ? "?" : "") + search;
        return true;
    },
    get (target, name) {
        if (target[name] === false) return false;
        if (_segments__WEBPACK_IMPORTED_MODULE_4__["default"][name] === false) return false;
        return target[name] || _segments__WEBPACK_IMPORTED_MODULE_4__["default"][name] || "";
    }
};
const params = {
    ..._state__WEBPACK_IMPORTED_MODULE_5__["default"].params
};
delete _state__WEBPACK_IMPORTED_MODULE_5__["default"].params;
const proxy = new Proxy(params, paramsProxyHandler);
function updateParams(query) {
    (0,_segments__WEBPACK_IMPORTED_MODULE_4__.resetSegments)();
    const delta = (0,_shared_getQueryStringParams__WEBPACK_IMPORTED_MODULE_1__["default"])(query);
    for (const key of Object.keys({
        ...delta,
        ...params
    })){
        params[key] = delta[key];
    }
    return proxy;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (proxy);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/project.js":
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/project.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/state.js");

const project = {
    ..._state__WEBPACK_IMPORTED_MODULE_0__["default"].project
};
delete _state__WEBPACK_IMPORTED_MODULE_0__["default"].project;
Object.freeze(project);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (project);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/render.js":
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/render.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _shared_nodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/nodes */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/nodes.js");
/* harmony import */ var _anchorableNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./anchorableNode */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/anchorableNode.js");


function render(node, options) {
    if ((0,_shared_nodes__WEBPACK_IMPORTED_MODULE_0__.isFalse)(node) || node.type === "head") {
        return document.createComment("");
    }
    if ((0,_shared_nodes__WEBPACK_IMPORTED_MODULE_0__.isText)(node)) {
        return document.createTextNode(node);
    }
    const svg = options && options.svg || node.type === "svg";
    let element;
    if (svg) {
        element = document.createElementNS("http://www.w3.org/2000/svg", node.type);
    } else {
        element = document.createElement(node.type);
    }
    if (node.instance) {
        node.instance._self.element = element;
    }
    for(let name in node.attributes){
        if (name === "html") {
            element.innerHTML = node.attributes[name];
            (0,_anchorableNode__WEBPACK_IMPORTED_MODULE_1__.anchorableElement)(element);
        } else if (name.startsWith("on")) {
            if (node.attributes[name] !== undefined) {
                const eventName = name.replace("on", "");
                const key = "_event." + eventName;
                node[key] = (event)=>{
                    if (node.attributes.default !== true) {
                        event.preventDefault();
                    }
                    node.attributes[name]({
                        ...node.attributes,
                        event
                    });
                };
                element.addEventListener(eventName, node[key]);
            }
        } else {
            const type = typeof node.attributes[name];
            if (type !== "object" && type !== "function") {
                if (name != "value" && node.attributes[name] === true) {
                    element.setAttribute(name, "");
                } else if (name == "value" || node.attributes[name] !== false && node.attributes[name] !== null && node.attributes[name] !== undefined) {
                    element.setAttribute(name, node.attributes[name]);
                }
            }
        }
    }
    if (!node.attributes.html) {
        for(let i = 0; i < node.children.length; i++){
            const child = render(node.children[i], {
                svg
            });
            element.appendChild(child);
        }
        if (node.type == "select") {
            element.value = node.attributes.value;
        }
    }
    return element;
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/rerender.js":
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/rerender.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rerender)
/* harmony export */ });
/* harmony import */ var _shared_nodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/nodes */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/nodes.js");
/* harmony import */ var _anchorableNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./anchorableNode */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/anchorableNode.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/client.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/render.js");




function rerender(selector, current, next) {
    current = current === undefined ? _client__WEBPACK_IMPORTED_MODULE_2__["default"].virtualDom : current;
    next = next === undefined ? _client__WEBPACK_IMPORTED_MODULE_2__["default"].nextVirtualDom : next;
    if (next.instance) {
        next.instance._self.element = selector;
    }
    if (!_client__WEBPACK_IMPORTED_MODULE_2__["default"].hydrated && selector) {
        for (const element of selector.childNodes){
            if (element.tagName && element.tagName.toLowerCase() == "textarea" && element.childNodes.length == 0) {
                element.appendChild(document.createTextNode(""));
            }
            if (element.COMMENT_NODE === 8 && element.textContent === "#") {
                selector.removeChild(element);
            }
        }
    }
    if ((0,_shared_nodes__WEBPACK_IMPORTED_MODULE_0__.isFalse)(current) && (0,_shared_nodes__WEBPACK_IMPORTED_MODULE_0__.isFalse)(next)) {
        return;
    }
    if (((0,_shared_nodes__WEBPACK_IMPORTED_MODULE_0__.isFalse)(current) || (0,_shared_nodes__WEBPACK_IMPORTED_MODULE_0__.isFalse)(next)) && current != next) {
        const nextSelector = (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])(next);
        return selector.replaceWith(nextSelector);
    }
    if (current.type == "head" && next.type == "head") {
        return;
    }
    if (current.type == "head" || next.type == "head") {
        const nextSelector = (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])(next);
        return selector.replaceWith(nextSelector);
    }
    if (current.type !== next.type) {
        const nextSelector = (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])(next);
        return selector.replaceWith(nextSelector);
    }
    if ((0,_shared_nodes__WEBPACK_IMPORTED_MODULE_0__.isText)(current) && (0,_shared_nodes__WEBPACK_IMPORTED_MODULE_0__.isText)(next)) {
        if (current != next) {
            selector.nodeValue = next;
        }
        return;
    }
    if (current.type === next.type) {
        const attributeNames = Object.keys({
            ...current.attributes,
            ...next.attributes
        });
        for (const name of attributeNames){
            if (name === "html") {
                if (next.attributes[name] !== current.attributes[name]) {
                    selector.innerHTML = next.attributes[name];
                }
                (0,_anchorableNode__WEBPACK_IMPORTED_MODULE_1__.anchorableElement)(selector);
            } else if (name === "checked") {
                if (next.attributes[name] !== selector.value) {
                    selector.checked = next.attributes[name];
                }
            } else if (name === "value") {
                if (next.attributes[name] !== selector.value) {
                    selector.value = next.attributes[name];
                }
            } else if (name.startsWith("on")) {
                const eventName = name.replace("on", "");
                const key = "_event." + eventName;
                selector.removeEventListener(eventName, current[key]);
                if (next.attributes[name]) {
                    next[key] = (event)=>{
                        if (next.attributes.default !== true) {
                            event.preventDefault();
                        }
                        next.attributes[name]({
                            ...next.attributes,
                            event
                        });
                    };
                    selector.addEventListener(eventName, next[key]);
                }
            } else {
                const type = typeof next.attributes[name];
                if (type !== "object" && type !== "function") {
                    if (current.attributes[name] !== undefined && next.attributes[name] === undefined) {
                        selector.removeAttribute(name);
                    } else if (current.attributes[name] !== next.attributes[name]) {
                        if (name != "value" && next.attributes[name] === false || next.attributes[name] === null || next.attributes[name] === undefined) {
                            selector.removeAttribute(name);
                        } else if (name != "value" && next.attributes[name] === true) {
                            selector.setAttribute(name, "");
                        } else {
                            selector.setAttribute(name, next.attributes[name]);
                        }
                    }
                }
            }
        }
        if (next.attributes.html) return;
        const limit = Math.max(current.children.length, next.children.length);
        if (next.children.length > current.children.length) {
            for(let i = 0; i < current.children.length; i++){
                rerender(selector.childNodes[i], current.children[i], next.children[i]);
            }
            for(let i1 = current.children.length; i1 < next.children.length; i1++){
                const nextSelector = (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])(next.children[i1]);
                selector.appendChild(nextSelector);
            }
        } else if (current.children.length > next.children.length) {
            for(let i = 0; i < next.children.length; i++){
                rerender(selector.childNodes[i], current.children[i], next.children[i]);
            }
            for(let i2 = current.children.length - 1; i2 >= next.children.length; i2--){
                selector.removeChild(selector.childNodes[i2]);
            }
        } else {
            for(let i = limit - 1; i > -1; i--){
                if (typeof selector.childNodes[i] === "undefined") {
                    console.error(`${current.type.toUpperCase()} expected tag ${current.children[i].type.toUpperCase()} to be child at index ${i} but instead found undefined. This error usually happens because of an invalid HTML hierarchy or changes in comparisons after serialization.`, selector);
                    throw new Error("Virtual DOM does not match the DOM.");
                    return;
                }
                rerender(selector.childNodes[i], current.children[i], next.children[i]);
            }
        }
        if (next.type == "textarea") {
            selector.value = next.children.join("");
        }
        if (next.type == "select") {
            selector.value = next.attributes.value;
        }
    }
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/router.js":
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/router.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_extractLocation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/extractLocation */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/extractLocation.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/client.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environment */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/environment.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/page.js");
/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./params */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/params.js");
/* harmony import */ var _segments__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./segments */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/segments.js");
/* harmony import */ var _windowEvent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./windowEvent */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/windowEvent.js");
/* harmony import */ var _worker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./worker */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/worker.js");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}








let redirectTimer = null;
class Router {
    async _popState() {
        const { urlWithHash  } = (0,_shared_extractLocation__WEBPACK_IMPORTED_MODULE_0__["default"])(window.location.pathname + window.location.search);
        await this._update(urlWithHash, false);
    }
    async _update(target, push) {
        this.previous = this.url;
        const { url , path , hash , urlWithHash  } = (0,_shared_extractLocation__WEBPACK_IMPORTED_MODULE_0__["default"])(target);
        clearTimeout(redirectTimer);
        redirectTimer = setTimeout(async ()=>{
            _page__WEBPACK_IMPORTED_MODULE_3__["default"].status = 200;
            if (_environment__WEBPACK_IMPORTED_MODULE_2__["default"].mode === "ssg") {
                _worker__WEBPACK_IMPORTED_MODULE_7__["default"].fetching = true;
                const api = "/index.json";
                const endpoint = path === "/" ? api : path + api;
                try {
                    const response = await fetch(endpoint);
                    const payload = await response.json(url);
                    _client__WEBPACK_IMPORTED_MODULE_1__["default"].memory = payload.instances;
                    for(const key in payload.page){
                        _page__WEBPACK_IMPORTED_MODULE_3__["default"][key] = payload.page[key];
                    }
                    _worker__WEBPACK_IMPORTED_MODULE_7__["default"].responsive = true;
                } catch (error) {
                    _worker__WEBPACK_IMPORTED_MODULE_7__["default"].responsive = false;
                }
                _worker__WEBPACK_IMPORTED_MODULE_7__["default"].fetching = false;
            }
            if (push) {
                history.pushState({}, document.title, urlWithHash);
            }
            this._url = url;
            this._hash = hash;
            this._changed = true;
            (0,_params__WEBPACK_IMPORTED_MODULE_4__.updateParams)(url);
            _client__WEBPACK_IMPORTED_MODULE_1__["default"].update();
            (0,_windowEvent__WEBPACK_IMPORTED_MODULE_6__["default"])("router");
        }, 0);
    }
    async _redirect(target) {
        if (target.startsWith("http")) {
            return window.location.href = target;
        }
        const { url , hash , urlWithHash  } = (0,_shared_extractLocation__WEBPACK_IMPORTED_MODULE_0__["default"])(target);
        if (url !== this._url || this._hash !== hash) {
            await this._update(urlWithHash, true);
        }
        if (!hash) {
            window.scroll(0, 0);
        }
    }
    get url() {
        return this._url;
    }
    set url(target) {
        this._redirect(target);
    }
    get path() {
        return (0,_shared_extractLocation__WEBPACK_IMPORTED_MODULE_0__["default"])(this._url).path;
    }
    set path(target) {
        this._redirect(target + window.location.search);
    }
    constructor(){
        _defineProperty(this, "event", "nullstack.router");
        _defineProperty(this, "previous", null);
        _defineProperty(this, "_changed", false);
        _defineProperty(this, "_segments", _segments__WEBPACK_IMPORTED_MODULE_5__["default"]);
        const { hash , url  } = (0,_shared_extractLocation__WEBPACK_IMPORTED_MODULE_0__["default"])(window.location.pathname + window.location.search);
        this._url = url;
        this._hash = hash;
    }
}
const router = new Router();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/segments.js":
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/segments.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "resetSegments": () => (/* binding */ resetSegments)
/* harmony export */ });
const segments = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (segments);
function resetSegments() {
    for(const key in segments){
        delete segments[key];
    }
}


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/settings.js":
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/settings.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/state.js");

const settings = {
    ..._state__WEBPACK_IMPORTED_MODULE_0__["default"].settings
};
delete _state__WEBPACK_IMPORTED_MODULE_0__["default"].settings;
Object.freeze(settings);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (settings);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/state.js":
/*!*****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/state.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_deserialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/deserialize */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/deserialize.js");

const state = (0,_shared_deserialize__WEBPACK_IMPORTED_MODULE_0__["default"])(decodeURIComponent(document.querySelector(`[name=nullstack]`).content));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/windowEvent.js":
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/windowEvent.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ windowEvent)
/* harmony export */ });
let timer = null;
function windowEvent(name) {
    clearTimeout(timer);
    setTimeout(()=>{
        const event = new Event("nullstack." + name);
        window.dispatchEvent(event);
    }, 0);
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/worker.js":
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/worker.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/client.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environment */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/environment.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/router.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/client/state.js");




const worker = {
    ..._state__WEBPACK_IMPORTED_MODULE_3__["default"].worker
};
delete _state__WEBPACK_IMPORTED_MODULE_3__["default"].worker;
const emptyQueue = Object.freeze([]);
const queuesProxyHandler = {
    set (target, name, value) {
        target[name] = value;
        _client__WEBPACK_IMPORTED_MODULE_0__["default"].update();
        return true;
    },
    get (target, name) {
        return target[name] || emptyQueue;
    }
};
worker.queues = new Proxy({}, queuesProxyHandler);
const workerProxyHandler = {
    set (target, name, value) {
        if (target[name] !== value) {
            target[name] = value;
            _client__WEBPACK_IMPORTED_MODULE_0__["default"].update();
        }
        return true;
    }
};
const proxy = new Proxy(worker, workerProxyHandler);
if (worker.enabled) {
    window.addEventListener("beforeinstallprompt", function(event) {
        event.preventDefault();
        proxy.installation = event;
    });
    async function register() {
        if ("serviceWorker" in navigator) {
            const request = `/service-worker.js`;
            try {
                proxy.registration = await navigator.serviceWorker.register(request, {
                    scope: "/"
                });
            } catch (error) {
                console.log(error);
            }
            ;
        }
    }
    ;
    register();
}
window.addEventListener("online", ()=>{
    proxy.online = true;
    if (_environment__WEBPACK_IMPORTED_MODULE_1__["default"].mode === "ssg") {
        _router__WEBPACK_IMPORTED_MODULE_2__["default"]._update(_router__WEBPACK_IMPORTED_MODULE_2__["default"].url);
    } else {
        proxy.responsive = true;
    }
});
window.addEventListener("offline", ()=>{
    proxy.online = false;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (proxy);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/anchorable.js":
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/anchorable.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function match(node) {
    return node && node.type === "a" && node.attributes.href && node.attributes.href.startsWith("/") && !node.attributes.target;
}
function transform({ node , router  }) {
    if (!match(node)) return;
    const originalEvent = node.attributes.onclick;
    node.attributes.default = true;
    node.attributes.onclick = ({ event  })=>{
        if (!event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
            event.preventDefault();
            router.url = node.attributes.href;
        }
        if (originalEvent) {
            setTimeout(()=>{
                originalEvent({
                    ...node.attributes,
                    event
                });
            }, 0);
        }
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    transform,
    client: true
});


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/bindable.js":
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/bindable.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function attachEvent(node) {
    const target = node.attributes.source;
    let eventName = "oninput";
    let valueName = "value";
    if (node.attributes.type === "checkbox" || node.attributes.type === "radio") {
        eventName = "onclick";
        valueName = "checked";
    } else if (node.type !== "input" && node.type !== "textarea") {
        eventName = "onchange";
    }
    const originalEvent = node.attributes[eventName];
    node.attributes[eventName] = ({ event , value  })=>{
        if (valueName == "checked") {
            target[node.attributes.bind] = event.target[valueName];
        } else if (target[node.attributes.bind] === true || target[node.attributes.bind] === false) {
            target[node.attributes.bind] = event ? event.target[valueName] == "true" : value;
        } else if (typeof target[node.attributes.bind] === "number") {
            target[node.attributes.bind] = parseFloat(event ? event.target[valueName] : value) || 0;
        } else {
            target[node.attributes.bind] = event ? event.target[valueName] : value;
        }
        if (originalEvent !== undefined) {
            setTimeout(()=>{
                originalEvent({
                    ...node.attributes,
                    event,
                    value
                });
            }, 0);
        }
    };
}
function match(node) {
    return node !== undefined && node.attributes !== undefined && node.attributes.bind !== undefined && node.attributes.source !== undefined;
}
function transform({ node , environment  }) {
    if (!match(node)) return;
    const target = node.attributes.source;
    if (node.type === "textarea") {
        node.children = [
            target[node.attributes.bind]
        ];
    } else if (node.type === "input" && node.attributes.type === "checkbox") {
        node.attributes.checked = target[node.attributes.bind];
    } else {
        node.attributes.value = target[node.attributes.bind] || "";
    }
    node.attributes.name = node.attributes.name || node.attributes.bind;
    if (environment.client) {
        attachEvent(node);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    transform,
    client: true,
    server: true
});


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/datable.js":
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/datable.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/string */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/string.js");

function match(node) {
    return node && node.attributes !== undefined;
}
function transform({ node  }) {
    if (!match(node)) return;
    node.attributes.data = node.attributes.data || {};
    for(const attribute in node.attributes){
        if (attribute.startsWith("data-")) {
            const key = (0,_shared_string__WEBPACK_IMPORTED_MODULE_0__.camelize)(attribute.slice(5));
            node.attributes.data[key] = node.attributes[attribute];
        }
    }
    for(const key in node.attributes.data){
        const attribute = "data-" + (0,_shared_string__WEBPACK_IMPORTED_MODULE_0__.kebabize)(key);
        node.attributes[attribute] = node.attributes.data[key];
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    transform,
    client: true,
    server: true
});


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/objectable.js":
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/objectable.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function match(node) {
    return node && node.attributes !== undefined;
}
function transform({ node  }) {
    if (!match(node)) return;
    for(const attribute in node.attributes){
        if (attribute.startsWith("on") && typeof node.attributes[attribute] === "object") {
            const target = node.attributes.source;
            const object = node.attributes[attribute];
            node.attributes[attribute] = (function() {
                Object.assign(target, object);
            }).bind(target);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    transform,
    client: true
});


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/parameterizable.js":
/*!****************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/parameterizable.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_serializeParam__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/serializeParam */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/serializeParam.js");
/* harmony import */ var _shared_serializeSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/serializeSearch */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/serializeSearch.js");


function match(node) {
    return node && node.attributes && (node.attributes.params || node.attributes.path);
}
function transform({ node , router , params  }) {
    if (!match(node)) return;
    let serializedParams;
    if (node.attributes.params) {
        serializedParams = {};
        for(const key in node.attributes.params){
            serializedParams[key] = (0,_shared_serializeParam__WEBPACK_IMPORTED_MODULE_0__["default"])(node.attributes.params[key]);
        }
    } else {
        serializedParams = params;
    }
    const search = (0,_shared_serializeSearch__WEBPACK_IMPORTED_MODULE_1__["default"])(serializedParams);
    const path = node.attributes.path || router.path;
    node.attributes.href = path + (search ? "?" : "") + search;
    delete node.attributes.path;
    delete node.attributes.params;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    transform,
    client: true,
    server: true
});


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/routable.js":
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/routable.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_routeMatches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/routeMatches */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/routeMatches.js");

function erase(node) {
    node.type = false;
    delete node.attributes;
    delete node.children;
}
function match(node) {
    return node && node.attributes !== undefined && node.attributes.route !== undefined;
}
function load({ router  }) {
    router._routes = {};
    if (!router._oldSegments) {
        router._oldSegments = {};
        router._newSegments = {};
    } else {
        router._oldSegments = router._newSegments;
        router._newSegments = {};
    }
}
function transform({ node , depth , router  }) {
    if (!match(node)) return;
    const routeDepth = depth.slice(0, -1).join(".");
    if (router._routes[routeDepth] !== undefined) {
        erase(node);
    } else {
        const params = (0,_shared_routeMatches__WEBPACK_IMPORTED_MODULE_0__["default"])(router.url, node.attributes.route);
        if (params) {
            router._routes[routeDepth] = true;
            router._newSegments[routeDepth] = params;
            Object.assign(router._segments, params);
        } else {
            erase(node);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    load,
    transform,
    client: true,
    server: true
});


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/deserialize.js":
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/deserialize.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ deserialize)
/* harmony export */ });
const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
const reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
function dateParser(key, value) {
    if (typeof value === "string") {
        let a = reISO.exec(value);
        if (a) return new Date(value);
        a = reMsAjax.exec(value);
        if (a) {
            const b = a[1].split(/[-+,.]/);
            return new Date(b[0] ? +b[0] : 0 - +b[1]);
        }
    }
    return value;
}
;
function deserialize(string) {
    return JSON.parse(string, dateParser);
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/element.js":
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/element.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ element)
/* harmony export */ });
/* harmony import */ var _fragment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fragment */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/fragment.js");

function flattenChildren(children) {
    children = [].concat.apply([], children).map((child)=>{
        if (child === null || child === undefined) return false;
        return child;
    });
    return [].concat.apply([], children);
}
function element(type, props, ...children) {
    children = flattenChildren(children);
    if (type === "textarea") {
        children = [
            children.join("")
        ];
    }
    const attributes = {
        ...props,
        children
    };
    if (type === "element") {
        type = attributes.tag || _fragment__WEBPACK_IMPORTED_MODULE_0__["default"];
        delete attributes.tag;
    }
    if (typeof type === "function" && type.render !== undefined) {
        return {
            type,
            attributes,
            children: null
        };
    }
    return {
        type,
        attributes,
        children
    };
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/extractLocation.js":
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/extractLocation.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ extractLocation)
/* harmony export */ });
function extractLocation(originalUrl) {
    let [target, hash] = originalUrl.split("#");
    let [path, search] = target.split("?");
    if (path !== "/" && path.endsWith("/")) {
        path = path.substring(0, path.length - 1);
    }
    let url = path;
    if (search) {
        url += "?" + search;
    }
    let urlWithHash = url;
    if (hash) {
        urlWithHash += "#" + hash;
    }
    if (hash === undefined) {
        hash = "";
    }
    return {
        path,
        search,
        url,
        urlWithHash,
        hash
    };
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/extractParamValue.js":
/*!*****************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/extractParamValue.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ extractParamValue)
/* harmony export */ });
function extractParamValue(value) {
    if (value === "true") return true;
    if (value === "false") return false;
    return value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/fragment.js":
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/fragment.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fragment)
/* harmony export */ });
function fragment({ children  }) {
    return children;
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/generateKey.js":
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/generateKey.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateKey)
/* harmony export */ });
function generateKey(node, depth) {
    if (depth.length === 1) return "application";
    return node.type.name + "/" + depth.join("-");
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/generateTree.js":
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/generateTree.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateTree)
/* harmony export */ });
/* harmony import */ var _shared_generateKey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/generateKey */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/generateKey.js");
/* harmony import */ var _shared_nodes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/nodes */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/nodes.js");
/* harmony import */ var _plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugins */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/plugins.js");



async function generateBranch(parent, node, depth, scope) {
    (0,_plugins__WEBPACK_IMPORTED_MODULE_2__.transformNodes)(scope, node, depth);
    if ((0,_shared_nodes__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(node)) {
        let message = "Attempting to render an undefined node. \n";
        if (node === undefined) {
            message += "This error usually happens because of a missing return statement around JSX or returning undefined from a renderable function.";
        } else {
            message += "This error usually happens because of a missing import statement or a typo on a component tag";
        }
        throw new Error(message);
        return;
    }
    if ((0,_shared_nodes__WEBPACK_IMPORTED_MODULE_1__.isFalse)(node)) {
        parent.children.push(false);
        return;
    }
    if ((0,_shared_nodes__WEBPACK_IMPORTED_MODULE_1__.isClass)(node)) {
        const key = node.attributes.key ? node.attributes.key : (0,_shared_generateKey__WEBPACK_IMPORTED_MODULE_0__["default"])(node, depth) + (node.attributes.route ? scope.context.environment.mode === "ssg" ? scope.context.router.path : scope.context.router.url : "");
        if (scope.context.environment.client && scope.context.router._changed && node.attributes && node.attributes.route && scope.context.environment.mode !== "ssg") {
            const routeDepth = depth.slice(0, -1).join(".");
            const newSegments = scope.context.router._newSegments[routeDepth];
            if (newSegments) {
                const oldSegments = scope.context.router._oldSegments[routeDepth];
                for(const segment in newSegments){
                    if (oldSegments[segment] !== newSegments[segment]) {
                        delete scope.memory[key];
                    }
                }
            }
        }
        const instance = scope.instances[key] || new node.type(scope);
        instance._self.persistent = !!node.attributes.persistent;
        instance._self.key = key;
        instance._attributes = node.attributes;
        instance._scope = scope;
        let memory;
        if (scope.memory) {
            memory = scope.memory[key];
            if (memory) {
                instance._self.prerendered = true;
                instance._self.initiated = true;
                Object.assign(instance, memory);
                delete scope.memory[key];
            }
        }
        let shouldHydrate = false;
        const shouldLaunch = instance._self.initiated && (!instance._self.prerendered || instance._self.persistent && instance._self.terminated);
        if (instance._self.terminated) {
            shouldHydrate = true;
            instance._self.terminated = false;
        }
        const shouldPrepare = scope.instances[key] === undefined;
        scope.instances[key] = instance;
        if (shouldPrepare) {
            if (memory === undefined) {
                instance.prepare && instance.prepare();
                if (scope.context.environment.server) {
                    instance.initiate && await instance.initiate();
                    instance._self.initiated = true;
                    instance.launch && instance.launch();
                } else {
                    scope.initiationQueue.push(instance);
                }
            }
            shouldHydrate = true;
        }
        if (scope.hydrationQueue) {
            if (shouldHydrate) {
                shouldLaunch && instance.launch && instance.launch();
                scope.hydrationQueue.push(instance);
            } else if (instance._self.initiated == true) {
                instance.update && instance.update();
            }
        }
        if (scope.context.environment.client) {
            scope.renewalQueue.push(instance);
        }
        const children = instance.render();
        if (children && children.type) {
            children.instance = instance;
        }
        node.children = [].concat(children);
        for(let i = 0; i < node.children.length; i++){
            await generateBranch(parent, node.children[i], [
                ...depth,
                i
            ], scope);
        }
        return;
    }
    if ((0,_shared_nodes__WEBPACK_IMPORTED_MODULE_1__.isFunction)(node)) {
        const context = node.type.name ? scope.generateContext(node.attributes) : node.attributes;
        const children = node.type(context);
        node.children = [].concat(children);
        for(let i = 0; i < node.children.length; i++){
            await generateBranch(parent, node.children[i], [
                ...depth,
                i
            ], scope);
        }
        return;
    }
    if (node.type) {
        const branch = {
            type: node.type,
            attributes: node.attributes || {},
            instance: node.instance,
            children: []
        };
        if (node.children) {
            for(let i = 0; i < node.children.length; i++){
                await generateBranch(branch, node.children[i], [
                    ...depth,
                    i
                ], scope);
            }
        }
        parent.children.push(branch);
        return;
    }
    parent.children.push(node);
}
async function generateTree(node, scope) {
    const tree = {
        type: "div",
        attributes: {
            id: "application"
        },
        children: []
    };
    await generateBranch(tree, node, [
        0
    ], scope);
    return tree;
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/getProxyableMethods.js":
/*!*******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/getProxyableMethods.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getProxyableMethods)
/* harmony export */ });
function getProxyableMethods(target) {
    let properties = new Set();
    let current = target;
    do {
        Object.getOwnPropertyNames(current).map((name)=>properties.add(name)
        );
    }while ((current = Object.getPrototypeOf(current)) && current != Object.prototype);
    return [
        ...properties.keys()
    ].filter((name)=>{
        return name !== "constructor" && typeof target[name] === "function";
    });
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/getQueryStringParams.js":
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/getQueryStringParams.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getQueryStringParams)
/* harmony export */ });
/* harmony import */ var _extractParamValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extractParamValue */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/extractParamValue.js");

function getQueryStringParams(url) {
    const [path, query] = url.split("?");
    if (query) {
        return query.split("&").reduce((params, param)=>{
            let [key, value] = param.split("=");
            params[key] = (0,_extractParamValue__WEBPACK_IMPORTED_MODULE_0__["default"])(value);
            return params;
        }, {});
    } else {
        return {};
    }
};
;


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/nodes.js":
/*!*****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/nodes.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isClass": () => (/* binding */ isClass),
/* harmony export */   "isFalse": () => (/* binding */ isFalse),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isText": () => (/* binding */ isText),
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined)
/* harmony export */ });
function isUndefined(node) {
    if (node === undefined) return true;
    return node.hasOwnProperty("type") && node.type === undefined;
}
function isFalse(node) {
    if (node === null || node === false) return true;
    return (node === null || node === void 0 ? void 0 : node.hasOwnProperty("type")) && node.type === null || node.type === false;
}
function isClass(node) {
    return typeof node.type === "function" && node.type.prototype && typeof node.type.prototype.render === "function";
}
function isFunction(node) {
    return typeof node.type === "function";
}
function isText(node) {
    return typeof node.children === "undefined";
}


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/plugins.js":
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/plugins.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadPlugins": () => (/* binding */ loadPlugins),
/* harmony export */   "transformNodes": () => (/* binding */ transformNodes),
/* harmony export */   "usePlugins": () => (/* binding */ usePlugins)
/* harmony export */ });
/* harmony import */ var _plugins_routable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugins/routable */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/routable.js");
/* harmony import */ var _plugins_bindable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../plugins/bindable */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/bindable.js");
/* harmony import */ var _plugins_datable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../plugins/datable */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/datable.js");
/* harmony import */ var _plugins_parameterizable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../plugins/parameterizable */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/parameterizable.js");
/* harmony import */ var _plugins_anchorable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plugins/anchorable */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/anchorable.js");
/* harmony import */ var _plugins_objectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../plugins/objectable */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/plugins/objectable.js");






let plugins = [
    _plugins_objectable__WEBPACK_IMPORTED_MODULE_5__["default"],
    _plugins_parameterizable__WEBPACK_IMPORTED_MODULE_3__["default"],
    _plugins_anchorable__WEBPACK_IMPORTED_MODULE_4__["default"],
    _plugins_routable__WEBPACK_IMPORTED_MODULE_0__["default"],
    _plugins_datable__WEBPACK_IMPORTED_MODULE_2__["default"],
    _plugins_bindable__WEBPACK_IMPORTED_MODULE_1__["default"]
];
function transformNodes(scope, node, depth) {
    for (const plugin of plugins){
        plugin.transform({
            ...scope.context,
            node,
            depth
        });
    }
}
function loadPlugins(scope) {
    for (const plugin of plugins){
        plugin.load && plugin.load(scope.context);
    }
    return plugins;
}
function usePlugins(environment) {
    return async (...userPlugins)=>{
        plugins = [
            ...new Set([
                ...userPlugins.flat(),
                ...plugins
            ])
        ].filter((plugin)=>plugin[environment]
        );
    };
}


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/prefix.js":
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/prefix.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const prefix = "nullstack";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prefix);


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/routeMatches.js":
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/routeMatches.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ routeMatches)
/* harmony export */ });
/* harmony import */ var _shared_extractLocation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/extractLocation */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/extractLocation.js");
/* harmony import */ var _extractParamValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extractParamValue */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/extractParamValue.js");


function routeMatches(url, route) {
    let { path  } = (0,_shared_extractLocation__WEBPACK_IMPORTED_MODULE_0__["default"])(url);
    const urlPaths = path.split("/");
    const routePaths = route.split("/");
    const params = {};
    const length = Math.max(urlPaths.length, routePaths.length);
    let catchall = false;
    for(let i = 0; i < length; i++){
        if (catchall) {
            continue;
        } else if (routePaths[i] === "*") {
            catchall = true;
        } else if (routePaths[i] && routePaths[i].startsWith(":")) {
            const key = routePaths[i].replace(":", "");
            params[key] = (0,_extractParamValue__WEBPACK_IMPORTED_MODULE_1__["default"])(urlPaths[i]);
        } else if (routePaths[i] !== urlPaths[i]) {
            return false;
        }
    }
    return params;
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/serializeParam.js":
/*!**************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/serializeParam.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ serializeParam)
/* harmony export */ });
function serializeParam(value) {
    return value && value.toJSON !== undefined ? value.toJSON() : value;
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/serializeSearch.js":
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/serializeSearch.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ serializeSearch)
/* harmony export */ });
function serializeSearch(params) {
    const keys = Object.keys(params);
    return keys.map((key)=>{
        if (params[key] === false || !!params[key]) {
            return `${key}=${params[key]}`;
        } else {
            return "";
        }
    }).filter((segment)=>!!segment
    ).join("&");
};


/***/ }),

/***/ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/string.js":
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/shared/string.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "camelize": () => (/* binding */ camelize),
/* harmony export */   "kebabize": () => (/* binding */ kebabize)
/* harmony export */ });
function camelize(key) {
    return key.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr)=>chr.toUpperCase()
    );
}
function kebabize(key) {
    return key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}
;


/***/ }),

/***/ "./src/Application.jsx":
/*!*****************************!*\
  !*** ./src/Application.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tailwind_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tailwind.css */ "./src/tailwind.css");
/* harmony import */ var _input_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.css */ "./src/input.css");
/* harmony import */ var _pages_home_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/home/Home */ "./src/pages/home/Home.jsx");
/* harmony import */ var _pages_taps_Taps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/taps/Taps */ "./src/pages/taps/Taps.jsx");
/* harmony import */ var _pages_profile_Profile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/profile/Profile */ "./src/pages/profile/Profile.jsx");
/* harmony import */ var _pages_nft_Nft__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/nft/Nft */ "./src/pages/nft/Nft.jsx");
/* harmony import */ var _pages_admin_Admin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/admin/Admin */ "./src/pages/admin/Admin.jsx");
/* harmony import */ var _pages_wtf_Wtf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/wtf/Wtf */ "./src/pages/wtf/Wtf.jsx");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}








class Application extends Nullstack {
    prepare(context) {
        context.mode = "dark";
        context.oppositeMode = "light";
    }
    render({ router , mode  }) {
        return /*#__PURE__*/ Nullstack.element("main", {
            class: "w-full bg-black text-white ",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/Application.jsx",
                lineNumber: 20,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(_pages_home_Home__WEBPACK_IMPORTED_MODULE_2__["default"], {
            route: "/",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/Application.jsx",
                lineNumber: 21,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(_pages_home_Home__WEBPACK_IMPORTED_MODULE_2__["default"], {
            route: "/home",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/Application.jsx",
                lineNumber: 22,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(_pages_taps_Taps__WEBPACK_IMPORTED_MODULE_3__["default"], {
            route: "/taps",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/Application.jsx",
                lineNumber: 23,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(_pages_profile_Profile__WEBPACK_IMPORTED_MODULE_4__["default"], {
            route: "/taps",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/Application.jsx",
                lineNumber: 24,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(_pages_nft_Nft__WEBPACK_IMPORTED_MODULE_5__["default"], {
            route: "/nft",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/Application.jsx",
                lineNumber: 25,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(_pages_wtf_Wtf__WEBPACK_IMPORTED_MODULE_7__["default"], {
            route: "/wtf",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/Application.jsx",
                lineNumber: 26,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(_pages_admin_Admin__WEBPACK_IMPORTED_MODULE_6__["default"], {
            route: "/admin",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/Application.jsx",
                lineNumber: 27,
                columnNumber: 9
            },
            __self: this
        }));
    }
}
_defineProperty(Application, "hash", "f19980a0ba1e7d540e72c85bba3f57a7");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Application);


/***/ }),

/***/ "./src/common/account/Account.jsx":
/*!****************************************!*\
  !*** ./src/common/account/Account.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class Account extends Nullstack {
    getTap() {
        return 1.354;
    }
    getAddress() {
        return "0x5a773...6f57c0";
    }
    render() {
        return /*#__PURE__*/ Nullstack.element("div", {
            class: "flex justify-end",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 18,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element("div", {
            class: "flex items-center",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 19,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element("div", {
            class: "max-w-[14px] max-h-[17px]",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 20,
                columnNumber: 11
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element("img", {
            src: "tap.png",
            class: "object-cover",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 21,
                columnNumber: 13
            },
            __self: this
        })), /*#__PURE__*/ Nullstack.element("div", {
            class: "pl-2 text-sm flex flex-col items-center",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 23,
                columnNumber: 11
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element("span", {
            class: "font-bold",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 24,
                columnNumber: 13
            },
            __self: this
        }, this.getTap(), " ", /*#__PURE__*/ Nullstack.element("span", {
            class: "text-shadow-white font-medium",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 26,
                columnNumber: 15
            },
            __self: this
        }, "TAP")), /*#__PURE__*/ Nullstack.element("div", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 28,
                columnNumber: 13
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element("span", {
            class: "text-shadow-white",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 29,
                columnNumber: 15
            },
            __self: this
        }, this.getAddress())))), /*#__PURE__*/ Nullstack.element("div", {
            class: "flex items-center",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 33,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element("div", {
            class: "max-w-[14px] max-h-[17px]",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 34,
                columnNumber: 11
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element("img", {
            src: "account_circle.png",
            class: "object-cover",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 35,
                columnNumber: 13
            },
            __self: this
        })), /*#__PURE__*/ Nullstack.element("span", {
            class: " pl-2 font-bold",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/account/Account.jsx",
                lineNumber: 37,
                columnNumber: 11
            },
            __self: this
        }, " My account")));
    }
}
//   prepare({ page }: NullstackClientContext) {
//     page.locale = 'en-US';
//   }
_defineProperty(Account, "hash", "503e9a81586214705594059eb0525fba");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Account);


/***/ }),

/***/ "./src/common/header/Header.jsx":
/*!**************************************!*\
  !*** ./src/common/header/Header.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _logo_Logo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logo/Logo */ "./src/common/logo/Logo.jsx");
/* harmony import */ var _nav_Nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../nav/Nav */ "./src/common/nav/Nav.jsx");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}


class Header extends Nullstack {
    render() {
        return /*#__PURE__*/ Nullstack.element(Nullstack.fragment, null, /*#__PURE__*/ Nullstack.element("div", {
            class: "flex justify-between",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/header/Header.jsx",
                lineNumber: 14,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(_logo_Logo__WEBPACK_IMPORTED_MODULE_0__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/header/Header.jsx",
                lineNumber: 15,
                columnNumber: 11
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(_nav_Nav__WEBPACK_IMPORTED_MODULE_1__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/header/Header.jsx",
                lineNumber: 17,
                columnNumber: 11
            },
            __self: this
        })));
    }
}
//   prepare({ page }: NullstackClientContext) {
//     page.locale = 'en-US';
//   }
_defineProperty(Header, "hash", "b50322aeecd8a49e5a764347ca534db9");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);


/***/ }),

/***/ "./src/common/logo/Logo.jsx":
/*!**********************************!*\
  !*** ./src/common/logo/Logo.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class Logo extends Nullstack {
    render() {
        return /*#__PURE__*/ Nullstack.element(Nullstack.fragment, null, /*#__PURE__*/ Nullstack.element("div", {
            class: "flex flex-col items-center",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/logo/Logo.jsx",
                lineNumber: 12,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element("div", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/logo/Logo.jsx",
                lineNumber: 13,
                columnNumber: 11
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element("span", {
            class: "font-bold leading-[13px] text-[12px]",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/logo/Logo.jsx",
                lineNumber: 14,
                columnNumber: 13
            },
            __self: this
        }, "NFTS FOR")), /*#__PURE__*/ Nullstack.element("div", {
            class: "flex flex-col items-center",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/logo/Logo.jsx",
                lineNumber: 17,
                columnNumber: 11
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element("div", {
            class: "font-[22px] leading-[22px] tracking-[0.15em] font-[250]",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/logo/Logo.jsx",
                lineNumber: 18,
                columnNumber: 13
            },
            __self: this
        }, "STARVING", " "), /*#__PURE__*/ Nullstack.element("div", {
            class: "font-[22px] leading-[22px] tracking-[0.15em] font-[250]",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/logo/Logo.jsx",
                lineNumber: 21,
                columnNumber: 13
            },
            __self: this
        }, "CHILDREN"))));
    }
}
//   prepare({ page }: NullstackClientContext) {
//     page.locale = 'en-US';
//   }
_defineProperty(Logo, "hash", "8c44a1ddc87384fe295d6027f95000b7");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logo);


/***/ }),

/***/ "./src/common/nav/Nav.jsx":
/*!********************************!*\
  !*** ./src/common/nav/Nav.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class Nav extends Nullstack {
    renderLink({ title , href , target , mobile , onclick  }) {
        return /*#__PURE__*/ Nullstack.element("element", {
            tag: onclick ? "button" : "a",
            href: href,
            target: target,
            source: this,
            onclick: onclick || {
                expanded: false
            },
            class: `w-full sm:w-auto border-b sm:border-0 border-gray-100 dark:border-gray-800 p-2 font-lg hover:text-yellow-600 items-center flex font-light ${mobile ? "sm:hidden" : ""}`,
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/nav/Nav.jsx",
                lineNumber: 7,
                columnNumber: 7
            },
            __self: this
        }, title);
    }
    render({ router  }) {
        const Link = this.renderLink;
        const path = console.log(router.url);
        return /*#__PURE__*/ Nullstack.element("div", {
            class: "flex",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/nav/Nav.jsx",
                lineNumber: 25,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(Link, {
            href: "/home",
            title: "Home",
            class: path === "/home" ? "text-9xl" : "text-9xl",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/nav/Nav.jsx",
                lineNumber: 26,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(Link, {
            href: "/wtf",
            title: "WTF?",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/nav/Nav.jsx",
                lineNumber: 31,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(Link, {
            href: "/explore",
            title: "Explore",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/nav/Nav.jsx",
                lineNumber: 32,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(Link, {
            href: "/taps",
            title: "TAPs",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/common/nav/Nav.jsx",
                lineNumber: 33,
                columnNumber: 9
            },
            __self: this
        }));
    }
}
_defineProperty(Nav, "hash", "61036c81bb11669f2df0b463d5ef45ce");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Nav);


/***/ }),

/***/ "./src/cube/CubeMedian.jsx":
/*!*********************************!*\
  !*** ./src/cube/CubeMedian.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CubeMedium)
/* harmony export */ });
/* harmony import */ var nullstack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nullstack */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/nullstack.js");

function CubeMedium() {
    return /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "319",
        height: "414",
        viewBox: "0 0 319 414",
        fill: "none",
        __source: {
            fileName: "/Users/robertseares/NFT/packages/nft/src/cube/CubeMedian.jsx",
            lineNumber: 4,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("path", {
        d: "M4.17824 391.669H292.87L315.194 412.5H29.4509L4.17824 391.669ZM291.961 388.669H1.5V1.5H291.961V388.669ZM294.961 389.517V3.92189L317.5 29.0771V410.549L294.961 389.517Z",
        stroke: "white",
        "stroke-width": "3",
        style: " background: red; ",
        __source: {
            fileName: "/Users/robertseares/NFT/packages/nft/src/cube/CubeMedian.jsx",
            lineNumber: 11,
            columnNumber: 7
        },
        __self: this
    }));
};


/***/ }),

/***/ "./src/pages/admin/Admin.jsx":
/*!***********************************!*\
  !*** ./src/pages/admin/Admin.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_header_Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/header/Header */ "./src/common/header/Header.jsx");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

class Admin extends Nullstack {
    render() {
        const Account = this.renderAccount;
        return /*#__PURE__*/ Nullstack.element("div", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/admin/Admin.jsx",
                lineNumber: 9,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(Account, {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/admin/Admin.jsx",
                lineNumber: 10,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element("div", {
            class: "container mx-auto",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/admin/Admin.jsx",
                lineNumber: 11,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(_common_header_Header__WEBPACK_IMPORTED_MODULE_0__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/admin/Admin.jsx",
                lineNumber: 12,
                columnNumber: 11
            },
            __self: this
        })));
    }
}
_defineProperty(Admin, "hash", "2432734dfb404496da8856687b744d10");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Admin);


/***/ }),

/***/ "./src/pages/home/Home.jsx":
/*!*********************************!*\
  !*** ./src/pages/home/Home.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_account_Account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/account/Account */ "./src/common/account/Account.jsx");
/* harmony import */ var _common_header_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/header/Header */ "./src/common/header/Header.jsx");
/* harmony import */ var _HomeSplash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HomeSplash */ "./src/pages/home/HomeSplash.jsx");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}



class Home extends Nullstack {
    render() {
        return /*#__PURE__*/ Nullstack.element("div", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/Home.jsx",
                lineNumber: 10,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(_common_account_Account__WEBPACK_IMPORTED_MODULE_0__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/Home.jsx",
                lineNumber: 11,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element("div", {
            class: "container mx-auto",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/Home.jsx",
                lineNumber: 12,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(_common_header_Header__WEBPACK_IMPORTED_MODULE_1__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/Home.jsx",
                lineNumber: 13,
                columnNumber: 11
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element(_HomeSplash__WEBPACK_IMPORTED_MODULE_2__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/Home.jsx",
                lineNumber: 14,
                columnNumber: 11
            },
            __self: this
        })));
    }
}
_defineProperty(Home, "hash", "3e3abcd8e7ddd1472885b5cbdc6b065f");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);


/***/ }),

/***/ "./src/pages/home/HomeSplash.jsx":
/*!***************************************!*\
  !*** ./src/pages/home/HomeSplash.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nullstack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nullstack */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/nullstack.js");
/* harmony import */ var _cube_CubeMedian__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cube/CubeMedian */ "./src/cube/CubeMedian.jsx");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}


class HomeSplash extends nullstack__WEBPACK_IMPORTED_MODULE_0__["default"] {
    renderCTALeft() {
        return /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
            class: "flex flex-col",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 9,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
            class: "leading-[31px] text-[25px] ctaglow",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 10,
                columnNumber: 9
            },
            __self: this
        }, "Your kindness can make ", /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("br", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 11,
                columnNumber: 34
            },
            __self: this
        }), "the world of a difference ", /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("br", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 12,
                columnNumber: 37
            },
            __self: this
        }), "for a ", /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("mark", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 13,
                columnNumber: 17
            },
            __self: this
        }, " child's crypto wallet.")), /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 15,
                columnNumber: 9
            },
            __self: this
        }, "They may not have food, but you can help ", /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("br", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 16,
                columnNumber: 52
            },
            __self: this
        }), "an NFT-less child with this buy one, give one ", /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("br", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 17,
                columnNumber: 57
            },
            __self: this
        }), "opportunity. Every child deserves an NFT"));
    }
    renderCTARight() {
        return /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
            class: "flex flex-col",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 25,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element(_cube_CubeMedian__WEBPACK_IMPORTED_MODULE_1__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 26,
                columnNumber: 9
            },
            __self: this
        }));
    }
    render() {
        const CTALeft = this.renderCTALeft;
        return /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
            class: "flex flex-row justify-evenly",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 33,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
            class: "basis-1/2 md:basis-1/2",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 34,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element(CTALeft, {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 35,
                columnNumber: 11
            },
            __self: this
        })), /*#__PURE__*/ nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].element("div", {
            class: "basis-1/2 md:basis-1/2",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/home/HomeSplash.jsx",
                lineNumber: 37,
                columnNumber: 9
            },
            __self: this
        }, "02"));
    }
}
_defineProperty(HomeSplash, "hash", "35bf983b2603939201f2bb36d2fc11ac");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HomeSplash);


/***/ }),

/***/ "./src/pages/nft/Nft.jsx":
/*!*******************************!*\
  !*** ./src/pages/nft/Nft.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_header_Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/header/Header */ "./src/common/header/Header.jsx");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

class Nft extends Nullstack {
    render() {
        const Account = this.renderAccount;
        return /*#__PURE__*/ Nullstack.element("div", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/nft/Nft.jsx",
                lineNumber: 8,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(Account, {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/nft/Nft.jsx",
                lineNumber: 9,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element("div", {
            class: "container mx-auto",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/nft/Nft.jsx",
                lineNumber: 10,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(_common_header_Header__WEBPACK_IMPORTED_MODULE_0__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/nft/Nft.jsx",
                lineNumber: 11,
                columnNumber: 11
            },
            __self: this
        })));
    }
}
_defineProperty(Nft, "hash", "2031b998942cdf1bc305fbbf7782dbd4");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Nft);


/***/ }),

/***/ "./src/pages/profile/Profile.jsx":
/*!***************************************!*\
  !*** ./src/pages/profile/Profile.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_header_Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/header/Header */ "./src/common/header/Header.jsx");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

class Profile extends Nullstack {
    render() {
        const Account = this.renderAccount;
        return /*#__PURE__*/ Nullstack.element("div", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/profile/Profile.jsx",
                lineNumber: 8,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(Account, {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/profile/Profile.jsx",
                lineNumber: 9,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element("div", {
            class: "container mx-auto",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/profile/Profile.jsx",
                lineNumber: 10,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(_common_header_Header__WEBPACK_IMPORTED_MODULE_0__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/profile/Profile.jsx",
                lineNumber: 11,
                columnNumber: 11
            },
            __self: this
        })));
    }
}
_defineProperty(Profile, "hash", "235fb2a44da6265e913a9b8c8cf053c8");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Profile);


/***/ }),

/***/ "./src/pages/taps/Taps.jsx":
/*!*********************************!*\
  !*** ./src/pages/taps/Taps.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_header_Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/header/Header */ "./src/common/header/Header.jsx");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

class Taps extends Nullstack {
    render() {
        const Account = this.renderAccount;
        return /*#__PURE__*/ Nullstack.element("div", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/taps/Taps.jsx",
                lineNumber: 8,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(Account, {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/taps/Taps.jsx",
                lineNumber: 9,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element("div", {
            class: "container mx-auto",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/taps/Taps.jsx",
                lineNumber: 10,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(_common_header_Header__WEBPACK_IMPORTED_MODULE_0__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/taps/Taps.jsx",
                lineNumber: 11,
                columnNumber: 11
            },
            __self: this
        })));
    }
}
_defineProperty(Taps, "hash", "d7868cc6c4dbc624ffb64aca692b5a10");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Taps);


/***/ }),

/***/ "./src/pages/wtf/Wtf.jsx":
/*!*******************************!*\
  !*** ./src/pages/wtf/Wtf.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_account_Account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/account/Account */ "./src/common/account/Account.jsx");
/* harmony import */ var _common_header_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/header/Header */ "./src/common/header/Header.jsx");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}


class Wtf extends Nullstack {
    render() {
        return /*#__PURE__*/ Nullstack.element("div", {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/wtf/Wtf.jsx",
                lineNumber: 8,
                columnNumber: 7
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(_common_account_Account__WEBPACK_IMPORTED_MODULE_0__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/wtf/Wtf.jsx",
                lineNumber: 9,
                columnNumber: 9
            },
            __self: this
        }), /*#__PURE__*/ Nullstack.element("div", {
            class: "container mx-auto",
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/wtf/Wtf.jsx",
                lineNumber: 10,
                columnNumber: 9
            },
            __self: this
        }, /*#__PURE__*/ Nullstack.element(_common_header_Header__WEBPACK_IMPORTED_MODULE_1__["default"], {
            __source: {
                fileName: "/Users/robertseares/NFT/packages/nft/src/pages/wtf/Wtf.jsx",
                lineNumber: 11,
                columnNumber: 11
            },
            __self: this
        })));
    }
}
_defineProperty(Wtf, "hash", "cd1966edd334d42083304150b9775c70");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wtf);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nullstack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nullstack */ "../../common/temp/node_modules/.pnpm/nullstack@0.15.10/node_modules/nullstack/nullstack.js");
/* harmony import */ var _src_Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Application */ "./src/Application.jsx");


const context = nullstack__WEBPACK_IMPORTED_MODULE_0__["default"].start(_src_Application__WEBPACK_IMPORTED_MODULE_1__["default"]);
context.start = async function start() {
// https://nullstack.app/application-startup
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (context);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BGQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBa0JBO0FBQ0E7QUFDQTtBQVhBO0FBUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQTdEQTtBQUNBO0FBQ0E7QUFDQTtBQUxBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUEyQ0E7QUExQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekRBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDckNBO0FBRUE7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSkE7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUF6RUE7QUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBdUVBO0FBRUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFFQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDdEVBO0FBQ0E7QUFPQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQU1BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REE7QUFFQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMzSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FBQ0E7QUFBQTs7Ozs7OztBQUFBO0FBQ0E7Ozs7Ozs7QUFBQTtBQUNBOzs7Ozs7O0FBQUE7QUFDQTs7Ozs7OztBQUFBO0FBQ0E7Ozs7Ozs7QUFBQTtBQUNBOzs7Ozs7O0FBQUE7QUFDQTs7Ozs7OztBQUFBO0FBR0E7QUFDQTtBQXBCQTtBQXNCQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0JBOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUFBOzs7Ozs7O0FBQ0E7QUFBQTs7Ozs7OztBQUNBO0FBQUE7QUFBQTs7Ozs7OztBQUFBO0FBRUE7Ozs7Ozs7QUFDQTtBQUFBOzs7Ozs7O0FBQ0E7QUFDQTs7Ozs7OztBQUFBOzs7Ozs7O0FBR0E7QUFBQTs7Ozs7OztBQUFBO0FBSUE7Ozs7Ozs7QUFDQTtBQUFBOzs7Ozs7O0FBQ0E7QUFBQTtBQUFBOzs7Ozs7O0FBQUE7QUFFQTs7Ozs7OztBQUFBO0FBSUE7QUFDQTtBQXZDQTtBQUNBO0FBQ0E7QUFDQTtBQXNDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFPQTtBQUNBO0FBRUE7Ozs7Ozs7QUFDQTs7Ozs7OztBQUFBOzs7Ozs7O0FBRUE7QUFJQTtBQUNBO0FBakJBO0FBQ0E7QUFDQTtBQUVBO0FBZUE7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQTs7Ozs7Ozs7Ozs7OztBQUFBO0FBT0E7QUFDQTtBQUVBOzs7Ozs7O0FBQ0E7Ozs7Ozs7QUFDQTtBQUFBOzs7Ozs7O0FBQUE7QUFHQTs7Ozs7OztBQUNBO0FBQUE7Ozs7Ozs7QUFBQTtBQUdBOzs7Ozs7O0FBQUE7QUFPQTtBQUNBO0FBMUJBO0FBQ0E7QUFDQTtBQUVBO0FBd0JBOzs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7O0FBSUE7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFBQTs7Ozs7OztBQUFBO0FBQ0E7QUFBQTs7Ozs7OztBQUFBO0FBQ0E7QUFBQTs7Ozs7OztBQUFBO0FBR0E7QUFDQTtBQWxDQTtBQW9DQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUNBO0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBR0E7QUFDQTtBQUNBOzs7Ozs7O0FBRUE7Ozs7Ozs7QUFBQTtBQUNBOzs7Ozs7O0FBQ0E7Ozs7Ozs7QUFBQTtBQUlBO0FBQ0E7QUFiQTtBQWVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTs7Ozs7OztBQUVBOzs7Ozs7O0FBQUE7QUFDQTs7Ozs7OztBQUNBOzs7Ozs7O0FBQUE7Ozs7Ozs7QUFDQTtBQUlBO0FBQ0E7QUFiQTtBQWVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTs7Ozs7OztBQUNBO0FBQUE7Ozs7Ozs7QUFBQTs7Ozs7OztBQUNBOzs7Ozs7O0FBQ0E7Ozs7Ozs7QUFDQTs7Ozs7OztBQUVBOzs7Ozs7O0FBQ0E7Ozs7Ozs7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBQ0E7Ozs7Ozs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUFBOzs7Ozs7O0FBQ0E7Ozs7Ozs7QUFBQTtBQUVBOzs7Ozs7O0FBQUE7QUFHQTtBQUNBO0FBcENBO0FBc0NBOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUNBOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTs7Ozs7OztBQUVBOzs7Ozs7O0FBQUE7QUFDQTs7Ozs7OztBQUNBOzs7Ozs7O0FBQUE7QUFJQTtBQUNBO0FBYkE7QUFlQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFFQTs7Ozs7OztBQUFBO0FBQ0E7Ozs7Ozs7QUFDQTs7Ozs7OztBQUFBO0FBSUE7QUFDQTtBQWJBO0FBZUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQkE7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBOzs7Ozs7O0FBRUE7Ozs7Ozs7QUFBQTtBQUNBOzs7Ozs7O0FBQ0E7Ozs7Ozs7QUFBQTtBQUlBO0FBQ0E7QUFiQTtBQWVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7Ozs7Ozs7QUFFQTs7Ozs7OztBQUFBO0FBQ0E7Ozs7Ozs7QUFDQTs7Ozs7OztBQUFBO0FBSUE7QUFDQTtBQVpBO0FBY0E7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL25mdC8uL3NyYy9pbnB1dC5jc3MiLCJ3ZWJwYWNrOi8vbmZ0Ly4vc3JjL3RhaWx3aW5kLmNzcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svbnVsbHN0YWNrLmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9jbGllbnQvYW5jaG9yYWJsZU5vZGUuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2NsaWVudC9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2NsaWVudC9jb250ZXh0LmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9jbGllbnQvZW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2NsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svY2xpZW50L2luc3RhbmNlUHJveHlIYW5kbGVyLmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9jbGllbnQvaW52b2tlLmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9jbGllbnQvbGl2ZVJlbG9hZC5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svY2xpZW50L29iamVjdFByb3h5SGFuZGxlci5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svY2xpZW50L3BhZ2UuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2NsaWVudC9wYXJhbXMuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2NsaWVudC9wcm9qZWN0LmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9jbGllbnQvcmVuZGVyLmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9jbGllbnQvcmVyZW5kZXIuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2NsaWVudC9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2NsaWVudC9zZWdtZW50cy5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svY2xpZW50L3NldHRpbmdzLmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9jbGllbnQvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL2NsaWVudC93aW5kb3dFdmVudC5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svY2xpZW50L3dvcmtlci5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svcGx1Z2lucy9hbmNob3JhYmxlLmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9wbHVnaW5zL2JpbmRhYmxlLmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9wbHVnaW5zL2RhdGFibGUuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3BsdWdpbnMvb2JqZWN0YWJsZS5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svcGx1Z2lucy9wYXJhbWV0ZXJpemFibGUuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3BsdWdpbnMvcm91dGFibGUuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3NoYXJlZC9kZXNlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svc2hhcmVkL2VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3NoYXJlZC9leHRyYWN0TG9jYXRpb24uanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3NoYXJlZC9leHRyYWN0UGFyYW1WYWx1ZS5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svc2hhcmVkL2ZyYWdtZW50LmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9zaGFyZWQvZ2VuZXJhdGVLZXkuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3NoYXJlZC9nZW5lcmF0ZVRyZWUuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3NoYXJlZC9nZXRQcm94eWFibGVNZXRob2RzLmpzIiwid2VicGFjazovL25mdC8uLi8uLi9jb21tb24vdGVtcC9ub2RlX21vZHVsZXMvLnBucG0vbnVsbHN0YWNrQDAuMTUuMTAvbm9kZV9tb2R1bGVzL251bGxzdGFjay9zaGFyZWQvZ2V0UXVlcnlTdHJpbmdQYXJhbXMuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3NoYXJlZC9ub2Rlcy5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svc2hhcmVkL3BsdWdpbnMuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3NoYXJlZC9wcmVmaXguanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3NoYXJlZC9yb3V0ZU1hdGNoZXMuanMiLCJ3ZWJwYWNrOi8vbmZ0Ly4uLy4uL2NvbW1vbi90ZW1wL25vZGVfbW9kdWxlcy8ucG5wbS9udWxsc3RhY2tAMC4xNS4xMC9ub2RlX21vZHVsZXMvbnVsbHN0YWNrL3NoYXJlZC9zZXJpYWxpemVQYXJhbS5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svc2hhcmVkL3NlcmlhbGl6ZVNlYXJjaC5qcyIsIndlYnBhY2s6Ly9uZnQvLi4vLi4vY29tbW9uL3RlbXAvbm9kZV9tb2R1bGVzLy5wbnBtL251bGxzdGFja0AwLjE1LjEwL25vZGVfbW9kdWxlcy9udWxsc3RhY2svc2hhcmVkL3N0cmluZy5qcyIsIndlYnBhY2s6Ly9uZnQvLi9zcmMvQXBwbGljYXRpb24uanN4Iiwid2VicGFjazovL25mdC8uL3NyYy9jb21tb24vYWNjb3VudC9BY2NvdW50LmpzeCIsIndlYnBhY2s6Ly9uZnQvLi9zcmMvY29tbW9uL2hlYWRlci9IZWFkZXIuanN4Iiwid2VicGFjazovL25mdC8uL3NyYy9jb21tb24vbG9nby9Mb2dvLmpzeCIsIndlYnBhY2s6Ly9uZnQvLi9zcmMvY29tbW9uL25hdi9OYXYuanN4Iiwid2VicGFjazovL25mdC8uL3NyYy9jdWJlL0N1YmVNZWRpYW4uanN4Iiwid2VicGFjazovL25mdC8uL3NyYy9wYWdlcy9hZG1pbi9BZG1pbi5qc3giLCJ3ZWJwYWNrOi8vbmZ0Ly4vc3JjL3BhZ2VzL2hvbWUvSG9tZS5qc3giLCJ3ZWJwYWNrOi8vbmZ0Ly4vc3JjL3BhZ2VzL2hvbWUvSG9tZVNwbGFzaC5qc3giLCJ3ZWJwYWNrOi8vbmZ0Ly4vc3JjL3BhZ2VzL25mdC9OZnQuanN4Iiwid2VicGFjazovL25mdC8uL3NyYy9wYWdlcy9wcm9maWxlL1Byb2ZpbGUuanN4Iiwid2VicGFjazovL25mdC8uL3NyYy9wYWdlcy90YXBzL1RhcHMuanN4Iiwid2VicGFjazovL25mdC8uL3NyYy9wYWdlcy93dGYvV3RmLmpzeCIsIndlYnBhY2s6Ly9uZnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmZ0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZnQvLi9jbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IE51bGxzdGFjayBmcm9tIFwiLi97e05VTExTVEFDS19FTlZJUk9OTUVOVF9OQU1FfX1cIjtcblxuZXhwb3J0IGRlZmF1bHQgTnVsbHN0YWNrOyIsImltcG9ydCByb3V0ZXIgZnJvbSAnLi9yb3V0ZXInXG5cbmV4cG9ydCBmdW5jdGlvbiBhbmNob3JhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIGNvbnN0IGxpbmtzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZePVwiL1wiXTpub3QoW3RhcmdldF0pJylcbiAgZm9yIChjb25zdCBsaW5rIG9mIGxpbmtzKSB7XG4gICAgaWYgKGxpbmsuZGF0YXNldC5udWxsc3RhY2spIHJldHVyblxuICAgIGxpbmsuZGF0YXNldC5udWxsc3RhY2sgPSB0cnVlXG4gICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgaWYgKCFldmVudC5jdHJsS2V5ICYmICFldmVudC5zaGlmdEtleSAmJiAhZXZlbnQuYWx0S2V5ICYmICFldmVudC5tZXRhS2V5KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgcm91dGVyLnVybCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgZ2VuZXJhdGVUcmVlIGZyb20gJy4uL3NoYXJlZC9nZW5lcmF0ZVRyZWUnXG5pbXBvcnQgeyBsb2FkUGx1Z2lucyB9IGZyb20gJy4uL3NoYXJlZC9wbHVnaW5zJ1xuaW1wb3J0IGNvbnRleHQsIHsgZ2VuZXJhdGVDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0J1xuaW1wb3J0IHJlcmVuZGVyIGZyb20gJy4vcmVyZW5kZXInXG5pbXBvcnQgcm91dGVyIGZyb20gJy4vcm91dGVyJ1xuXG5jb25zdCBjbGllbnQgPSB7fVxuXG5jbGllbnQuaW5pdGlhbGl6ZWQgPSBmYWxzZVxuY2xpZW50Lmh5ZHJhdGVkID0gZmFsc2VcbmNsaWVudC5pbml0aWFsaXplciA9IG51bGxcbmNsaWVudC5pbnN0YW5jZXMgPSB7fVxuY29udGV4dC5pbnN0YW5jZXMgPSBjbGllbnQuaW5zdGFuY2VzXG5jbGllbnQuaW5pdGlhdGlvblF1ZXVlID0gW11cbmNsaWVudC5yZW5ld2FsUXVldWUgPSBbXVxuY2xpZW50Lmh5ZHJhdGlvblF1ZXVlID0gW11cbmNsaWVudC5yZWFsSHlkcmF0aW9uUXVldWUgPSBbXVxuY2xpZW50LnZpcnR1YWxEb20gPSB7fVxuY2xpZW50LnNlbGVjdG9yID0gbnVsbFxuY2xpZW50LmV2ZW50cyA9IHt9XG5jbGllbnQuZ2VuZXJhdGVDb250ZXh0ID0gZ2VuZXJhdGVDb250ZXh0XG5jbGllbnQucmVuZGVyUXVldWUgPSBudWxsXG5cbmNsaWVudC51cGRhdGUgPSBhc3luYyBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gIGlmIChjbGllbnQuaW5pdGlhbGl6ZWQpIHtcbiAgICBjbGVhckludGVydmFsKGNsaWVudC5yZW5kZXJRdWV1ZSlcbiAgICBjbGllbnQucmVuZGVyUXVldWUgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHNjb3BlID0gY2xpZW50XG4gICAgICBzY29wZS5jb250ZXh0ID0gY29udGV4dFxuICAgICAgc2NvcGUucGx1Z2lucyA9IGxvYWRQbHVnaW5zKHNjb3BlKVxuICAgICAgY2xpZW50LmluaXRpYWxpemVkID0gZmFsc2VcbiAgICAgIGNsaWVudC5yZW5ld2FsUXVldWUgPSBbXVxuICAgICAgY2xpZW50Lm5leHRWaXJ0dWFsRG9tID0gYXdhaXQgZ2VuZXJhdGVUcmVlKGNsaWVudC5pbml0aWFsaXplcigpLCBzY29wZSlcbiAgICAgIHJlcmVuZGVyKGNsaWVudC5zZWxlY3RvcilcbiAgICAgIGNsaWVudC52aXJ0dWFsRG9tID0gY2xpZW50Lm5leHRWaXJ0dWFsRG9tXG4gICAgICBjbGllbnQubmV4dFZpcnR1YWxEb20gPSBudWxsXG4gICAgICBjbGllbnQucHJvY2Vzc0xpZmVjeWNsZVF1ZXVlcygpXG4gICAgfSwgMTYpXG4gIH1cbn1cblxuY2xpZW50LnByb2Nlc3NMaWZlY3ljbGVRdWV1ZXMgPSBhc3luYyBmdW5jdGlvbiBwcm9jZXNzTGlmZWN5Y2xlUXVldWVzKCkge1xuICBpZiAoIWNsaWVudC5pbml0aWFsaXplZCkge1xuICAgIGNsaWVudC5pbml0aWFsaXplZCA9IHRydWVcbiAgICBjbGllbnQuaHlkcmF0ZWQgPSB0cnVlXG4gIH1cbiAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlXG4gIHdoaWxlIChjbGllbnQuaW5pdGlhdGlvblF1ZXVlLmxlbmd0aCkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gY2xpZW50LmluaXRpYXRpb25RdWV1ZS5zaGlmdCgpXG4gICAgaW5zdGFuY2UuaW5pdGlhdGUgJiYgYXdhaXQgaW5zdGFuY2UuaW5pdGlhdGUoKVxuICAgIGluc3RhbmNlLl9zZWxmLmluaXRpYXRlZCA9IHRydWVcbiAgICBpbnN0YW5jZS5sYXVuY2ggJiYgaW5zdGFuY2UubGF1bmNoKClcbiAgICBzaG91bGRVcGRhdGUgPSB0cnVlXG4gIH1cbiAgc2hvdWxkVXBkYXRlICYmIGNsaWVudC51cGRhdGUoKVxuICBzaG91bGRVcGRhdGUgPSBmYWxzZVxuICB3aGlsZSAoY2xpZW50LnJlYWxIeWRyYXRpb25RdWV1ZS5sZW5ndGgpIHtcbiAgICBzaG91bGRVcGRhdGUgPSB0cnVlXG4gICAgY29uc3QgaW5zdGFuY2UgPSBjbGllbnQucmVhbEh5ZHJhdGlvblF1ZXVlLnNoaWZ0KClcbiAgICBpbnN0YW5jZS5oeWRyYXRlICYmIGF3YWl0IGluc3RhbmNlLmh5ZHJhdGUoKVxuICAgIGluc3RhbmNlLl9zZWxmLmh5ZHJhdGVkID0gdHJ1ZVxuICB9XG4gIHNob3VsZFVwZGF0ZSAmJiBjbGllbnQudXBkYXRlKClcbiAgc2hvdWxkVXBkYXRlID0gZmFsc2VcbiAgd2hpbGUgKGNsaWVudC5oeWRyYXRpb25RdWV1ZS5sZW5ndGgpIHtcbiAgICBzaG91bGRVcGRhdGUgPSB0cnVlXG4gICAgY29uc3QgaW5zdGFuY2UgPSBjbGllbnQuaHlkcmF0aW9uUXVldWUuc2hpZnQoKVxuICAgIGNsaWVudC5yZWFsSHlkcmF0aW9uUXVldWUucHVzaChpbnN0YW5jZSlcbiAgfVxuICBzaG91bGRVcGRhdGUgJiYgY2xpZW50LnVwZGF0ZSgpXG4gIGZvciAoY29uc3Qga2V5IGluIGNsaWVudC5pbnN0YW5jZXMpIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGNsaWVudC5pbnN0YW5jZXNba2V5XVxuICAgIGlmICghY2xpZW50LnJlbmV3YWxRdWV1ZS5pbmNsdWRlcyhpbnN0YW5jZSkgJiYgIWluc3RhbmNlLl9zZWxmLnRlcm1pbmF0ZWQpIHtcbiAgICAgIGluc3RhbmNlLnRlcm1pbmF0ZSAmJiBhd2FpdCBpbnN0YW5jZS50ZXJtaW5hdGUoKVxuICAgICAgaWYgKGluc3RhbmNlLl9zZWxmLnBlcnNpc3RlbnQpIHtcbiAgICAgICAgaW5zdGFuY2UuX3NlbGYudGVybWluYXRlZCA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBjbGllbnQuaW5zdGFuY2VzW2tleV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcm91dGVyLl9jaGFuZ2VkID0gZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xpZW50IiwiaW1wb3J0IGNsaWVudCBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgeyBnZW5lcmF0ZU9iamVjdFByb3h5IH0gZnJvbSAnLi9vYmplY3RQcm94eUhhbmRsZXInO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vc3RhdGUnO1xuXG5jb25zdCBjb250ZXh0ID0ge307XG5cbmZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHN0YXRlLmNvbnRleHQpKSB7XG4gIGNvbnRleHRba2V5XSA9IGdlbmVyYXRlT2JqZWN0UHJveHkoa2V5LCBzdGF0ZS5jb250ZXh0W2tleV0pO1xufVxuXG5jb25zdCBjb250ZXh0UHJveHlIYW5kbGVyID0ge1xuICBzZXQodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xuICAgIGNvbnRleHRbbmFtZV0gPSBnZW5lcmF0ZU9iamVjdFByb3h5KG5hbWUsIHZhbHVlKTtcbiAgICBjbGllbnQudXBkYXRlKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGdldCh0YXJnZXQsIG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PT0gJ19pc1Byb3h5JykgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIHRhcmdldFtuYW1lXSA9PT0gdW5kZWZpbmVkID8gY29udGV4dFtuYW1lXSA6IHRhcmdldFtuYW1lXTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDb250ZXh0KHRlbXBvcmFyeSkge1xuICByZXR1cm4gbmV3IFByb3h5KHRlbXBvcmFyeSwgY29udGV4dFByb3h5SGFuZGxlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRleHQ7IiwiaW1wb3J0IHN0YXRlIGZyb20gJy4vc3RhdGUnO1xuY29uc3QgZW52aXJvbm1lbnQgPSB7IC4uLnN0YXRlLmVudmlyb25tZW50LCBjbGllbnQ6IHRydWUsIHNlcnZlcjogZmFsc2UgfTtcblxuT2JqZWN0LmZyZWV6ZShlbnZpcm9ubWVudCk7XG5cbmV4cG9ydCBkZWZhdWx0IGVudmlyb25tZW50OyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3N0YXRlJ1xuaW1wb3J0IGVsZW1lbnQgZnJvbSAnLi4vc2hhcmVkL2VsZW1lbnQnO1xuaW1wb3J0IGZyYWdtZW50IGZyb20gJy4uL3NoYXJlZC9mcmFnbWVudCc7XG5pbXBvcnQgZ2VuZXJhdGVUcmVlIGZyb20gJy4uL3NoYXJlZC9nZW5lcmF0ZVRyZWUnO1xuaW1wb3J0IGdldFByb3h5YWJsZU1ldGhvZHMgZnJvbSAnLi4vc2hhcmVkL2dldFByb3h5YWJsZU1ldGhvZHMnO1xuaW1wb3J0IHsgbG9hZFBsdWdpbnMsIHVzZVBsdWdpbnMgfSBmcm9tICcuLi9zaGFyZWQvcGx1Z2lucyc7XG5pbXBvcnQgY2xpZW50IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCBjb250ZXh0LCB7IGdlbmVyYXRlQ29udGV4dCB9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5pbXBvcnQgaW5zdGFuY2VQcm94eUhhbmRsZXIgZnJvbSAnLi9pbnN0YW5jZVByb3h5SGFuZGxlcic7XG5pbXBvcnQgaW52b2tlIGZyb20gJy4vaW52b2tlJztcbmltcG9ydCAnLi9saXZlUmVsb2FkJztcbmltcG9ydCBwYWdlIGZyb20gJy4vcGFnZSc7XG5pbXBvcnQgcGFyYW1zLCB7IHVwZGF0ZVBhcmFtcyB9IGZyb20gJy4vcGFyYW1zJztcbmltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdCc7XG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCByZXJlbmRlciBmcm9tICcuL3JlcmVuZGVyJztcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IHdvcmtlciBmcm9tICcuL3dvcmtlcic7XG5cbmNvbnRleHQucGFnZSA9IHBhZ2U7XG5jb250ZXh0LnJvdXRlciA9IHJvdXRlcjtcbmNvbnRleHQuc2V0dGluZ3MgPSBzZXR0aW5ncztcbmNvbnRleHQud29ya2VyID0gd29ya2VyO1xuY29udGV4dC5wYXJhbXMgPSBwYXJhbXM7XG5jb250ZXh0LnByb2plY3QgPSBwcm9qZWN0O1xuY29udGV4dC5lbnZpcm9ubWVudCA9IHN0YXRlLmVudmlyb25tZW50O1xuXG5jbGllbnQubWVtb3J5ID0gc3RhdGUuaW5zdGFuY2VzO1xuXG5jb25zdCBzY29wZSA9IGNsaWVudDtcbnNjb3BlLmdlbmVyYXRlQ29udGV4dCA9IGdlbmVyYXRlQ29udGV4dDtcbnNjb3BlLmNvbnRleHQgPSBjb250ZXh0O1xuXG5jbGllbnQucGx1Z2lucyA9IGxvYWRQbHVnaW5zKHNjb3BlKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVsbHN0YWNrIHtcblxuICBzdGF0aWMgZWxlbWVudCA9IGVsZW1lbnQ7XG4gIHN0YXRpYyBpbnZva2UgPSBpbnZva2U7XG4gIHN0YXRpYyBmcmFnbWVudCA9IGZyYWdtZW50O1xuICBzdGF0aWMgdXNlID0gdXNlUGx1Z2lucygnY2xpZW50Jyk7XG5cbiAgc3RhdGljIHN0YXJ0KFN0YXJ0ZXIpIHtcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsICgpID0+IHtcbiAgICAgICAgcm91dGVyLl9wb3BTdGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICBjbGllbnQucm91dGVzID0ge307XG4gICAgICB1cGRhdGVQYXJhbXMocm91dGVyLnVybCk7XG4gICAgICBjbGllbnQuY3VycmVudEluc3RhbmNlID0gbnVsbDtcbiAgICAgIGNsaWVudC5pbml0aWFsaXplciA9ICgpID0+IGVsZW1lbnQoU3RhcnRlcik7XG4gICAgICBjbGllbnQuc2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwbGljYXRpb24nKTtcbiAgICAgIGlmIChlbnZpcm9ubWVudC5tb2RlID09PSAnc3BhJykge1xuICAgICAgICBzY29wZS5wbHVnaW5zID0gbG9hZFBsdWdpbnMoc2NvcGUpO1xuICAgICAgICB3b3JrZXIub25saW5lID0gbmF2aWdhdG9yLm9uTGluZTtcbiAgICAgICAgdHlwZW9mIGNvbnRleHQuc3RhcnQgPT09ICdmdW5jdGlvbicgJiYgYXdhaXQgY29udGV4dC5zdGFydChjb250ZXh0KTtcbiAgICAgICAgY29udGV4dC5lbnZpcm9ubWVudCA9IGVudmlyb25tZW50O1xuICAgICAgICBjbGllbnQudmlydHVhbERvbSA9IGF3YWl0IGdlbmVyYXRlVHJlZShjbGllbnQuaW5pdGlhbGl6ZXIoKSwgc2NvcGUpO1xuICAgICAgICBjb25zdCBib2R5ID0gcmVuZGVyKGNsaWVudC52aXJ0dWFsRG9tKTtcbiAgICAgICAgY2xpZW50LnNlbGVjdG9yLnJlcGxhY2VXaXRoKGJvZHkpO1xuICAgICAgICBjbGllbnQuc2VsZWN0b3IgPSBib2R5XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGllbnQudmlydHVhbERvbSA9IGF3YWl0IGdlbmVyYXRlVHJlZShjbGllbnQuaW5pdGlhbGl6ZXIoKSwgc2NvcGUpO1xuICAgICAgICBjb250ZXh0LmVudmlyb25tZW50ID0gZW52aXJvbm1lbnQ7XG4gICAgICAgIHNjb3BlLnBsdWdpbnMgPSBsb2FkUGx1Z2lucyhzY29wZSk7XG4gICAgICAgIHdvcmtlci5vbmxpbmUgPSBuYXZpZ2F0b3Iub25MaW5lO1xuICAgICAgICB0eXBlb2YgY29udGV4dC5zdGFydCA9PT0gJ2Z1bmN0aW9uJyAmJiBhd2FpdCBjb250ZXh0LnN0YXJ0KGNvbnRleHQpO1xuICAgICAgICBjbGllbnQubmV4dFZpcnR1YWxEb20gPSBhd2FpdCBnZW5lcmF0ZVRyZWUoY2xpZW50LmluaXRpYWxpemVyKCksIHNjb3BlKTtcbiAgICAgICAgcmVyZW5kZXIoY2xpZW50LnNlbGVjdG9yKTtcbiAgICAgICAgY2xpZW50LnZpcnR1YWxEb20gPSBjbGllbnQubmV4dFZpcnR1YWxEb207XG4gICAgICAgIGNsaWVudC5uZXh0VmlydHVhbERvbSA9IG51bGw7XG4gICAgICB9XG4gICAgICBjbGllbnQucHJvY2Vzc0xpZmVjeWNsZVF1ZXVlcygpO1xuICAgICAgZGVsZXRlIHN0YXRlLmNvbnRleHQ7XG4gICAgfSwgMClcbiAgICByZXR1cm4gZ2VuZXJhdGVDb250ZXh0KHt9KTtcbiAgfVxuXG4gIF9zZWxmID0ge1xuICAgIHByZXJlbmRlcmVkOiBmYWxzZSxcbiAgICBpbml0aWF0ZWQ6IGZhbHNlLFxuICAgIGh5ZHJhdGVkOiBmYWxzZSxcbiAgICB0ZXJtaW5hdGVkOiBmYWxzZSxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IG1ldGhvZHMgPSBnZXRQcm94eWFibGVNZXRob2RzKHRoaXMpO1xuICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KHRoaXMsIGluc3RhbmNlUHJveHlIYW5kbGVyKTtcbiAgICBmb3IgKGNvbnN0IG1ldGhvZCBvZiBtZXRob2RzKSB7XG4gICAgICB0aGlzW21ldGhvZF0gPSB0aGlzW21ldGhvZF0uYmluZChwcm94eSk7XG4gICAgfVxuICAgIHJldHVybiBwcm94eTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxufSIsImltcG9ydCBjbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IHsgZ2VuZXJhdGVDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7IGdlbmVyYXRlT2JqZWN0UHJveHkgfSBmcm9tICcuL29iamVjdFByb3h5SGFuZGxlcic7XG5cbmNvbnN0IGluc3RhbmNlUHJveHlIYW5kbGVyID0ge1xuICBnZXQodGFyZ2V0LCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgPT09ICdfaXNQcm94eScpIHJldHVybiB0cnVlO1xuICAgIGlmICh0YXJnZXQuY29uc3RydWN0b3JbbmFtZV0/Lm5hbWUgPT09ICdfaW52b2tlJykgcmV0dXJuIHRhcmdldC5jb25zdHJ1Y3RvcltuYW1lXS5iaW5kKHRhcmdldC5jb25zdHJ1Y3RvcilcbiAgICBpZiAoIXRhcmdldFtuYW1lXT8ubmFtZT8uc3RhcnRzV2l0aCgnXycpICYmICFuYW1lLnN0YXJ0c1dpdGgoJ18nKSAmJiB0eXBlb2YgKHRhcmdldFtuYW1lXSkgPT0gJ2Z1bmN0aW9uJyAmJiBuYW1lICE9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICBjb25zdCB7IFtuYW1lXTogbmFtZWQgfSA9IHtcbiAgICAgICAgW25hbWVdOiAoYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBnZW5lcmF0ZUNvbnRleHQoeyAuLi50YXJnZXQuX2F0dHJpYnV0ZXMsIC4uLmFyZ3MsIHNlbGY6IHRhcmdldC5fc2VsZiB9KTtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0W25hbWVdKGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmFtZWQ7XG4gICAgfVxuICAgIHJldHVybiBSZWZsZWN0LmdldCguLi5hcmd1bWVudHMpO1xuICB9LFxuICBzZXQodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xuICAgIGlmICghdmFsdWU/Lm5hbWU/LnN0YXJ0c1dpdGgoJ18nKSAmJiAhbmFtZS5zdGFydHNXaXRoKCdfJykpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IGdlbmVyYXRlT2JqZWN0UHJveHkobmFtZSwgdmFsdWUpO1xuICAgICAgY2xpZW50LnVwZGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2VQcm94eUhhbmRsZXI7IiwiaW1wb3J0IGRlc2VyaWFsaXplIGZyb20gJy4uL3NoYXJlZC9kZXNlcmlhbGl6ZSc7XG5pbXBvcnQgcHJlZml4IGZyb20gJy4uL3NoYXJlZC9wcmVmaXgnO1xuaW1wb3J0IHBhZ2UgZnJvbSAnLi9wYWdlJztcbmltcG9ydCB3b3JrZXIgZnJvbSAnLi93b3JrZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnZva2UobmFtZSwgaGFzaCkge1xuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gX2ludm9rZShwYXJhbXMgPSB7fSkge1xuICAgIGxldCBwYXlsb2FkO1xuICAgIHdvcmtlci5mZXRjaGluZyA9IHRydWU7XG4gICAgaWYgKE9iamVjdC5pc0Zyb3plbih3b3JrZXIucXVldWVzW25hbWVdKSkge1xuICAgICAgd29ya2VyLnF1ZXVlc1tuYW1lXSA9IFtwYXJhbXNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB3b3JrZXIucXVldWVzW25hbWVdID0gWy4uLndvcmtlci5xdWV1ZXNbbmFtZV0sIHBhcmFtc107XG4gICAgfVxuICAgIGNvbnN0IGZpbmFsSGFzaCA9IGhhc2ggPT09IHRoaXMuaGFzaCA/IGhhc2ggOiBgJHtoYXNofS0ke3RoaXMuaGFzaH1gO1xuICAgIGxldCB1cmwgPSBgJHt3b3JrZXIuYXBpfS8ke3ByZWZpeH0vJHtmaW5hbEhhc2h9LyR7bmFtZX0uanNvbmA7XG4gICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMgfHwge30pO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiB3b3JrZXIuaGVhZGVycyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgIGNhY2hlOiAnbm8tY2FjaGUnLFxuICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICByZWRpcmVjdDogJ2ZvbGxvdycsXG4gICAgICByZWZlcnJlclBvbGljeTogJ25vLXJlZmVycmVyJyxcbiAgICB9XG4gICAgaWYgKC9nZXRbQS1aXShbKl0qKS8udGVzdChuYW1lKSkge1xuICAgICAgb3B0aW9ucy5tZXRob2QgPSAnR0VUJztcbiAgICAgIHVybCArPSBgP3BheWxvYWQ9JHtlbmNvZGVVUklDb21wb25lbnQoYm9keSl9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy5ib2R5ID0gYm9keTtcbiAgICAgIGlmICgvcGF0Y2hbQS1aXShbKl0qKS8udGVzdChuYW1lKSkge1xuICAgICAgICBvcHRpb25zLm1ldGhvZCA9ICdQQVRDSCc7XG4gICAgICB9IGVsc2UgaWYgKC9wdXRbQS1aXShbKl0qKS8udGVzdChuYW1lKSkge1xuICAgICAgICBvcHRpb25zLm1ldGhvZCA9ICdQVVQnO1xuICAgICAgfSBlbHNlIGlmICgvZGVsZXRlW0EtWl0oWypdKikvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgb3B0aW9ucy5tZXRob2QgPSAnREVMRVRFJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMubWV0aG9kID0gJ1BPU1QnO1xuICAgICAgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuICAgICAgcGFnZS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgcGF5bG9hZCA9IGRlc2VyaWFsaXplKHRleHQpLnJlc3VsdDtcbiAgICAgIHdvcmtlci5yZXNwb25zaXZlID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB3b3JrZXIucmVzcG9uc2l2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAod29ya2VyLnF1ZXVlc1tuYW1lXT8ubGVuZ3RoID09PSAxKSB7XG4gICAgICBkZWxldGUgd29ya2VyLnF1ZXVlc1tuYW1lXTtcbiAgICB9IGVsc2Uge1xuICAgICAgd29ya2VyLnF1ZXVlc1tuYW1lXSA9IHdvcmtlci5xdWV1ZXNbbmFtZV0uZmlsdGVyKCh0YXNrKSA9PiB0YXNrICE9PSBwYXJhbXMpO1xuICAgIH1cbiAgICB3b3JrZXIuZmV0Y2hpbmcgPSAhIU9iamVjdC5rZXlzKHdvcmtlci5xdWV1ZXMpLmxlbmd0aDtcbiAgICByZXR1cm4gcGF5bG9hZDtcbiAgfVxufSIsImltcG9ydCB3b3JrZXIgZnJvbSAnLi93b3JrZXInXG5cbmxldCBzaG91bGRSZWxvYWROZXh0ID0gZmFsc2U7XG5sZXQgdGltZXIgPSBudWxsO1xuXG5mdW5jdGlvbiByZWxvYWQoKSB7XG4gIGlmIChzaG91bGRSZWxvYWROZXh0KSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0sIDEwKVxuICB9IGVsc2Uge1xuICAgIHNob3VsZFJlbG9hZE5leHQgPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxpdmVSZWxvYWQoKSB7XG4gIGNvbnN0IHVybCA9IHdvcmtlci5hcGkgPyBgJHt3b3JrZXIuYXBpLnJlcGxhY2UoJ2h0dHAnLCAnd3MnKX1gIDogYCR7bG9jYXRpb24ucHJvdG9jb2wucmVwbGFjZSgnaHR0cCcsICd3cycpfS8vJHtsb2NhdGlvbi5ob3N0fWBcbiAgY29uc3Qgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHJlbG9hZCk7XG4gIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIGxpdmVSZWxvYWQpO1xufVxuXG5saXZlUmVsb2FkKCk7IiwiaW1wb3J0IGNsaWVudCBmcm9tICcuL2NsaWVudCc7XG5cbmNvbnN0IG9iamVjdFByb3h5SGFuZGxlciA9IHtcbiAgc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZihpc1Byb3h5YWJsZShuYW1lLCB2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLl9pc1Byb3h5ID0gdHJ1ZTtcbiAgICAgIHRhcmdldFtuYW1lXSA9IG5ldyBQcm94eSh2YWx1ZSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgICBpZighbmFtZS5zdGFydHNXaXRoKCdfJykpIHtcbiAgICAgIGNsaWVudC51cGRhdGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGdldCh0YXJnZXQsIG5hbWUpIHtcbiAgICBpZihuYW1lID09PSAnX2lzUHJveHknKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gUmVmbGVjdC5nZXQoLi4uYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1Byb3h5YWJsZShuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgICFuYW1lLnN0YXJ0c1dpdGgoJ18nKSAmJiBcbiAgICB2YWx1ZSAhPT0gbnVsbCAmJiBcbiAgICB0eXBlb2YodmFsdWUpID09PSAnb2JqZWN0JyAmJiBcbiAgICB2YWx1ZS5faXNQcm94eSA9PT0gdW5kZWZpbmVkICYmIFxuICAgICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVPYmplY3RQcm94eShuYW1lLCB2YWx1ZSkge1xuICBpZihpc1Byb3h5YWJsZShuYW1lLCB2YWx1ZSkpIHtcbiAgICBpZih0eXBlb2YodmFsdWUpID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWVba2V5XSA9IGdlbmVyYXRlT2JqZWN0UHJveHkoa2V5LCB2YWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm94eSh2YWx1ZSwgb2JqZWN0UHJveHlIYW5kbGVyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0UHJveHlIYW5kbGVyOyIsImltcG9ydCBjbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IHdpbmRvd0V2ZW50IGZyb20gJy4vd2luZG93RXZlbnQnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vc3RhdGUnO1xuXG5jb25zdCBwYWdlID0ge1xuICAuLi5zdGF0ZS5wYWdlLFxuICBldmVudDogJ251bGxzdGFjay5wYWdlJ1xufVxuXG5kZWxldGUgc3RhdGUucGFnZTtcblxuY29uc3QgcGFnZVByb3h5SGFuZGxlciA9IHtcbiAgc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZiAobmFtZSA9PT0gJ3RpdGxlJykge1xuICAgICAgZG9jdW1lbnQudGl0bGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gUmVmbGVjdC5zZXQoLi4uYXJndW1lbnRzKTtcbiAgICBpZiAobmFtZSA9PT0gJ3RpdGxlJykge1xuICAgICAgd2luZG93RXZlbnQoJ3BhZ2UnKTtcbiAgICB9XG4gICAgY2xpZW50LnVwZGF0ZSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuY29uc3QgcHJveHkgPSBuZXcgUHJveHkocGFnZSwgcGFnZVByb3h5SGFuZGxlcik7XG5cbmV4cG9ydCBkZWZhdWx0IHByb3h5OyIsImltcG9ydCByb3V0ZXIgZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IGdldFF1ZXJ5U3RyaW5nUGFyYW1zIGZyb20gJy4uL3NoYXJlZC9nZXRRdWVyeVN0cmluZ1BhcmFtcyc7XG5pbXBvcnQgc2VzZXJpYWxpemVQYXJhbSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplUGFyYW0nO1xuaW1wb3J0IHNlcmlhbGl6ZVNlYXJjaCBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplU2VhcmNoJztcbmltcG9ydCBzZWdtZW50cywgeyByZXNldFNlZ21lbnRzIH0gZnJvbSAnLi9zZWdtZW50cyc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5cbmNvbnN0IHBhcmFtc1Byb3h5SGFuZGxlciA9IHtcbiAgc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcbiAgICBjb25zdCBzZXJpYWxpemVkVmFsdWUgPSBzZXNlcmlhbGl6ZVBhcmFtKHZhbHVlKTtcbiAgICB0YXJnZXRbbmFtZV0gPSBzZXJpYWxpemVkVmFsdWU7XG4gICAgY29uc3Qgc2VhcmNoID0gc2VyaWFsaXplU2VhcmNoKHRhcmdldCk7XG4gICAgcm91dGVyLnVybCA9IHJvdXRlci5wYXRoICsgKHNlYXJjaCA/ICc/JyA6ICcnKSArIHNlYXJjaDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgZ2V0KHRhcmdldCwgbmFtZSkge1xuICAgIGlmICh0YXJnZXRbbmFtZV0gPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHNlZ21lbnRzW25hbWVdID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0YXJnZXRbbmFtZV0gfHwgc2VnbWVudHNbbmFtZV0gfHwgJyc7XG4gIH1cbn1cblxuY29uc3QgcGFyYW1zID0geyAuLi5zdGF0ZS5wYXJhbXMgfTtcblxuZGVsZXRlIHN0YXRlLnBhcmFtcztcblxuY29uc3QgcHJveHkgPSBuZXcgUHJveHkocGFyYW1zLCBwYXJhbXNQcm94eUhhbmRsZXIpO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUGFyYW1zKHF1ZXJ5KSB7XG4gIHJlc2V0U2VnbWVudHMoKTtcbiAgY29uc3QgZGVsdGEgPSBnZXRRdWVyeVN0cmluZ1BhcmFtcyhxdWVyeSk7XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHsgLi4uZGVsdGEsIC4uLnBhcmFtcyB9KSkge1xuICAgIHBhcmFtc1trZXldID0gZGVsdGFba2V5XTtcbiAgfVxuICByZXR1cm4gcHJveHk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByb3h5OyIsImltcG9ydCBzdGF0ZSBmcm9tICcuL3N0YXRlJ1xuXG5jb25zdCBwcm9qZWN0ID0geyAuLi5zdGF0ZS5wcm9qZWN0IH07XG5cbmRlbGV0ZSBzdGF0ZS5wcm9qZWN0O1xuXG5PYmplY3QuZnJlZXplKHByb2plY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0OyIsImltcG9ydCB7IGlzRmFsc2UsIGlzVGV4dCB9IGZyb20gJy4uL3NoYXJlZC9ub2Rlcyc7XG5pbXBvcnQgeyBhbmNob3JhYmxlRWxlbWVudCB9IGZyb20gJy4vYW5jaG9yYWJsZU5vZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIobm9kZSwgb3B0aW9ucykge1xuXG4gIGlmIChpc0ZhbHNlKG5vZGUpIHx8IG5vZGUudHlwZSA9PT0gJ2hlYWQnKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJcIik7XG4gIH1cblxuICBpZiAoaXNUZXh0KG5vZGUpKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpO1xuICB9XG5cbiAgY29uc3Qgc3ZnID0gKG9wdGlvbnMgJiYgb3B0aW9ucy5zdmcpIHx8IG5vZGUudHlwZSA9PT0gJ3N2Zyc7XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGlmIChzdmcpIHtcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgbm9kZS50eXBlKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlLnR5cGUpO1xuICB9XG5cbiAgaWYgKG5vZGUuaW5zdGFuY2UpIHtcbiAgICBub2RlLmluc3RhbmNlLl9zZWxmLmVsZW1lbnQgPSBlbGVtZW50O1xuICB9XG5cbiAgZm9yIChsZXQgbmFtZSBpbiBub2RlLmF0dHJpYnV0ZXMpIHtcbiAgICBpZiAobmFtZSA9PT0gJ2h0bWwnKSB7XG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IG5vZGUuYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgIGFuY2hvcmFibGVFbGVtZW50KGVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdvbicpKSB7XG4gICAgICBpZiAobm9kZS5hdHRyaWJ1dGVzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgZXZlbnROYW1lID0gbmFtZS5yZXBsYWNlKCdvbicsICcnKTtcbiAgICAgICAgY29uc3Qga2V5ID0gJ19ldmVudC4nICsgZXZlbnROYW1lO1xuICAgICAgICBub2RlW2tleV0gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAobm9kZS5hdHRyaWJ1dGVzLmRlZmF1bHQgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5vZGUuYXR0cmlidXRlc1tuYW1lXSh7IC4uLm5vZGUuYXR0cmlidXRlcywgZXZlbnQgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG5vZGVba2V5XSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgKG5vZGUuYXR0cmlidXRlc1tuYW1lXSk7XG4gICAgICBpZiAodHlwZSAhPT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAobmFtZSAhPSAndmFsdWUnICYmIG5vZGUuYXR0cmlidXRlc1tuYW1lXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09ICd2YWx1ZScgfHwgKG5vZGUuYXR0cmlidXRlc1tuYW1lXSAhPT0gZmFsc2UgJiYgbm9kZS5hdHRyaWJ1dGVzW25hbWVdICE9PSBudWxsICYmIG5vZGUuYXR0cmlidXRlc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIG5vZGUuYXR0cmlidXRlc1tuYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIW5vZGUuYXR0cmlidXRlcy5odG1sKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IHJlbmRlcihub2RlLmNoaWxkcmVuW2ldLCB7IHN2ZyB9KTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH1cblxuICAgIGlmIChub2RlLnR5cGUgPT0gJ3NlbGVjdCcpIHtcbiAgICAgIGVsZW1lbnQudmFsdWUgPSBub2RlLmF0dHJpYnV0ZXMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG5cbn0iLCJpbXBvcnQgeyBpc0ZhbHNlLCBpc1RleHQgfSBmcm9tICcuLi9zaGFyZWQvbm9kZXMnO1xuaW1wb3J0IHsgYW5jaG9yYWJsZUVsZW1lbnQgfSBmcm9tICcuL2FuY2hvcmFibGVOb2RlJztcbmltcG9ydCBjbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IHJlbmRlciBmcm9tICcuL3JlbmRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcmVuZGVyKHNlbGVjdG9yLCBjdXJyZW50LCBuZXh0KSB7XG5cbiAgY3VycmVudCA9IGN1cnJlbnQgPT09IHVuZGVmaW5lZCA/IGNsaWVudC52aXJ0dWFsRG9tIDogY3VycmVudDtcbiAgbmV4dCA9IG5leHQgPT09IHVuZGVmaW5lZCA/IGNsaWVudC5uZXh0VmlydHVhbERvbSA6IG5leHQ7XG5cbiAgaWYgKG5leHQuaW5zdGFuY2UpIHtcbiAgICBuZXh0Lmluc3RhbmNlLl9zZWxmLmVsZW1lbnQgPSBzZWxlY3RvcjtcbiAgfVxuXG4gIGlmICghY2xpZW50Lmh5ZHJhdGVkICYmIHNlbGVjdG9yKSB7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHNlbGVjdG9yLmNoaWxkTm9kZXMpIHtcbiAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgJiYgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ3RleHRhcmVhJyAmJiBlbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQuQ09NTUVOVF9OT0RFID09PSA4ICYmIGVsZW1lbnQudGV4dENvbnRlbnQgPT09ICcjJykge1xuICAgICAgICBzZWxlY3Rvci5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaXNGYWxzZShjdXJyZW50KSAmJiBpc0ZhbHNlKG5leHQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKChpc0ZhbHNlKGN1cnJlbnQpIHx8IGlzRmFsc2UobmV4dCkpICYmIGN1cnJlbnQgIT0gbmV4dCkge1xuICAgIGNvbnN0IG5leHRTZWxlY3RvciA9IHJlbmRlcihuZXh0KTtcbiAgICByZXR1cm4gc2VsZWN0b3IucmVwbGFjZVdpdGgobmV4dFNlbGVjdG9yKTtcbiAgfVxuXG4gIGlmIChjdXJyZW50LnR5cGUgPT0gJ2hlYWQnICYmIG5leHQudHlwZSA9PSAnaGVhZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY3VycmVudC50eXBlID09ICdoZWFkJyB8fCBuZXh0LnR5cGUgPT0gJ2hlYWQnKSB7XG4gICAgY29uc3QgbmV4dFNlbGVjdG9yID0gcmVuZGVyKG5leHQpO1xuICAgIHJldHVybiBzZWxlY3Rvci5yZXBsYWNlV2l0aChuZXh0U2VsZWN0b3IpO1xuICB9XG5cbiAgaWYgKGN1cnJlbnQudHlwZSAhPT0gbmV4dC50eXBlKSB7XG4gICAgY29uc3QgbmV4dFNlbGVjdG9yID0gcmVuZGVyKG5leHQpO1xuICAgIHJldHVybiBzZWxlY3Rvci5yZXBsYWNlV2l0aChuZXh0U2VsZWN0b3IpO1xuICB9XG5cbiAgaWYgKGlzVGV4dChjdXJyZW50KSAmJiBpc1RleHQobmV4dCkpIHtcbiAgICBpZiAoY3VycmVudCAhPSBuZXh0KSB7XG4gICAgICBzZWxlY3Rvci5ub2RlVmFsdWUgPSBuZXh0O1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY3VycmVudC50eXBlID09PSBuZXh0LnR5cGUpIHtcblxuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gT2JqZWN0LmtleXMoeyAuLi5jdXJyZW50LmF0dHJpYnV0ZXMsIC4uLm5leHQuYXR0cmlidXRlcyB9KTtcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgYXR0cmlidXRlTmFtZXMpIHtcbiAgICAgIGlmIChuYW1lID09PSAnaHRtbCcpIHtcbiAgICAgICAgaWYgKG5leHQuYXR0cmlidXRlc1tuYW1lXSAhPT0gY3VycmVudC5hdHRyaWJ1dGVzW25hbWVdKSB7XG4gICAgICAgICAgc2VsZWN0b3IuaW5uZXJIVE1MID0gbmV4dC5hdHRyaWJ1dGVzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGFuY2hvcmFibGVFbGVtZW50KHNlbGVjdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ2NoZWNrZWQnKSB7XG4gICAgICAgIGlmIChuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gIT09IHNlbGVjdG9yLnZhbHVlKSB7XG4gICAgICAgICAgc2VsZWN0b3IuY2hlY2tlZCA9IG5leHQuYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAndmFsdWUnKSB7XG4gICAgICAgIGlmIChuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gIT09IHNlbGVjdG9yLnZhbHVlKSB7XG4gICAgICAgICAgc2VsZWN0b3IudmFsdWUgPSBuZXh0LmF0dHJpYnV0ZXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdvbicpKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IG5hbWUucmVwbGFjZSgnb24nLCAnJyk7XG4gICAgICAgIGNvbnN0IGtleSA9ICdfZXZlbnQuJyArIGV2ZW50TmFtZTtcbiAgICAgICAgc2VsZWN0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGN1cnJlbnRba2V5XSk7XG4gICAgICAgIGlmIChuZXh0LmF0dHJpYnV0ZXNbbmFtZV0pIHtcbiAgICAgICAgICBuZXh0W2tleV0gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXh0LmF0dHJpYnV0ZXMuZGVmYXVsdCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dC5hdHRyaWJ1dGVzW25hbWVdKHsgLi4ubmV4dC5hdHRyaWJ1dGVzLCBldmVudCB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBuZXh0W2tleV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIChuZXh0LmF0dHJpYnV0ZXNbbmFtZV0pO1xuICAgICAgICBpZiAodHlwZSAhPT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlmIChjdXJyZW50LmF0dHJpYnV0ZXNbbmFtZV0gIT09IHVuZGVmaW5lZCAmJiBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VsZWN0b3IucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudC5hdHRyaWJ1dGVzW25hbWVdICE9PSBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIGlmIChuYW1lICE9ICd2YWx1ZScgJiYgbmV4dC5hdHRyaWJ1dGVzW25hbWVdID09PSBmYWxzZSB8fCBuZXh0LmF0dHJpYnV0ZXNbbmFtZV0gPT09IG51bGwgfHwgbmV4dC5hdHRyaWJ1dGVzW25hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgc2VsZWN0b3IucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lICE9ICd2YWx1ZScgJiYgbmV4dC5hdHRyaWJ1dGVzW25hbWVdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHNlbGVjdG9yLnNldEF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZWxlY3Rvci5zZXRBdHRyaWJ1dGUobmFtZSwgbmV4dC5hdHRyaWJ1dGVzW25hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobmV4dC5hdHRyaWJ1dGVzLmh0bWwpIHJldHVybjtcblxuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5tYXgoY3VycmVudC5jaGlsZHJlbi5sZW5ndGgsIG5leHQuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICBpZiAobmV4dC5jaGlsZHJlbi5sZW5ndGggPiBjdXJyZW50LmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcmVuZGVyKHNlbGVjdG9yLmNoaWxkTm9kZXNbaV0sIGN1cnJlbnQuY2hpbGRyZW5baV0sIG5leHQuY2hpbGRyZW5baV0pO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IGN1cnJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbmV4dC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBuZXh0U2VsZWN0b3IgPSByZW5kZXIobmV4dC5jaGlsZHJlbltpXSk7XG4gICAgICAgIHNlbGVjdG9yLmFwcGVuZENoaWxkKG5leHRTZWxlY3Rvcik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjdXJyZW50LmNoaWxkcmVuLmxlbmd0aCA+IG5leHQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5leHQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVyZW5kZXIoc2VsZWN0b3IuY2hpbGROb2Rlc1tpXSwgY3VycmVudC5jaGlsZHJlbltpXSwgbmV4dC5jaGlsZHJlbltpXSk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gY3VycmVudC5jaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IG5leHQuY2hpbGRyZW4ubGVuZ3RoOyBpLS0pIHtcbiAgICAgICAgc2VsZWN0b3IucmVtb3ZlQ2hpbGQoc2VsZWN0b3IuY2hpbGROb2Rlc1tpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSBsaW1pdCAtIDE7IGkgPiAtMTsgaS0tKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IuY2hpbGROb2Rlc1tpXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgYCR7Y3VycmVudC50eXBlLnRvVXBwZXJDYXNlKCl9IGV4cGVjdGVkIHRhZyAke2N1cnJlbnQuY2hpbGRyZW5baV0udHlwZS50b1VwcGVyQ2FzZSgpfSB0byBiZSBjaGlsZCBhdCBpbmRleCAke2l9IGJ1dCBpbnN0ZWFkIGZvdW5kIHVuZGVmaW5lZC4gVGhpcyBlcnJvciB1c3VhbGx5IGhhcHBlbnMgYmVjYXVzZSBvZiBhbiBpbnZhbGlkIEhUTUwgaGllcmFyY2h5IG9yIGNoYW5nZXMgaW4gY29tcGFyaXNvbnMgYWZ0ZXIgc2VyaWFsaXphdGlvbi5gLFxuICAgICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICApXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWaXJ0dWFsIERPTSBkb2VzIG5vdCBtYXRjaCB0aGUgRE9NLicpXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlcmVuZGVyKHNlbGVjdG9yLmNoaWxkTm9kZXNbaV0sIGN1cnJlbnQuY2hpbGRyZW5baV0sIG5leHQuY2hpbGRyZW5baV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuZXh0LnR5cGUgPT0gJ3RleHRhcmVhJykge1xuICAgICAgc2VsZWN0b3IudmFsdWUgPSBuZXh0LmNoaWxkcmVuLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgaWYgKG5leHQudHlwZSA9PSAnc2VsZWN0Jykge1xuICAgICAgc2VsZWN0b3IudmFsdWUgPSBuZXh0LmF0dHJpYnV0ZXMudmFsdWU7XG4gICAgfVxuXG4gIH1cblxufSIsImltcG9ydCBleHRyYWN0TG9jYXRpb24gZnJvbSAnLi4vc2hhcmVkL2V4dHJhY3RMb2NhdGlvbic7XG5pbXBvcnQgY2xpZW50IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCBlbnZpcm9ubWVudCBmcm9tICcuL2Vudmlyb25tZW50JztcbmltcG9ydCBwYWdlIGZyb20gJy4vcGFnZSc7XG5pbXBvcnQgeyB1cGRhdGVQYXJhbXMgfSBmcm9tICcuL3BhcmFtcyc7XG5pbXBvcnQgc2VnbWVudHMgZnJvbSAnLi9zZWdtZW50cyc7XG5pbXBvcnQgd2luZG93RXZlbnQgZnJvbSAnLi93aW5kb3dFdmVudCc7XG5pbXBvcnQgd29ya2VyIGZyb20gJy4vd29ya2VyJztcblxubGV0IHJlZGlyZWN0VGltZXIgPSBudWxsO1xuXG5jbGFzcyBSb3V0ZXIge1xuXG4gIGV2ZW50ID0gJ251bGxzdGFjay5yb3V0ZXInO1xuICBwcmV2aW91cyA9IG51bGw7XG4gIF9jaGFuZ2VkID0gZmFsc2U7XG4gIF9zZWdtZW50cyA9IHNlZ21lbnRzO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHsgaGFzaCwgdXJsIH0gPSBleHRyYWN0TG9jYXRpb24od2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgdGhpcy5fdXJsID0gdXJsO1xuICAgIHRoaXMuX2hhc2ggPSBoYXNoO1xuICB9XG5cbiAgYXN5bmMgX3BvcFN0YXRlKCkge1xuICAgIGNvbnN0IHsgdXJsV2l0aEhhc2ggfSA9IGV4dHJhY3RMb2NhdGlvbih3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBhd2FpdCB0aGlzLl91cGRhdGUodXJsV2l0aEhhc2gsIGZhbHNlKTtcbiAgfVxuXG4gIGFzeW5jIF91cGRhdGUodGFyZ2V0LCBwdXNoKSB7XG4gICAgdGhpcy5wcmV2aW91cyA9IHRoaXMudXJsO1xuICAgIGNvbnN0IHsgdXJsLCBwYXRoLCBoYXNoLCB1cmxXaXRoSGFzaCB9ID0gZXh0cmFjdExvY2F0aW9uKHRhcmdldCk7XG4gICAgY2xlYXJUaW1lb3V0KHJlZGlyZWN0VGltZXIpO1xuICAgIHJlZGlyZWN0VGltZXIgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHBhZ2Uuc3RhdHVzID0gMjAwO1xuICAgICAgaWYgKGVudmlyb25tZW50Lm1vZGUgPT09ICdzc2cnKSB7XG4gICAgICAgIHdvcmtlci5mZXRjaGluZyA9IHRydWU7XG4gICAgICAgIGNvbnN0IGFwaSA9ICcvaW5kZXguanNvbic7XG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gcGF0aCA9PT0gJy8nID8gYXBpIDogcGF0aCArIGFwaTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGVuZHBvaW50KTtcbiAgICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbih1cmwpO1xuICAgICAgICAgIGNsaWVudC5tZW1vcnkgPSBwYXlsb2FkLmluc3RhbmNlcztcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXlsb2FkLnBhZ2UpIHtcbiAgICAgICAgICAgIHBhZ2Vba2V5XSA9IHBheWxvYWQucGFnZVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3b3JrZXIucmVzcG9uc2l2ZSA9IHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgd29ya2VyLnJlc3BvbnNpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB3b3JrZXIuZmV0Y2hpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChwdXNoKSB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdXJsV2l0aEhhc2gpO1xuICAgICAgfVxuICAgICAgdGhpcy5fdXJsID0gdXJsO1xuICAgICAgdGhpcy5faGFzaCA9IGhhc2g7XG4gICAgICB0aGlzLl9jaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIHVwZGF0ZVBhcmFtcyh1cmwpO1xuICAgICAgY2xpZW50LnVwZGF0ZSgpO1xuICAgICAgd2luZG93RXZlbnQoJ3JvdXRlcicpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgYXN5bmMgX3JlZGlyZWN0KHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICByZXR1cm4gKHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGFyZ2V0KTtcbiAgICB9XG4gICAgY29uc3QgeyB1cmwsIGhhc2gsIHVybFdpdGhIYXNoIH0gPSBleHRyYWN0TG9jYXRpb24odGFyZ2V0KTtcbiAgICBpZiAodXJsICE9PSB0aGlzLl91cmwgfHwgdGhpcy5faGFzaCAhPT0gaGFzaCkge1xuICAgICAgYXdhaXQgdGhpcy5fdXBkYXRlKHVybFdpdGhIYXNoLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKCFoYXNoKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsKDAsIDApO1xuICAgIH1cbiAgfVxuXG4gIGdldCB1cmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VybDtcbiAgfVxuXG4gIHNldCB1cmwodGFyZ2V0KSB7XG4gICAgdGhpcy5fcmVkaXJlY3QodGFyZ2V0KTtcbiAgfVxuXG4gIGdldCBwYXRoKCkge1xuICAgIHJldHVybiBleHRyYWN0TG9jYXRpb24odGhpcy5fdXJsKS5wYXRoO1xuICB9XG5cbiAgc2V0IHBhdGgodGFyZ2V0KSB7XG4gICAgdGhpcy5fcmVkaXJlY3QodGFyZ2V0ICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gIH1cblxufVxuXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjsiLCJjb25zdCBzZWdtZW50cyA9IHt9O1xuZXhwb3J0IGRlZmF1bHQgc2VnbWVudHM7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldFNlZ21lbnRzKCkge1xuICBmb3IoY29uc3Qga2V5IGluIHNlZ21lbnRzKSB7XG4gICAgZGVsZXRlIHNlZ21lbnRzW2tleV07XG4gIH1cbn0iLCJpbXBvcnQgc3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5cbmNvbnN0IHNldHRpbmdzID0geyAuLi5zdGF0ZS5zZXR0aW5ncyB9O1xuZGVsZXRlIHN0YXRlLnNldHRpbmdzO1xuXG5PYmplY3QuZnJlZXplKHNldHRpbmdzKTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0dGluZ3M7IiwiaW1wb3J0IGRlc2VyaWFsaXplIGZyb20gJy4uL3NoYXJlZC9kZXNlcmlhbGl6ZSc7XG5cbmNvbnN0IHN0YXRlID0gZGVzZXJpYWxpemUoZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtuYW1lPW51bGxzdGFja11gKS5jb250ZW50KSk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0YXRlOyIsImxldCB0aW1lciA9IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpbmRvd0V2ZW50KG5hbWUpIHtcbiAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ251bGxzdGFjay4nICsgbmFtZSk7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9LCAwKTtcbn0iLCJpbXBvcnQgY2xpZW50IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCBlbnZpcm9ubWVudCBmcm9tICcuL2Vudmlyb25tZW50JztcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vc3RhdGUnXG5cbmNvbnN0IHdvcmtlciA9IHsgLi4uc3RhdGUud29ya2VyIH07XG5kZWxldGUgc3RhdGUud29ya2VyO1xuXG5jb25zdCBlbXB0eVF1ZXVlID0gT2JqZWN0LmZyZWV6ZShbXSk7XG5cbmNvbnN0IHF1ZXVlc1Byb3h5SGFuZGxlciA9IHtcbiAgc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcbiAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICBjbGllbnQudXBkYXRlKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGdldCh0YXJnZXQsIG5hbWUpIHtcbiAgICByZXR1cm4gdGFyZ2V0W25hbWVdIHx8IGVtcHR5UXVldWU7XG4gIH1cbn1cblxud29ya2VyLnF1ZXVlcyA9IG5ldyBQcm94eSh7fSwgcXVldWVzUHJveHlIYW5kbGVyKTtcblxuY29uc3Qgd29ya2VyUHJveHlIYW5kbGVyID0ge1xuICBzZXQodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xuICAgIGlmICh0YXJnZXRbbmFtZV0gIT09IHZhbHVlKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIGNsaWVudC51cGRhdGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuY29uc3QgcHJveHkgPSBuZXcgUHJveHkod29ya2VyLCB3b3JrZXJQcm94eUhhbmRsZXIpO1xuXG5pZiAod29ya2VyLmVuYWJsZWQpIHtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JlaW5zdGFsbHByb21wdCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcHJveHkuaW5zdGFsbGF0aW9uID0gZXZlbnQ7XG4gIH0pO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xuICAgIGlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gYC9zZXJ2aWNlLXdvcmtlci5qc2A7XG4gICAgICB0cnkge1xuICAgICAgICBwcm94eS5yZWdpc3RyYXRpb24gPSBhd2FpdCBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcihyZXF1ZXN0LCB7IHNjb3BlOiAnLycgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICByZWdpc3RlcigpO1xuXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvbmxpbmUnLCAoKSA9PiB7XG4gIHByb3h5Lm9ubGluZSA9IHRydWU7XG4gIGlmIChlbnZpcm9ubWVudC5tb2RlID09PSAnc3NnJykge1xuICAgIHJvdXRlci5fdXBkYXRlKHJvdXRlci51cmwpO1xuICB9IGVsc2Uge1xuICAgIHByb3h5LnJlc3BvbnNpdmUgPSB0cnVlO1xuICB9XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29mZmxpbmUnLCAoKSA9PiB7XG4gIHByb3h5Lm9ubGluZSA9IGZhbHNlO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb3h5OyIsImZ1bmN0aW9uIG1hdGNoKG5vZGUpIHtcbiAgcmV0dXJuIChcbiAgICBub2RlICYmXG4gICAgbm9kZS50eXBlID09PSAnYScgJiZcbiAgICBub2RlLmF0dHJpYnV0ZXMuaHJlZiAmJlxuICAgIG5vZGUuYXR0cmlidXRlcy5ocmVmLnN0YXJ0c1dpdGgoJy8nKSAmJlxuICAgICFub2RlLmF0dHJpYnV0ZXMudGFyZ2V0XG4gIClcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtKHsgbm9kZSwgcm91dGVyIH0pIHtcbiAgaWYgKCFtYXRjaChub2RlKSkgcmV0dXJuXG4gIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSBub2RlLmF0dHJpYnV0ZXMub25jbGlja1xuICBub2RlLmF0dHJpYnV0ZXMuZGVmYXVsdCA9IHRydWVcbiAgbm9kZS5hdHRyaWJ1dGVzLm9uY2xpY2sgPSAoeyBldmVudCB9KSA9PiB7XG4gICAgaWYgKCFldmVudC5jdHJsS2V5ICYmICFldmVudC5zaGlmdEtleSAmJiAhZXZlbnQuYWx0S2V5ICYmICFldmVudC5tZXRhS2V5KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICByb3V0ZXIudXJsID0gbm9kZS5hdHRyaWJ1dGVzLmhyZWZcbiAgICB9XG4gICAgaWYgKG9yaWdpbmFsRXZlbnQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvcmlnaW5hbEV2ZW50KHsgLi4ubm9kZS5hdHRyaWJ1dGVzLCBldmVudCB9KVxuICAgICAgfSwgMClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgeyB0cmFuc2Zvcm0sIGNsaWVudDogdHJ1ZSB9XG4iLCJmdW5jdGlvbiBhdHRhY2hFdmVudChub2RlKSB7XG4gIGNvbnN0IHRhcmdldCA9IG5vZGUuYXR0cmlidXRlcy5zb3VyY2U7XG4gIGxldCBldmVudE5hbWUgPSAnb25pbnB1dCc7XG4gIGxldCB2YWx1ZU5hbWUgPSAndmFsdWUnO1xuICBpZiAobm9kZS5hdHRyaWJ1dGVzLnR5cGUgPT09ICdjaGVja2JveCcgfHwgbm9kZS5hdHRyaWJ1dGVzLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICBldmVudE5hbWUgPSAnb25jbGljayc7XG4gICAgdmFsdWVOYW1lID0gJ2NoZWNrZWQnO1xuICB9IGVsc2UgaWYgKG5vZGUudHlwZSAhPT0gJ2lucHV0JyAmJiBub2RlLnR5cGUgIT09ICd0ZXh0YXJlYScpIHtcbiAgICBldmVudE5hbWUgPSAnb25jaGFuZ2UnO1xuICB9XG4gIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSBub2RlLmF0dHJpYnV0ZXNbZXZlbnROYW1lXTtcbiAgbm9kZS5hdHRyaWJ1dGVzW2V2ZW50TmFtZV0gPSAoeyBldmVudCwgdmFsdWUgfSkgPT4ge1xuICAgIGlmICh2YWx1ZU5hbWUgPT0gJ2NoZWNrZWQnKSB7XG4gICAgICB0YXJnZXRbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdID0gZXZlbnQudGFyZ2V0W3ZhbHVlTmFtZV07XG4gICAgfSBlbHNlIGlmICh0YXJnZXRbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdID09PSB0cnVlIHx8IHRhcmdldFtub2RlLmF0dHJpYnV0ZXMuYmluZF0gPT09IGZhbHNlKSB7XG4gICAgICB0YXJnZXRbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdID0gZXZlbnQgPyAoZXZlbnQudGFyZ2V0W3ZhbHVlTmFtZV0gPT0gJ3RydWUnKSA6IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRhcmdldFtub2RlLmF0dHJpYnV0ZXMuYmluZF0gPT09ICdudW1iZXInKSB7XG4gICAgICB0YXJnZXRbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdID0gcGFyc2VGbG9hdChldmVudCA/IGV2ZW50LnRhcmdldFt2YWx1ZU5hbWVdIDogdmFsdWUpIHx8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldFtub2RlLmF0dHJpYnV0ZXMuYmluZF0gPSBldmVudCA/IGV2ZW50LnRhcmdldFt2YWx1ZU5hbWVdIDogdmFsdWU7XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbEV2ZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBvcmlnaW5hbEV2ZW50KHsgLi4ubm9kZS5hdHRyaWJ1dGVzLCBldmVudCwgdmFsdWUgfSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF0Y2gobm9kZSkge1xuICByZXR1cm4gKFxuICAgIG5vZGUgIT09IHVuZGVmaW5lZCAmJlxuICAgIG5vZGUuYXR0cmlidXRlcyAhPT0gdW5kZWZpbmVkICYmXG4gICAgbm9kZS5hdHRyaWJ1dGVzLmJpbmQgIT09IHVuZGVmaW5lZCAmJlxuICAgIG5vZGUuYXR0cmlidXRlcy5zb3VyY2UgIT09IHVuZGVmaW5lZFxuICApXG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybSh7IG5vZGUsIGVudmlyb25tZW50IH0pIHtcbiAgaWYgKCFtYXRjaChub2RlKSkgcmV0dXJuO1xuICBjb25zdCB0YXJnZXQgPSBub2RlLmF0dHJpYnV0ZXMuc291cmNlO1xuICBpZiAobm9kZS50eXBlID09PSAndGV4dGFyZWEnKSB7XG4gICAgbm9kZS5jaGlsZHJlbiA9IFt0YXJnZXRbbm9kZS5hdHRyaWJ1dGVzLmJpbmRdXTtcbiAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdpbnB1dCcgJiYgbm9kZS5hdHRyaWJ1dGVzLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICBub2RlLmF0dHJpYnV0ZXMuY2hlY2tlZCA9IHRhcmdldFtub2RlLmF0dHJpYnV0ZXMuYmluZF07XG4gIH0gZWxzZSB7XG4gICAgbm9kZS5hdHRyaWJ1dGVzLnZhbHVlID0gdGFyZ2V0W25vZGUuYXR0cmlidXRlcy5iaW5kXSB8fCAnJztcbiAgfVxuICBub2RlLmF0dHJpYnV0ZXMubmFtZSA9IG5vZGUuYXR0cmlidXRlcy5uYW1lIHx8IG5vZGUuYXR0cmlidXRlcy5iaW5kO1xuXG4gIGlmIChlbnZpcm9ubWVudC5jbGllbnQpIHtcbiAgICBhdHRhY2hFdmVudChub2RlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7IHRyYW5zZm9ybSwgY2xpZW50OiB0cnVlLCBzZXJ2ZXI6IHRydWUgfSIsImltcG9ydCB7Y2FtZWxpemUsIGtlYmFiaXplfSBmcm9tICcuLi9zaGFyZWQvc3RyaW5nJztcblxuZnVuY3Rpb24gbWF0Y2gobm9kZSkge1xuICByZXR1cm4gKFxuICAgIG5vZGUgJiYgXG4gICAgbm9kZS5hdHRyaWJ1dGVzICE9PSB1bmRlZmluZWRcbiAgKVxufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm0oe25vZGV9KSB7XG4gIGlmKCFtYXRjaChub2RlKSkgcmV0dXJuO1xuICBub2RlLmF0dHJpYnV0ZXMuZGF0YSA9IG5vZGUuYXR0cmlidXRlcy5kYXRhIHx8IHt9O1xuICBmb3IoY29uc3QgYXR0cmlidXRlIGluIG5vZGUuYXR0cmlidXRlcykge1xuICAgIGlmKGF0dHJpYnV0ZS5zdGFydHNXaXRoKCdkYXRhLScpKSB7XG4gICAgICBjb25zdCBrZXkgPSBjYW1lbGl6ZShhdHRyaWJ1dGUuc2xpY2UoNSkpO1xuICAgICAgbm9kZS5hdHRyaWJ1dGVzLmRhdGFba2V5XSA9IG5vZGUuYXR0cmlidXRlc1thdHRyaWJ1dGVdO1xuICAgIH1cbiAgfVxuICBmb3IoY29uc3Qga2V5IGluIG5vZGUuYXR0cmlidXRlcy5kYXRhKSB7XG4gICAgY29uc3QgYXR0cmlidXRlID0gJ2RhdGEtJyArIGtlYmFiaXplKGtleSk7XG4gICAgbm9kZS5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV0gPSBub2RlLmF0dHJpYnV0ZXMuZGF0YVtrZXldO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgdHJhbnNmb3JtLCBjbGllbnQ6IHRydWUsIHNlcnZlcjogdHJ1ZSB9IiwiXG5cbmZ1bmN0aW9uIG1hdGNoKG5vZGUpIHtcbiAgcmV0dXJuIChcbiAgICBub2RlICYmXG4gICAgbm9kZS5hdHRyaWJ1dGVzICE9PSB1bmRlZmluZWRcbiAgKVxufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm0oe25vZGV9KSB7XG4gIGlmKCFtYXRjaChub2RlKSkgcmV0dXJuO1xuICBmb3IoY29uc3QgYXR0cmlidXRlIGluIG5vZGUuYXR0cmlidXRlcykge1xuICAgIGlmKGF0dHJpYnV0ZS5zdGFydHNXaXRoKCdvbicpICYmIHR5cGVvZihub2RlLmF0dHJpYnV0ZXNbYXR0cmlidXRlXSkgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBub2RlLmF0dHJpYnV0ZXMuc291cmNlO1xuICAgICAgY29uc3Qgb2JqZWN0ID0gbm9kZS5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XG4gICAgICBub2RlLmF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIG9iamVjdCk7XG4gICAgICB9KS5iaW5kKHRhcmdldCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgdHJhbnNmb3JtLCBjbGllbnQ6IHRydWUgfSIsImltcG9ydCBzZXJpYWxpemVQYXJhbSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplUGFyYW0nO1xuaW1wb3J0IHNlcmlhbGl6ZVNlYXJjaCBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplU2VhcmNoJztcblxuZnVuY3Rpb24gbWF0Y2gobm9kZSkge1xuICByZXR1cm4gKFxuICAgIG5vZGUgJiZcbiAgICBub2RlLmF0dHJpYnV0ZXMgJiZcbiAgICAobm9kZS5hdHRyaWJ1dGVzLnBhcmFtcyB8fCBub2RlLmF0dHJpYnV0ZXMucGF0aClcbiAgKVxufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm0oe25vZGUsIHJvdXRlciwgcGFyYW1zfSkge1xuICBpZighbWF0Y2gobm9kZSkpIHJldHVybjtcbiAgbGV0IHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmKG5vZGUuYXR0cmlidXRlcy5wYXJhbXMpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0ge307XG4gICAgZm9yKGNvbnN0IGtleSBpbiBub2RlLmF0dHJpYnV0ZXMucGFyYW1zKSB7XG4gICAgICBzZXJpYWxpemVkUGFyYW1zW2tleV0gPSBzZXJpYWxpemVQYXJhbShub2RlLmF0dHJpYnV0ZXMucGFyYW1zW2tleV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zO1xuICB9XG4gIGNvbnN0IHNlYXJjaCA9IHNlcmlhbGl6ZVNlYXJjaChzZXJpYWxpemVkUGFyYW1zKTtcbiAgY29uc3QgcGF0aCA9IG5vZGUuYXR0cmlidXRlcy5wYXRoIHx8IHJvdXRlci5wYXRoO1xuICBub2RlLmF0dHJpYnV0ZXMuaHJlZiA9IHBhdGggKyAoc2VhcmNoID8gJz8nIDogJycpICsgc2VhcmNoO1xuICBkZWxldGUgbm9kZS5hdHRyaWJ1dGVzLnBhdGg7XG4gIGRlbGV0ZSBub2RlLmF0dHJpYnV0ZXMucGFyYW1zO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IHRyYW5zZm9ybSwgY2xpZW50OiB0cnVlLCBzZXJ2ZXI6IHRydWUgfSIsImltcG9ydCByb3V0ZU1hdGNoZXMgZnJvbSAnLi4vc2hhcmVkL3JvdXRlTWF0Y2hlcyc7XG5cbmZ1bmN0aW9uIGVyYXNlKG5vZGUpIHtcbiAgbm9kZS50eXBlID0gZmFsc2U7XG4gIGRlbGV0ZSBub2RlLmF0dHJpYnV0ZXM7XG4gIGRlbGV0ZSBub2RlLmNoaWxkcmVuO1xufVxuXG5mdW5jdGlvbiBtYXRjaChub2RlKSB7XG4gIHJldHVybiAoXG4gICAgbm9kZSAmJiBcbiAgICBub2RlLmF0dHJpYnV0ZXMgIT09IHVuZGVmaW5lZCAmJlxuICAgIG5vZGUuYXR0cmlidXRlcy5yb3V0ZSAhPT0gdW5kZWZpbmVkXG4gIClcbn1cblxuZnVuY3Rpb24gbG9hZCh7cm91dGVyfSkge1xuICByb3V0ZXIuX3JvdXRlcyA9IHt9O1xuICBpZighcm91dGVyLl9vbGRTZWdtZW50cykge1xuICAgIHJvdXRlci5fb2xkU2VnbWVudHMgPSB7fTtcbiAgICByb3V0ZXIuX25ld1NlZ21lbnRzID0ge307XG4gIH0gZWxzZSB7XG4gICAgcm91dGVyLl9vbGRTZWdtZW50cyA9IHJvdXRlci5fbmV3U2VnbWVudHM7XG4gICAgcm91dGVyLl9uZXdTZWdtZW50cyA9IHt9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybSh7bm9kZSwgZGVwdGgsIHJvdXRlcn0pIHtcbiAgaWYoIW1hdGNoKG5vZGUpKSByZXR1cm47XG4gIGNvbnN0IHJvdXRlRGVwdGggPSBkZXB0aC5zbGljZSgwLCAtMSkuam9pbignLicpO1xuICBpZihyb3V0ZXIuX3JvdXRlc1tyb3V0ZURlcHRoXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZXJhc2Uobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcGFyYW1zID0gcm91dGVNYXRjaGVzKHJvdXRlci51cmwsIG5vZGUuYXR0cmlidXRlcy5yb3V0ZSk7XG4gICAgaWYocGFyYW1zKSB7XG4gICAgICByb3V0ZXIuX3JvdXRlc1tyb3V0ZURlcHRoXSA9IHRydWU7XG4gICAgICByb3V0ZXIuX25ld1NlZ21lbnRzW3JvdXRlRGVwdGhdID0gcGFyYW1zO1xuICAgICAgT2JqZWN0LmFzc2lnbihyb3V0ZXIuX3NlZ21lbnRzLCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcmFzZShub2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkLCB0cmFuc2Zvcm0sIGNsaWVudDogdHJ1ZSwgc2VydmVyOiB0cnVlIH0iLCJjb25zdCByZUlTTyA9IC9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopKSg/Olp8KFxcK3wtKShbXFxkfDpdKikpPyQvO1xuY29uc3QgcmVNc0FqYXggPSAvXlxcL0RhdGVcXCgoZHwtfC4qKVxcKVtcXC98XFxcXF0kLztcblxuZnVuY3Rpb24gZGF0ZVBhcnNlcihrZXksIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgbGV0IGEgPSByZUlTTy5leGVjKHZhbHVlKTtcbiAgICBpZiAoYSkgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbiAgICBhID0gcmVNc0FqYXguZXhlYyh2YWx1ZSk7XG4gICAgaWYgKGEpIHtcbiAgICAgIGNvbnN0IGIgPSBhWzFdLnNwbGl0KC9bLSssLl0vKTtcbiAgICAgIHJldHVybiBuZXcgRGF0ZShiWzBdID8gK2JbMF0gOiAwIC0gK2JbMV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXNlcmlhbGl6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nLCBkYXRlUGFyc2VyKTtcbn0iLCJpbXBvcnQgZnJhZ21lbnQgZnJvbSAnLi9mcmFnbWVudCc7XG5cbmZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xuICBjaGlsZHJlbiA9IFtdLmNvbmNhdC5hcHBseShbXSwgY2hpbGRyZW4pLm1hcCgoY2hpbGQpID0+IHtcbiAgICBpZihjaGlsZCA9PT0gbnVsbCB8fCBjaGlsZCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGNoaWxkO1xuICB9KTtcbiAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgY2hpbGRyZW4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbGVtZW50KHR5cGUsIHByb3BzLCAuLi5jaGlsZHJlbikge1xuICBjaGlsZHJlbiA9IGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbik7XG4gIGlmKHR5cGUgPT09ICd0ZXh0YXJlYScpIHtcbiAgICBjaGlsZHJlbiA9IFtjaGlsZHJlbi5qb2luKCcnKV07XG4gIH1cbiAgY29uc3QgYXR0cmlidXRlcyA9IHsuLi5wcm9wcywgY2hpbGRyZW59O1xuICBpZih0eXBlID09PSAnZWxlbWVudCcpIHtcbiAgICB0eXBlID0gYXR0cmlidXRlcy50YWcgfHwgZnJhZ21lbnQ7XG4gICAgZGVsZXRlIGF0dHJpYnV0ZXMudGFnO1xuICB9XG4gIGlmKHR5cGVvZih0eXBlKSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlLnJlbmRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHt0eXBlLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbjogbnVsbH1cbiAgfVxuICByZXR1cm4ge3R5cGUsIGF0dHJpYnV0ZXMsIGNoaWxkcmVufTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRyYWN0TG9jYXRpb24ob3JpZ2luYWxVcmwpIHtcbiAgbGV0IFt0YXJnZXQsIGhhc2hdID0gb3JpZ2luYWxVcmwuc3BsaXQoJyMnKTtcbiAgbGV0IFtwYXRoLCBzZWFyY2hdID0gdGFyZ2V0LnNwbGl0KCc/Jyk7XG4gIGlmKHBhdGggIT09ICcvJyAmJiBwYXRoLmVuZHNXaXRoKCcvJykpIHtcbiAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sZW5ndGggLSAxKTtcbiAgfVxuICBsZXQgdXJsID0gcGF0aDtcbiAgaWYoc2VhcmNoKSB7XG4gICAgdXJsICs9ICc/JyArIHNlYXJjaDtcbiAgfVxuICBsZXQgdXJsV2l0aEhhc2ggPSB1cmw7XG4gIGlmKGhhc2gpIHtcbiAgICB1cmxXaXRoSGFzaCArPSAnIycgKyBoYXNoO1xuICB9XG4gIGlmKGhhc2ggPT09IHVuZGVmaW5lZCkge1xuICAgIGhhc2ggPSAnJztcbiAgfVxuICByZXR1cm4ge3BhdGgsIHNlYXJjaCwgdXJsLCB1cmxXaXRoSGFzaCwgaGFzaH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0cmFjdFBhcmFtVmFsdWUodmFsdWUpIHtcbiAgaWYodmFsdWUgPT09ICd0cnVlJykgcmV0dXJuIHRydWU7XG4gIGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdmFsdWUgPyBkZWNvZGVVUklDb21wb25lbnQodmFsdWUucmVwbGFjZSgvXFwrL2csICcgJykpIDogJyc7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZnJhZ21lbnQoe2NoaWxkcmVufSkge1xuICByZXR1cm4gY2hpbGRyZW47XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVLZXkobm9kZSwgZGVwdGgpIHtcbiAgaWYgKGRlcHRoLmxlbmd0aCA9PT0gMSkgcmV0dXJuICdhcHBsaWNhdGlvbic7XG4gIHJldHVybiBub2RlLnR5cGUubmFtZSArICcvJyArIGRlcHRoLmpvaW4oJy0nKTtcbn0iLCJpbXBvcnQgZ2VuZXJhdGVLZXkgZnJvbSAnLi4vc2hhcmVkL2dlbmVyYXRlS2V5JztcbmltcG9ydCB7IGlzQ2xhc3MsIGlzRmFsc2UsIGlzRnVuY3Rpb24sIGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL25vZGVzJztcbmltcG9ydCB7IHRyYW5zZm9ybU5vZGVzIH0gZnJvbSAnLi9wbHVnaW5zJztcblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVCcmFuY2gocGFyZW50LCBub2RlLCBkZXB0aCwgc2NvcGUpIHtcblxuICB0cmFuc2Zvcm1Ob2RlcyhzY29wZSwgbm9kZSwgZGVwdGgpO1xuXG4gIGlmIChpc1VuZGVmaW5lZChub2RlKSkge1xuICAgIGxldCBtZXNzYWdlID0gJ0F0dGVtcHRpbmcgdG8gcmVuZGVyIGFuIHVuZGVmaW5lZCBub2RlLiBcXG4nXG4gICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbWVzc2FnZSArPSAnVGhpcyBlcnJvciB1c3VhbGx5IGhhcHBlbnMgYmVjYXVzZSBvZiBhIG1pc3NpbmcgcmV0dXJuIHN0YXRlbWVudCBhcm91bmQgSlNYIG9yIHJldHVybmluZyB1bmRlZmluZWQgZnJvbSBhIHJlbmRlcmFibGUgZnVuY3Rpb24uJztcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSArPSAnVGhpcyBlcnJvciB1c3VhbGx5IGhhcHBlbnMgYmVjYXVzZSBvZiBhIG1pc3NpbmcgaW1wb3J0IHN0YXRlbWVudCBvciBhIHR5cG8gb24gYSBjb21wb25lbnQgdGFnJztcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlzRmFsc2Uobm9kZSkpIHtcbiAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChmYWxzZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlzQ2xhc3Mobm9kZSkpIHtcbiAgICBjb25zdCBrZXkgPSBub2RlLmF0dHJpYnV0ZXMua2V5ID8gbm9kZS5hdHRyaWJ1dGVzLmtleSA6IGdlbmVyYXRlS2V5KG5vZGUsIGRlcHRoKSArIChub2RlLmF0dHJpYnV0ZXMucm91dGUgPyAoc2NvcGUuY29udGV4dC5lbnZpcm9ubWVudC5tb2RlID09PSAnc3NnJyA/IHNjb3BlLmNvbnRleHQucm91dGVyLnBhdGggOiBzY29wZS5jb250ZXh0LnJvdXRlci51cmwpIDogJycpXG4gICAgaWYgKFxuICAgICAgc2NvcGUuY29udGV4dC5lbnZpcm9ubWVudC5jbGllbnQgJiZcbiAgICAgIHNjb3BlLmNvbnRleHQucm91dGVyLl9jaGFuZ2VkICYmXG4gICAgICBub2RlLmF0dHJpYnV0ZXMgJiZcbiAgICAgIG5vZGUuYXR0cmlidXRlcy5yb3V0ZSAmJlxuICAgICAgc2NvcGUuY29udGV4dC5lbnZpcm9ubWVudC5tb2RlICE9PSAnc3NnJ1xuICAgICkge1xuICAgICAgY29uc3Qgcm91dGVEZXB0aCA9IGRlcHRoLnNsaWNlKDAsIC0xKS5qb2luKCcuJyk7XG4gICAgICBjb25zdCBuZXdTZWdtZW50cyA9IHNjb3BlLmNvbnRleHQucm91dGVyLl9uZXdTZWdtZW50c1tyb3V0ZURlcHRoXTtcbiAgICAgIGlmIChuZXdTZWdtZW50cykge1xuICAgICAgICBjb25zdCBvbGRTZWdtZW50cyA9IHNjb3BlLmNvbnRleHQucm91dGVyLl9vbGRTZWdtZW50c1tyb3V0ZURlcHRoXTtcbiAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IGluIG5ld1NlZ21lbnRzKSB7XG4gICAgICAgICAgaWYgKG9sZFNlZ21lbnRzW3NlZ21lbnRdICE9PSBuZXdTZWdtZW50c1tzZWdtZW50XSkge1xuICAgICAgICAgICAgZGVsZXRlIHNjb3BlLm1lbW9yeVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBpbnN0YW5jZSA9IHNjb3BlLmluc3RhbmNlc1trZXldIHx8IG5ldyBub2RlLnR5cGUoc2NvcGUpO1xuICAgIGluc3RhbmNlLl9zZWxmLnBlcnNpc3RlbnQgPSAhIW5vZGUuYXR0cmlidXRlcy5wZXJzaXN0ZW50XG4gICAgaW5zdGFuY2UuX3NlbGYua2V5ID0ga2V5O1xuICAgIGluc3RhbmNlLl9hdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgIGluc3RhbmNlLl9zY29wZSA9IHNjb3BlO1xuICAgIGxldCBtZW1vcnk7XG4gICAgaWYgKHNjb3BlLm1lbW9yeSkge1xuICAgICAgbWVtb3J5ID0gc2NvcGUubWVtb3J5W2tleV07XG4gICAgICBpZiAobWVtb3J5KSB7XG4gICAgICAgIGluc3RhbmNlLl9zZWxmLnByZXJlbmRlcmVkID0gdHJ1ZTtcbiAgICAgICAgaW5zdGFuY2UuX3NlbGYuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihpbnN0YW5jZSwgbWVtb3J5KTtcbiAgICAgICAgZGVsZXRlIHNjb3BlLm1lbW9yeVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc2hvdWxkSHlkcmF0ZSA9IGZhbHNlO1xuICAgIGNvbnN0IHNob3VsZExhdW5jaCA9IGluc3RhbmNlLl9zZWxmLmluaXRpYXRlZCAmJiAoXG4gICAgICAhaW5zdGFuY2UuX3NlbGYucHJlcmVuZGVyZWQgfHxcbiAgICAgIChpbnN0YW5jZS5fc2VsZi5wZXJzaXN0ZW50ICYmIGluc3RhbmNlLl9zZWxmLnRlcm1pbmF0ZWQpXG4gICAgKVxuICAgIGlmIChpbnN0YW5jZS5fc2VsZi50ZXJtaW5hdGVkKSB7XG4gICAgICBzaG91bGRIeWRyYXRlID0gdHJ1ZTtcbiAgICAgIGluc3RhbmNlLl9zZWxmLnRlcm1pbmF0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgY29uc3Qgc2hvdWxkUHJlcGFyZSA9IHNjb3BlLmluc3RhbmNlc1trZXldID09PSB1bmRlZmluZWQ7XG4gICAgc2NvcGUuaW5zdGFuY2VzW2tleV0gPSBpbnN0YW5jZTtcbiAgICBpZiAoc2hvdWxkUHJlcGFyZSkge1xuICAgICAgaWYgKG1lbW9yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGluc3RhbmNlLnByZXBhcmUgJiYgaW5zdGFuY2UucHJlcGFyZSgpO1xuICAgICAgICBpZiAoc2NvcGUuY29udGV4dC5lbnZpcm9ubWVudC5zZXJ2ZXIpIHtcbiAgICAgICAgICBpbnN0YW5jZS5pbml0aWF0ZSAmJiBhd2FpdCBpbnN0YW5jZS5pbml0aWF0ZSgpO1xuICAgICAgICAgIGluc3RhbmNlLl9zZWxmLmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgICAgaW5zdGFuY2UubGF1bmNoICYmIGluc3RhbmNlLmxhdW5jaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjb3BlLmluaXRpYXRpb25RdWV1ZS5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2hvdWxkSHlkcmF0ZSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChzY29wZS5oeWRyYXRpb25RdWV1ZSkge1xuICAgICAgaWYgKHNob3VsZEh5ZHJhdGUpIHtcbiAgICAgICAgc2hvdWxkTGF1bmNoICYmIGluc3RhbmNlLmxhdW5jaCAmJiBpbnN0YW5jZS5sYXVuY2goKTtcbiAgICAgICAgc2NvcGUuaHlkcmF0aW9uUXVldWUucHVzaChpbnN0YW5jZSk7XG4gICAgICB9IGVsc2UgaWYgKGluc3RhbmNlLl9zZWxmLmluaXRpYXRlZCA9PSB0cnVlKSB7XG4gICAgICAgIGluc3RhbmNlLnVwZGF0ZSAmJiBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNjb3BlLmNvbnRleHQuZW52aXJvbm1lbnQuY2xpZW50KSB7XG4gICAgICBzY29wZS5yZW5ld2FsUXVldWUucHVzaChpbnN0YW5jZSk7XG4gICAgfVxuICAgIGNvbnN0IGNoaWxkcmVuID0gaW5zdGFuY2UucmVuZGVyKCk7XG4gICAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLnR5cGUpIHtcbiAgICAgIGNoaWxkcmVuLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgfVxuICAgIG5vZGUuY2hpbGRyZW4gPSBbXS5jb25jYXQoY2hpbGRyZW4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgYXdhaXQgZ2VuZXJhdGVCcmFuY2gocGFyZW50LCBub2RlLmNoaWxkcmVuW2ldLCBbLi4uZGVwdGgsIGldLCBzY29wZSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpc0Z1bmN0aW9uKG5vZGUpKSB7XG4gICAgY29uc3QgY29udGV4dCA9IG5vZGUudHlwZS5uYW1lID8gc2NvcGUuZ2VuZXJhdGVDb250ZXh0KG5vZGUuYXR0cmlidXRlcykgOiBub2RlLmF0dHJpYnV0ZXM7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLnR5cGUoY29udGV4dCk7XG4gICAgbm9kZS5jaGlsZHJlbiA9IFtdLmNvbmNhdChjaGlsZHJlbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhd2FpdCBnZW5lcmF0ZUJyYW5jaChwYXJlbnQsIG5vZGUuY2hpbGRyZW5baV0sIFsuLi5kZXB0aCwgaV0sIHNjb3BlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG5vZGUudHlwZSkge1xuICAgIGNvbnN0IGJyYW5jaCA9IHtcbiAgICAgIHR5cGU6IG5vZGUudHlwZSxcbiAgICAgIGF0dHJpYnV0ZXM6IG5vZGUuYXR0cmlidXRlcyB8fCB7fSxcbiAgICAgIGluc3RhbmNlOiBub2RlLmluc3RhbmNlLFxuICAgICAgY2hpbGRyZW46IFtdXG4gICAgfVxuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVCcmFuY2goYnJhbmNoLCBub2RlLmNoaWxkcmVuW2ldLCBbLi4uZGVwdGgsIGldLCBzY29wZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGJyYW5jaCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcGFyZW50LmNoaWxkcmVuLnB1c2gobm9kZSk7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVUcmVlKG5vZGUsIHNjb3BlKSB7XG4gIGNvbnN0IHRyZWUgPSB7IHR5cGU6ICdkaXYnLCBhdHRyaWJ1dGVzOiB7IGlkOiAnYXBwbGljYXRpb24nIH0sIGNoaWxkcmVuOiBbXSB9O1xuICBhd2FpdCBnZW5lcmF0ZUJyYW5jaCh0cmVlLCBub2RlLCBbMF0sIHNjb3BlKTtcbiAgcmV0dXJuIHRyZWU7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UHJveHlhYmxlTWV0aG9kcyh0YXJnZXQpIHtcbiAgbGV0IHByb3BlcnRpZXMgPSBuZXcgU2V0KCk7XG4gIGxldCBjdXJyZW50ID0gdGFyZ2V0O1xuICBkbyB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkubWFwKG5hbWUgPT4gcHJvcGVydGllcy5hZGQobmFtZSkpXG4gIH0gd2hpbGUgKChjdXJyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGN1cnJlbnQpKSAmJiBjdXJyZW50ICE9IE9iamVjdC5wcm90b3R5cGUpXG4gIHJldHVybiBbLi4ucHJvcGVydGllcy5rZXlzKCldLmZpbHRlcigobmFtZSkgPT4ge1xuICAgIHJldHVybiBuYW1lICE9PSAnY29uc3RydWN0b3InICYmIHR5cGVvZiB0YXJnZXRbbmFtZV0gPT09ICdmdW5jdGlvbidcbiAgfSk7XG59IiwiaW1wb3J0IGV4dHJhY3RQYXJhbVZhbHVlIGZyb20gJy4vZXh0cmFjdFBhcmFtVmFsdWUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRRdWVyeVN0cmluZ1BhcmFtcyh1cmwpIHtcbiAgY29uc3QgW3BhdGgsIHF1ZXJ5XSA9IHVybC5zcGxpdCgnPycpO1xuICBpZihxdWVyeSkge1xuICAgIHJldHVybiBxdWVyeS5zcGxpdCgnJicpLnJlZHVjZSgocGFyYW1zLCBwYXJhbSkgPT4ge1xuICAgICAgbGV0IFtrZXksIHZhbHVlXSA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICBwYXJhbXNba2V5XSA9IGV4dHJhY3RQYXJhbVZhbHVlKHZhbHVlKTtcbiAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfSwge30pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7fTtcbiAgfVxufTsiLCJleHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQobm9kZSkge1xuICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gbm9kZS5oYXNPd25Qcm9wZXJ0eSgndHlwZScpICYmIG5vZGUudHlwZSA9PT0gdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZhbHNlKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gZmFsc2UpIHJldHVybiB0cnVlO1xuICByZXR1cm4gbm9kZT8uaGFzT3duUHJvcGVydHkoJ3R5cGUnKSAmJiBub2RlLnR5cGUgPT09IG51bGwgfHwgbm9kZS50eXBlID09PSBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2xhc3Mobm9kZSkge1xuICByZXR1cm4gdHlwZW9mIChub2RlLnR5cGUpID09PSAnZnVuY3Rpb24nICYmIG5vZGUudHlwZS5wcm90b3R5cGUgJiYgdHlwZW9mIChub2RlLnR5cGUucHJvdG90eXBlLnJlbmRlcikgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKG5vZGUpIHtcbiAgcmV0dXJuIHR5cGVvZiAobm9kZS50eXBlKSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGV4dChub2RlKSB7XG4gIHJldHVybiB0eXBlb2YgKG5vZGUuY2hpbGRyZW4pID09PSAndW5kZWZpbmVkJztcbn0iLCJpbXBvcnQgcm91dGFibGUgZnJvbSAnLi4vcGx1Z2lucy9yb3V0YWJsZSc7XG5pbXBvcnQgYmluZGFibGUgZnJvbSAnLi4vcGx1Z2lucy9iaW5kYWJsZSc7XG5pbXBvcnQgZGF0YWJsZSBmcm9tICcuLi9wbHVnaW5zL2RhdGFibGUnO1xuaW1wb3J0IHBhcmFtZXRlcml6YWJsZSBmcm9tICcuLi9wbHVnaW5zL3BhcmFtZXRlcml6YWJsZSc7XG5pbXBvcnQgYW5jaG9yYWJsZSBmcm9tICcuLi9wbHVnaW5zL2FuY2hvcmFibGUnO1xuaW1wb3J0IG9iamVjdGFibGUgZnJvbSAnLi4vcGx1Z2lucy9vYmplY3RhYmxlJztcblxubGV0IHBsdWdpbnMgPSBbXG4gIG9iamVjdGFibGUsXG4gIHBhcmFtZXRlcml6YWJsZSxcbiAgYW5jaG9yYWJsZSxcbiAgcm91dGFibGUsXG4gIGRhdGFibGUsXG4gIGJpbmRhYmxlXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTm9kZXMoc2NvcGUsIG5vZGUsIGRlcHRoKSB7XG4gIGZvcihjb25zdCBwbHVnaW4gb2YgcGx1Z2lucykge1xuICAgIHBsdWdpbi50cmFuc2Zvcm0oey4uLnNjb3BlLmNvbnRleHQsIG5vZGUsIGRlcHRofSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRQbHVnaW5zKHNjb3BlKSB7XG4gIGZvcihjb25zdCBwbHVnaW4gb2YgcGx1Z2lucykge1xuICAgIHBsdWdpbi5sb2FkICYmIHBsdWdpbi5sb2FkKHNjb3BlLmNvbnRleHQpXG4gIH1cbiAgcmV0dXJuIHBsdWdpbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VQbHVnaW5zKGVudmlyb25tZW50KSB7XG4gIHJldHVybiBhc3luYyAoLi4udXNlclBsdWdpbnMpID0+IHtcbiAgICBwbHVnaW5zID0gW1xuICAgICAgLi4ubmV3IFNldChbLi4udXNlclBsdWdpbnMuZmxhdCgpLCAuLi5wbHVnaW5zXSlcbiAgICBdLmZpbHRlcigocGx1Z2luKSA9PiBwbHVnaW5bZW52aXJvbm1lbnRdKVxuICB9XG59IiwiY29uc3QgcHJlZml4ID0gJ251bGxzdGFjayc7XG5cbmV4cG9ydCBkZWZhdWx0IHByZWZpeDsiLCJpbXBvcnQgZXh0cmFjdExvY2F0aW9uIGZyb20gJy4uL3NoYXJlZC9leHRyYWN0TG9jYXRpb24nO1xuaW1wb3J0IGV4dHJhY3RQYXJhbVZhbHVlIGZyb20gJy4vZXh0cmFjdFBhcmFtVmFsdWUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZU1hdGNoZXModXJsLCByb3V0ZSkge1xuICBsZXQge3BhdGh9ID0gZXh0cmFjdExvY2F0aW9uKHVybCk7XG4gIGNvbnN0IHVybFBhdGhzID0gcGF0aC5zcGxpdCgnLycpO1xuICBjb25zdCByb3V0ZVBhdGhzID0gcm91dGUuc3BsaXQoJy8nKTtcbiAgY29uc3QgcGFyYW1zID0ge307XG4gIGNvbnN0IGxlbmd0aCA9IE1hdGgubWF4KHVybFBhdGhzLmxlbmd0aCwgcm91dGVQYXRocy5sZW5ndGgpO1xuICBsZXQgY2F0Y2hhbGwgPSBmYWxzZTtcbiAgZm9yKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYoY2F0Y2hhbGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH0gZWxzZSBpZiAocm91dGVQYXRoc1tpXSA9PT0gJyonKSB7XG4gICAgICBjYXRjaGFsbCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChyb3V0ZVBhdGhzW2ldICYmIHJvdXRlUGF0aHNbaV0uc3RhcnRzV2l0aCgnOicpKSB7XG4gICAgICBjb25zdCBrZXkgPSByb3V0ZVBhdGhzW2ldLnJlcGxhY2UoJzonLCAnJylcbiAgICAgIHBhcmFtc1trZXldID0gZXh0cmFjdFBhcmFtVmFsdWUodXJsUGF0aHNbaV0pO1xuICAgIH0gZWxzZSBpZiAocm91dGVQYXRoc1tpXSAhPT0gdXJsUGF0aHNbaV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBhcmFtcztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXJpYWxpemVQYXJhbSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdmFsdWUudG9KU09OICE9PSB1bmRlZmluZWQgPyB2YWx1ZS50b0pTT04oKSA6IHZhbHVlO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlcmlhbGl6ZVNlYXJjaChwYXJhbXMpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHBhcmFtcyk7XG4gIHJldHVybiBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgaWYocGFyYW1zW2tleV0gPT09IGZhbHNlIHx8ICEhcGFyYW1zW2tleV0pIHtcbiAgICAgIHJldHVybiBgJHtrZXl9PSR7cGFyYW1zW2tleV19YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSkuZmlsdGVyKChzZWdtZW50KSA9PiAhIXNlZ21lbnQpLmpvaW4oJyYnKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjYW1lbGl6ZShrZXkpIHtcbiAgcmV0dXJuIGtleS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16QS1aMC05XSsoLikvZywgKG0sIGNocikgPT4gY2hyLnRvVXBwZXJDYXNlKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga2ViYWJpemUoa2V5KSB7XG4gIHJldHVybiBrZXkucmVwbGFjZSgvKFthLXowLTldfCg/PVtBLVpdKSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59OyIsIlxuaW1wb3J0IFwiLi90YWlsd2luZC5jc3NcIjtcbmltcG9ydCBcIi4vaW5wdXQuY3NzXCI7XG5pbXBvcnQgSG9tZSBmcm9tIFwiLi9wYWdlcy9ob21lL0hvbWVcIjtcbmltcG9ydCBUYXBzIGZyb20gXCIuL3BhZ2VzL3RhcHMvVGFwc1wiO1xuaW1wb3J0IFByb2ZpbGUgZnJvbSBcIi4vcGFnZXMvcHJvZmlsZS9Qcm9maWxlXCI7XG5pbXBvcnQgTmZ0IGZyb20gXCIuL3BhZ2VzL25mdC9OZnRcIjtcbmltcG9ydCBBZG1pbiBmcm9tIFwiLi9wYWdlcy9hZG1pbi9BZG1pblwiO1xuaW1wb3J0IFd0ZiBmcm9tIFwiLi9wYWdlcy93dGYvV3RmXCI7XG5jbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIE51bGxzdGFjayB7XG4gIHN0YXRpYyBoYXNoID0gJ2YxOTk4MGEwYmExZTdkNTQwZTcyYzg1YmJhM2Y1N2E3JztcblxuICBwcmVwYXJlKGNvbnRleHQpIHtcbiAgICBjb250ZXh0Lm1vZGUgPSBcImRhcmtcIjtcbiAgICBjb250ZXh0Lm9wcG9zaXRlTW9kZSA9IFwibGlnaHRcIjtcbiAgfVxuXG4gIHJlbmRlcih7IHJvdXRlciwgbW9kZSB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxtYWluIGNsYXNzPVwidy1mdWxsIGJnLWJsYWNrIHRleHQtd2hpdGUgXCI+XG4gICAgICAgIDxIb21lIHJvdXRlPVwiL1wiPjwvSG9tZT5cbiAgICAgICAgPEhvbWUgcm91dGU9XCIvaG9tZVwiPjwvSG9tZT5cbiAgICAgICAgPFRhcHMgcm91dGU9XCIvdGFwc1wiPjwvVGFwcz5cbiAgICAgICAgPFByb2ZpbGUgcm91dGU9XCIvdGFwc1wiPjwvUHJvZmlsZT5cbiAgICAgICAgPE5mdCByb3V0ZT1cIi9uZnRcIj48L05mdD5cbiAgICAgICAgPFd0ZiByb3V0ZT1cIi93dGZcIj48L1d0Zj5cbiAgICAgICAgPEFkbWluIHJvdXRlPVwiL2FkbWluXCI+PC9BZG1pbj5cbiAgICAgIDwvbWFpbj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uO1xuIiwiXG5jbGFzcyBBY2NvdW50IGV4dGVuZHMgTnVsbHN0YWNrIHtcbiAgLy8gICBwcmVwYXJlKHsgcGFnZSB9OiBOdWxsc3RhY2tDbGllbnRDb250ZXh0KSB7XG4gIC8vICAgICBwYWdlLmxvY2FsZSA9ICdlbi1VUyc7XG4gIC8vICAgfVxuICBzdGF0aWMgaGFzaCA9ICc1MDNlOWE4MTU4NjIxNDcwNTU5NDA1OWViMDUyNWZiYSc7XG5cbiAgZ2V0VGFwKCkge1xuICAgIHJldHVybiAxLjM1NDtcbiAgfVxuXG4gIGdldEFkZHJlc3MoKSB7XG4gICAgcmV0dXJuIFwiMHg1YTc3My4uLjZmNTdjMFwiO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF4LXctWzE0cHhdIG1heC1oLVsxN3B4XVwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJ0YXAucG5nXCIgY2xhc3M9XCJvYmplY3QtY292ZXJcIj48L2ltZz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGwtMiB0ZXh0LXNtIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICB7dGhpcy5nZXRUYXAoKX17XCIgXCJ9XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1zaGFkb3ctd2hpdGUgZm9udC1tZWRpdW1cIj5UQVA8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtc2hhZG93LXdoaXRlXCI+e3RoaXMuZ2V0QWRkcmVzcygpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1heC13LVsxNHB4XSBtYXgtaC1bMTdweF1cIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiYWNjb3VudF9jaXJjbGUucG5nXCIgY2xhc3M9XCJvYmplY3QtY292ZXJcIj48L2ltZz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIiBwbC0yIGZvbnQtYm9sZFwiPiBNeSBhY2NvdW50PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudDtcbiIsImltcG9ydCBMb2dvIGZyb20gXCIuLi9sb2dvL0xvZ29cIjtcbmltcG9ydCBOYXYgZnJvbSBcIi4uL25hdi9OYXZcIjtcblxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgTnVsbHN0YWNrIHtcbiAgLy8gICBwcmVwYXJlKHsgcGFnZSB9OiBOdWxsc3RhY2tDbGllbnRDb250ZXh0KSB7XG4gIC8vICAgICBwYWdlLmxvY2FsZSA9ICdlbi1VUyc7XG4gIC8vICAgfVxuXG4gIHN0YXRpYyBoYXNoID0gJ2I1MDMyMmFlZWNkOGE0OWU1YTc2NDM0N2NhNTM0ZGI5JztcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxMb2dvPjwvTG9nbz5cblxuICAgICAgICAgIDxOYXY+PC9OYXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG4iLCJcbmNsYXNzIExvZ28gZXh0ZW5kcyBOdWxsc3RhY2sge1xuICAvLyAgIHByZXBhcmUoeyBwYWdlIH06IE51bGxzdGFja0NsaWVudENvbnRleHQpIHtcbiAgLy8gICAgIHBhZ2UubG9jYWxlID0gJ2VuLVVTJztcbiAgLy8gICB9XG5cbiAgc3RhdGljIGhhc2ggPSAnOGM0NGExZGRjODczODRmZTI5NWQ2MDI3Zjk1MDAwYjcnO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9udC1ib2xkIGxlYWRpbmctWzEzcHhdIHRleHQtWzEycHhdXCI+TkZUUyBGT1I8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb250LVsyMnB4XSBsZWFkaW5nLVsyMnB4XSB0cmFja2luZy1bMC4xNWVtXSBmb250LVsyNTBdXCI+XG4gICAgICAgICAgICAgIFNUQVJWSU5He1wiIFwifVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9udC1bMjJweF0gbGVhZGluZy1bMjJweF0gdHJhY2tpbmctWzAuMTVlbV0gZm9udC1bMjUwXVwiPlxuICAgICAgICAgICAgICBDSElMRFJFTlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dvO1xuIiwiXG5jbGFzcyBOYXYgZXh0ZW5kcyBOdWxsc3RhY2sge1xuICBzdGF0aWMgaGFzaCA9ICc2MTAzNmM4MWJiMTE2NjlmMmRmMGI0NjNkNWVmNDVjZSc7XG5cbiAgcmVuZGVyTGluayh7IHRpdGxlLCBocmVmLCB0YXJnZXQsIG1vYmlsZSwgb25jbGljayB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxlbGVtZW50XG4gICAgICAgIHRhZz17b25jbGljayA/IFwiYnV0dG9uXCIgOiBcImFcIn1cbiAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgdGFyZ2V0PXt0YXJnZXR9XG4gICAgICAgIHNvdXJjZT17dGhpc30gb25jbGljaz17b25jbGljayB8fCB7IGV4cGFuZGVkOiBmYWxzZSB9fVxuICAgICAgICBjbGFzcz17YHctZnVsbCBzbTp3LWF1dG8gYm9yZGVyLWIgc206Ym9yZGVyLTAgYm9yZGVyLWdyYXktMTAwIGRhcms6Ym9yZGVyLWdyYXktODAwIHAtMiBmb250LWxnIGhvdmVyOnRleHQteWVsbG93LTYwMCBpdGVtcy1jZW50ZXIgZmxleCBmb250LWxpZ2h0ICR7XG4gICAgICAgICAgbW9iaWxlID8gXCJzbTpoaWRkZW5cIiA6IFwiXCJcbiAgICAgICAgfWB9XG4gICAgICA+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgIDwvZWxlbWVudD5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKHsgcm91dGVyIH0pIHtcbiAgICBjb25zdCBMaW5rID0gdGhpcy5yZW5kZXJMaW5rO1xuICAgIGNvbnN0IHBhdGggPSBjb25zb2xlLmxvZyhyb3V0ZXIudXJsKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImZsZXhcIj5cbiAgICAgICAgPExpbmtcbiAgICAgICAgICBocmVmPXtcIi9ob21lXCJ9XG4gICAgICAgICAgdGl0bGU9e1wiSG9tZVwifVxuICAgICAgICAgIGNsYXNzPXtwYXRoID09PSBcIi9ob21lXCIgPyBcInRleHQtOXhsXCIgOiBcInRleHQtOXhsXCJ9XG4gICAgICAgIC8+XG4gICAgICAgIDxMaW5rIGhyZWY9e1wiL3d0ZlwifSB0aXRsZT17XCJXVEY/XCJ9IC8+XG4gICAgICAgIDxMaW5rIGhyZWY9e1wiL2V4cGxvcmVcIn0gdGl0bGU9e1wiRXhwbG9yZVwifSAvPlxuICAgICAgICA8TGluayBocmVmPXtcIi90YXBzXCJ9IHRpdGxlPXtcIlRBUHNcIn0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmF2O1xuIiwiaW1wb3J0IE51bGxzdGFjayBmcm9tICdudWxsc3RhY2snXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdWJlTWVkaXVtKCkge1xuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgd2lkdGg9XCIzMTlcIlxuICAgICAgaGVpZ2h0PVwiNDE0XCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMzE5IDQxNFwiXG4gICAgICBmaWxsPVwibm9uZVwiXG4gICAgPlxuICAgICAgPHBhdGhcbiAgICAgICAgZD1cIk00LjE3ODI0IDM5MS42NjlIMjkyLjg3TDMxNS4xOTQgNDEyLjVIMjkuNDUwOUw0LjE3ODI0IDM5MS42NjlaTTI5MS45NjEgMzg4LjY2OUgxLjVWMS41SDI5MS45NjFWMzg4LjY2OVpNMjk0Ljk2MSAzODkuNTE3VjMuOTIxODlMMzE3LjUgMjkuMDc3MVY0MTAuNTQ5TDI5NC45NjEgMzg5LjUxN1pcIlxuICAgICAgICBzdHJva2U9XCJ3aGl0ZVwiXG4gICAgICAgIHN0cm9rZS13aWR0aD1cIjNcIlxuICAgICAgICBzdHlsZT1cIiYjMTA7ICAgIGJhY2tncm91bmQ6IHJlZDsmIzEwO1wiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICApO1xufVxuIiwiaW1wb3J0IEhlYWRlciBmcm9tIFwiLi4vLi4vY29tbW9uL2hlYWRlci9IZWFkZXJcIjtcblxuY2xhc3MgQWRtaW4gZXh0ZW5kcyBOdWxsc3RhY2sge1xuICBzdGF0aWMgaGFzaCA9ICcyNDMyNzM0ZGZiNDA0NDk2ZGE4ODU2Njg3Yjc0NGQxMCc7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IEFjY291bnQgPSB0aGlzLnJlbmRlckFjY291bnQ7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxBY2NvdW50IC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgbXgtYXV0b1wiPlxuICAgICAgICAgIDxIZWFkZXI+PC9IZWFkZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBZG1pbjtcbiIsImltcG9ydCBBY2NvdW50IGZyb20gXCIuLi8uLi9jb21tb24vYWNjb3VudC9BY2NvdW50XCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuLi8uLi9jb21tb24vaGVhZGVyL0hlYWRlclwiO1xuaW1wb3J0IEhvbWVTcGxhc2ggZnJvbSBcIi4vSG9tZVNwbGFzaFwiO1xuXG5jbGFzcyBIb21lIGV4dGVuZHMgTnVsbHN0YWNrIHtcbiAgc3RhdGljIGhhc2ggPSAnM2UzYWJjZDhlN2RkZDE0NzI4ODViNWNiZGM2YjA2NWYnO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEFjY291bnQgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBteC1hdXRvXCI+XG4gICAgICAgICAgPEhlYWRlcj48L0hlYWRlcj5cbiAgICAgICAgICA8SG9tZVNwbGFzaD48L0hvbWVTcGxhc2g+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuIiwiaW1wb3J0IE51bGxzdGFjayBmcm9tICdudWxsc3RhY2snXG5pbXBvcnQgQ3ViZU1lZGl1bSBmcm9tIFwiLi4vLi4vY3ViZS9DdWJlTWVkaWFuXCI7XG5cbmNsYXNzIEhvbWVTcGxhc2ggZXh0ZW5kcyBOdWxsc3RhY2sge1xuICBzdGF0aWMgaGFzaCA9ICczNWJmOTgzYjI2MDM5MzkyMDFmMmJiMzZkMmZjMTFhYyc7XG5cbiAgcmVuZGVyQ1RBTGVmdCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlYWRpbmctWzMxcHhdIHRleHQtWzI1cHhdIGN0YWdsb3dcIj5cbiAgICAgICAgICBZb3VyIGtpbmRuZXNzIGNhbiBtYWtlIDxiciAvPlxuICAgICAgICAgIHRoZSB3b3JsZCBvZiBhIGRpZmZlcmVuY2UgPGJyIC8+XG4gICAgICAgICAgZm9yIGEgPG1hcms+IGNoaWxkJ3MgY3J5cHRvIHdhbGxldC48L21hcms+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIFRoZXkgbWF5IG5vdCBoYXZlIGZvb2QsIGJ1dCB5b3UgY2FuIGhlbHAgPGJyIC8+XG4gICAgICAgICAgYW4gTkZULWxlc3MgY2hpbGQgd2l0aCB0aGlzIGJ1eSBvbmUsIGdpdmUgb25lIDxiciAvPlxuICAgICAgICAgIG9wcG9ydHVuaXR5LiBFdmVyeSBjaGlsZCBkZXNlcnZlcyBhbiBORlRcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4gIHJlbmRlckNUQVJpZ2h0KCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICA8Q3ViZU1lZGl1bT48L0N1YmVNZWRpdW0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBDVEFMZWZ0ID0gdGhpcy5yZW5kZXJDVEFMZWZ0O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LXJvdyBqdXN0aWZ5LWV2ZW5seVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFzaXMtMS8yIG1kOmJhc2lzLTEvMlwiPlxuICAgICAgICAgIDxDVEFMZWZ0PjwvQ1RBTGVmdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYXNpcy0xLzIgbWQ6YmFzaXMtMS8yXCI+MDI8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZVNwbGFzaDtcbiIsImltcG9ydCBIZWFkZXIgZnJvbSBcIi4uLy4uL2NvbW1vbi9oZWFkZXIvSGVhZGVyXCI7XG5jbGFzcyBOZnQgZXh0ZW5kcyBOdWxsc3RhY2sge1xuICBzdGF0aWMgaGFzaCA9ICcyMDMxYjk5ODk0MmNkZjFiYzMwNWZiYmY3NzgyZGJkNCc7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IEFjY291bnQgPSB0aGlzLnJlbmRlckFjY291bnQ7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxBY2NvdW50IC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgbXgtYXV0b1wiPlxuICAgICAgICAgIDxIZWFkZXI+PC9IZWFkZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOZnQ7XG4iLCJpbXBvcnQgSGVhZGVyIGZyb20gXCIuLi8uLi9jb21tb24vaGVhZGVyL0hlYWRlclwiO1xuY2xhc3MgUHJvZmlsZSBleHRlbmRzIE51bGxzdGFjayB7XG4gIHN0YXRpYyBoYXNoID0gJzIzNWZiMmE0NGRhNjI2NWU5MTNhOWI4YzhjZjA1M2M4JztcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgQWNjb3VudCA9IHRoaXMucmVuZGVyQWNjb3VudDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEFjY291bnQgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBteC1hdXRvXCI+XG4gICAgICAgICAgPEhlYWRlcj48L0hlYWRlcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGU7XG4iLCJpbXBvcnQgSGVhZGVyIGZyb20gXCIuLi8uLi9jb21tb24vaGVhZGVyL0hlYWRlclwiO1xuY2xhc3MgVGFwcyBleHRlbmRzIE51bGxzdGFjayB7XG4gIHN0YXRpYyBoYXNoID0gJ2Q3ODY4Y2M2YzRkYmM2MjRmZmI2NGFjYTY5MmI1YTEwJztcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgQWNjb3VudCA9IHRoaXMucmVuZGVyQWNjb3VudDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEFjY291bnQgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lciBteC1hdXRvXCI+XG4gICAgICAgICAgPEhlYWRlcj48L0hlYWRlcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhcHM7XG4iLCJpbXBvcnQgQWNjb3VudCBmcm9tIFwiLi4vLi4vY29tbW9uL2FjY291bnQvQWNjb3VudFwiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi4vLi4vY29tbW9uL2hlYWRlci9IZWFkZXJcIjtcbmNsYXNzIFd0ZiBleHRlbmRzIE51bGxzdGFjayB7XG4gIHN0YXRpYyBoYXNoID0gJ2NkMTk2NmVkZDMzNGQ0MjA4MzMwNDE1MGI5Nzc1YzcwJztcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxBY2NvdW50IC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgbXgtYXV0b1wiPlxuICAgICAgICAgIDxIZWFkZXI+PC9IZWFkZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXdGY7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBOdWxsc3RhY2sgZnJvbSAnbnVsbHN0YWNrJztcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL3NyYy9BcHBsaWNhdGlvbic7XG5cbmNvbnN0IGNvbnRleHQgPSBOdWxsc3RhY2suc3RhcnQoQXBwbGljYXRpb24pO1xuXG5jb250ZXh0LnN0YXJ0ID0gYXN5bmMgZnVuY3Rpb24gc3RhcnQoKSB7XG4gIC8vIGh0dHBzOi8vbnVsbHN0YWNrLmFwcC9hcHBsaWNhdGlvbi1zdGFydHVwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRleHQ7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9