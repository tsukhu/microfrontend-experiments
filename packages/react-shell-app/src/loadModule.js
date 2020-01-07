
// Ref: https://stackoverflow.com/questions/9422974/createelement-with-id
const createElement = (element, attribute, inner) => {
  if (typeof(element) === "undefined") {
    return false;
  }
  if (typeof(inner) === "undefined") {
    inner = "";
  }
  var el = document.createElement(element);
  if (typeof(attribute) === 'object') {
    for (var key in attribute) {
      el.setAttribute(key, attribute[key]);
    }
  }
  if (!Array.isArray(inner)) {
    inner = [inner];
  }
  for (var k = 0; k < inner.length; k++) {
    if (inner[k].tagName) {
      el.appendChild(inner[k]);
    } else {
      el.appendChild(document.createTextNode(inner[k]));
    }
  }
  return el;
}

const loadModule = (src, fileType = "js", id, mountId, callback, errorCallback) => {
  try {
    // defaults to javascript file
    if (fileType === null || fileType === "js") {
      const existingScript = document.getElementById(id);

      if (mountId !== null) {
        const mountPoint = document.getElementById('root');
        const mountElem = createElement("div",{"id": mountId})
        mountPoint.appendChild(mountElem);
      }

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        document.body.appendChild(script);

        script.onload = () => {
          if (callback) callback();
        };

        script.onerror = () => {
          if (errorCallback) errorCallback();
        };
      }

      if (existingScript && callback) callback();
    } else if (fileType === "css") {
      const script = document.createElement("link");
      script.rel = "stylesheet";
      script.type = "text/css";
      script.href = src;
      document.head.appendChild(script);
      script.onload = () => {
        if (callback) callback();
      };

      script.onerror = () => {
        if (errorCallback) errorCallback();
      };
    }
  } catch (error) {
    if (errorCallback) errorCallback();
  }
};



export default loadModule;
