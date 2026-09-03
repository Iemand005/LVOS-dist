"use strict";
if (typeof HTMLElement != "undefined") {
  if (!HTMLElement.prototype.createAttribute) HTMLElement.prototype.createAttribute = function(attribute) {
    this.setAttribute(attribute, null);
  };
  if (!HTMLElement.prototype.toggleAttribute) HTMLElement.prototype.toggleAttribute = function(attribute, force) {
    if (typeof force == "undefined" ? force = !this.hasAttribute(attribute) : force) this.createAttribute(attribute);
    else this.removeAttribute(attribute);
    return !force;
  };
}
if (!Array.prototype.fill) Array.prototype.fill = function(value, from, to) {
  for (var index = typeof from != "undefined" ? Number(from) : 0; index < Number(typeof to != "undefined" ? to : this.length); index++) this[index] = value;
  return this;
};
if (typeof MutationObserver == "undefined") window.MutationObserver = function(callback) {
  this.observe = function(target, options) {
    target.addEventListener("DOMNodeInserted", callback, false);
  };
  this.disconnect = function(target, options) {
  };
  this.takeRecords = function() {
    return [];
  };
};
function CompatibilityChecker() {
  this.checkClasses = function() {
    try {
      eval("class c{}");
    } catch (e) {
      return false;
    }
    return true;
  };
}
if (!Object.hasOwn) Object.hasOwn = function(o, v) {
  return o.hasOwnProperty(v);
};
function forEachIn(callback) {
  for (var i in this) if (Object.hasOwn(this, i)) callback(this[i], i, this);
}
function forEachIndexed(callbackfn, thisArg) {
  for (var i = 0; i < this.length; ++i) callbackfn.call(thisArg, this[i], i, this);
}
if (!Array.prototype.forEach) Array.prototype.forEach = forEachIndexed;
if (!NodeList.prototype.forEach) NodeList.prototype.forEach = forEachIndexed;
if (!Object.defineProperty) {
  Object.defineProperty = function(o, key, attributes) {
    if (!attributes || !(o instanceof Object)) return;
    if (attributes.get) o.__defineGetter__(key, attributes.get);
    if (attributes.set) o.__defineSetter__(key, attributes.set);
  };
} else {
  try {
    Object.defineProperty({}, "__test__", { value: true });
  } catch (ex) {
    Object.defineProperty = function(o, key, attributes) {
      if (!attributes || !(o instanceof Object)) return;
      if ("value" in attributes) o[key] = attributes.value;
    };
  }
}
if (!document.querySelectorAll) document.querySelectorAll = function(selector) {
  return document.getElementsByTagName(selector);
};
if (!document.querySelector) document.querySelector = function(selector) {
  return document.querySelectorAll(selector)[0];
};
function getElementsByClassName() {
  return function(className) {
    var results = [];
    var all = this.getElementsByTagName("*");
    var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
    for (var i = 0; i < all.length; i++) {
      if (pattern.test(all[i].className)) results.push(all[i]);
    }
    return results;
  };
}
if (typeof document != "undefined" && !document.getElementsByClassName) {
  document.getElementsByClassName = getElementsByClassName();
}
if (typeof Document != "undefined" && Document.prototype && !Document.prototype.getElementsByClassName) {
  Document.prototype.getElementsByClassName = getElementsByClassName();
}
if (typeof Element != "undefined" && !Element.prototype.getElementsByClassName) {
  Element.prototype.getElementsByClassName = function(className) {
    var results = [];
    var all = this.getElementsByTagName("*");
    var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
    for (var i = 0; i < all.length; i++) {
      if (pattern.test(all[i].className)) results.push(all[i]);
    }
    return results;
  };
}
if (!Function.prototype.bind) Function.prototype.bind = function(thisArg) {
  var fn = this;
  var slice = Array.prototype.slice;
  var args = slice.call(arguments, 1);
  return function() {
    var finalArgs = args.concat(slice.call(arguments));
    return fn.apply(thisArg, finalArgs);
  };
};
if (typeof console == "undefined") {
  console = {
    log: function(message) {
    },
    warn: function(message) {
    },
    error: function(message) {
      alert("Error: " + message);
    }
  };
}
if (typeof HTMLElement != "undefined" && !("classList" in document.documentElement)) {
  Object.defineProperty(HTMLElement.prototype, "classList", {
    get: function() {
      var self = this;
      function getClassesArray() {
        return self.className.split(" ").filter(function(value) {
          return value.length > 0;
        });
      }
      var api = {
        add: function(className) {
          if (!api.contains(className)) {
            self.className += (self.className ? " " : "") + className;
          }
        },
        remove: function(className) {
          var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
          self.className = self.className.replace(reg, " ").replace(/^\s+|\s+$/g, "");
        },
        contains: function(className) {
          return new RegExp("(\\s|^)" + className + "(\\s|$)").test(self.className);
        },
        toggle: function(className) {
          if (api.contains(className)) {
            api.remove(className);
          } else {
            api.add(className);
          }
        }
      };
      Object.defineProperty(api, "length", {
        get: function() {
          return getClassesArray().length;
        },
        configurable: true,
        enumerable: true
      });
      return api;
    },
    configurable: true,
    enumerable: true
  });
}
Object.defineProperty(Object.prototype, "forEach", { value: forEachIndexed });
if (!Array.prototype.find) NodeList.prototype.find = Array.prototype.find = find;
function find(callback) {
  for (var index in this) if (this.hasOwnProperty(index) && callback(this[index], index, this)) return this[index];
}
if (typeof Document != "undefined" && Document.prototype && !Document.prototype.elementsFromPoint) {
  Document.prototype.elementsFromPoint = Document.prototype.msElementsFromPoint || function(x, y) {
    return this.msElementsFromPoint ? this.msElementsFromPoint(x, y) : [];
  };
}
if (!navigator.getUserMedia) navigator.getUserMedia = navigator.webkitGetUserMedia;
if (!String.prototype.repeat) String.prototype.repeat = function(e) {
  if (typeof this == "undefined") throw new TypeError("String.prototype.repeat called on null or undefined");
  var result = "";
  for (var i = 0; i < e; i++) result += this;
  return result;
};
if (typeof URLSearchParams == "undefined") {
  window.URLSearchParams = function(search) {
    var items = search.replace("?", "").split("&");
    this._data = /* @__PURE__ */ new Map();
    var self = this;
    items.forEach(function(item) {
      var kv = item.split("=");
      if (kv.length != 2) return;
      var key = kv[0];
      var value = kv[1];
      self._data.set(key, value);
    });
  };
  URLSearchParams.prototype.get = function(key) {
    return this._data.get(key);
  };
  Object.defineProperty(URLSearchParams.prototype, "size", { get: function() {
    return this._data.size;
  } });
}
if (!document.elementsFromPoint) document.elementsFromPoint = function(point) {
  console.log("Point", point);
};
if (typeof Array.from != "function") {
  var arrayFromPolyfill = function(arrayLike) {
    var newArray = [];
    if (!arrayLike || typeof arrayLike.length != "number") return newArray;
    for (var i = 0; i < arrayLike.length; i++) newArray.push(arrayLike[i]);
    return newArray;
  };
  Array.from = arrayFromPolyfill;
  try {
    Object.defineProperty(Array, "from", {
      value: arrayFromPolyfill,
      configurable: true,
      writable: true
    });
  } catch (ex) {
    Array.from = arrayFromPolyfill;
  }
}
(function() {
  var lastTime = 0;
  if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
    var currTime = (/* @__PURE__ */ new Date()).getTime();
    var fps = 60;
    var timeToCall = Math.max(0, 1e3 / fps - (currTime - lastTime));
    var id = window.setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
})();
(function() {
  if (typeof window.Promise == "function")
    return;
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  function ES3Promise(executor) {
    if (typeof executor != "function") {
      throw new TypeError("Promise resolver is geen functie");
    }
    var self = this;
    self._state = PENDING;
    self._value = void 0;
    self._deferreds = [];
    function resolve(newValue) {
      try {
        if (newValue && (typeof newValue == "object" || typeof newValue == "function")) {
          var then = newValue.then;
          if (typeof then == "function") {
            then.call(newValue, resolve, reject);
            return;
          }
        }
        if (self._state !== PENDING) return;
        self._state = FULFILLED;
        self._value = newValue;
        self._handleDeferreds();
      } catch (e) {
        reject(e);
      }
    }
    function reject(reason) {
      if (self._state !== PENDING) return;
      self._state = REJECTED;
      self._value = reason;
      self._handleDeferreds();
    }
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  ES3Promise.prototype._handleDeferreds = function() {
    var self = this;
    if (self._state === PENDING) return;
    setTimeout(function() {
      while (self._deferreds.length > 0) {
        var deferred = self._deferreds.shift();
        var callback = self._state === FULFILLED ? deferred.onFulfilled : deferred.onRejected;
        if (typeof callback != "function") {
          if (self._state === FULFILLED) {
            deferred.resolve(self._value);
          } else {
            deferred.reject(self._value);
          }
          continue;
        }
        try {
          var ret = callback(self._value);
          deferred.resolve(ret);
        } catch (err) {
          deferred.reject(err);
        }
      }
    }, 0);
  };
  ES3Promise.prototype["then"] = function(onFulfilled, onRejected) {
    var self = this;
    return new ES3Promise(function(resolve, reject) {
      self._deferreds.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      });
      self._handleDeferreds();
    });
  };
  ES3Promise.prototype["catch"] = function(onRejected) {
    return this["then"](null, onRejected);
  };
  ES3Promise.resolve = function(value) {
    return new ES3Promise(function(resolve) {
      resolve(value);
    });
  };
  ES3Promise.reject = function(reason) {
    return new ES3Promise(function(resolve, reject) {
      reject(reason);
    });
  };
  window.Promise = ES3Promise;
})();
(function() {
  if (window.addEventListener) return;
  function patch(target) {
    if (!target) return;
    if (!target._ieListeners) {
      target._ieListeners = [];
    }
    target.addEventListener = function(type, listener) {
      var self = this;
      var eventType = "on" + type;
      var wrapped = function() {
        var event = window.event;
        if (!event.target) {
          event.target = event.srcElement;
        }
        if (!event.preventDefault) {
          event.preventDefault = function() {
            event.returnValue = false;
          };
        }
        if (!event.stopPropagation) {
          event.stopPropagation = function() {
            event.cancelBubble = true;
          };
        }
        if (typeof listener == "function") {
          listener.apply(self, [event]);
        } else {
          self._currentListener = listener;
          self._currentListener(event);
          self._currentListener = null;
        }
      };
      this._ieListeners.push({
        type,
        original: listener,
        wrapped
      });
      this.attachEvent(eventType, wrapped);
    };
    target.removeEventListener = function(type, listener) {
      var eventType = "on" + type;
      if (!this._ieListeners) return;
      for (var i = 0; i < this._ieListeners.length; i++) {
        var item = this._ieListeners[i];
        if (item.type === type && item.original === listener) {
          this.detachEvent(eventType, item.wrapped);
          this._ieListeners.splice(i, 1);
          return;
        }
      }
    };
  }
  patch(window);
  patch(document);
  patch(Element.prototype);
})();
(function() {
  if (Element.prototype.getBoundingClientRect) {
    return;
  }
  function getRect(el) {
    var x = 0;
    var y = 0;
    var w = el.offsetWidth || 0;
    var h = el.offsetHeight || 0;
    var node = el;
    while (node) {
      x += node.offsetLeft || 0;
      y += node.offsetTop || 0;
      node = node.offsetParent;
    }
    x -= document.body.scrollLeft || document.documentElement.scrollLeft || 0;
    y -= document.body.scrollTop || document.documentElement.scrollTop || 0;
    return {
      left: x,
      top: y,
      right: x + w,
      bottom: y + h,
      width: w,
      height: h
    };
  }
  Element.prototype.getBoundingClientRect = function() {
    return getRect(this);
  };
})();
if (typeof window.HTMLElement == "undefined") window.HTMLElement = Element;
if (typeof window.HTMLTemplateElement == "undefined") window.HTMLTemplateElement = function() {
};
function Launchpad() {
  this.launchpad = null;
  this.list = document.createElement("ul");
  this._isMobile = true;
}
function MobileFrameManager() {
  this._frames = {};
  this._activeId = null;
  this._container = null;
}
MobileFrameManager.prototype.init = function(container) {
  this._container = container;
};
MobileFrameManager.prototype.open = function(app) {
  if (!app.id || !app.src || !this._container) return;
  if (this._frames[app.id]) {
    this._showFrame(app.id);
    return;
  }
  var frame = document.createElement("iframe");
  frame.setAttribute("frameborder", "0");
  frame.src = app.src;
  this._frames[app.id] = frame;
  this._container.appendChild(frame);
  this._showFrame(app.id);
};
MobileFrameManager.prototype._showFrame = function(id) {
  if (!this._container) return;
  var keys = Object.keys(this._frames);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    this._frames[key].style.display = key === id ? "block" : "none";
  }
  this._activeId = id;
  this._container.classList.add("open");
};
MobileFrameManager.prototype.hide = function() {
  if (!this._container) return;
  this._container.classList.remove("open");
};
MobileFrameManager.prototype.goBack = function() {
  if (!this._activeId) return false;
  var frame = this._frames[this._activeId];
  if (frame && frame.contentWindow) {
    frame.contentWindow.history.back();
    return true;
  }
  return false;
};
MobileFrameManager.prototype.getActiveFrame = function() {
  if (!this._activeId) return null;
  return this._frames[this._activeId] || null;
};
MobileFrameManager.prototype.getActiveId = function() {
  return this._activeId;
};
var mobileFrameManager = new MobileFrameManager();
window.mobileFrameManager = mobileFrameManager;
Launchpad.prototype.init = function(launchpad2) {
  var closeButton = document.createElement("button");
  var self = this;
  closeButton.onclick = function() {
    self.close();
  };
  closeButton.textContent = "Close";
  launchpad2.appendChild(closeButton);
  launchpad2.appendChild(this.list);
  this.launchpad = launchpad2;
  var container = document.getElementById("main-frame");
  if (container) mobileFrameManager.init(container);
};
Launchpad.prototype.open = function() {
  if (!this.launchpad) return;
  this.launchpad.classList.add("open");
};
Launchpad.prototype.close = function() {
  if (!this.launchpad) return;
  this.launchpad.classList.remove("open");
};
Launchpad.prototype._createMobileButton = function(app) {
  var title = app && app.title || "?";
  var openButton = document.createElement("button");
  openButton.appendChild(document.createTextNode(title.charAt(0).toUpperCase()));
  if (app && app.accentColor) openButton.style.background = app.accentColor;
  var iconUrl = app && app.iconUrl;
  if (iconUrl) {
    var icon = document.createElement("img");
    icon.onload = function() {
      openButton.textContent = "";
      openButton.appendChild(icon);
    };
    icon.src = iconUrl;
    icon.alt = app.title + " Logo";
  }
  return openButton;
};
Launchpad.prototype.addApp = function(app) {
  var appElement = document.createElement("li");
  if (this._isMobile) {
    var openButton = this._createMobileButton(app);
    appElement.appendChild(openButton);
    openButton.onclick = function() {
      mobileFrameManager.open(app);
    };
    var appLabel = document.createElement("label");
    appLabel.textContent = app && app.title || "Unknown";
    appElement.appendChild(appLabel);
  } else {
    var openButton = app.createOpenButton();
    appElement.appendChild(openButton);
  }
  this.list.appendChild(appElement);
};
Object.defineProperty(Launchpad.prototype, "isMobile", {
  get: function() {
    return this._isMobile;
  },
  set: function(value) {
    this._isMobile = value;
  }
});
var canSave = true;
var hasLocalStorage = false;
try {
  hasLocalStorage = typeof localStorage !== "undefined";
} catch (ex) {
  hasLocalStorage = false;
}
if (!hasLocalStorage) canSave = false;
function isElement(object) {
  return object && "nodeType" in object;
}
function getFaviconUrl(url) {
  var m = url.match(/^([a-z]+:\/\/[^\/]+)/i);
  return (m ? m[1] : url) + "/favicon.ico";
}
function getDomain(url) {
  return url.replace(/^[a-z]+:\/\//i, "").split("/")[0].split("?")[0];
}
function getSiteName(url) {
  var domain = url.replace(/^[a-z]+:\/\//i, "").split("/")[0].split("?")[0];
  var parts = domain.split(".");
  var name = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}
function handleStorageException(exception) {
  console.error(exception);
  console.warn("A problem occurred, app state saving has been disabled for this session.");
  canSave = false;
}
function AppRegistry() {
  this._apps = {};
}
AppRegistry.prototype.addApp = function(app) {
  if (!app || typeof app !== "object") return;
  if (!app.id) app.id = app.title || "unknown";
  this._apps[app.id] = app;
};
AppRegistry.prototype.addApps = function() {
  for (var i = 0; i < arguments.length; i++) {
    var arr = arguments[i];
    if (arr instanceof Array)
      for (var j = 0; j < arr.length; j++)
        this.addApp(arr[j]);
  }
};
AppRegistry.prototype.getApp = function(id) {
  if (!id) return null;
  return this._apps[id] || null;
};
AppRegistry.prototype.removeApp = function(id) {
  if (!id) return;
  delete this._apps[id];
};
AppRegistry.prototype.forEachApp = function(callback) {
  if (typeof callback !== "function") return;
  for (var id in this._apps)
    if (this._apps.hasOwnProperty(id))
      callback(this._apps[id], id);
};
Object.defineProperty(AppRegistry.prototype, "apps", {
  get: function() {
    return this._apps;
  }
});
Object.defineProperty(AppRegistry.prototype, "installedApps", {
  get: function() {
    if (!hasLocalStorage) return [];
    try {
      var string = localStorage.getItem("installedApps");
      if (string === null) return [];
      var apps = JSON.parse(string);
      return apps instanceof Array ? apps : [];
    } catch (exception) {
      if (exception instanceof Error) console.error(exception.message);
      return [];
    }
  }
});
AppRegistry.prototype.saveApp = function(app) {
  if (!canSave || !hasLocalStorage) return;
  if (!app || typeof app !== "object" || !app.id) return;
  try {
    var apps = this.installedApps;
    for (var i = 0; i < apps.length; i++) {
      if (apps[i].id === app.id) return;
    }
    apps.push(app);
    localStorage.setItem("installedApps", JSON.stringify(apps));
  } catch (exception) {
    handleStorageException(exception);
  }
};
AppRegistry.prototype.loadApps = function() {
  if (!canSave || !hasLocalStorage) return;
  var self = this;
  try {
    var apps = this.installedApps;
    for (var i = 0; i < apps.length; i++) {
      var app = apps[i];
      if (app && app.src) self.addApp(app);
    }
  } catch (exception) {
    handleStorageException(exception);
  }
};
AppRegistry.prototype.createApp = function(url, title, id, iconUrl) {
  var app = {
    src: url,
    id: id || "custom." + getDomain(url),
    title: title || getSiteName(url)
  };
  if (iconUrl) app.iconUrl = iconUrl;
  return app;
};
AppRegistry.prototype.setWallpaper = function(id) {
  var wallpaperFrame = document.getElementById("wallpaper-frame");
  if (!(wallpaperFrame instanceof HTMLIFrameElement)) return;
  var app = this.getApp(id);
  if (!app) return;
  wallpaperFrame.src = app.src;
};
var appRegistry = new AppRegistry();
window.appRegistry = appRegistry;
"use strict";
function LVMessenger() {
}
LVMessenger.broadcast = function(target, type, message, id) {
  if (target && "JSON" in window) target.postMessage(JSON.stringify({ type, data: message, id }), "*");
};
LVMessenger.receive = function(callback, destroyWhenType) {
  var messageListener = function(ev) {
    try {
      var data = typeof ev.data === "string" ? JSON.parse(ev.data) : ev.data;
      if (data.type) switch (data.type) {
        default:
          callback(data.type, data.data, data.id);
          break;
        case "identify":
          console.log("Reveived an identity request", ev);
          var identity = { name: "LVOS" };
          if (ev.source instanceof Window && typeof ev.source.postMessage === "function")
            LVMessenger.broadcast(ev.source, "identity", identity);
          else console.warn("Couldn't send identity request!", ev);
          break;
      }
      if (data.type === destroyWhenType) this.window.removeEventListener("message", messageListener);
    } catch (ex) {
      console.warn("Error decoding data", ev.data, ex);
    }
  };
  window.addEventListener("message", messageListener, false);
  return messageListener;
};
function getParentWindow() {
  return window.parent && window.parent !== window ? window.parent : window.top;
}
LVMessenger.broadcastToParent = function(type, message, id) {
  var target = getParentWindow();
  try {
    if (target && typeof target.__LVMessengerReceive === "function")
      target.__LVMessengerReceive(type, message, id);
  } catch (ex) {
    console.warn("Direct parent bridge failed, falling back to postMessage.", ex);
    if (target) LVMessenger.broadcast(target, type, message, id);
  }
};
LVMessenger.broadcastToChild = function(type, iFrame, message) {
  if (iFrame.contentWindow) LVMessenger.broadcast(iFrame.contentWindow, type, message);
};
LVMessenger.onHostBeingLVOS = function(callback) {
  try {
    LVMessenger.receive(function(type, data) {
      if (type === "identity" && data.name === "LVOS") callback();
    }, "identity");
    LVMessenger.broadcastToParent("identify");
  } catch (ex) {
    console.warn("Failed to request host OS", ex);
  }
};
LVMessenger.registerThemeChangeHandler = function() {
  LVMessenger.receive(function(message, data) {
    if (message === "theme")
      document.body.className = data.className;
  });
};
"use strict";
var STORAGE_FILE = "app_storage.json";
function formatCamelCase(text) {
  if (!text) return "";
  var result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
var supportsActiveX = typeof ActiveXObject != "undefined";
function ActiveXStorage() {
  if (!window.ActiveXObject) throw new Error("ActiveX not supported!");
  this.fso = new window.ActiveXObject("Scripting.FileSystemObject");
}
ActiveXStorage.prototype.setItem = function(key, value) {
  var data = {};
  if (this.fso.FileExists(STORAGE_FILE)) {
    try {
      var readFile = this.fso.OpenTextFile(STORAGE_FILE, 1);
      data = JSON.parse(readFile.ReadAll());
      readFile.Close();
    } catch (e) {
      data = {};
    }
  }
  data[key] = value;
  var writeFile = this.fso.OpenTextFile(STORAGE_FILE, 2, true);
  writeFile.Write(JSON.stringify(data));
  writeFile.Close();
};
ActiveXStorage.prototype.getItem = function(key) {
  if (!this.fso.FileExists(STORAGE_FILE)) return null;
  try {
    var readFile = this.fso.OpenTextFile(STORAGE_FILE, 1);
    var data = JSON.parse(readFile.ReadAll());
    readFile.Close();
    return data[key] !== void 0 ? data[key] : null;
  } catch (e) {
    return null;
  }
};
function SettingsHandler() {
  this.storage = typeof localStorage != "undefined" && localStorage || supportsActiveX && new ActiveXStorage();
}
SettingsHandler.prototype.get = function(key) {
  if (!this.storage) return null;
  var value = this.storage.getItem(key);
  if (value == null) return null;
  try {
    return JSON.parse(value);
  } catch (ex) {
    return value;
  }
};
SettingsHandler.prototype.set = function(key, value) {
  if (this.storage) this.storage.setItem(key, value);
};
SettingsHandler.prototype.saveFlags = function(flags2) {
  var saved = {};
  for (var flagId in flags2) {
    if (!flags2.hasOwnProperty(flagId) || flagId.charAt(0) === "_") continue;
    saved[flagId] = flags2[flagId];
  }
  this.set("flags", JSON.stringify(saved));
};
SettingsHandler.prototype.restoreFlags = function(flags2) {
  var saved = this.get("flags");
  if (!saved || typeof saved != "object") return;
  for (var flagId in saved) {
    if (!saved.hasOwnProperty(flagId)) continue;
    if (typeof flags2[flagId] == "boolean" && typeof saved[flagId] == "boolean") {
      flags2[flagId] = saved[flagId];
    }
  }
};
SettingsHandler.prototype.loadFlags = function(flags2) {
  var handler = this;
  handler.restoreFlags(flags2);
  var flagsElement = document.createElement("ul");
  for (var flagId in flags2) {
    if (!flags2.hasOwnProperty(flagId) || flagId.charAt(0) === "_") continue;
    var flag = flags2[flagId];
    var settingElement = document.createElement("label");
    var flagValue = flags2[flagId];
    switch (typeof flag) {
      case "boolean":
        var row = document.createElement("li");
        (function(currentKey) {
          var toggle = document.createElement("input");
          toggle.type = "checkbox";
          toggle.id = "flag-" + flagId;
          toggle.checked = flagValue;
          toggle.addEventListener("change", function() {
            flags2[currentKey] = toggle.checked;
            handler.saveFlags(flags2);
          }, false);
          var label = document.createElement("label");
          label.htmlFor = toggle.id;
          label.appendChild(document.createTextNode(formatCamelCase(flagId)));
          row.appendChild(toggle);
          row.appendChild(label);
          flagsElement.appendChild(row);
        })(flagId);
        break;
    }
    if (!settingElement) return;
    flagsElement.appendChild(settingElement);
  }
  var settingsElement = document.getElementById("settings");
  if (settingsElement) settingsElement.appendChild(flagsElement);
};
var settings = new SettingsHandler();
var THEMES = ["blur", "default-theme", "flippy", "glass", "gnome", "mac-os", "mica", "modern", "modern-blur", "windows", "windows-10", "windows-11", "windows-95"];
var BASE_THEMES = {
  "windows-95": "windows",
  "windows-10": "windows",
  "windows-11": "windows",
  "mac-os": "modern"
};
function applyStartButtonIcon(theme) {
  var startButton = document.getElementById("start-button");
  if (!startButton) return;
  if (theme === "windows-10") {
    var logoIcon = document.createElement("img");
    logoIcon.onload = function() {
      if (startButton) {
        startButton.innerText = "";
        startButton.appendChild(logoIcon);
      }
    };
    logoIcon.src = "Assets/Windows-10.svg";
  } else if (startButton.getElementsByTagName("img").length) {
    startButton.innerText = "Start";
  }
}
function setThemeOption(theme) {
  var previous = settings.get("theme");
  var blurWasOn = previous === "blur" || previous === "glass" || previous === "modern-blur";
  var previousBase = BASE_THEMES[previous];
  if (previous && previous !== theme) {
    if (THEMES.indexOf(previous) !== -1) DesktopManager.removeTheme(previous);
    if (previous === "glass") DesktopManager.removeTheme("blur");
    if (previous === "modern-blur") {
      DesktopManager.removeTheme("blur");
      DesktopManager.removeTheme("modern");
    }
    if (previousBase) DesktopManager.removeTheme(previousBase);
  }
  if (theme && THEMES.indexOf(theme) !== -1) {
    if (theme !== "modern-blur") setTheme(theme);
    if (theme === "glass") setTheme("blur");
    if (theme === "modern-blur") {
      setTheme("modern");
      setTheme("blur");
    }
    if (BASE_THEMES[theme]) setTheme(BASE_THEMES[theme]);
    applyStartButtonIcon(theme);
    settings.set("theme", theme);
  } else {
    DesktopManager.removeTheme("blur");
    DesktopManager.removeTheme("glass");
    settings.set("theme", "");
  }
  if (theme === "blur" || theme === "glass") DesktopManager.removeTheme("modern");
  else if (blurWasOn && theme !== "modern-blur") setTheme("modern");
}
function toggleColorDebug(enabled) {
  document.body.classList.toggle("color-debug", enabled);
  settings.set("color-debug", enabled);
}
function toggleSquircles(enabled) {
  document.body.classList.toggle("squircles", enabled);
  settings.set("squircles", enabled);
}
function toggleCharmsEvent(ev) {
}
function setBorderSize(size) {
  settings.set("borderSize", size);
  if (typeof windowManager !== "undefined" && windowManager.windows) {
    for (var index in windowManager.windows) windowManager.windows[index].borderSize = size;
  }
}
function hexToRGB(hex) {
  if (typeof hex == "undefined" || !hex) return;
  var bla = 0;
  return { r: bla >> 16 & 255, g: bla >> 8 & 255, b: bla & 255 };
}
function isColorDark(color) {
  if (typeof color == "undefined") return;
  var rgb = hexToRGB(color);
  if (!rgb) return false;
  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b < 128;
}
function setColor(color) {
  if (typeof color == "undefined" || !(elements.color instanceof HTMLInputElement)) return;
  settings.set("color", elements.color.value = color);
  var isWhite = isColorDark(color);
  if (!("windowManager" in window)) return;
  for (var index in windowManager.windows) {
    var dialog = windowManager.windows[index];
    if (!dialog || !dialog.target) continue;
    var content = dialog.target.getElementsByTagName("content")[0];
    if (!(content instanceof HTMLElement)) continue;
    content.style.backgroundColor = color;
    content.style.color = isWhite ? "white" : "black";
  }
  if (window.metaThemeColor) window.metaThemeColor.setAttribute("content", color);
}
function setAccentColor(color) {
  if (!color) return;
  elements.accent.value = color;
  settings.set("accentColor", color);
  var isWhite = isColorDark(color);
  var metroStyle = document.getElementById("metro").style, charmStyle = document.getElementById("charms").style;
  metroStyle.backgroundColor = charmStyle.backgroundColor = color;
  metroStyle.color = charmStyle.color = isWhite ? "white" : "black";
}
function loadSettings() {
  loadThemeSetting();
  setColor(settings.get("color"));
  setAccentColor(settings.get("accentColor"));
  updateBlurState();
}
function loadThemeSetting() {
  var theme = settings.get("theme");
  if (THEMES.indexOf(theme) !== -1) {
    for (var i = 0; i < THEMES.length; i++) document.body.classList.remove(THEMES[i]);
    for (var base in BASE_THEMES) {
      if (BASE_THEMES.hasOwnProperty(base)) document.body.classList.remove(BASE_THEMES[base]);
    }
    if (theme !== "modern-blur") setTheme(theme);
    if (theme === "glass") setTheme("blur");
    if (theme === "modern-blur") {
      setTheme("modern");
      setTheme("blur");
    }
    if (BASE_THEMES[theme]) setTheme(BASE_THEMES[theme]);
    if (theme === "blur" || theme === "glass") removeTheme("modern");
    applyStartButtonIcon(theme);
    if (elements.theme) elements.theme.value = theme;
  }
  var colorDebug = settings.get("color-debug");
  if (typeof colorDebug == "boolean") {
    document.body.classList.toggle("color-debug", colorDebug);
    if (elements.colorDebug) elements.colorDebug.checked = colorDebug;
  }
  var squircles = settings.get("squircles");
  if (typeof squircles == "boolean") {
    document.body.classList.toggle("squircles", squircles);
    if (elements.squircles) elements.squircles.checked = squircles;
  }
}
function updateBlurState() {
}
function toggleBlur(enabled) {
  if (enabled == null) document.body.classList.toggle("blur");
  else document.body.classList.toggle("blur", enabled);
}
var elements = {
  desktop: null,
  charms: null,
  color: null,
  accent: null,
  resetColor: null,
  resetAccent: null,
  border: null,
  dockAppList: null,
  theme: null,
  colorDebug: null,
  squircles: null,
  noBlurFullscreen: null,
  installAppUrl: null,
  installAppButton: null,
  installAppProxiedButton: null
};
function installAppFromUrl(useProxy) {
  var url = (elements.installAppUrl && elements.installAppUrl.value || "").trim();
  if (!url) return;
  if (typeof appRegistry !== "undefined") {
    var app;
    if (useProxy) {
      var proxyUrl = "https://browz.netlify.app/browz-set-cookie/";
      app = appRegistry.createApp(
        proxyUrl + url,
        getSiteName(url),
        "custom." + getDomain(url),
        getFaviconUrl(url)
      );
    } else {
      app = appRegistry.createApp(url);
    }
    appRegistry.addApp(app);
    appRegistry.saveApp(app);
    if (elements.installAppUrl) elements.installAppUrl.value = "";
    return;
  }
  if (typeof windowManager !== "undefined") {
    if (useProxy && typeof windowManager.installAppProxied == "function") {
      windowManager.installAppProxied(url);
    } else if (typeof windowManager.installApp == "function") {
      windowManager.installApp(url);
    }
    if (elements.installAppUrl) elements.installAppUrl.value = "";
  }
}
function loadElements() {
  elements.desktop = document.getElementById("desktop");
  elements.charms = document.getElementById("charms");
  elements.color = document.getElementById("color");
  elements.accent = document.getElementById("accent");
  elements.resetColor = document.getElementById("resetaccent");
  elements.resetAccent = document.getElementById("resetaccent");
  elements.border = document.getElementById("border");
  elements.dockAppList = document.getElementById("dockapplist");
  elements.theme = document.getElementById("theme");
  elements.colorDebug = document.getElementById("color-debug");
  elements.squircles = document.getElementById("squircles");
  elements.noBlurFullscreen = document.getElementById("no-blur-fullscreen");
  elements.installAppUrl = document.getElementById("install-app-url");
  elements.installAppButton = document.getElementById("install-app-button");
  elements.installAppProxiedButton = document.getElementById("install-app-proxied-button");
  if (elements.border) elements.border.oninput = elements.border.onchange = function() {
    setBorderSize(this.value);
  };
  if (elements.accent) elements.accent.oninput = elements.accent.onchange = function() {
    setAccentColor(this.value);
  };
  if (elements.color) elements.color.oninput = elements.color.onchange = function() {
    setColor(this.value);
  };
  if (elements.theme) elements.theme.onchange = function() {
    setThemeOption(this.value);
  };
  if (elements.colorDebug) elements.colorDebug.onchange = function() {
    toggleColorDebug(this.checked);
  };
  if (elements.squircles) elements.squircles.onchange = function() {
    toggleSquircles(this.checked);
  };
  if (elements.noBlurFullscreen) elements.noBlurFullscreen.onchange = function() {
    toggleNoBlurFullscreen(this.checked);
  };
  if (elements.installAppButton) elements.installAppButton.onclick = function() {
    installAppFromUrl(false);
  };
  if (elements.installAppProxiedButton) elements.installAppProxiedButton.onclick = function() {
    installAppFromUrl(true);
  };
  if (elements.installAppUrl && elements.installAppUrl.form) {
    elements.installAppUrl.form.addEventListener("submit", function(event) {
      event.preventDefault();
      installAppFromUrl(false);
    }, false);
  }
  if (charmsButton) charmsButton.onclick = function() {
    DesktopManager.toggleCharms();
  };
  if (typeof flags !== "undefined") settings.loadFlags(flags);
}
addEventListener("load", function() {
  loadElements();
  loadSettings();
}, false);
var metroAppList = document.getElementById("metroapplist");
var applist = document.getElementById("applist");
var charmsButton = applist ? applist.appendChild(document.createElement("button")) : document.createElement("button");
charmsButton.textContent = "Settings";
window.addEventListener("mousedown", toggleCharmsEvent, false);
function downloadObject(object, fileName) {
  var uri = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
  var a = document.createElement("a");
  a.setAttribute("href", uri);
  a.setAttribute("download", fileName || "\xF6bject.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function downloadSettings() {
  downloadObject(localStorage);
}
"use strict";
var dockAppList = document.getElementById("dockapplist");
var applications = [
  {
    title: "Calculator",
    id: "calculator",
    minWidth: 180,
    minHeight: 240,
    src: "./Applications/Calculator/calculator.html"
  },
  { title: "Example", id: "0", src: "./example.html" },
  {
    title: "Camera",
    id: "camera",
    src: "./Applications/Camera/index.html",
    camera: true,
    microphone: true
    // add attribute allow="camera; microphone" to iframe!
  },
  {
    title: "Video",
    id: "video",
    src: "./Applications/Video/index.html",
    hidden: true
  },
  {
    title: "Cover Flow",
    id: "coverflow",
    src: "./Applications/Coverflow/Coverflow.html"
  },
  {
    title: "Music",
    id: "music",
    src: "./Applications/Music/index.html"
  },
  {
    title: "Citates",
    id: "citates",
    src: "./Applications/Citaten/index.html",
    hidden: true
    // Hiding the incomplete apps. These are enabled once finished.
  },
  {
    title: "Clock",
    id: "clock",
    src: "./Applications/Clock/index.html",
    hidden: true
  },
  {
    title: "Verlet",
    id: "verlet",
    src: "./Applications/Verlet/index.html",
    hidden: true
  },
  {
    title: "Recorder",
    id: "recorder",
    src: "./Applications/Recorder/index.html",
    hidden: true
  },
  {
    title: "Error",
    id: "error",
    src: "./Applications/Error/error.html",
    hidden: true
  },
  {
    title: "Cube",
    id: "cube",
    src: "./Applications/Cube/cube.html",
    hidden: true
  },
  {
    title: "Geode",
    id: "geode",
    src: "https://geode.tepartive.net",
    hidden: true
  },
  {
    title: "Level",
    id: "level",
    src: "./Applications/Level/level.html",
    hidden: true
  },
  {
    title: "Browser",
    id: "browser",
    src: "./Applications/Browser/index.html"
  },
  {
    title: "MPTool",
    id: "mptool",
    src: "./Applications/MPTool/index.html",
    hidden: true
  },
  {
    title: "Autostereograms",
    id: "stereograms",
    src: "./Applications/StereogramMaker/index.html",
    hidden: true
  },
  {
    title: "Metronome",
    id: "cyanide.metronome",
    src: "./Applications/Cyanide/metronome/index.html",
    hidden: true
  },
  {
    title: "Rainboy",
    id: "cyanide.rainboy",
    src: "./Applications/Cyanide/rainboy/index.html",
    hidden: true
  },
  {
    title: "OPC",
    id: "opc",
    src: "https://bypass-online.netlify.app/",
    iconUrl: "https://iemand005.github.io/OPC/files/apps/me.flexan.terminal/terminal.png",
    accentColor: "rgb(37, 104, 245)"
  },
  {
    title: "daedalOS",
    id: "daedal",
    src: "https://dustinbrett.com/"
  },
  {
    title: "Fenix Engine Demo",
    id: "fenix.web",
    src: "https://iemand005.github.io/FenixWeb/"
  },
  {
    title: "FoxCraft",
    id: "fenix.foxcraft",
    src: "https://iemand005.github.io/FenixWeb/FoxCraft/index.html"
  },
  {
    title: "Cake",
    id: "fenix.cake",
    src: "https://iemand005.github.io/FenixWeb/Cake/index.html",
    audioVisualizer: true
  },
  {
    title: "My Web Archive",
    id: "foxyz.archive",
    src: "https://iemand005.github.io/Archive-2023/index.html"
  },
  {
    title: "Tappy",
    id: "foxyz.tappy",
    // src: "https://iemand005.github.io/Tappy/tappy.html", // TODO: perhaps uh a prod vs dev env for github url and local
    src: "./Applications/Tappy/tappy.html",
    hidden: true
  },
  {
    title: "AIOne",
    id: "foxyz.aione",
    src: "./Applications/AIOneWeb/index.html",
    hidden: true
  },
  {
    title: "WebGPUFluidSim",
    id: "foxyz.webgpufluidsim",
    src: "./Applications/WebGPUFluidSim/index.html",
    moveEvents: true
  },
  {
    title: "Fur:Trash",
    id: "foxyz.fur:trash",
    src: "https://open.spotify.com/embed/artist/1jp7cmyHDn5nuP3MMSwm1m?utm_source=generator&si=86b6cf864e0048c3",
    iconUrl: "https://image-cdn-fa.spotifycdn.com/image/ab6761610000f1788c05c5ac8638f68f84053a57"
    // appIcon?
  },
  {
    title: "Cavetown",
    id: "foxyz.cavetown",
    src: "https://open.spotify.com/embed/artist/2hR4h1Cao2ueuI7Cx9c7V8?utm_source=generator&theme=0&si=714602d32e764d47",
    iconUrl: "https://image-cdn-fa.spotifycdn.com/image/ab6761610000f17845ec07bbcf1fed2a4747e780"
  },
  {
    title: "Monaco",
    id: "foxyz.monaco",
    src: "./Applications/Monaco/monaco.html"
  },
  {
    title: "Furzona Lite",
    id: "furzona",
    src: "https://iemand005.github.io/FurzonaWeb",
    iconUrl: "https://iemand005.github.io/FurzonaWeb/Logo.png"
  },
  {
    title: "The Useless Web",
    id: "theuselessweb",
    src: "https://theuselessweb.com/"
  },
  {
    title: "Windows 95",
    id: "win95",
    src: "https://98.js.org/"
  },
  {
    title: "Pinball Space Cadet",
    id: "pinball",
    src: "https://98.js.org/programs/pinball/space-cadet.html",
    iconUrl: "https://98.js.org/images/icons/pinball-16x16.png"
  },
  {
    title: "Internet Exporer",
    id: "ie",
    src: "https://98.js.org/programs/explorer/index.html?address=https%3A%2F%2Fwww.google.com",
    iconUrl: "https://98.js.org/images/icons/html-16x16.png"
  },
  {
    title: "Solitaire",
    id: "solitaire",
    src: "https://98.js.org/programs/js-solitaire/index.html",
    iconUrl: "https://98.js.org/images/icons/solitaire-16x16.png"
  },
  {
    title: "Pipes",
    id: "pipes",
    src: "https://98.js.org/programs/pipes/index.html#%7B%22hideUI%22%3Atrue%7D",
    iconUrl: "https://98.js.org/images/icons/solitaire-16x16.png",
    screensaver: true
  },
  {
    title: "Cavetown - Big Strong Man",
    id: "cavetown.bigstrongmen",
    src: "https://www.youtube.com/embed/uKn0BtAAEyw?si=s3Pz0PzIpQDCxizU"
  }
];
var games = [
  {
    title: "Conway",
    id: "conway",
    src: "./Games/Conway/index.html",
    classes: ["rounded-corners"]
  },
  {
    title: "Velocities",
    id: "velocities",
    src: "./Applications/Velocities/index.html",
    moveEvents: true
    // This flag enables attaching window movement statistic listener.
  },
  {
    title: "Minesweeper",
    id: "minesweeper",
    src: "./Games/Minesweeper/index.html",
    fixed: true,
    scroll: false
  },
  {
    title: "Chess",
    id: "chess",
    src: "./Games/Chess/index.html",
    hidden: true
  },
  {
    title: "Tetris",
    id: "tetris",
    src: "./Games/Tetris/tetris.html",
    hidden: true
  },
  {
    title: "Sudoku",
    id: "sudoku",
    src: "./Games/Sudoku/sudoku.html",
    hidden: true
  },
  {
    title: "Clicker",
    id: "clicker",
    src: "./Games/ChoccyClicker/clicker.html",
    hidden: true
  },
  {
    title: "FAT",
    id: "mountain",
    src: "https://iemand005.github.io/MountainWeb/"
  },
  {
    title: "Planet Life",
    id: "planetlife",
    src: "https://www.planetlife.space/static/game/index.html"
  }
];
if (typeof windowManager !== "undefined") {
  Object.defineProperty(Window.prototype, "windows", {
    get: function() {
      return windowManager.windows;
    }
  });
}
function dockApp(dialog) {
  if (dockAppList && dialog) dockAppList.appendChild(dialog.createOpenButton());
}
var initApps = function() {
  if (typeof windowManager !== "undefined") {
    windowManager.injectApplications(applications);
    windowManager.injectApplications(games);
    windowManager.loadInstalledApps();
    windowManager.loadState();
    var windows = windowManager.windows;
    if (dockAppList) {
      dockApp(windows.browser);
      dockApp(windows.console);
      dockApp(windows.music);
    }
  }
};
if (typeof appRegistry !== "undefined") {
  appRegistry.addApps(applications, games);
  appRegistry.loadApps();
}
window.addEventListener("load", initApps, false);
function probeAllStorage() {
  return {
    OPFS: !!navigator.storage && typeof navigator.storage.getDirectory == "function",
    CacheAPI: "caches" in window,
    IndexedDB: !!window.indexedDB,
    ChromeFileSystem: "webkitRequestFileSystem" in window,
    LocalStorage: "localStorage" in window,
    WebSQL: "openDatabase" in window,
    GoogleGears: typeof window.GearsFactory != "undefined",
    FlashBridge: (function() {
      try {
        return !!new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      } catch (e) {
        return !!navigator.plugins && !!navigator.plugins["Shockwave Flash"];
      }
    })(),
    IE_userData: (function() {
      try {
        return !!document.createElement("div").addBehavior;
      } catch (e) {
        return false;
      }
    })(),
    ActiveX_FSO: (function() {
      try {
        return !!new ActiveXObject("Scripting.FileSystemObject");
      } catch (e) {
        return false;
      }
    })(),
    JavaApplets: typeof navigator.javaEnabled == "function" && navigator.javaEnabled()
  };
}
console.log("Detected Browser Capabilities:", probeAllStorage());
function OmniFS() {
  this.webkitSize = 5 * 1024 * 1024;
  this.webkitFs = null;
  this.apis = [];
}
OmniFS.prototype.init = function(api) {
  var self = this;
  if (this.apis.indexOf(api) !== -1) return;
  this.apis.push(api);
  return new Promise(function(resolve, reject) {
    switch (api) {
      case "WebKitFS":
        if (!window.webkitRequestFileSystem)
          return reject("webkitRequestFileSystem not supported here.");
        window.webkitRequestFileSystem(window.PERSISTENT, this.webkitSize, function(fs) {
          self.webkitFs = fs;
        }, reject);
        break;
    }
  });
};
OmniFS.prototype.writeToChromeLegacyFS = function(fileName, textData) {
  var self = this;
  return new Promise(function(resolve, reject) {
    if (!self.webkitFs)
      return reject("webkitRequestFileSystem not initialized.");
    self.webkitFs.root.getFile(fileName, { create: true }, function(fileEntry) {
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function() {
          resolve("Saved via Chrome Legacy FS to" + fileEntry.toURL());
        };
        fileWriter.onerror = reject;
        const blob = new Blob([textData], { type: "text/plain" });
        fileWriter.write(blob);
      }, reject);
    }, reject);
  });
};
OmniFS.prototype.readFromChromeLegacyFS = function(fileName) {
  var self = this;
  return new Promise(function(resolve, reject) {
    if (!self.webkitFs)
      return reject("webkitRequestFileSystem not initialized.");
    self.webkitFs.root.getFile(fileName, { create: false }, function(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
          resolve(this.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      }, reject);
    }, reject);
  });
};
OmniFS.prototype.prototypewriteToOPFS = function(fileName, content) {
  return new Promise(function(resolve, reject) {
    if (!navigator.storage || typeof navigator.storage.getDirectory != "function") {
      return reject(new Error("OPFS wordt niet ondersteund door deze browser."));
    }
    navigator.storage.getDirectory().then(function(root) {
      return root.getFileHandle(fileName, { create: true });
    }).then(function(fileHandle) {
      var currentWritable;
      return fileHandle.createWritable().then(function(writable) {
        currentWritable = writable;
        return writable.write(content);
      }).then(function() {
        return currentWritable.close();
      });
    }).then(function() {
      resolve("Data veilig opgeslagen in OPFS sandbox!");
    })["catch"](function(error) {
      reject(error);
    });
  });
};
window.addEventListener("load", function(e) {
  var homeButton = document.getElementById("home-button");
  var backButton = document.getElementById("back-button");
  var goBack = function() {
    mobileFrameManager.goBack();
  };
  if (homeButton) homeButton.onclick = function() {
    mobileFrameManager.hide();
  };
  if (backButton) backButton.onclick = goBack;
  if (launchpad) launchpad.isMobile = true;
  window.history.pushState(null, "", window.location.href);
  window.addEventListener("popstate", function(event) {
    window.history.pushState(null, "", window.location.href);
    console.log("I gotta handle backnav!");
    goBack();
  });
});
var reflecitons = false;
var launchpad = typeof Launchpad !== "undefined" ? new Launchpad() : null;
function init() {
  var launchpadElement = document.getElementById("launchpad");
  if (!launchpad || !launchpadElement) return;
  launchpad.init(launchpadElement);
  if (typeof appRegistry !== "undefined") {
    appRegistry.forEachApp(function(app, id) {
      launchpad.addApp(app);
    });
  } else if (typeof windowManager !== "undefined" && "windowManager" in window) {
    windowManager.forEachWindow(function(dialog) {
      if (dialog.application) launchpad.addApp(dialog);
    });
    if (!isBlink) DesktopManager.removeTheme("glass");
    windowManager.ininializeDialogs();
    toggleReflections(reflections);
    LVMessenger.receive(messageReceived);
  }
  window.metaThemeColor = document.querySelector('meta[name="theme-color"]') || void 0;
  if (window.__LVMessenger)
    window.__LVMessenger.accent = window.metaThemeColor;
}
window.addEventListener("DOMContentLoaded", init, false);
