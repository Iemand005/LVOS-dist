"use strict";
var __lvosReserved = { "get": true, "getActiveFrame": true, "getActiveId": true, "getApp": true, "getBodyRect": true, "getBoundingClientRect": true, "getButton": true, "getClientRects": true, "getData": true, "getDesktopIndexAt": true, "getDirectory": true, "getElementById": true, "getElementByTagOrClassName": true, "getElementsByClassName": true, "getElementsByTagName": true, "getExtension": true, "getFile": true, "getFileHandle": true, "getGestureSnapZone": true, "getHTML": true, "getIconUrl": true, "getItem": true, "getMiniIconUrl": true, "getOrCreateFrame": true, "getRect": true, "getSnapContainer": true, "getSnapGroup": true, "getSnapSpacer": true, "getSnapZone": true, "getState": true, "getTitleElement": true, "getViewBoxPosition": true, "getVisualizerApps": true, "getWallpaper": true, "getWindowById": true, "getWindowOwningElement": true, "set": true, "setAttribute": true, "setClickOffset": true, "setData": true, "setDragScale": true, "setExpos\xE9Enabled": true, "setExtensionEnabled": true, "setHalfInset": true, "setHeight": true, "setHeightInset": true, "setIcon": true, "setInset": true, "setItem": true, "setMaxSize": true, "setMinSize": true, "setParentElement": true, "setPointerCapture": true, "setPointerPosition": true, "setProperty": true, "setRotation": true, "setScale": true, "setScaleY": true, "setSkew": true, "setTimeout": true, "setTitle": true, "setWallpaper": true, "setWidth": true, "setZ": true, "setupScollHandler": true };
var __lvosAccessors = {};
var __lvosMethodNames = {};
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var len = this == null ? 0 : this.length >>> 0;
    if (len === 0)
      return -1;
    var n = typeof fromIndex === "number" ? fromIndex | 0 : 0;
    if (n >= len)
      return -1;
    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
    for (; k < len; k++) {
      if (k in this && this[k] === searchElement)
        return k;
    }
    return -1;
  };
}
if (typeof window !== "undefined") {
  if (typeof window.innerWidth === "undefined") {
    try {
      Object.defineProperty(window, "innerWidth", {
        get: function() {
          return document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
        },
        configurable: true
      });
    } catch (e) {
      window.innerWidth = document.documentElement.clientWidth || document.body.clientWidth;
    }
  }
  if (typeof window.innerHeight === "undefined") {
    try {
      Object.defineProperty(window, "innerHeight", {
        get: function() {
          return document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
        },
        configurable: true
      });
    } catch (e) {
      window.innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
    }
  }
}
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(searchElement, fromIndex) {
    var len = this == null ? 0 : this.length >>> 0;
    if (len === 0)
      return -1;
    var n = typeof fromIndex === "number" ? fromIndex | 0 : len - 1;
    var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
    for (; k >= 0; k--) {
      if (k in this && this[k] === searchElement)
        return k;
    }
    return -1;
  };
}
if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
  };
}
(function() {
  if (typeof document === "undefined" || !document.createElement)
    return;
  var testEl = document.createElement("div");
  if (testEl.classList)
    return;
  function trim(s) {
    return s.replace(/^\s+|\s+$/g, "");
  }
  function tokens(el) {
    var raw = el.className || "";
    var parts = raw.split(/\s+/);
    var result = [];
    for (var i = 0; i < parts.length; i++)
      if (parts[i])
        result.push(parts[i]);
    return result;
  }
  function join(list) {
    return list.join(" ");
  }
  function DOMTokenList(el) {
    this._el = el;
  }
  DOMTokenList.prototype = {
    add: function() {
      var list = tokens(this._el);
      for (var i = 0; i < arguments.length; i++) {
        var token = String(arguments[i]);
        if (list.indexOf(token) === -1)
          list.push(token);
      }
      this._el.className = join(list);
    },
    remove: function() {
      var list = tokens(this._el);
      for (var i = 0; i < arguments.length; i++) {
        var token = String(arguments[i]);
        var idx = list.indexOf(token);
        if (idx !== -1)
          list.splice(idx, 1);
      }
      this._el.className = join(list);
    },
    toggle: function(token, force) {
      var has = this.contains(token);
      if (has && force !== true)
        this.remove(token);
      else if (!has && force !== false)
        this.add(token);
      return !has;
    },
    contains: function(token) {
      return tokens(this._el).indexOf(String(token)) !== -1;
    },
    toString: function() {
      return this._el.className || "";
    },
    bind: function(method) {
      var self2 = this, args = Array.prototype.slice.call(arguments, 1);
      return function() {
        self2[method].apply(self2, args.concat(Array.prototype.slice.call(arguments)));
      };
    }
  };
  try {
    Object.defineProperty(HTMLElement.prototype, "classList", {
      get: function() {
        if (!this.__classList)
          this.__classList = new DOMTokenList(this);
        return this.__classList;
      },
      enumerable: false,
      configurable: true
    });
  } catch (e) {
  }
})();
function __lvosCapitalize(name) {
  var text = String(name);
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function __lvosMethodName(prefix, name) {
  var base = prefix + __lvosCapitalize(name).replace(/[^A-Za-z0-9_$]/g, "_");
  var method = base;
  var index = 1;
  while (__lvosReserved[method] || __lvosMethodNames[method])
    method = base + "$" + index++;
  __lvosMethodNames[method] = true;
  return method;
}
function __lvosRegister(target, name, getter, setter, enumerable) {
  if (!target)
    return;
  name = String(name);
  var info = __lvosAccessors[name];
  if (!info)
    info = __lvosAccessors[name] = { get: null, set: null };
  if (typeof getter === "function") {
    if (!info.get)
      info.get = __lvosMethodName("get", name);
    target[info.get] = getter;
  }
  if (typeof setter === "function") {
    if (!info.set)
      info.set = __lvosMethodName("set", name);
    target[info.set] = setter;
  }
  if (enumerable && !(name in target))
    target[name] = void 0;
}
function __lvosDefineProperty(target, key, attributes) {
  if (!target || !attributes)
    return target;
  var hasGetter = typeof attributes.get === "function";
  var hasSetter = typeof attributes.set === "function";
  if (hasGetter || hasSetter)
    __lvosRegister(target, key, attributes.get, attributes.set, attributes.enumerable === true);
  if ("value" in attributes)
    target[key] = attributes.value;
  return target;
}
function __lvosDefineProperties(target, descriptors) {
  if (!target || !descriptors)
    return target;
  for (var key in descriptors) {
    if (Object.prototype.hasOwnProperty.call(descriptors, key))
      __lvosDefineProperty(target, key, descriptors[key]);
  }
  return target;
}
function __lvosObject(target, accessors) {
  for (var i = 0; i < accessors.length; i++) {
    var accessor = accessors[i];
    __lvosRegister(target, accessor.name, accessor.get, accessor.set, true);
  }
  return target;
}
function __lvosGet(object, key) {
  try {
    if (object == null)
      return;
    var info = __lvosAccessors[key];
    if (info && info.get) {
      var getter = object[info.get];
      if (typeof getter === "function")
        return getter.call(object);
    }
    return object[key];
  } catch (ex) {
    console.warn("Failed to get key in object:", object, key, ex);
  }
  return;
}
function __lvosSet(object, key, value) {
  if (object == null)
    return value;
  var info = __lvosAccessors[key];
  if (info) {
    if (info.set) {
      var setter = object[info.set];
      if (typeof setter === "function") {
        setter.call(object, value);
        return value;
      }
    } else if (info.get) {
      var getter = object[info.get];
      if (typeof getter === "function")
        return value;
    }
  }
  object[key] = value;
  return value;
}
function __lvosIsAccessorMethod(key) {
  return __lvosMethodNames[key] === true;
}
function forEachIndexed(callbackfn, thisArg) {
  if (typeof callbackfn !== "function")
    throw new TypeError(callbackfn + " is not a function");
  var length = this == null || typeof this.length !== "number" ? 0 : this.length >>> 0;
  for (var i = 0; i < length; ++i)
    callbackfn.call(thisArg, this[i], i, this);
}
if (!Object.prototype.hasOwnProperty("forEach"))
  __lvosDefineProperty(Object.prototype, "forEach", {
    value: forEachIndexed,
    writable: true,
    configurable: true
  });
function Vector(x, y) {
  if (typeof x != "number")
    x = 0, y = 0;
  else if (typeof y != "number")
    y = x;
  __lvosSet(this, "x", x);
  __lvosSet(this, "y", y);
}
Vector.prototype.add = function(vector) {
  return __lvosSet(this, "x", __lvosGet(this, "x") + __lvosGet(vector, "x")), __lvosSet(this, "y", __lvosGet(this, "y") + __lvosGet(vector, "y")), this;
};
Vector.prototype.sub = function(vector) {
  return __lvosSet(this, "x", __lvosGet(this, "x") - __lvosGet(vector, "x")), __lvosSet(this, "y", __lvosGet(this, "y") - __lvosGet(vector, "y")), this;
};
Vector.prototype.mul = function(vector) {
  return __lvosSet(this, "x", __lvosGet(this, "x") * __lvosGet(vector, "x")), __lvosSet(this, "y", __lvosGet(this, "y") * __lvosGet(vector, "y")), this;
};
Vector.prototype.div = function(vector) {
  return __lvosSet(this, "x", __lvosGet(this, "x") / __lvosGet(vector, "x")), __lvosSet(this, "y", __lvosGet(this, "y") / __lvosGet(vector, "y")), this;
};
Vector.prototype.sum = function(vector) {
  return new Vector(__lvosGet(this, "x") + __lvosGet(vector, "x"), __lvosGet(this, "y") + __lvosGet(vector, "y"));
};
Vector.prototype.difference = function(vector) {
  return new Vector(__lvosGet(this, "x") - __lvosGet(vector, "x"), __lvosGet(this, "y") - __lvosGet(vector, "y"));
};
Vector.prototype.product = function(vector) {
  return new Vector(__lvosGet(this, "x") * __lvosGet(vector, "x"), __lvosGet(this, "y") * __lvosGet(vector, "y"));
};
Vector.prototype.quotient = function(vector) {
  return new Vector(__lvosGet(this, "x") / __lvosGet(vector, "x"), __lvosGet(this, "y") / __lvosGet(vector, "y"));
};
Vector.prototype.set = function(vector) {
  return __lvosSet(this, "x", __lvosGet(vector, "x")), __lvosSet(this, "y", __lvosGet(vector, "y")), this;
};
Vector.prototype.clone = function() {
  return new Vector(__lvosGet(this, "x"), __lvosGet(this, "y"));
};
function Vector3D(x, y, z) {
  __lvosSet(this, "x", 0);
  __lvosSet(this, "y", 0);
  __lvosSet(this, "z", 0);
  if (typeof x == "number") {
    __lvosSet(this, "x", x);
    if (y === void 0 || z === void 0)
      __lvosSet(this, "y", x), __lvosSet(this, "z", x);
    else
      __lvosSet(this, "y", y), __lvosSet(this, "z", z);
  } else if (typeof x == "object" && __lvosGet(x, "x") && __lvosGet(x, "y") && __lvosGet(x, "z")) {
    __lvosSet(this, "x", __lvosGet(x, "x")), __lvosSet(this, "y", __lvosGet(x, "y")), __lvosSet(this, "z", __lvosGet(x, "z"));
  }
}
Vector3D.prototype.div = function(amount) {
  __lvosSet(this, "x", __lvosGet(this, "x") / amount), __lvosSet(this, "y", __lvosGet(this, "y") / amount), __lvosSet(this, "z", __lvosGet(this, "z") / amount);
  return this;
};
Vector3D.prototype.normalize = function() {
  return this.div(__lvosGet(this, "x") + __lvosGet(this, "y") + __lvosGet(this, "z"));
};
function Rectangle(x, y, width, height) {
  this.pos = __lvosSet(this, "position", new Vector(x, y));
  __lvosSet(this, "width", width);
  __lvosSet(this, "height", height);
}
Rectangle.prototype = __lvosObject({
  contains: function(vector) {
    return __lvosGet(vector, "x") >= __lvosGet(__lvosGet(this, "position"), "x") && __lvosGet(vector, "y") >= __lvosGet(__lvosGet(this, "position"), "y") && __lvosGet(vector, "x") < __lvosGet(__lvosGet(this, "position"), "x") + __lvosGet(this, "width") && __lvosGet(vector, "y") < __lvosGet(__lvosGet(this, "position"), "y") + __lvosGet(this, "height");
  }
}, [
  {
    name: "x",
    get: function() {
      return __lvosGet(__lvosGet(this, "position"), "x");
    },
    set: function(value) {
      return __lvosSet(__lvosGet(this, "position"), "x", value);
    }
  },
  {
    name: "y",
    get: function() {
      return __lvosGet(__lvosGet(this, "position"), "y");
    },
    set: function(value) {
      return __lvosSet(__lvosGet(this, "position"), "y", value);
    }
  }
]);
"use strict";
function LVMessenger() {
}
LVMessenger.broadcast = function(target, type, data, id) {
  if (target && "JSON" in window)
    target.postMessage(JSON.stringify({ type: type, data: data, id: id }), "*");
};
LVMessenger.receive = function(callback, destroyWhenType) {
  var messageListener = function(ev) {
    try {
      var data = typeof ev.data === "string" ? JSON.parse(ev.data) : ev.data;
      if (data.type)
        switch (data.type) {
          default:
            callback(data.type, data.data, __lvosGet(data, "id"));
            break;
          case "identify":
            console.log("Reveived an identity request", ev);
            var identity = { name: "LVOS" };
            if (ev.source instanceof Window && typeof ev.source.postMessage === "function")
              LVMessenger.broadcast(ev.source, "identity", identity);
            else
              console.warn("Couldn't send identity request!", ev);
            break;
        }
      if (data.type === destroyWhenType)
        this.window.removeEventListener("message", messageListener);
    } catch (ex) {
      console.warn("Error decoding data", ev.data, ex);
    }
  };
  window.addEventListener("message", messageListener, false);
  return messageListener;
};
function getParentWindow() {
  return window.parent && window.parent !== window ? window.parent : __lvosGet(window, "top");
}
LVMessenger.broadcastToParent = function(type, message, id) {
  var target = getParentWindow();
  try {
    if (target && typeof target.__LVMessengerReceive === "function")
      target.__LVMessengerReceive(type, message, id);
  } catch (ex) {
    console.warn("Direct parent bridge failed, falling back to postMessage.", ex);
    if (target)
      LVMessenger.broadcast(target, type, message, id);
  }
};
LVMessenger.broadcastToChild = function(type, iFrame, message) {
  if (__lvosGet(iFrame, "contentWindow"))
    LVMessenger.broadcast(__lvosGet(iFrame, "contentWindow"), type, message);
};
LVMessenger.onHostBeingLVOS = function(callback) {
  try {
    LVMessenger.receive(function(type, data) {
      if (type === "identity" && data.name === "LVOS")
        callback();
    }, "identity");
    LVMessenger.broadcastToParent("identify");
  } catch (ex) {
    console.warn("Failed to request host OS", ex);
  }
};
LVMessenger.registerThemeChangeHandler = function() {
  LVMessenger.receive(function(message, data) {
    if (message === "theme")
      __lvosGet(document, "body").className = data.className;
  });
};
function Launchpad() {
  this.element = null;
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
  if (!__lvosGet(app, "id") || !__lvosGet(app, "src") || !this._container)
    return;
  if (this._frames[__lvosGet(app, "id")]) {
    this._showFrame(__lvosGet(app, "id"));
    return;
  }
  var frame = document.createElement("iframe");
  frame.setAttribute("frameborder", "0");
  __lvosSet(frame, "src", __lvosGet(app, "src"));
  this._frames[__lvosGet(app, "id")] = frame;
  this._container.appendChild(frame);
  this._showFrame(__lvosGet(app, "id"));
};
MobileFrameManager.prototype._showFrame = function(id) {
  if (!this._container)
    return;
  var keys = Object.keys(this._frames);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key) {
      var frame = this._frames[key];
      if (frame)
        frame.style.display = key === id ? "block" : "none";
    }
  }
  this._activeId = id;
  this._container.classList.add("open");
};
MobileFrameManager.prototype.hide = function() {
  if (!this._container)
    return;
  this._container.classList.remove("open");
};
MobileFrameManager.prototype.goBack = function() {
  if (!this._activeId)
    return false;
  var frame = this._frames[this._activeId];
  if (frame && __lvosGet(frame, "contentWindow")) {
    __lvosGet(frame, "contentWindow").history.back();
    return true;
  }
  return false;
};
MobileFrameManager.prototype.getActiveFrame = function() {
  if (!this._activeId)
    return null;
  return this._frames[this._activeId] || null;
};
MobileFrameManager.prototype.getActiveId = function() {
  return this._activeId;
};
var mobileFrameManager = new MobileFrameManager();
window.mobileFrameManager = mobileFrameManager;
Launchpad.prototype.init = function(element) {
  var closeButton = document.createElement("button");
  var self2 = this;
  closeButton.onclick = function() {
    self2.close();
  };
  closeButton.textContent = "Close";
  element.appendChild(closeButton);
  element.appendChild(this.list);
  this.element = element;
  var container = document.getElementById("main-frame");
  if (container)
    mobileFrameManager.init(container);
};
Launchpad.prototype.open = function() {
  if (!this.element)
    return;
  this.element.classList.add("open");
};
Launchpad.prototype.close = function() {
  if (!this.element)
    return;
  this.element.classList.remove("open");
};
Launchpad.prototype._createMobileButton = function(app) {
  var title = app && __lvosGet(app, "title") || "?";
  var openButton = document.createElement("button");
  openButton.appendChild(document.createTextNode(title.charAt(0).toUpperCase()));
  if (app && app.accentColor)
    openButton.style.background = app.accentColor;
  var iconUrl = app && __lvosGet(app, "iconUrl");
  if (iconUrl) {
    var icon = document.createElement("img");
    icon.onload = function() {
      openButton.textContent = "";
      openButton.appendChild(icon);
    };
    __lvosSet(icon, "src", iconUrl);
    icon.alt = __lvosGet(app, "title") + " Logo";
  }
  return openButton;
};
Launchpad.prototype.addApp = function(app) {
  var appElement = document.createElement("li");
  var openButton;
  if ("createOpenButton" in app) {
    openButton = app.createOpenButton();
  } else {
    openButton = this._createMobileButton(app);
    openButton.onclick = function() {
      mobileFrameManager.open(app);
    };
    var appLabel = document.createElement("label");
    appLabel.textContent = app && __lvosGet(app, "title") || "Unknown";
    appElement.appendChild(appLabel);
  }
  appElement.appendChild(openButton);
  this.list.appendChild(appElement);
};
__lvosDefineProperty(Launchpad.prototype, "isMobile", {
  get: function() {
    return this._isMobile;
  },
  set: function(value) {
    this._isMobile = value;
  }
});
var canSave = true;
var hasLocalStorage = false;
var isLocal = location.protocol === "file:" || location.hostname === "localhost";
try {
  hasLocalStorage = typeof localStorage !== "undefined";
} catch (ex) {
  hasLocalStorage = false;
}
if (!hasLocalStorage)
  canSave = false;
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
  var domain = getDomain(url);
  if (!domain)
    return "";
  var parts = domain.split(".");
  var name = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}
function handleStorageException(exception) {
  console.error(exception);
  console.warn("A problem occurred, app state saving has been disabled for this session.");
  canSave = false;
}
function AppManager() {
  this._apps = {};
  this._wallpapers = {};
  this._wallpaper = null;
}
AppManager.prototype.addApp = function(app) {
  if (!app || typeof app !== "object")
    return;
  if (!__lvosGet(app, "id"))
    __lvosSet(app, "id", __lvosGet(app, "title") || "unknown");
  this._apps[__lvosGet(app, "id")] = app;
  if (app.wallpaper) {
    this._wallpapers[__lvosGet(app, "id")] = app;
    if (!this._wallpaper)
      this._wallpaper = app;
  }
};
AppManager.prototype.addApps = function() {
  for (var i = 0; i < arguments.length; i++)
    if (arguments[i] instanceof Array)
      arguments[i].forEach(this.addApp, this);
};
AppManager.prototype.getApp = function(id) {
  if (!id)
    return null;
  return this._apps[id] || null;
};
AppManager.prototype.removeApp = function(id) {
  if (!id)
    return;
  delete this._apps[id];
};
AppManager.prototype._forEach = function(map, callback) {
  if (typeof callback !== "function")
    return;
  for (var id in map)
    if (map.hasOwnProperty(id) && map[id])
      callback(map[id], id);
};
AppManager.prototype.forEachApp = function(callback) {
  this._forEach(this._apps, callback);
};
AppManager.prototype.forEachWallpaper = function(callback) {
  this._forEach(this._wallpapers, callback);
};
__lvosDefineProperties(AppManager.prototype, {
  apps: {
    get: function() {
      return this._apps;
    }
  },
  installedApps: {
    get: function() {
      if (!hasLocalStorage)
        return [];
      try {
        var string = localStorage.getItem("installedApps");
        if (string === null)
          return [];
        var apps = JSON.parse(string);
        return apps instanceof Array ? apps : [];
      } catch (exception) {
        if (exception instanceof Error)
          console.error(exception.message);
        return [];
      }
    }
  }
});
AppManager.prototype.saveApp = function(app) {
  if (!canSave || !hasLocalStorage)
    return;
  if (!app || typeof app !== "object" || !__lvosGet(app, "id"))
    return;
  try {
    var apps = __lvosGet(this, "installedApps");
    if (apps.some(function(existing) {
      return __lvosGet(existing, "id") === __lvosGet(app, "id");
    }))
      return;
    apps.push(app);
    localStorage.setItem("installedApps", JSON.stringify(apps));
  } catch (exception) {
    handleStorageException(exception);
  }
};
AppManager.prototype.loadApps = function() {
  if (!canSave || !hasLocalStorage)
    return;
  var self2 = this;
  try {
    __lvosGet(this, "installedApps").forEach(function(app) {
      if (app && __lvosGet(app, "src"))
        self2.addApp(app);
    });
  } catch (exception) {
    handleStorageException(exception);
  }
};
AppManager.prototype.createApp = function(url, title, id, iconUrl) {
  var app = {
    src: url,
    id: id || "custom." + getDomain(url),
    title: title || getSiteName(url)
  };
  if (iconUrl)
    __lvosSet(app, "iconUrl", iconUrl);
  return app;
};
AppManager.prototype.setWallpaper = function(id) {
  var wallpaperFrame = document.getElementById("wallpaper-frame");
  if (!(wallpaperFrame instanceof HTMLIFrameElement))
    return;
  var app = this.getApp(id);
  if (!app)
    return;
  wallpaperFrame.onerror = function() {
    if (app && app.distSrc)
      __lvosSet(wallpaperFrame, "src", app.distSrc);
  };
  __lvosSet(wallpaperFrame, "src", isLocal ? __lvosGet(app, "src") : app.distSrc || __lvosGet(app, "src"));
};
AppManager.prototype.openAppInIFrame = function(id, frame, onLoad2) {
  var timeout = -1;
  var src = null;
  frame.onload = function() {
    clearTimeout(timeout);
    if (onLoad2)
      onLoad2(src);
  };
  var application = this.getApp(id);
  if (!application)
    return;
  var baseUrls = [__lvosGet(application, "src"), application.distSrc];
  if (!isLocal)
    baseUrls.reverse();
  var fallbackUrls = baseUrls.concat(application.altUrls);
  var index = 0;
  function tryNext() {
    var url = fallbackUrls[index++];
    if (index >= fallbackUrls.length || !frame || !url)
      return;
    __lvosSet(frame, "src", url);
    src = url;
    clearTimeout(timeout);
    timeout = setTimeout(tryNext, 3e3);
  }
  frame.addEventListener("error", tryNext);
  tryNext();
};
AppManager.prototype.reloadWallpaper = function() {
  if (this._wallpaper)
    this.setWallpaper(__lvosGet(this._wallpaper, "id"));
};
var appManager = new AppManager();
window.appManager = appManager;
"use strict";
var useTransform = true, useScale = false;
var isBlink = "chrome" in window;
var isIE = typeof window !== "undefined" && typeof document !== "undefined" && !!window.MSInputMethodContext && document.documentMode === 11;
var supportsPointer = typeof window !== "undefined" && "PointerEvent" in window && !isIE && !("MSPointerEvent" in window);
var supportsObjectFit = Boolean(document.documentElement && document.documentElement.style && typeof document.documentElement.style.objectFit !== "undefined");
var supportsTransitions = false;
var supportsTransform = false;
var isLocal = location.protocol === "file:" || location.hostname === "localhost";
(function() {
  var style = document.createElement("div").style;
  supportsTransitions = "transition" in style || "WebkitTransition" in style || "MozTransition" in style || "OTransition" in style || "msTransition" in style;
  supportsTransform = "transform" in style || "webkitTransform" in style || "msTransform" in style || "mozTransform" in style || "OTransform" in style;
})();
var transitionEndEvent = "transition" in document.documentElement.style ? "transitionend" : "webkitTransition" in document.documentElement.style ? "webkitTransitionEnd" : "transitionend";
if (isIE)
  useTransform = true;
if (!supportsTransform)
  useTransform = false;
