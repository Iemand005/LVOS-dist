"use strict";
function forEachIndexed(callbackfn, thisArg) {
  if (typeof callbackfn !== "function") throw new TypeError(callbackfn + " is not a function");
  var length = this == null || typeof this.length !== "number" ? 0 : this.length >>> 0;
  for (var i = 0; i < length; ++i) callbackfn.call(thisArg, this[i], i, this);
}
if (!Object.prototype.hasOwnProperty("forEach")) Object.defineProperty(Object.prototype, "forEach", {
  value: forEachIndexed,
  writable: true,
  configurable: true
});
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
    if (y === void 0 || z === void 0)
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
LVMessenger.broadcast = function(target, type, data, id) {
  if (target && "JSON" in window) target.postMessage(JSON.stringify({ type, data, id }), "*");
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
  var openButton;
  if ("createOpenButton" in app) {
    openButton = app.createOpenButton();
  } else {
    openButton = this._createMobileButton(app);
    openButton.onclick = function() {
      mobileFrameManager.open(app);
    };
    var appLabel = document.createElement("label");
    appLabel.textContent = app && app.title || "Unknown";
    appElement.appendChild(appLabel);
  }
  appElement.appendChild(openButton);
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
var isLocal = location.protocol === "file:" || location.hostname === "localhost";
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
  var domain = getDomain(url);
  if (!domain) return "";
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
  if (!app || typeof app !== "object") return;
  if (!app.id) app.id = app.title || "unknown";
  this._apps[app.id] = app;
  if (app.wallpaper) {
    this._wallpapers[app.id] = app;
    if (!this._wallpaper) this._wallpaper = app;
  }
};
AppManager.prototype.addApps = function() {
  for (var i = 0; i < arguments.length; i++)
    if (arguments[i] instanceof Array) arguments[i].forEach(this.addApp, this);
};
AppManager.prototype.getApp = function(id) {
  if (!id) return null;
  return this._apps[id] || null;
};
AppManager.prototype.removeApp = function(id) {
  if (!id) return;
  delete this._apps[id];
};
AppManager.prototype._forEach = function(map, callback) {
  if (typeof callback !== "function") return;
  for (var id in map)
    if (map.hasOwnProperty(id) && map[id]) callback(map[id], id);
};
AppManager.prototype.forEachApp = function(callback) {
  this._forEach(this._apps, callback);
};
AppManager.prototype.forEachWallpaper = function(callback) {
  this._forEach(this._wallpapers, callback);
};
Object.defineProperty(AppManager.prototype, "apps", {
  get: function() {
    return this._apps;
  }
});
Object.defineProperty(AppManager.prototype, "installedApps", {
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
AppManager.prototype.saveApp = function(app) {
  if (!canSave || !hasLocalStorage) return;
  if (!app || typeof app !== "object" || !app.id) return;
  try {
    var apps = this.installedApps;
    if (apps.some(function(existing) {
      return existing.id === app.id;
    })) return;
    apps.push(app);
    localStorage.setItem("installedApps", JSON.stringify(apps));
  } catch (exception) {
    handleStorageException(exception);
  }
};
AppManager.prototype.loadApps = function() {
  if (!canSave || !hasLocalStorage) return;
  var self2 = this;
  try {
    this.installedApps.forEach(function(app) {
      if (app && app.src) self2.addApp(app);
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
  if (iconUrl) app.iconUrl = iconUrl;
  return app;
};
AppManager.prototype.setWallpaper = function(id) {
  var wallpaperFrame = document.getElementById("wallpaper-frame");
  if (!(wallpaperFrame instanceof HTMLIFrameElement)) return;
  var app = this.getApp(id);
  if (!app) return;
  wallpaperFrame.onerror = function() {
    if (app && app.distSrc) wallpaperFrame.src = app.distSrc;
  };
  wallpaperFrame.src = isLocal ? app.src : app.distSrc || app.src;
};
AppManager.prototype.openAppInIFrame = function(id, frame, onLoad2) {
  let timeout = -1;
  var src = null;
  frame.onload = function() {
    clearTimeout(timeout);
    if (onLoad2) onLoad2(src);
  };
  var application = this.getApp(id);
  if (!application) return;
  var baseUrls = [application.src, application.distSrc];
  if (!isLocal) baseUrls.reverse();
  var fallbackUrls = baseUrls.concat(application.altUrls);
  let index = 0;
  function tryNext() {
    var url = fallbackUrls[index++];
    if (index >= fallbackUrls.length || !frame || !url) return;
    frame.src = url;
    src = url;
    clearTimeout(timeout);
    timeout = setTimeout(tryNext, 3e3);
  }
  frame.addEventListener("error", tryNext);
  tryNext();
};
AppManager.prototype.reloadWallpaper = function() {
  if (this._wallpaper) this.setWallpaper(this._wallpaper.id);
};
var appManager = new AppManager();
window.appManager = appManager;
"use strict";
var useTransform = true, useScale = false;
var supportsPointer = typeof window !== "undefined" && ("PointerEvent" in window || "MSPointerEvent" in window);
var supportsObjectFit = Boolean(document.documentElement && document.documentElement.style && typeof document.documentElement.style.objectFit !== "undefined");
var supportsTransitions = false;
var supportsTransform = false;
var isBlink = "chrome" in window;
var isIE = typeof window !== "undefined" && typeof document !== "undefined" && !!window.MSInputMethodContext && document.documentMode === 11;
var isLocal = location.protocol === "file:" || location.hostname === "localhost";
(function() {
  var style = document.createElement("div").style;
  supportsTransitions = "transition" in style || "WebkitTransition" in style || "MozTransition" in style || "OTransition" in style || "msTransition" in style;
  supportsTransform = "transform" in style || "webkitTransform" in style || "msTransform" in style || "mozTransform" in style || "OTransform" in style;
})();
var transitionEndEvent = "webkitTransition" in document.documentElement.style ? "webkitTransitionEnd" : "transitionend";
if (isIE) useTransform = true;
if (!supportsTransform) useTransform = false;
var flags = {
  useSkewAnimations: false,
  aeroSnap: true,
  updateRateLimit: isBlink,
  useDragOverlay: true,
  broadcastWindowMoves: true,
  _useTransform: useTransform,
  useAnimations: true,
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
  _useViewTransitionMaximize: true,
  get useViewTransitionMaximize() {
    return this._useViewTransitionMaximize;
  },
  set useViewTransitionMaximize(value) {
    if (value) this.compositorResize = false;
    this._useViewTransitionMaximize = value;
  },
  _preserveMaximizeAspect: false,
  get preserveMaximizeAspect() {
    return this._preserveMaximizeAspect;
  },
  set preserveMaximizeAspect(value) {
    document.body.classList.toggle("preserve-aspect", !!value);
    this._preserveMaximizeAspect = value;
  },
  _useMica: false,
  get useMica() {
    return this._useMica;
  },
  set useMica(value) {
    if (!windowManager) return;
    windowManager.toggleMica(value);
    this._useMica = value;
  },
  windowReaper: false,
  verboseLogs: false
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
  var regged = url.replace(/^[a-z]+:\/\/+/i, "").split("/")[0];
  return regged && regged.split("?")[0];
}
function getSiteName(url) {
  var domain = getDomain(url);
  if (!domain) return null;
  var parts = domain.split(".");
  var name = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  if (!name) return null;
  return name.charAt(0).toUpperCase() + name.slice(1);
}
function isElement(object) {
  return object && "nodeType" in object;
}
function getWindowChromeHeight(window2) {
  return window2.outerHeight - window2.innerHeight;
}
function transformElementOld(element, x, y, skew, scaleX, scaleY, rotation) {
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
function transformElement(element, t) {
  var transform = "";
  if (t.x && t.y) transform += "translate(" + toPixels(t.x) + "," + toPixels(t.y) + ")";
  else if (t.x) transform += "translateX(" + toPixels(t.x) + ")";
  else if (t.y) transform += "translatey(" + toPixels(t.y) + ")";
  if (t.skewX) transform += " skewX(" + toDegrees(t.skewX) + ")";
  if (t.scaleX === 1) t.scaleX = void 0;
  if (t.scaleY === 1) t.scaleY = void 0;
  if (t.scaleX && t.scaleY) transform += "scale(" + t.scaleX + "," + t.scaleY + ")";
  else if (t.scaleX) transform += "scaleX(" + t.scaleX + ")";
  else if (t.scaleY) transform += "scaleY(" + t.scaleY + ")";
  if (t.rotate) transform += "rotate(" + toDegrees(t.rotate) + ")";
  if (t.rotateX) transform += "rotateX(" + toDegrees(t.rotateX) + ")";
  if (t.rotateY) transform += "rotateY(" + toDegrees(t.rotateY) + ")";
  if (t.rotateZ) transform += "rotateZ(" + toDegrees(t.rotateZ) + ")";
  element.style.transform = transform;
}
function insetElement(element, top, left, right, bottom) {
  if ("inset" in element.style)
    if (typeof left === "undefined") element.style.inset = toPixels(top);
    else element.style.inset = toPixels(top) + " " + toPixels(right || 0) + " " + toPixels(bottom || 0) + " " + toPixels(left);
  else {
    if (typeof left === "undefined") left = top, right = top, bottom = top;
    element.style.top = toPixels(top);
    element.style.left = toPixels(left);
    if (typeof right !== "undefined") element.style.right = toPixels(right);
    if (typeof bottom !== "undefined") element.style.bottom = toPixels(bottom);
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
  if (source && windowManager) {
    var dialog = windowManager.windows[source];
    if (!dialog) return;
    if (type === "window-size") dialog.resizeBody(data.width, data.height);
    switch (type) {
      case "launchOverlay":
        var overlay = bodyCrawler.getOverlay();
        if (!overlay) break;
        overlay.ontransitionend = function() {
          if (!dialog) return;
          dialog.messageFrame("prepareToLaunchOverlay");
          if (dialog.frame) {
            var oriel = new URL(dialog.frame.src);
            oriel.searchParams.set("fullscreen", String(true));
            dialog.frame.src = oriel.href;
          }
          if (!overlay) return;
          overlay.ontransitionend = null;
          overlay.requestFullscreen().catch(function() {
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
        dialog.moveElementIntoPipById(data.id);
        break;
      case "visualizers":
        dialog.messageFrame("visualizers", windowManager.getVisualizerApps());
        break;
    }
  }
}
function swapMetroBody() {
  if (!windowManager.flipped) return;
  windowManager.activeDialogToMetro();
}
function flip(enable) {
  var desktop = bodyCrawler.getDesktop();
  if (!desktop) return;
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
function stringifyDialogProperties(properties) {
  return JSON ? JSON.stringify(properties).replace(/true/g, "yes").replace(/false/g, "no").replace(/:/g, "=").replace(/[}{"]/g, "") : "No JSON!";
}
function getViewBoxPosition() {
  return { x: window.screenLeft, y: window.screenTop };
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
  localStorage.windowState = null;
  windowManager.canSave = false;
}
function getDialogTemplate() {
  var template = document.querySelector("template") || document.getElementById("window-template");
  if (!template) return;
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
function flipElement(element, onToggled, thisArg) {
  var first = element.getBoundingClientRect();
  var previousTransition = element.style.transition;
  element.style.transition = "none";
  if (onToggled) onToggled.call(thisArg || element);
  var last = element.getBoundingClientRect();
  var dx = first.left - last.left;
  var dy = first.top - last.top;
  var scaleX = last.width ? first.width / last.width : 1;
  var scaleY = last.height ? first.height / last.height : 1;
  element.style.transformOrigin = "top left";
  element.style.translate = toPixels(dx) + " " + toPixels(dy);
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
    if (!state.active) return;
    state.active = false;
    if (element._animationState === state) element._animationState = null;
    element.classList.remove("animating");
    if (flip2) clearFlip(element);
    if (onEnd) onEnd.call(boundContext);
  };
  var previous = element._animationState;
  if (previous) {
    if (previous.timer) clearTimeout(previous.timer);
    if (previous.frame) window.cancelAnimationFrame(previous.frame);
    if (previous.handler) element.removeEventListener(transitionEndEvent, previous.handler, false);
    if (previous.flip) clearFlip(element);
  }
  var state = element._animationState = { timer: 0, frame: 0, handler: null, active: true, flip: !!flip2 };
  if (!flags.useAnimations) {
    if (onToggled) onToggled.call(boundContext);
    callEnd();
    return;
  }
  state.timer = timeout && setTimeout(callEnd, timeout);
  if (supportsTransitions) {
    if (flip2) {
      flipElement(element, onToggled, boundContext);
    } else element.classList.add("animating");
    var animationHandler = function(event2) {
      if (!onTransitionEnd) return;
      if (typeof onTransitionEnd === "string") {
        if (event2.propertyName !== onTransitionEnd) return;
      } else if (!onTransitionEnd(event2.propertyName)) return;
      element.removeEventListener(transitionEndEvent, animationHandler, false);
      clearTimeout(state.timer);
      callEnd();
    };
    state.handler = animationHandler;
    element.addEventListener(transitionEndEvent, animationHandler, false);
  }
  if (!flip2 || !supportsTransitions) {
    state.frame = window.requestAnimationFrame(function() {
      state.frame = 0;
      if (onToggled) onToggled.call(boundContext);
    });
  }
}
function WindowManager() {
  this._windows = {};
  this._windowStates = null;
  this._isBlurEnabled = true;
  this._isMicaEnabled = false;
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
    if (!hasLocalStorage2) this.canSave = false;
  } catch (ex) {
    console.warn("Local storage access denied.", ex);
  }
  this.ticking = false;
  this._pendingDragEvent = null;
  this.flipped = false;
  this.focusedDialog = null;
  this.synchronizing = false;
  this.channel = new BroadcastChannel("lvos");
  this.channel.onmessage = function(ev) {
    var data = ev.data;
    if (typeof data === "string") try {
      data = JSON.parse(data);
    } catch (ex) {
      return;
    }
    if (!data || typeof data !== "object" || typeof data.type !== "string") return;
    windowManager.handleBroadcast(data.type, data.data, data.id);
  };
  var self2 = this;
  this.resizeHandler = function() {
    self2.forEachWindow(function(window2) {
      window2.update();
    });
  };
  this.windowDragEvent = function(event2) {
    try {
      if (event2 && event2.buttons === 0 && self2.isDragging) {
        self2.disableDialogDrag();
        return;
      }
      cancelDomEvent(event2);
      var isTouch = "pointerType" in event2 && event2.pointerType === "touch";
      self2.setPointerPosition(event2.clientX, event2.clientY);
      if (flags.updateRateLimit) {
        self2._pendingDragEvent = event2;
        if (self2.ticking) return;
        self2.ticking = true;
        window.requestAnimationFrame(function() {
          var pending = self2._pendingDragEvent;
          self2._pendingDragEvent = null;
          self2.ticking = false;
          if (!pending) return;
          var touch = "pointerType" in pending && pending.pointerType === "touch";
          windowManager.handleWindowDrag(pending.clientX, pending.clientY, touch);
        });
      } else windowManager.handleWindowDrag(event2.clientX, event2.clientY, isTouch);
    } catch (ex) {
    }
  };
  this.windowSnap = new WindowSnap();
  this.snapGroups = /* @__PURE__ */ new Map();
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
      }
    return this._windowStates;
  }
});
Object.defineProperty(WindowManager.prototype, "state", {
  get: function() {
    var state = {};
    for (var id in this.windows) {
      var window2 = this.windows[id];
      if (window2) state[id] = window2.getState();
    }
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
  /**
     * @this {WindowManager}
     */
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
  try {
    if (this.canSave && typeof localStorage !== "undefined")
      localStorage.setItem("windowState", JSON.stringify(this.state));
  } catch (exception) {
    handleStorageException(exception);
  }
};
WindowManager.prototype.loadState = function(dialog) {
  if (!this.canSave) return;
  try {
    if (!localStorage) return;
    var windowStates = this.windowStates;
    this.loaded = true;
    if (!windowStates) return;
    if (dialog && dialog.id) {
      dialog.loadState(windowStates[dialog.id]);
      this.updateTopZ(dialog.z);
    } else {
      for (var id in windowStates) try {
        var window2 = this.windows[id];
        if (window2 && windowStates[id]) window2.loadState(windowStates[id]);
      } catch (ex) {
      }
      this.updateTopZ();
    }
  } catch (exception) {
    handleStorageException(exception);
  }
};
WindowManager.prototype.forEachWindow = function(callback) {
  for (var id in this.windows) if (this.windows.hasOwnProperty(id)) {
    var dialog = this.windows[id];
    if (dialog) callback(dialog, id);
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
    dialog.mica = this.isMicaEnabled || false;
    this._windows[app.id] = dialog;
    if (!(app instanceof HTMLElement)) appManager.addApp(app);
    return dialog;
  } catch (ex) {
    console.warn("App load failed", ex);
    return null;
  }
};
WindowManager.prototype.spawnApp = function(application) {
  if (!application || !application.id) return null;
  var id = application.id, n = 1;
  while (this._windows[id]) id = application.id + "#" + ++n;
  var instance = {};
  for (var key in application) if (application.hasOwnProperty(key)) instance[key] = application[key];
  instance.id = id;
  try {
    var dialog = new Dialog(instance);
    dialog.mica = this.isMicaEnabled || false;
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
  this.installApp(proxyUrl + url, getSiteName(url) || "unkle", "custom." + getDomain(url), getFaviconUrl(url));
};
WindowManager.prototype.dropApplication = function(application, x, y, offset, state) {
  if (!application || !application.id) return null;
  var dialog;
  if (application.multiple) {
    dialog = this.spawnApp(application);
  } else {
    dialog = this.windows[application.id];
    if (!dialog) {
      this.loadApp(application);
      dialog = this.windows[application.id];
    }
  }
  if (!dialog) return null;
  dialog.loadState(state || {});
  dialog.launch();
  dialog.setZ();
  if (typeof x === "number" && typeof y === "number") {
    var grabX = offset ? offset.x : 0;
    var grabY = offset ? offset.y : 0;
    dialog.moveToCenter(x - grabX, y - grabY);
  }
  if (dialog.target) {
    try {
      dialog.resize();
      if (typeof dialog.update === "function") dialog.update();
      if (typeof dialog.syncGeometry === "function") dialog.syncGeometry();
      var rect = getRect(dialog.target);
      if (rect) {
        var bw = rect.width, bh = rect.height;
        if (Math.abs(bw - dialog.width) > 1 || Math.abs(bh - dialog.height) > 1) {
          dialog._width = bw;
          dialog._height = bh;
          if (typeof dialog.broadcastState === "function") dialog.broadcastState({ width: bw, height: bh });
        }
      }
      dialog.resize();
    } catch (exception) {
    }
  }
  return dialog;
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
WindowManager.prototype.focusDialog = function(dialog) {
  if (this.focusedDialog !== null && this.focusedDialog.target)
    this.focusedDialog.target.removeAttribute("focus");
  if (dialog.target) dialog.target.setAttribute("focus", String(true));
  this.focusedDialog = dialog;
};
WindowManager.prototype.activeDialogToMetro = function() {
  if (this.activeDialog) this.activeDialog.exportDialogBodyToMetro();
};
WindowManager.prototype.initializeDialogs = function() {
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
  this.windowSnap.init();
};
WindowManager.prototype.windowActivationEvent = function(event2, dialog, id) {
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
      } catch (ex) {
      }
      return dialog;
    }
  } catch (ex) {
  }
  cancelDomEvent(event2);
  if (window.desktopManager && window.desktopManager.isExpos\u00E9) {
    var root = document.querySelector("main");
    if (root) {
      var section = dialog.target && dialog.target.closest ? dialog.target.closest("#window-section, .window-section") : null;
      var origin = -1;
      if (section) {
        for (var i = 0; i < window.desktopManager.desktops.length; i++)
          if (window.desktopManager.desktops[i].target === section) {
            origin = i;
            break;
          }
      }
      dialog._exposeOrigin = origin >= 0 ? { index: origin, x: dialog.x, y: dialog.y } : null;
      dialog.detachToRootKeepingVisual(root);
    }
  } else dialog.clearExpos\u00E9Visual();
  if (supportsPointer && event2 && "pointerId" in event2 && event2.target instanceof HTMLElement && typeof event2.target.setPointerCapture === "function") {
    try {
      event2.target.setPointerCapture(event2.pointerId);
    } catch (ex) {
    }
  }
  this.activeDialog = dialog;
  this.isTouchDrag = event2 && "pointerType" in event2 && event2.pointerType === "touch";
  this.enableDialogDrag();
  this.dragAction.set(id || 0);
  dialog.setClickOffset(event2.clientX, event2.clientY);
  dialog.activate();
  if (this.isTouchDrag) this.windowSnap.moveToDialog(dialog, 0, this.dragAction.direction, false, this.isTouchDrag);
  this._snapZone = "";
  this._heightSnapReleased = false;
  return dialog;
};
WindowManager.prototype.handleWindowDrag = function(newX, newY, isTouch) {
  var dialog = this.activeDialog;
  if (!dialog || !dialog.clickOffset) return;
  if (dialog.maximized) {
    if (!flags.aeroSnap) return;
    var snapSection = this.getSnapContainer(dialog);
    dialog.remapClickOffset(0, 0, this.snapWidth(snapSection), this.snapHeight(snapSection));
    dialog.maximized = false;
  } else if (dialog.snapped) {
    var frame = dialog._snapFrame;
    if (frame) dialog.remapClickOffset(frame.x, frame.y, frame.width, frame.height);
    this.unsnapDialog(dialog);
  }
  var difference = { x: newX - dialog.clickOffset.clickX, y: newY - dialog.clickOffset.clickY };
  if (dialog.heightSnapped) {
    var gestureDirection = this.dragAction.direction;
    if (gestureDirection === 0) {
      if (difference.y > this.heightSnapReleaseThreshold) dialog.toggleHeightSnapped(false);
    } else if (this.isVerticalResizeDirection(gestureDirection)) {
      this.leaveHeightSnappedByResize(dialog);
    }
  }
  dialog.stopAnimating();
  var dragScale = typeof dialog._exposeVisualScale === "number" && dialog._exposeVisualScale > 0 ? dialog._exposeVisualScale : 1;
  if (typeof dialog._exposeVisualScale === "number" && !dialog._exposeGrab && dialog.clickOffset && dialog.content) {
    var grabRect = dialog.content.getBoundingClientRect();
    if (grabRect.width) dialog._exposeGrab = {
      x: (dialog.clickOffset.clickX - grabRect.left) / dragScale,
      y: (dialog.clickOffset.clickY - grabRect.top) / dragScale
    };
  }
  this.dragAction.execute(dialog, dialog.clickOffset, dragScale === 1 ? difference : { x: difference.x / dragScale, y: difference.y / dragScale });
  this.setPointerPosition(newX, newY);
  var snap = !(window.desktopManager && window.desktopManager.isExpos\u00E9);
  if (snap) {
    var snapZone = this.getGestureSnapZone(dialog, this.dragAction.direction, newX, newY);
    if (snapZone) {
      if (snapZone !== this._snapZone) {
        if (this._snapZone) this.windowSnap.hideBehind(dialog, !!isTouch);
        this._snapZone = snapZone;
        this.windowSnap.snap(snapZone, dialog);
      }
    } else if (this._snapZone) {
      this._snapZone = "";
      this.windowSnap.hideBehind(dialog, !!isTouch);
    } else if (isTouch) {
      this.windowSnap.moveToDialog(dialog, 20, this.dragAction.direction, true, true);
    }
  } else this.updateExpos\u00E9DragScale(dialog, newX, newY);
  if (dialog.moveEvents && dialog.exchangeDialogMoveEvent) dialog.exchangeDialogMoveEvent(difference);
};
WindowManager.prototype.updateExpos\u00E9DragScale = function(dialog, x, y) {
  var desktopManager = window.desktopManager;
  if (!desktopManager || typeof dialog._exposeVisualScale !== "number" || !dialog.target || !dialog.content) return;
  var content = dialog.content;
  var grab = dialog._exposeGrab;
  if (!grab) return;
  var index = desktopManager.getDesktopIndexAt(x, y);
  var k = 1;
  if (index >= 0) {
    var desktopTarget = desktopManager.desktops[index].target;
    var area = desktopTarget.getBoundingClientRect();
    if (area.width && desktopTarget.offsetWidth) k = area.width / desktopTarget.offsetWidth;
  }
  if (!k) k = 1;
  var current = dialog._exposeContentScale || 1;
  if (Math.abs(k - current) >= 2e-3) {
    dialog._exposeContentScale = k;
    dialog._exposeVisualScale = k;
    content.style.transition = "scale 280ms cubic-bezier(0.44, 0.41, 0, 1)";
    content.style.scale = String(k);
    if (dialog._exposeScaleTimer) clearTimeout(dialog._exposeScaleTimer);
    dialog._exposeScaleTimer = setTimeout(function() {
      dialog._exposeScaleTimer = 0;
      content.style.transition = "";
    }, 300);
  }
  var rendered = content.getBoundingClientRect();
  var targetRect = dialog.target.getBoundingClientRect();
  if (!rendered.width || !targetRect.width) return;
  var renderedScale = dialog._exposeVisualWidth ? rendered.width / dialog._exposeVisualWidth : k;
  if (!renderedScale) return;
  content.style.transform = "translate(" + toPixels((x - grab.x * renderedScale - targetRect.left) / renderedScale) + "," + toPixels((y - grab.y * renderedScale - targetRect.top) / renderedScale) + ")";
};
WindowManager.prototype.getSnapZone = function(x, y, section) {
  var area = section || this.getSnapContainer();
  var rect = area ? area.getBoundingClientRect() : null;
  var left = rect ? rect.left : 0;
  var top = rect ? rect.top : 0;
  var width = rect ? rect.width : this.snapWidth(area);
  if (x <= left + this.snapSideThreshold) return "left";
  if (x >= left + width - this.snapSideThreshold) return "right";
  if (y <= top + this.snapFullThreshold) return "maximize";
  return "";
};
WindowManager.prototype.isVerticalResizeDirection = function(direction) {
  return direction === 1 || direction === 3 || direction === 5 || direction === 6 || direction === 7 || direction === 8;
};
WindowManager.prototype.leaveHeightSnappedByResize = function(dialog) {
  var drawnHeight = this.snapHeight(this.getSnapContainer(dialog));
  if (dialog.target) setClass(dialog.target, "height-snapped", false);
  dialog._snappingOut = false;
  dialog._snappingOutState = null;
  this._heightSnapReleased = true;
  dialog._y = 0;
  dialog._height = drawnHeight;
  dialog.updatePosition();
  dialog.updateHeight();
  var offset = dialog.clickOffset;
  if (offset) {
    offset.height = dialog.height;
    offset.startX = dialog.x;
    offset.startY = dialog.y;
  }
};
WindowManager.prototype.getGestureSnapZone = function(dialog, direction, x, y) {
  if (!flags.aeroSnap || dialog.heightSnapped || this._heightSnapReleased) return "";
  var section = this.getSnapContainer(dialog);
  if (direction === 1 || direction === 3) {
    var bounds = WindowManager.windowBounds;
    var threshold = this.snapFullThreshold;
    var atEdge = direction === 1 ? dialog.y <= bounds.top + threshold : dialog.y + dialog.height >= this.snapHeight(section) - threshold;
    return atEdge ? "height" : "";
  }
  if (direction !== 0) return "";
  return this.getSnapZone(x, y, section);
};
WindowManager.prototype.getSnapContainer = function(dialog) {
  var target = dialog && dialog.target;
  if (target && target.closest) {
    var section = (
      /** @type {HTMLElement | null} */
      target.closest("#window-section, .window-section")
    );
    if (section) return section;
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
  this.pointerPosition.x = x;
  this.pointerPosition.y = y;
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
  if (zone !== "left" && zone !== "right") return;
  this.tileDialog(dialog, zone);
};
WindowManager.prototype.tileDialog = function(dialog, side) {
  var section = this.getSnapContainer(dialog);
  if (!section) return;
  var group = this.getSnapGroup(section);
  var windows = (
    /** @type {WindowTile[]} */
    group.windows
  );
  var index = this.findSnapTile(dialog.id, section);
  var tile = index === -1 ? { id: dialog.id, width: 0.5 } : windows[index];
  if (!tile) return;
  if (index !== -1) windows.splice(index, 1);
  if (side === "left") windows.unshift(tile);
  else windows.push(tile);
  if (this.snapInsertGaps) this.fitSnapGaps(section, windows, side);
  this.reflowSnapGroup(section);
  dialog.toggleSnapped(true);
};
WindowManager.prototype.fitSnapGaps = function(section, tiles, side) {
  for (var i = tiles.length - 1; i >= 0; i--) {
    var tile = tiles[i];
    if (tile && tile.gap) tiles.splice(i, 1);
  }
  if (tiles.length !== 1) return;
  var firstTile = tiles[0];
  if (!firstTile || !firstTile.id) return;
  var dialog = this.windows[firstTile.id];
  if (!side && dialog && dialog.target) {
    var rect = dialog.target.getBoundingClientRect();
    var origin = section ? section.getBoundingClientRect() : rect;
    side = rect.left - origin.left <= origin.width / 2 ? "left" : "right";
  }
  tiles.splice(side === "right" ? 0 : 1, 0, { gap: true, width: this.snapGapWidth });
};
WindowManager.prototype.findSnapTile = function(id, section) {
  var windows = (
    /** @type {WindowTile[]} */
    this.getSnapGroup(section).windows
  );
  for (var i = 0; i < windows.length; i++) {
    var dialog = windows[i];
    if (dialog && dialog.id === id) return i;
  }
  return -1;
};
WindowManager.prototype.unsnapDialog = function(dialog) {
  var section = this.getSnapContainer(dialog);
  if (!section) return;
  var group = this.getSnapGroup(section);
  var windows = (
    /** @type {WindowTile[]} */
    group.windows
  );
  var index = this.findSnapTile(dialog.id, section);
  if (index === -1) return;
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
  if (this.snapInsertGaps) this.fitSnapGaps(section, windows, survivorSide);
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
  if (!section) return;
  var group = this.getSnapGroup(section);
  var tiles = (
    /** @type {WindowTile[]} */
    group.windows
  );
  for (var s = tiles.length - 1; s >= 0; s--) {
    var stale = tiles[s];
    if (!stale || stale.gap) continue;
    var staleWindow = stale.id ? this.windows[stale.id] : null;
    if (!staleWindow || !staleWindow.target || !staleWindow.target.parentNode || this.getSnapContainer(staleWindow) !== section) tiles.splice(s, 1);
  }
  var members = {};
  for (var m = 0; m < tiles.length; m++) {
    var memberTile = tiles[m];
    if (memberTile && memberTile.id) members[memberTile.id] = true;
  }
  for (var id in this.windows) {
    var dialog = this.windows[id];
    if (!dialog || !dialog.target || members[id]) continue;
    if (this.getSnapContainer(dialog) !== section) continue;
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
    if (!tile) continue;
    var isLast = k === tiles.length - 1;
    var width = !this.snapInsertGaps && isLast ? remaining : tile.width || 0.5;
    remaining -= width;
    var member = tile.id ? this.windows[tile.id] : null;
    var element = tile.gap ? this.getSnapSpacer(section) : member && member.target;
    if (!element) continue;
    if (element.parentNode !== section) section.appendChild(element);
    element.style.order = String(k);
    element.style.flex = width + " 1 0%";
    if (tile.gap) usedSpacer = element;
    if (member && !tile.gap) member._snapFrame = {
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
    if (spacer.parentNode) spacer.parentNode.removeChild(spacer);
  }
};
WindowManager.prototype.disableDialogDrag = function() {
  if (!this.isDragging) return;
  var dragDirection = this.dragAction.direction;
  this.dragAction.set();
  this.toggleDragging(false);
  this.saveState();
  if (!this.activeDialog) return;
  if (this.isTouchDrag) this.activeDialog.setDragScale(1, 1);
  var snap = !(window.desktopManager && window.desktopManager.isExpos\u00E9);
  if (snap) {
    var snapZone = this.getGestureSnapZone(this.activeDialog, dragDirection, this.pointerPosition.x, this.pointerPosition.y);
    if (snapZone) this.snapDialog(this.activeDialog, snapZone);
    if (this.isTouchDrag) {
      this.windowSnap.hideBehind(this.activeDialog);
      this.isTouchDrag = false;
    }
    if (!this.activeDialog.maximized) this.windowSnap.hideBehind(this.activeDialog);
    this._snapZone = "";
  } else if (window.desktopManager) {
    var desktopIndex = window.desktopManager.getDesktopIndexAt(this.pointerPosition.x, this.pointerPosition.y);
    if (desktopIndex >= 0) this.activeDialog.dropIntoDesktop(desktopIndex);
    else this.activeDialog.flyBackToExpos\u00E9Origin();
    this.isTouchDrag = false;
  }
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
WindowManager.prototype.getWindowById = function(id) {
  return id ? this.windows[id] : null;
};
WindowManager.prototype.broadcast = function(type, data, id) {
  LVMessenger.broadcast(this.channel, type, data, id);
};
WindowManager.prototype.broadcastTheme = function() {
  if (!document.hasFocus()) return;
  this.broadcast("theme", { className: document.body.className });
};
WindowManager.prototype.handleBroadcast = function(type, data, id) {
  if (type === "theme") {
    var className = data && data.className;
    if (typeof className !== "string") return;
    document.body.className = className;
    this.forEachWindow(function(dialog2) {
      dialog2.messageFrame("theme", { className });
    });
    return;
  }
  if (type !== "dialog-state") {
    messageReceived(type, data, id);
    return;
  }
  if (!data || !id) return;
  var dialog = this.getWindowById(id);
  if (!dialog) {
    var app = appManager.getApp(id);
    if (!app) return;
    this.loadApp(app);
    dialog = this.windows[id];
  }
  if (!dialog) return;
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
    if (found) return;
    if (dialog.body === el) {
      found = true;
      foundDialog = dialog;
    }
  });
  return foundDialog;
};
WindowSnap.margin = 15;
function WindowSnap() {
  this.element = document.createElement("div");
  this.element.id = "window-snap";
  this._snapped = "";
  this._section = null;
  this.element.classList.add("hidden");
}
Object.defineProperty(WindowSnap.prototype, "hidden", {
  get: function() {
    return this.element.classList.contains("hidden");
  },
  set: function(enable) {
    if (enable) this.element.classList.add("hidden");
    else this.element.classList.remove("hidden");
  }
});
WindowSnap.prototype.init = function() {
  var snapParent = windowManager && windowManager.getSnapContainer() || document.getElementById("window-section") || document.getElementById("desktop") || document.body;
  this._section = snapParent;
  snapParent.insertBefore(this.element, snapParent.firstChild);
};
WindowSnap.prototype.attachTo = function(dialog) {
  if (!windowManager) return;
  var section = windowManager.getSnapContainer(dialog);
  if (!section) return;
  this._section = section;
  if (this.element.parentNode !== section || section.firstChild !== this.element)
    section.insertBefore(this.element, section.firstChild);
};
WindowSnap.prototype.moveToDialog = function(dialog, outset, direction, noAnimation, isTouch, preserveSnapped) {
  outset = outset || 0;
  if (dialog) this.attachTo(dialog);
  this.hidden = !outset;
  if (!preserveSnapped) this._snapped = "";
  if (!direction) outset = 0;
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
  if (!s) return;
  var top = dialog.top - (s.top ? outset : 0);
  var left = dialog.left - (s.left ? outset : 0);
  var right = dialog.right - (s.right ? outset : 0);
  var bottom = dialog.bottom - (s.bottom ? outset : 0);
  this.element.style.zIndex = dialog.z.toString();
  this.hidden = false;
  if (isTouch && !direction) dialog.setDragScale(0.9, 0.9);
  if (!noAnimation) animateElement(this.element, function() {
    this.applyInsetStyle(top, left, right, bottom);
  }, function(name) {
    return name === "inset";
  }, void 0, this, 200);
  else this.applyInsetStyle(top, left, right, bottom);
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
  if (!dialog) return;
  var inset = WindowSnap.margin;
  var right = this.areaWidth() - dialog.x - dialog.width - inset;
  insetElement(
    this.element,
    inset,
    Math.max(inset, dialog.left - inset),
    Math.max(inset, right),
    inset
  );
};
WindowSnap.prototype.snap = function(type, dialog) {
  if (type === this._snapped) return;
  this._snapped = type;
  if (dialog) this.attachTo(dialog);
  if (dialog && this.hidden) {
    this.element.classList.remove("animating");
    this.moveToDialog(dialog, 0, void 0, true, false, true);
    void this.element.offsetWidth;
  }
  this.hidden = false;
  if (dialog) this.element.style.zIndex = dialog.z.toString();
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
  if (!keepScale) dialog.setDragScale(1, 1);
  if (this.hidden) return;
  animateElement(this.element, function() {
    this.moveToDialog(dialog, 0, void 0, true);
  }, function(name) {
    return name === "inset";
  }, function() {
    this.hidden = true;
  }, this, 120);
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
function Transformable(target) {
  this.target = target;
  this._transform = {};
  this._perspective = 100;
}
Object.defineProperty(Transformable.prototype, "perspective", {
  get: function() {
    return this._perspective;
  },
  set: function(value) {
    var parent = this.target.parentElement;
    if (parent) parent.style.perspective = toPixels(this._perspective = value);
  }
});
Transformable.prototype.update = function(animate) {
  if (animate) animateElement(this.target, function() {
    transformElement(this.target, this._transform);
  }, "transform", function() {
  }, this, 1e3);
  else transformElement(this.target, this._transform);
};
Transformable.prototype.move = function(x, y, animate) {
  this._transform.x = x;
  this._transform.y = y;
  this.update(animate);
};
Transformable.prototype.scale = function(x, y, update, animate) {
  this._transform.scaleX = x || 1;
  this._transform.scaleY = y || 1;
  if (update) this.update(animate);
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
  this._mica = flags.useMica;
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
  var appList = document.getElementById("applist");
  if (appList) appList.appendChild(this.createOpenButton());
  var metroAppList = document.getElementById("metroapplist");
  if (metroAppList) metroAppList.appendChild(this.createOpenButton());
  if (create || isElement(object)) this.initWithObject(object);
  this._popupPositionInterval = 0;
  this.dragging = false;
  this._appIcon = null;
  var self2 = this;
  this.activationHandler = function(ev, id2) {
    if (ev.ctrlKey) {
      ev.stopImmediatePropagation();
      return;
    }
    if (ev.target instanceof HTMLElement && ev.target.classList.contains("touch") && (!("pointerType" in ev) || ev.pointerType !== "touch"))
      return false;
    windowManager.windowActivationEvent(ev, self2, id2);
    return true;
  };
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
      this.target = object;
      if (this.target.parentElement && this.target.parentElement.nodeName === "TEMPLATE") return;
      this.close();
    } else {
      this.application = object;
      if (object.exists) {
        this.target = document.getElementById(object.id);
        var doc = this.contentDocument;
        if (doc && doc.readyState !== "complete") this.openUrl(this.application.src);
      } else {
        this.target = createDialog();
        this.openUrl(object.src);
      }
      if (this.windowTarget) this.windowTarget.dialog = this;
      if (object.classes && typeof object.classes === "object") {
        object.classes.forEach(function(clazz) {
          this.target && this.target.classList.add(clazz);
        }, this);
      }
      this.setTitle(object.title);
      this.fixed = object.fixed || false;
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
  var target = this.target;
  if (target && this.activationHandler) {
    var buttons = target.getElementsByTagName("button");
    var createSizers = true;
    if (this.resizable && createSizers) this._createSizers();
    target.addEventListener("selectstart", cancelDomEvent, false);
    var body = this.body;
    if (body) body.addEventListener("load", function() {
      try {
        self2.verifyEjectCapability();
      } catch (exception) {
        if (buttons[0]) buttons[0].style.display = "none";
      }
    }, false);
    var header = this.titleBar;
    if (header)
      header.addEventListener("dblclick", this.toggleMaximized.bind(this, void 0), false);
    if (supportsPointer) target.addEventListener("pointerdown", this.activationHandler, false);
    else target.addEventListener("mousedown", this.activationHandler, false);
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
      if (!event2.ctrlKey || !event2.dataTransfer || !self2.application) {
        event2.preventDefault();
        return;
      }
      var dragState = {
        state: self2.getState(),
        app: self2.application
      };
      var rect = getRect(self2.target);
      if (rect) dragState.offset = {
        x: event2.clientX - (rect.left + rect.width / 2),
        y: event2.clientY - (rect.top + rect.height / 2)
      };
      var data = JSON.stringify(dragState);
      event2.dataTransfer.setData("application/json", data);
      event2.dataTransfer.setData("text/plain", self2.src || self2.title || self2.id);
      if (self2.src) event2.dataTransfer.setData("text/uri-list", self2.src);
      event2.dataTransfer.setData(
        "text/html",
        data
      );
    });
  }
  if (this.id) windowManager.windows[this.id] = this;
  this.updateUseTransform(this.useTransform);
  this.updateScale(this.useScale);
  this.update();
  if (!isElement(object))
    if (object instanceof Dialog)
      this.move(object.x, object.y);
    else this.moveToCenter(window.innerWidth / 2, window.innerHeight / 2);
  if (this.application && this.application.launch) this.launch();
  if (this.frame) this.frame.addEventListener("load", function() {
    self2._loaded = true;
  });
};
Dialog.prototype.setParentElement = function(element) {
  var target = this.target;
  if (!target || !element) return;
  if (target.parentNode === element) return;
  if (typeof element.moveBefore === "function" && target.isConnected) try {
    return element.moveBefore(target, null);
  } catch (ex) {
    console.warn("Not eligible for a move (e.g. a shadow root): use the compatible path.", ex);
  }
  element.appendChild(target);
};
Dialog.prototype.moveToDesktop = function(i) {
  if (this.snapped && windowManager) windowManager.unsnapDialog(this);
  if (window.desktopManager) {
    var desktop = window.desktopManager.desktops[i];
    if (desktop) desktop.insertWindow(this);
  }
};
Dialog.prototype.detachToRootKeepingVisual = function(root) {
  var target = this.target;
  if (!target || !root) return;
  var before = target.getBoundingClientRect();
  this.setParentElement(root);
  var after = target.getBoundingClientRect();
  if (!before.width || !after.width) return;
  var scale = before.width / after.width;
  var content = this.content;
  if (!content || !scale) return;
  content.style.transformOrigin = "0 0";
  content.style.scale = String(scale);
  var measured = content.getBoundingClientRect();
  content.style.transform = "translate(" + toPixels((before.left - measured.left) / scale) + "," + toPixels((before.top - measured.top) / scale) + ")";
  this._exposeVisualScale = scale;
  this._exposeContentScale = scale;
  this._exposeVisualWidth = after.width;
};
Dialog.prototype.clearExpos\u00E9Visual = function() {
  this._exposeOrigin = null;
  if (typeof this._exposeVisualScale !== "number") return;
  var content = this.content;
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
  if (this.content) {
    var rendered = this.content.getBoundingClientRect();
    if (rendered.width) {
      visualLeft = rendered.left;
      visualTop = rendered.top;
    }
  }
  this.moveToDesktop(i);
  this.clearExpos\u00E9Visual();
  if (visualLeft === null || !this.target || !unscaledWidth) return;
  var placed = this.target.getBoundingClientRect();
  if (!placed.width) return;
  var desktopScale = placed.width / unscaledWidth;
  if (!desktopScale) return;
  this.move(
    this.x + (visualLeft - placed.left) / desktopScale,
    this.y + (visualTop - placed.top) / desktopScale
  );
};
Dialog.prototype.flyBackToExpos\u00E9Origin = function() {
  var origin = this._exposeOrigin;
  this.clearExpos\u00E9Visual();
  if (!origin || !window.desktopManager) return;
  var desktop = window.desktopManager.desktops[origin.index];
  if (!desktop) return;
  desktop.insertWindow(this);
  this.move(origin.x, origin.y, false);
  this.animate(this.updatePosition);
};
Dialog.prototype._createSizers = function(createTouchSizers) {
  var self2 = this;
  var target = this.target;
  if (typeof createTouchSizers === "undefined") createTouchSizers = supportsPointer;
  var createSizer = function(id) {
    if (!target || !self2.activationHandler) return;
    var sizerId = "sizer-" + id;
    var sizer = self2.getElementByTagOrClassName(sizerId);
    if (!sizer || !isElement(sizer)) sizer = document.createElement("div");
    sizer.draggable = false;
    sizer.id = id.toString();
    sizer.classList.add(sizerId);
    var pointerDown = function(ev) {
      if (!self2.activationHandler || !self2.activationHandler(ev, id)) return;
      windowManager.dragAction.set(id);
      if (windowManager.isTouchDrag) windowManager.windowSnap.moveToDialog(self2, 20, id);
      cancelDomEvent(ev);
    };
    var pointerUp = function() {
      windowManager.disableDialogDrag();
    };
    if (supportsPointer) {
      sizer.onpointerdown = pointerDown;
      sizer.onpointerup = pointerUp;
      sizer.onpointercancel = pointerUp;
    } else sizer.onmousedown = pointerDown;
    target.appendChild(sizer);
    if (createTouchSizers) {
      var touchSizerId = "touch-sizer-" + id;
      var touchSizer = self2.getElementByTagOrClassName(touchSizerId);
      if (!touchSizer || !isElement(touchSizer)) touchSizer = document.createElement("div");
      touchSizer.draggable = false;
      touchSizer.id = "touch-" + id;
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
  for (var i = 0; i < 8; i++) createSizer.call(this, i + 1);
};
Dialog.prototype.reportState = function() {
  this.messageFrame("window-size", {});
  this.messageFrame("theme", { className: document.body.className });
  windowManager.broadcastTheme();
};
Dialog.prototype.toggleOpen = function(forceOpen, kill) {
  var target = this.target;
  if (!target) return;
  var self2 = this;
  var wasOpen = this._stateOpen;
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
  if (wasOpen !== this._stateOpen) this.broadcastState({ open: this._stateOpen === true });
};
Dialog.prototype.getOrCreateFrame = function(create) {
  var frame = this.frame;
  if (frame || !create || !this.body) return frame;
  return this.body.appendChild(document.createElement("iframe"));
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
Object.defineProperty(Dialog.prototype, "resizable", {
  get: function() {
    return !this.application ? true : this.application.resizable !== false;
  },
  set: function(v) {
    if (v) this._createSizers();
  }
});
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
    return frame && frame.contentDocument;
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
Object.defineProperty(Dialog.prototype, "aspectRatioConstraint", {
  get: function() {
    return this._aspectRatio;
  },
  set: function(aspect) {
    this._aspectRatio = typeof aspect === "number" && aspect > 0 ? aspect : 0;
  }
});
Object.defineProperty(Dialog.prototype, "constrainAspectRatio", {
  get: function() {
    return this._aspectRatioEnabled;
  },
  set: function(enabled) {
    if (!this._aspectRatio) this._aspectRatio = this.aspectRatio;
    this._aspectRatioEnabled = !!enabled;
  }
});
Object.defineProperty(Dialog.prototype, "constrainAspectRatioInner", {
  get: function() {
    return this._constrainAspectRatioInner;
  },
  set: function(enabled) {
    this._constrainAspectRatioInner = !!enabled;
  }
});
Object.defineProperty(Dialog.prototype, "constrainAspectRatioLine", {
  get: function() {
    return this._constrainAspectRatioLine;
  },
  set: function(enabled) {
    this._constrainAspectRatioLine = !!enabled;
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
    var bounds = WindowManager.windowBounds;
    var bottom = this.bottomFromTop;
    if (bounds.bottom !== Infinity && bottom >= bounds.bottom - 0.5) bottom = bounds.bottom;
    if (top < bounds.top) top = bounds.top;
    var height = Math.max(Math.min(bottom - top, this.maxHeight), this.minHeight);
    top = bottom - height;
    this._height = height;
    this._y = top / window.innerHeight;
    if (this.useTransform) {
      if (this.target) this.target.style.height = toPixels(height);
      this.updateTransform();
    } else this.setInset(top, this.left, this.right, window.innerHeight - bottom);
    this._isMinHeight = height === this.minHeight;
  }
});
Object.defineProperty(Dialog.prototype, "left", {
  get: function() {
    return this.x;
  },
  set: function(left) {
    var bounds = WindowManager.windowBounds;
    var right = this.rightFromLeft;
    if (bounds.right !== Infinity && right >= bounds.right - 0.5) right = bounds.right;
    if (left < bounds.left) left = bounds.left;
    var width = Math.max(Math.min(right - left, this.maxWidth), this.minWidth);
    left = right - width;
    this._width = width;
    this._x = left / window.innerWidth;
    if (this.useTransform) {
      if (this.target) this.target.style.width = toPixels(width);
      if (this.useTransform) this.updateTransform();
    } else this.setInset(this.top, left, window.innerWidth - right, this.bottom);
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
      var bounds = WindowManager.windowBounds;
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
      var bounds = WindowManager.windowBounds;
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
    this.setTitle(title);
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
Object.defineProperty(Dialog.prototype, "snapped", {
  get: function() {
    if (!this.target) return false;
    return this.target.classList.contains("snapped");
  },
  set: function(snapped) {
    this.toggleSnapped(snapped);
  }
});
Object.defineProperty(Dialog.prototype, "heightSnapped", {
  get: function() {
    if (!this.target) return false;
    return this.target.classList.contains("height-snapped");
  },
  set: function(snapped) {
    this.toggleHeightSnapped(snapped);
  }
});
Object.defineProperty(Dialog.prototype, "windowTarget", {
  get: function() {
    var target = this.target;
    if (target && "dialog" in target)
      return (
        /** @type {WindowElement} */
        target
      );
    return null;
  }
});
Dialog.prototype.setTitle = function(title) {
  this._title = title;
  var titleElement = this.getTitleElement();
  if (titleElement) titleElement.innerHTML = title;
};
Object.defineProperty(Dialog.prototype, "id", {
  get: function() {
    return this._id || this.target && this.target.id || "unk";
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
Object.defineProperty(Dialog.prototype, "contentTransform", {
  /** @type {()=>Transformable | null} */
  get: function() {
    if (this._contentTransform) return this._contentTransform;
    var content = this.content;
    if (!content) return null;
    return this._contentTransform = new Transformable(content);
  }
});
Object.defineProperty(Dialog.prototype, "transform", {
  /** @type {()=>Transformable | null} */
  get: function() {
    if (this._transform) return this._transform;
    var self2 = this;
    (function() {
    });
    var target = this.target;
    if (!target) return null;
    this._transform = new Transformable(target);
    return this._transform;
  }
});
Object.defineProperty(Dialog.prototype, "killable", {
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
  var header = this.titleBar;
  if (!header) return;
  this._appIcon = header.getElementsByTagName("img")[0] || null;
  if (!this._appIcon) return;
  var self2 = this;
  this._appIcon.onload = function() {
    if (self2._appIcon) self2._appIcon.className = "loaded";
  };
  this._appIcon.onerror = function(e) {
    if (self2._appIcon) self2._appIcon.className = "";
    if (onError) onError();
  };
  this._appIcon.src = iconUrl;
};
Dialog.prototype.setSkew = function(skew) {
  this._skew = skew;
  if (this.useTransform)
    this.updateTransform();
  else if (this.target) skewElement(this.target, skew);
};
Dialog.prototype.setScale = function(scaleX, scaleY, update, noAnimation) {
  if (this.transform) this.transform.scale(scaleX, scaleY, update !== false, !noAnimation);
};
Dialog.prototype.setDragScale = function(scaleX, scaleY) {
  var self2 = this;
  var nextX = scaleX || 1;
  var nextY = scaleY || 1;
  if (nextX === this._scaleX && nextY === this._scaleY) return;
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
  return getRect(this.body, index);
};
Dialog.prototype.getButton = function(index) {
  return this.titleBar && this.titleBar.getElementsByTagName("button")[index];
};
Dialog.prototype.createOpenButton = function() {
  var openButton = document.createElement("button");
  this.buttons.unshift(openButton);
  openButton.appendChild(document.createTextNode(this.title || "?"));
  var application = this.application;
  if (application && application.multiple) {
    openButton.onclick = function() {
      var instance = windowManager.spawnApp(application);
      if (instance) instance.launch();
    };
  } else {
    openButton.onclick = this.launch.bind(this);
  }
  return openButton;
};
Dialog.prototype.setClickOffset = function(x, y) {
  var rect = this.getRect();
  if (!this.clickOffset || !rect) return;
  return this.clickOffset.init(x, y, this.width || rect.width, this.height || rect.height, this.x, this.y);
};
Dialog.prototype.remapClickOffset = function(frameX, frameY, frameWidth, frameHeight) {
  var offset = this.clickOffset;
  if (!offset || frameWidth <= 0 || frameHeight <= 0) return;
  offset.clickX = this.x + (offset.clickX - frameX) * (this.width / frameWidth);
  offset.clickY = this.y + (offset.clickY - frameY) * (this.height / frameHeight);
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
  if (!button) return enable;
  if (typeof enable === "undefined") enable = button.disabled;
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
  if (this._dragScaleAnimating) return;
  if (this.target) this.target.classList.remove("animating");
};
Dialog.prototype.animate = function(onToggled, onTransitionEnd, onEnd, timeout, flip2) {
  if (this.target) animateElement(this.target, onToggled, onTransitionEnd, onEnd, this, timeout, flip2);
};
Dialog.prototype.toggleClassAnimated = function(className, force, onTransitionEnd, onEnd, onToggled, timeout) {
  var self2 = this;
  var enabled = false;
  this.animate(function() {
    if (self2.target) enabled = setClass(self2.target, className, force);
    if (onToggled) onToggled.call(self2, enabled);
  }, onTransitionEnd, function() {
    if (onEnd) onEnd.call(self2, enabled);
  }, timeout);
};
Dialog.prototype.toggleClassFlip = function(className, force, onTransitionEnd, onEnd, timeout) {
  var self2 = this;
  var enabled = false;
  this.animate(function() {
    if (self2.target) enabled = setClass(self2.target, className, force);
  }, onTransitionEnd, function() {
    if (onEnd) onEnd.call(self2, enabled);
  }, timeout, true);
};
Dialog.prototype.toggleSnapped = function(enable) {
  var target = this.target;
  if (!target) return;
  if (enable == null) enable = !target.classList.contains("snapped");
  if (target.classList.contains("snapped") === enable) return;
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
  if (!target) return;
  if (enable == null) enable = !target.classList.contains("height-snapped");
  if (target.classList.contains("height-snapped") === enable) return;
  if (enable) this.move(this.x, 0);
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
  if (enable == null) enable = !this.maximized;
  if (this.maximized === enable) return;
  if (!this.target) return;
  if (enable && this.snapped && windowManager) windowManager.unsnapDialog(this);
  if (enable && this.heightSnapped) this.toggleHeightSnapped(false);
  var self2 = this;
  var content = this.content;
  this.setZ();
  this.broadcastState({ maximized: enable === true });
  this.maximizeAnimations++;
  if (flags.useViewTransitionMaximize && this.windowTarget)
    return this.windowTarget.toggleMaximizedVT(enable);
  if (supportsTransitions) !flags.compositorResize ? this.toggleClassAnimated("maximized", enable, function(name) {
    return name === "transform" || name === "width";
  }, void 0, function(isMaximized) {
    if (this.useTransform && this.target) this.toggleMinSizeConstraints(isMaximized);
    self2.maximizeAnimations--;
  }) : this.toggleClassAnimated("scaled-max", enable, function(name) {
    return name === "transform";
  }, function onEnd(enabled) {
    if (self2._animationProps._fsTimeout) clearTimeout(self2._animationProps._fsTimeout);
    var target2 = this.target;
    if (!target2) return;
    target2.classList.toggle("maximized", enabled);
    this.setScale(1, 1);
    if (!content) return;
    transformElementOld(content, 0, 0, 0, 1, 1);
    content.style.width = "";
    content.style.height = "";
    this.maximizeAnimations--;
  }, function onToggled(enabled) {
    var timeOffsetMs = 50;
    var totalDuration = 280;
    var invertDurationOnShrink = false;
    var target2 = this.target;
    if (!target2) return;
    this._maximizing = enabled;
    var startWidth = this.width;
    var startHeight = this.height;
    var windowSection = windowManager.getSnapContainer(this);
    var height = windowSection ? windowSection.clientHeight : window.innerHeight;
    var scaleX = window.innerWidth / startWidth;
    var scaleY = height / startHeight;
    target2.style.transformOrigin = enabled ? "top left" : "";
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
        transformElementOld(content, 0, 0, 0, 1 / scaleX, 1 / scaleY);
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
  if (frame) LVMessenger.broadcastToChild(type, frame, message);
};
Dialog.prototype.updateTransform = function(animate) {
  if (!(this.useTransform && this.transform)) return;
  if (this._maximizing) this.transform.move(0, 0, animate);
  else this.transform.move(this.x, this.y, animate);
};
Dialog.prototype.updatePosition = function() {
  if (!this.target) return;
  if (this.useTransform) this.updateTransform();
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
    transformElementOld(backdrop, -this.x, -this.y);
    var wallpaperWidth = wallpaperImage instanceof HTMLImageElement && wallpaperImage.clientWidth ? wallpaperImage.clientWidth : wallpaperP.clientWidth;
    var wallpaperHeight = wallpaperImage instanceof HTMLImageElement && wallpaperImage.clientHeight ? wallpaperImage.clientHeight : wallpaperP.clientHeight;
    backdrop.style.width = toPixels(wallpaperWidth);
    backdrop.style.height = toPixels(wallpaperHeight);
  } catch (ex) {
    console.warn(ex);
  }
};
Dialog.prototype.broadcastState = function(overrides) {
  if (!windowManager || !flags.broadcastWindowMoves || !document.hasFocus()) return;
  if (!this.id) return;
  windowManager.broadcast("dialog-state", overrides || this.getState(), this.id);
};
Dialog.prototype.move = function(x, y, update, animate) {
  if (this.fixed) return;
  if (flags.useSkewAnimations) {
    this._previousX = this.x;
    this._previousY = this.y;
  }
  if (typeof x === "undefined" || x === null) x = this.x;
  if (typeof y === "undefined" || y === null) y = this.y;
  if (this.heightSnapped) y = this.y;
  if (typeof this._exposeVisualScale !== "number") {
    var bounds = WindowManager.windowBounds;
    if (x < bounds.left) x = bounds.left;
    if (bounds.right !== Infinity && x > bounds.right - this.width) x = bounds.right - this.width;
    if (y < bounds.top) y = bounds.top;
    if (bounds.bottom !== Infinity && y > bounds.bottom - this.height) y = bounds.bottom - this.height;
  }
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var previousX = this._x, previousY = this._y;
  this._x = x / windowWidth;
  this._y = y / windowHeight;
  if (update !== false) {
    if (animate) this.animate(this.updatePosition);
    else this.updatePosition();
  }
  if (previousX !== this._x || previousY !== this._y) {
    var state = {};
    if (previousX !== this._x) state.x = this.x;
    if (previousY !== this._y) state.y = this.y;
    this.broadcastState(state);
  }
};
Dialog.prototype.moveToCenter = function(centerX, centerY) {
  if (typeof centerX !== "number" || typeof centerY !== "number") return;
  this.move(centerX - this.width / 2, centerY - this.height / 2);
};
Dialog.prototype.setZ = function(z) {
  if (this.fixed) return;
  var previous = this._z;
  if (typeof z === "undefined") {
    if (this._z !== windowManager.topZ) this._z = ++windowManager.topZ;
  } else this._z = z;
  if (isElement(this.target))
    this.target.style.zIndex = String(this._z);
  if (previous !== this._z) this.broadcastState({ z: this._z });
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
Dialog.prototype._setSize = function(axis, size, update, animate) {
  if (typeof size !== "number" || axis === "height" && !this.target) return;
  var isWidth = axis === "width";
  var bounds = WindowManager.windowBounds;
  var far = isWidth ? bounds.right : bounds.bottom;
  var near = isWidth ? bounds.left : bounds.top;
  var pos = isWidth ? this.x : this.y;
  if (far !== Infinity) {
    var overflow = pos + size - far;
    if (overflow > 0) {
      var newPos = pos - overflow;
      if (near !== void 0 && newPos < near) newPos = near;
      if (isWidth) this.move(newPos);
      else this.move(this.x, newPos);
    }
    size = Math.min(size, far - (isWidth ? this.x : this.y));
  }
  if (isWidth) {
    this._width = Math.max(Math.min(size, this.maxWidth), this.minWidth);
    this._isMinWidth = this._width === this.minWidth;
  } else {
    this._height = Math.max(Math.min(size, this.maxHeight), this.minHeight);
    this._isMinHeight = this._height === this.minHeight;
  }
  if (update !== false) {
    if (animate) this.animate(isWidth ? this.updateWidth : this.updateHeight);
    else if (isWidth) this.updateWidth();
    else this.updateHeight();
  }
};
Dialog.prototype.setWidth = function(width, update, animate) {
  this._setSize("width", width, update, animate);
};
Dialog.prototype.setHeight = function(height, update, animate) {
  this._setSize("height", height, update, animate);
};
Dialog.prototype.resize = function(width, height, direction) {
  if (this.fixed) return;
  if (typeof width === "undefined" || width === null) width = this.width;
  if (typeof height === "undefined" || height === null) height = this.height;
  if (this.heightSnapped) height = this.height;
  var oldWidth = this.width, oldHeight = this.height;
  if (this._aspectRatioEnabled && this._aspectRatio) this._resizeWithAspect(width, height, direction);
  else this._resizeFree(width, height, direction);
  if (oldWidth !== this.width || oldHeight !== this.height) {
    var state = {};
    if (oldWidth !== this.width) state.width = this.width;
    if (oldHeight !== this.height) state.height = this.height;
    this.broadcastState(state);
  }
};
Dialog.prototype._commitResize = function(newW, newH, newX, newY, oldX, oldY, minW, minH) {
  this._width = newW;
  this._height = newH;
  this._isMinWidth = newW === minW;
  this._isMinHeight = newH === minH;
  if (newX !== oldX || newY !== oldY) this.move(newX, newY);
  this.updateWidth();
  this.updateHeight();
};
Dialog.prototype._resizeFree = function(width, height, direction) {
  var oldX = this.x, oldY = this.y;
  var oldW = this.width, oldH = this.height;
  var bounds = WindowManager.windowBounds;
  var maxW = this._maxWidth, maxH = this._maxHeight;
  var minW = this._minWidth, minH = this._minHeight;
  width = Math.max(Math.min(width, maxW), minW);
  height = Math.max(Math.min(height, maxH), minH);
  var newW = width, newH = height;
  if (direction === "left" || direction === "bottom-left" || direction === "top-left") {
    newW = Math.min(newW, oldX + oldW - bounds.left);
  } else if (direction !== "top" && direction !== "bottom") {
    newW = Math.min(newW, bounds.right - oldX);
  }
  if (direction === "top" || direction === "top-left" || direction === "top-right") {
    newH = Math.min(newH, oldY + oldH - bounds.top);
  } else if (direction !== "left" && direction !== "right") {
    newH = Math.min(newH, bounds.bottom - oldY);
  }
  if (newW === oldW && newH === oldH) return;
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
  var oldX = this.x, oldY = this.y;
  var oldW = this.width, oldH = this.height;
  var oldRight = oldX + oldW, oldBottom = oldY + oldH;
  var bounds = WindowManager.windowBounds;
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
    if (scale < 0) scale = 0;
    newW = scale;
    newH = scale / ratio;
  } else {
    if (width < 0) width = 0;
    if (height < 0) height = 0;
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
  newW = Math.min(newW, fromLeft ? oldRight - bounds.left : bounds.right - oldX);
  newH = newW / ratio;
  var fromTop = direction === "top" || direction === "top-left" || direction === "top-right";
  newH = Math.min(newH, fromTop ? oldBottom - bounds.top : bounds.bottom - oldY);
  newW = newH * ratio;
  var minScale = Math.max(minW, minH * ratio);
  var maxScale = Math.min(maxW, maxH * ratio);
  if (newW < minScale) newW = minScale;
  if (newW > maxScale) newW = maxScale;
  newH = newW / ratio;
  if (newW === oldW && newH === oldH) return;
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
  if (newX !== oldX || newY !== oldY) this.move(newX, newY);
  this.updateWidth();
  this.updateHeight();
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
  if (this.useScale) right = void 0, bottom = void 0;
  if (this.target) insetElement(this.target, top, left, right, bottom);
};
Dialog.prototype.openUrl = function(url) {
  var frame = this.getOrCreateFrame(true);
  if (!frame) return;
  var self2 = this;
  let timeout = -1;
  frame.onload = function() {
    clearTimeout(timeout);
    self2.reportState();
  };
  if (!this.application) return;
  var baseUrls = [url || this.src, this.application.distSrc];
  if (!isLocal) baseUrls.reverse();
  var fallbackUrls = baseUrls.concat(this.application.altUrls);
  let index = 0;
  function tryNext() {
    var url2;
    while (index < fallbackUrls.length && !(url2 = fallbackUrls[index++])) ;
    if (!url2 || !frame) return;
    frame.src = url2;
    self2._src = url2;
    clearTimeout(timeout);
    timeout = setTimeout(tryNext, 3e3);
  }
  frame.addEventListener("error", tryNext);
  tryNext();
};
Dialog.prototype.refresh = function() {
  if (this.frame) this.openUrl(this.frame.src);
};
Dialog.prototype.launch = function() {
  if (!this.isOpen) this.initWithObject(this);
  if (this.mica) this.injectMica();
  this.open();
};
Dialog.prototype.kill = function() {
  var parent = this.target && this.target.parentElement;
  if (parent && this.killable && this.target) parent.removeChild(this.target);
};
Dialog.prototype.eject = function() {
  this.createPopOut();
  this.close();
};
Dialog.prototype.createPopOut = function() {
  var body = this.body;
  var titleBar = this.titleBar;
  if (!body || !this.href) return;
  var rect = body.getBoundingClientRect();
  var titleBarHeight = titleBar && titleBar.getBoundingClientRect().height || 0;
  var viewBoxPosition = getViewBoxPosition();
  this._popupWindow = window.open(this.href, this.title || "LVOS", stringifyDialogProperties({
    scrollbars: true,
    resizable: true,
    status: false,
    location: false,
    toolbar: false,
    menubar: false,
    width: rect.width,
    height: rect.height,
    left: rect.left + viewBoxPosition.x,
    top: rect.top + viewBoxPosition.y + titleBarHeight
  }));
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
      self2.moveBody(x, y);
      prevRect.x = outerX;
      prevRect.y = outerY;
    }
    if (width !== prevRect.width || height !== prevRect.height) {
      self2.resizeBody(width, height);
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
    this.toggleMinSizeConstraints(this.maximized);
  } else {
    if (this.useTransform) return;
    target.style.right = toPixels(this.right);
    target.style.bottom = toPixels(this.bottom);
  }
  target.classList.toggle("use-scale", useScale2);
  this.update();
};
Dialog.prototype.toggleMinSizeConstraints = function(isMaximized) {
  if (!this.target) return;
  this.target.style.minWidth = isMaximized ? "100%" : toPixels(this.minWidth);
  this.target.style.minHeight = isMaximized ? "100%" : toPixels(this.minHeight);
};
Dialog.prototype.injectMica = function() {
  try {
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
  if (!state) return;
  if ("open" in state) {
    if (state.open) this.launch();
    else if (this.target) this.toggleOpen(false);
  }
  if ("title" in state) this.title = state.title;
  if ("x" in state || "y" in state)
    this.move("x" in state ? state.x : this.x, "y" in state ? state.y : this.y);
  if ("z" in state && typeof state.z === "number") this.setZ(state.z);
  if ("width" in state || "height" in state)
    this.resize("width" in state ? state.width : this.width, "height" in state ? state.height : this.height);
  if ("maximized" in state) this.toggleMaximized(state.maximized === true);
};
Dialog.prototype.exportDialogBodyToMetro = function() {
};
Dialog.prototype.getElementById = function(id) {
  var doc = this.contentDocument;
  return doc && doc.getElementById(id);
};
Dialog.prototype.moveElementIntoPipById = function(id) {
  var targetElement = this.getElementById(id);
  if (targetElement && Modern) Modern.toggleElementPip(targetElement, function(window2) {
    window2.onresize = function() {
      if (!(targetElement instanceof HTMLCanvasElement)) return;
      targetElement.width = targetElement.clientWidth;
      targetElement.height = targetElement.clientHeight;
    };
  });
};
Dialog.prototype.screenshot = function() {
  if (!this.target) return;
  var shooter = getScreenShooter();
  if (shooter) shooter.screenshotElement(this.target);
};
function DragAction() {
  this.execute = function() {
  };
  var resizeFunctions = [
    function move(dialog, offset, d) {
      dialog.move(offset.startX + d.x, offset.startY + d.y);
    },
    function top(dialog, offset, d) {
      dialog.resize(offset.width, offset.height - d.y, "top");
    },
    function right(dialog, offset, d) {
      dialog.resize(offset.width + d.x, offset.height, "right");
    },
    function bottom(dialog, offset, d) {
      dialog.resize(offset.width, offset.height + d.y, "bottom");
    },
    function left(dialog, offset, d) {
      dialog.resize(offset.width - d.x, offset.height, "left");
    },
    function topLeft(dialog, offset, d) {
      dialog.resize(offset.width - d.x, offset.height - d.y, "top-left");
    },
    function topRight(dialog, offset, d) {
      dialog.resize(offset.width + d.x, offset.height - d.y, "top-right");
    },
    function bottomRight(dialog, offset, d) {
      dialog.resize(offset.width + d.x, offset.height + d.y, "bottom-right");
    },
    function bottomLeft(dialog, offset, d) {
      dialog.resize(offset.width - d.x, offset.height + d.y, "bottom-left");
    }
  ];
  this.resizeFunctions = resizeFunctions;
}
DragAction.prototype.set = function(direction) {
  this.direction = direction || 0;
  this.execute = this.resizeFunctions[this.direction] || function() {
  };
};
function DocumentCrawler(customDocument) {
  this.document = customDocument || document;
}
DocumentCrawler.prototype.getMetro = function() {
  return this.document.getElementById("metrobody");
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
window.addEventListener("dragover", cancelDomEvent, false);
window.addEventListener("drop", function(e) {
  e.preventDefault();
}, false);
var windowManager = new WindowManager();
windowManager = windowManager;
windowManager.isWindowUpdatesEnabled = true;
var bodyCrawler = new DocumentCrawler();
window.__LVMessengerReceive = messageReceived;
window.__LVMessenger = {};
function genericTyped(type) {
  return type;
}
const hey = genericTyped(document.createElement("button"));
const meow = document.createElement("applet");
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
    if (!(el instanceof HTMLElement)) return;
    if (options.onMove && options.onMove.call(self2, el)) return;
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
  document.body.style.cursor = "crosshair";
  document.addEventListener("mousemove", this.boundMove, true);
  document.addEventListener("click", this.boundClick, true);
  document.addEventListener("keydown", this.boundKey, true);
  this.status("Pick mode: click an element (Esc to cancel)");
  document.body.classList.add("picking");
};
ElementPicker.prototype.stop = function() {
  this.active = false;
  document.body.style.cursor = "";
  document.removeEventListener("mousemove", this.boundMove, true);
  document.removeEventListener("click", this.boundClick, true);
  document.removeEventListener("keydown", this.boundKey, true);
  this.status("");
  document.body.classList.remove("picking");
};
ElementPicker.prototype.highlight = function(el) {
  if (el === this.hovered) return;
  this.unhighlight();
  this.hovered = el;
  this.prevOutline = el.style.outline;
  el.style.outline = "3px solid #2f81f7";
};
ElementPicker.prototype.unhighlight = function(skipRemove) {
  if (!this.hovered) return;
  this.hovered.style.outline = this.prevOutline;
  if (skipRemove) return;
  this.hovered = null;
  this.prevOutline = "";
};
ElementPicker.prototype.onClick = function(e) {
  if (!e.isTrusted) return;
  e.preventDefault();
  e.stopPropagation();
  this.stop();
  this.unhighlight(true);
  if (this.hovered) this.onSelect(this.hovered);
  this.unhighlight();
};
ElementPicker.prototype.onKey = function(e) {
  if (e.key === "Escape") this.stop();
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
    document.body.appendChild(this.statusEl);
  }
  this.statusEl.textContent = msg;
  this.statusEl.style.display = msg ? "block" : "none";
};
const supportsCSSScrollTimeline = CSS.supports("animation-timeline", "scroll()");
function Tab(content, id) {
  this.content = document.createElement("section");
  this.content.className = "tab-page";
  this.content.id = id;
  if (content) this.content.appendChild(content);
  this.button = null;
}
Tab.prototype.createButton = function(asButton) {
  var button = null;
  if (asButton) {
    button = document.createElement("button");
  } else {
    button = document.createElement("a");
    button.href = "#" + this.content.id;
  }
  button.className = "tab-button";
  this.button = button;
  return button;
};
Tab.prototype.setTitle = function(title) {
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
    this.buttonHeader.className = "tab-header";
    this.container.appendChild(this.buttonHeader);
    this.container.appendChild(this.element);
  }
  if (parent) parent.appendChild(this.container);
}
TabScroller.prototype.addTab = function(content, title) {
  var tab = new Tab(content, "tab-" + this.tabs.length);
  this.tabs.push(tab);
  this.element.appendChild(tab.content);
  if (this.buttonHeader) {
    this.buttonHeader.appendChild(tab.createButton());
    if (title) tab.setTitle(title);
  }
  this.container.style.setProperty("--total-pages", this.tabs.length);
};
class WindowElement extends HTMLDivElement {
  constructor() {
    super();
    this.dialog = null;
  }
  connectedCallback() {
  }
  /** @param {boolean} [enable] Enable maximization */
  toggleMaximizedVT(enable) {
    this.style.viewTransitionName = "window-fullscreen";
    if (document.activeViewTransition) document.activeViewTransition.skipTransition();
    if ("startViewTransition" in document) {
      var transition = document.startViewTransition(() => this.classList.toggle("maximized", enable));
      transition.ready.catch((ev) => console.warn("transition interrupted:", ev));
      const dialog = this.dialog;
      if (dialog) transition.finished.finally(() => {
        if (dialog.maximizeAnimations <= 1)
          this.style.viewTransitionName = "";
        dialog.maximizeAnimations--;
      });
    } else this.classList.toggle("maximized", enable);
  }
}
class OdometerDigit extends HTMLSpanElement {
  constructor() {
    super();
    this.lineHeight = 40, this._value = 0;
  }
  connectedCallback() {
    this.setAttribute("is", "odometer-track");
  }
  /** @param {number} digit Digit value */
  set value(digit) {
    this.style.transform = `translateY(-${digit * this.lineHeight}px)`;
  }
  get value() {
    return this._value;
  }
}
class OdometerDisplay extends HTMLTimeElement {
  constructor() {
    super();
    this.tracks = [];
  }
  connectedCallback() {
    this.setAttribute("is", "odometer-time");
    this.textContent = "";
    this.style.display = "flex";
    this.style.overflow = "hidden";
  }
  /** @param {number} digits */
  init(digits) {
    this.innerHTML = "";
    this.tracks.length = 0;
    const height = this.clientHeight;
    for (let i = 0; i < digits; i++)
      if (height > 0) this.addDigit().lineHeight = height;
  }
  addDigit() {
    const track = document.createElement("span", { is: "odometer-track" });
    track.textContent = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9";
    if (track instanceof OdometerDigit) this.tracks.push(track);
    this.appendChild(track);
    return (
      /** @type {OdometerDigit} */
      track
    );
  }
  /**
   * @param {number} value
   * @param {number} pos
   */
  getDigit(value, pos) {
    return Math.floor(value / Math.pow(10, pos)) % 10;
  }
  /** @param {number} value */
  set value(value) {
    this.tracks.forEach((track, i) => track.value = this.getDigit(value, this.tracks.length - 1 - i));
  }
}
class OdometerTime extends OdometerDisplay {
  static get observedAttributes() {
    return ["datetime", "value"];
  }
  connectedCallback() {
    this.setAttribute("is", "odometer-time");
    if (!this.hasAttribute("value") && !this.hasAttribute("datetime") && this.textContent.trim())
      this.setAttribute("value", this.textContent.trim());
    this.buildTracks(this.currentGroupCount());
    this.update();
    this.style.overflow = "hidden";
  }
  get dateTime() {
    return this.getAttribute("datetime") || "";
  }
  set dateTime(value) {
    this.setAttribute("datetime", value);
  }
  usingValue = () => this.hasAttribute("value");
  currentGroupCount = () => this.usingValue() && this.getAttribute("value")?.split(":").length || 3;
  // datetime mode always renders HH:MM:SS (3 segments, 2 colons)
  /** @param {number} groups */
  buildTracks(groups) {
    this.textContent = "";
    this.tracks.length = 0;
    for (let i = 0; i < groups; i++) {
      const digitsInGroup = i === 0 && groups === 4 ? 3 : 2;
      for (let j = 0; j < digitsInGroup; j++) this.addDigit();
      if (i < groups - 1) this.append(":");
    }
    const height = this.clientHeight;
    if (height > 0) this.tracks.forEach((track) => {
      track.lineHeight = height;
    });
  }
  /**
   * @param {string} name Name of the attribute
   * @param {string} oldValue Old value
   * @param {string} newValue New value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === "value") this.update();
    else if (name === "datetime" && !this.usingValue()) {
      if (this.tracks.length !== 6) this.buildTracks(3);
      this.update();
    }
  }
  update() {
    let digits;
    if (this.usingValue()) {
      const value = this.getAttribute("value") || "00:00:00";
      const parts = value.split(":").map((n) => parseInt(n, 10) || 0);
      digits = [];
      parts.forEach((part, i) => {
        const width = i === 0 && parts.length === 4 ? 3 : 2;
        const str = String(part).padStart(width, "0");
        for (const ch of str) digits.push(parseInt(ch, 10));
      });
    } else {
      const date = new Date(this.dateTime), hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();
      digits = [
        Math.floor(hours / 10),
        hours % 10,
        Math.floor(minutes / 10),
        minutes % 10,
        Math.floor(seconds / 10),
        seconds % 10
      ];
    }
    this.tracks.forEach((track, i) => digits[i] !== void 0 && (track.value = digits[i]));
  }
}
const customElems = {
  "window-div": { constructor: WindowElement, extends: "div" },
  "odometer-track": { constructor: OdometerDigit, extends: "span" },
  "odometer-display": { constructor: OdometerDisplay, extends: "time" },
  "odometer-time": { constructor: OdometerTime, extends: "time" }
};
Object.entries(customElems).forEach(([name, c]) => customElements.define(name, c.constructor, c));
class Modern {
  /** @param {HTMLElement} el @param {(pipWindow: Window)=>void} callback */
  static toggleElementPip(el, callback) {
    if (typeof window.documentPictureInPicture === "undefined")
      return console.warn("Document Picture-in-Picture not supported in this browser.");
    window.documentPictureInPicture.window?.close();
    var rect = el.getBoundingClientRect();
    var width = Math.round(rect.width) || 400;
    var height = Math.round(rect.height) || 300;
    window.documentPictureInPicture.requestWindow({ width, height }).then((pipWindow) => {
      var originalParent = el.parentNode;
      var originalNextSibling = el.nextSibling;
      pipWindow.document.body.style.margin = "0";
      pipWindow.document.body.appendChild(el);
      pipWindow.addEventListener("pagehide", () => originalParent && (originalNextSibling ? originalParent.insertBefore(el, originalNextSibling) : originalParent.appendChild(el)), { once: true });
      callback(pipWindow);
    });
  }
}
"use strict";
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
  var applist = document.getElementById("applist");
  if (applist) {
    applist.addEventListener("submit", eventPrevent, false);
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
    var clock = document.createElement("time", { is: "odometer-time" });
    clock.id = "clock";
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
  document.body.ondragover = window.ondragover = function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = "copy";
  };
  document.body.ondrop = function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!ev.dataTransfer) return;
    ev.dataTransfer.dropEffect = "copy";
    var dt = ev.dataTransfer;
    if (!dt) return;
    dt.dropEffect = "copy";
    var json = dt.getData("application/json");
    var plain = dt.getData("text/plain");
    var uriList = dt.getData("text/uri-list") || "";
    var html = dt.getData("text/html") || "";
    var droppedUrl = "";
    if (uriList) {
      var line = uriList.split(/\r?\n/).find(function(entry) {
        entry = entry.trim();
        return entry && entry.charAt(0) !== "#";
      });
      droppedUrl = line ? line.trim() : "";
    }
    if (!json && plain && /^[[{]/.test(plain.trim())) json = plain.trim();
    var data = null;
    if (html) {
      try {
        var newDoc = new DOMParser().parseFromString(html, "text/html");
        var trimmed = (newDoc.body && newDoc.body.textContent || html).trim();
        if (trimmed) data = JSON.parse(trimmed);
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
      window.windowManager.dropApplication(data.app, ev.clientX, ev.clientY, data.offset, data.state);
      return;
    }
    if (!droppedUrl && plain && !/^\{|\[/.test(plain.trim())) {
      droppedUrl = plain.trim();
    }
    if (!droppedUrl) return;
    var url;
    try {
      url = new URL(droppedUrl, location.href).href;
    } catch (exception) {
      return;
    }
    if (!window.appManager || !window.windowManager) return;
    var existing = null;
    for (var id in window.appManager.apps) {
      if (window.appManager.apps.hasOwnProperty(id)) {
        var a = window.appManager.apps[id];
        if (a && (a.src === url || a.distSrc === url)) {
          existing = a;
          break;
        }
      }
    }
    if (existing) {
      window.windowManager.dropApplication(existing, ev.clientX, ev.clientY, null, null);
      return;
    }
    var newApp = window.appManager.createApp(url, url, "dropped." + Date.now());
    window.appManager.addApp(newApp);
    window.windowManager.dropApplication(newApp, ev.clientX, ev.clientY, null, null);
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
      transformElementOld(selector, width < 0 ? ev.clientX : clickOffset.clickX, height < 0 ? ev.clientY : clickOffset.clickY);
      selector.style.width = toPixels(Math.abs(width));
      selector.style.height = toPixels(Math.abs(height));
    };
    tingeling.addEventListener(supportsPointer ? "pointerdown" : "mousedown", function(ev) {
      clickOffset.init(ev.clientX, ev.clientY);
      var width = clickOffset.position.x, height = clickOffset.position.y;
      transformElementOld(selector, width < 0 ? ev.clientX : clickOffset.clickX, height < 0 ? ev.clientY : clickOffset.clickY);
      selector.style.width = toPixels(Math.abs(width));
      selector.style.height = toPixels(Math.abs(height));
      selector.className = "selector";
      if (tingeling) tingeling.appendChild(selector);
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
  if (window.desktopManager) window.desktopManager.init();
};
function createDesktop() {
  var windowSection = document.createElement("section");
  windowSection.className = "window-section";
  var wallpaper2 = document.getElementById("wallpaper")?.cloneNode(true);
  windowSection.appendChild(wallpaper2);
  var dockArea = document.getElementById("dock-area")?.cloneNode(true);
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
  if (!this.element) return;
  this.element.style.left = toPixels(x);
  this.element.style.top = toPixels(y);
  this.element.classList.add("open");
};
ContextMenu.prototype.close = function() {
  if (!this.element) return;
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
  this.desktops = [];
  this.scrollTabs = null;
}
Object.defineProperty(DesktopManager.prototype, "isExpos\xE9", {
  get: function() {
    return Boolean(document.scrollingElement && document.scrollingElement.scrollTop);
  }
});
DesktopManager.prototype.getDesktopIndexAt = function(x, y) {
  for (var i = 0; i < this.desktops.length; i++) {
    var desktop = this.desktops[i];
    var element = desktop.target;
    if (!element || !element.getBoundingClientRect) continue;
    var rect = element.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return i;
  }
  return -1;
};
DesktopManager.prototype.init = function() {
  this.scrollTabs = new TabScroller(document.querySelector("main"));
  this.addDesktop("Main", document.getElementById("window-section") || void 0);
  this.addDesktop();
  this.addDesktop();
};
DesktopManager.prototype.addDesktop = function(name, desktopElement) {
  if (!this.scrollTabs) return;
  var desktop = new Desktop(name || "Desktop " + (this.desktops.length + 1), desktopElement);
  this.scrollTabs.addTab(desktop.target);
  this.desktops.push(desktop);
  this.addOrMoveDesktopGap();
};
DesktopManager.prototype.addOrMoveDesktopGap = function() {
  if (!this.scrollTabs) return;
  if (!this.gapDesktop) {
    this.gapDesktop = document.createElement("div");
    this.gapDesktop.className = "tab-page";
  }
  this.scrollTabs.element.appendChild(this.gapDesktop);
};
function setTheme(theme) {
  document.body.classList.add(theme);
  window.windowManager.synchronizeStates();
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
DesktopManager.prototype.ensureWallpaperFrame = function() {
  var wallpaper2 = DesktopManager.getWallpaper();
  if (!wallpaper2) return null;
  var frame = document.getElementById("wallpaper-frame");
  if (frame instanceof HTMLIFrameElement) return frame;
  frame = document.createElement("iframe");
  frame.id = "wallpaper-frame";
  frame.frameBorder = "0";
  wallpaper2.appendChild(frame);
  return frame;
};
DesktopManager.prototype.clearWallpaperContent = function() {
  var wallpaper2 = DesktopManager.getWallpaper();
  if (!wallpaper2) return;
  this.wallpaperImage = null;
  while (wallpaper2.firstChild) wallpaper2.removeChild(wallpaper2.firstChild);
  wallpaper2.classList.remove("legacy-wallpaper");
  wallpaper2.classList.remove("legacy-wallpaper-image");
  wallpaper2.removeAttribute("data-blurred-src");
  wallpaper2.style.backgroundImage = "";
};
DesktopManager.prototype.applyRegisteredWallpaper = function(id) {
  this.clearWallpaperContent();
  var frame = this.ensureWallpaperFrame();
  if (!frame) return;
  if (typeof appManager != "undefined" && typeof appManager.setWallpaper == "function")
    appManager.setWallpaper(id);
  else frame.src = "https://iemand005.github.io/FrostedColours/";
};
DesktopManager.prototype.restoreDefaultWallpaper = function() {
  var defaultId = "colors";
  if (typeof appManager != "undefined" && appManager._wallpaper)
    defaultId = appManager._wallpaper.id;
  this.applyRegisteredWallpaper(defaultId);
};
DesktopManager.prototype.clearWallpaperCache = function() {
  try {
    if (typeof settings != "undefined" && settings.set) settings.set("wallpaperImage", null);
  } catch (ex) {
  }
  try {
    window.localStorage.removeItem("wallpaperImage");
  } catch (ex) {
  }
  initWallpaperDB(function(db) {
    var transaction = db.transaction(["wallpapers"], "readwrite");
    var store = transaction.objectStore("wallpapers");
    store.delete("current");
  }, function() {
  });
};
window.desktopManager = new DesktopManager();
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
    if (onFailure) onFailure(request.error);
  };
  request.onsuccess = function() {
    wallpaperDB = request.result;
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
  if (!dataUrl) return;
  try {
    if (typeof settings != "undefined" && settings.set) settings.set("wallpaperImage", dataUrl);
    else throw new Error("Settings unavailable");
  } catch (ex) {
    try {
      window.localStorage.setItem("wallpaperImage", dataUrl);
    } catch (ex2) {
    }
  }
}
function saveWallpaperToCache(blob, dataUrl) {
  if (!(blob instanceof Blob)) return;
  initWallpaperDB(function(db) {
    var transaction = db.transaction(["wallpapers"], "readwrite");
    var store = transaction.objectStore("wallpapers");
    store.put({ id: "current", blob, timestamp: Date.now() }).onerror = function() {
      localStorageFabblack(dataUrl);
    };
  }, function() {
    localStorageFabblack(dataUrl);
  });
}
function hasRegisteredWallpaperSelection() {
  if (typeof settings == "undefined" || !settings || typeof settings.get != "function") return false;
  var selection = settings.get("wallpaper");
  return typeof selection == "string" && selection.indexOf("registered:") === 0;
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
  if (hasRegisteredWallpaperSelection()) return;
  var key = "wallpaperImage";
  var cachedWallpaper;
  try {
    cachedWallpaper = typeof settings != "undefined" ? settings.get(key) : window.localStorage.getItem(key);
  } catch (ex) {
    try {
      cachedWallpaper = window.localStorage.getItem(key);
    } catch (ex2) {
    }
  }
  if (cachedWallpaper && window.desktopManager) window.desktopManager.applyWallpaperImage(cachedWallpaper);
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
  };
  wallpaper.ondrop = function(ev) {
    ev.preventDefault();
  };
}
var screenShooter = null;
function getScreenShooter() {
  if (screenShooter) return screenShooter;
  if (typeof ScreenShooter == "undefined") return null;
  return screenShooter = new ScreenShooter();
}
var picker = new ElementPicker({
  onSelect: function(el) {
    var shooter = getScreenShooter();
    if (shooter) shooter.screenshotElement(el);
  },
  onMove: function(el) {
    if (el.nodeName === "ARTICLE") {
      var dialog = windowManager.getWindowOwningElement(el);
      if (dialog && dialog.target) this.highlight(dialog.target);
    } else this.highlight(el);
    return true;
  }
});
picker.register();
"use strict";
function formatCamelCase(text) {
  if (!text) return "";
  var result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
function SettingsHandler() {
  this.storage = typeof localStorage != "undefined" && localStorage || typeof ActiveXStorage != "undefined" && new ActiveXStorage();
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
  if (typeof windowManager !== "undefined" && typeof windowManager.broadcastTheme === "function")
    windowManager.broadcastTheme();
}
function toggleColorDebug(enabled) {
  document.body.classList.toggle("color-debug", enabled);
  settings.set("color-debug", enabled);
}
function toggleSquircles(enabled) {
  document.body.classList.toggle("squircles", enabled);
  settings.set("squircles", enabled);
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
  restoreWallpaperSetting();
  setColor(settings.get("color"));
  setAccentColor(settings.get("accentColor"));
}
function updateWallpaperImageButton() {
  if (!elements.wallpaperImageButton || !elements.wallpaperSelect) return;
  elements.wallpaperImageButton.hidden = elements.wallpaperSelect.value !== "image";
}
function loadWallpaperOptions() {
  if (!elements.wallpaperSelect) return;
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
      option.textContent = app.title || id;
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
  if (typeof wallpaper2 != "string" || !wallpaper2) return;
  if (wallpaper2 === "image") return;
  if (wallpaper2.indexOf("registered:") === 0 && window.desktopManager && typeof window.desktopManager.applyRegisteredWallpaper == "function") {
    window.desktopManager.applyRegisteredWallpaper(wallpaper2.slice("registered:".length));
  }
}
function setWallpaperOption(value) {
  settings.set("wallpaper", value);
  updateWallpaperImageButton();
  if (value === "image") {
    if (typeof loadWallpaperFromCache == "function") loadWallpaperFromCache();
    return;
  }
  if (value.indexOf("registered:") === 0) {
    var id = value.slice("registered:".length);
    if (window.desktopManager && typeof window.desktopManager.applyRegisteredWallpaper == "function")
      window.desktopManager.applyRegisteredWallpaper(id);
    return;
  }
  if (window.desktopManager) {
    if (typeof window.desktopManager.restoreDefaultWallpaper == "function")
      window.desktopManager.restoreDefaultWallpaper();
    if (typeof window.desktopManager.clearWallpaperCache == "function")
      window.desktopManager.clearWallpaperCache();
  }
}
function applyWallpaperFile(files) {
  if (!files || !files.length) return;
  var file = files[0];
  if (typeof file.type != "string" || !file.type.match(/^image\//)) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    if (!e.target) return;
    var dataUrl = e.target.result;
    if (typeof dataUrl != "string" || !window.desktopManager) return;
    window.desktopManager.applyWallpaperImage(dataUrl, void 0, function() {
      console.warn("Failed to apply wallpaper image");
    });
    saveWallpaperToCache(file, dataUrl);
    settings.set("wallpaper", "image");
  };
  reader.readAsDataURL(file);
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
  if (!url) return;
  if (typeof appManager !== "undefined") {
    var app;
    if (useProxy) {
      var proxyUrl = "https://browz.netlify.app/browz-set-cookie/";
      app = appManager.createApp(
        proxyUrl + url,
        getSiteName(url),
        "custom." + getDomain(url),
        getFaviconUrl(url)
      );
    } else {
      app = appManager.createApp(url);
    }
    appManager.addApp(app);
    appManager.saveApp(app);
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
  if (charmsButton) charmsButton.onclick = function() {
    DesktopManager.toggleCharms();
  };
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
  if (elements.wallpaperSelect) elements.wallpaperSelect.onchange = function() {
    setWallpaperOption(this.value);
  };
  if (elements.wallpaperInput) elements.wallpaperInput.onchange = function() {
    applyWallpaperFile(this.files);
  };
  if (elements.wallpaperImageButton) elements.wallpaperImageButton.onclick = function() {
    if (elements.wallpaperInput) elements.wallpaperInput.click();
  };
  if (elements.installAppUrl && elements.installAppUrl.form) {
    elements.installAppUrl.form.addEventListener("submit", function(event2) {
      event2.preventDefault();
      installAppFromUrl(false);
    }, false);
  }
  if (typeof flags !== "undefined") settings.loadFlags(flags);
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
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function downloadSettings() {
  downloadObject(localStorage);
}
"use strict";
var dockAppList = document.getElementById("dockapplist");
function provisionedApp(title, id, src, extra) {
  return Object.assign({ title, id, src }, extra);
}
var applications = [
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
  Object.defineProperty(Window.prototype, "windows", {
    get: function() {
      return windowManager.windows;
    }
  });
}
function dockApp(dialog) {
  if (dockAppList && dialog) dockAppList.appendChild(dialog.createOpenButton());
}
function initApps() {
  if (typeof windowManager !== "undefined") {
    windowManager.injectApplications(applications);
    windowManager.injectApplications(games);
    windowManager.loadInstalledApps();
    windowManager.loadState();
    var windows = windowManager.windows;
    if (dockAppList) {
      if (windows.browser) dockApp(windows.browser);
      if (windows.console) dockApp(windows.console);
      if (windows.music) dockApp(windows.music);
    }
  }
  finishAppInstall();
}
function finishAppInstall() {
  if (typeof appManager !== "undefined") {
    appManager.addApps(applications, games);
    appManager.loadApps();
  }
  if (typeof restoreWallpaperSetting == "function") restoreWallpaperSetting();
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
var launchpad = typeof Launchpad !== "undefined" ? new Launchpad() : null;
function init() {
  var launchpadElement = document.getElementById("launchpad");
  if (!launchpad || !launchpadElement) return;
  launchpad.init(launchpadElement);
  if (typeof appManager !== "undefined") {
    appManager.forEachApp(launchpad.addApp.bind(launchpad));
    appManager.reloadWallpaper();
  }
  if (typeof windowManager !== "undefined" && "windowManager" in window) {
    windowManager.forEachWindow(function(dialog) {
      if (launchpad && dialog.application) launchpad.addApp(dialog);
    });
    if (!isBlink) DesktopManager.removeTheme("glass");
    windowManager.initializeDialogs();
    LVMessenger.receive(messageReceived);
  }
  if (location.protocol === "file:") {
    var scripts = document.querySelectorAll('script[type="module"]');
    scripts.forEach(function(s) {
      var replacement = document.createElement("script");
      replacement.src = s.src;
      try {
        s.replaceWith(replacement);
      } catch (ex) {
      }
    });
  }
  window.metaThemeColor = document.querySelector('meta[name="theme-color"]') || void 0;
  if (window.__LVMessenger)
    window.__LVMessenger.accent = window.metaThemeColor;
}
window.addEventListener("DOMContentLoaded", init, false);
