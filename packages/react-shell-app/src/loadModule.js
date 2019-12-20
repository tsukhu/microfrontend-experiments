const loadModule = (src, id, callback,errorCallback) => {
  const existingScript = document.getElementById(id);

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
    }
  }

  if (existingScript && callback) callback();
};

export default loadModule;
