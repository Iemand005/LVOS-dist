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
      var self2 = this;
      function getClassesArray() {
        return self2.className.split(" ").filter(function(value) {
          return value.length > 0;
        });
      }
      var api = {
        add: function(className) {
          if (!api.contains(className)) {
            self2.className += (self2.className ? " " : "") + className;
          }
        },
        remove: function(className) {
          var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
          self2.className = self2.className.replace(reg, " ").replace(/^\s+|\s+$/g, "");
        },
        contains: function(className) {
          return new RegExp("(\\s|^)" + className + "(\\s|$)").test(self2.className);
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
    var self2 = this;
    items.forEach(function(item) {
      var kv = item.split("=");
      if (kv.length != 2) return;
      var key = kv[0];
      var value = kv[1];
      self2._data.set(key, value);
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
    var self2 = this;
    self2._state = PENDING;
    self2._value = void 0;
    self2._deferreds = [];
    function resolve(newValue) {
      try {
        if (newValue && (typeof newValue == "object" || typeof newValue == "function")) {
          var then = newValue.then;
          if (typeof then == "function") {
            then.call(newValue, resolve, reject);
            return;
          }
        }
        if (self2._state !== PENDING) return;
        self2._state = FULFILLED;
        self2._value = newValue;
        self2._handleDeferreds();
      } catch (e) {
        reject(e);
      }
    }
    function reject(reason) {
      if (self2._state !== PENDING) return;
      self2._state = REJECTED;
      self2._value = reason;
      self2._handleDeferreds();
    }
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  ES3Promise.prototype._handleDeferreds = function() {
    var self2 = this;
    if (self2._state === PENDING) return;
    setTimeout(function() {
      while (self2._deferreds.length > 0) {
        var deferred = self2._deferreds.shift();
        var callback = self2._state === FULFILLED ? deferred.onFulfilled : deferred.onRejected;
        if (typeof callback != "function") {
          if (self2._state === FULFILLED) {
            deferred.resolve(self2._value);
          } else {
            deferred.reject(self2._value);
          }
          continue;
        }
        try {
          var ret = callback(self2._value);
          deferred.resolve(ret);
        } catch (err) {
          deferred.reject(err);
        }
      }
    }, 0);
  };
  ES3Promise.prototype["then"] = function(onFulfilled, onRejected) {
    var self2 = this;
    return new ES3Promise(function(resolve, reject) {
      self2._deferreds.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      });
      self2._handleDeferreds();
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
      var self2 = this;
      var eventType = "on" + type;
      var wrapped = function() {
        var event2 = window.event;
        if (!event2.target) {
          event2.target = event2.srcElement;
        }
        if (!event2.preventDefault) {
          event2.preventDefault = function() {
            event2.returnValue = false;
          };
        }
        if (!event2.stopPropagation) {
          event2.stopPropagation = function() {
            event2.cancelBubble = true;
          };
        }
        if (typeof listener == "function") {
          listener.apply(self2, [event2]);
        } else {
          self2._currentListener = listener;
          self2._currentListener(event2);
          self2._currentListener = null;
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
  function getRect2(el) {
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
    return getRect2(this);
  };
})();
if (typeof window.HTMLElement == "undefined") window.HTMLElement = Element;
if (typeof window.HTMLTemplateElement == "undefined") window.HTMLTemplateElement = function() {
};
function Vector(x, y) {
  if (typeof x != "number") x = 0, y = 0;
  else if (typeof y != "number") y = x;
  this.x = x;
  this.y = y;
}
Vector.prototype.add = function(vector) {
  return this.x += vector.x, this.y += vector.y, this;
};
Vector.prototype.sub = function(vector) {
  return this.x -= vector.x, this.y -= vector.y, this;
};
Vector.prototype.mul = function(vector) {
  return this.x *= vector.x, this.y *= vector.y, this;
};
Vector.prototype.div = function(vector) {
  return this.x /= vector.x, this.y /= vector.y, this;
};
Vector.prototype.sum = function(vector) {
  return new Vector(this.x + vector.x, this.y + vector.y);
};
Vector.prototype.difference = function(vector) {
  return new Vector(this.x - vector.x, this.y - vector.y);
};
Vector.prototype.product = function(vector) {
  return new Vector(this.x * vector.x, this.y * vector.y);
};
Vector.prototype.quotient = function(vector) {
  return new Vector(this.x / vector.x, this.y / vector.y);
};
Vector.prototype.set = function(vector) {
  return this.x = vector.x, this.y = vector.y, this;
};
Vector.prototype.clone = function() {
  return new Vector(this.x, this.y);
};
function Vector3D(x, y, z) {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  if (typeof x == "number") {
    this.x = x;
    if (y == null && z == null)
      this.y = x, this.z = x;
    else this.y = y, this.z = z;
  } else if (typeof x == "object" && x.x && x.y && x.z) {
    this.x = x.x, this.y = x.y, this.z = x.z;
  }
}
Vector3D.prototype.div = function(amount) {
  this.x /= amount, this.y /= amount, this.z /= amount;
  return this;
};
Vector3D.prototype.normalize = function() {
  return this.div(this.x + this.y + this.z);
};
function Rectangle(x, y, width, height) {
  this.pos = this.position = new Vector(x, y);
  this.width = width;
  this.height = height;
}
Rectangle.prototype = {
  contains: function(vector) {
    return vector.x >= this.position.x && vector.y >= this.position.y && vector.x < this.position.x + this.width && vector.y < this.position.y + this.height;
  },
  /** @this {Rectangle} */
  get x() {
    return this.position.x;
  },
  get y() {
    return this.position.y;
  },
  set x(value) {
    return this.position.x = value;
  },
  set y(value) {
    return this.position.y = value;
  }
};
function YouTubeParser(url) {
  this.url = url;
}
YouTubeParser.prototype = {
  get embedURL() {
    var url = new URL(this.url);
    url.pathname = "/embed/" + url.searchParams.get("v");
    url.searchParams.delete("v");
    return url;
  }
};
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
LVMessenger.broadcastToChild = function(type, message, iFrame) {
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
  var self2 = this;
  closeButton.onclick = function() {
    self2.close();
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
  var self2 = this;
  try {
    var apps = this.installedApps;
    for (var i = 0; i < apps.length; i++) {
      var app = apps[i];
      if (app && app.src) self2.addApp(app);
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
var useMica = false, useTransform = true, useScale = false;
var supportsPointer = typeof window !== "undefined" && ("PointerEvent" in window || "MSPointerEvent" in window);
var supportsObjectFit = Boolean(document.documentElement && document.documentElement.style && typeof document.documentElement.style.objectFit !== "undefined");
var supportsTransitions = false;
var supportsTransform = false;
var isBlink = "chrome" in window;
var isIE = typeof window !== "undefined" && typeof document !== "undefined" && !!window.MSInputMethodContext && document.documentMode === 11;
(function() {
  var style = document.createElement("div").style;
  supportsTransitions = "transition" in style || "WebkitTransition" in style || "MozTransition" in style || "OTransition" in style || "msTransition" in style;
  supportsTransform = "transform" in style || "webkitTransform" in style || "msTransform" in style || "mozTransform" in style || "OTransform" in style;
})();
var maximizeAnimations = 0;
if (supportsPointer) console.log("Supports pointer events!");
var transitionEndEvent = "webkitTransition" in document.documentElement.style ? "webkitTransitionEnd" : "transitionend";
if (isIE) useTransform = true;
if (!supportsTransform) useTransform = false;
var flags = {
  useSkewAnimations: false,
  aeroSnap: false,
  updateRateLimit: isBlink,
  useDragOverlay: true,
  _useTransform: useTransform,
  get useTransform() {
    return this._useTransform;
  },
  set useTransform(value) {
    this._useTransform = value;
    windowManager.forEachWindow(function(dialog) {
      dialog.useTransform = value;
    });
  },
  _compositorResize: true,
  get compositorResize() {
    return this._compositorResize;
  },
  set compositorResize(value) {
    document.body.classList.toggle("compositor-animations", !!value);
    if (value) this._useViewTransitionMaximize = false;
    this._compositorResize = value;
  },
  _useViewTransitionMaximize: false,
  get useViewTransitionMaximize() {
    return this._useViewTransitionMaximize;
  },
  set useViewTransitionMaximize(value) {
    if (value) this.compositorResize = false;
    this._useViewTransitionMaximize = value;
  },
  _useMica: false,
  get useMica() {
    return this._useMica;
  },
  set useMica(value) {
    window.windowManager.toggleMica(value);
    this._useMica = value;
  },
  windowReaper: false,
  verboseLags: false
};
function cancelDomEvent(event2) {
  if (typeof event2.preventDefault === "function") event2.preventDefault();
  event2.returnValue = false;
  if (typeof event2.stopPropagation === "function") event2.stopPropagation();
  event2.cancelBubble = true;
  return false;
}
function getFaviconUrl(url) {
  return "https://" + getDomain(url) + "/favicon.ico";
}
function getDomain(url) {
  return url.replace(/^[a-z]+:\/\/+/i, "").split("/")[0].split("?")[0];
}
function getSiteName(url) {
  var parts = getDomain(url).split(".");
  var name = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}
function isDialog(element) {
  return element && element.classList && element.classList.contains("window");
}
function isElement(object) {
  return object && "nodeType" in object;
}
function getWindowChromeHeight(window2) {
  return window2.outerHeight - window2.innerHeight;
}
function translateElement(element, x, y, skew, scaleX, scaleY, rotation) {
  var transform = "translate(" + Math.floor(x) + "px," + Math.floor(y) + "px)";
  if (skew) transform += " skewX(" + skew + "deg)";
  if (scaleX === 1) scaleX = void 0;
  if (scaleY === 1) scaleY = void 0;
  if (scaleX && scaleY) transform += "scale(" + scaleX + "," + scaleY + ")";
  else {
    if (scaleX) transform += "scaleX(" + scaleX + ")";
    if (scaleY) transform += "scaleY(" + scaleY + ")";
  }
  if (rotation) transform += "rotate(" + rotation + "deg)";
  else {
    element.style.transform = transform;
  }
}
function skewElement(element, skew) {
  var transform = " skewX(" + toDegrees(skew) + ")";
  element.style.transform = transform;
  element.style.webkitTransform = transform;
}
function setClass(element, className, enabled) {
  var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
  if (typeof enabled === "undefined") enabled = element.className.indexOf(className) === -1;
  if (enabled) {
    if (!re.test(element.className))
      element.className = (element.className + " " + className).replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  } else element.className = element.className.replace(re, " ").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  return element.className.indexOf(className) !== -1;
}
function getRect(element, index) {
  if (!element) return null;
  return index ? element.getClientRects()[index] : element.getBoundingClientRect();
}
function messageReceived(type, data, source) {
  if (source) {
    var dialog = windowManager.windows[source];
    if (type === "windowSize") dialog.resizeBody(data.width, data.height);
    switch (type) {
      case "launchOverlay":
        var overlay = bodyCrawler.getOverlay();
        if (!overlay) break;
        overlay.ontransitionend = function() {
          dialog.messageFrame("prepareToLaunchOverlay");
          if (dialog.frame) {
            var oriel = new URL(dialog.frame.src);
            oriel.searchParams.set("fullscreen", String(true));
            dialog.frame.src = oriel.href;
          }
          if (!overlay) return;
          overlay.ontransitionend = null;
          overlay.requestFullscreen().then(function() {
            console.log("Ok I did full screen boy");
          });
          if (dialog.body) overlay.appendChild(dialog.body);
          window.setTimeout(overlay.classList.add.bind(overlay.classList, "shown"), 500);
        };
        overlay.classList.toggle("open");
        break;
      case "readyToLaunchOverlay":
        var overlay1 = bodyCrawler.getOverlay();
        if (!overlay1) break;
        if (dialog.body) overlay1.appendChild(dialog.body);
        window.setTimeout(overlay1.classList.add.bind(overlay1.classList, "shown"), 500);
        break;
      case "pip":
        var id = data.id;
        console.log("Element ID to rip from app guts: " + id, dialog);
        var doc = dialog.contentDocument;
        if (!doc) break;
        var targetElement = doc.getElementById(id);
        console.log("Ripped out element:", targetElement);
        if (!targetElement) break;
        DesktopManager.toggleElementPip(targetElement, function(pipWindow) {
          if (!pipWindow) return;
          pipWindow.onresize = function() {
            if (!(targetElement instanceof HTMLCanvasElement)) return;
            targetElement.width = targetElement.clientWidth;
            targetElement.height = targetElement.clientHeight;
          };
          if (!targetElement) return;
          targetElement.style.width = "100%";
          targetElement.style.height = "100%";
        });
        break;
      case "visualizers":
        dialog.messageFrame("visualizers", window.windowManager.getVisualizerApps());
        break;
    }
    console.log("Received message " + type);
  }
}
function swapMetroBody() {
  if (!windowManager.flipped) return;
  windowManager.activeDialogToMetro();
}
function flip(enable) {
  var tesktop = bodyCrawler.getDesktop();
  if (!tesktop) return;
  tesktop.toggleAttribute("flipped", enable);
  flipHandler(tesktop.classList.toggle("flipped", enable));
}
function flipHandler(enable) {
  DesktopManager.toggleCharms(false);
  swapMetroBody();
  windowManager.flipped = enable;
  return windowManager.flipped;
}
function toggleOverlay(enable) {
  var overlay = bodyCrawler.getOverlay();
  if (!overlay) return;
  overlay.classList.toggle("open", enable);
}
var windowButtons = {
  eject: 0,
  full: 1,
  close: 2
};
function stringifyDialogProperties(properties) {
  return JSON ? JSON.stringify(properties).replace(/true/g, "yes").replace(/false/g, "no").replace(/:/g, "=").replace(/[}{"]/g, "") : "No JSON!";
}
function getViewBoxPosition() {
  return { left: window.screenLeft, top: window.screenTop };
}
function getObjectDialog(object) {
  if (!object) return console.log(object);
  if (isElement(object) && ["DIALOG", "BODY", "HTML", "HEAD"].indexOf(object.tagName) !== -1 || isElement(object) && object.classList && object.classList.contains("window")) return object;
  else if (object instanceof Event && isElement(object.target)) return getObjectDialog(object.target);
  else if (isElement(object)) return getObjectDialog(object.parentElement);
}
function toPixels(value) {
  return Math.round(value) + "px";
}
function toDegrees(value) {
  return Math.round(value) + "deg";
}
function pixelsToCentimeters(pixels) {
  return pixels * 2.54 / 96 * (window.devicePixelRatio || 1);
}
function fromPixels(text) {
  if (text !== null) try {
    return typeof text === "number" ? text : parseInt(text.replace("px", ""));
  } catch (ex) {
    console.warn("Failed to parse pixels:", ex);
  }
  return 0;
}
function handleStorageException(exception) {
  console.error(exception);
  console.warn("A problem occurred, window state saving has been disabled for this session! The stored window state will be reset in an attempt to recover from this issue.");
  console.log("If you wish to save the window state before reset, copy this and put it somewhere else:", localStorage.windowState);
  localStorage.windowState = null;
  windowManager.canSave = false;
}
function getDialogTemplate() {
  var template = document.querySelector("template") || document.getElementById("window-template");
  if (!template) return void console.warn("Couldn't find template!");
  var content = template;
  if (template instanceof HTMLTemplateElement) return template.content.children[0];
  return content.children ? content.children[0] : content.getElementsByClassName("window")[0];
}
function createDialog() {
  var container = bodyCrawler.getDialogsContainer();
  var template = getDialogTemplate();
  if (!template) return null;
  var clone = template.cloneNode(true);
  if (container && clone instanceof Element) {
    var dialogElement = container.appendChild(removeComments(clone));
    if (isElement(dialogElement)) return dialogElement;
  }
  return null;
}
function removeComments(element) {
  element.childNodes.forEach(function(child) {
    if (child.nodeName === "#comment") element.removeChild(child);
    else if (isElement(child)) removeComments(child);
  });
  return element;
}
function removeWallpaper() {
  var wallpaper2 = DesktopManager.getWallpaper();
  if (!wallpaper2) return;
  while (wallpaper2.firstChild) wallpaper2.removeChild(wallpaper2.firstChild);
  return wallpaper2;
}
function WindowManager() {
  this._windows = {};
  this._windowStates = null;
  this._isBlurEnabled = true;
  this._isMicaEnabled = false;
  this._isWindowUpdatesEnabled = false;
  this.isDragging = false;
  this.dragAction = new DragAction();
  this.activeDialog = null;
  this.topZ = 100;
  this.loaded = false;
  this.canSave = true;
  try {
    var hasLocalStorage2 = typeof localStorage !== "undefined";
    if (!hasLocalStorage2) this.canSave = false;
  } catch (ex) {
    console.warn("Local storage access denied.", ex);
  }
  this.ticking = false;
  this.flipped = false;
  this.focusedDialog = null;
  var self2 = this;
  this.resizeHandler = function() {
    self2.forEachWindow(function(window2) {
      window2.update();
    });
  };
  this.windowDragEvent = function(event2) {
    try {
      cancelDomEvent(event2);
      if (flags.updateRateLimit) {
        if (self2.ticking) return;
        window.requestAnimationFrame(function() {
          windowManager.handleWindowDrag(event2.clientX, event2.clientY);
          self2.ticking = false;
        });
        self2.ticking = true;
      } else windowManager.handleWindowDrag(event2.clientX, event2.clientY);
    } catch (ex) {
      console.error(ex);
    }
  };
}
Object.defineProperty(WindowManager.prototype, "windows", {
  get: function() {
    return this._windows;
  }
});
Object.defineProperty(WindowManager.prototype, "windowStates", {
  get: function() {
    if (!this._windowStates && localStorage)
      try {
        var string = localStorage.getItem("windowState");
        if (string === null) return null;
        this._windowStates = JSON.parse(string);
      } catch (ex) {
        if (ex instanceof Error) console.error(ex.message);
      }
    return this._windowStates;
  }
});
Object.defineProperty(WindowManager.prototype, "state", {
  get: function() {
    var state = {};
    for (var id in this.windows) if (this.windows[id]) state[id] = this.windows[id].getState();
    return state;
  }
});
Object.defineProperty(WindowManager.prototype, "isBlurEnabled", {
  get: function() {
    return this._isBlurEnabled;
  },
  set: function(value) {
    if (typeof value === "boolean") this._isBlurEnabled = value;
  }
});
Object.defineProperty(WindowManager.prototype, "isMicaEnabled", {
  get: function() {
    return this._isMicaEnabled;
  },
  set: function(value) {
    if (typeof value !== "boolean") return;
    document.body.classList.toggle("mica", value);
    windowManager.forEachWindow(function(window2) {
      window2.mica = value;
    });
    this._isMicaEnabled = value;
  }
});
Object.defineProperty(WindowManager.prototype, "isWindowUpdatesEnabled", {
  get: function() {
    return this._isWindowUpdatesEnabled;
  },
  set: function(value) {
    if (value) window.addEventListener("resize", this.resizeHandler, false);
    else window.removeEventListener("resize", this.resizeHandler, false);
    this._isWindowUpdatesEnabled = value;
  }
});
WindowManager.prototype.saveState = function() {
  if (!this.loaded) return;
  if (window.top !== window.self) return;
  if (flags.verboseLags) console.log("Saving window state.");
  try {
    if (this.canSave && typeof localStorage !== "undefined")
      localStorage.setItem("windowState", JSON.stringify(this.state));
  } catch (exception) {
    handleStorageException(exception);
  }
};
WindowManager.prototype.loadState = function(dialog) {
  console.log("Loading window state.");
  if (!this.canSave) {
    console.log("Storage access is disabled for this session!");
    return;
  }
  try {
    if (!localStorage) return;
    var windowStates = this.windowStates;
    if (!windowStates) {
      this.loaded = true;
      return;
    }
    this.loaded = true;
    if (dialog && dialog.id) {
      dialog.loadState(windowStates[dialog.id]);
      this.updateTopZ(dialog.z);
    } else {
      var fails = [];
      for (var id in windowStates) try {
        var window2 = this.windows[id];
        if (window2 && windowStates[id])
          window2.loadState(windowStates[id]);
      } catch (ex) {
        fails.push(ex);
      }
      fails.forEach(function(fail) {
        console.error("Failed to load a window.", fail);
      });
      this.updateTopZ();
    }
  } catch (exception) {
    handleStorageException(exception);
  }
};
WindowManager.prototype.forEachWindow = function(callback) {
  for (var id in this.windows)
    if (this.windows.hasOwnProperty(id)) callback(this.windows[id], id);
};
WindowManager.prototype.killAll = function() {
  this.forEachWindow(function(dialog) {
    dialog.kill();
  });
};
WindowManager.prototype.synchronizeStates = function() {
  this.forEachWindow(function(dialoge) {
    dialoge.reportState();
  });
};
WindowManager.prototype.loadApp = function(app) {
  try {
    this._windows[app.id] = new Dialog(app);
    this._windows[app.id].mica = this.isMicaEnabled || false;
  } catch (ex) {
    console.warn("Appleload failed", ex);
  }
};
WindowManager.prototype.installApp = function(url, title, id, iconUrl) {
  var application = {
    src: url,
    id: id || "custom." + getDomain(url),
    title: title || getSiteName(url)
  };
  if (iconUrl) application.iconUrl = iconUrl;
  this.loadApp(application);
  this.saveInstalledApp(application);
};
Object.defineProperty(WindowManager.prototype, "installedApps", {
  get: function() {
    if (typeof localStorage === "undefined") return [];
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
WindowManager.prototype.saveInstalledApp = function(application) {
  if (!this.canSave || typeof localStorage === "undefined") return;
  try {
    var apps = this.installedApps;
    for (var i = 0; i < apps.length; i++)
      if (apps[i].id === application.id) return;
    apps.push(application);
    localStorage.setItem("installedApps", JSON.stringify(apps));
  } catch (exception) {
    handleStorageException(exception);
  }
};
WindowManager.prototype.loadInstalledApps = function() {
  if (!this.canSave || typeof localStorage === "undefined") return;
  try {
    this.installedApps.forEach(function(application) {
      if (application && application.src) this.loadApp(application);
    }, this);
  } catch (exception) {
    handleStorageException(exception);
  }
};
WindowManager.prototype.installAppProxied = function(url, proxyUrl) {
  if (!proxyUrl) proxyUrl = "https://browz.netlify.app/browz-set-cookie/";
  this.installApp(proxyUrl + url, getSiteName(url), "custom." + getDomain(url), getFaviconUrl(url));
};
WindowManager.prototype.toggleDragging = function(enabled) {
  ClickOffset.toggleDragEventHandler(enabled, this.windowDragEvent, "grabbing");
  this.isDragging = enabled;
};
WindowManager.prototype.getVisualizerApps = function() {
  var apps = [];
  this.forEachWindow(function(dialog) {
    if (dialog.application && dialog.application.audioVisualizer) apps.push(dialog.application);
  });
  return apps;
};
WindowManager.prototype.injectApplications = function() {
  for (var i = 0; i < arguments.length; i++)
    arguments[i].forEach(windowManager.loadApp, windowManager);
  windowManager.loadState();
};
WindowManager.prototype.closeApp = function(appId) {
  windowManager.windows[appId].kill();
};
WindowManager.prototype.toggleMica = function(enabled) {
  this.isMicaEnabled = typeof enabled === "undefined" ? enabled : !this.isMicaEnabled;
};
WindowManager.windowBoundsInset = { top: 0, left: -100, right: -100, bottom: -100 };
WindowManager._windowBounds = { top: 0, left: 0, right: 0, bottom: 0 };
WindowManager.recalculateWindowBounds = function() {
  var inset = WindowManager.windowBoundsInset;
  WindowManager._windowBounds.top = inset.top !== null ? inset.top : -Infinity;
  WindowManager._windowBounds.left = inset.left !== null ? inset.left : -Infinity;
  WindowManager._windowBounds.right = inset.right !== null ? window.innerWidth - inset.right : Infinity;
  WindowManager._windowBounds.bottom = inset.bottom !== null ? window.innerHeight - inset.bottom : Infinity;
};
window.addEventListener("resize", WindowManager.recalculateWindowBounds, false);
window.addEventListener("load", WindowManager.recalculateWindowBounds, false);
Object.defineProperty(WindowManager, "windowBounds", {
  get: function() {
    return WindowManager._windowBounds;
  }
});
WindowManager.getWindowBounds = function() {
  return WindowManager.windowBounds;
};
WindowManager.prototype.focusDialog = function(dialog) {
  if (this.focusedDialog !== null && this.focusedDialog.target)
    this.focusedDialog.target.removeAttribute("focus");
  if (dialog.target) dialog.target.setAttribute("focus", String(true));
  this.focusedDialog = dialog;
};
WindowManager.prototype.activeDialogToMetro = function() {
  if (this.activeDialog) this.activeDialog.exportDialogBodyToMetro();
};
WindowManager.prototype.ininializeDialogs = function() {
  var self2 = this;
  var stop = function() {
    self2.disableDialogDrag();
  };
  var event2 = supportsPointer ? "pointerup" : "mouseup";
  document.addEventListener(event2, stop, false);
  window.addEventListener(event2, stop, false);
  this.dragAction.set(0);
  var dialogs = bodyCrawler.getAllDialogs();
  Array.from(dialogs).forEach(function(dialog) {
    if (isElement(dialog))
      self2.loadApp(dialog);
  });
  this.loadState();
};
WindowManager.prototype.windowActivationEvent = function(event2, dialog) {
  try {
    var node = event2 && (event2.target || event2.srcElement);
    var isInteractive = false;
    while (node && isElement(node) && node.nodeType === 1) {
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
      } catch (e) {
      }
      return dialog;
    }
  } catch (ex) {
  }
  cancelDomEvent(event2);
  this.activeDialog = dialog;
  this.enableDialogDrag();
  dialog.setClickOffset(event2.clientX, event2.clientY);
  dialog.activate();
  return dialog;
};
WindowManager.prototype.handleWindowDrag = function(newX, hewY) {
  var dialog = this.activeDialog;
  if (!dialog || !dialog.clickOffset) return;
  var difference = { x: newX - dialog.clickOffset.clickX, y: hewY - dialog.clickOffset.clickY };
  if (dialog.maximized) {
    if (!flags.aeroSnap) return;
    dialog.maximized = false;
    dialog.clickOffset.clickX /= window.innerWidth / dialog.width;
  }
  dialog.stopAnimating();
  this.dragAction.execute(dialog, dialog.clickOffset, difference);
  if (dialog.moveEvents && dialog.exchangeDialogMoveEvent) dialog.exchangeDialogMoveEvent(difference);
};
WindowManager.prototype.disableDialogDrag = function() {
  if (!this.isDragging) return;
  this.dragAction.set();
  this.toggleDragging(false);
  this.saveState();
  if (!this.activeDialog) return;
  if (flags.aeroSnap && this.activeDialog.y <= 0)
    this.activeDialog.maximize();
  if (!this.activeDialog.moveEvents) return;
  var func = this.activeDialog.exchangeDialogMouseUpEvent;
  if (func) func();
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
    if (dialog && dialog.z >= self2.topZ) self2.topZ = dialog.z + 1;
  });
};
function ClickOffset() {
  this.clickX = 0;
  this.clickY = 0;
  this.height = 0;
  this.width = 0;
  this.startY = 0;
  this.startX = 0;
  this.start = new Vector();
  this.last = 0;
  this.start = 0;
  this.position = new Vector();
  this.lastPosition = new Vector();
  this.difference = new Vector();
  this.dragHandler = null;
}
ClickOffset._overlay = document.createElement("div");
ClickOffset._overlay.className = "drag-overlay";
ClickOffset.disableOverlay = function(ev) {
  if (ev && ev.buttons) return;
  if (ClickOffset._overlay.remove) ClickOffset._overlay.remove();
  else if (ClickOffset._overlay.parentNode) ClickOffset._overlay.parentNode.removeChild(ClickOffset._overlay);
};
window.addEventListener("mousemove", ClickOffset.disableOverlay, false);
window.addEventListener("mouseup", ClickOffset.disableOverlay, false);
window.addEventListener("mouseout", ClickOffset.disableOverlay, false);
ClickOffset.dragStopTimer = 0;
ClickOffset.handleMouseDrag = function(ev) {
  ClickOffset.disableOverlay(ev);
  ClickOffset._overlay.style.display = "block";
  clearTimeout(ClickOffset.dragStopTimer);
  ClickOffset.dragStopTimer = setTimeout(function() {
  }, 50);
};
ClickOffset.prototype.reset = function() {
  var self2 = this;
  self2.start = Date.now();
  self2.last = self2.start;
  self2.position.x = 0;
  self2.position.y = 0;
  return this;
};
ClickOffset.prototype.update = function(x, y) {
  var self2 = this;
  self2.last = Date.now();
  self2.position.x = x;
  self2.position.y = y;
  var lastPosition = self2.position.clone();
  self2.difference = self2.lastPosition.clone().sub(self2.position);
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
  if (typeof width !== "number" || typeof height !== "number" || typeof startX !== "number" || typeof startY !== "number") return;
  this.width = width;
  this.height = height;
  this.startX = startX;
  this.startY = startY;
  return this;
};
ClickOffset.toggleDragEventHandler = function(enable, handler, cursor) {
  if (enable) document.addEventListener(supportsPointer ? "pointermove" : "mousemove", handler, false);
  else document.removeEventListener(supportsPointer ? "pointermove" : "mousemove", handler, false);
  if (flags.verboseLags) console.log(enable ? "Starting drag" : "Ending drag");
  if (!flags.useDragOverlay || !this._overlay) {
    windowManager.forEachWindow(function(dialog) {
      dialog.togglePointerEvents(!enable);
    });
    return;
  }
  if (cursor) this._overlay.style.cursor = cursor;
  else this._overlay.style.cursor = "";
  if (enable) document.body.appendChild(this._overlay);
  else this.disableOverlay();
};
ClickOffset.prototype.toggleDragEventHandler = function(enable, cursor) {
  if (this.dragHandler) ClickOffset.toggleDragEventHandler(enable, this.dragHandler, cursor);
};
function Dialog(object, create) {
  this._x = 0;
  this._y = 0;
  this._z = 0;
  this._width = 0;
  this._height = 0;
  this._isMinWidth = false;
  this._isMinHeight = false;
  this._popupWindow = null;
  this._src = null;
  this._previousX = 0;
  this._previousY = 0;
  this._minWidth = 200;
  this._minHeight = 200;
  this._maxWidth = 1e3;
  this._maxHeight = 1e3;
  this._minAspectRatio = 0;
  this._maxAspectRatio = Infinity;
  this._mica = useMica;
  this._useTransform = useTransform;
  this._useScale = useScale;
  this._skew = 0;
  this._scaleX = 0;
  this._scaleY = 0;
  this._rotation = 0;
  this._maximizing = false;
  this._stateOpen = false;
  this._bodyOffset = { width: 0, height: 0, x: 0, y: 0 };
  this._animationProps = { _fsTimeout: 0, _fsRaf: null, _fsToken: null, _fsTokenAtStart: null };
  if (!object) return;
  if (!create) create = false;
  this.target = null;
  var id = object.id;
  this.application = null;
  if (!isElement(object))
    this.application = object;
  if (!id) id = object.title;
  if (object.title) this._title = object.title;
  else {
    var titleElement = this.getTitleElement();
    if (titleElement) this._title = titleElement.innerText;
    if (!id) id = this.id || this.title || "";
  }
  this._id = id;
  this.buttons = [];
  this.originalBody = this.body;
  this.clickOffset = new ClickOffset();
  if (!this.scroll && this.body) this.body.style.overflow = "hidden";
  var applist2 = document.getElementById("applist");
  if (applist2) applist2.appendChild(this.createOpenButton());
  var metroapplist = document.getElementById("metroapplist");
  if (metroapplist) metroapplist.appendChild(this.createOpenButton());
  if (create || isElement(object)) this.initWithObject(object);
  this._popupPositionInterval = 0;
  this.dragging = false;
  this._appIcon = null;
}
Dialog.prototype.getElementByTagOrClassName = function(name, parent) {
  var target = parent || this.target;
  if (!target) return null;
  var elements2 = target.getElementsByTagName(name);
  if (!elements2 || !elements2.length) elements2 = target.getElementsByClassName(name);
  var element = elements2.length ? elements2[0] : null;
  if (isElement(element)) return element;
  return null;
};
Dialog.prototype.initWithObject = function(object) {
  if (!object) return;
  if (object instanceof Dialog) {
    if (object.target) return;
    else if (object.application) object = object.application;
  }
  if (!(object instanceof Dialog)) {
    if (isElement(object)) {
      if (!isDialog(object)) return console.warn("This is not a dialog element");
      this.target = object;
      if (this.target.parentElement && this.target.parentElement.nodeName === "TEMPLATE") return;
      this.close();
    } else {
      this.application = object;
      this.target = createDialog();
      if (object.classes && typeof object.classes === "object") {
        object.classes.forEach(function(clazz) {
          this.target && this.target.classList.add(clazz);
        }, this);
      }
      this.openUrl(object.src);
      this.setTitle(object.title);
      this.fixed = object.fixed;
      this.scroll = object.scroll;
      if (this.frame) {
        if (object.microphone || object.camera) this.frame.setAttribute("allow", "camera; microphone");
        this.frame.setAttribute("allow", "fullscreen");
      }
      this.moveEvents = object.moveEvents || false;
      this.setIcon(this.getMiniIconUrl(), function() {
        self2.setIcon(self2.getIconUrl());
      });
    }
  }
  this.setMinSize(180, 250);
  this.originalBody = this.body;
  if (!this.scroll && this.body) this.body.style.overflow = "hidden";
  this.toggleCloseButton(true);
  this.toggleFullButton(true);
  if (this.verifyEjectCapability()) this.toggleEjectButton(true);
  this.exchangeDialogMouseUpEvent = this.messageFrame.bind(this, "mouseUp", { difference: new Vector() });
  var self2 = this;
  this.exchangeDialogMoveEvent = function(difference) {
    if (difference && self2.clickOffset) this.messageFrame("windowMove", self2.clickOffset.update(difference.x, difference.y));
  };
  var activationHandler = function(ev) {
    if (ev.target instanceof HTMLElement && ev.target.classList.contains("touch") && (!("pointerType" in ev) || ev.pointerType !== "touch"))
      return false;
    windowManager.windowActivationEvent(ev, self2);
    return true;
  };
  var target = this.target;
  if (target) {
    var createSizers = true;
    var createTouchSizers = true;
    if (!supportsPointer) createTouchSizers = false;
    if (!this.fixed && createSizers) {
      var createSizer = function(id) {
        if (!target) return;
        var sizerId = "sizer-" + id;
        var sizer = this.getElementByTagOrClassName(sizerId);
        if (!sizer || !isElement(sizer)) sizer = document.createElement("div");
        sizer.draggable = false;
        sizer.id = id.toString();
        sizer.classList.add(sizerId);
        var pointerDown = function(ev) {
          if (!activationHandler(ev)) return;
          windowManager.dragAction.set(id);
          cancelDomEvent(ev);
        };
        if (supportsPointer) sizer.onpointerdown = pointerDown;
        else sizer.onmousedown = pointerDown;
        target.appendChild(sizer);
        if (createTouchSizers) {
          var touchSizerId = "touch-sizer-" + id;
          var touchSizer = this.getElementByTagOrClassName(touchSizerId);
          if (!touchSizer || !isElement(touchSizer)) touchSizer = document.createElement("div");
          touchSizer.draggable = false;
          touchSizer.id = "touch-" + id;
          touchSizer.classList.add(touchSizerId);
          touchSizer.classList.add("touch");
          if (supportsPointer) touchSizer.onpointerdown = pointerDown;
          target.appendChild(touchSizer);
        }
      };
      for (var i = 0; i < 8; i++) createSizer.call(this, i + 1);
    }
    target.addEventListener("dragstart", cancelDomEvent, false);
    target.addEventListener("selectstart", cancelDomEvent, false);
    var body = this.body;
    if (body)
      body.addEventListener("load", function() {
        try {
          self2.verifyEjectCapability();
        } catch (exception) {
          if (target) target.getElementsByTagName("button")[0].style.display = "none";
        }
      }, false);
    var header = this.titleBar;
    if (header)
      header.addEventListener("dblclick", this.toggleMaximized.bind(this, void 0), false);
    if (supportsPointer) target.addEventListener("pointerdown", activationHandler, false);
    else target.addEventListener("mousedown", activationHandler, false);
    target.getElementsByTagName("button")[windowButtons.eject].addEventListener("click", function() {
      self2.createPopout();
      self2.quit();
    }, false);
    var buttons = target.getElementsByTagName("button");
    buttons[windowButtons.close].addEventListener("click", this.close.bind(this), false);
    buttons[windowButtons.full].addEventListener("click", this.toggleMaximized.bind(this, void 0), false);
    this.toggleOpen(false);
  }
  if (this.id) windowManager.windows[this.id] = this;
  this.updateUseTransform(this.useTransform);
  this.updateScale(this.useScale);
  this.update();
  if (!isElement(object))
    if (object instanceof Dialog)
      this.move(object.x, object.y);
    else this.moveToCenter(window.innerWidth / 2, window.innerHeight / 2);
};
Object.defineProperty(Dialog.prototype, "isOpen", {
  get: function() {
    return Boolean(this.target && this.target.classList.contains("open"));
  },
  set: function(open) {
    this.toggleOpen(open);
  }
});
Object.defineProperty(Dialog.prototype, "frame", {
  get: function() {
    return this.target && this.target.getElementsByTagName("iframe")[0] || null;
  }
});
Dialog.prototype.reportState = function() {
  this.messageFrame("windowSize", {});
  this.messageFrame("theme", { className: document.body.className });
};
Dialog.prototype.toggleOpen = function(forceOpen, kill) {
  var target = this.target;
  if (!target) return;
  var self2 = this;
  this._stateOpen = forceOpen || false;
  this.toggleClassAnimated("open", forceOpen, function(a) {
    return a === "opacity";
  }, function(opened) {
    if ((kill || flags.windowReaper) && !opened) self2.kill();
    if (opened) self2.reportState();
  }, function(opening) {
    self2._stateOpen = opening;
    if (opening) self2.activate();
    if (flags.windowReaper && !opening) setTimeout(function() {
    }, 1e3);
  });
  windowManager.saveState();
  self2.reportState();
};
Dialog.prototype.getOrCreateFrame = function(create) {
  var frame = this.frame;
  if (frame || !create || !this.body) return frame;
  return this.body.appendChild(document.createElement("iframe"));
};
Object.defineProperty(Dialog.prototype, "src", {
  get: function() {
    return this._src || this.application && this.application.src;
  },
  set: function(url) {
    this.openUrl(url);
  }
});
Object.defineProperty(Dialog.prototype, "body", {
  get: function() {
    var content = this.content;
    if (!content) return null;
    return this.getElementByTagOrClassName("article", content);
  }
});
Object.defineProperty(Dialog.prototype, "titleBar", {
  get: function() {
    return this.getElementByTagOrClassName("header");
  }
});
Object.defineProperty(Dialog.prototype, "contentDocument", {
  get: function() {
    var frame = this.frame;
    return frame ? frame.contentDocument : null;
  }
});
Object.defineProperty(Dialog.prototype, "contentWindow", {
  get: function() {
    var frame = this.frame;
    return frame ? frame.contentWindow : null;
  }
});
Object.defineProperty(Dialog.prototype, "mica", {
  get: function() {
    return this._mica;
  },
  set: function(mica) {
    if (mica) this._mica = this.injectMica();
    else this._mica = this.removeMica();
    this.move();
  }
});
Object.defineProperty(Dialog.prototype, "x", {
  get: function() {
    return this._x * window.innerWidth;
  },
  set: function(x) {
    if (typeof x === "number") this.move(x, this.y);
  }
});
Object.defineProperty(Dialog.prototype, "y", {
  get: function() {
    return this._y * window.innerHeight;
  },
  set: function(y) {
    if (typeof y === "number") this.move(this.x, y);
  }
});
Object.defineProperty(Dialog.prototype, "z", {
  get: function() {
    return this._z;
  },
  set: function(z) {
    if (typeof z === "number") this.setZ(z);
  }
});
Object.defineProperty(Dialog.prototype, "width", {
  get: function() {
    return this._width;
  },
  set: function(width) {
    this.setWidth(width);
  }
});
Object.defineProperty(Dialog.prototype, "height", {
  get: function() {
    return this._height;
  },
  /** @param {number} height */
  set: function(height) {
    this.setHeight(height);
  }
});
Object.defineProperty(Dialog.prototype, "minWidth", {
  get: function() {
    return this._minWidth;
  },
  set: function(width) {
    this.setMinSize(width);
  }
});
Object.defineProperty(Dialog.prototype, "minHeight", {
  get: function() {
    return this._minHeight;
  },
  set: function(height) {
    this.setMinSize(this.minWidth, height);
  }
});
Object.defineProperty(Dialog.prototype, "maxWidth", {
  get: function() {
    return this._maxWidth;
  },
  set: function(width) {
    this.setMaxSize(width);
  }
});
Object.defineProperty(Dialog.prototype, "maxHeight", {
  get: function() {
    return this._maxHeight;
  },
  set: function(height) {
    this.setMaxSize(this.maxWidth, height);
  }
});
Object.defineProperty(Dialog.prototype, "position", {
  get: function() {
    return new Vector(this.x, this.y);
  },
  set: function(position) {
    if (position instanceof Vector)
      this.move(position.x, position.y);
  }
});
Object.defineProperty(Dialog.prototype, "size", {
  get: function() {
    return new Vector(this.width, this.height);
  },
  set: function(size) {
    if (typeof size.x !== "number" || typeof size.y !== "number") return;
    this.resize(size.x, size.y);
  }
});
Object.defineProperty(Dialog.prototype, "aspectRatio", {
  get: function() {
    return this.width / this.height;
  },
  set: function(aspect) {
    this.width = this.height * aspect;
  }
});
Object.defineProperty(Dialog.prototype, "minAspectRatio", {
  get: function() {
    return this._minAspectRatio;
  },
  set: function(aspect) {
    this.width = this.height * aspect;
  }
});
Object.defineProperty(Dialog.prototype, "maxAspectRatio", {
  get: function() {
    return this._maxAspectRatio;
  },
  set: function(aspect) {
    this.width = this.height * aspect;
  }
});
Object.defineProperty(Dialog.prototype, "top", {
  get: function() {
    return this.y;
  },
  set: function(top) {
    var bounds = WindowManager.getWindowBounds();
    var bottom = this.bottomFromTop;
    if (bounds.bottom !== Infinity && bottom >= bounds.bottom - 0.5) bottom = bounds.bottom;
    if (top < bounds.top) top = bounds.top;
    var height = Math.max(Math.min(bottom - top, this.maxHeight), this.minHeight);
    top = bottom - height;
    this._height = height;
    this._y = top / window.innerHeight;
    if (this.useTransform) {
      if (this.target) this.target.style.height = toPixels(height);
      if (this.useTransform) this.updateTranslation();
    } else {
      this.setInset(top, this.left, this.right, window.innerHeight - bottom);
    }
    this._isMinHeight = height === this.minHeight;
  }
});
Object.defineProperty(Dialog.prototype, "left", {
  get: function() {
    return this.x;
  },
  set: function(left) {
    var bounds = WindowManager.getWindowBounds();
    var right = this.rightFromLeft;
    if (bounds.right !== Infinity && right >= bounds.right - 0.5) right = bounds.right;
    if (left < bounds.left) left = bounds.left;
    var width = Math.max(Math.min(right - left, this.maxWidth), this.minWidth);
    left = right - width;
    this._width = width;
    this._x = left / window.innerWidth;
    if (this.useTransform) {
      if (this.target) this.target.style.width = toPixels(width);
      if (this.useTransform) this.updateTranslation();
    } else {
      this.setInset(this.top, left, window.innerWidth - right, this.bottom);
    }
    this._isMinWidth = width === this.minWidth;
  }
});
Object.defineProperty(Dialog.prototype, "rightFromLeft", {
  get: function() {
    return this.x + this.width;
  },
  set: function(right) {
    this.width = right - this.x;
  }
});
Object.defineProperty(Dialog.prototype, "right", {
  get: function() {
    return window.innerWidth - this.rightFromLeft;
  },
  set: function(right) {
    if (typeof right === "number") {
      var bounds = WindowManager.getWindowBounds();
      if (right > bounds.right) right = bounds.right;
      if (right < bounds.left) right = bounds.left;
      this.width = window.innerWidth - right - this.x;
    }
  }
});
Object.defineProperty(Dialog.prototype, "bottomFromTop", {
  get: function() {
    return this.y + this.height;
  },
  set: function(bottom) {
    this.height = bottom - this.y;
  }
});
Object.defineProperty(Dialog.prototype, "bottom", {
  get: function() {
    return window.innerHeight - this.bottomFromTop;
  },
  set: function(bottom) {
    if (typeof bottom === "number") {
      var bounds = WindowManager.getWindowBounds();
      if (bottom > bounds.bottom) bottom = bounds.bottom;
      if (bottom < bounds.top) bottom = bounds.top;
      this.height = window.innerHeight - bottom - this.y;
    }
  }
});
Object.defineProperty(Dialog.prototype, "inset", {
  get: function() {
    return (this.bottom + this.right + this.left + this.top) / 4;
  },
  set: function(inset) {
    this.bottom = this.right = this.left = this.top = inset;
  }
});
Object.defineProperty(Dialog.prototype, "isMinWidth", {
  get: function() {
    return this._isMinWidth;
  }
});
Object.defineProperty(Dialog.prototype, "isMinHeight", {
  get: function() {
    return this._isMinHeight;
  }
});
Object.defineProperty(Dialog.prototype, "useTransform", {
  get: function() {
    return this._useTransform;
  },
  set: function(useTransform2) {
    this.updateUseTransform(useTransform2);
  }
});
Object.defineProperty(Dialog.prototype, "useScale", {
  get: function() {
    return this._useScale;
  },
  set: function(useScale2) {
    this.updateScale(useScale2);
  }
});
Object.defineProperty(Dialog.prototype, "title", {
  get: function() {
    if (this._title) return this._title;
    var titleElement = this.getTitleElement();
    if (titleElement && titleElement.innerHTML) return titleElement.innerHTML;
    return this.id;
  },
  set: function(title) {
    this._title = title;
    var titleElement = this.getTitleElement();
    if (titleElement) titleElement.innerHTML = title;
  }
});
Object.defineProperty(Dialog.prototype, "maximized", {
  get: function() {
    if (!this.target) return false;
    return this.target.classList.contains("maximized");
  },
  set: function(maximized) {
    this.toggleMaximized(maximized);
  }
});
Dialog.prototype.setTitle = function(title) {
  this.title = title;
};
Object.defineProperty(Dialog.prototype, "id", {
  get: function() {
    return this._id || this.target && this.target.getAttribute("id");
  },
  set: function(id) {
    this._id = id;
    windowManager.windows[id] = this;
    if (this.target) this.target.setAttribute("id", id);
  }
});
Object.defineProperty(Dialog.prototype, "content", {
  get: function() {
    if (!this.target) return null;
    return this.getElementByTagOrClassName("content");
  }
});
Object.defineProperty(Dialog.prototype, "closeable", {
  get: function() {
    return this.application !== null;
  }
});
Object.defineProperty(Dialog.prototype, "borderSize", {
  set: function(value) {
    if (!this.content) return;
    this.content.style.padding = toPixels(value);
    this.content.style.border = toPixels(value);
    this.content.style.borderRadius = toPixels(value);
  },
  get: function() {
    return this.content && fromPixels(this.content.style.padding);
  }
});
Object.defineProperty(Dialog.prototype, "popup", {
  get: function() {
    return this._popupWindow;
  }
});
Object.defineProperty(Dialog.prototype, "micaElement", {
  get: function() {
    try {
      if (!this.target) return null;
      var clipElem = this.target.getElementsByClassName("backdrop-filter");
      if (!clipElem.length) return null;
      var clip = clipElem[0];
      if (isElement(clip)) return clip;
    } catch (ex) {
      if (ex instanceof Error) console.log(ex.message);
    }
    return null;
  }
});
Object.defineProperty(Dialog.prototype, "micaBackdrop", {
  get: function() {
    try {
      var micaElement = this.micaElement;
      if (!micaElement) return null;
      var backdrop = micaElement.children[0];
      if (isElement(backdrop)) return backdrop;
    } catch (ex) {
      if (ex instanceof Error) console.log(ex.message);
    }
    return null;
  }
});
Object.defineProperty(Dialog.prototype, "skew", {
  set: function(skew) {
    this.setSkew(skew);
  }
});
Object.defineProperty(Dialog.prototype, "scaleY", {
  set: function(scaleY) {
    this.setScaleY(scaleY);
  }
});
Object.defineProperty(Dialog.prototype, "rotation", {
  set: function(rotation) {
    this.setRotation(rotation);
  }
});
Object.defineProperty(Dialog.prototype, "opacity", {
  set: function(opacity) {
    this.target && (this.target.style.opacity = String(opacity));
  },
  get: function() {
    return this.target && this.target.style.opacity !== "" ? Number(this.target.style.opacity) : 1;
  }
});
Object.defineProperty(Dialog.prototype, "icon", {
  get: function() {
    return this._appIcon;
  }
});
Object.defineProperty(Dialog.prototype, "iconUrl", {
  get: function() {
    return this.getIconUrl();
  }
});
Dialog.prototype.getIconUrl = function() {
  if (!this.application) return null;
  if (this.application.iconUrl) {
    return this.application.iconUrl;
  } else {
    return getFaviconUrl(this.application.src);
  }
};
Dialog.prototype.getMiniIconUrl = function() {
  if (!this.application) return null;
  return getFaviconUrl(this.application.src);
};
Dialog.prototype.setIcon = function(iconUrl, onError) {
  if (!this.target) return;
  if (!iconUrl) {
    if (onError) onError();
    return;
  }
  var headers = this.target.getElementsByTagName("header");
  if (!headers.length) return;
  this._appIcon = headers[0].getElementsByTagName("img")[0];
  var self2 = this;
  this._appIcon.onload = function() {
    console.log("App icon loaded!!");
    if (self2._appIcon) self2._appIcon.className = "loaded";
  };
  this._appIcon.onerror = function(e) {
    console.warn("App icon error!", e);
    if (self2._appIcon) self2._appIcon.className = "";
    if (onError) onError();
  };
  this._appIcon.src = iconUrl;
};
Dialog.prototype.setSkew = function(skew) {
  this._skew = skew;
  if (this.useTransform)
    this.updateTranslation();
  else if (this.target) skewElement(this.target, skew);
};
Dialog.prototype.setScale = function(scaleX, scaleY, update) {
  this._scaleX = scaleX;
  this._scaleY = scaleY;
  if (update !== false) this.updateTranslation();
};
Dialog.prototype.setScaleX = function(scaleX) {
  this._scaleX = scaleX;
  this.updateTranslation();
};
Dialog.prototype.setScaleY = function(scaleY) {
  this._scaleY = scaleY;
  this.updateTranslation();
};
Dialog.prototype.setRotation = function(rotation) {
  this._rotation = rotation;
  this.updateTranslation();
};
Dialog.prototype.focus = function() {
  windowManager.focusDialog(this);
};
Dialog.prototype.activate = function() {
  this.focus();
  this.setZ();
  this.messageFrame("open");
  this.activeDialog = this;
  return swapMetroBody();
};
Dialog.prototype.getTitleElement = function() {
  return this.getElementByTagOrClassName("h1");
};
Dialog.prototype.toggleTitleBar = function(force) {
  return this.titleBar && !this.titleBar.classList.toggle("hidden", typeof force !== "undefined" ? !force : void 0);
};
Dialog.prototype.open = function() {
  return this.toggleOpen(true);
};
Dialog.prototype.close = function() {
  return this.toggleOpen(false);
};
Dialog.prototype.getInnerRect = function() {
  if (!this.target) return;
  return {
    top: this.target.offsetTop,
    left: this.target.offsetLeft,
    right: this.target.offsetLeft + this.target.offsetWidth,
    bottom: this.target.offsetTop + this.target.offsetHeight,
    width: this.target.offsetWidth,
    height: this.target.offsetHeight
  };
};
Dialog.prototype.getRect = function(index) {
  return getRect(this.target, index);
};
Dialog.prototype.getBodyRect = function(index) {
  return getRect(this.body, index);
};
Dialog.prototype.getButton = function(index) {
  return this.titleBar && this.titleBar.getElementsByTagName("button")[index];
};
Dialog.prototype.createOpenButton = function() {
  var openButton = document.createElement("button");
  this.buttons.unshift(openButton);
  openButton.appendChild(document.createTextNode(this.title || "?"));
  openButton.onclick = this.launch.bind(this);
  return openButton;
};
Dialog.prototype.setClickOffset = function(x, y) {
  var rect = this.getRect();
  if (!this.clickOffset || !rect) return;
  return this.clickOffset.init(x, y, window.width || rect.width, window.height || rect.height, this.x, this.y);
};
Dialog.prototype.verifyEjectCapability = function() {
  return Boolean(this.href);
};
Object.defineProperty(Dialog.prototype, "href", { get: function() {
  if (!this.application) return null;
  return this.application.src;
} });
Dialog.prototype.togglePointerEvents = function(enable) {
  var target = this.target;
  if (!target) return;
  if (enable === null) enable = target.style.pointerEvents === "none";
  if (enable) while (target.classList.contains("dragging")) target.className = target.className.replace("dragging", "");
  else if (!target.classList.contains("dragging")) target.className = target.className + " dragging";
  this.dragging = !enable;
  var events = enable ? "auto" : "none";
  target.style.pointerEvents = events;
  if (this.originalBody) this.originalBody.style.pointerEvents = events;
  var frame = this.frame;
  if (frame) frame.style.pointerEvents = events;
  return events;
};
Dialog.prototype.toggleButton = function(buttonId, enable) {
  var button = this.getButton(buttonId);
  return button && button.toggleAttribute("disabled", !enable);
};
Dialog.prototype.stopAnimating = function() {
  if (!this.target) return;
  this.target.classList.remove("animating");
};
Dialog.prototype.toggleClassAnimatedOld = function(className, force, animationEndTrigger, onEnd, onToggled) {
  this.toggleClassAnimated(className, force, function(propertyName) {
    return propertyName === animationEndTrigger;
  }, onEnd, onToggled);
};
Dialog.prototype.animate = function(onToggled, onTransitionEnd, onEnd) {
  var target = this.target;
  if (!target) return;
  var dialog = this;
  if (supportsTransitions) {
    target.classList.add("animating");
    var animationHandler = function(event2) {
      if (onTransitionEnd && !onTransitionEnd(event2.propertyName) || !target) return;
      dialog.stopAnimating();
      console.log("Aborting animation over " + event2.propertyName + ". Took: ", event2.elapsedTime, "seconds. Reported by: ", event2.target);
      target.removeEventListener(transitionEndEvent, animationHandler, false);
      if (onEnd) onEnd.call(dialog);
    };
    target.addEventListener(transitionEndEvent, animationHandler, false);
  }
  window.requestAnimationFrame(function() {
    if (onToggled) onToggled.call(dialog);
  });
};
Dialog.prototype.toggleClassAnimated = function(className, force, onTransitionEnd, onEnd, onToggled) {
  var self2 = this;
  var enabled = false;
  this.animate(function() {
    if (self2.target && onToggled) onToggled.call(self2, enabled = setClass(self2.target, className, force));
  }, onTransitionEnd, function() {
    if (onEnd) onEnd.call(self2, enabled);
  });
};
Dialog.prototype.toggleMinSizeConstraints = function(isMaximized) {
  if (!this.target) return;
};
Dialog.prototype.toggleMaximized = function(enable) {
  if (this.maximized === enable) return;
  if (!this.target) return;
  var self2 = this;
  var content = this.content;
  this.setZ();
  maximizeAnimations++;
  if (flags.useViewTransitionMaximize) {
    if (document.activeViewTransition) {
      document.activeViewTransition.skipTransition();
    }
    this.target.style.viewTransitionName = "window-fullscreen";
    if (document.startViewTransition) {
      var transition = document.startViewTransition(function() {
        if (!self2.target) return;
        self2.target.classList.toggle("maximized", enable);
      });
      if (!self2.target) return;
      transition.ready.catch(function(ev) {
        console.warn("transition interrupted:", ev);
      });
      transition.finished.finally(function() {
        if (!self2.target) return;
        if (maximizeAnimations <= 1) {
          self2.target.style.viewTransitionName = "";
        }
        maximizeAnimations--;
      });
    } else this.target.classList.toggle("maximized", enable);
    return;
  }
  if (supportsTransitions) !flags.compositorResize ? this.toggleClassAnimated("maximized", enable, function(name) {
    return name === "transform" || name === "width";
  }, void 0, function(isMaximized) {
    if (this.useTransform && this.target) this.toggleMinSizeConstraints(isMaximized);
    maximizeAnimations--;
  }) : this.toggleClassAnimated("scaled-max", enable, function(name) {
    return name === "transform";
  }, function onEnd(enabled) {
    if (self2._animationProps._fsTimeout) clearTimeout(self2._animationProps._fsTimeout);
    var target2 = this.target;
    if (!target2) return;
    target2.classList.toggle("maximized", enabled);
    this.setScale(1, 1);
    if (!content) return;
    translateElement(content, 0, 0, 0, 1, 1);
    content.style.width = "";
    content.style.height = "";
    maximizeAnimations--;
  }, function onToggled(enabled) {
    var timeOffsetMs = 50;
    var totalDuration = 280;
    var invertDurationOnShrink = false;
    var target2 = this.target;
    if (!target2) return;
    this._maximizing = enabled;
    var startWidth = this.width;
    var startHeight = this.height;
    var windowSection = document.getElementById("window-section");
    var height = windowSection ? windowSection.clientHeight : window.innerHeight;
    var scaleX = window.innerWidth / startWidth;
    var scaleY = height / startHeight;
    target2.style.transformOrigin = "top left";
    target2.style.pointerEvents = "none";
    if (!enabled) {
      if (invertDurationOnShrink) timeOffsetMs = totalDuration - timeOffsetMs;
      scaleX = 1 / scaleX;
      scaleY = 1 / scaleY;
    }
    this.setScale(scaleX, scaleY);
    var targetWidth = enabled ? window.innerWidth : self2.width;
    var targetHeight = enabled ? height : self2.height;
    self2._animationProps._fsTimeout = setTimeout(function() {
      requestAnimationFrame(function() {
        if (!content) return;
        content.style.width = toPixels(targetWidth);
        content.style.height = toPixels(targetHeight);
        void content.offsetWidth;
        translateElement(content, 0, 0, 0, 1 / scaleX, 1 / scaleY);
      });
    }, timeOffsetMs);
  });
  else {
    var startPos = self2.position;
    var startSize = self2.size;
    var target = self2.target;
    if (!target) return;
    enable = !target.classList.contains("maximized");
    var toggleMaximized = function() {
      self2.x = startPos.x;
      self2.y = startPos.y;
      self2.width = startSize.x;
      self2.height = startSize.y;
      if (self2.target) self2.target.classList.toggle("maximized", enable);
    };
    if (!enable) toggleMaximized();
    Anim.animate(300, function(t) {
      var ease = Anim.easeSharpCenterStrong;
      if (enable) {
        self2.x = Anim.lerp(startPos.x, 0, ease(t));
        self2.y = Anim.lerp(startPos.y, 0, ease(t));
        self2.width = Anim.lerp(startSize.x, window.innerWidth, ease(t));
        self2.height = Anim.lerp(startSize.y, window.innerHeight, ease(t));
      } else {
        self2.x = Anim.lerp(0, startPos.x, ease(t));
        self2.y = Anim.lerp(0, startPos.y, ease(t));
        self2.width = Anim.lerp(window.innerWidth, startSize.x, ease(t));
        self2.height = Anim.lerp(window.innerHeight, startSize.y, ease(t));
      }
    }, function() {
      if (enable) toggleMaximized();
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
  var frame = this.frame;
  if (frame) LVMessenger.broadcastToChild(type, message, frame);
};
Dialog.prototype.updateTranslation = function() {
  if (this.useTransform && this.target) translateElement(this.target, this._maximizing ? 0 : this.x, this._maximizing ? 0 : this.y, this._skew, this._scaleX, this._scaleY, this._rotation);
};
Dialog.prototype.updatePosition = function() {
  if (!this.target) return;
  if (this.useTransform) this.updateTranslation();
  else this.setInset(this.top, this.left, this.right, this.bottom);
  if (flags.useSkewAnimations) {
    var deltaX = this.x - this._previousX, deltaY = this.y - this._previousY;
    var intensity = 1;
    this.skew = -deltaX * intensity / 3;
    this.scaleY = 1 - deltaY * intensity / 100;
  }
  if (!flags.useMica) return;
  var micaElement = this.micaElement;
  if (micaElement) try {
    var backdrop = micaElement.firstChild;
    var wallpaperP = document.getElementById("wallpaper");
    if (!wallpaperP) return;
    var wallpaperImage = wallpaperP.children[0];
    if (!isElement(backdrop) || !wallpaperImage) return;
    translateElement(backdrop, -this.x, -this.y);
    var wallpaperWidth = wallpaperImage instanceof HTMLImageElement && wallpaperImage.clientWidth ? wallpaperImage.clientWidth : wallpaperP.clientWidth;
    var wallpaperHeight = wallpaperImage instanceof HTMLImageElement && wallpaperImage.clientHeight ? wallpaperImage.clientHeight : wallpaperP.clientHeight;
    backdrop.style.width = toPixels(wallpaperWidth);
    backdrop.style.height = toPixels(wallpaperHeight);
  } catch (_) {
  }
};
Dialog.prototype.move = function(x, y, update, animate) {
  if (flags.useSkewAnimations) {
    this._previousX = this.x;
    this._previousY = this.y;
  }
  if (typeof x === "undefined" || x === null) x = this.x;
  if (typeof y === "undefined" || y === null) y = this.y;
  var bounds = WindowManager.getWindowBounds();
  if (x < bounds.left) x = bounds.left;
  if (bounds.right !== Infinity && x > bounds.right - this.width) x = bounds.right - this.width;
  if (y < bounds.top) y = bounds.top;
  if (bounds.bottom !== Infinity && y > bounds.bottom - this.height) y = bounds.bottom - this.height;
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  this._x = x / windowWidth;
  this._y = y / windowHeight;
  if (update !== false) {
    if (animate) this.animate(this.updatePosition);
    else this.updatePosition();
  }
};
Dialog.prototype.moveBy = function(deltaX, deltaY) {
  this.move(this.x + deltaX, this.y + deltaY);
};
Dialog.prototype.moveToCenter = function(centerX, centerY) {
  if (typeof centerX !== "number" || typeof centerY !== "number") return;
  this.move(centerX - this.width / 2, centerY - this.height / 2);
};
Dialog.prototype.setZ = function(z) {
  if (typeof z === "undefined") {
    if (this._z !== windowManager.topZ) this._z = ++windowManager.topZ;
  } else this._z = z;
  if (isElement(this.target))
    this.target.style.zIndex = String(this._z);
};
Dialog.prototype.updateWidth = function() {
  if (!this.target) return;
  if (this.useTransform) this.target.style.width = toPixels(this._width);
  else this.target.style.right = toPixels(this.right);
};
Dialog.prototype.updateHeight = function() {
  if (!this.target) return;
  if (this.useTransform) this.target.style.height = toPixels(this._height);
  else this.target.style.bottom = toPixels(this.bottom);
};
Dialog.prototype.setWidth = function(width, update, animate) {
  if (typeof width !== "number") return;
  var bounds = WindowManager.getWindowBounds();
  if (bounds.right !== Infinity) {
    var overflow = this.x + width - bounds.right;
    if (overflow > 0) {
      var newX = this.x - overflow;
      if (bounds.left !== void 0 && newX < bounds.left) newX = bounds.left;
      this.move(newX);
    }
  }
  if (bounds.right !== Infinity) width = Math.min(width, bounds.right - this.x);
  this._width = Math.max(Math.min(width, this.maxWidth), this.minWidth);
  this._isMinWidth = this._width === this.minWidth;
  if (update !== false) {
    if (animate) this.animate(this.updateWidth);
    else this.updateWidth();
  }
};
Dialog.prototype.setHeight = function(height, update, animate) {
  if (typeof height !== "number" || !this.target) return;
  var bounds = WindowManager.getWindowBounds();
  if (bounds.bottom !== Infinity) {
    var overflow = this.y + height - bounds.bottom;
    if (overflow > 0) {
      var newY = this.y - overflow;
      if (bounds.top !== void 0 && newY < bounds.top) newY = bounds.top;
      this.move(this.x, newY);
    }
  }
  var finalHeight = height;
  if (bounds.bottom !== Infinity) finalHeight = Math.min(finalHeight, bounds.bottom - this.y);
  this._height = Math.max(Math.min(finalHeight, this.maxHeight), this.minHeight);
  this._isMinHeight = this._height === this.minHeight;
  if (update !== false) {
    if (animate) this.animate(this.updateHeight);
    else this.updateHeight();
  }
};
Dialog.prototype.resize = function(width, height) {
  if (typeof width === "undefined" || width === null) width = this.width;
  if (typeof height === "undefined" || height === null) height = this.height;
  this.setWidth(width);
  this.setHeight(height);
};
Dialog.prototype.update = function() {
  this.move();
  this.resize();
};
Dialog.prototype.setMinSize = function(width, height) {
  this._minWidth = typeof width === "number" ? width : 180;
  this._minHeight = typeof height === "number" ? height : 200;
  this.resize();
};
Dialog.prototype.setMaxSize = function(width, height) {
  this._maxWidth = typeof width === "number" ? width : 180;
  this._maxHeight = typeof height === "number" ? height : 200;
  this.resize();
};
Dialog.prototype.setMinAspectRatio = function(ratio) {
  this._minAspectRatio = ratio;
  this.resize();
};
Dialog.prototype.enforceAspectRatio = function(ratio, sideConstraint1, sideConstraint2) {
};
Dialog.prototype.resizeWithAspect = function(width, height) {
  var ratio = this.aspectRatio;
  var widthDelta = Math.abs(width - this.width);
  var heightDelta = Math.abs(height - this.height);
  if (widthDelta > heightDelta) {
    this.resize(width, width / ratio);
  } else {
    this.resize(height * ratio, height);
  }
};
Dialog.prototype.updateBodyOffset = function() {
  var bodyRect = this.getBodyRect();
  if (!bodyRect || bodyRect.width === 0 && bodyRect.height === 0 && bodyRect.x === 0 && bodyRect.y === 0) return;
  this._bodyOffset.width = this.width - bodyRect.width;
  this._bodyOffset.height = this.height - bodyRect.height;
  this._bodyOffset.x = this.x - bodyRect.x;
  this._bodyOffset.y = this.y - bodyRect.y;
};
Dialog.prototype.resizeBody = function(width, height) {
  this.updateBodyOffset();
  this.resize(width + this._bodyOffset.width, height + this._bodyOffset.height);
};
Dialog.prototype.moveBody = function(x, y) {
  this.updateBodyOffset();
  this.move(x + this._bodyOffset.x, y + this._bodyOffset.y);
};
Dialog.prototype.setInset = function(top, left, right, bottom) {
  if (!this.target) return;
  if (this.target.style.inset) this.target.style.inset = toPixels(top) + " " + toPixels(right) + " " + toPixels(bottom) + " " + toPixels(left);
  else {
    this.target.style.top = toPixels(top);
    this.target.style.left = toPixels(left);
    if (!this.useScale) {
      this.target.style.right = toPixels(right);
      this.target.style.bottom = toPixels(bottom);
    }
  }
};
Dialog.prototype.openUrl = function(url) {
  var frame = this.getOrCreateFrame(true);
  if (!frame) return;
  var self2 = this;
  frame.onload = function() {
    self2.reportState();
  };
  frame.src = url;
  this._src = url;
};
Dialog.prototype.quit = function() {
  this.close();
};
Dialog.prototype.launch = function() {
  if (!this.isOpen) this.initWithObject(this);
  if (this.mica) this.injectMica();
  this.open();
};
Dialog.prototype.relaunch = function() {
  this.quit();
  this.launch();
};
Dialog.prototype.kill = function() {
  var parent = this.target && this.target.parentElement;
  if (parent && this.closeable && this.target) parent.removeChild(this.target);
};
Dialog.prototype.eject = function() {
  this.createPopout();
  this.quit();
};
Dialog.prototype.createPopout = function() {
  var body = this.body;
  var titleBar = this.titleBar;
  if (!body || !this.href) return;
  var rect = body.getBoundingClientRect();
  var titleBarHeight = titleBar && titleBar.getBoundingClientRect().height || 0;
  var viewBoxPosition = getViewBoxPosition();
  var properties = {
    scrollbars: true,
    resizable: true,
    status: false,
    location: false,
    toolbar: false,
    menubar: false,
    width: rect.width,
    height: rect.height,
    left: rect.left + viewBoxPosition.left,
    top: rect.top + viewBoxPosition.top + titleBarHeight
  };
  this._popupWindow = window.open(this.href, this.title || "LVOS", stringifyDialogProperties(properties));
  if (!this._popupWindow) return;
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
    if (outerX !== prevRect.x || outerY !== prevRect.y) {
      var x = outerX - window.screenX, y = outerY - window.screenY - windowChromeHeight + chromeHeight;
      console.log("pos:", outerX, outerY);
      self2.moveBody(x, y);
      prevRect.x = outerX;
      prevRect.y = outerY;
    }
    if (width !== prevRect.width || height !== prevRect.height) {
      self2.resizeBody(width, height);
      console.log("size:", width, width);
      prevRect.width = width;
      prevRect.height = height;
    }
  }, 100);
};
Dialog.prototype.inspect = function() {
  if (window.inspect) window.inspect(this.target);
};
Dialog.prototype.updateUseTransform = function(useTransform2) {
  this._useTransform = useTransform2;
  var target = this.target;
  if (!target) return;
  if (useTransform2) {
    target.style.top = "";
    target.style.left = "";
    this.toggleMinSizeConstraints(this.maximized);
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
  if (!target) return;
  if (useScale2) {
    target.style.right = "";
    target.style.bottom = "";
  } else {
    if (this.useTransform) return console.warn("Cannot disable scale if using transform");
    target.style.right = toPixels(this.right);
    target.style.bottom = toPixels(this.bottom);
  }
  target.classList.toggle("use-scale", useScale2);
  this.update();
};
Dialog.prototype.injectMica = function() {
  try {
    if (!this.useTransform) console.warn("Dude you still gotta fix the mica here for oh right but can you possible even do that??");
    if (!this.target) return false;
    var wallpaper2 = document.getElementById("wallpaper");
    if (!wallpaper2) return false;
    var wallpaperSrc = wallpaper2.getAttribute("data-wallpaper-src") || "";
    var blurredSrc = wallpaper2.getAttribute("data-blurred-src") || "";
    var preBlurredImage = blurredSrc !== null;
    var clip = this.micaElement;
    if (!clip) return false;
    while (clip.firstChild) clip.removeChild(clip.firstChild);
    var micaWallpaper = null;
    if (isElement(wallpaper2.children[0])) {
      micaWallpaper = wallpaper2.children[0].cloneNode(true);
      if (!isElement(micaWallpaper)) return false;
      if (supportsObjectFit) {
        micaWallpaper.removeAttribute("style");
        micaWallpaper.className = "mica-backdrop";
        if (preBlurredImage && micaWallpaper instanceof HTMLIFrameElement && blurredSrc)
          micaWallpaper.src = blurredSrc;
      } else {
        micaWallpaper.className = "mica-backdrop legacy-wallpaper-image";
        micaWallpaper.style.backgroundImage = "url('" + (blurredSrc || wallpaperSrc).replace(/'/g, "\\'") + "')";
      }
    } else {
      micaWallpaper = document.createElement("img");
      micaWallpaper.className = "mica-backdrop legacy-wallpaper-image";
      micaWallpaper.style.backgroundImage = "url('" + (blurredSrc || wallpaperSrc).replace(/'/g, "\\'") + "')";
    }
    clip.appendChild(micaWallpaper);
    this.target.classList.add("mica");
    return true;
  } catch (ex) {
    console.warn(ex);
  }
  return false;
};
Dialog.prototype.removeMica = function() {
  if (!this.target) return false;
  this.target.classList.remove("mica");
  var clip = this.micaElement;
  if (!clip) return false;
  while (clip.firstChild) clip.firstChild.remove();
  return false;
};
Dialog.prototype.flip = function(enable) {
  this.toggleClassAnimated("flipped", enable);
};
Dialog.prototype.makeWallpaper = function() {
  if (this.id) appRegistry.setWallpaper(this.id);
};
Dialog.prototype.getState = function() {
  return {
    title: this.title || this.id || "Unc",
    x: this.x,
    y: this.y,
    z: this.z,
    width: this.width || this.minWidth,
    height: this.height || this.minHeight,
    open: this._stateOpen || this.isOpen || false,
    maximized: this.maximized
  };
};
Dialog.prototype.loadState = function(state) {
  if (state.open) this.launch();
  this.title = state.title;
  this.move(state.x, state.y);
  this.setZ(state.z);
  this.resize(state.width, state.height);
  console.log(state.title, "window loaded width: ", state.width, state.height);
  this.toggleMaximized(state.maximized);
};
Dialog.prototype.exportDialogBodyToMetro = function() {
};
function DragAction() {
  this.execute = function(_dialog, offset, difference) {
  };
  this.resizeFunctions = [
    function move(dialog, offset, d) {
      dialog.move(offset.startX + d.x, offset.startY + d.y);
    },
    function top(dialog, offset, d) {
      dialog.top = offset.startY + d.y;
    },
    function right(dialog, offset, d) {
      dialog.width = offset.width + d.x;
    },
    function bottom(dialog, offset, d) {
      dialog.height = offset.height + d.y;
    },
    function left(dialog, offset, d) {
      dialog.left = offset.startX + d.x;
    },
    function topLeft(dialog, offset, d) {
      dialog.top = offset.startY + d.y;
      dialog.left = offset.startX + d.x;
    },
    function topRight(dialog, offset, d) {
      dialog.width = offset.width + d.x;
      dialog.top = offset.startY + d.y;
    },
    function bottomRight(dialog, offset, d) {
      dialog.resize(offset.width + d.x, offset.height + d.y);
    },
    function bottomLeft(dialog, offset, d) {
      dialog.left = offset.startX + d.x;
      dialog.width = offset.width - d.x;
      dialog.height = offset.height + d.y;
    }
  ];
}
DragAction.prototype.set = function(direction) {
  this.execute = this.resizeFunctions[direction || 0] || function() {
  };
};
function DocumentCrawler(customDocument) {
  this.document = customDocument || document;
}
DocumentCrawler.prototype.getMetro = function() {
  return this.document.getElementById("metrobody");
};
DocumentCrawler.prototype.getMetroBody = function() {
  var metro = this.getMetro();
  return metro && metro.firstChild;
};
DocumentCrawler.prototype.getAllDialogs = function() {
  return this.document.getElementsByClassName("window");
};
DocumentCrawler.prototype.getDialogsContainer = function() {
  return this.document.getElementById("window-section");
};
DocumentCrawler.prototype.getOverlay = function() {
  return document.getElementById("overlay");
};
DocumentCrawler.prototype.getDesktop = function() {
  return document.getElementById("desktop");
};
window.addEventListener(supportsPointer ? "pointermove" : "mousemove", ClickOffset.handleMouseDrag, false);
window.addEventListener("unload", function() {
  windowManager.saveState();
}, false);
window.addEventListener("dragover", function(e) {
  cancelDomEvent(e);
}, false);
window.addEventListener("drop", function(e) {
  e.preventDefault();
  if (!e.dataTransfer) return;
  var files = e.dataTransfer.files;
  if (files.length > 0)
    console.log("File dropped anywhere in window:", files[0].name);
}, false);
var windowManager = new WindowManager();
window.windowManager = windowManager;
windowManager.isWindowUpdatesEnabled = true;
var bodyCrawler = new DocumentCrawler();
window.__LVMessengerReceive = messageReceived;
window.__LVMessenger = {};
"use strict";
function Reflector(element) {
  this.element = element;
  this.observer;
  this.clones = [];
}
Reflector.prototype.reflect = function(target) {
  try {
    var reflection = target.cloneNode(true);
    if (!isElement(reflection)) return null;
    var refElement = reflection;
    refElement.id += "reflection";
    this.clones.push(refElement);
    this.element.appendChild(refElement);
    this.observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === "attributes" && mutation.target instanceof HTMLElement) {
          var rect = target.getBoundingClientRect();
          refElement.style.top = toPixels(rect.top - dock.offsetTop + dock.offsetHeight * 0);
          refElement.style.left = toPixels(rect.left - dock.offsetLeft + dock.offsetWidth / 2);
          refElement.style.width = toPixels(rect.width);
          refElement.style.height = toPixels(rect.height);
          refElement.style.zIndex = mutation.target.style.zIndex;
        }
      });
    });
    this.observer.observe(target, { attributes: true });
    return refElement;
  } catch (ex) {
    console.warn(ex);
  }
  return null;
};
"use strict";
var supportsObjectFit = Boolean(document.documentElement && document.documentElement.style && typeof document.documentElement.style.objectFit != "undefined");
function changeTitlebarColor(newColor) {
  var metaTag = document.querySelector('meta[name="theme-color"]');
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "theme-color");
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute("content", newColor);
}
function vibrate() {
  navigator.vibrate(500);
}
function stopVibrations() {
  navigator.vibrate(0);
}
var eventPrevent = function(event2) {
  event2.preventDefault();
};
var onLoad = function() {
  var desktop = document.getElementById("desktop");
  if (desktop) desktop.addEventListener("mousedown", function() {
    DesktopManager.toggleCharms(false);
    if (launchpad) launchpad.close();
    contextMenu.close();
  }, false);
  var applist2 = document.getElementById("applist");
  if (applist2) {
    applist2.addEventListener("submit", eventPrevent, false);
  }
  var appButtons = document.getElementById("dockapplist");
  if (appButtons) {
    var startButton = document.createElement("button");
    startButton.innerHTML = "Start";
    startButton.id = "start-button";
    startButton.addEventListener("click", function() {
      if (launchpad) launchpad.open();
    }, false);
    appButtons.appendChild(startButton);
    var clock = document.createElement("time");
    clock.id = "clock";
    var updateClock = function() {
      clock.innerHTML = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    };
    updateClock();
    setInterval(updateClock, 1e3);
    appButtons.appendChild(clock);
  }
  document.body.ondragover = window.ondragover = function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = "copy";
  };
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./Scripts/sw.js")["then"](function(reg) {
    console.log("Service Worker registered!", reg);
  })["catch"](function(err) {
    console.warn("Registration of service worker failed:", err);
  });
  if (typeof ClickOffset === "undefined") return;
  var clickOffset = new ClickOffset();
  var tingeling = Array.from(document.getElementsByClassName("folder-content"))[0];
  if (tingeling instanceof HTMLElement) {
    var selector = document.createElement("div");
    clickOffset.dragHandler = function(ev) {
      clickOffset.update(ev.clientX - clickOffset.clickX, ev.clientY - clickOffset.clickY);
      var width = clickOffset.position.x, height = clickOffset.position.y;
      translateElement(selector, width < 0 ? ev.clientX : clickOffset.clickX, height < 0 ? ev.clientY : clickOffset.clickY);
      selector.style.width = toPixels(Math.abs(width));
      selector.style.height = toPixels(Math.abs(height));
    };
    tingeling.addEventListener(supportsPointer ? "pointerdown" : "mousedown", function(ev) {
      clickOffset.init(ev.clientX, ev.clientY);
      var width = clickOffset.position.x, height = clickOffset.position.y;
      translateElement(selector, width < 0 ? ev.clientX : clickOffset.clickX, height < 0 ? ev.clientY : clickOffset.clickY);
      selector.style.width = toPixels(Math.abs(width));
      selector.style.height = toPixels(Math.abs(height));
      selector.className = "selector";
      tingeling.appendChild(selector);
      clickOffset.toggleDragEventHandler(true);
    }, false);
    var stopIt = function() {
      clickOffset.toggleDragEventHandler(false);
      if (selector.parentNode) selector.parentNode.removeChild(selector);
    };
    window.addEventListener(supportsPointer ? "pointerup" : "mouseup", stopIt, false);
  }
  document.onselectstart = function() {
    return false;
  };
};
window.addEventListener("load", onLoad, false);
function ContextMenu() {
  this.element = document.getElementById("context-menu");
}
ContextMenu.prototype.toggleOpen = function(force) {
  if (!this.element) return;
  this.element.classList.toggle("open", force);
};
ContextMenu.prototype.open = function(x, y) {
  if (!this.element) return;
  this.element.style.left = toPixels(x);
  this.element.style.top = toPixels(y);
  this.element.classList.add("open");
};
ContextMenu.prototype.close = function() {
  if (!this.element) return;
  this.element.classList.remove("open");
};
ContextMenu.prototype.addItem = function(title, callback, icon) {
  if (!this.element) return;
};
var contextMenu = new ContextMenu();
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
  console.log("Open contex tp ples");
  contextMenu.open(e.clientX, e.clientY);
}, false);
var reflecitons = false;
var dock = document.getElementById("dock");
var reflectionr = document.getElementById("reflection");
var reflector = reflectionr ? new Reflector(reflectionr) : null;
var applistItems = document.getElementById("dockapplist");
function toggleReflections(force) {
  if (!reflector) return;
  if (force == null) reflecitons = !reflecitons;
  else reflecitons = Boolean(force);
  if (reflecitons) windowManager.forEachWindow(function(dialog) {
    if (dialog.target && reflector) reflector.reflect(dialog.target);
  });
  else if (typeof reflector.observer != "undefined") reflector.observer.disconnect();
}
window.addEventListener("keydown", function(event2) {
  switch (event2.key) {
    case "F11":
      event2.preventDefault();
      console.log("F11 captured! Custom action goes here.");
      void document.documentElement.requestFullscreen();
      break;
    case "F10":
      event2.preventDefault();
      var c = windowManager.windows["console"];
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
}
function setTheme(theme) {
  document.body.classList.add(theme);
  window.windowManager.synchronizeStates();
}
function hasTheme(theme) {
  return document.body.classList.contains(theme);
}
DesktopManager.removeTheme = function(theme) {
  document.body.classList.remove(theme);
};
DesktopManager.toggleCharms = function(force) {
  var charms = document.getElementById("charms");
  if (!charms) return;
  if (charms.classList.toggle.length) return charms.classList.toggle("open", force);
  if (force) charms.classList.add("open");
  else charms.classList.remove("open");
  return force === true;
};
DesktopManager.getWallpaper = function() {
  return document.getElementById("wallpaper");
};
DesktopManager.prototype.applyWallpaperImage = function(url, blurredUrl, onError) {
  this.wallpaperImage = document.createElement("img");
  this.wallpaperImage.onerror = function() {
    console.warn("Failed to load wallpaper image!");
    if (onError) onError();
  };
  var self2 = this;
  var loadHandler = function() {
    var wallpaper2 = DesktopManager.getWallpaper();
    if (!wallpaper2 || !self2.wallpaperImage) return;
    while (wallpaper2.firstChild) wallpaper2.removeChild(wallpaper2.firstChild);
    if (typeof blurredUrl == "string") wallpaper2.setAttribute("data-blurred-src", blurredUrl);
    else wallpaper2.removeAttribute("data-blurred-src");
    wallpaper2.classList.toggle("legacy-wallpaper", !supportsObjectFit);
    wallpaper2.style.backgroundImage = "";
    wallpaper2.appendChild(self2.wallpaperImage);
  };
  this.wallpaperImage.onload = loadHandler;
  if (supportsObjectFit) {
    this.wallpaperImage.src = url;
    this.wallpaperImage.className = "wallpaper-image";
  } else {
    this.wallpaperImage.className = "wallpaper-image legacy-wallpaper-image";
    this.wallpaperImage.removeAttribute("src");
    this.wallpaperImage.style.backgroundImage = "url('" + url.replace(/'/g, "\\'") + "')";
    loadHandler();
  }
  if (blurredUrl) this.wallpaperImage.setAttribute("blurred-src", blurredUrl);
};
window.desktopManager = new DesktopManager();
window.desktopManager.applyWallpaperImage(
  "file:///C:/Users/Lasse/Downloads/daniil-silantev-Rl7SZ19fgRQ-unsplash.jpg",
  "file:///C:/Users/Lasse/Downloads/fox-blur.jpg"
);
window.ondrag = document.ondrag = function(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  if (elements.desktop) elements.desktop.style.opacity = "0.5";
};
window.ondragleave = document.ondragleave = function(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  if (elements.desktop) elements.desktop.style.opacity = "";
};
var wallpaperDB = null;
function initWallpaperDB(onSuccess, onFailure) {
  var isFileScheme = window.location.protocol === "file:";
  if (isFileScheme) {
    console.log("File scheme detected (HTA/local file). Using localStorage only.");
    if (onFailure) onFailure(new Error("IndexedDB not available for file:// scheme"));
    return;
  }
  if (typeof indexedDB === "undefined") {
    if (onFailure) onFailure(new Error("IndexedDB not supported"));
    return;
  }
  if (wallpaperDB) {
    onSuccess(wallpaperDB);
    return;
  }
  var request = indexedDB.open("LVOSWallpaperDB", 1);
  request.onerror = function() {
    console.warn("IndexedDB failed to open:", request.error);
    if (onFailure) onFailure(request.error);
  };
  request.onsuccess = function() {
    wallpaperDB = request.result;
    console.log("IndexedDB opened successfully");
    onSuccess(wallpaperDB);
  };
  request.onupgradeneeded = function(event2) {
    if (!event2.target) return;
    var db = event2.target.result;
    if (!db.objectStoreNames.contains("wallpapers")) {
      db.createObjectStore("wallpapers", { keyPath: "id" });
    }
  };
}
function localStorageFabblack(dataUrl) {
  if (dataUrl) {
    if (typeof settings != "undefined" && settings.set) {
      try {
        settings.set("wallpaperImage", dataUrl);
        console.log("Wallpaper saved to localStorage via settings");
      } catch (ex) {
        console.warn("Failed to save to settings, trying direct localStorage:", ex.message);
        try {
          window.localStorage.setItem("wallpaperImage", dataUrl);
          console.log("Wallpaper saved to direct localStorage");
        } catch (ex2) {
          console.warn("Failed to save to direct localStorage:", ex2.message);
        }
      }
    } else {
      try {
        window.localStorage.setItem("wallpaperImage", dataUrl);
        console.log("Wallpaper saved to direct localStorage");
      } catch (ex) {
        console.warn("Failed to save wallpaper to localStorage:", ex.message);
      }
    }
  }
}
function saveWallpaperToCache(blob, dataUrl) {
  if (!(blob instanceof Blob)) {
    console.warn("Invalid blob provided to saveWallpaperToCache");
    return;
  }
  initWallpaperDB(function(db) {
    var transaction = db.transaction(["wallpapers"], "readwrite");
    var store = transaction.objectStore("wallpapers");
    var request = store.put({ id: "current", blob, timestamp: Date.now() });
    request.onsuccess = function() {
      console.log("Wallpaper saved to IndexedDB");
    };
    request.onerror = function() {
      console.warn("Failed to save wallpaper to IndexedDB, falling back to localStorage:", request.error);
      localStorageFabblack(dataUrl);
    };
  }, function() {
    localStorageFabblack(dataUrl);
  });
}
function loadWallpaperFromCache() {
  initWallpaperDB(function(db) {
    var transaction = db.transaction(["wallpapers"], "readonly");
    var store = transaction.objectStore("wallpapers");
    var request = store.get("current");
    request.onsuccess = function() {
      var result = request.result;
      if (result && result.blob && window.desktopManager) {
        var objectUrl = URL.createObjectURL(result.blob);
        console.log("Loading cached wallpaper from IndexedDB");
        window.desktopManager.applyWallpaperImage(objectUrl);
      } else {
        loadWallpaperFromLocalStorage();
      }
    };
    request.onerror = function() {
      loadWallpaperFromLocalStorage();
    };
  }, function() {
    loadWallpaperFromLocalStorage();
  });
}
function loadWallpaperFromLocalStorage() {
  console.log("Attempting to load wallpaper from localStorage...");
  console.log("settings defined:", typeof settings != "undefined");
  if (typeof settings == "undefined") {
    console.warn("Settings not available yet, trying direct localStorage access");
    try {
      var cachedWallpaper = window.localStorage.getItem("wallpaperImage");
      if (cachedWallpaper && window.desktopManager) {
        console.log("Loading cached wallpaper from direct localStorage");
        window.desktopManager.applyWallpaperImage(cachedWallpaper);
      } else {
        console.log("No cached wallpaper found in localStorage, or applyWallpaperImage not available");
      }
    } catch (ex) {
      console.warn("Failed to load wallpaper from direct localStorage:", ex.message);
    }
    return;
  }
  try {
    var cachedWallpaper = settings.get("wallpaperImage");
    console.log("Retrieved from settings.get():", cachedWallpaper ? "found" : "not found");
    if (cachedWallpaper && window.desktopManager) {
      console.log("Loading cached wallpaper from localStorage via settings");
      window.desktopManager.applyWallpaperImage(cachedWallpaper);
    } else {
      console.log("No cached wallpaper found in settings, or applyWallpaperImage not available");
    }
  } catch (ex) {
    console.warn("Failed to load wallpaper from settings localStorage:", ex.message);
    try {
      var cachedWallpaper = window.localStorage.getItem("wallpaperImage");
      if (cachedWallpaper && window.desktopManager) {
        console.log("Loading cached wallpaper from direct localStorage (fallback)");
        window.desktopManager.applyWallpaperImage(cachedWallpaper);
      }
    } catch (ex2) {
      console.warn("Direct localStorage fallback also failed:", ex2.message);
    }
  }
}
function handleWallpaperDrop(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  if (elements.desktop) elements.desktop.style.opacity = "";
  if (!ev.dataTransfer || !ev.dataTransfer.files) return;
  var files = ev.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (!file.type.match(/^image\//)) continue;
    var reader = new FileReader();
    reader.onload = function(e) {
      if (!e.target) return;
      var dataUrl = e.target.result;
      if (!(typeof dataUrl === "string")) return;
      try {
        if (window.desktopManager) {
          window.desktopManager.applyWallpaperImage(dataUrl, void 0, function() {
            console.warn("Failed to apply dropped wallpaper image");
          });
          saveWallpaperToCache(file, dataUrl);
        }
      } catch (ex) {
        console.error("Error applying wallpaper:", ex);
      }
    };
    reader.readAsDataURL(file);
    break;
  }
}
DesktopManager.toggleElementPip = function(el, callback) {
  if (!("documentPictureInPicture" in window) || !window.documentPictureInPicture) {
    console.warn("Document Picture-in-Picture not supported in this browser.");
    return null;
  }
  var existing = window.documentPictureInPicture.window;
  if (existing) {
    existing.close();
    return null;
  }
  var rect = el.getBoundingClientRect();
  var width = Math.round(rect.width) || 400;
  var height = Math.round(rect.height) || 300;
  window.documentPictureInPicture.requestWindow({ width, height }).then(function(pipWindow) {
    var originalParent = el.parentNode;
    var originalNextSibling = el.nextSibling;
    pipWindow.document.body.style.margin = "0";
    pipWindow.document.body.appendChild(el);
    pipWindow.addEventListener("pagehide", function() {
      if (!originalParent) return;
      if (originalNextSibling) originalParent.insertBefore(el, originalNextSibling);
      else originalParent.appendChild(el);
    }, { once: true });
    callback(pipWindow);
  });
};
window.ondrop = document.ondrop = handleWallpaperDrop;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadWallpaperFromCache, false);
} else {
  loadWallpaperFromCache();
}
window.addEventListener("keydown", function(event2) {
  if (event2.key === "Shift" || event2.keyCode === 16) {
    document.body.classList.add("slow-animations");
  }
}, false);
window.addEventListener("keyup", function(event2) {
  if (event2.key === "Shift" || event2.keyCode === 16) {
    document.body.classList.remove("slow-animations");
  }
}, false);
var wallpaper = DesktopManager.getWallpaper();
if (wallpaper) {
  wallpaper.ondragover = function(ev) {
    ev.preventDefault();
    console.log("okdi");
  };
  wallpaper.ondrop = function(ev) {
    ev.preventDefault();
  };
}
function loadMetro() {
  var metro = document.getElementById("metro");
  if (metro) {
    metro.style.display = "block";
    var metroFrame = document.createElement("iframe");
    metroFrame.src = "mobile.html";
    metro.appendChild(metroFrame);
  }
}
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
    elements.installAppUrl.form.addEventListener("submit", function(event2) {
      event2.preventDefault();
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
  if (!this.stdout) return;
  try {
    if (this.stdout.firstChild) this.stdout.removeChild(this.stdout.firstChild);
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
interceptor.bindage();
window.addEventListener("load", function() {
  if (bindConsole) interceptor.init();
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
console.log("Detected Browser Capabilities:", probeAllStorage());
function OmniFS() {
  this.webkitSize = 5 * 1024 * 1024;
  this.webkitFs = null;
  this.apis = [];
}
OmniFS.prototype.init = function(api) {
  var self2 = this;
  if (this.apis.indexOf(api) !== -1) return;
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
        const blob = new Blob([textData], { type: "text/plain" });
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
    if (window2.dragging) return;
    if (!window2.velocity) window2.velocity = new Vector();
    window2.velocity.y -= self2.gravity * deltaTime;
    var lastY = window2.y;
    window2.y += window2.velocity.y;
    window2.x += window2.velocity.x;
    if (window2.y === lastY) window2.velocity.y = 0;
  });
};
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
