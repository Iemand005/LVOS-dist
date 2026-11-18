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
var isBlink = "chrome" in window;
var isIE = typeof window !== "undefined" && typeof document !== "undefined" && !!window.MSInputMethodContext && document.documentMode === 11;
var transitionEndEvent = "transition" in document.documentElement.style ? "transitionend" : "webkitTransition" in document.documentElement.style ? "webkitTransitionEnd" : "transitionend";
var capabilities = {
  supportsTransitions: true,
  supportsTransform: true,
  supportsPointer: typeof window !== "undefined" && "PointerEvent" in window && !("MSPointerEvent" in window)
};
(function() {
  var style = document.createElement("div").style;
  capabilities.supportsTransitions = "transition" in style || "WebkitTransition" in style || "MozTransition" in style || "OTransition" in style || "msTransition" in style;
  capabilities.supportsTransform = "transform" in style || "webkitTransform" in style || "msTransform" in style || "mozTransform" in style || "OTransform" in style;
})();
function Helpers() {
}
Helpers.cancelDomEvent = function(event) {
  try {
    if (typeof event.preventDefault === "function") event.preventDefault();
    if (typeof event.stopPropagation === "function") event.stopPropagation();
    event.returnValue = false;
    event.cancelBubble = true;
    return false;
  } catch (ex) {
    console.warn("Failed co tancel dom evemnt.txt", ex);
  }
  return false;
};
Helpers.getFaviconUrl = function(url) {
  return "https://" + Helpers.getDomain(url) + "/favicon.ico";
};
Helpers.getDomain = function(url) {
  var regged = url.replace(/^[a-z]+:\/\/+/i, "").split("/")[0];
  return regged && regged.split("?")[0];
};
Helpers.getSiteName = function(url) {
  var domain = Helpers.getDomain(url), parts = domain && domain.split(".");
  var name = parts && (parts.length >= 2 ? parts[parts.length - 2] : parts[0]);
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : null;
};
Helpers.isElement = function(object) {
  return object && "nodeType" in object || false;
};
Helpers.getWindowChromeHeight = function(window2) {
  return window2.outerHeight - Helpers.getViewportHeight();
};
Helpers.translateElement = function(element, x, y) {
  Helpers.transformElement(element, { x, y });
};
Helpers.transformElement = function(element, t) {
  var transform = "";
  if (t.x && t.y) transform += "translate(" + Helpers.toPixels(t.x) + "," + Helpers.toPixels(t.y) + ")";
  else if (t.x) transform += "translateX(" + Helpers.toPixels(t.x) + ")";
  else if (t.y) transform += "translateY(" + Helpers.toPixels(t.y) + ")";
  if (t.skewX) transform += " skewX(" + Helpers.toDegrees(t.skewX) + ")";
  if (t.scaleX === 1) t.scaleX = void 0;
  if (t.scaleY === 1) t.scaleY = void 0;
  if (t.scaleX && t.scaleY) transform += "scale(" + t.scaleX + "," + t.scaleY + ")";
  else if (t.scaleX) transform += "scaleX(" + t.scaleX + ")";
  else if (t.scaleY) transform += "scaleY(" + t.scaleY + ")";
  if (t.rotate) transform += "rotate(" + Helpers.toDegrees(t.rotate) + ")";
  if (t.rotateX) transform += "rotateX(" + Helpers.toDegrees(t.rotateX) + ")";
  if (t.rotateY) transform += "rotateY(" + Helpers.toDegrees(t.rotateY) + ")";
  if (t.rotateZ) transform += "rotateZ(" + Helpers.toDegrees(t.rotateZ) + ")";
  if ("msTransform" in element.style) element.style.msTransform = transform;
  else element.style.transform = transform;
};
Helpers.insetElement = function(element, top, left, right, bottom) {
  if ("inset" in element.style)
    if (typeof left === "undefined") element.style.inset = Helpers.toPixels(top);
    else element.style.inset = Helpers.toPixels(top) + " " + Helpers.toPixels(right || 0) + " " + Helpers.toPixels(bottom || 0) + " " + Helpers.toPixels(left);
  else {
    if (typeof left === "undefined") left = top, right = top, bottom = top;
    element.style.top = Helpers.toPixels(top);
    element.style.left = Helpers.toPixels(left);
    if (typeof right !== "undefined") element.style.right = Helpers.toPixels(right);
    if (typeof bottom !== "undefined") element.style.bottom = Helpers.toPixels(bottom);
  }
};
Helpers.setClass = function(element, className, enabled) {
  var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
  if (typeof enabled === "undefined") enabled = element.className.indexOf(className) === -1;
  if (enabled && !re.test(element.className)) element.className = (element.className + " " + className).replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  if (!enabled) element.className = element.className.replace(re, " ").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  return element.className.indexOf(className) !== -1;
};
Helpers.getRect = function(element, index) {
  if (!element) return;
  return index ? element.getClientRects()[index] : element.getBoundingClientRect();
};
Helpers.getOverlay = function() {
  return document.getElementById("overlay");
};
Helpers.stringifyWindowOpenProperties = function(properties) {
  return JSON.stringify(properties).replace(/true/g, "yes").replace(/false/g, "no").replace(/:/g, "=").replace(/[}{"]/g, "");
};
Helpers.getViewBoxPosition = function() {
  return { x: window.screenLeft, y: window.screenTop };
};
Helpers.getViewportHeight = function() {
  var rect = WindowManager._windowRect;
  if (rect && rect.height) return rect.height;
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight || 0;
};
Helpers.getViewportWidth = function() {
  var rect = WindowManager._windowRect;
  if (rect && rect.width) return rect.width;
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth || 0;
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
  if (text !== null) try {
    return typeof text === "number" ? text : parseInt(text.replace("px", ""));
  } catch (ex) {
    console.warn("Failed to parse pixels:", ex);
  }
  return 0;
};
Helpers.flipElement = function(element, onToggled, thisArg) {
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
};
Helpers.clearFlip = function(element) {
  if (element._flipFrame) window.cancelAnimationFrame(element._flipFrame), element._flipFrame = 0;
  element.style.translate = "";
  element.style.scale = "";
  element.style.transformOrigin = "";
  element.classList.remove("flipping");
};
Helpers.animateElement = function(element, onToggled, onTransitionEnd, onEnd, thisArg, timeout, flip) {
  var boundContext = thisArg || element;
  var callEnd = function() {
    if (!state.active) return;
    state.active = false;
    if (state.timer) clearTimeout(state.timer);
    if (state.frame) window.cancelAnimationFrame(state.frame);
    if (state.handler) element.removeEventListener(transitionEndEvent, state.handler, false);
    if (element._animationState === state) element._animationState = null;
    element.classList.remove("animating");
    if (flip) Helpers.clearFlip(element);
    if (onEnd) onEnd.call(boundContext);
  };
  var previous = element._animationState;
  if (previous && previous.cancel) previous.cancel();
  var state = element._animationState = { timer: 0, frame: 0, handler: null, active: true, flip: !!flip, cancel: callEnd };
  if (!flags.useAnimations) {
    if (onToggled) onToggled.call(boundContext);
    return callEnd();
  }
  state.timer = timeout && setTimeout(callEnd, timeout) || 0;
  if (capabilities.supportsTransitions) {
    if (flip)
      Helpers.flipElement(element, onToggled, boundContext);
    else element.classList.add("animating");
    var animationHandler = function(event) {
      if (onTransitionEnd) {
        if (typeof onTransitionEnd === "string") {
          if (event.propertyName !== onTransitionEnd) return;
        } else if (!onTransitionEnd(event.propertyName)) return;
      }
      element.removeEventListener(transitionEndEvent, animationHandler, false);
      clearTimeout(state.timer);
      callEnd();
    };
    state.handler = animationHandler;
    element.addEventListener(transitionEndEvent, animationHandler, false);
  }
  if (!flip || !capabilities.supportsTransitions) {
    state.frame = window.requestAnimationFrame(function() {
      state.frame = 0;
      if (onToggled) onToggled.call(boundContext);
    });
  }
};
Helpers.formatCamelCase = function(text) {
  if (!text) return "";
  var result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
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
    if (parent) parent.style.perspective = Helpers.toPixels(this._perspective = value);
  }
});
Transformable.prototype.applyTransform = function() {
  Helpers.transformElement(this.target, this._transform);
};
Transformable.prototype.update = function(animate) {
  if (animate) Helpers.animateElement(this.target, this.applyTransform, "transform", void 0, this, 1e3);
  else this.applyTransform();
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
  if (y === void 0 && z === void 0) this._transform.rotate = x;
  else this._transform.rotateX = x, this._transform.rotateY = y, this._transform.rotateZ = z;
  this.update(animate);
};
function UIBuilder(container) {
  this.container = container;
}
UIBuilder.prototype.addHeader = function(text) {
  this.container.appendChild(Helpers.createHeader(text));
  return this;
};
UIBuilder.prototype.addList = function(items) {
  this.container.appendChild(Helpers.createList(items));
  return this;
};
UIBuilder.prototype.addNavList = function(items, container) {
  return this.addList(items.map(function(item) {
    return { label: item.label, onClick: function() {
      container.replaceChildren(item.element);
    } };
  }));
};
UIBuilder.prototype.addFileView = function(files, onFileClick, onFileDoubleClick) {
  var builder = this.addList(files.map(function(file) {
    return {
      label: file.name,
      icon: file.icon,
      onFileClick: file.onFileClick || onFileClick,
      onFileDoubleClick: file.onFileDoubleClick || onFileDoubleClick
    };
  }));
  Helpers.prepareFileDropTarget(closestFolderContent(this.container));
  return builder;
};
function VulpOS(flags2) {
  this.wm = new WindowManager();
  this.flags = flags2;
  this.Helpers = Helpers;
  this.UIBuilder = UIBuilder;
}
VulpOS.prototype.to = function(element) {
  if (typeof element === "string") element = document.getElementById(element);
  if (!element) throw new Error("Unable to find elementby ID");
  return new UIBuilder(element);
};
VulpOS.prototype.newTag = function(type) {
  return new UIBuilder(document.createElement(type || "section"));
};
var fileItemCounter = 0;
function closestFolderContent(element) {
  while (element && element.nodeType === 1) {
    if (element.classList && element.classList.contains("folder-content")) return element;
    element = element.parentNode;
  }
  return null;
}
Helpers.selectFileItem = function(element) {
  var scope = closestFolderContent(element) || document;
  var selected = scope.querySelectorAll(".file-item.selected");
  for (var i = 0; i < selected.length; i++)
    if (selected[i] !== element) selected[i].classList.remove("selected");
  if (element) element.classList.add("selected");
};
Helpers.selectFileItemsInRect = function(rect, additive, scope) {
  var items = (scope || document).querySelectorAll(".file-item");
  for (var i = 0; i < items.length; i++) {
    var itemRect = items[i].getBoundingClientRect();
    var hit = !(itemRect.right < rect.left || itemRect.left > rect.right || itemRect.bottom < rect.top || itemRect.top > rect.bottom);
    if (hit) items[i].classList.add("selected");
    else if (!additive) items[i].classList.remove("selected");
  }
};
function dockFileElement(element) {
  element.classList.remove("placed");
  element.style.position = "";
  element.style.left = "";
  element.style.top = "";
  element.style.margin = "";
}
function createFileElement(payload) {
  return Helpers.createList([{ label: payload.name, icon: payload.icon }]).firstChild;
}
function placeFileElement(element, folder, clientX, clientY) {
  var rect = folder.getBoundingClientRect();
  dockFileElement(element);
  if (element.parentNode) element.parentNode.removeChild(element);
  folder.appendChild(element);
  element.style.position = "absolute";
  element.style.left = Helpers.toPixels(clientX - rect.left - (element.offsetWidth || 80) / 2);
  element.style.top = Helpers.toPixels(clientY - rect.top - (element.offsetHeight || 88) / 2);
  element.style.margin = "0";
  element.classList.add("placed");
  Helpers.selectFileItem(element);
}
Helpers.addDesktopFile = function(file, clientX, clientY, onFileClick, onFileDoubleClick) {
  var folder = document.getElementById("desktop-folder");
  if (!folder || !file) return null;
  var list = Helpers.createList([{
    label: file.name,
    icon: "Assets/icon-192.png",
    onFileClick,
    onFileDoubleClick: onFileDoubleClick || function(droppedFile) {
      console.log(droppedFile);
    }
  }]);
  var element = list.firstChild;
  if (!element) return null;
  element.lvFile = file;
  placeFileElement(element, folder, clientX, clientY);
  return element;
};
Helpers.getDesktopFile = function(element) {
  return element ? element.lvFile : null;
};
function hasFilePayload(ev) {
  var types = ev.dataTransfer && ev.dataTransfer.types;
  if (!types) return false;
  try {
    return Array.prototype.indexOf.call(types, "application/x-lvos-file") !== -1;
  } catch (ex) {
    return false;
  }
}
Helpers.hasLvosFilePayload = hasFilePayload;
window.addEventListener("dragover", function(ev) {
  if (!hasFilePayload(ev)) return;
  ev.preventDefault();
  if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
}, true);
window.addEventListener("drop", function(ev) {
  if (!hasFilePayload(ev)) return;
  var raw = ev.dataTransfer.getData("application/x-lvos-file");
  if (!raw) return;
  ev.preventDefault();
  ev.stopPropagation();
  var payload;
  try {
    payload = JSON.parse(raw);
  } catch (ex) {
    return;
  }
  var source = payload.id && document.getElementById(payload.id);
  if (!source) source = createFileElement(payload);
  var folder = closestFolderContent(ev.target) || document.getElementById("desktop-folder") || document.body;
  var node = ev.target;
  var inList = false;
  while (node && node !== folder) {
    if (node.nodeName === "UL") {
      inList = true;
      break;
    }
    node = node.parentNode;
  }
  console.log("drop debug", JSON.stringify({ payload, sourceFound: !!source, parent: source && source.parentNode && source.parentNode.id, folder: folder.id, inList }));
  if (!inList) placeFileElement(source, folder, ev.clientX, ev.clientY);
  else {
    dockFileElement(source);
    (folder.querySelector("ul") || folder).appendChild(source);
    Helpers.selectFileItem(source);
  }
}, true);
Helpers.prepareFileDropTarget = function(folder) {
  if (!folder || folder._fileDropTargetReady) return;
  folder._fileDropTargetReady = true;
  folder.addEventListener("dragover", function(ev) {
    ev.preventDefault();
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = "move";
  }, false);
  folder.addEventListener("drop", function(ev) {
    if (!ev.dataTransfer) return;
    var raw = ev.dataTransfer.getData("application/x-lvos-file");
    if (!raw) return;
    ev.preventDefault();
    ev.stopPropagation();
    var payload;
    try {
      payload = JSON.parse(raw);
    } catch (ex) {
      return;
    }
    var source = payload.id && document.getElementById(payload.id);
    if (!source) source = createFileElement(payload);
    var node = ev.target;
    var inList = false;
    while (node && node !== folder) {
      if (node.nodeName === "UL") {
        inList = true;
        break;
      }
      node = node.parentNode;
    }
    if (!inList) {
      placeFileElement(source, folder, ev.clientX, ev.clientY);
      return;
    }
    dockFileElement(source);
    (folder.querySelector("ul") || folder).appendChild(source);
    Helpers.selectFileItem(source);
  }, false);
};
Helpers.prepareFileItem = function(element, item) {
  var downEvent = capabilities.supportsPointer ? "pointerdown" : "mousedown";
  element.id = "lv-file-" + ++fileItemCounter;
  element.draggable = true;
  element.addEventListener(downEvent, function(ev) {
    if (ev.button !== void 0 && ev.button !== 0) return;
    ev.stopPropagation();
    Helpers.selectFileItem(element);
  }, false);
  element.addEventListener("click", function() {
    if (item.onFileClick) item.onFileClick(element.lvFile || null, element);
  }, false);
  element.addEventListener("dblclick", function() {
    if (item.onFileDoubleClick) item.onFileDoubleClick(element.lvFile || null, element);
  }, false);
  element.addEventListener("dragstart", function(ev) {
    if (!ev.dataTransfer) return;
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("application/x-lvos-file", JSON.stringify({
      id: element.id,
      name: item.label,
      icon: item.icon
    }));
    ev.dataTransfer.setData("text/plain", item.label);
    Helpers.selectFileItem(element);
    element.classList.add("dragging");
  }, false);
  element.addEventListener("dragend", function() {
    element.classList.remove("dragging");
  }, false);
};
Helpers.createList = function(items) {
  var list = document.createElement("ul");
  items.forEach(function(item) {
    if (!item) return;
    var li = document.createElement("li");
    if ("state" in item) {
      var label = document.createElement("label");
      label.appendChild(document.createTextNode(item.label));
      var toggle = document.createElement("input");
      toggle.type = "checkbox";
      toggle.checked = !!item.state;
      toggle.onchange = function() {
        item.onInput(toggle.checked);
      };
      label.appendChild(toggle);
      li.appendChild(label);
    } else if ("onClick" in item) {
      var button = document.createElement("button");
      button.onclick = function() {
        item.onClick();
      };
      button.textContent = item.label;
      li.appendChild(button);
    } else if ("icon" in item) {
      var image = document.createElement("img");
      image.src = item.icon;
      image.draggable = false;
      var label = document.createElement("label");
      label.textContent = item.label;
      li.className = "file-item";
      li.appendChild(image);
      li.appendChild(label);
      Helpers.prepareFileItem(li, {
        label: item.label,
        icon: item.icon,
        onFileClick: item.onFileClick,
        onFileDoubleClick: item.onFileDoubleClick
      });
    }
    list.appendChild(li);
  });
  return list;
};
Helpers.createHeader = function(text) {
  var h = document.createElement("h2");
  h.appendChild(document.createTextNode(text));
  return h;
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
    if (key) {
      var frame = this._frames[key];
      if (frame) frame.style.display = key === id ? "block" : "none";
    }
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
Launchpad.prototype.init = function(element) {
  var closeButton = document.createElement("button");
  var self = this;
  closeButton.onclick = function() {
    self.close();
  };
  closeButton.textContent = "Close";
  element.appendChild(closeButton);
  element.appendChild(this.list);
  this.element = element;
  var container = document.getElementById("main-frame");
  if (container) mobileFrameManager.init(container);
};
Launchpad.prototype.open = function() {
  if (!this.element) return;
  this.element.classList.add("open");
};
Launchpad.prototype.close = function() {
  if (!this.element) return;
  this.element.classList.remove("open");
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
function getSiteName(url) {
  var domain = Helpers.getDomain(url);
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
Object.defineProperties(AppManager.prototype, {
  apps: {
    get: function() {
      return this._apps;
    }
  },
  installedApps: {
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
  var self = this;
  try {
    this.installedApps.forEach(function(app) {
      if (app && app.src) self.addApp(app);
    });
  } catch (exception) {
    handleStorageException(exception);
  }
};
AppManager.prototype.createApp = function(url, title, id, iconUrl) {
  var app = {
    src: url,
    id: id || "custom." + Helpers.getDomain(url),
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
AppManager.prototype.openAppInIFrame = function(id, frame, onLoad) {
  var timeout = -1;
  var src = null;
  frame.onload = function() {
    clearTimeout(timeout);
    if (onLoad) onLoad(src);
  };
  var application = this.getApp(id);
  if (!application) return;
  var baseUrls = [application.src, application.distSrc];
  if (!isLocal) baseUrls.reverse();
  var fallbackUrls = baseUrls.concat(application.altUrls);
  var index = 0;
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
LVMessenger.broadcastToParent = function(type, message, id, callback) {
  var target = getParentWindow();
  var response;
  try {
    if (target && typeof target.__LVMessengerReceive === "function")
      response = target.__LVMessengerReceive(type, message, id);
  } catch (ex) {
    console.warn("Direct parent bridge failed, falling back to postMessage.", ex);
    if (target) LVMessenger.broadcast(target, type, message, id);
  }
  if (callback) callback(response);
};
LVMessenger.get = function(type, callback) {
  LVMessenger.broadcastToParent(type, {}, void 0, callback);
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
LVMessenger.getFrameForSource = function(source) {
  if (!source) return null;
  var wm = window.windowManager;
  if (wm) {
    var dialog = wm.windows && wm.windows[source];
    return dialog && dialog.frame || null;
  }
  var manager = window.mobileFrameManager;
  if (!manager) return null;
  var frames = manager._frames;
  if (frames && frames[source]) return frames[source];
  return typeof manager.getActiveFrame === "function" ? manager.getActiveFrame() : null;
};
LVMessenger.fullscreenFrame = function(frame) {
  if (!frame) return;
  LVMessenger.broadcastToChild("prepareToLaunchOverlay", frame);
  try {
    var url = new URL(frame.src, location.href);
    url.searchParams.set("fullscreen", "true");
    frame.src = url.href;
  } catch (ex) {
    if (frame.src.indexOf("fullscreen=true") === -1)
      frame.src += (frame.src.indexOf("?") === -1 ? "?" : "&") + "fullscreen=true";
  }
  var container = document.getElementById("main-frame");
  if (container) container.classList.add("fullscreen");
  try {
    if (typeof frame.requestFullscreen === "function") {
      var request = frame.requestFullscreen();
      if (request && typeof request["catch"] === "function") request["catch"](function() {
      });
    } else if (typeof frame.msRequestFullscreen === "function") frame.msRequestFullscreen();
  } catch (ex) {
  }
};
function messageReceived(type, data, source) {
  var wm = window.windowManager;
  switch (type) {
    case "os":
      return window.os;
  }
  if (!source) return;
  var dialog = wm.windows[source];
  var frame = dialog ? dialog.frame : LVMessenger.getFrameForSource(source);
  if (dialog && type === "window-size" && data && typeof data === "object")
    dialog.resizeBody(data.width, data.height);
  switch (type) {
    case "launchOverlay":
      if (dialog) {
        var overlay = Helpers.getOverlay();
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
          if (typeof overlay.requestFullscreen === "function") overlay.requestFullscreen()["catch"](function() {
          });
          if (dialog.body) overlay.appendChild(dialog.body);
          window.setTimeout(overlay.classList.add.bind(overlay.classList, "shown"), 500);
        };
        overlay.classList.toggle("open");
      } else if (frame) LVMessenger.fullscreenFrame(frame);
      break;
    case "readyToLaunchOverlay":
      if (dialog) {
        var overlay1 = Helpers.getOverlay();
        if (!overlay1) break;
        if (dialog.body) overlay1.appendChild(dialog.body);
        window.setTimeout(overlay1.classList.add.bind(overlay1.classList, "shown"), 500);
      } else if (frame) {
        var container = document.getElementById("main-frame");
        if (container) container.classList.add("fullscreen");
      }
      break;
    case "pip":
      if (dialog) dialog.moveElementIntoPipById(data.id, data.stylesheet);
      break;
    case "visualizers":
      if (dialog && wm) dialog.messageFrame("visualizers", wm.getVisualizerApps());
      break;
  }
}
LVMessenger.messageReceived = messageReceived;
window.__LVMessengerReceive = messageReceived;
window.__LVMessenger = window.__LVMessenger || {};
LVMessenger.receive(messageReceived);
"use strict";
function SettingsHandler() {
  this.storage = typeof localStorage !== "undefined" && localStorage || typeof ActiveXStorage !== "undefined" && new ActiveXStorage();
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
  if (!saved || typeof saved !== "object") return;
  for (var flagId in saved) {
    if (!saved.hasOwnProperty(flagId)) continue;
    if (typeof flags2[flagId] === "boolean" && typeof saved[flagId] === "boolean") {
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
    switch (typeof flag) {
      case "boolean":
        var row = document.createElement("li");
        (function(currentKey) {
          var toggle = document.createElement("input");
          toggle.type = "checkbox";
          toggle.id = "flag-" + flagId;
          toggle.checked = flag || false;
          toggle.onchange = function() {
            flags2[currentKey] = toggle.checked;
            handler.saveFlags(flags2);
          };
          var label = document.createElement("label");
          label.htmlFor = toggle.id;
          label.appendChild(document.createTextNode(Helpers.formatCamelCase(flagId)));
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
    for (var index in windowManager.windows) if (windowManager.windows.hasOwnProperty(index)) windowManager.windows[index].borderSize = size;
  }
}
function hexToRGB(hex) {
  if (typeof hex === "undefined" || !hex) return;
  var bla = 0;
  return { r: bla >> 16 & 255, g: bla >> 8 & 255, b: bla & 255 };
}
function isColorDark(color) {
  if (typeof color === "undefined") return;
  var rgb = hexToRGB(color);
  if (!rgb) return false;
  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b < 128;
}
function setColor(color) {
  if (typeof color === "undefined" || !(elements.color instanceof HTMLInputElement)) return;
  settings.set("color", elements.color.value = color);
  var isWhite = isColorDark(color);
  if (!("windowManager" in window)) return;
  for (var index in windowManager.windows) if (windowManager.windows.hasOwnProperty(index)) {
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
  if (elements.accent) elements.accent.value = color;
  settings.set("accentColor", color);
  var isWhite = isColorDark(color);
  var metro = document.getElementById("metro");
  if (!metro) return;
  var metroStyle = metro.style, charmStyle = document.getElementById("charms").style;
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
  if (typeof appManager !== "undefined" && typeof appManager.forEachWallpaper === "function") {
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
  var wallpaper = settings.get("wallpaper");
  if (typeof wallpaper !== "string" || !wallpaper) return;
  if (wallpaper === "image") return;
  if (wallpaper.indexOf("registered:") === 0 && window.desktopManager && typeof window.desktopManager.applyRegisteredWallpaper === "function") {
    window.desktopManager.applyRegisteredWallpaper(wallpaper.slice("registered:".length));
  }
}
function setWallpaperOption(value) {
  settings.set("wallpaper", value);
  updateWallpaperImageButton();
  if (value === "image") {
    if (typeof loadWallpaperFromCache === "function") loadWallpaperFromCache();
    return;
  }
  if (value.indexOf("registered:") === 0) {
    var id = value.slice("registered:".length);
    if (window.desktopManager && typeof window.desktopManager.applyRegisteredWallpaper === "function")
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
  if (!files || !files.length) return;
  var file = files[0];
  if (typeof file.type !== "string" || !file.type.match(/^image\//)) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    if (!e.target) return;
    var dataUrl = e.target.result;
    if (typeof dataUrl !== "string" || !window.desktopManager) return;
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
  if (typeof colorDebug === "boolean") {
    document.body.classList.toggle("color-debug", colorDebug);
    if (elements.colorDebug) elements.colorDebug.checked = colorDebug;
  }
  var squircles = settings.get("squircles");
  if (typeof squircles === "boolean") {
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
    if (useProxy && typeof windowManager.installAppProxied === "function") {
      windowManager.installAppProxied(url);
    } else if (typeof windowManager.installApp === "function") {
      windowManager.installApp(url);
    }
    if (elements.installAppUrl) elements.installAppUrl.value = "";
  }
}
function loadElements() {
  if (typeof flags !== "undefined") settings.loadFlags(flags);
  if (!flags.bootAnimation) {
    var logo = document.getElementById("overlay");
    logo.style.display = "none";
  }
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
    elements.installAppUrl.form.addEventListener("submit", function(event) {
      event.preventDefault();
      installAppFromUrl(false);
    }, false);
  }
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
  provisionedApp("Settings App", "settings", "./Applications/Settings/settings.html"),
  provisionedApp("Extensions", "extensions", "./Applications/Extensions/extensions.html"),
  provisionedApp("Files", "files", "./Applications/Files/explorer.html"),
  provisionedApp("Frosted Colors", "colors", "Applications/FrostedColours/index.html", { distSrc: "https://iemand005.github.io/FrostedColours", wallpaper: true }),
  provisionedApp("Calculator", "calculator", "./Applications/Calculator/calculator.html", { minWidth: 180, minHeight: 40 }),
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
  provisionedApp("ColourTool", "color-tool", "Applications/ColorTool/colors.html"),
  provisionedApp("AIOne", "aione-web", "https://aione-web.pages.dev/")
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
function getWindows() {
  return windowManager.windows;
}
if (typeof windowManager !== "undefined" && "Window" in window)
  Object.defineProperty(Window.prototype, "windows", { get: getWindows });
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
  if (typeof restoreWallpaperSetting === "function") restoreWallpaperSetting();
}
finishAppInstall();
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
        var blob = new Blob([textData], { type: "text/plain" });
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
    goBack();
  });
  const blurGradient = document.createElement("div");
  blurGradient.className = "blur-gradient";
  blurGradient.classList.add("horizontal");
  const layers = 30;
  const blur = 0.2;
  const reverse = true;
  const blurLayers = [];
  for (let i = 0; i < layers; i++) {
    const element = document.createElement("div");
    const progress = Math.pow((layers - i) / layers, 0.5);
    const start = reverse ? 100 - progress * 100 : 0;
    const end = reverse ? 100 : progress * 100;
    element.style.setProperty("--blur", `${blur * i}px`);
    element.style.setProperty("--start", `${start}%`);
    element.style.setProperty("--end", `${end}%`);
    blurGradient.appendChild(element);
    blurLayers.push(element);
  }
  this.document.body.appendChild(blurGradient);
  const springBoard = document.querySelector(".spring-board");
  const rotation = document.querySelector("#rotation");
  if (!(springBoard instanceof HTMLElement)) return;
  var setProgress = function(value, max) {
    const degrees = value;
    const scale = 1 + degrees / 150;
    const blurScale = degrees / 30;
    blurLayers.forEach((element, i) => {
      element.style.setProperty("--blur", `${blur * i * blurScale}px`);
    });
    springBoard.style.transform = `perspective(5000px) rotateY(${degrees}deg) scaleX(${scale})`;
    const maskProgress = 1 - degrees / (max / 1.7);
    const opacity = Math.min(1, (maskProgress + 0.5) * 3);
    springBoard.style.setProperty("--mask", `linear-gradient(to right, rgb(0 0 0 / ${opacity}), rgb(0 0 0 / ${maskProgress}))`);
  };
  if (!(rotation instanceof HTMLInputElement)) return;
  rotation.addEventListener("input", function() {
    setProgress(Number(rotation.value), Number(rotation.max));
  });
  setProgress(0, Number(rotation.max));
  LVMessenger.onHostBeingLVOS(function() {
    document.body.classList.add("transparent");
  });
}, false);
var launchpad = typeof Launchpad !== "undefined" ? new Launchpad() : null;
function init() {
  if (typeof windowManager !== "undefined" && "windowManager" in window) {
    if (launchpad) windowManager.forEachWindow(function(dialog) {
      if (dialog.application) launchpad.addApp(dialog);
    });
    if (!isBlink) DesktopManager.removeTheme("glass");
    windowManager.initializeDialogs();
  }
  var launchpadElement = document.getElementById("launchpad");
  if (launchpad && launchpadElement) {
    launchpad.init(launchpadElement);
    if (typeof appManager !== "undefined") {
      appManager.forEachApp(launchpad.addApp.bind(launchpad));
      appManager.reloadWallpaper();
    }
  }
  if (location.protocol === "file:") try {
    var scripts = document.querySelectorAll('script[type="module"]');
    scripts.forEach(function(s) {
      var replacement = document.createElement("script");
      replacement.src = s.src;
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
  script.src = "./Scripts/Animation.js";
  document.getElementsByTagName("head")[0].appendChild(script);
}
window.onerror = function() {
  return true;
};