var flags = __lvosObject({
  useSkewAnimations: false,
  aeroSnap: true,
  updateRateLimit: true,
  useDragOverlay: true,
  broadcastWindowMoves: !document.documentMode,
  _useTransform: useTransform,
  useAnimations: true,
  ieDropCompatibleMode: true,
  _compositorResize: true,
  _useViewTransitionMaximize: true,
  _preserveMaximizeAspect: false,
  windowReaper: false,
  verboseLogs: false,
  _exposeAndDesktops: true,
  _enableExtensions: true
}, [
  {
    name: "useTransform",
    get: function() {
      return this._useTransform;
    },
    set: function(value) {
      this._useTransform = value;
      windowManager.forEachWindow(function(dialog) {
        __lvosSet(dialog, "useTransform", value);
      });
    }
  },
  {
    name: "compositorResize",
    get: function() {
      return this._compositorResize;
    },
    set: function(value) {
      __lvosGet(document, "body").classList.toggle("compositor-animations", !!value);
      if (value)
        this._useViewTransitionMaximize = false;
      this._compositorResize = value;
    }
  },
  {
    name: "useViewTransitionMaximize",
    get: function() {
      return this._useViewTransitionMaximize;
    },
    set: function(value) {
      if (value)
        __lvosSet(this, "compositorResize", false);
      this._useViewTransitionMaximize = value;
    }
  },
  {
    name: "preserveMaximizeAspect",
    get: function() {
      return this._preserveMaximizeAspect;
    },
    set: function(value) {
      __lvosGet(document, "body").classList.toggle("preserve-aspect", !!value);
      this._preserveMaximizeAspect = value;
    }
  },
  {
    name: "exposeAndDesktops",
    get: function() {
      return this._exposeAndDesktops;
    },
    set: function(value) {
      this._exposeAndDesktops = value;
      if (window.desktopManager && typeof window.desktopManager.setExpos\u00E9Enabled === "function")
        window.desktopManager.setExpos\u00E9Enabled(value);
    }
  },
  {
    name: "enableExtensions",
    get: function() {
      return this._enableExtensions;
    },
    set: function(value) {
      window.windowManager.extensions.forEach(function(ext) {
        window.windowManager.setExtensionEnabled(ext, value);
      });
    }
  }
]);
function cancelDomEvent(event2) {
  if (typeof event2.preventDefault === "function")
    event2.preventDefault();
  event2.returnValue = false;
  if (typeof event2.stopPropagation === "function")
    event2.stopPropagation();
  event2.cancelBubble = true;
  return false;
}
function getFaviconUrl(url) {
  return "https://" + getDomain(url) + "/favicon.ico";
}
function getDomain(url) {
  var regged = url.replace(/^[a-z]+:\/\/+/i, "").split("/")[0];
  return regged && regged.split("?")[0];
}
function getSiteName(url) {
  var domain = getDomain(url);
  if (!domain)
    return null;
  var parts = domain.split(".");
  var name = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  if (!name)
    return null;
  return name.charAt(0).toUpperCase() + name.slice(1);
}
Helpers.isElement = function(object) {
  return object && "nodeType" in object || false;
};
function getWindowChromeHeight(window2) {
  return window2.outerHeight - window2.innerHeight;
}
Helpers.translateElement = function(element, x, y) {
  transformElement(element, { x: x, y: y });
};
function transformElement(element, t) {
  var transform = "";
  if (__lvosGet(t, "x") && __lvosGet(t, "y"))
    transform += "translate(" + Helpers.toPixels(__lvosGet(t, "x")) + "," + Helpers.toPixels(__lvosGet(t, "y")) + ")";
  else if (__lvosGet(t, "x"))
    transform += "translateX(" + Helpers.toPixels(__lvosGet(t, "x")) + ")";
  else if (__lvosGet(t, "y"))
    transform += "translateY(" + Helpers.toPixels(__lvosGet(t, "y")) + ")";
  if (t.skewX)
    transform += " skewX(" + Helpers.toDegrees(t.skewX) + ")";
  if (t.scaleX === 1)
    t.scaleX = void 0;
  if (__lvosGet(t, "scaleY") === 1)
    __lvosSet(t, "scaleY", void 0);
  if (t.scaleX && __lvosGet(t, "scaleY"))
    transform += "scale(" + t.scaleX + "," + __lvosGet(t, "scaleY") + ")";
  else if (t.scaleX)
    transform += "scaleX(" + t.scaleX + ")";
  else if (__lvosGet(t, "scaleY"))
    transform += "scaleY(" + __lvosGet(t, "scaleY") + ")";
  if (t.rotate)
    transform += "rotate(" + Helpers.toDegrees(t.rotate) + ")";
  if (t.rotateX)
    transform += "rotateX(" + Helpers.toDegrees(t.rotateX) + ")";
  if (t.rotateY)
    transform += "rotateY(" + Helpers.toDegrees(t.rotateY) + ")";
  if (t.rotateZ)
    transform += "rotateZ(" + Helpers.toDegrees(t.rotateZ) + ")";
  if ("msTransform" in element.style)
    element.style.msTransform = transform;
  else
    element.style.transform = transform;
}
function insetElement(element, top, left, right, bottom) {
  if ("inset" in element.style)
    if (typeof left === "undefined")
      element.style.inset = Helpers.toPixels(top);
    else
      element.style.inset = Helpers.toPixels(top) + " " + Helpers.toPixels(right || 0) + " " + Helpers.toPixels(bottom || 0) + " " + Helpers.toPixels(left);
  else {
    if (typeof left === "undefined")
      left = top, right = top, bottom = top;
    element.style.top = Helpers.toPixels(top);
    element.style.left = Helpers.toPixels(left);
    if (typeof right !== "undefined")
      element.style.right = Helpers.toPixels(right);
    if (typeof bottom !== "undefined")
      element.style.bottom = Helpers.toPixels(bottom);
  }
}
function setClass(element, className, enabled) {
  var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
  if (typeof enabled === "undefined")
    enabled = element.className.indexOf(className) === -1;
  if (enabled) {
    if (!re.test(element.className))
      element.className = (element.className + " " + className).replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  } else
    element.className = element.className.replace(re, " ").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  return element.className.indexOf(className) !== -1;
}
function getRect(element, index) {
  if (!element)
    return;
  return index ? element.getClientRects()[index] : element.getBoundingClientRect();
}
function getOverlay() {
  return document.getElementById("overlay");
}
function messageReceived(type, data, source) {
  if (source && windowManager) {
    var dialog = __lvosGet(windowManager, "windows")[source];
    if (!dialog)
      return;
    if (type === "window-size")
      dialog.resizeBody(__lvosGet(data, "width"), __lvosGet(data, "height"));
    switch (type) {
      case "launchOverlay":
        var overlay = getOverlay();
        if (!overlay)
          break;
        overlay.ontransitionend = function() {
          if (!dialog)
            return;
          dialog.messageFrame("prepareToLaunchOverlay");
          if (__lvosGet(dialog, "frame")) {
            var oriel = new URL(__lvosGet(__lvosGet(dialog, "frame"), "src"));
            oriel.searchParams.set("fullscreen", String(true));
            __lvosSet(__lvosGet(dialog, "frame"), "src", __lvosGet(oriel, "href"));
          }
          if (!overlay)
            return;
          overlay.ontransitionend = null;
          if (typeof overlay.requestFullscreen === "function")
            overlay.requestFullscreen()["catch"](function() {
            });
          if (__lvosGet(dialog, "body"))
            overlay.appendChild(__lvosGet(dialog, "body"));
          window.setTimeout(overlay.classList.add.bind(overlay.classList, "shown"), 500);
        };
        overlay.classList.toggle("open");
        break;
      case "readyToLaunchOverlay":
        var overlay1 = getOverlay();
        if (!overlay1)
          break;
        if (__lvosGet(dialog, "body"))
          overlay1.appendChild(__lvosGet(dialog, "body"));
        window.setTimeout(overlay1.classList.add.bind(overlay1.classList, "shown"), 500);
        break;
      case "pip":
        dialog.moveElementIntoPipById(__lvosGet(data, "id"), data.stylesheet);
        break;
      case "visualizers":
        dialog.messageFrame("visualizers", windowManager.getVisualizerApps());
        break;
    }
  }
}
function swapMetroBody() {
  if (!windowManager.flipped)
    return;
  windowManager.activeDialogToMetro();
}
function flip(enable) {
  var desktop = document.getElementById("desktop");
  ;
  if (!desktop)
    return;
  desktop.toggleAttribute("flipped", enable);
  flipHandler(desktop.classList.toggle("flipped", enable));
}
function flipHandler(enable) {
  DesktopManager.toggleCharms(false);
  swapMetroBody();
  windowManager.flipped = enable;
  return windowManager.flipped;
}
var windowButtons = {
  eject: 0,
  full: 1,
  close: 2
};
function Helpers() {
  this.ok = false;
}
Helpers.stringifyWindowOpenProperties = function(properties) {
  return JSON.stringify(properties).replace(/true/g, "yes").replace(/false/g, "no").replace(/:/g, "=").replace(/[}{"]/g, "");
};
Helpers.getViewBoxPosition = function() {
  return { x: window.screenLeft, y: window.screenTop };
};
Helpers.toPixels = function(value) {
  return Math.round(value || 0) + "px";
};
Helpers.toDegrees = function(value) {
  return Math.round(value) + "deg";
};
Helpers.pixelsToCentimeters = function(pixels) {
  return pixels * 2.54 / 96 * (window.devicePixelRatio || 1);
};
Helpers.fromPixels = function(text) {
  if (text !== null)
    try {
      return typeof text === "number" ? text : parseInt(text.replace("px", ""));
    } catch (ex) {
      console.warn("Failed to parse pixels:", ex);
    }
  return 0;
};
function handleStorageException(exception) {
  localStorage.windowState = null;
  windowManager.canSave = false;
  console.warn(exception);
}
function getDialogTemplate() {
  var template = document.querySelector("template") || document.getElementById("window-template");
  if (!template)
    return;
  var content = template;
  if (template instanceof HTMLTemplateElement)
    return __lvosGet(template, "content").children[0];
  return content.children[0];
}
function createDialogElement() {
  var template = getDialogTemplate();
  if (!template)
    throw new Error("Can't find dialog template!");
  var clone = removeComments(template.cloneNode(true));
  if (!(clone instanceof HTMLElement))
    throw new Error("Cloned dialog is not an element");
  return clone;
}
function removeComments(element) {
  element.childNodes.forEach(function(child) {
    if (child.nodeName === "#comment")
      element.removeChild(child);
    else if (Helpers.isElement(child))
      removeComments(child);
  });
  return element;
}
function flipElement(element, onToggled, thisArg) {
  var first = element.getBoundingClientRect();
  var previousTransition = element.style.transition;
  element.style.transition = "none";
  if (onToggled)
    onToggled.call(thisArg || element);
  var last = element.getBoundingClientRect();
  var dx = __lvosGet(first, "left") - __lvosGet(last, "left");
  var dy = __lvosGet(first, "top") - __lvosGet(last, "top");
  var scaleX = __lvosGet(last, "width") ? __lvosGet(first, "width") / __lvosGet(last, "width") : 1;
  var scaleY = __lvosGet(last, "height") ? __lvosGet(first, "height") / __lvosGet(last, "height") : 1;
  element.style.transformOrigin = "top left";
  element.style.translate = Helpers.toPixels(dx) + " " + Helpers.toPixels(dy);
  element.style.scale = scaleX + " " + scaleY;
  void element.offsetWidth;
  element.style.transition = previousTransition;
  element.classList.add("animating", "flipping");
  element._flipFrame = window.requestAnimationFrame(function() {
    element._flipFrame = 0;
    element.style.translate = "0px 0px";
    element.style.scale = "1";
  });
}
function clearFlip(element) {
  if (element._flipFrame) {
    window.cancelAnimationFrame(element._flipFrame);
    element._flipFrame = 0;
  }
  element.style.translate = "";
  element.style.scale = "";
  element.style.transformOrigin = "";
  element.classList.remove("flipping");
}
function animateElement(element, onToggled, onTransitionEnd, onEnd, thisArg, timeout, flip2) {
  var boundContext = thisArg || element;
  var callEnd = function() {
    if (!state.active)
      return;
    state.active = false;
    if (element._animationState === state)
      element._animationState = null;
    element.classList.remove("animating");
    if (flip2)
      clearFlip(element);
    if (onEnd)
      onEnd.call(boundContext);
  };
  var previous = element._animationState;
  if (previous) {
    if (previous.timer)
      clearTimeout(previous.timer);
    if (__lvosGet(previous, "frame"))
      window.cancelAnimationFrame(__lvosGet(previous, "frame"));
    if (previous.handler)
      element.removeEventListener(transitionEndEvent, previous.handler, false);
    if (previous.flip)
      clearFlip(element);
  }
  var state = element._animationState = { timer: 0, frame: 0, handler: null, active: true, flip: !!flip2 };
  if (!__lvosGet(flags, "useAnimations")) {
    if (onToggled)
      onToggled.call(boundContext);
    callEnd();
    return;
  }
  state.timer = timeout && setTimeout(callEnd, timeout) || 0;
  if (supportsTransitions) {
    if (flip2) {
      flipElement(element, onToggled, boundContext);
    } else
      element.classList.add("animating");
    var animationHandler = function(event2) {
      if (!onTransitionEnd)
        return;
      if (typeof onTransitionEnd === "string") {
        if (event2.propertyName !== onTransitionEnd)
          return;
      } else if (!onTransitionEnd(event2.propertyName))
        return;
      element.removeEventListener(transitionEndEvent, animationHandler, false);
      clearTimeout(state.timer);
      callEnd();
    };
    state.handler = animationHandler;
    element.addEventListener(transitionEndEvent, animationHandler, false);
  }
  if (!flip2 || !supportsTransitions) {
    __lvosSet(state, "frame", window.requestAnimationFrame(function() {
      __lvosSet(state, "frame", 0);
      if (onToggled)
        onToggled.call(boundContext);
    }));
  }
}
function WindowManager() {
  this._windows = {};
  this._windowStates = null;
  this._isBlurEnabled = true;
  this._isWindowUpdatesEnabled = false;
  this.isDragging = false;
  this.dragAction = new DragAction();
  this.snapFullThreshold = 30;
  this.snapSideThreshold = 30;
  this.heightSnapReleaseThreshold = 10;
  this.snapGapWidth = 0.5;
  this.snapInsertGaps = true;
  this._snapZone = "";
  this.pointerPosition = { x: 0, y: 0 };
  this._heightSnapReleased = false;
  this.activeDialog = null;
  this.topZ = 100;
  this.loaded = false;
  this.canSave = true;
  try {
    var hasLocalStorage2 = typeof localStorage !== "undefined";
    if (!hasLocalStorage2)
      this.canSave = false;
  } catch (ex) {
    console.warn("Local storage access denied.", ex);
  }
  this.ticking = false;
  this._pendingDragEvent = null;
  this.flipped = false;
  this.focusedDialog = null;
  this.synchronizing = false;
  this.channel = BroadcastChannel && new BroadcastChannel("lvos");
  this.channel.onmessage = function(ev) {
    var data = ev.data;
    if (typeof data === "string")
      try {
        data = JSON.parse(data);
      } catch (ex) {
        return console.warn(ex);
      }
    if (!data || typeof data !== "object" || typeof data.type !== "string")
      return;
    windowManager.handleBroadcast(data.type, data.data, __lvosGet(data, "id"));
  };
  var self2 = this;
  this.resizeHandler = function() {
    self2.forEachWindow(function(window2) {
      window2.update();
    });
  };
  this.windowDragEvent = function(event2) {
    try {
      if (event2 && !event2.which && !event2.button && event2.buttons === 0 && self2.isDragging) {
        self2.disableDialogDrag();
        return;
      }
      cancelDomEvent(event2);
      var isTouch = "pointerType" in event2 && event2.pointerType === "touch";
      self2.setPointerPosition(event2.clientX, event2.clientY);
      if (__lvosGet(flags, "updateRateLimit")) {
        self2._pendingDragEvent = event2;
        if (self2.ticking)
          return;
        self2.ticking = true;
        window.requestAnimationFrame(function() {
          var pending = self2._pendingDragEvent;
          self2._pendingDragEvent = null;
          self2.ticking = false;
          if (!pending)
            return;
          var touch = "pointerType" in pending && pending.pointerType === "touch";
          windowManager.handleWindowDrag(pending.clientX, pending.clientY, touch);
        });
      } else
        windowManager.handleWindowDrag(event2.clientX, event2.clientY, isTouch);
    } catch (ex) {
      console.warn(ex);
    }
  };
  this.windowSnap = new WindowSnap();
  this.snapGroups = /* @__PURE__ */ new Map();
  this.extensions = [];
}
__lvosDefineProperties(WindowManager.prototype, {
  windows: {
    get: function() {
      return this._windows;
    }
  },
  windowStates: {
    get: function() {
      if (!this._windowStates && localStorage)
        try {
          var string = localStorage.getItem("windowState");
          if (string === null)
            return null;
          this._windowStates = JSON.parse(string);
        } catch (ex) {
          console.log(ex);
        }
      return this._windowStates;
    }
  },
  state: {
    get: function() {
      var state = {};
      for (var id in __lvosGet(this, "windows"))
        if (__lvosGet(this, "windows").hasOwnProperty(id)) {
          var window2 = __lvosGet(this, "windows")[id];
          if (window2)
            state[id] = window2.getState();
        }
      return state;
    }
  },
  isBlurEnabled: {
    get: function() {
      return this._isBlurEnabled;
    },
    set: function(value) {
      if (typeof value === "boolean")
        this._isBlurEnabled = value;
    }
  },
  isWindowUpdatesEnabled: {
    get: function() {
      return this._isWindowUpdatesEnabled;
    },
    set: function(value) {
      if (value)
        window.addEventListener("resize", this.resizeHandler, false);
      else
        window.removeEventListener("resize", this.resizeHandler, false);
      this._isWindowUpdatesEnabled = value;
    }
  }
});
WindowManager.prototype.saveState = function() {
  if (!this.loaded)
    return;
  if (__lvosGet(window, "top") !== window.self)
    return;
  try {
    if (this.canSave && typeof localStorage !== "undefined")
      localStorage.setItem("windowState", JSON.stringify(__lvosGet(this, "state")));
  } catch (exception) {
    handleStorageException(exception);
  }
};
WindowManager.prototype.loadState = function(dialog) {
  if (!this.canSave)
    return;
  try {
    if (!("localStorage" in window))
      return;
    var windowStates = __lvosGet(this, "windowStates");
    this.loaded = true;
    if (!windowStates)
      return;
    if (dialog && __lvosGet(dialog, "id")) {
      dialog.loadState(windowStates[__lvosGet(dialog, "id")]);
      this.updateTopZ(__lvosGet(dialog, "z"));
    } else {
      for (var id in windowStates)
        if (windowStates.hasOwnProperty(id))
          try {
            var dialog = __lvosGet(this, "windows")[id];
            if (dialog && windowStates[id])
              dialog.loadState(windowStates[id]);
          } catch (ex) {
            console.log(ex);
          }
      this.updateTopZ();
    }
  } catch (exception) {
    handleStorageException(exception);
  }
};
WindowManager.prototype.forEachWindow = function(callback) {
  for (var id in __lvosGet(this, "windows"))
    if (__lvosGet(this, "windows").hasOwnProperty(id)) {
      var dialog = __lvosGet(this, "windows")[id];
      if (dialog)
        callback(dialog, id);
    }
};
WindowManager.prototype.synchronizeStates = function() {
  this.forEachWindow(function(dialog) {
    dialog.reportState();
  });
};
WindowManager.prototype.loadApp = function(app) {
  try {
    var dialog = new Dialog(app);
    this._windows[__lvosGet(app, "id")] = dialog;
    if (!(app instanceof HTMLElement))
      appManager.addApp(app);
    return dialog;
  } catch (ex) {
    console.warn("App load failed", ex);
    return null;
  }
};
WindowManager.prototype.spawnApp = function(application) {
  if (!application || !__lvosGet(application, "id"))
    return null;
  var id = __lvosGet(application, "id"), n = 1;
  while (this._windows[id])
    id = __lvosGet(application, "id") + "#" + ++n;
  var instance = {};
  for (var key in application)
    if (application.hasOwnProperty(key))
      instance[key] = application[key];
  __lvosSet(instance, "id", id);
  try {
    var dialog = new Dialog(instance);
    this._windows[id] = dialog;
    return dialog;
  } catch (ex) {
    console.warn("App spawn failed", ex);
    return null;
  }
};
WindowManager.prototype.installApp = function(url, title, id, iconUrl) {
  var application = {
    src: url,
    id: id || "custom." + getDomain(url),
    title: title || getSiteName(url) || "unkle"
  };
  if (iconUrl)
    __lvosSet(application, "iconUrl", iconUrl);
  this.loadApp(application);
  this.saveInstalledApp(application);
};
__lvosDefineProperty(WindowManager.prototype, "installedApps", {
  get: function() {
    if (typeof localStorage === "undefined")
      return [];
    try {
      var string = localStorage.getItem("installedApps");
      if (string === null)
        return [];
      var apps = JSON.parse(string);
      return apps instanceof Array ? apps : [];
    } catch (ex) {
      console.log(ex);
      return [];
    }
  }
});
WindowManager.prototype.saveInstalledApp = function(application) {
  if (!this.canSave || typeof localStorage === "undefined")
    return;
  try {
    var apps = __lvosGet(this, "installedApps");
    for (var i = 0; i < apps.length; i++)
      if (__lvosGet(apps[i], "id") === __lvosGet(application, "id"))
        return;
    apps.push(application);
    localStorage.setItem("installedApps", JSON.stringify(apps));
  } catch (exception) {
    handleStorageException(exception);
  }
};
WindowManager.prototype.loadInstalledApps = function() {
  if (!this.canSave || typeof localStorage === "undefined")
    return;
  try {
    __lvosGet(this, "installedApps").forEach(function(application) {
      if (application && __lvosGet(application, "src"))
        this.loadApp(application);
    }, this);
  } catch (exception) {
    handleStorageException(exception);
  }
};
WindowManager.prototype.installAppProxied = function(url, proxyUrl) {
  if (!proxyUrl)
    proxyUrl = "https://browz.netlify.app/browz-set-cookie/";
  this.installApp(proxyUrl + url, getSiteName(url) || "unkle", "custom." + getDomain(url), getFaviconUrl(url));
};
WindowManager.prototype.dropApplication = function(application, x, y, offset, state) {
  if (!application || !__lvosGet(application, "id"))
    return null;
  var dialog;
  if (application.multiple) {
    dialog = this.spawnApp(application);
  } else {
    dialog = __lvosGet(this, "windows")[__lvosGet(application, "id")];
    if (!dialog) {
      this.loadApp(application);
      dialog = __lvosGet(this, "windows")[__lvosGet(application, "id")];
    }
  }
  if (!dialog)
    return null;
  dialog.target.classList.remove("animating");
  if (typeof x === "number" && typeof y === "number")
    dialog.moveCenterTo(x - (offset ? __lvosGet(offset, "x") : 0), y - (offset ? __lvosGet(offset, "y") : 0), false);
  void dialog.target.offsetLeft;
  if (!state)
    state = {};
  __lvosSet(state, "x", __lvosGet(dialog, "x"));
  __lvosSet(state, "y", __lvosGet(dialog, "y"));
  dialog.loadState(state || {});
  return dialog;
};
WindowManager.prototype.toggleDragging = function(enabled) {
  ClickOffset.toggleDragEventHandler(enabled, this.windowDragEvent, "grabbing");
  this.isDragging = enabled;
};
WindowManager.prototype.getVisualizerApps = function() {
  var apps = [];
  this.forEachWindow(function(dialog) {
    if (dialog.application && dialog.application.audioVisualizer)
      apps.push(dialog.application);
  });
  return apps;
};
WindowManager.prototype.injectApplications = function() {
  for (var i = 0; i < arguments.length; i++)
    arguments[i].forEach(windowManager.loadApp, windowManager);
  windowManager.loadState();
};
WindowManager.windowBoundsInset = { top: 0, left: -100, right: -100, bottom: -100 };
WindowManager._windowBounds = { top: 0, left: 0, right: 0, bottom: 0 };
WindowManager.recalculateWindowBounds = function() {
  var inset = WindowManager.windowBoundsInset;
  __lvosSet(WindowManager._windowBounds, "top", __lvosGet(inset, "top") !== null ? __lvosGet(inset, "top") : -Infinity);
  __lvosSet(WindowManager._windowBounds, "left", __lvosGet(inset, "left") !== null ? __lvosGet(inset, "left") : -Infinity);
  __lvosSet(WindowManager._windowBounds, "right", __lvosGet(inset, "right") !== null ? window.innerWidth - __lvosGet(inset, "right") : Infinity);
  __lvosSet(WindowManager._windowBounds, "bottom", __lvosGet(inset, "bottom") !== null ? window.innerHeight - __lvosGet(inset, "bottom") : Infinity);
};
__lvosDefineProperty(WindowManager, "windowBounds", {
  get: function() {
    return WindowManager._windowBounds;
  }
});
WindowManager.prototype.focusDialog = function(dialog) {
  if (this.focusedDialog !== null && this.focusedDialog.target)
    this.focusedDialog.target.removeAttribute("focus");
  dialog.target.setAttribute("focus", String(true));
  this.focusedDialog = dialog;
};
WindowManager.prototype.activeDialogToMetro = function() {
  if (this.activeDialog)
    this.activeDialog.exportDialogBodyToMetro();
};
WindowManager.prototype.initializeDialogs = function() {
  var self2 = this;
  var stop = function() {
    self2.disableDialogDrag();
  };
  var event2 = supportsPointer ? "pointerup" : "mouseup";
  if (typeof document !== "undefined")
    document.addEventListener(event2, stop, false);
  if (typeof window !== "undefined")
    window.addEventListener(event2, stop, false);
  if (!supportsPointer && typeof document !== "undefined") {
    document.addEventListener("mouseup", stop, false);
  }
  if (!supportsPointer && typeof window !== "undefined") {
    window.addEventListener("mouseup", stop, false);
  }
  this.dragAction.set(0);
  if (typeof document !== "undefined") {
    var dialogs = document.getElementsByClassName("window");
    for (var i = 0; i < dialogs.length; i++) {
      var dialog = dialogs[i];
      if (Helpers.isElement(dialog))
        self2.loadApp(dialog);
    }
  }
  this.loadState();
  if (this.windowSnap && typeof this.windowSnap.init === "function")
    this.windowSnap.init();
};
WindowManager.prototype.windowActivationEvent = function(event2, dialog, id) {
  try {
    var node = event2 && (event2.target || event2.srcElement);
    var isInteractive = false;
    while (node && Helpers.isElement(node) && node.nodeType === 1) {
      var tn = (node.tagName || "").toLowerCase();
      if (tn === "input" || tn === "textarea" || tn === "select" || tn === "button" || tn === "a" || tn === "label" || tn === "output") {
        isInteractive = true;
        break;
      }
      if (node.hasAttribute && node.hasAttribute("contenteditable")) {
        isInteractive = true;
        break;
      }
      node = node.parentElement;
    }
    if (isInteractive) {
      try {
        dialog.focus();
      } catch (ex) {
        console.log(ex);
      }
      return dialog;
    }
  } catch (ex) {
    console.log(ex);
  }
  cancelDomEvent(event2);
  if (window.desktopManager && __lvosGet(window.desktopManager, "isExpos\xE9")) {
    var root = document.querySelector("main");
    if (root) {
      var section = dialog.target.closest("#window-section, .window-section");
      var origin = -1;
      if (section)
        for (var i = 0; i < window.desktopManager.desktops.length; i++) {
          var desktop = window.desktopManager.desktops[i];
          if (desktop && desktop.target === section) {
            origin = i;
            break;
          }
        }
      dialog._exposeOrigin = origin >= 0 ? { index: origin, x: __lvosGet(dialog, "x"), y: __lvosGet(dialog, "y") } : null;
      dialog.detachToRootKeepingVisual(root);
    }
  } else
    dialog.clearExpos\u00E9Visual();
  if (supportsPointer && event2 && "pointerId" in event2 && event2.target instanceof HTMLElement && typeof event2.target.setPointerCapture === "function") {
    try {
      event2.target.setPointerCapture(event2.pointerId);
    } catch (ex) {
      console.log(ex);
    }
  }
  this.activeDialog = dialog;
  this.isTouchDrag = event2 && "pointerType" in event2 && event2.pointerType === "touch";
  this.enableDialogDrag();
  this.dragAction.set(id || 0);
  dialog.setClickOffset(event2.clientX, event2.clientY);
  dialog.activate();
  if (this.isTouchDrag)
    this.windowSnap.moveToDialog(dialog, 0, this.dragAction.direction, false, this.isTouchDrag);
  this._snapZone = "";
  this._heightSnapReleased = false;
  return dialog;
};
WindowManager.prototype.handleWindowDrag = function(newX, newY, isTouch) {
  if (!this.isDragging)
    return;
  var dialog = this.activeDialog;
  if (!dialog || !dialog.clickOffset)
    return;
  if (__lvosGet(dialog, "maximized")) {
    if (!__lvosGet(flags, "aeroSnap"))
      return;
    var snapSection = this.getSnapContainer(dialog);
    dialog.remapClickOffset(0, 0, this.snapWidth(snapSection), this.snapHeight(snapSection));
    __lvosSet(dialog, "maximized", false);
  } else if (__lvosGet(dialog, "snapped")) {
    var frame = dialog._snapFrame;
    if (frame)
      dialog.remapClickOffset(__lvosGet(frame, "x"), __lvosGet(frame, "y"), __lvosGet(frame, "width"), __lvosGet(frame, "height"));
    this.unsnapDialog(dialog);
  }
  var difference = { x: newX - dialog.clickOffset.clickX, y: newY - dialog.clickOffset.clickY };
  if (__lvosGet(dialog, "heightSnapped")) {
    var gestureDirection = this.dragAction.direction;
    if (gestureDirection === 0) {
      if (__lvosGet(difference, "y") > this.heightSnapReleaseThreshold)
        dialog.toggleHeightSnapped(false);
    } else if (gestureDirection && this.isVerticalResizeDirection(gestureDirection)) {
      this.leaveHeightSnappedByResize(dialog);
    }
  }
  dialog.stopAnimating();
  var dragScale = typeof dialog._exposeVisualScale === "number" && dialog._exposeVisualScale > 0 ? dialog._exposeVisualScale : 1;
  if (typeof dialog._exposeVisualScale === "number" && !dialog._exposeGrab && dialog.clickOffset && __lvosGet(dialog, "content")) {
    var grabRect = __lvosGet(dialog, "content").getBoundingClientRect();
    if (__lvosGet(grabRect, "width"))
      dialog._exposeGrab = {
        x: (dialog.clickOffset.clickX - __lvosGet(grabRect, "left")) / dragScale,
        y: (dialog.clickOffset.clickY - __lvosGet(grabRect, "top")) / dragScale
      };
  }
  this.dragAction.execute(dialog, dialog.clickOffset, dragScale === 1 ? difference : { x: __lvosGet(difference, "x") / dragScale, y: __lvosGet(difference, "y") / dragScale });
  this.setPointerPosition(newX, newY);
  var snap = !(window.desktopManager && __lvosGet(window.desktopManager, "isExpos\xE9"));
  if (snap && this.dragAction.direction) {
    var snapZone = this.getGestureSnapZone(dialog, this.dragAction.direction, newX, newY);
    if (snapZone) {
      if (snapZone !== this._snapZone) {
        if (this._snapZone)
          this.windowSnap.hideBehind(dialog, !!isTouch);
        this._snapZone = snapZone;
        this.windowSnap.snap(snapZone, dialog);
      }
    } else if (this._snapZone) {
      this._snapZone = "";
      this.windowSnap.hideBehind(dialog, !!isTouch);
    } else if (isTouch) {
      this.windowSnap.moveToDialog(dialog, 20, this.dragAction.direction, true, true);
    }
  } else
    this.updateExpos\u00E9DragScale(dialog, newX, newY);
  if (dialog.moveEvents && dialog.exchangeDialogMoveEvent)
    dialog.exchangeDialogMoveEvent(difference);
};
WindowManager.prototype.updateExpos\u00E9DragScale = function(dialog, x, y) {
  var desktopManager = window.desktopManager;
  if (!desktopManager || typeof dialog._exposeVisualScale !== "number" || !dialog.target || !__lvosGet(dialog, "content"))
    return;
  var content = __lvosGet(dialog, "content");
  var grab = dialog._exposeGrab;
  if (!grab)
    return;
  var index = desktopManager.getDesktopIndexAt(x, y);
  var k = 1;
  if (index >= 0) {
    var desktop = desktopManager.desktops[index];
    if (!desktop)
      return;
    var desktopTarget = desktop.target;
    var area = desktopTarget.getBoundingClientRect();
    if (__lvosGet(area, "width") && desktopTarget.offsetWidth)
      k = __lvosGet(area, "width") / desktopTarget.offsetWidth;
  }
  if (!k)
    k = 1;
  var current = dialog._exposeContentScale || 1;
  if (Math.abs(k - current) >= 2e-3) {
    dialog._exposeContentScale = k;
    dialog._exposeVisualScale = k;
    content.style.transition = "scale 280ms cubic-bezier(0.44, 0.41, 0, 1)";
    content.style.scale = String(k);
    if (dialog._exposeScaleTimer)
      clearTimeout(dialog._exposeScaleTimer);
    dialog._exposeScaleTimer = setTimeout(function() {
      dialog._exposeScaleTimer = 0;
      content.style.transition = "";
    }, 300);
  }
  var rendered = content.getBoundingClientRect();
  var targetRect = dialog.target.getBoundingClientRect();
  if (!__lvosGet(rendered, "width") || !__lvosGet(targetRect, "width"))
    return;
  var renderedScale = dialog._exposeVisualWidth ? __lvosGet(rendered, "width") / dialog._exposeVisualWidth : k;
  if (!renderedScale)
    return;
  content.style.transform = "translate(" + Helpers.toPixels((x - __lvosGet(grab, "x") * renderedScale - __lvosGet(targetRect, "left")) / renderedScale) + "," + Helpers.toPixels((y - __lvosGet(grab, "y") * renderedScale - __lvosGet(targetRect, "top")) / renderedScale) + ")";
};
WindowManager.prototype.getSnapZone = function(x, y, section) {
  var area = section || this.getSnapContainer();
  var rect = area ? area.getBoundingClientRect() : null;
  var left = rect ? __lvosGet(rect, "left") : 0;
  var top = rect ? __lvosGet(rect, "top") : 0;
  var width = rect ? __lvosGet(rect, "width") : this.snapWidth(area);
  if (x <= left + this.snapSideThreshold)
    return "left";
  if (x >= left + width - this.snapSideThreshold)
    return "right";
  if (y <= top + this.snapFullThreshold)
    return "maximize";
  return "";
};
WindowManager.prototype.isVerticalResizeDirection = function(direction) {
  return direction === 1 || direction === 3 || direction === 5 || direction === 6 || direction === 7 || direction === 8;
};
WindowManager.prototype.leaveHeightSnappedByResize = function(dialog) {
  var drawnHeight = this.snapHeight(this.getSnapContainer(dialog));
  setClass(dialog.target, "height-snapped", false);
  dialog._snappingOut = false;
  dialog._snappingOutState = null;
  this._heightSnapReleased = true;
  dialog._y = 0;
  dialog._height = drawnHeight;
  dialog.updatePosition();
  dialog.updateHeight();
  var offset = dialog.clickOffset;
  if (offset) {
    __lvosSet(offset, "height", __lvosGet(dialog, "height"));
    offset.startX = __lvosGet(dialog, "x");
    offset.startY = __lvosGet(dialog, "y");
  }
};
WindowManager.prototype.getGestureSnapZone = function(dialog, direction, x, y) {
  if (!__lvosGet(flags, "aeroSnap") || __lvosGet(dialog, "heightSnapped") || this._heightSnapReleased)
    return "";
  var section = this.getSnapContainer(dialog);
  if (direction === 1 || direction === 3) {
    var bounds = __lvosGet(WindowManager, "windowBounds");
    var threshold = this.snapFullThreshold;
    var atEdge = direction === 1 ? __lvosGet(dialog, "y") <= __lvosGet(bounds, "top") + threshold : __lvosGet(dialog, "y") + __lvosGet(dialog, "height") >= this.snapHeight(section) - threshold;
    return atEdge ? "height" : "";
  }
  if (direction !== 0)
    return "";
  return this.getSnapZone(x, y, section);
};
WindowManager.prototype.getSnapContainer = function(dialog) {
  var target = dialog && dialog.target;
  if (target && target.closest) {
    var section = (
      /** @type {HTMLElement | null} */
      target.closest("#window-section, .window-section")
    );
    if (section)
      return section;
  }
  return document.getElementById("window-section");
};
WindowManager.prototype.getSnapGroup = function(section) {
  var group = this.snapGroups.get(section);
  if (!group) {
    group = { windows: [] };
    this.snapGroups.set(section, group);
  }
  return group;
};
WindowManager.prototype.snapWidth = function(section) {
  var area = section || this.getSnapContainer();
  return area ? area.clientWidth : window.innerWidth;
};
WindowManager.prototype.snapHeight = function(section) {
  var area = section || this.getSnapContainer();
  return area ? area.clientHeight : window.innerHeight;
};
WindowManager.prototype.setPointerPosition = function(x, y) {
  __lvosSet(this.pointerPosition, "x", x);
  __lvosSet(this.pointerPosition, "y", y);
};
WindowManager.prototype.snapDialog = function(dialog, zone) {
  if (zone === "height") {
    this.unsnapDialog(dialog);
    dialog.toggleHeightSnapped(true);
    return;
  }
  if (zone === "maximize") {
    this.unsnapDialog(dialog);
    dialog.maximize();
    return;
  }
  if (zone !== "left" && zone !== "right")
    return;
  this.tileDialog(dialog, zone);
};
WindowManager.prototype.tileDialog = function(dialog, side) {
  var section = this.getSnapContainer(dialog);
  if (!section)
    return;
  var group = this.getSnapGroup(section);
  var windows = (
    /** @type {WindowTile[]} */
    __lvosGet(group, "windows")
  );
  var index = this.findSnapTile(__lvosGet(dialog, "id"), section);
  var tile = index === -1 ? { id: __lvosGet(dialog, "id"), width: 0.5 } : windows[index];
  if (!tile)
    return;
  if (index !== -1)
    windows.splice(index, 1);
  if (side === "left")
    windows.unshift(tile);
  else
    windows.push(tile);
  if (this.snapInsertGaps)
    this.fitSnapGaps(section, windows, side);
  this.reflowSnapGroup(section);
  dialog.toggleSnapped(true);
};
WindowManager.prototype.fitSnapGaps = function(section, tiles, side) {
  for (var i = tiles.length - 1; i >= 0; i--) {
    var tile = tiles[i];
    if (tile && tile.gap)
      tiles.splice(i, 1);
  }
  if (tiles.length !== 1)
    return;
  var firstTile = tiles[0];
  if (!firstTile || !__lvosGet(firstTile, "id"))
    return;
  var dialog = __lvosGet(this, "windows")[__lvosGet(firstTile, "id")];
  if (!side && dialog && dialog.target) {
    var rect = dialog.target.getBoundingClientRect();
    var origin = section.getBoundingClientRect();
    side = __lvosGet(rect, "left") - __lvosGet(origin, "left") <= __lvosGet(origin, "width") / 2 ? "left" : "right";
  }
  tiles.splice(side === "right" ? 0 : 1, 0, { gap: true, width: this.snapGapWidth });
};
WindowManager.prototype.findSnapTile = function(id, section) {
  var windows = (
    /** @type {WindowTile[]} */
    __lvosGet(this.getSnapGroup(section), "windows")
  );
  for (var i = 0; i < windows.length; i++) {
    var dialog = windows[i];
    if (dialog && __lvosGet(dialog, "id") === id)
      return i;
  }
  return -1;
};
WindowManager.prototype.unsnapDialog = function(dialog) {
  var section = this.getSnapContainer(dialog);
  if (!section)
    return;
  var group = this.getSnapGroup(section);
  var windows = (
    /** @type {WindowTile[]} */
    __lvosGet(group, "windows")
  );
  var index = this.findSnapTile(__lvosGet(dialog, "id"), section);
  if (index === -1)
    return;
  var survivorSide;
  if (windows.length === 2 && this.snapInsertGaps) {
    if (index === 0) {
      survivorSide = "right";
    } else if (index === 1) {
      survivorSide = "left";
    }
  }
  windows.splice(index, 1);
  dialog.toggleSnapped(false);
  if (this.snapInsertGaps)
    this.fitSnapGaps(section, windows, survivorSide);
  this.reflowSnapGroup(section);
};
WindowManager.prototype.getSnapSpacer = function(section) {
  var group = this.getSnapGroup(section);
  if (!group.spacer) {
    group.spacer = document.createElement("div");
    group.spacer.className = "snap-spacer";
  }
  return group.spacer;
};
WindowManager.prototype.reflowSnapGroup = function(section) {
  var group = this.getSnapGroup(section);
  var tiles = (
    /** @type {WindowTile[]} */
    __lvosGet(group, "windows")
  );
  for (var s = tiles.length - 1; s >= 0; s--) {
    var stale = tiles[s];
    if (!stale || stale.gap)
      continue;
    var staleWindow = __lvosGet(stale, "id") ? __lvosGet(this, "windows")[__lvosGet(stale, "id")] : null;
    if (!staleWindow || !staleWindow.target || !staleWindow.target.parentNode || this.getSnapContainer(staleWindow) !== section)
      tiles.splice(s, 1);
  }
  var members = {};
  for (var m = 0; m < tiles.length; m++) {
    var memberTile = tiles[m];
    if (memberTile && __lvosGet(memberTile, "id"))
      members[__lvosGet(memberTile, "id")] = true;
  }
  for (var id in __lvosGet(this, "windows"))
    if (__lvosGet(this, "windows").hasOwnProperty(id)) {
      var dialog = __lvosGet(this, "windows")[id];
      if (!dialog || !dialog.target || members[id])
        continue;
      if (this.getSnapContainer(dialog) !== section)
        continue;
      dialog.target.style.removeProperty("flex");
      dialog.target.style.removeProperty("order");
    }
  var areaWidth = this.snapWidth(section);
  var areaHeight = this.snapHeight(section);
  var remaining = 1;
  var offset = 0;
  var usedSpacer = null;
  for (var k = 0; k < tiles.length; k++) {
    var tile = tiles[k];
    if (!tile)
      continue;
    var isLast = k === tiles.length - 1;
    var width = !this.snapInsertGaps && isLast ? remaining : __lvosGet(tile, "width") || 0.5;
    remaining -= width;
    var member = __lvosGet(tile, "id") ? __lvosGet(this, "windows")[__lvosGet(tile, "id")] : null;
    var element = tile.gap ? this.getSnapSpacer(section) : member && member.target;
    if (!element)
      continue;
    if (element.parentNode !== section)
      section.appendChild(element);
    element.style.order = String(k);
    element.style.flex = width + " 1 0%";
    if (tile.gap)
      usedSpacer = element;
    if (member && !tile.gap)
      member._snapFrame = {
        x: offset * areaWidth,
        y: 0,
        width: width * areaWidth,
        height: areaHeight
      };
    offset += width;
  }
  var spacer = (
    /** @type {HTMLElement | null} */
    group.spacer
  );
  if (spacer && usedSpacer !== spacer) {
    spacer.style.removeProperty("order");
    spacer.style.removeProperty("flex");
    if (spacer.parentNode)
      spacer.parentNode.removeChild(spacer);
  }
};
WindowManager.prototype.disableDialogDrag = function() {
  if (this.activeDialog)
    this.activeDialog._ctrlDrag = false;
  if (!this.isDragging)
    return;
  if (this._pendingDragEvent && this.activeDialog) {
    var pending = this._pendingDragEvent;
    this._pendingDragEvent = null;
    this.ticking = false;
    var pendingTouch = "pointerType" in pending && pending.pointerType === "touch";
    this.handleWindowDrag(pending.clientX, pending.clientY, pendingTouch);
  }
  var dragDirection = this.dragAction.direction;
  this.dragAction.set();
  this.toggleDragging(false);
  this.saveState();
  if (!this.activeDialog)
    return;
  if (this.isTouchDrag)
    this.activeDialog.setDragScale(1, 1);
  var snap = !(window.desktopManager && __lvosGet(window.desktopManager, "isExpos\xE9"));
  if (snap && dragDirection) {
    var snapZone = this.getGestureSnapZone(this.activeDialog, dragDirection, __lvosGet(this.pointerPosition, "x"), __lvosGet(this.pointerPosition, "y"));
    if (snapZone)
      this.snapDialog(this.activeDialog, snapZone);
    if (this.isTouchDrag) {
      this.windowSnap.hideBehind(this.activeDialog);
      this.isTouchDrag = false;
    }
    if (!__lvosGet(this.activeDialog, "maximized"))
      this.windowSnap.hideBehind(this.activeDialog);
    this._snapZone = "";
  } else if (window.desktopManager) {
    var desktopIndex = window.desktopManager.getDesktopIndexAt(__lvosGet(this.pointerPosition, "x"), __lvosGet(this.pointerPosition, "y"));
    if (desktopIndex >= 0)
      this.activeDialog.dropIntoDesktop(desktopIndex);
    else
      this.activeDialog.flyBackToExpos\u00E9Origin();
    this.isTouchDrag = false;
  }
  if (!this.activeDialog.moveEvents)
    return;
  var func = this.activeDialog.exchangeDialogMouseUpEvent;
  if (func)
    func();
};
WindowManager.prototype.enableDialogDrag = function() {
  this.toggleDragging(true);
};
WindowManager.prototype.updateTopZ = function(newZ) {
  if (typeof newZ === "number") {
    this.topZ = Math.max(this.topZ, newZ + 1);
    return;
  }
  var self2 = this;
  this.forEachWindow(function(dialog) {
    if (dialog && __lvosGet(dialog, "z") >= self2.topZ)
      self2.topZ = __lvosGet(dialog, "z") + 1;
  });
};
WindowManager.prototype.getWindowById = function(id) {
  return id ? __lvosGet(this, "windows")[id] : null;
};
WindowManager.prototype.broadcast = function(type, data, id) {
  LVMessenger.broadcast(this.channel, type, data, id);
};
WindowManager.prototype.broadcastTheme = function() {
  if (!document.hasFocus())
    return;
  this.broadcast("theme", { className: __lvosGet(document, "body").className });
};
WindowManager.prototype.handleBroadcast = function(type, data, id) {
  if (type === "theme") {
    var className = data && data.className;
    if (typeof className !== "string")
      return;
    __lvosGet(document, "body").className = className;
    this.forEachWindow(function(dialog2) {
      dialog2.messageFrame("theme", { className: className });
    });
    return;
  }
  if (type !== "dialog-state") {
    messageReceived(type, data, id);
    return;
  }
  if (!data || !id)
    return;
  var dialog = this.getWindowById(id);
  if (!dialog) {
    var app = appManager.getApp(id);
    if (!app)
      return;
    this.loadApp(app);
    dialog = __lvosGet(this, "windows")[id];
  }
  if (!dialog)
    return;
  this.synchronizing = false;
  try {
    dialog.loadState(data);
  } finally {
  }
};
WindowManager.prototype.getWindowOwningElement = function(el) {
  var found = false;
  var foundDialog = null;
  this.forEachWindow(function(dialog) {
    if (found)
      return;
    if (__lvosGet(dialog, "body") === el) {
      found = true;
      foundDialog = dialog;
    }
  });
  return foundDialog;
};
WindowManager.prototype.registerExtension = function(ext) {
  if (!ext || typeof ext !== "object")
    return null;
  if (typeof ext.enabled !== "boolean")
    ext.enabled = true;
  if (__lvosGet(ext, "id")) {
    var existing = this.getExtension(__lvosGet(ext, "id"));
    if (existing)
      this.extensions.splice(this.extensions.indexOf(existing), 1);
  }
  this.extensions.push(ext);
  if (ext.enabled)
    this.notifyExtension(ext, "onEnable");
  if (ext.flags)
    __lvosDefineProperties(flags, ext.flags);
  return ext;
};
WindowManager.prototype.getExtension = function(id) {
  for (var i = 0; i < this.extensions.length; i++) {
    var ext = this.extensions[i];
    if (ext && __lvosGet(ext, "id") === id)
      return ext;
  }
  return null;
};
WindowManager.prototype.setExtensionEnabled = function(ext, enabled) {
  if (!ext || typeof ext !== "object")
    return false;
  var value = !!enabled;
  if (!!ext.enabled === value)
    return value;
  ext.enabled = value;
  this.notifyExtension(ext, value ? "onEnable" : "onDisable");
  return value;
};
WindowManager.prototype.notifyExtension = function(ext, hook, dialog) {
  if (!ext || typeof ext !== "object")
    return;
  var callback = ext[hook];
  if (typeof callback !== "function")
    return;
  try {
    callback.call(ext, dialog);
  } catch (ex) {
    console.warn("Extension '" + (__lvosGet(ext, "id") || "unknown") + "' failed on " + hook + ":", ex);
  }
};
WindowManager.prototype.notifyExtensions = function(hook, dialog) {
  for (var i = 0; i < this.extensions.length; i++) {
    var ext = this.extensions[i];
    if (!ext || !ext.enabled)
      continue;
    this.notifyExtension(ext, hook, dialog);
  }
};
WindowSnap.margin = 15;
function WindowSnap() {
  this.element = document.createElement("div");
  __lvosSet(this.element, "id", "window-snap");
  this._snapped = "";
  this._section = null;
  if (document.documentMode && document.documentMode < 9)
    return;
  this.element.classList.add("hidden");
}
__lvosDefineProperty(WindowSnap.prototype, "hidden", {
  get: function() {
    return this.element.classList.contains("hidden");
  },
  set: function(enable) {
    if (enable)
      this.element.classList.add("hidden");
    else
      this.element.classList.remove("hidden");
  }
});
WindowSnap.prototype.init = function() {
  var snapParent = windowManager && windowManager.getSnapContainer() || document.getElementById("window-section") || document.getElementById("desktop") || __lvosGet(document, "body");
  this._section = snapParent;
  snapParent.insertBefore(this.element, snapParent.firstChild);
};
WindowSnap.prototype.attachTo = function(dialog) {
  var section = windowManager.getSnapContainer(dialog);
  if (!section)
    return;
  this._section = section;
  if (this.element.parentNode !== section || section.firstChild !== this.element)
    section.insertBefore(this.element, section.firstChild);
};
WindowSnap.prototype.moveToDialog = function(dialog, outset, direction, noAnimation, isTouch, preserveSnapped) {
  outset = outset || 0;
  this.attachTo(dialog);
  __lvosSet(this, "hidden", !outset);
  if (!preserveSnapped)
    this._snapped = "";
  if (!direction)
    outset = 0;
  var sides = [
    { top: true, right: true, bottom: true, left: true },
    { top: true, right: false, bottom: false, left: false },
    { top: false, right: true, bottom: false, left: false },
    { top: false, right: false, bottom: true, left: false },
    { top: false, right: false, bottom: false, left: true },
    { top: true, right: false, bottom: false, left: true },
    { top: true, right: true, bottom: false, left: false },
    { top: false, right: true, bottom: true, left: false },
    { top: false, right: false, bottom: true, left: true }
  ];
  var s = sides[direction || 0] || sides[0];
  if (!s)
    return;
  var top = __lvosGet(dialog, "top") - (__lvosGet(s, "top") ? outset : 0);
  var left = __lvosGet(dialog, "left") - (__lvosGet(s, "left") ? outset : 0);
  var right = __lvosGet(dialog, "right") - (__lvosGet(s, "right") ? outset : 0);
  var bottom = __lvosGet(dialog, "bottom") - (__lvosGet(s, "bottom") ? outset : 0);
  this.element.style.zIndex = __lvosGet(dialog, "z").toString();
  __lvosSet(this, "hidden", false);
  if (isTouch && !direction)
    dialog.setDragScale(0.9, 0.9);
  if (!noAnimation)
    animateElement(this.element, function() {
      this.applyInsetStyle(top, left, right, bottom);
    }, function(name) {
      return name === "inset";
    }, void 0, this, 200);
  else
    this.applyInsetStyle(top, left, right, bottom);
};
WindowSnap.prototype.applyInsetStyle = function(top, left, right, bottom) {
  insetElement(this.element, top, left, right, bottom);
};
WindowSnap.prototype.setInset = function(inset) {
  insetElement(this.element, inset);
};
WindowSnap.prototype.areaWidth = function() {
  var section = this._section || windowManager && windowManager.getSnapContainer() || document.getElementById("window-section");
  return section ? section.clientWidth : window.innerWidth;
};
WindowSnap.prototype.setHalfInset = function(side) {
  var half = Math.round(this.areaWidth() / 2);
  var inset = WindowSnap.margin;
  insetElement(this.element, inset, side === "left" ? inset : half + inset, side === "left" ? half + inset : inset, inset);
};
WindowSnap.prototype.setHeightInset = function(dialog) {
  if (!dialog)
    return;
  var inset = WindowSnap.margin;
  var right = this.areaWidth() - __lvosGet(dialog, "x") - __lvosGet(dialog, "width") - inset;
  insetElement(this.element, inset, Math.max(inset, __lvosGet(dialog, "left") - inset), Math.max(inset, right), inset);
};
WindowSnap.prototype.snap = function(type, dialog) {
  if (type === this._snapped)
    return;
  this._snapped = type;
  if (dialog)
    this.attachTo(dialog);
  if (dialog && __lvosGet(this, "hidden")) {
    this.element.classList.remove("animating");
    this.moveToDialog(dialog, 0, void 0, true, false, true);
    void this.element.offsetWidth;
  }
  __lvosSet(this, "hidden", false);
  if (dialog)
    this.element.style.zIndex = __lvosGet(dialog, "z").toString();
  animateElement(this.element, function() {
    switch (type) {
      case "maximize":
        this.setInset(WindowSnap.margin);
        break;
      case "left":
      case "right":
        this.setHalfInset(type);
        break;
      case "height":
        this.setHeightInset(dialog);
        break;
    }
  }, function(name) {
    return name === "inset";
  }, function() {
  }, this);
};
WindowSnap.prototype.hideBehind = function(dialog, keepScale) {
  if (!keepScale)
    dialog.setDragScale(1, 1);
  if (__lvosGet(this, "hidden"))
    return;
  animateElement(this.element, function() {
    this.moveToDialog(dialog, 0, void 0, true);
  }, function(name) {
    return name === "inset";
  }, function() {
    __lvosSet(this, "hidden", true);
  }, this, 120);
};
function ClickOffset() {
  this.clickX = 0;
  this.clickY = 0;
  __lvosSet(this, "height", 0);
  __lvosSet(this, "width", 0);
  this.startY = 0;
  this.startX = 0;
  this.start = new Vector();
  this.last = 0;
  this.start = 0;
  __lvosSet(this, "position", new Vector());
  this.lastPosition = new Vector();
  this.difference = new Vector();
  this.dragHandler = null;
}
ClickOffset._overlay = document.createElement("div");
ClickOffset._overlay.className = "drag-overlay";
ClickOffset._overlay.style.display = "block";
ClickOffset.disableOverlay = function(ev) {
  if (ev && (ev.buttons || ev.which || ev.button || window.windowManager && window.windowManager.isDragging))
    return;
  if (ClickOffset._overlay.remove)
    ClickOffset._overlay.remove();
  else if (ClickOffset._overlay.parentNode)
    ClickOffset._overlay.parentNode.removeChild(ClickOffset._overlay);
};
window.addEventListener("mousemove", ClickOffset.disableOverlay, false);
window.addEventListener("mouseup", ClickOffset.disableOverlay, false);
window.addEventListener("mouseout", ClickOffset.disableOverlay, false);
ClickOffset.dragStopTimer = 0;
ClickOffset.handleMouseDrag = function(ev) {
  ClickOffset.disableOverlay(ev);
  clearTimeout(ClickOffset.dragStopTimer);
  ClickOffset.dragStopTimer = setTimeout(function() {
  }, 50);
};
ClickOffset.prototype.reset = function() {
  var self2 = this;
  self2.start = Date.now();
  self2.last = self2.start;
  __lvosSet(__lvosGet(self2, "position"), "x", 0);
  __lvosSet(__lvosGet(self2, "position"), "y", 0);
  return this;
};
ClickOffset.prototype.update = function(x, y) {
  var self2 = this;
  self2.last = Date.now();
  __lvosSet(__lvosGet(self2, "position"), "x", x);
  __lvosSet(__lvosGet(self2, "position"), "y", y);
  var lastPosition = __lvosGet(self2, "position").clone();
  self2.difference = self2.lastPosition.clone().sub(__lvosGet(self2, "position"));
  self2.lastPosition = lastPosition;
  return self2;
};
ClickOffset.prototype.clear = function() {
  this.clickX = 0;
  this.clickY = 0;
};
ClickOffset.prototype.init = function(x, y, width, height, startX, startY) {
  this.reset();
  this.clickX = x;
  this.clickY = y;
  if (typeof width !== "number" || typeof height !== "number" || typeof startX !== "number" || typeof startY !== "number")
    return;
  __lvosSet(this, "width", width);
  __lvosSet(this, "height", height);
  this.startX = startX;
  this.startY = startY;
  return this;
};
ClickOffset.toggleDragEventHandler = function(enable, handler, cursor) {
  if (enable)
    document.addEventListener(supportsPointer ? "pointermove" : "mousemove", handler, false);
  else
    document.removeEventListener(supportsPointer ? "pointermove" : "mousemove", handler, false);
  if (!__lvosGet(flags, "useDragOverlay") || !this._overlay) {
    windowManager.forEachWindow(function(dialog) {
      dialog.togglePointerEvents(!enable);
    });
    return;
  }
  if (cursor)
    this._overlay.style.cursor = cursor;
  else
    this._overlay.style.cursor = "";
  if (enable)
    __lvosGet(document, "body").appendChild(this._overlay);
  else
    this.disableOverlay();
};
ClickOffset.prototype.toggleDragEventHandler = function(enable, cursor) {
  if (this.dragHandler)
    ClickOffset.toggleDragEventHandler(enable, this.dragHandler, cursor);
};
function Transformable(target) {
  this.target = target;
  this._transform = {};
  this._perspective = 100;
}
__lvosDefineProperty(Transformable.prototype, "perspective", {
  get: function() {
    return this._perspective;
  },
  set: function(value) {
    var parent = this.target.parentElement;
    if (parent)
      parent.style.perspective = Helpers.toPixels(this._perspective = value);
  }
});
Transformable.prototype.applyTransform = function() {
  transformElement(this.target, this._transform);
};
Transformable.prototype.update = function(animate) {
  if (animate)
    animateElement(this.target, this.applyTransform, "transform", void 0, this, 1e3);
  else
    this.applyTransform();
};
Transformable.prototype.move = function(x, y, animate) {
  __lvosSet(this._transform, "x", x);
  __lvosSet(this._transform, "y", y);
  this.update(animate);
};
Transformable.prototype.scale = function(x, y, update, animate) {
  this._transform.scaleX = x || 1;
  __lvosSet(this._transform, "scaleY", y || 1);
  if (update)
    this.update(animate);
};
Transformable.prototype.rotate = function(x, y, z, animate) {
  if (y === void 0 && z === void 0)
    this._transform.rotate = x;
  else {
    this._transform.rotateX = x;
    this._transform.rotateY = y;
    this._transform.rotateZ = z;
  }
  this.update(animate);
};
function ensureClassList(elem) {
  if (elem.classList)
    return;
  elem.classList = {
    add: function(cls) {
      if (!this.contains(cls)) {
        elem.className = (elem.className ? elem.className + " " : "") + cls;
      }
    },
    remove: function(cls) {
      var classes = (elem.className || "").split(/\s+/);
      for (var i = classes.length - 1; i >= 0; i--) {
        if (classes[i] === cls)
          classes.splice(i, 1);
      }
      elem.className = classes.join(" ");
    },
    contains: function(cls) {
      return new RegExp("(^|\\s+)" + cls + "(\\s+|$)").test(elem.className || "");
    },
    toggle: function(cls) {
      if (this.contains(cls)) {
        this.remove(cls);
        return false;
      } else {
        this.add(cls);
        return true;
      }
    }
  };
}
function Dialog(object) {
  this._x = 0;
  this._y = 0;
  this._z = 0;
  this._width = 0;
  this._height = 0;
  this._isMinWidth = false;
  this._isMinHeight = false;
  this._popupWindow = null;
  this._src = null;
  this._loaded = false;
  this._previousX = 0;
  this._previousY = 0;
  this._minWidth = 200;
  this._minHeight = 200;
  this._maxWidth = 1e3;
  this._maxHeight = 1e3;
  this._minAspectRatio = 0;
  this._maxAspectRatio = Infinity;
  this._aspectRatio = 0;
  this._aspectRatioEnabled = false;
  this._constrainAspectRatioInner = false;
  this._constrainAspectRatioLine = false;
  this._useTransform = useTransform;
  this._useScale = useScale;
  this._skew = 0;
  this._scaleX = 0;
  this._scaleY = 0;
  this._rotation = 0;
  this._transform = null;
  this._contentTransform = null;
  this.dragScaleDuration = 280;
  this._dragScaleAnimating = false;
  this._maximizing = false;
  this.maximizeAnimations = 0;
  this.fixed = false;
  this._stateOpen = false;
  this._bodyOffset = { width: 0, height: 0, x: 0, y: 0 };
  this._animationProps = { _fsTimeout: 0, _fsRaf: null, _fsToken: null, _fsTokenAtStart: null };
  if (!object)
    return;
  var id = __lvosGet(object, "id");
  this.application = null;
  if (!Helpers.isElement(object))
    this.application = object;
  else
    this.target = object;
  if (!id)
    id = __lvosGet(object, "title");
  if (__lvosGet(object, "title"))
    this._title = __lvosGet(object, "title");
  else {
    var titleElement = this.getTitleElement();
    if (titleElement)
      this._title = titleElement.innerText;
    if (!id)
      id = __lvosGet(this, "id") || __lvosGet(this, "title") || "";
  }
  this._id = id;
  this.buttons = [];
  this.clickOffset = new ClickOffset();
  var appList = document.getElementById("applist");
  if (appList)
    appList.appendChild(this.createOpenButton());
  var metroAppList = document.getElementById("metroapplist");
  if (metroAppList)
    metroAppList.appendChild(this.createOpenButton());
  this._popupPositionInterval = 0;
  this.dragging = false;
  this._ctrlDrag = false;
  this._appIcon = null;
  var self2 = this;
  this.activationHandler = function(ev, id2) {
    self2._ctrlDrag = !!ev.ctrlKey;
    if (ev.ctrlKey) {
      ev.stopImmediatePropagation();
      return;
    }
    ensureClassList(ev.target);
    if (ev.target instanceof HTMLElement && ev.target.classList.contains("touch") && (!("pointerType" in ev) || ev.pointerType !== "touch"))
      return false;
    windowManager.windowActivationEvent(ev, self2, id2);
    return true;
  };
  if (object instanceof Dialog) {
    if (object.application)
      object = object.application;
  }
  this.target;
  this.moveEvents = false;
  this.scroll = false;
  if (!(object instanceof Dialog)) {
    if (Helpers.isElement(object)) {
      this.target = object;
      if (this.target.parentElement && this.target.parentElement.nodeName === "TEMPLATE")
        return;
      this.close();
    } else {
      if (object.exists) {
        var element = document.getElementById(__lvosGet(object, "id"));
        if (element && this.application) {
          this.target = element;
          var doc = __lvosGet(this, "contentDocument");
          if (doc && doc.readyState !== "complete")
            this.openUrl(__lvosGet(this.application, "src"));
        }
      } else {
        this.target = createDialogElement();
        this.openUrl(__lvosGet(object, "src"));
      }
      if (__lvosGet(this, "windowTarget"))
        __lvosGet(this, "windowTarget").dialog = this;
      if (object.classes && typeof object.classes === "object") {
        object.classes.forEach(function(clazz) {
          this.target && this.target.classList.add(clazz);
        }, this);
      }
      this.setTitle(__lvosGet(object, "title"));
      this.fixed = object.fixed || false;
      this.scroll = object.scroll || false;
      if (__lvosGet(this, "frame")) {
        if (object.microphone || object.camera)
          __lvosGet(this, "frame").setAttribute("allow", "camera; microphone");
        __lvosGet(this, "frame").setAttribute("allow", "fullscreen");
      }
      this.moveEvents = object.moveEvents || false;
      this.setIcon(this.getMiniIconUrl(), function() {
        self2.setIcon(self2.getIconUrl());
      });
    }
  }
  this.setMinSize(180, 250, false);
  this.toggleCloseButton(true);
  this.toggleFullButton(true);
  if (this.verifyEjectCapability())
    this.toggleEjectButton(true);
  this.exchangeDialogMouseUpEvent = this.messageFrame.bind(this, "mouseUp", { difference: new Vector() });
  var self2 = this;
  this.exchangeDialogMoveEvent = function(difference) {
    if (difference && self2.clickOffset)
      this.messageFrame("windowMove", self2.clickOffset.update(__lvosGet(difference, "x"), __lvosGet(difference, "y")));
  };
  if (!this.target.classList)
    ensureClassList(this.target);
  var target = this.target;
  var buttons = target.getElementsByTagName("button");
  var createSizers = true;
  if (__lvosGet(this, "resizable") && createSizers)
    this._createSizers();
  target.addEventListener("selectstart", function(event2) {
    if (self2._ctrlDrag)
      return;
    cancelDomEvent(event2);
  }, false);
  var body = __lvosGet(this, "body");
  if (body)
    body.addEventListener("load", function() {
      try {
        self2.verifyEjectCapability();
      } catch (exception) {
        console.log(exception);
        if (buttons[0])
          buttons[0].style.display = "none";
      }
    }, false);
  var header = __lvosGet(this, "titleBar");
  if (header)
    target.addEventListener("dblclick", function(event2) {
      var rect = getRect(header);
      if (!rect || event2.clientX < __lvosGet(rect, "left") || event2.clientX > __lvosGet(rect, "right") || event2.clientY < __lvosGet(rect, "top") || event2.clientY > __lvosGet(rect, "bottom"))
        return;
      var node = event2.target instanceof HTMLElement ? event2.target : null;
      while (node && node !== header) {
        if (node.nodeName && node.nodeName.toLowerCase() === "button")
          return;
        node = node.parentElement;
      }
      self2.toggleMaximized();
    }, false);
  if (supportsPointer)
    target.addEventListener("pointerdown", this.activationHandler, false);
  else
    target.addEventListener("mousedown", this.activationHandler, false);
  var ejectButton = buttons[windowButtons.eject];
  if (ejectButton)
    ejectButton.addEventListener("click", this.eject.bind(this), false);
  var closeButton = buttons[windowButtons.close];
  if (closeButton)
    closeButton.addEventListener("click", this.close.bind(this), false);
  var fullscreenButton = buttons[windowButtons.full];
  if (fullscreenButton)
    fullscreenButton.addEventListener("click", this.toggleMaximized.bind(this, void 0), false);
  this.toggleOpen(false);
  target.addEventListener("dragstart", function(event2) {
    if (!(event2.ctrlKey || self2._ctrlDrag) || !event2.dataTransfer || !self2.application) {
      event2.preventDefault();
      return;
    }
    var dragState = {
      state: self2.getState(),
      app: self2.application
    };
    var rect = getRect(self2.target);
    if (rect)
      dragState.offset = {
        x: event2.clientX - (__lvosGet(rect, "left") + __lvosGet(rect, "width") / 2),
        y: event2.clientY - (__lvosGet(rect, "top") + __lvosGet(rect, "height") / 2)
      };
    var data = JSON.stringify(dragState);
    var transfer = event2.dataTransfer;
    try {
      transfer.setData("application/json", data);
      if (flagsieDropCompatibleMode) {
        transfer.setData("Text", data);
        transfer.setData("text/plain", data);
      } else
        transfer.setData("text/plain", __lvosGet(self2, "src") || __lvosGet(self2, "title") || __lvosGet(self2, "id"));
      if (__lvosGet(self2, "src"))
        transfer.setData("text/uri-list", __lvosGet(self2, "src"));
      transfer.setData("text/html", data);
      transfer.setData("URL", __lvosGet(self2, "src") + "\n" + data);
    } catch (ex) {
      console.warn(ex);
      transfer.setData("Text", data);
      if (__lvosGet(self2, "src"))
        transfer.setData("URL", __lvosGet(self2, "src"));
      transfer.setData("URL", "https://example.com");
    }
    transfer.effectAllowed = "copyMove";
    self2.target.classList.add("hidden");
  }, false);
  target.addEventListener("dragend", function() {
    self2._ctrlDrag = false;
  }, false);
  if (__lvosGet(this, "id"))
    __lvosGet(windowManager, "windows")[__lvosGet(this, "id")] = this;
  this.updateUseTransform(__lvosGet(this, "useTransform"));
  this.updateScale(__lvosGet(this, "useScale"));
  this.update();
  if (!Helpers.isElement(object))
    if (object instanceof Dialog)
      this.move(__lvosGet(object, "x"), __lvosGet(object, "y"));
    else
      this.moveCenterTo(window.innerWidth / 2, window.innerHeight / 2);
  if (__lvosGet(this, "frame"))
    __lvosGet(this, "frame").addEventListener("load", function() {
      self2._loaded = true;
    }, false);
  if (!this.scroll && __lvosGet(this, "body"))
    __lvosGet(this, "body").style.overflow = "hidden";
  this.originalBody = __lvosGet(this, "body");
  if (!this.scroll && __lvosGet(this, "body"))
    __lvosGet(this, "body").style.overflow = "hidden";
}
;
Dialog.prototype.getElementByTagOrClassName = function(name, parent) {
  var target = parent || this.target;
  if (!target)
    return null;
  var elements2 = target.getElementsByTagName(name);
  if (!elements2 || !elements2.length)
    elements2 = target.getElementsByClassName(name);
  var element = elements2.length ? elements2[0] : null;
  if (Helpers.isElement(element))
    return element;
  return null;
};
Dialog.prototype.setParentElement = function(element) {
  var target = this.target;
  if (target.parentNode === element)
    return;
  if (typeof element.moveBefore === "function" && target.isConnected)
    try {
      return element.moveBefore(target, null);
    } catch (ex) {
      console.warn("Not eligible for a move (e.g. a shadow root): use the compatible path.", ex);
    }
  element.appendChild(target);
};
Dialog.prototype.moveToDesktop = function(i) {
  if (__lvosGet(this, "snapped") && windowManager)
    windowManager.unsnapDialog(this);
  if (window.desktopManager) {
    var desktop = window.desktopManager.desktops[i];
    if (desktop)
      desktop.insertWindow(this);
  }
};
Dialog.prototype.detachToRootKeepingVisual = function(root) {
  var target = this.target;
  var before = target.getBoundingClientRect();
  this.setParentElement(root);
  var after = target.getBoundingClientRect();
  if (!__lvosGet(before, "width") || !__lvosGet(after, "width"))
    return;
  var scale = __lvosGet(before, "width") / __lvosGet(after, "width");
  var content = __lvosGet(this, "content");
  if (!content || !scale)
    return;
  content.style.transformOrigin = "0 0";
  content.style.scale = String(scale);
  var measured = content.getBoundingClientRect();
  content.style.transform = "translate(" + Helpers.toPixels((__lvosGet(before, "left") - __lvosGet(measured, "left")) / scale) + "," + Helpers.toPixels((__lvosGet(before, "top") - __lvosGet(measured, "top")) / scale) + ")";
  this._exposeVisualScale = scale;
  this._exposeContentScale = scale;
  this._exposeVisualWidth = __lvosGet(after, "width");
};
Dialog.prototype.clearExpos\u00E9Visual = function() {
  this._exposeOrigin = null;
  if (typeof this._exposeVisualScale !== "number")
    return;
  var content = __lvosGet(this, "content");
  if (content) {
    content.style.transform = "";
    content.style.transformOrigin = "";
    content.style.scale = "";
    content.style.transition = "";
  }
  if (this._exposeScaleTimer) {
    clearTimeout(this._exposeScaleTimer);
    this._exposeScaleTimer = 0;
  }
  this._exposeVisualScale = void 0;
  this._exposeVisualWidth = void 0;
  this._exposeContentScale = void 0;
  this._exposeGrab = null;
};
Dialog.prototype.dropIntoDesktop = function(i) {
  var visualLeft = null, visualTop = null, unscaledWidth = this._exposeVisualWidth;
  if (__lvosGet(this, "content")) {
    var rendered = __lvosGet(this, "content").getBoundingClientRect();
    if (__lvosGet(rendered, "width"))
      visualLeft = __lvosGet(rendered, "left"), visualTop = __lvosGet(rendered, "top");
  }
  this.moveToDesktop(i);
  this.clearExpos\u00E9Visual();
  if (visualLeft === null || visualTop === null || !this.target || !unscaledWidth)
    return;
  var placed = this.target.getBoundingClientRect();
  if (!__lvosGet(placed, "width"))
    return;
  var desktopScale = __lvosGet(placed, "width") / unscaledWidth;
  if (!desktopScale)
    return;
  this.move(__lvosGet(this, "x") + (visualLeft - __lvosGet(placed, "left")) / desktopScale, __lvosGet(this, "y") + (visualTop - __lvosGet(placed, "top")) / desktopScale);
};
Dialog.prototype.flyBackToExpos\u00E9Origin = function() {
  var origin = this._exposeOrigin;
  this.clearExpos\u00E9Visual();
  if (!origin || !window.desktopManager)
    return;
  var desktop = window.desktopManager.desktops[origin.index];
  if (!desktop)
    return;
  desktop.insertWindow(this);
  this.move(__lvosGet(origin, "x"), __lvosGet(origin, "y"), false);
  this.animate(this.updatePosition);
};
Dialog.prototype._createSizers = function(createTouchSizers) {
  var self2 = this;
  var target = this.target;
  if (typeof createTouchSizers === "undefined")
    createTouchSizers = supportsPointer;
  var createSizer = function(id) {
    if (!target || !self2.activationHandler)
      return;
    var sizerId = "sizer-" + id;
    var sizer = self2.getElementByTagOrClassName(sizerId);
    if (!sizer || !Helpers.isElement(sizer))
      sizer = document.createElement("div");
    ensureClassList(sizer);
    sizer.draggable = false;
    __lvosSet(sizer, "id", id.toString());
    sizer.classList.add(sizerId);
    var pointerDown = function(ev) {
      if (!self2.activationHandler || !self2.activationHandler(ev, id))
        return;
      windowManager.dragAction.set(id);
      if (windowManager.isTouchDrag)
        windowManager.windowSnap.moveToDialog(self2, 20, id);
      cancelDomEvent(ev);
    };
    var pointerUp = function() {
      windowManager.disableDialogDrag();
    };
    if (supportsPointer) {
      sizer.onpointerdown = pointerDown;
      sizer.onpointerup = pointerUp;
      sizer.onpointercancel = pointerUp;
    } else
      sizer.onmousedown = pointerDown;
    target.appendChild(sizer);
    if (createTouchSizers) {
      var touchSizerId = "touch-sizer-" + id;
      var touchSizer = self2.getElementByTagOrClassName(touchSizerId);
      if (!touchSizer || !Helpers.isElement(touchSizer))
        touchSizer = document.createElement("div");
      touchSizer.draggable = false;
      __lvosSet(touchSizer, "id", "touch-" + id);
      touchSizer.classList.add(touchSizerId);
      touchSizer.classList.add("touch");
      if (supportsPointer) {
        touchSizer.onpointerdown = pointerDown;
        touchSizer.onpointerup = pointerUp;
        touchSizer.onpointercancel = pointerUp;
      }
      target.appendChild(touchSizer);
    }
  };
  for (var i = 0; i < 8; i++)
    createSizer.call(this, i + 1);
};
Dialog.prototype.reportState = function() {
  this.messageFrame("window-size", {});
  this.messageFrame("theme", { className: __lvosGet(document, "body").className });
  windowManager.broadcastTheme();
};
Dialog.prototype.toggleOpen = function(forceOpen, kill) {
  var self2 = this;
  var wasOpen = this._stateOpen;
  this._stateOpen = forceOpen || false;
  this.toggleClassAnimated("open", forceOpen, function(a) {
    return a === "opacity";
  }, function(opened) {
    if ((kill || __lvosGet(flags, "windowReaper")) && !opened)
      self2.kill();
    if (opened)
      self2.reportState();
  }, function(opening) {
    self2._stateOpen = opening;
    if (opening)
      self2.activate();
    if (__lvosGet(flags, "windowReaper") && !opening)
      setTimeout(function() {
      }, 1e3);
  });
  windowManager.saveState();
  self2.reportState();
  if (wasOpen !== this._stateOpen)
    this.broadcastState({ open: this._stateOpen === true });
};
Dialog.prototype.getOrCreateFrame = function(create) {
  var frame = __lvosGet(this, "frame");
  if (frame || !create || !__lvosGet(this, "body"))
    return frame;
  return __lvosGet(this, "body").appendChild(document.createElement("iframe"));
};
__lvosDefineProperties(Dialog.prototype, {
  isOpen: {
    get: function() {
      return Boolean(this.target && this.target.classList.contains("open"));
    },
    set: function(open) {
      this.toggleOpen(open);
    }
  },
  frame: {
    get: function() {
      return this.target && this.target.getElementsByTagName("iframe")[0] || null;
    }
  },
  resizable: {
    get: function() {
      return !this.application ? true : __lvosGet(this.application, "resizable") !== false;
    },
    set: function(v) {
      if (v)
        this._createSizers();
    }
  },
  src: {
    get: function() {
      return this._src || this.application && __lvosGet(this.application, "src");
    },
    set: function(url) {
      this.openUrl(url);
    }
  },
  body: {
    get: function() {
      var content = __lvosGet(this, "content");
      if (!content)
        return null;
      return this.getElementByTagOrClassName("article", content);
    }
  },
  titleBar: {
    get: function() {
      return this.getElementByTagOrClassName("header");
    }
  },
  contentDocument: {
    get: function() {
      var frame = __lvosGet(this, "frame");
      return frame && __lvosGet(frame, "contentDocument");
    }
  },
  contentWindow: {
    get: function() {
      var frame = __lvosGet(this, "frame");
      return frame ? __lvosGet(frame, "contentWindow") : null;
    }
  },
  x: {
    get: function() {
      return this._x * window.innerWidth;
    },
    set: function(x) {
      if (typeof x === "number")
        this.move(x, __lvosGet(this, "y"));
    }
  },
  y: {
    get: function() {
      return this._y * window.innerHeight;
    },
    set: function(y) {
      if (typeof y === "number")
        this.move(__lvosGet(this, "x"), y);
    }
  },
  z: {
    get: function() {
      return this._z;
    },
    set: function(z) {
      if (typeof z === "number")
        this.setZ(z);
    }
  },
  width: {
    get: function() {
      return this._width;
    },
    set: function(width) {
      this.setWidth(width);
    }
  },
  height: {
    get: function() {
      return this._height;
    },
    /** @param {number} height */
    set: function(height) {
      this.setHeight(height);
    }
  },
  minWidth: {
    get: function() {
      return this._minWidth;
    },
    set: function(width) {
      this.setMinSize(width);
    }
  },
  minHeight: {
    get: function() {
      return this._minHeight;
    },
    set: function(height) {
      this.setMinSize(__lvosGet(this, "minWidth"), height);
    }
  },
  maxWidth: {
    get: function() {
      return this._maxWidth;
    },
    set: function(width) {
      this.setMaxSize(width);
    }
  },
  maxHeight: {
    get: function() {
      return this._maxHeight;
    },
    set: function(height) {
      this.setMaxSize(__lvosGet(this, "maxWidth"), height);
    }
  },
  position: {
    get: function() {
      return new Vector(__lvosGet(this, "x"), __lvosGet(this, "y"));
    },
    set: function(position) {
      if (position instanceof Vector)
        this.move(__lvosGet(position, "x"), __lvosGet(position, "y"));
    }
  },
  size: {
    get: function() {
      return new Vector(__lvosGet(this, "width"), __lvosGet(this, "height"));
    },
    set: function(size) {
      if (typeof __lvosGet(size, "x") !== "number" || typeof __lvosGet(size, "y") !== "number")
        return;
      this.resize(__lvosGet(size, "x"), __lvosGet(size, "y"));
    }
  },
  aspectRatio: {
    get: function() {
      return __lvosGet(this, "width") / __lvosGet(this, "height");
    },
    set: function(aspect) {
      __lvosSet(this, "width", __lvosGet(this, "height") * aspect);
    }
  },
  aspectRatioConstraint: {
    get: function() {
      return this._aspectRatio;
    },
    set: function(aspect) {
      this._aspectRatio = typeof aspect === "number" && aspect > 0 ? aspect : 0;
    }
  },
  constrainAspectRatio: {
    get: function() {
      return this._aspectRatioEnabled;
    },
    set: function(enabled) {
      if (!this._aspectRatio)
        this._aspectRatio = __lvosGet(this, "aspectRatio");
      this._aspectRatioEnabled = !!enabled;
    }
  },
  constrainAspectRatioInner: {
    get: function() {
      return this._constrainAspectRatioInner;
    },
    set: function(enabled) {
      this._constrainAspectRatioInner = !!enabled;
    }
  },
  constrainAspectRatioLine: {
    get: function() {
      return this._constrainAspectRatioLine;
    },
    set: function(enabled) {
      this._constrainAspectRatioLine = !!enabled;
    }
  },
  minAspectRatio: {
    get: function() {
      return this._minAspectRatio;
    },
    set: function(aspect) {
      __lvosSet(this, "width", __lvosGet(this, "height") * aspect);
    }
  },
  maxAspectRatio: {
    get: function() {
      return this._maxAspectRatio;
    },
    set: function(aspect) {
      __lvosSet(this, "width", __lvosGet(this, "height") * aspect);
    }
  },
  top: {
    get: function() {
      return __lvosGet(this, "y");
    },
    set: function(top) {
      var bounds = __lvosGet(WindowManager, "windowBounds");
      var bottom = __lvosGet(this, "bottomFromTop");
      if (__lvosGet(bounds, "bottom") !== Infinity && bottom >= __lvosGet(bounds, "bottom") - 0.5)
        bottom = __lvosGet(bounds, "bottom");
      if (top < __lvosGet(bounds, "top"))
        top = __lvosGet(bounds, "top");
      var height = Math.max(Math.min(bottom - top, __lvosGet(this, "maxHeight")), __lvosGet(this, "minHeight"));
      top = bottom - height;
      this._height = height;
      this._y = top / window.innerHeight;
      if (__lvosGet(this, "useTransform")) {
        this.target.style.height = Helpers.toPixels(height);
        this.updateTransform();
      } else
        this.setInset(top, __lvosGet(this, "left"), __lvosGet(this, "right"), window.innerHeight - bottom);
      this._isMinHeight = height === __lvosGet(this, "minHeight");
    }
  },
  left: {
    get: function() {
      return __lvosGet(this, "x");
    },
    set: function(left) {
      var bounds = __lvosGet(WindowManager, "windowBounds");
      var right = __lvosGet(this, "rightFromLeft");
      if (__lvosGet(bounds, "right") !== Infinity && right >= __lvosGet(bounds, "right") - 0.5)
        right = __lvosGet(bounds, "right");
      if (left < __lvosGet(bounds, "left"))
        left = __lvosGet(bounds, "left");
      var width = Math.max(Math.min(right - left, __lvosGet(this, "maxWidth")), __lvosGet(this, "minWidth"));
      left = right - width;
      this._width = width;
      this._x = left / window.innerWidth;
      if (__lvosGet(this, "useTransform")) {
        this.target.style.width = Helpers.toPixels(width);
        this.updateTransform();
      } else
        this.setInset(__lvosGet(this, "top"), left, window.innerWidth - right, __lvosGet(this, "bottom"));
      this._isMinWidth = width === __lvosGet(this, "minWidth");
    }
  },
  rightFromLeft: {
    get: function() {
      return __lvosGet(this, "x") + __lvosGet(this, "width");
    },
    set: function(right) {
      __lvosSet(this, "width", right - __lvosGet(this, "x"));
    }
  },
  right: {
    get: function() {
      var rfl = __lvosGet(this, "rightFromLeft");
      return typeof rfl === "number" && rfl === rfl ? window.innerWidth - rfl : 0;
    },
    set: function(right) {
      if (typeof right === "number") {
        var bounds = __lvosGet(WindowManager, "windowBounds");
        if (right > __lvosGet(bounds, "right"))
          right = __lvosGet(bounds, "right");
        if (right < __lvosGet(bounds, "left"))
          right = __lvosGet(bounds, "left");
        __lvosSet(this, "width", window.innerWidth - right - __lvosGet(this, "x"));
      }
    }
  },
  bottomFromTop: {
    get: function() {
      return __lvosGet(this, "y") + __lvosGet(this, "height");
    },
    set: function(bottom) {
      __lvosSet(this, "height", bottom - __lvosGet(this, "y"));
    }
  },
  bottom: {
    get: function() {
      var bft = __lvosGet(this, "bottomFromTop");
      return typeof bft === "number" && bft === bft ? window.innerHeight - bft : 0;
    },
    set: function(bottom) {
      if (typeof bottom === "number") {
        var bounds = __lvosGet(WindowManager, "windowBounds");
        if (bottom > __lvosGet(bounds, "bottom"))
          bottom = __lvosGet(bounds, "bottom");
        if (bottom < __lvosGet(bounds, "top"))
          bottom = __lvosGet(bounds, "top");
        __lvosSet(this, "height", window.innerHeight - bottom - __lvosGet(this, "y"));
      }
    }
  },
  inset: {
    get: function() {
      return (__lvosGet(this, "bottom") + __lvosGet(this, "right") + __lvosGet(this, "left") + __lvosGet(this, "top")) / 4;
    },
    set: function(inset) {
      __lvosSet(this, "bottom", __lvosSet(this, "right", __lvosSet(this, "left", __lvosSet(this, "top", inset))));
    }
  },
  isMinWidth: {
    get: function() {
      return this._isMinWidth;
    }
  },
  isMinHeight: {
    get: function() {
      return this._isMinHeight;
    }
  },
  useTransform: {
    get: function() {
      return this._useTransform;
    },
    set: function(useTransform2) {
      this.updateUseTransform(useTransform2);
    }
  },
  useScale: {
    get: function() {
      return this._useScale;
    },
    set: function(useScale2) {
      this.updateScale(useScale2);
    }
  },
  title: {
    get: function() {
      if (this._title)
        return this._title;
      var titleElement = this.getTitleElement();
      if (titleElement && titleElement.innerHTML)
        return titleElement.innerHTML;
      return __lvosGet(this, "id");
    },
    set: function(title) {
      this.setTitle(title);
    }
  },
  maximized: {
    get: function() {
      return this.target.classList.contains("maximized");
    },
    set: function(maximized) {
      this.toggleMaximized(maximized);
    }
  },
  snapped: {
    get: function() {
      return this.target.classList.contains("snapped");
    },
    set: function(snapped) {
      this.toggleSnapped(snapped);
    }
  },
  heightSnapped: {
    get: function() {
      return this.target.classList.contains("height-snapped");
    },
    set: function(snapped) {
      this.toggleHeightSnapped(snapped);
    }
  },
  windowTarget: {
    get: function() {
      var target = this.target;
      if (target && "dialog" in target)
        return (
          /** @type {WindowElement} */
          target
        );
      return null;
    }
  }
});
Dialog.prototype.setTitle = function(title) {
  this._title = title;
  var titleElement = this.getTitleElement();
  if (titleElement)
    titleElement.innerHTML = title;
};
__lvosDefineProperties(Dialog.prototype, {
  id: {
    get: function() {
      return this._id || this.target && __lvosGet(this.target, "id") || "unk";
    },
    set: function(id) {
      this._id = id;
      __lvosGet(windowManager, "windows")[id] = this;
      this.target.setAttribute("id", id);
    }
  },
  content: {
    get: function() {
      return this.getElementByTagOrClassName("content");
    }
  },
  contentTransform: {
    /** @type {()=>Transformable | null} */
    get: function() {
      if (this._contentTransform)
        return this._contentTransform;
      var content = __lvosGet(this, "content");
      if (!content)
        return null;
      return this._contentTransform = new Transformable(content);
    }
  },
  transform: {
    /** @type {()=>Transformable | null} */
    get: function() {
      return this._transform || (this._transform = new Transformable(this.target));
    }
  },
  killable: {
    get: function() {
      return this.application !== null;
    }
  },
  borderSize: {
    set: function(value) {
      if (!__lvosGet(this, "content"))
        return;
      __lvosGet(this, "content").style.padding = Helpers.toPixels(value);
      __lvosGet(this, "content").style.border = Helpers.toPixels(value);
      __lvosGet(this, "content").style.borderRadius = Helpers.toPixels(value);
    },
    get: function() {
      return __lvosGet(this, "content") && Helpers.fromPixels(__lvosGet(this, "content").style.padding);
    }
  },
  popup: {
    get: function() {
      return this._popupWindow;
    }
  },
  skew: {
    set: function(skew) {
      this.setSkew(skew);
    }
  },
  scaleY: {
    set: function(scaleY) {
      this.setScaleY(scaleY);
    }
  },
  rotation: {
    set: function(rotation) {
      this.setRotation(rotation);
    }
  },
  opacity: {
    set: function(opacity) {
      this.target && (this.target.style.opacity = String(opacity));
    },
    get: function() {
      return this.target && this.target.style.opacity !== "" ? Number(this.target.style.opacity) : 1;
    }
  },
  icon: {
    get: function() {
      return this._appIcon;
    }
  },
  iconUrl: {
    get: function() {
      return this.getIconUrl();
    }
  }
});
Dialog.prototype.getIconUrl = function() {
  if (!this.application)
    return null;
  if (__lvosGet(this.application, "iconUrl")) {
    return __lvosGet(this.application, "iconUrl");
  } else {
    return getFaviconUrl(__lvosGet(this.application, "src"));
  }
};
Dialog.prototype.getMiniIconUrl = function() {
  if (!this.application)
    return null;
  return getFaviconUrl(__lvosGet(this.application, "src"));
};
Dialog.prototype.setIcon = function(iconUrl, onError) {
  if (!iconUrl) {
    if (onError)
      onError();
    return;
  }
  var header = __lvosGet(this, "titleBar");
  if (!header)
    return;
  this._appIcon = header.getElementsByTagName("img")[0] || null;
  if (!this._appIcon)
    return;
  var self2 = this;
  this._appIcon.onload = function() {
    if (self2._appIcon)
      self2._appIcon.className = "loaded";
  };
  this._appIcon.onerror = function(e) {
    if (self2._appIcon)
      self2._appIcon.className = "";
    console.warn(e);
    if (onError)
      onError();
  };
  __lvosSet(this._appIcon, "src", iconUrl);
};
Dialog.prototype.setSkew = function(skew) {
  this._skew = skew;
  if (__lvosGet(this, "useTransform"))
    this.updateTransform();
};
Dialog.prototype.setScale = function(scaleX, scaleY, update, noAnimation) {
  if (__lvosGet(this, "transform"))
    __lvosGet(this, "transform").scale(scaleX, scaleY, update !== false, !noAnimation);
};
Dialog.prototype.setDragScale = function(scaleX, scaleY) {
  var self2 = this;
  var nextX = scaleX || 1;
  var nextY = scaleY || 1;
  if (nextX === this._scaleX && nextY === this._scaleY)
    return;
  if (this._dragScaleAnimating) {
    this.setScale(nextX, nextY, void 0, false);
    return;
  }
  this._dragScaleAnimating = true;
  this.animate(function() {
    this.updateTransform();
  }, function(name) {
    return name === "transform";
  }, function() {
    self2._dragScaleAnimating = false;
  }, this.dragScaleDuration);
  this._scaleX = nextX;
  this._scaleY = nextY;
};
Dialog.prototype.setScaleY = function(scaleY) {
  this._scaleY = scaleY;
  this.updateTransform();
};
Dialog.prototype.setRotation = function(rotation) {
  this._rotation = rotation;
  this.updateTransform();
};
Dialog.prototype.focus = function() {
  windowManager.focusDialog(this);
};
Dialog.prototype.activate = function() {
  this.focus();
  this.setZ();
  this.messageFrame("open");
  return swapMetroBody();
};
Dialog.prototype.getTitleElement = function() {
  return this.getElementByTagOrClassName("h1");
};
Dialog.prototype.open = function() {
  return this.toggleOpen(true);
};
Dialog.prototype.close = function() {
  return this.toggleOpen(false);
};
Dialog.prototype.getRect = function(index) {
  return getRect(this.target, index);
};
Dialog.prototype.getBodyRect = function(index) {
  return getRect(__lvosGet(this, "body"), index);
};
Dialog.prototype.getButton = function(index) {
  return __lvosGet(this, "titleBar") && __lvosGet(this, "titleBar").getElementsByTagName("button")[index];
};
Dialog.prototype.createOpenButton = function() {
  var openButton = document.createElement("button");
  this.buttons.unshift(openButton);
  openButton.appendChild(document.createTextNode(__lvosGet(this, "title") || "?"));
  var application = this.application;
  if (application && application.multiple) {
    openButton.onclick = function() {
      if (!application)
        return;
      var instance = windowManager.spawnApp(application);
      if (instance)
        instance.launch();
    };
  } else {
    openButton.onclick = this.launch.bind(this);
  }
  return openButton;
};
Dialog.prototype.setClickOffset = function(x, y) {
  var rect = this.getRect();
  if (!this.clickOffset || !rect)
    return;
  return this.clickOffset.init(x, y, __lvosGet(this, "width") || __lvosGet(rect, "width"), __lvosGet(this, "height") || __lvosGet(rect, "height"), __lvosGet(this, "x"), __lvosGet(this, "y"));
};
Dialog.prototype.remapClickOffset = function(frameX, frameY, frameWidth, frameHeight) {
  var offset = this.clickOffset;
  if (!offset || frameWidth <= 0 || frameHeight <= 0)
    return;
  offset.clickX = __lvosGet(this, "x") + (offset.clickX - frameX) * (__lvosGet(this, "width") / frameWidth);
  offset.clickY = __lvosGet(this, "y") + (offset.clickY - frameY) * (__lvosGet(this, "height") / frameHeight);
};
Dialog.prototype.verifyEjectCapability = function() {
  return Boolean(__lvosGet(this, "href"));
};
__lvosDefineProperty(Dialog.prototype, "href", { get: function() {
  if (!this.application)
    return null;
  return __lvosGet(this.application, "src");
} });
Dialog.prototype.togglePointerEvents = function(enable) {
  var target = this.target;
  if (enable === null)
    enable = target.style.pointerEvents === "none";
  if (enable)
    while (target.classList.contains("dragging"))
      target.className = target.className.replace("dragging", "");
  else if (!target.classList.contains("dragging"))
    target.className = target.className + " dragging";
  this.dragging = !enable;
  var events = enable ? "auto" : "none";
  target.style.pointerEvents = events;
  if (this.originalBody)
    this.originalBody.style.pointerEvents = events;
  var frame = __lvosGet(this, "frame");
  if (frame)
    frame.style.pointerEvents = events;
  return events;
};
Dialog.prototype.toggleButton = function(buttonId, enable) {
  var button = this.getButton(buttonId);
  if (!button)
    return enable;
  if (typeof enable === "undefined")
    enable = button.disabled;
  return button.disabled = !enable;
};
Dialog.prototype.stopAnimating = function() {
  if (this._snappingOut) {
    if (this.target && this.target._animationState !== this._snappingOutState) {
      this._snappingOut = false;
      this._snappingOutState = null;
    }
    return;
  }
  if (this._dragScaleAnimating)
    return;
  this.target.classList.remove("animating");
};
Dialog.prototype.animate = function(onToggled, onTransitionEnd, onEnd, timeout, flip2) {
  animateElement(this.target, onToggled, onTransitionEnd, onEnd, this, timeout, flip2);
};
Dialog.prototype.toggleClassAnimated = function(className, force, onTransitionEnd, onEnd, onToggled, timeout) {
  var self2 = this;
  var enabled = false;
  this.animate(function() {
    enabled = setClass(self2.target, className, force);
    if (onToggled)
      onToggled.call(self2, enabled);
  }, onTransitionEnd, function() {
    if (onEnd)
      onEnd.call(self2, enabled);
  }, timeout);
};
Dialog.prototype.toggleClassFlip = function(className, force, onTransitionEnd, onEnd, timeout) {
  var self2 = this;
  var enabled = false;
  this.animate(function() {
    enabled = setClass(self2.target, className, force);
  }, onTransitionEnd, function() {
    if (onEnd)
      onEnd.call(self2, enabled);
  }, timeout, true);
};
Dialog.prototype.toggleSnapped = function(enable) {
  var target = this.target;
  if (enable === null)
    enable = !target.classList.contains("snapped");
  if (target.classList.contains("snapped") === enable)
    return;
  this._snappingOut = !enable;
  this._snappingOutState = null;
  this.toggleClassFlip("snapped", enable, function(name) {
    return name === "translate" || name === "scale";
  }, function() {
    this._snappingOut = false;
    this._snappingOutState = null;
  }, 1e3);
  this._snappingOutState = target._animationState;
};
Dialog.prototype.toggleHeightSnapped = function(enable) {
  var target = this.target;
  if (enable === null)
    enable = !target.classList.contains("height-snapped");
  if (target.classList.contains("height-snapped") === enable)
    return;
  if (enable)
    this.move(__lvosGet(this, "x"), 0);
  this._snappingOut = !enable;
  this._snappingOutState = null;
  this.toggleClassAnimated("height-snapped", enable, function(name) {
    return name === "height" || name === "transform";
  }, function() {
    this._snappingOut = false;
    this._snappingOutState = null;
  }, void 0, 1e3);
  this._snappingOutState = /** @type {any} */
  target._animationState;
};
Dialog.prototype.toggleMaximized = function(enable) {
  if (typeof enable !== "boolean")
    enable = !__lvosGet(this, "maximized");
  if (__lvosGet(this, "maximized") === enable)
    return;
  if (enable && __lvosGet(this, "snapped") && windowManager)
    windowManager.unsnapDialog(this);
  if (enable && __lvosGet(this, "heightSnapped"))
    this.toggleHeightSnapped(false);
  var self2 = this;
  var target = this.target;
  var content = __lvosGet(this, "content");
  this.setZ();
  this.broadcastState({ maximized: enable === true });
  this.maximizeAnimations++;
  if (__lvosGet(flags, "useViewTransitionMaximize") && __lvosGet(this, "windowTarget"))
    return __lvosGet(this, "windowTarget").toggleMaximizedVT(enable);
  if (!supportsTransitions) {
    var startPos = __lvosGet(self2, "position");
    var startSize = __lvosGet(self2, "size");
    enable = !target.classList.contains("maximized");
    var toggleMaximizedFallback = function() {
      __lvosSet(self2, "x", __lvosGet(startPos, "x"));
      __lvosSet(self2, "y", __lvosGet(startPos, "y"));
      __lvosSet(self2, "width", __lvosGet(startSize, "x"));
      __lvosSet(self2, "height", __lvosGet(startSize, "y"));
      self2.target.classList.toggle("maximized", enable);
    };
    if (!enable)
      toggleMaximizedFallback();
    Anim.animate(300, function(t) {
      var ease = Anim.easeSharpCenterStrong;
      if (enable) {
        __lvosSet(self2, "x", Anim.lerp(__lvosGet(startPos, "x"), 0, ease(t)));
        __lvosSet(self2, "y", Anim.lerp(__lvosGet(startPos, "y"), 0, ease(t)));
        __lvosSet(self2, "width", Anim.lerp(__lvosGet(startSize, "x"), window.innerWidth, ease(t)));
        __lvosSet(self2, "height", Anim.lerp(__lvosGet(startSize, "y"), window.innerHeight, ease(t)));
      } else {
        __lvosSet(self2, "x", Anim.lerp(0, __lvosGet(startPos, "x"), ease(t)));
        __lvosSet(self2, "y", Anim.lerp(0, __lvosGet(startPos, "y"), ease(t)));
        __lvosSet(self2, "width", Anim.lerp(window.innerWidth, __lvosGet(startSize, "x"), ease(t)));
        __lvosSet(self2, "height", Anim.lerp(window.innerHeight, __lvosGet(startSize, "y"), ease(t)));
      }
    }, function() {
      if (enable)
        toggleMaximizedFallback();
      self2.maximizeAnimations--;
    });
    return;
  }
  if (!__lvosGet(flags, "compositorResize") || !__lvosGet(this, "useTransform")) {
    this.toggleClassAnimated("maximized", enable, function(name) {
      return name === "transform" || name === "width";
    }, void 0, function(isMaximized) {
      if (__lvosGet(this, "useTransform") && this.target)
        this.toggleMinSizeConstraints(isMaximized);
      self2.maximizeAnimations--;
    }, 1e3);
    return;
  }
  if (!__lvosGet(flags, "useAnimations")) {
    target.classList.toggle("maximized", enable);
    target.classList.toggle("scaled-max", enable);
    target.style.pointerEvents = "";
    this._maximizing = enable;
    this.setScale(1, 1, void 0, true);
    this.updateTransform();
    this.toggleMinSizeConstraints(enable);
    this.maximizeAnimations--;
    return;
  }
  if (this._compositorMaxState) {
    this._compositorMaxState.cancel();
    this._compositorMaxState = null;
  }
  var windowSection = windowManager.getSnapContainer(this);
  var endWidth = windowSection ? windowSection.clientWidth : window.innerWidth;
  var endHeight = windowSection ? windowSection.clientHeight : window.innerHeight;
  var startWidth = __lvosGet(this, "width") || target.offsetWidth || 300;
  var startHeight = __lvosGet(this, "height") || target.offsetHeight || 200;
  var startX = __lvosGet(this, "x");
  var startY = __lvosGet(this, "y");
  var scaleX = startWidth > 0 ? endWidth / startWidth : 1;
  var scaleY = startHeight > 0 ? endHeight / startHeight : 1;
  var isSlow = __lvosGet(document, "body") && __lvosGet(document, "body").classList.contains("slow-animations");
  var duration = isSlow ? 3e3 : 280;
  var toTransform = function(x, y, sx, sy) {
    return "translate(" + Helpers.toPixels(x) + "," + Helpers.toPixels(y) + ") scale(" + sx + "," + sy + ")";
  };
  var state = {
    active: true,
    raf: 0,
    timer: 0,
    /** @type {((e: TransitionEvent) => void) | null} */
    endHandler: null,
    cancel: function() {
      if (!this.active)
        return;
      this.active = false;
      if (this.raf)
        cancelAnimationFrame(this.raf);
      if (this.timer)
        clearTimeout(this.timer);
      if (this.endHandler)
        target.removeEventListener("transitionend", this.endHandler, false);
      target.style.removeProperty("transition");
      target.style.transformOrigin = "";
      target.style.pointerEvents = "";
      target.classList.remove("animating");
      if (content) {
        content.style.width = "";
        content.style.height = "";
      }
      self2.maximizeAnimations--;
    }
  };
  this._compositorMaxState = state;
  var finishCompositorMaximize = function() {
    if (!state.active)
      return;
    state.active = false;
    if (state.timer)
      clearTimeout(state.timer);
    if (state.endHandler)
      target.removeEventListener("transitionend", state.endHandler, false);
    self2._compositorMaxState = null;
    target.classList.remove("animating");
    target.style.removeProperty("transition");
    target.style.transformOrigin = "";
    target.style.pointerEvents = "";
    if (content) {
      content.style.width = "";
      content.style.height = "";
    }
    if (enable) {
      target.classList.add("maximized", "scaled-max");
      self2._maximizing = true;
    } else {
      target.classList.remove("maximized", "scaled-max");
      self2._maximizing = false;
    }
    self2.setScale(1, 1, void 0, true);
    self2.updateTransform();
    if (__lvosGet(self2, "useTransform") && target)
      self2.toggleMinSizeConstraints(enable);
    self2.maximizeAnimations--;
  };
  state.endHandler = function(e) {
    if (e.target === target && (e.propertyName === "transform" || !e.propertyName)) {
      finishCompositorMaximize();
    }
  };
  target.addEventListener("transitionend", state.endHandler, false);
  state.timer = setTimeout(finishCompositorMaximize, duration + 100);
  target.style.transformOrigin = "top left";
  target.style.pointerEvents = "none";
  if (enable) {
    target.classList.add("scaled-max");
    target.classList.remove("maximized");
    target.style.setProperty("transition", "none", "important");
    target.style.transform = toTransform(startX, startY, 1, 1);
    void target.offsetWidth;
    state.raf = requestAnimationFrame(function() {
      state.raf = 0;
      if (!state.active)
        return;
      target.classList.add("animating");
      target.style.removeProperty("transition");
      target.style.transform = toTransform(0, 0, scaleX, scaleY);
    });
  } else {
    target.classList.add("maximized", "scaled-max");
    target.style.setProperty("transition", "none", "important");
    target.style.transform = toTransform(0, 0, 1, 1);
    void target.offsetWidth;
    state.raf = requestAnimationFrame(function() {
      state.raf = 0;
      if (!state.active)
        return;
      target.classList.add("animating");
      target.style.removeProperty("transition");
      target.style.transform = toTransform(startX, startY, 1 / scaleX, 1 / scaleY);
    });
  }
};
Dialog.prototype.maximize = function() {
  this.toggleMaximized(true);
};
Dialog.prototype.toggleCloseButton = function(enable) {
  this.toggleButton(windowButtons.close, enable);
};
Dialog.prototype.toggleEjectButton = function(enable) {
  this.toggleButton(windowButtons.eject, enable);
};
Dialog.prototype.toggleFullButton = function(enable) {
  this.toggleButton(windowButtons.full, enable);
};
Dialog.prototype.messageFrame = function(type, message) {
  var frame = __lvosGet(this, "frame");
  if (frame)
    LVMessenger.broadcastToChild(type, frame, message);
};
Dialog.prototype.updateTransform = function(animate) {
  if (!(__lvosGet(this, "useTransform") && __lvosGet(this, "transform")))
    return;
  if (this._maximizing)
    __lvosGet(this, "transform").move(0, 0, animate);
  else
    __lvosGet(this, "transform").move(__lvosGet(this, "x"), __lvosGet(this, "y"), animate);
};
Dialog.prototype.updatePosition = function() {
  if (__lvosGet(this, "useTransform"))
    this.updateTransform();
  else
    this.setInset(__lvosGet(this, "top"), __lvosGet(this, "left"), __lvosGet(this, "right"), __lvosGet(this, "bottom"));
  if (__lvosGet(flags, "useSkewAnimations")) {
    var deltaX = __lvosGet(this, "x") - this._previousX, deltaY = __lvosGet(this, "y") - this._previousY;
    var intensity = 1;
    __lvosSet(this, "skew", -deltaX * intensity / 3);
    __lvosSet(this, "scaleY", 1 - deltaY * intensity / 100);
  }
  windowManager.notifyExtensions("onWindowMove", this);
};
Dialog.prototype.broadcastState = function(overrides) {
  if (!windowManager || !__lvosGet(flags, "broadcastWindowMoves") || !document.hasFocus())
    return;
  if (!__lvosGet(this, "id"))
    return;
  windowManager.broadcast("dialog-state", overrides || this.getState(), __lvosGet(this, "id"));
};
Dialog.prototype.move = function(x, y, update, animate) {
  if (this.fixed)
    return;
  if (__lvosGet(flags, "useSkewAnimations")) {
    this._previousX = __lvosGet(this, "x");
    this._previousY = __lvosGet(this, "y");
  }
  if (typeof x === "undefined" || x === null)
    x = __lvosGet(this, "x");
  if (typeof y === "undefined" || y === null)
    y = __lvosGet(this, "y");
  if (__lvosGet(this, "heightSnapped"))
    y = __lvosGet(this, "y");
  if (typeof this._exposeVisualScale !== "number") {
    var bounds = __lvosGet(WindowManager, "windowBounds");
    if (x < __lvosGet(bounds, "left"))
      x = __lvosGet(bounds, "left");
    if (__lvosGet(bounds, "right") !== Infinity && x > __lvosGet(bounds, "right") - __lvosGet(this, "width"))
      x = __lvosGet(bounds, "right") - __lvosGet(this, "width");
    if (y < __lvosGet(bounds, "top"))
      y = __lvosGet(bounds, "top");
    if (__lvosGet(bounds, "bottom") !== Infinity && y > __lvosGet(bounds, "bottom") - __lvosGet(this, "height"))
      y = __lvosGet(bounds, "bottom") - __lvosGet(this, "height");
  }
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var previousX = this._x, previousY = this._y;
  this._x = x / windowWidth;
  this._y = y / windowHeight;
  if (update !== false) {
    if (animate)
      this.animate(this.updatePosition);
    else
      this.updatePosition();
  }
  if (previousX !== this._x || previousY !== this._y) {
    var state = {};
    if (previousX !== this._x)
      __lvosSet(state, "x", __lvosGet(this, "x"));
    if (previousY !== this._y)
      __lvosSet(state, "y", __lvosGet(this, "y"));
    this.broadcastState(state);
  }
};
Dialog.prototype.moveCenterTo = function(centerX, centerY, animate) {
  if (typeof centerX !== "number" || typeof centerY !== "number")
    return;
  this.move(centerX - __lvosGet(this, "width") / 2, centerY - __lvosGet(this, "height") / 2, true, animate);
};
Dialog.prototype.setZ = function(z) {
  if (this.fixed)
    return;
  var previous = this._z;
  if (typeof z === "undefined") {
    if (this._z !== windowManager.topZ)
      this._z = ++windowManager.topZ;
  } else
    this._z = z;
  if (Helpers.isElement(this.target))
    this.target.style.zIndex = String(this._z);
  if (previous !== this._z)
    this.broadcastState({ z: this._z });
};
Dialog.prototype.updateWidth = function() {
  if (__lvosGet(this, "useTransform"))
    this.target.style.width = Helpers.toPixels(this._width);
  else
    this.target.style.right = Helpers.toPixels(__lvosGet(this, "right"));
};
Dialog.prototype.updateHeight = function() {
  if (__lvosGet(this, "useTransform"))
    this.target.style.height = Helpers.toPixels(this._height);
  else
    this.target.style.bottom = Helpers.toPixels(__lvosGet(this, "bottom"));
};
Dialog.prototype._setSize = function(axis, size, update, animate) {
  if (typeof size !== "number" || axis === "height" && !this.target)
    return;
  var isWidth = axis === "width";
  var bounds = __lvosGet(WindowManager, "windowBounds");
  var far = isWidth ? __lvosGet(bounds, "right") : __lvosGet(bounds, "bottom");
  var near = isWidth ? __lvosGet(bounds, "left") : __lvosGet(bounds, "top");
  var pos = isWidth ? __lvosGet(this, "x") : __lvosGet(this, "y");
  if (far !== Infinity) {
    var overflow = pos + size - far;
    if (overflow > 0) {
      var newPos = pos - overflow;
      if (near !== void 0 && newPos < near)
        newPos = near;
      if (isWidth)
        this.move(newPos);
      else
        this.move(__lvosGet(this, "x"), newPos);
    }
    size = Math.min(size, far - (isWidth ? __lvosGet(this, "x") : __lvosGet(this, "y")));
  }
  if (isWidth) {
    this._width = Math.max(Math.min(size, __lvosGet(this, "maxWidth")), __lvosGet(this, "minWidth"));
    this._isMinWidth = this._width === __lvosGet(this, "minWidth");
  } else {
    this._height = Math.max(Math.min(size, __lvosGet(this, "maxHeight")), __lvosGet(this, "minHeight"));
    this._isMinHeight = this._height === __lvosGet(this, "minHeight");
  }
  if (update !== false) {
    if (animate)
      this.animate(isWidth ? this.updateWidth : this.updateHeight);
    else if (isWidth)
      this.updateWidth();
    else
      this.updateHeight();
  }
};
Dialog.prototype.setWidth = function(width, update, animate) {
  this._setSize("width", width, update, animate);
};
Dialog.prototype.setHeight = function(height, update, animate) {
  this._setSize("height", height, update, animate);
};
Dialog.prototype.resize = function(width, height, direction) {
  if (this.fixed)
    return;
  if (typeof width === "undefined" || width === null)
    width = __lvosGet(this, "width");
  if (typeof height === "undefined" || height === null)
    height = __lvosGet(this, "height");
  if (__lvosGet(this, "heightSnapped"))
    height = __lvosGet(this, "height");
  var oldWidth = __lvosGet(this, "width"), oldHeight = __lvosGet(this, "height");
  if (this._aspectRatioEnabled && this._aspectRatio)
    this._resizeWithAspect(width, height, direction);
  else
    this._resizeFree(width, height, direction);
  if (oldWidth !== __lvosGet(this, "width") || oldHeight !== __lvosGet(this, "height")) {
    var state = {};
    if (oldWidth !== __lvosGet(this, "width"))
      __lvosSet(state, "width", __lvosGet(this, "width"));
    if (oldHeight !== __lvosGet(this, "height"))
      __lvosSet(state, "height", __lvosGet(this, "height"));
    this.broadcastState(state);
  }
};
Dialog.prototype._commitResize = function(newW, newH, newX, newY, oldX, oldY, minW, minH) {
  this._width = newW;
  this._height = newH;
  this._isMinWidth = newW === minW;
  this._isMinHeight = newH === minH;
  if (newX !== oldX || newY !== oldY)
    this.move(newX, newY);
  this.updateWidth();
  this.updateHeight();
};
Dialog.prototype._resizeFree = function(width, height, direction) {
  var oldX = __lvosGet(this, "x"), oldY = __lvosGet(this, "y");
  var oldW = __lvosGet(this, "width"), oldH = __lvosGet(this, "height");
  var bounds = __lvosGet(WindowManager, "windowBounds");
  var maxW = this._maxWidth, maxH = this._maxHeight;
  var minW = this._minWidth, minH = this._minHeight;
  width = Math.max(Math.min(width, maxW), minW);
  height = Math.max(Math.min(height, maxH), minH);
  var newW = width, newH = height;
  if (direction === "left" || direction === "bottom-left" || direction === "top-left") {
    newW = Math.min(newW, oldX + oldW - __lvosGet(bounds, "left"));
  } else if (direction !== "top" && direction !== "bottom") {
    newW = Math.min(newW, __lvosGet(bounds, "right") - oldX);
  }
  if (direction === "top" || direction === "top-left" || direction === "top-right") {
    newH = Math.min(newH, oldY + oldH - __lvosGet(bounds, "top"));
  } else if (direction !== "left" && direction !== "right") {
    newH = Math.min(newH, __lvosGet(bounds, "bottom") - oldY);
  }
  if (newW === oldW && newH === oldH)
    return;
  var newX = oldX, newY = oldY;
  switch (direction) {
    case "bottom-left":
    case "left":
      newX = oldX + oldW - newW;
      break;
    case "top-left":
      newX = oldX + oldW - newW;
    case "top-right":
    case "top":
      newY = oldY + oldH - newH;
      break;
  }
  this._commitResize(newW, newH, newX, newY, oldX, oldY, minW, minH);
};
Dialog.prototype._resizeWithAspect = function(width, height, direction) {
  var ratio = this._aspectRatio;
  var oldX = __lvosGet(this, "x"), oldY = __lvosGet(this, "y");
  var oldW = __lvosGet(this, "width"), oldH = __lvosGet(this, "height");
  var oldRight = oldX + oldW, oldBottom = oldY + oldH;
  var bounds = __lvosGet(WindowManager, "windowBounds");
  var maxW = this._maxWidth, maxH = this._maxHeight;
  var minW = this._minWidth, minH = this._minHeight;
  var isCorner = direction === "top-left" || direction === "top-right" || direction === "bottom-left" || direction === "bottom-right";
  var newW, newH;
  if (isCorner && this._constrainAspectRatioLine) {
    var fX, fY, cX, cY, diagX, diagY;
    switch (direction) {
      case "top-left":
        fX = oldRight;
        fY = oldBottom;
        cX = oldRight - width;
        cY = oldBottom - height;
        diagX = -1;
        diagY = -1 / ratio;
        break;
      case "top-right":
        fX = oldX;
        fY = oldBottom;
        cX = oldX + width;
        cY = oldBottom - height;
        diagX = 1;
        diagY = -1 / ratio;
        break;
      case "bottom-left":
        fX = oldRight;
        fY = oldY;
        cX = oldRight - width;
        cY = oldY + height;
        diagX = -1;
        diagY = 1 / ratio;
        break;
      default:
        fX = oldX;
        fY = oldY;
        cX = oldX + width;
        cY = oldY + height;
        diagX = 1;
        diagY = 1 / ratio;
        break;
    }
    var scale = ((cX - fX) * diagX + (cY - fY) * diagY) / (diagX * diagX + diagY * diagY);
    if (scale < 0)
      scale = 0;
    newW = scale;
    newH = scale / ratio;
  } else {
    if (width < 0)
      width = 0;
    if (height < 0)
      height = 0;
    var driveByWidth;
    if (direction === "top" || direction === "bottom") {
      driveByWidth = false;
    } else if (isCorner) {
      var boxRatio = height ? width / height : width > 0 ? Infinity : 1;
      driveByWidth = this._constrainAspectRatioInner ? boxRatio <= ratio : boxRatio > ratio;
    } else {
      driveByWidth = true;
    }
    if (driveByWidth) {
      newW = Math.max(Math.min(width, maxW), minW);
      newH = newW / ratio;
      if (newH > maxH) {
        newH = maxH;
        newW = newH * ratio;
      }
      if (newH < minH) {
        newH = minH;
        newW = newH * ratio;
      }
    } else {
      newH = Math.max(Math.min(height, maxH), minH);
      newW = newH * ratio;
      if (newW > maxW) {
        newW = maxW;
        newH = newW / ratio;
      }
      if (newW < minW) {
        newW = minW;
        newH = newW / ratio;
      }
    }
  }
  var fromLeft = direction === "left" || direction === "bottom-left" || direction === "top-left";
  newW = Math.min(newW, fromLeft ? oldRight - __lvosGet(bounds, "left") : __lvosGet(bounds, "right") - oldX);
  newH = newW / ratio;
  var fromTop = direction === "top" || direction === "top-left" || direction === "top-right";
  newH = Math.min(newH, fromTop ? oldBottom - __lvosGet(bounds, "top") : __lvosGet(bounds, "bottom") - oldY);
  newW = newH * ratio;
  var minScale = Math.max(minW, minH * ratio);
  var maxScale = Math.min(maxW, maxH * ratio);
  if (newW < minScale)
    newW = minScale;
  if (newW > maxScale)
    newW = maxScale;
  newH = newW / ratio;
  if (newW === oldW && newH === oldH)
    return;
  var newX = oldX, newY = oldY;
  switch (direction) {
    case "bottom-left":
      newX = oldRight - newW;
      break;
    case "top-left":
      newX = oldRight - newW;
    case "top-right":
      newY = oldBottom - newH;
      break;
    case "left":
      newX = oldRight - newW;
    case "right":
      newY = oldY + oldH / 2 - newH / 2;
      break;
    case "top":
      newY = oldBottom - newH;
    case "bottom":
      newX = oldX + oldW / 2 - newW / 2;
      break;
  }
  this._width = newW;
  this._height = newH;
  this._isMinWidth = newW === minW;
  this._isMinHeight = newH === minH;
  if (newX !== oldX || newY !== oldY)
    this.move(newX, newY);
  this.updateWidth();
  this.updateHeight();
};
Dialog.prototype.update = function() {
  this.move();
  this.resize();
};
Dialog.prototype.setMinSize = function(width, height, update) {
  this._minWidth = typeof width === "number" ? width : 180;
  this._minHeight = typeof height === "number" ? height : 200;
  if (update !== false)
    this.resize();
};
Dialog.prototype.setMaxSize = function(width, height) {
  this._maxWidth = typeof width === "number" ? width : 180;
  this._maxHeight = typeof height === "number" ? height : 200;
  this.resize();
};
Dialog.prototype.updateBodyOffset = function() {
  var bodyRect = this.getBodyRect();
  if (!bodyRect || __lvosGet(bodyRect, "width") === 0 && __lvosGet(bodyRect, "height") === 0 && __lvosGet(bodyRect, "x") === 0 && __lvosGet(bodyRect, "y") === 0)
    return;
  __lvosSet(this._bodyOffset, "width", __lvosGet(this, "width") - __lvosGet(bodyRect, "width"));
  __lvosSet(this._bodyOffset, "height", __lvosGet(this, "height") - __lvosGet(bodyRect, "height"));
  __lvosSet(this._bodyOffset, "x", __lvosGet(this, "x") - __lvosGet(bodyRect, "x"));
  __lvosSet(this._bodyOffset, "y", __lvosGet(this, "y") - __lvosGet(bodyRect, "y"));
};
Dialog.prototype.resizeBody = function(width, height) {
  this.updateBodyOffset();
  this.resize(width + __lvosGet(this._bodyOffset, "width"), height + __lvosGet(this._bodyOffset, "height"));
};
Dialog.prototype.moveBody = function(x, y) {
  this.updateBodyOffset();
  this.move(x + __lvosGet(this._bodyOffset, "x"), y + __lvosGet(this._bodyOffset, "y"));
};
Dialog.prototype.setInset = function(top, left, right, bottom) {
  if (__lvosGet(this, "useScale"))
    insetElement(this.target, top, left);
  else
    insetElement(this.target, top, left, right, bottom);
};
Dialog.prototype.openUrl = function(url) {
  var frame = this.getOrCreateFrame(true);
  if (!frame)
    return;
  var self2 = this;
  var timeout = -1;
  frame.onload = function() {
    clearTimeout(timeout);
    self2.reportState();
  };
  if (!this.application)
    return;
  var baseUrls = [url || __lvosGet(this, "src"), this.application.distSrc];
  if (!isLocal)
    baseUrls.reverse();
  var fallbackUrls = baseUrls.concat(this.application.altUrls);
  var index = 0;
  function tryNext() {
    var url2;
    while (index < fallbackUrls.length && !(url2 = fallbackUrls[index++]))
      ;
    if (!url2 || !frame)
      return;
    __lvosSet(frame, "src", url2);
    self2._src = url2;
    clearTimeout(timeout);
    timeout = setTimeout(tryNext, 3e3);
  }
  frame.addEventListener("error", tryNext, false);
  tryNext();
};
Dialog.prototype.refresh = function() {
  if (__lvosGet(this, "frame"))
    this.openUrl(__lvosGet(__lvosGet(this, "frame"), "src"));
};
Dialog.prototype.launch = function() {
  if (!__lvosGet(this, "isOpen"))
    this.insertIntoDOM();
  this.target.classList.remove("hidden");
  windowManager.notifyExtensions("onWindowLaunch", this);
  this.open();
};
Dialog.prototype.kill = function() {
  var parent = this.target && this.target.parentElement;
  if (parent && __lvosGet(this, "killable") && this.target)
    parent.removeChild(this.target);
};
Dialog.prototype.eject = function() {
  this.createPopOut();
  this.close();
};
Dialog.prototype.createPopOut = function() {
  var body = __lvosGet(this, "body");
  var titleBar = __lvosGet(this, "titleBar");
  if (!body || !__lvosGet(this, "href"))
    return;
  var rect = body.getBoundingClientRect();
  var titleBarHeight = titleBar && __lvosGet(titleBar.getBoundingClientRect(), "height") || 0;
  var viewBoxPosition = Helpers.getViewBoxPosition();
  this._popupWindow = window.open(__lvosGet(this, "href"), __lvosGet(this, "title") || "LVOS", Helpers.stringifyWindowOpenProperties({
    scrollbars: true,
    resizable: true,
    status: false,
    location: false,
    toolbar: false,
    menubar: false,
    width: __lvosGet(rect, "width"),
    height: __lvosGet(rect, "height"),
    left: __lvosGet(rect, "left") + __lvosGet(viewBoxPosition, "x"),
    top: __lvosGet(rect, "top") + __lvosGet(viewBoxPosition, "y") + titleBarHeight
  }));
  if (!this._popupWindow)
    return;
  var self2 = this;
  var prevRect = { x: -1, y: -1, width: -1, height: -1 };
  var windowChromeHeight = getWindowChromeHeight(window);
  var chromeHeight = getWindowChromeHeight(this._popupWindow);
  this._popupPositionInterval = setInterval(function() {
    if (!self2._popupWindow || self2._popupWindow.closed) {
      clearInterval(self2._popupPositionInterval);
      self2._popupPositionInterval = 0;
      self2.launch();
      return;
    }
    var outerX = self2._popupWindow.screenX, outerY = self2._popupWindow.screenY;
    var width = self2._popupWindow.innerWidth || self2._popupWindow.outerWidth, height = self2._popupWindow.innerHeight || self2._popupWindow.outerHeight;
    outerX = Math.round(outerX);
    outerY = Math.round(outerY);
    width = Math.round(width);
    height = Math.round(height);
    if (outerX !== __lvosGet(prevRect, "x") || outerY !== __lvosGet(prevRect, "y")) {
      var x = outerX - window.screenX, y = outerY - window.screenY - windowChromeHeight + chromeHeight;
      self2.moveBody(x, y);
      __lvosSet(prevRect, "x", outerX);
      __lvosSet(prevRect, "y", outerY);
    }
    if (width !== __lvosGet(prevRect, "width") || height !== __lvosGet(prevRect, "height")) {
      self2.resizeBody(width, height);
      __lvosSet(prevRect, "width", width);
      __lvosSet(prevRect, "height", height);
    }
  }, 100);
};
Dialog.prototype.inspect = function() {
  if (window.inspect)
    window.inspect(this.target);
};
Dialog.prototype.updateUseTransform = function(useTransform2) {
  this._useTransform = useTransform2;
  var target = this.target;
  if (useTransform2) {
    target.style.top = "";
    target.style.left = "";
  } else {
    target.style.transform = "";
    target.style.webkitTransform = "";
    target.style.width = "";
    target.style.height = "";
  }
  this.updateScale(useTransform2);
  this.update();
};
Dialog.prototype.updateScale = function(useScale2) {
  this._useScale = useScale2;
  var target = this.target;
  if (useScale2) {
    target.style.right = "";
    target.style.bottom = "";
    this.toggleMinSizeConstraints(__lvosGet(this, "maximized"));
  } else {
    if (__lvosGet(this, "useTransform"))
      return;
    var right = __lvosGet(this, "right"), bottom = __lvosGet(this, "bottom");
    if (right === right)
      target.style.right = Helpers.toPixels(right);
    if (bottom === bottom)
      target.style.bottom = Helpers.toPixels(bottom);
  }
  target.classList.toggle("use-scale", useScale2);
  this.update();
};
Dialog.prototype.toggleMinSizeConstraints = function(isMaximized) {
  this.target.style.minWidth = isMaximized ? "100%" : Helpers.toPixels(__lvosGet(this, "minWidth"));
  this.target.style.minHeight = isMaximized ? "100%" : Helpers.toPixels(__lvosGet(this, "minHeight"));
};
Dialog.prototype.flip = function(enable) {
  this.toggleClassAnimated("flipped", enable);
};
Dialog.prototype.getState = function() {
  return {
    title: __lvosGet(this, "title") || __lvosGet(this, "id") || "Unc",
    x: __lvosGet(this, "x"),
    y: __lvosGet(this, "y"),
    z: __lvosGet(this, "z"),
    width: __lvosGet(this, "width") || __lvosGet(this, "minWidth"),
    height: __lvosGet(this, "height") || __lvosGet(this, "minHeight"),
    open: this._stateOpen || __lvosGet(this, "isOpen") || false,
    maximized: __lvosGet(this, "maximized")
  };
};
Dialog.prototype.loadState = function(state) {
  if ("open" in state) {
    if (state.open)
      this.launch();
    else
      this.toggleOpen(false);
  }
  if ("title" in state)
    __lvosSet(this, "title", __lvosGet(state, "title"));
  if ("x" in state || "y" in state)
    this.move("x" in state ? __lvosGet(state, "x") : __lvosGet(this, "x"), "y" in state ? __lvosGet(state, "y") : __lvosGet(this, "y"), true, false);
  if ("z" in state && typeof __lvosGet(state, "z") === "number")
    this.setZ(__lvosGet(state, "z"));
  if ("width" in state || "height" in state)
    this.resize("width" in state ? __lvosGet(state, "width") : __lvosGet(this, "width"), "height" in state ? __lvosGet(state, "height") : __lvosGet(this, "height"));
  if ("maximized" in state)
    this.toggleMaximized(__lvosGet(state, "maximized") === true);
};
Dialog.prototype.exportDialogBodyToMetro = function() {
};
Dialog.prototype.getElementById = function(id) {
  var doc = __lvosGet(this, "contentDocument");
  return doc && doc.getElementById(id);
};
Dialog.prototype.insertIntoDOM = function() {
  var container = document.getElementById("window-section");
  if (container)
    container.appendChild(this.target);
};
Dialog.prototype.moveElementIntoPipById = function(id, stylesheet) {
  var targetElement = this.getElementById(id);
  if (targetElement && Modern)
    Modern.toggleElementPip(targetElement, function(window2) {
      window2.onresize = function() {
        if (!(targetElement instanceof HTMLCanvasElement))
          return;
        __lvosSet(targetElement, "width", targetElement.clientWidth);
        __lvosSet(targetElement, "height", targetElement.clientHeight);
      };
    }, stylesheet);
};
Dialog.prototype.screenshot = function() {
  var shooter = getScreenShooter();
  if (shooter)
    shooter.screenshotElement(this.target);
};
function DragAction() {
  this.execute = function() {
  };
  var resizeFunctions = [
    function move(dialog, offset, d) {
      dialog.move(offset.startX + __lvosGet(d, "x"), offset.startY + __lvosGet(d, "y"));
    },
    function top(dialog, offset, d) {
      dialog.resize(__lvosGet(offset, "width"), __lvosGet(offset, "height") - __lvosGet(d, "y"), "top");
    },
    function right(dialog, offset, d) {
      dialog.resize(__lvosGet(offset, "width") + __lvosGet(d, "x"), __lvosGet(offset, "height"), "right");
    },
    function bottom(dialog, offset, d) {
      dialog.resize(__lvosGet(offset, "width"), __lvosGet(offset, "height") + __lvosGet(d, "y"), "bottom");
    },
    function left(dialog, offset, d) {
      dialog.resize(__lvosGet(offset, "width") - __lvosGet(d, "x"), __lvosGet(offset, "height"), "left");
    },
    function topLeft(dialog, offset, d) {
      dialog.resize(__lvosGet(offset, "width") - __lvosGet(d, "x"), __lvosGet(offset, "height") - __lvosGet(d, "y"), "top-left");
    },
    function topRight(dialog, offset, d) {
      dialog.resize(__lvosGet(offset, "width") + __lvosGet(d, "x"), __lvosGet(offset, "height") - __lvosGet(d, "y"), "top-right");
    },
    function bottomRight(dialog, offset, d) {
      dialog.resize(__lvosGet(offset, "width") + __lvosGet(d, "x"), __lvosGet(offset, "height") + __lvosGet(d, "y"), "bottom-right");
    },
    function bottomLeft(dialog, offset, d) {
      dialog.resize(__lvosGet(offset, "width") - __lvosGet(d, "x"), __lvosGet(offset, "height") + __lvosGet(d, "y"), "bottom-left");
    }
  ];
  this.resizeFunctions = resizeFunctions;
}
DragAction.prototype.set = function(direction) {
  this.direction = direction || 0;
  this.execute = this.resizeFunctions[this.direction] || function() {
  };
};
window.addEventListener("resize", WindowManager.recalculateWindowBounds, false);
window.addEventListener("load", WindowManager.recalculateWindowBounds, false);
window.addEventListener(supportsPointer ? "pointermove" : "mousemove", ClickOffset.handleMouseDrag, false);
window.addEventListener("unload", function() {
  windowManager && windowManager.saveState();
}, false);
window.addEventListener("dragover", cancelDomEvent, false);
window.addEventListener("drop", function(e) {
  e.preventDefault();
}, false);
var windowManager = new WindowManager();
window.windowManager = windowManager;
__lvosSet(windowManager, "isWindowUpdatesEnabled", true);
window.__LVMessengerReceive = messageReceived;
window.__LVMessenger = {};
function ElementPicker(options) {
  this.active = false;
  this.onSelect = options.onSelect || function(el) {
    console.log("Selected:", el);
  };
  this.statusEl = null;
  this.hovered = null;
  this.prevOutline = "";
  var self2 = this;
  this.onMove = function(e) {
    var el = e.target;
    if (!(el instanceof HTMLElement))
      return;
    if (options.onMove && options.onMove.call(self2, el))
      return;
    this.highlight(el);
  };
  this.boundMove = this.onMove.bind(this);
  this.boundClick = this.onClick.bind(this);
  this.boundKey = this.onKey.bind(this);
}
ElementPicker.prototype.register = function() {
  var self2 = this;
  document.addEventListener("keydown", function(e) {
    if (e.shiftKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      self2.active ? self2.stop() : self2.start();
    }
  });
};
ElementPicker.prototype.start = function() {
  this.active = true;
  __lvosGet(document, "body").style.cursor = "crosshair";
  document.addEventListener("mousemove", this.boundMove, true);
  document.addEventListener("click", this.boundClick, true);
  document.addEventListener("keydown", this.boundKey, true);
  this.status("Pick mode: click an element (Esc to cancel)");
  __lvosGet(document, "body").classList.add("picking");
};
ElementPicker.prototype.stop = function() {
  this.active = false;
  __lvosGet(document, "body").style.cursor = "";
  document.removeEventListener("mousemove", this.boundMove, true);
  document.removeEventListener("click", this.boundClick, true);
  document.removeEventListener("keydown", this.boundKey, true);
  this.status("");
  __lvosGet(document, "body").classList.remove("picking");
};
ElementPicker.prototype.highlight = function(el) {
  if (el === this.hovered)
    return;
  this.unhighlight();
  this.hovered = el;
  this.prevOutline = el.style.outline;
  el.style.outline = "3px solid #2f81f7";
};
ElementPicker.prototype.unhighlight = function(skipRemove) {
  if (!this.hovered)
    return;
  this.hovered.style.outline = this.prevOutline;
  if (skipRemove)
    return;
  this.hovered = null;
  this.prevOutline = "";
};
ElementPicker.prototype.onClick = function(e) {
  if (!e.isTrusted)
    return;
  e.preventDefault();
  e.stopPropagation();
  this.stop();
  this.unhighlight(true);
  if (this.hovered)
    this.onSelect(this.hovered);
  this.unhighlight();
};
ElementPicker.prototype.onKey = function(e) {
  if (e.key === "Escape")
    this.stop();
};
ElementPicker.prototype.status = function(msg) {
  if (!this.statusEl) {
    this.statusEl = document.createElement("div");
    Object.assign(this.statusEl.style, {
      position: "fixed",
      bottom: "12px",
      right: "12px",
      background: "#222",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "6px",
      font: "13px system-ui, sans-serif",
      zIndex: 2147483647,
      display: "none"
    });
    __lvosGet(document, "body").appendChild(this.statusEl);
  }
  this.statusEl.textContent = msg;
  this.statusEl.style.display = msg ? "block" : "none";
};
var supportsCSSScrollTimeline = CSS.supports("animation-timeline", "scroll()");
function Tab(content, id) {
  __lvosSet(this, "content", document.createElement("section"));
  __lvosGet(this, "content").className = "tab-page";
  __lvosSet(__lvosGet(this, "content"), "id", id);
  if (content)
    __lvosGet(this, "content").appendChild(content);
  this.button = null;
}
Tab.prototype.createButton = function(asButton) {
  var button = null;
  if (asButton) {
    button = document.createElement("button");
  } else {
    button = document.createElement("a");
    __lvosSet(button, "href", "#" + __lvosGet(__lvosGet(this, "content"), "id"));
  }
  button.className = "tab-button";
  this.button = button;
  return button;
};
Tab.prototype.setTitle = function(title) {
  if (this.button)
    this.button.innerText = title;
};
function TabScroller(parent, hasButtons) {
  this.buttonHeader = hasButtons && document.createElement("div");
  this.element = document.createElement("div");
  this.element.className = "tab-scroller";
  this.tabs = [];
  this.container = this.element;
  if (hasButtons) {
    this.container = document.createElement("div");
    this.container.className = "tab-container";
    this.container.appendChild(this.element);
    if (!this.buttonHeader)
      return;
    this.buttonHeader.className = "tab-header";
    this.container.appendChild(this.buttonHeader);
  }
  if (parent)
    parent.appendChild(this.container);
  if (typeof window.CSS !== "undefined" || !CSS.supports("scroll-snap-type: x mandatory"))
    this.setupScollHandler();
}
TabScroller.prototype.addTab = function(content, title) {
  var tab = new Tab(content, "tab-" + this.tabs.length);
  this.tabs.push(tab);
  this.element.appendChild(__lvosGet(tab, "content"));
  if (this.buttonHeader) {
    this.buttonHeader.appendChild(tab.createButton());
    if (title)
      tab.setTitle(title);
  }
  this.container.style.setProperty("--total-pages", this.tabs.length.toString());
};
TabScroller.prototype.setupScollHandler = function() {
  var timer;
  var self2 = this;
  this.element.addEventListener("scroll", function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      var width = self2.element.clientWidth / 2;
      var index = Math.floor(self2.element.scrollLeft / width);
      if (self2.element.scrollLeft % width > width / 2)
        index++;
      var start = self2.element.scrollLeft;
      var end = index * width;
      var duration = 300;
      var time = performance.now();
      function animate(now) {
        var progress = Math.min((now - time) / duration, 1);
        progress = 1 - Math.pow(1 - progress, 3);
        self2.element.scrollLeft = start + (end - start) * progress;
        if (progress < 1)
          requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }, 150);
  }, false);
};
"use strict";
var eventPrevent = function(event2) {
  event2.preventDefault();
};
var onLoad = function() {
  var desktop = document.getElementById("desktop");
  if (desktop)
    desktop.addEventListener("mousedown", function() {
      DesktopManager.toggleCharms(false);
      if (launchpad)
        launchpad.close();
      contextMenu.close();
    }, false);
  var applist = document.getElementById("applist");
  if (applist) {
    applist.addEventListener("submit", eventPrevent, false);
  }
  var appButtons = document.getElementById("dockapplist");
  if (appButtons) {
    var startButton = document.createElement("button");
    startButton.innerHTML = "Start";
    __lvosSet(startButton, "id", "start-button");
    startButton.addEventListener("click", function() {
      if (launchpad)
        launchpad.open();
    }, false);
    appButtons.appendChild(startButton);
    var clock = document.createElement("time", { is: "odometer-time" });
    __lvosSet(clock, "id", "clock");
    var updateClock = function() {
      var date = /* @__PURE__ */ new Date();
      clock.dateTime = date.toISOString();
      if (!("tracks" in clock))
        clock.innerHTML = date.toLocaleTimeString();
      setTimeout(updateClock, 1e3 - Date.now() % 1e3);
    };
    updateClock();
    appButtons.appendChild(clock);
  }
  __lvosGet(document, "body").ondragover = window.ondragover = function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.dataTransfer)
      ev.dataTransfer.dropEffect = "copy";
  };
  __lvosGet(document, "body").ondrop = function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    setDesktopDragOpacity("");
    if (!ev.dataTransfer)
      return;
    ev.dataTransfer.dropEffect = "copy";
    var dt = ev.dataTransfer;
    if (!dt)
      return;
    dt.dropEffect = "copy";
    var json = "";
    var plain = "";
    var uriList = "";
    var html = "";
    try {
      json = dt.getData("application/json") || "";
      plain = dt.getData("text/plain") || "";
      uriList = dt.getData("text/uri-list") || "";
      html = dt.getData("text/html") || "";
    } catch (exception) {
    }
    try {
      if (!plain)
        plain = dt.getData("Text") || "";
    } catch (exception) {
    }
    try {
      if (!uriList)
        uriList = dt.getData("URL") || "";
    } catch (exception) {
    }
    var droppedUrl = "";
    if (uriList) {
      var line = uriList.split(/\r?\n/).find(function(entry) {
        entry = entry.trim();
        return entry && entry.charAt(0) !== "#";
      });
      droppedUrl = line ? line.trim() : "";
    }
    if (!json && plain && /^[[{]/.test(plain.trim()))
      json = plain.trim();
    var data = null;
    if (html) {
      try {
        var newDoc = new DOMParser().parseFromString(html, "text/html");
        var trimmed = (__lvosGet(newDoc, "body") && __lvosGet(newDoc, "body").textContent || html).trim();
        if (trimmed)
          data = JSON.parse(trimmed);
      } catch (exception) {
        data = null;
      }
    }
    if (!data && json) {
      try {
        data = JSON.parse(json);
      } catch (exception) {
        data = null;
      }
    }
    if (data && data.app && window.windowManager) {
      window.windowManager.dropApplication(data.app, ev.clientX, ev.clientY, data.offset, __lvosGet(data, "state"));
      return;
    }
    if (!droppedUrl && plain && !/^\{|\[/.test(plain.trim())) {
      droppedUrl = plain.trim();
    }
    if (!droppedUrl)
      return;
    var url;
    try {
      url = __lvosGet(new URL(droppedUrl, __lvosGet(location, "href")), "href");
    } catch (exception) {
      return;
    }
    var existing = null;
    for (var id in __lvosGet(window.appManager, "apps")) {
      if (__lvosGet(window.appManager, "apps").hasOwnProperty(id)) {
        var a = __lvosGet(window.appManager, "apps")[id];
        if (a && (__lvosGet(a, "src") === url || a.distSrc === url)) {
          existing = a;
          break;
        }
      }
    }
    if (existing) {
      window.windowManager.dropApplication(existing, ev.clientX, ev.clientY);
      return;
    }
    var newApp = window.appManager.createApp(url, url, "dropped." + Date.now());
    window.appManager.addApp(newApp);
    window.windowManager.dropApplication(newApp, ev.clientX, ev.clientY);
  };
  if ("serviceWorker" in navigator)
    navigator.serviceWorker.register("./Scripts/sw.js")["then"](function(reg) {
      console.log("Service Worker registered!", reg);
    })["catch"](function(err) {
      console.warn("Registration of service worker failed:", err);
    });
  if (typeof ClickOffset === "undefined")
    return;
  var clickOffset = new ClickOffset();
  var tingeling = Array.from(document.getElementsByClassName("folder-content"))[0];
  if (tingeling instanceof HTMLElement) {
    var selector = document.createElement("div");
    clickOffset.dragHandler = function(ev) {
      clickOffset.update(ev.clientX - clickOffset.clickX, ev.clientY - clickOffset.clickY);
      var width = __lvosGet(__lvosGet(clickOffset, "position"), "x"), height = __lvosGet(__lvosGet(clickOffset, "position"), "y");
      Helpers.translateElement(selector, width < 0 ? ev.clientX : clickOffset.clickX, height < 0 ? ev.clientY : clickOffset.clickY);
      selector.style.width = Helpers.toPixels(Math.abs(width));
      selector.style.height = Helpers.toPixels(Math.abs(height));
    };
    tingeling.addEventListener(supportsPointer ? "pointerdown" : "mousedown", function(ev) {
      clickOffset.init(ev.clientX, ev.clientY);
      var width = __lvosGet(__lvosGet(clickOffset, "position"), "x"), height = __lvosGet(__lvosGet(clickOffset, "position"), "y");
      Helpers.translateElement(selector, width < 0 ? ev.clientX : clickOffset.clickX, height < 0 ? ev.clientY : clickOffset.clickY);
      selector.style.width = Helpers.toPixels(Math.abs(width));
      selector.style.height = Helpers.toPixels(Math.abs(height));
      selector.className = "selector";
      if (tingeling)
        tingeling.appendChild(selector);
      clickOffset.toggleDragEventHandler(true);
    }, false);
    var stopIt = function() {
      clickOffset.toggleDragEventHandler(false);
      if (selector.parentNode)
        selector.parentNode.removeChild(selector);
    };
    window.addEventListener(supportsPointer ? "pointerup" : "mouseup", stopIt, false);
  }
  document.onselectstart = function(event2) {
    return !!(event2 && event2.ctrlKey);
  };
  if (window.desktopManager)
    window.desktopManager.init();
};
function createDesktop() {
  var windowSection = document.createElement("section");
  windowSection.className = "window-section";
  var wallpaper2 = document.getElementById("wallpaper").cloneNode(true);
  windowSection.appendChild(wallpaper2);
  var dockArea = document.getElementById("dock-area").cloneNode(true);
  windowSection.appendChild(dockArea);
  return windowSection;
}
function Desktop(name, desktopElement) {
  this.name = name;
  this.target = desktopElement || createDesktop();
}
Desktop.prototype.insertWindow = function(dialog) {
  dialog.setParentElement(this.target);
};
window.addEventListener("load", onLoad, false);
function ContextMenu() {
  this.element = document.getElementById("context-menu");
}
ContextMenu.prototype.open = function(x, y) {
  if (!this.element)
    return;
  this.element.style.left = Helpers.toPixels(x);
  this.element.style.top = Helpers.toPixels(y);
  this.element.classList.add("open");
};
ContextMenu.prototype.close = function() {
  if (!this.element)
    return;
  this.element.classList.remove("open");
};
var contextMenu = new ContextMenu();
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
  contextMenu.open(e.clientX, e.clientY);
}, false);
var dock = document.getElementById("dock");
window.addEventListener("keydown", function(event2) {
  switch (event2.key) {
    case "F11":
      event2.preventDefault();
      void document.documentElement.requestFullscreen();
      break;
    case "F10":
      event2.preventDefault();
      var c = __lvosGet(windowManager, "windows")["console"];
      c.open();
      c.maximize();
      break;
    case "F9":
      event2.preventDefault();
      this.alert("I'm alive!");
      break;
    case "F8":
      event2.preventDefault();
      downloadSettings();
      break;
  }
}, false);
function DesktopManager() {
  this.wallpaperImage = null;
  this.desktops = [];
  this.scrollTabs = null;
  this.desktopParent = null;
  this.desktopNextSibling = null;
}
__lvosDefineProperty(DesktopManager.prototype, "isExpos\xE9", {
  get: function() {
    return Boolean(document.scrollingElement && document.scrollingElement.scrollTop);
  }
});
DesktopManager.prototype.getDesktopIndexAt = function(x, y) {
  for (var i = 0; i < this.desktops.length; i++) {
    var desktop = this.desktops[i];
    var element = desktop.target;
    if (!element || !element.getBoundingClientRect)
      continue;
    var rect = element.getBoundingClientRect();
    if (x >= __lvosGet(rect, "left") && x <= __lvosGet(rect, "right") && y >= __lvosGet(rect, "top") && y <= __lvosGet(rect, "bottom"))
      return i;
  }
  return -1;
};
DesktopManager.prototype.init = function() {
  var windowSection = document.getElementById("window-section");
  if (windowSection) {
    this.desktopParent = windowSection.parentNode;
    this.desktopNextSibling = windowSection.nextSibling;
  }
  this.setExpos\u00E9Enabled(!(typeof flags !== "undefined" && __lvosGet(flags, "exposeAndDesktops") === false));
};
DesktopManager.prototype.isExpos\u00E9Supported = function() {
  return "TabScroller" in window && !(document.documentMode && document.documentMode < 10);
};
DesktopManager.prototype.setExpos\u00E9Enabled = function(enabled) {
  if (enabled)
    this.enableExpos\u00E9();
  else
    this.disableExpos\u00E9();
};
DesktopManager.prototype.enableExpos\u00E9 = function() {
  if (this.scrollTabs || !this.isExpos\u00E9Supported())
    return;
  var windowSection = document.getElementById("window-section");
  if (!windowSection)
    return;
  if (!this.desktopParent) {
    this.desktopParent = windowSection.parentNode;
    this.desktopNextSibling = windowSection.nextSibling;
  }
  __lvosGet(document, "body").classList.add("expos\xE9");
  this.scrollTabs = new TabScroller(document.querySelector("main"));
  this.addDesktop("Main", windowSection);
  this.addDesktop();
  this.addDesktop();
};
DesktopManager.prototype.disableExpos\u00E9 = function() {
  __lvosGet(document, "body").classList.remove("expos\xE9");
  var windowSection = document.getElementById("window-section");
  var parent = this.desktopParent || document.getElementById("desktop-area");
  if (windowSection && parent) {
    if (this.desktopNextSibling && this.desktopNextSibling.parentNode === parent)
      parent.insertBefore(windowSection, this.desktopNextSibling);
    else
      parent.appendChild(windowSection);
  }
  if (this.scrollTabs && this.scrollTabs.container && this.scrollTabs.container.parentNode)
    this.scrollTabs.container.parentNode.removeChild(this.scrollTabs.container);
  this.scrollTabs = null;
  this.desktops = [];
  this.gapDesktop = null;
};
DesktopManager.prototype.addDesktop = function(name, desktopElement) {
  if (!this.scrollTabs)
    return;
  var desktop = new Desktop(name || "Desktop " + (this.desktops.length + 1), desktopElement);
  this.scrollTabs.addTab(desktop.target);
  this.desktops.push(desktop);
  this.addOrMoveDesktopGap();
};
DesktopManager.prototype.addOrMoveDesktopGap = function() {
  if (!this.scrollTabs)
    return;
  if (!this.gapDesktop) {
    this.gapDesktop = document.createElement("div");
    this.gapDesktop.className = "tab-page";
  }
  this.scrollTabs.element.appendChild(this.gapDesktop);
};
function setTheme(theme) {
  ensureClassList(__lvosGet(document, "body"));
  __lvosGet(document, "body").classList.add(theme);
  window.windowManager.synchronizeStates();
}
DesktopManager.removeTheme = function(theme) {
  ensureClassList(__lvosGet(document, "body"));
  __lvosGet(document, "body").classList.remove(theme);
};
DesktopManager.toggleCharms = function(force) {
  var charms = document.getElementById("charms");
  if (!charms)
    return;
  if (charms.classList.toggle.length)
    return charms.classList.toggle("open", force);
  if (force)
    charms.classList.add("open");
  else
    charms.classList.remove("open");
  return force === true;
};
DesktopManager.getWallpaper = function() {
  return document.getElementById("wallpaper");
};
DesktopManager.prototype.applyWallpaperImage = function(url, blurredUrl, onError) {
  this.wallpaperImage = document.createElement("img");
  this.wallpaperImage.onerror = function() {
    console.warn("Failed to load wallpaper image!");
    if (onError)
      onError();
  };
  var self2 = this;
  var loadHandler = function() {
    var wallpaper2 = DesktopManager.getWallpaper();
    if (!wallpaper2 || !self2.wallpaperImage)
      return;
    while (wallpaper2.firstChild)
      wallpaper2.removeChild(wallpaper2.firstChild);
    if (typeof blurredUrl === "string")
      wallpaper2.setAttribute("data-blurred-src", blurredUrl);
    else
      wallpaper2.removeAttribute("data-blurred-src");
    wallpaper2.classList.toggle("legacy-wallpaper", !supportsObjectFit);
    wallpaper2.style.backgroundImage = "";
    wallpaper2.appendChild(self2.wallpaperImage);
  };
  this.wallpaperImage.onload = loadHandler;
  if (supportsObjectFit) {
    __lvosSet(this.wallpaperImage, "src", url);
    this.wallpaperImage.className = "wallpaper-image";
  } else {
    this.wallpaperImage.className = "wallpaper-image legacy-wallpaper-image";
    this.wallpaperImage.removeAttribute("src");
    this.wallpaperImage.style.backgroundImage = "url('" + url.replace(/'/g, "\\'") + "')";
    loadHandler();
  }
  if (blurredUrl)
    this.wallpaperImage.setAttribute("blurred-src", blurredUrl);
};
DesktopManager.prototype.ensureWallpaperFrame = function() {
  var wallpaper2 = DesktopManager.getWallpaper();
  if (!wallpaper2)
    return null;
  var frame = document.getElementById("wallpaper-frame");
  if (frame instanceof HTMLIFrameElement)
    return frame;
  frame = document.createElement("iframe");
  __lvosSet(frame, "id", "wallpaper-frame");
  frame.frameBorder = "0";
  wallpaper2.appendChild(frame);
  return frame;
};
DesktopManager.prototype.clearWallpaperContent = function() {
  var wallpaper2 = DesktopManager.getWallpaper();
  if (!wallpaper2)
    return;
  this.wallpaperImage = null;
  while (wallpaper2.firstChild)
    wallpaper2.removeChild(wallpaper2.firstChild);
  wallpaper2.classList.remove("legacy-wallpaper");
  wallpaper2.classList.remove("legacy-wallpaper-image");
  wallpaper2.removeAttribute("data-blurred-src");
  wallpaper2.style.backgroundImage = "";
};
DesktopManager.prototype.applyRegisteredWallpaper = function(id) {
  this.clearWallpaperContent();
  var frame = this.ensureWallpaperFrame();
  if (!frame)
    return;
  if (typeof appManager !== "undefined" && typeof appManager.setWallpaper === "function")
    appManager.setWallpaper(id);
  else
    __lvosSet(frame, "src", "https://iemand005.github.io/FrostedColours/");
};
DesktopManager.prototype.restoreDefaultWallpaper = function() {
  var defaultId = "colors";
  if (typeof appManager !== "undefined" && appManager._wallpaper)
    defaultId = __lvosGet(appManager._wallpaper, "id");
  this.applyRegisteredWallpaper(defaultId);
};
DesktopManager.prototype.clearWallpaperCache = function() {
  try {
    if (typeof settings !== "undefined" && settings.set)
      settings.set("wallpaperImage", null);
  } catch (ex) {
  }
  try {
    window.localStorage.removeItem("wallpaperImage");
  } catch (ex) {
  }
  initWallpaperDB(function(db) {
    var transaction = db.transaction(["wallpapers"], "readwrite");
    var store = transaction.objectStore("wallpapers");
    store["delete"]("current");
  }, function() {
  });
};
window.desktopManager = new DesktopManager();
function isFileDrag(ev) {
  var transfer = ev && ev.dataTransfer;
  var types = transfer && transfer.types;
  if (!types)
    return false;
  for (var i = 0; i < types.length; i++) {
    if (String(types[i]).toLowerCase() === "files")
      return true;
  }
  return false;
}
function setDesktopDragOpacity(opacity) {
  var desktop = document.getElementById("desktop");
  if (desktop)
    desktop.style.opacity = opacity;
}
window.ondrag = document.ondrag = function(ev) {
  ev = ev || window.event;
  if (!isFileDrag(ev))
    return;
  setDesktopDragOpacity("0.5");
};
window.ondragleave = document.ondragleave = function(ev) {
  ev = ev || window.event;
  if (!isFileDrag(ev))
    return;
  setDesktopDragOpacity("");
};
window.ondragend = document.ondragend = function() {
  setDesktopDragOpacity("");
};
var wallpaperDB = null;
function initWallpaperDB(onSuccess, onFailure) {
  var isFileScheme = window.location.protocol === "file:";
  if (isFileScheme) {
    if (onFailure)
      onFailure(new Error("IndexedDB not available for file:// scheme"));
    return;
  }
  if (typeof indexedDB === "undefined") {
    if (onFailure)
      onFailure(new Error("IndexedDB not supported"));
    return;
  }
  if (wallpaperDB) {
    onSuccess(wallpaperDB);
    return;
  }
  var request = indexedDB.open("LVOSWallpaperDB", 1);
  request.onerror = function() {
    if (onFailure)
      onFailure(request.error);
  };
  request.onsuccess = function() {
    wallpaperDB = request.result;
    onSuccess(wallpaperDB);
  };
  request.onupgradeneeded = function(event2) {
    if (!event2.target)
      return;
    var db = event2.target.result;
    if (!db.objectStoreNames.contains("wallpapers")) {
      db.createObjectStore("wallpapers", { keyPath: "id" });
    }
  };
}
function localStorageFabblack(dataUrl) {
  if (!dataUrl)
    return;
  try {
    if (typeof settings !== "undefined" && settings.set)
      settings.set("wallpaperImage", dataUrl);
    else
      throw new Error("Settings unavailable");
  } catch (ex) {
    try {
      window.localStorage.setItem("wallpaperImage", dataUrl);
    } catch (ex2) {
    }
  }
}
function saveWallpaperToCache(blob, dataUrl) {
  if (!(blob instanceof Blob))
    return;
  initWallpaperDB(function(db) {
    var transaction = db.transaction(["wallpapers"], "readwrite");
    var store = transaction.objectStore("wallpapers");
    store.put({ id: "current", blob: blob, timestamp: Date.now() }).onerror = function() {
      localStorageFabblack(dataUrl);
    };
  }, function() {
    localStorageFabblack(dataUrl);
  });
}
function hasRegisteredWallpaperSelection() {
  if (typeof settings === "undefined" || !settings || typeof settings.get !== "function")
    return false;
  var selection = settings.get("wallpaper");
  return typeof selection === "string" && selection.indexOf("registered:") === 0;
}
function loadWallpaperFromCache() {
  initWallpaperDB(function(db) {
    var store = db.transaction(["wallpapers"], "readonly").objectStore("wallpapers");
    var request = store.get("current");
    request.onsuccess = function() {
      var result = request.result;
      if (result && result.blob && window.desktopManager && !hasRegisteredWallpaperSelection()) {
        window.desktopManager.applyWallpaperImage(URL.createObjectURL(result.blob));
      } else {
        loadWallpaperFromLocalStorage();
      }
    };
    request.onerror = loadWallpaperFromLocalStorage;
  }, loadWallpaperFromLocalStorage);
}
function loadWallpaperFromLocalStorage() {
  if (hasRegisteredWallpaperSelection())
    return;
  var key = "wallpaperImage";
  var cachedWallpaper;
  try {
    cachedWallpaper = typeof settings !== "undefined" ? settings.get(key) : window.localStorage.getItem(key);
  } catch (ex) {
    try {
      cachedWallpaper = window.localStorage.getItem(key);
    } catch (ex2) {
    }
  }
  if (cachedWallpaper && window.desktopManager)
    window.desktopManager.applyWallpaperImage(cachedWallpaper);
}
function handleWallpaperDrop(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  setDesktopDragOpacity("");
  if (!ev.dataTransfer || !ev.dataTransfer.files)
    return;
  var files = ev.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (!file.type.match(/^image\//))
      continue;
    var reader = new FileReader();
    reader.onload = function(e) {
      if (!e.target)
        return;
      var dataUrl = e.target.result;
      if (!(typeof dataUrl === "string"))
        return;
      try {
        if (window.desktopManager) {
          window.desktopManager.applyWallpaperImage(dataUrl);
          saveWallpaperToCache(file, dataUrl);
        }
      } catch (ex) {
      }
    };
    reader.readAsDataURL(file);
    break;
  }
}
window.ondrop = document.ondrop = handleWallpaperDrop;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadWallpaperFromCache, false);
} else {
  loadWallpaperFromCache();
}
window.addEventListener("keydown", function(event2) {
  if (event2.key === "Shift" || event2.keyCode === 16) {
    __lvosGet(document, "body").classList.add("slow-animations");
  }
}, false);
window.addEventListener("keyup", function(event2) {
  if (event2.key === "Shift" || event2.keyCode === 16) {
    __lvosGet(document, "body").classList.remove("slow-animations");
  }
}, false);
var wallpaper = DesktopManager.getWallpaper();
if (wallpaper) {
  wallpaper.ondragover = function(ev) {
    ev.preventDefault();
  };
  wallpaper.ondrop = function(ev) {
    ev.preventDefault();
  };
}
var screenShooter = null;
function getScreenShooter() {
  if (screenShooter)
    return screenShooter;
  if (typeof ScreenShooter === "undefined")
    return null;
  return screenShooter = new ScreenShooter();
}
var picker = "ElementPicker" in window ? new ElementPicker({
  onSelect: function(el) {
    var shooter = getScreenShooter();
    if (shooter)
      shooter.screenshotElement(el);
  },
  onMove: function(el) {
    if (el.nodeName === "ARTICLE") {
      var dialog = windowManager.getWindowOwningElement(el);
      if (dialog && dialog.target)
        this.highlight(dialog.target);
    } else
      this.highlight(el);
    return true;
  }
}) : null;
if (picker)
  picker.register();
"use strict";
function formatCamelCase(text) {
  if (!text)
    return "";
  var result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
function SettingsHandler() {
  this.storage = typeof localStorage != "undefined" && localStorage || typeof ActiveXStorage != "undefined" && new ActiveXStorage();
}
SettingsHandler.prototype.get = function(key) {
  if (!this.storage)
    return null;
  var value = this.storage.getItem(key);
  if (value == null)
    return null;
  try {
    return JSON.parse(value);
  } catch (ex) {
    return value;
  }
};
SettingsHandler.prototype.set = function(key, value) {
  if (this.storage)
    this.storage.setItem(key, value);
};
SettingsHandler.prototype.saveFlags = function(flags2) {
  var saved = {};
  for (var flagId in flags2) {
    if (__lvosIsAccessorMethod(flagId))
      continue;
    if (!flags2.hasOwnProperty(flagId) || flagId.charAt(0) === "_")
      continue;
    saved[flagId] = __lvosGet(flags2, flagId);
  }
  this.set("flags", JSON.stringify(saved));
};
SettingsHandler.prototype.restoreFlags = function(flags2) {
  var saved = this.get("flags");
  if (!saved || typeof saved != "object")
    return;
  for (var flagId in saved) {
    if (!saved.hasOwnProperty(flagId))
      continue;
    if (typeof __lvosGet(flags2, flagId) == "boolean" && typeof saved[flagId] == "boolean") {
      __lvosSet(flags2, flagId, saved[flagId]);
    }
  }
};
SettingsHandler.prototype.loadFlags = function(flags2) {
  var handler = this;
  handler.restoreFlags(flags2);
  var flagsElement = document.createElement("ul");
  for (var flagId in flags2) {
    if (__lvosIsAccessorMethod(flagId))
      continue;
    if (!flags2.hasOwnProperty(flagId) || flagId.charAt(0) === "_")
      continue;
    var flag = __lvosGet(flags2, flagId);
    var flagValue = __lvosGet(flags2, flagId);
    switch (typeof flag) {
      case "boolean":
        var row = document.createElement("li");
        (function(currentKey) {
          var toggle = document.createElement("input");
          toggle.type = "checkbox";
          __lvosSet(toggle, "id", "flag-" + flagId);
          toggle.checked = flagValue;
          toggle.addEventListener("change", function() {
            __lvosSet(flags2, currentKey, toggle.checked);
            handler.saveFlags(flags2);
          }, false);
          var label = document.createElement("label");
          label.htmlFor = __lvosGet(toggle, "id");
          label.appendChild(document.createTextNode(formatCamelCase(flagId)));
          row.appendChild(toggle);
          row.appendChild(label);
          flagsElement.appendChild(row);
        })(flagId);
        break;
    }
  }
  var settingsElement = document.getElementById("settings");
  if (settingsElement)
    settingsElement.appendChild(flagsElement);
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
  if (!startButton)
    return;
  if (theme === "windows-10") {
    var logoIcon = document.createElement("img");
    logoIcon.onload = function() {
      if (startButton) {
        startButton.innerText = "";
        startButton.appendChild(logoIcon);
      }
    };
    __lvosSet(logoIcon, "src", "Assets/Windows-10.svg");
  } else if (startButton.getElementsByTagName("img").length) {
    startButton.innerText = "Start";
  }
}
function setThemeOption(theme) {return;
  var previous = settings.get("theme");
  var blurWasOn = previous === "blur" || previous === "glass" || previous === "modern-blur";
  var previousBase = BASE_THEMES[previous];
  if (previous && previous !== theme) {
    if (THEMES.indexOf(previous) !== -1)
      DesktopManager.removeTheme(previous);
    if (previous === "glass")
      DesktopManager.removeTheme("blur");
    if (previous === "modern-blur") {
      DesktopManager.removeTheme("blur");
      DesktopManager.removeTheme("modern");
    }
    if (previousBase)
      DesktopManager.removeTheme(previousBase);
  }
  if (theme && THEMES.indexOf(theme) !== -1) {
    if (theme !== "modern-blur")
      setTheme(theme);
    if (theme === "glass")
      setTheme("blur");
    if (theme === "modern-blur") {
      setTheme("modern");
      setTheme("blur");
    }
    if (BASE_THEMES[theme])
      setTheme(BASE_THEMES[theme]);
    applyStartButtonIcon(theme);
    settings.set("theme", theme);
  } else {
    DesktopManager.removeTheme("blur");
    DesktopManager.removeTheme("glass");
    settings.set("theme", "");
  }
  if (theme === "blur" || theme === "glass")
    DesktopManager.removeTheme("modern");
  else if (blurWasOn && theme !== "modern-blur")
    setTheme("modern");
  if (typeof windowManager !== "undefined" && typeof windowManager.broadcastTheme === "function")
    windowManager.broadcastTheme();
}
function toggleColorDebug(enabled) {
  __lvosGet(document, "body").classList.toggle("color-debug", enabled);
  settings.set("color-debug", enabled);
}
function toggleSquircles(enabled) {
  __lvosGet(document, "body").classList.toggle("squircles", enabled);
  settings.set("squircles", enabled);
}
function setBorderSize(size) {
  settings.set("borderSize", size);
  if (typeof windowManager !== "undefined" && __lvosGet(windowManager, "windows")) {
    for (var index in __lvosGet(windowManager, "windows"))
      if (__lvosGet(windowManager, "windows").hasOwnProperty(index))
        __lvosSet(__lvosGet(windowManager, "windows")[index], "borderSize", size);
  }
}
function hexToRGB(hex) {
  if (typeof hex == "undefined" || !hex)
    return;
  var bla = 0;
  return { r: bla >> 16 & 255, g: bla >> 8 & 255, b: bla & 255 };
}
function isColorDark(color) {
  if (typeof color == "undefined")
    return;
  var rgb = hexToRGB(color);
  if (!rgb)
    return false;
  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b < 128;
}
function setColor(color) {
  if (typeof color == "undefined" || !(elements.color instanceof HTMLInputElement))
    return;
  settings.set("color", elements.color.value = color);
  var isWhite = isColorDark(color);
  if (!("windowManager" in window))
    return;
  for (var index in __lvosGet(windowManager, "windows"))
    if (__lvosGet(windowManager, "windows").hasOwnProperty(index)) {
      var dialog = __lvosGet(windowManager, "windows")[index];
      if (!dialog || !dialog.target)
        continue;
      var content = dialog.target.getElementsByTagName("content")[0];
      if (!(content instanceof HTMLElement))
        continue;
      content.style.backgroundColor = color;
      content.style.color = isWhite ? "white" : "black";
    }
  if (window.metaThemeColor)
    window.metaThemeColor.setAttribute("content", color);
}
function setAccentColor(color) {
  if (!color)
    return;
  elements.accent.value = color;
  settings.set("accentColor", color);
  var isWhite = isColorDark(color);
  var metroStyle = document.getElementById("metro").style, charmStyle = document.getElementById("charms").style;
  metroStyle.backgroundColor = charmStyle.backgroundColor = color;
  metroStyle.color = charmStyle.color = isWhite ? "white" : "black";
}
function loadSettings() {
  loadThemeSetting();
  restoreWallpaperSetting();
  setColor(settings.get("color"));
  setAccentColor(settings.get("accentColor"));
}
function updateWallpaperImageButton() {
  if (!elements.wallpaperImageButton || !elements.wallpaperSelect)
    return;
  __lvosSet(elements.wallpaperImageButton, "hidden", elements.wallpaperSelect.value !== "image");
}
function loadWallpaperOptions() {
  if (!elements.wallpaperSelect)
    return;
  var current = settings.get("wallpaper") || "";
  elements.wallpaperSelect.innerHTML = "";
  var noneOption = document.createElement("option");
  noneOption.value = "";
  noneOption.textContent = "None";
  elements.wallpaperSelect.appendChild(noneOption);
  if (typeof appManager != "undefined" && typeof appManager.forEachWallpaper == "function") {
    appManager.forEachWallpaper(function(app, id) {
      var option = document.createElement("option");
      option.value = "registered:" + id;
      option.textContent = __lvosGet(app, "title") || id;
      elements.wallpaperSelect.appendChild(option);
    });
  }
  var imageOption = document.createElement("option");
  imageOption.value = "image";
  imageOption.textContent = "Image\u2026";
  elements.wallpaperSelect.appendChild(imageOption);
  elements.wallpaperSelect.value = current;
  updateWallpaperImageButton();
}
function restoreWallpaperSetting() {
  loadWallpaperOptions();
  var wallpaper2 = settings.get("wallpaper");
  if (typeof wallpaper2 != "string" || !wallpaper2)
    return;
  if (wallpaper2 === "image")
    return;
  if (wallpaper2.indexOf("registered:") === 0 && window.desktopManager && typeof window.desktopManager.applyRegisteredWallpaper == "function") {
    window.desktopManager.applyRegisteredWallpaper(wallpaper2.slice("registered:".length));
  }
}
function setWallpaperOption(value) {
  settings.set("wallpaper", value);
  updateWallpaperImageButton();
  if (value === "image") {
    if (typeof loadWallpaperFromCache == "function")
      loadWallpaperFromCache();
    return;
  }
  if (value.indexOf("registered:") === 0) {
    var id = value.slice("registered:".length);
    if (window.desktopManager && typeof window.desktopManager.applyRegisteredWallpaper == "function")
      window.desktopManager.applyRegisteredWallpaper(id);
    return;
  }
  if (window.desktopManager) {
    if (typeof window.desktopManager.restoreDefaultWallpaper === "function")
      window.desktopManager.restoreDefaultWallpaper();
    if (typeof window.desktopManager.clearWallpaperCache === "function")
      window.desktopManager.clearWallpaperCache();
  }
}
function applyWallpaperFile(files) {
  if (!files || !files.length)
    return;
  var file = files[0];
  if (typeof file.type !== "string" || !file.type.match(/^image\//))
    return;
  var reader = new FileReader();
  reader.onload = function(e) {
    if (!e.target)
      return;
    var dataUrl = e.target.result;
    if (typeof dataUrl !== "string" || !window.desktopManager)
      return;
    window.desktopManager.applyWallpaperImage(dataUrl, void 0, function() {
      console.warn("Failed to apply wallpaper image");
    });
    saveWallpaperToCache(file, dataUrl);
    settings.set("wallpaper", "image");
  };
  reader.readAsDataURL(file);
}
function loadThemeSetting() {return;
  var theme = settings.get("theme");
  if (THEMES.indexOf(theme) !== -1) {
    for (var i = 0; i < THEMES.length; i++)
      __lvosGet(document, "body").classList.remove(THEMES[i]);
    for (var base in BASE_THEMES) {
      if (BASE_THEMES.hasOwnProperty(base))
        __lvosGet(document, "body").classList.remove(BASE_THEMES[base]);
    }
    if (theme !== "modern-blur")
      setTheme(theme);
    if (theme === "glass")
      setTheme("blur");
    if (theme === "modern-blur") {
      setTheme("modern");
      setTheme("blur");
    }
    if (BASE_THEMES[theme])
      setTheme(BASE_THEMES[theme]);
    if (theme === "blur" || theme === "glass")
      removeTheme("modern");
    applyStartButtonIcon(theme);
    if (elements.theme)
      elements.theme.value = theme;
  }
  var colorDebug = settings.get("color-debug");
  if (typeof colorDebug == "boolean") {
    __lvosGet(document, "body").classList.toggle("color-debug", colorDebug);
    if (elements.colorDebug)
      elements.colorDebug.checked = colorDebug;
  }
  var squircles = settings.get("squircles");
  if (typeof squircles == "boolean") {
    __lvosGet(document, "body").classList.toggle("squircles", squircles);
    if (elements.squircles)
      elements.squircles.checked = squircles;
  }
}
var elements = {
  color: null,
  accent: null,
  border: null,
  theme: null,
  colorDebug: null,
  squircles: null,
  noBlurFullscreen: null,
  installAppUrl: null,
  installAppButton: null,
  installAppProxiedButton: null,
  wallpaperSelect: null,
  wallpaperInput: null,
  wallpaperImageButton: null
};
function installAppFromUrl(useProxy) {
  var url = (elements.installAppUrl && elements.installAppUrl.value || "").trim();
  if (!url)
    return;
  if (typeof appManager !== "undefined") {
    var app;
    if (useProxy) {
      var proxyUrl = "https://browz.netlify.app/browz-set-cookie/";
      app = appManager.createApp(proxyUrl + url, getSiteName(url), "custom." + getDomain(url), getFaviconUrl(url));
    } else {
      app = appManager.createApp(url);
    }
    appManager.addApp(app);
    appManager.saveApp(app);
    if (elements.installAppUrl)
      elements.installAppUrl.value = "";
    return;
  }
  if (typeof windowManager !== "undefined") {
    if (useProxy && typeof windowManager.installAppProxied == "function") {
      windowManager.installAppProxied(url);
    } else if (typeof windowManager.installApp == "function") {
      windowManager.installApp(url);
    }
    if (elements.installAppUrl)
      elements.installAppUrl.value = "";
  }
}
function loadElements() {
  elements.color = document.getElementById("color");
  elements.accent = document.getElementById("accent");
  elements.border = document.getElementById("border");
  elements.theme = document.getElementById("theme");
  elements.colorDebug = document.getElementById("color-debug");
  elements.squircles = document.getElementById("squircles");
  elements.noBlurFullscreen = document.getElementById("no-blur-fullscreen");
  elements.installAppUrl = document.getElementById("install-app-url");
  elements.installAppButton = document.getElementById("install-app-button");
  elements.installAppProxiedButton = document.getElementById("install-app-proxied-button");
  elements.wallpaperSelect = document.getElementById("wallpaper-select");
  elements.wallpaperInput = document.getElementById("wallpaper-input");
  elements.wallpaperImageButton = document.getElementById("wallpaper-image-button");
  var applist = document.getElementById("applist");
  var charmsButton = applist ? applist.appendChild(document.createElement("button")) : document.createElement("button");
  charmsButton.textContent = "Settings";
  if (charmsButton)
    charmsButton.onclick = function() {
      DesktopManager.toggleCharms();
    };
  if (elements.border)
    elements.border.oninput = elements.border.onchange = function() {
      setBorderSize(this.value);
    };
  if (elements.accent)
    elements.accent.oninput = elements.accent.onchange = function() {
      setAccentColor(this.value);
    };
  if (elements.color)
    elements.color.oninput = elements.color.onchange = function() {
      setColor(this.value);
    };
  if (elements.theme)
    elements.theme.onchange = function() {
      setThemeOption(this.value);
    };
  if (elements.colorDebug)
    elements.colorDebug.onchange = function() {
      toggleColorDebug(this.checked);
    };
  if (elements.squircles)
    elements.squircles.onchange = function() {
      toggleSquircles(this.checked);
    };
  if (elements.noBlurFullscreen)
    elements.noBlurFullscreen.onchange = function() {
      toggleNoBlurFullscreen(this.checked);
    };
  if (elements.installAppButton)
    elements.installAppButton.onclick = function() {
      installAppFromUrl(false);
    };
  if (elements.installAppProxiedButton)
    elements.installAppProxiedButton.onclick = function() {
      installAppFromUrl(true);
    };
  if (elements.wallpaperSelect)
    elements.wallpaperSelect.onchange = function() {
      setWallpaperOption(this.value);
    };
  if (elements.wallpaperInput)
    elements.wallpaperInput.onchange = function() {
      applyWallpaperFile(this.files);
    };
  if (elements.wallpaperImageButton)
    elements.wallpaperImageButton.onclick = function() {
      if (elements.wallpaperInput)
        elements.wallpaperInput.click();
    };
  if (elements.installAppUrl && elements.installAppUrl.form) {
    elements.installAppUrl.form.addEventListener("submit", function(event2) {
      event2.preventDefault();
      installAppFromUrl(false);
    }, false);
  }
  if (typeof flags !== "undefined")
    settings.loadFlags(flags);
}
addEventListener("load", function() {
  loadElements();
  loadSettings();
}, false);
function downloadObject(object, fileName) {
  var uri = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
  var a = document.createElement("a");
  a.setAttribute("href", uri);
  a.setAttribute("download", fileName || "\xF6bject.json");
  __lvosGet(document, "body").appendChild(a);
  a.click();
  __lvosGet(document, "body").removeChild(a);
}
function downloadSettings() {
  downloadObject(localStorage);
}
"use strict";
var dockAppList = document.getElementById("dockapplist");
function provisionedApp(title, id, src, extra) {
  return Object.assign({ title: title, id: id, src: src }, extra);
}
var applications = [
  provisionedApp("Settings App", "settings", "./Applications/Settings/settings.html"),
  provisionedApp("Frosted Colors", "colors", "Applications/FrostedColours/index.html", { distSrc: "https://iemand005.github.io/FrostedColours", wallpaper: true }),
  provisionedApp("Calculator", "calculator", "./Applications/Calculator/calculator.html", { minWidth: 180, minHeight: 240 }),
  provisionedApp("Color Tool", "colortool", "./Applications/ColorTool/colors.html", { minWidth: 180, minHeight: 240 }),
  provisionedApp("Example", "0", "./example.html"),
  provisionedApp("Camera", "camera", "./Applications/Camera/index.html", { camera: true, microphone: true }),
  provisionedApp("Video", "video", "./Applications/Video/index.html", { hidden: true }),
  provisionedApp("Cover Flow", "coverflow", "./Applications/Coverflow/Coverflow.html"),
  provisionedApp("Music", "music", "./Applications/Music/index.html"),
  provisionedApp("Citates", "citates", "./Applications/Citaten/index.html", { hidden: true }),
  provisionedApp("Clock", "clock", "./Applications/Clock/index.html", { hidden: true }),
  provisionedApp("Verlet", "verlet", "./Applications/Verlet/index.html", { hidden: true }),
  provisionedApp("Recorder", "recorder", "./Applications/Recorder/index.html", { hidden: true }),
  provisionedApp("Error", "error", "./Applications/Error/error.html", { hidden: true }),
  provisionedApp("Cube", "cube", "./Applications/Cube/cube.html", { hidden: true }),
  provisionedApp("Geode", "geode", "https://geode.tepartive.net", { hidden: true }),
  provisionedApp("Level", "level", "./Applications/Level/level.html", { hidden: true }),
  provisionedApp("Browser", "browser", "./Applications/Browser/index.html"),
  provisionedApp("MPTool", "mptool", "./Applications/MPTool/index.html", { hidden: true }),
  provisionedApp("Autostereograms", "stereograms", "./Applications/StereogramMaker/index.html", { hidden: true }),
  provisionedApp("Metronome", "cyanide.metronome", "./Applications/Cyanide/metronome/index.html", { hidden: true }),
  provisionedApp("Rainboy", "cyanide.rainboy", "./Applications/Cyanide/rainboy/index.html", { hidden: true }),
  provisionedApp("OPC", "opc", "https://bypass-online.netlify.app/", { iconUrl: "https://iemand005.github.io/OPC/files/apps/me.flexan.terminal/terminal.png", accentColor: "rgb(37, 104, 245)" }),
  provisionedApp("daedalOS", "daedal", "https://dustinbrett.com/"),
  provisionedApp("Fenix Engine Demo", "fenix.web", "https://iemand005.github.io/FenixWeb/"),
  provisionedApp("FoxCraft", "fenix.foxcraft", "https://iemand005.github.io/FenixWeb/FoxCraft/index.html"),
  provisionedApp("Cake", "fenix.cake", "https://iemand005.github.io/FenixWeb/Cake/index.html", { audioVisualizer: true }),
  provisionedApp("My Web Archive", "foxyz.archive", "https://iemand005.github.io/Archive-2023/index.html"),
  provisionedApp("Tappy", "foxyz.tappy", "./Applications/Tappy/tappy.html", { hidden: true }),
  provisionedApp("AIOne", "foxyz.aione", "./Applications/AIOneWeb/index.html", { hidden: true }),
  provisionedApp("WebGPUFluidSim", "foxyz.webgpufluidsim", "./Applications/WebGPUFluidSim/index.html", { moveEvents: true }),
  provisionedApp("Fur:Trash", "foxyz.fur:trash", "https://open.spotify.com/embed/artist/1jp7cmyHDn5nuP3MMSwm1m?utm_source=generator&si=86b6cf864e0048c3", { iconUrl: "https://image-cdn-fa.spotifycdn.com/image/ab6761610000f1788c05c5ac8638f68f84053a57" }),
  provisionedApp("Cavetown", "foxyz.cavetown", "https://open.spotify.com/embed/artist/2hR4h1Cao2ueuI7Cx9c7V8?utm_source=generator&theme=0&si=714602d32e764d47", { iconUrl: "https://image-cdn-fa.spotifycdn.com/image/ab6761610000f17845ec07bbcf1fed2a4747e780" }),
  provisionedApp("Awolnation", "foxyz.awolnation", "https://open.spotify.com/embed/artist/4njdEjTnLfcGImKZu1iSrz", { iconUrl: "https://image-cdn-fa.spotifycdn.com/image/ab6761610000f17845ec07bbcf1fed2a4747e780" }),
  provisionedApp("Papa Roach", "foxyz.papa-roach", "https://open.spotify.com/embed/artist/4RddZ3iHvSpGV4dvATac9X", { iconUrl: "https://image-cdn-fa.spotifycdn.com/image/ab6761610000f17845ec07bbcf1fed2a4747e780" }),
  provisionedApp("Monaco", "monaco", "./Applications/Monaco/monaco.html", { iconUrl: "https://code.visualstudio.com/favicon.ico" }),
  provisionedApp("Furzona Lite", "furzona", "https://iemand005.github.io/FurzonaWeb", { iconUrl: "https://iemand005.github.io/FurzonaWeb/Logo.png" }),
  provisionedApp("The Useless Web", "theuselessweb", "https://theuselessweb.com/"),
  provisionedApp("Windows 95", "win95", "https://98.js.org/"),
  provisionedApp("Pinball Space Cadet", "pinball", "https://98.js.org/programs/pinball/space-cadet.html", { iconUrl: "https://98.js.org/images/icons/pinball-16x16.png" }),
  provisionedApp("Internet Exporer", "ie", "https://98.js.org/programs/explorer/index.html?address=https%3A%2F%2Fwww.google.com", { iconUrl: "https://98.js.org/images/icons/html-16x16.png" }),
  provisionedApp("Solitaire", "solitaire", "https://98.js.org/programs/js-solitaire/index.html", { iconUrl: "https://98.js.org/images/icons/solitaire-16x16.png" }),
  provisionedApp("Pipes", "pipes", "https://98.js.org/programs/pipes/index.html#%7B%22hideUI%22%3Atrue%7D", { iconUrl: "https://98.js.org/images/icons/solitaire-16x16.png", screensaver: true }),
  provisionedApp("Cavetown - Big Strong Man", "cavetown.bigstrongmen", "https://www.youtube.com/embed/uKn0BtAAEyw?si=s3Pz0PzIpQDCxizU"),
  provisionedApp("Gamepad Input Recorder", "inputrecorder", "https://iemand005.github.io/GamepadRecorder/"),
  provisionedApp("LVOS Mobile", "mobile", "./mobile.html", { distSrc: "https://iemand005.github.io/LVOS/mobile.html" }),
  provisionedApp("LVOS", "lvos", "index.html", { distSrc: "https://iemand005.github.io/LVOS/", altUrls: ["https://iemand005.github.io/LVOS-dist/", "https://vulpos.pages.dev/", "https://localhost:5000/index.html", "https://localhost:5001/index.html", "https://lvos.neocities.org"] }),
  provisionedApp("Speak", "speak", "Applications/Speak/speak.html"),
  provisionedApp("Tepartive.NET", "tepartive", "https://tepartive.net/"),
  provisionedApp("ColourTool", "color-tool", "Applications/ColorTool/colors.html")
];
var games = [
  provisionedApp("Conway", "conway", "./Games/Conway/index.html", { classes: ["rounded-corners"] }),
  provisionedApp("Velocities", "velocities", "./Applications/Velocities/index.html", { moveEvents: true }),
  provisionedApp("Minesweeper", "minesweeper", "./Games/Minesweeper/index.html", { resizable: false, scroll: false }),
  provisionedApp("Chess", "chess", "./Games/Chess/index.html", { hidden: true }),
  provisionedApp("Tetris", "tetris", "./Games/Tetris/tetris.html", { hidden: true }),
  provisionedApp("Sudoku", "sudoku", "./Games/Sudoku/sudoku.html", { hidden: true }),
  provisionedApp("Clicker", "clicker", "./Games/ChoccyClicker/clicker.html", { hidden: true }),
  provisionedApp("FAT", "mountain", "https://iemand005.github.io/MountainWeb/"),
  provisionedApp("Planet Life", "planetlife", "https://www.planetlife.space/static/game/index.html"),
  provisionedApp("Horizon Background", "horizon-bg", "https://iemand005.github.io/HorizonBackground/", { wallpaper: true })
];
if (typeof windowManager !== "undefined") {
  __lvosDefineProperty(Window.prototype, "windows", {
    get: function() {
      return __lvosGet(windowManager, "windows");
    }
  });
}
function dockApp(dialog) {
  if (dockAppList && dialog)
    dockAppList.appendChild(dialog.createOpenButton());
}
function initApps() {
  if (typeof windowManager !== "undefined") {
    windowManager.injectApplications(applications);
    windowManager.injectApplications(games);
    windowManager.loadInstalledApps();
    windowManager.loadState();
    var windows = __lvosGet(windowManager, "windows");
    if (dockAppList) {
      if (windows.browser)
        dockApp(windows.browser);
      if (windows.console)
        dockApp(windows.console);
      if (windows.music)
        dockApp(windows.music);
    }
  }
  finishAppInstall();
}
function finishAppInstall() {
  if (typeof appManager !== "undefined") {
    appManager.addApps(applications, games);
    appManager.loadApps();
  }
  if (typeof restoreWallpaperSetting === "function")
    restoreWallpaperSetting();
}
finishAppInstall();
window.addEventListener("load", initApps, false);
var bindConsole = false;
var ConsoleOutType = {
  Input: -1,
  Return: 0,
  Log: 1,
  Warn: 2,
  Error: 3
};
function ConsoleInterceptor() {
  this.results = [];
  this.stdout = null;
  this.stdin = null;
}
ConsoleInterceptor.prototype.intercept = function() {
  if (!this.stdout)
    return;
  try {
    if (this.stdout.firstChild)
      this.stdout.removeChild(this.stdout.firstChild);
    var html = this.getHTML();
    this.stdout.appendChild(html);
    this.stdout.scrollTop = this.stdout.scrollHeight;
  } catch (ex) {
    alert(ex);
  }
};
ConsoleInterceptor.prototype.init = function() {
  var self = this;
  var consoleForm = document.getElementById("console").getElementsByTagName("form")[0];
  this.stdout = consoleForm.stdout || consoleForm.getElementsByTagName("output")[0] || document.getElementById("stdout");
  this.stdin = consoleForm.stdin || consoleForm.getElementsByTagName("INPUT")[0] || consoleForm.getElementById("stdin");
  var interceptConsole = function() {
    self.intercept();
  };
  consoleForm.addEventListener("submit", function(event) {
    event.preventDefault();
    try {
      var input = (event.target.input || this.stdin).value;
      self.results.push({
        type: ConsoleOutType.Input,
        data: [input]
      });
      self.results.push({
        type: ConsoleOutType.Log,
        data: [eval(input)]
      });
    } catch (exception) {
      alert(exception);
      self.results.push({ type: ConsoleOutType.Error, data: [exception] });
    }
    interceptConsole();
  }, false);
};
ConsoleInterceptor.prototype.bindage = function() {
  var self2 = this;
  if (bindConsole) {
    console.standardLog = console.log.bind(console);
    console.logs = [];
    console.log = function() {
      console.standardLog.apply(console, arguments);
      self2.results.push({ type: ConsoleOutType.Log, data: arguments });
      self2.intercept();
    };
    console.standardWarning = console.error.bind(console);
    console.warnings = [];
    console.warn = function() {
      console.standardWarning.apply(console, arguments);
      self2.results.push({ type: ConsoleOutType.Warn, data: arguments });
      self2.intercept();
    };
    console.standardError = console.error.bind(console);
    console.errors = [];
    console.error = function() {
      console.standardError.apply(console, arguments);
      self2.results.push({ type: ConsoleOutType.Error, data: arguments });
      self2.intercept();
    };
  }
};
ConsoleInterceptor.prototype.getHTML = function() {
  var output = document.createElement("table");
  for (var i = 0; i < this.results.length; i++) {
    var result = this.results[i];
    var tableRow = document.createElement("tr");
    var tableData = document.createElement("td");
    for (var j = 0; j < result.data.length; j++) {
      var data = result.data[j];
      var span = document.createElement("span");
      if (result.type === ConsoleOutType.Input) {
        span.style.color = "black";
        span.appendChild(document.createTextNode(data));
        tableData.appendChild(document.createTextNode("\u2190 "));
        tableData.appendChild(span);
      } else if (result.type === ConsoleOutType.Log) {
        span.style.color = "gray";
        span.appendChild(document.createTextNode(data));
        tableData.appendChild(document.createTextNode("\u2192 "));
        tableData.appendChild(span);
      } else if (result.type === ConsoleOutType.Warn) {
        span.style.color = "yellow";
        span.appendChild(document.createTextNode("\u26A0 " + data));
        tableData.appendChild(span);
      } else if (result.type === ConsoleOutType.Error) {
        span.style.color = "red";
        span.appendChild(document.createTextNode("\u26A0 " + data));
        tableData.appendChild(span);
      } else {
        tableData.appendChild(document.createTextNode(data + "	"));
      }
    }
    tableRow.appendChild(tableData);
    output.appendChild(tableRow);
  }
  return output;
};
var interceptor = new ConsoleInterceptor();
/* interceptor.bindage(); */
window.addEventListener("load", function() {
  if (bindConsole)
    interceptor.init();
}, false);
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
function OmniFS() {
  this.webkitSize = 5 * 1024 * 1024;
  this.webkitFs = null;
  this.apis = [];
}
OmniFS.prototype.init = function(api) {
  var self2 = this;
  if (this.apis.indexOf(api) !== -1)
    return;
  this.apis.push(api);
  return new Promise(function(resolve, reject) {
    switch (api) {
      case "WebKitFS":
        if (!window.webkitRequestFileSystem)
          return reject("webkitRequestFileSystem not supported here.");
        window.webkitRequestFileSystem(window.PERSISTENT, this.webkitSize, function(fs) {
          self2.webkitFs = fs;
        }, reject);
        break;
    }
  });
};
OmniFS.prototype.writeToChromeLegacyFS = function(fileName, textData) {
  var self2 = this;
  return new Promise(function(resolve, reject) {
    if (!self2.webkitFs)
      return reject("webkitRequestFileSystem not initialized.");
    self2.webkitFs.root.getFile(fileName, { create: true }, function(fileEntry) {
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function() {
          resolve("Saved via Chrome Legacy FS to" + fileEntry.toURL());
        };
        fileWriter.onerror = reject;
        var blob = new Blob([textData], { type: "text/plain" });
        fileWriter.write(blob);
      }, reject);
    }, reject);
  });
};
OmniFS.prototype.readFromChromeLegacyFS = function(fileName) {
  var self2 = this;
  return new Promise(function(resolve, reject) {
    if (!self2.webkitFs)
      return reject("webkitRequestFileSystem not initialized.");
    self2.webkitFs.root.getFile(fileName, { create: false }, function(fileEntry) {
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
function NewtonManager() {
  this.lastTime = 0;
  this.gravity = 0.2;
}
NewtonManager.prototype.start = function() {
  requestAnimationFrame(this.loop.bind(this));
};
NewtonManager.prototype.loop = function(time) {
  this.step(time);
  requestAnimationFrame(this.loop.bind(this));
};
NewtonManager.prototype.step = function(time) {
  var currentTime = time;
  var deltaTime = this.lastTime - currentTime;
  this.lastTime = currentTime;
  var self2 = this;
  windowManager.forEachWindow(function(window2) {
    if (window2.dragging)
      return;
    if (!window2.velocity)
      window2.velocity = new Vector();
    __lvosSet(window2.velocity, "y", __lvosGet(window2.velocity, "y") - self2.gravity * deltaTime);
    var lastY = __lvosGet(window2, "y");
    __lvosSet(window2, "y", __lvosGet(window2, "y") + __lvosGet(window2.velocity, "y"));
    __lvosSet(window2, "x", __lvosGet(window2, "x") + __lvosGet(window2.velocity, "x"));
    if (__lvosGet(window2, "y") === lastY)
      __lvosSet(window2.velocity, "y", 0);
  });
};
var launchpad = typeof Launchpad !== "undefined" ? new Launchpad() : null;
function init() {
  if (typeof windowManager !== "undefined" && "windowManager" in window) {
    if (launchpad)
      windowManager.forEachWindow(function(dialog) {
        if (dialog.application)
          launchpad.addApp(dialog);
      });
    if (!isBlink)
      DesktopManager.removeTheme("glass");
    windowManager.initializeDialogs();
    LVMessenger.receive(messageReceived);
  }
  var launchpadElement = document.getElementById("launchpad");
  if (launchpad && launchpadElement) {
    launchpad.init(launchpadElement);
    if (typeof appManager !== "undefined") {
      appManager.forEachApp(launchpad.addApp.bind(launchpad));
      appManager.reloadWallpaper();
    }
  }
  if (location.protocol === "file:")
    try {
      var scripts = document.querySelectorAll('script[type="module"]');
      scripts.forEach(function(s) {
        var replacement = document.createElement("script");
        __lvosSet(replacement, "src", __lvosGet(s, "src"));
        try {
          s.replaceWith(replacement);
        } catch (ex) {
        }
      });
    } catch (ex) {
    }
  window.metaThemeColor = document.querySelector('meta[name="theme-color"]') || void 0;
  if (window.__LVMessenger)
    window.__LVMessenger.accent = window.metaThemeColor;
}
function ready(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 0);
    return;
  }
  window.addEventListener("DOMContentLoaded", fn, false);
}
ready(init);
if (document.documentMode === 9) {
  var script = document.createElement("script");
  __lvosSet(script, "src", "./Scripts/Animation.js");
  document.getElementsByTagName("head")[0].appendChild(script);
}
window.onerror = function() {
  return true;
};
