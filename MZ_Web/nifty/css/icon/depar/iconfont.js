(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-bumen" viewBox="0 0 1024 1024">'+""+'<path d="M512 0C229.12 0 0 229.12 0 512s229.12 512 512 512 512-229.12 512-512S794.88 0 512 0z m-34.56 700.16c0 37.12-30.72 67.84-67.84 67.84h-67.84c-37.12 0-67.84-30.72-67.84-67.84v-67.84c0-37.12 30.72-67.84 67.84-67.84H409.6c37.12 0 67.84 30.72 67.84 67.84v67.84z m-119.04-153.6v-51.2h34.56v51.2H358.4zM477.44 409.6c0 37.12-30.72 67.84-67.84 67.84h-67.84c-37.12 0-67.84-30.72-67.84-67.84v-67.84c0-37.12 30.72-67.84 67.84-67.84H409.6c37.12 0 67.84 30.72 67.84 67.84V409.6z m69.12 290.56h-51.2V665.6h51.2v34.56z m0-307.2h-51.2V358.4h51.2v34.56z m221.44 307.2c0 37.12-30.72 67.84-67.84 67.84h-67.84c-37.12 0-67.84-30.72-67.84-67.84v-67.84c0-37.12 30.72-67.84 67.84-67.84h67.84c37.12 0 67.84 30.72 67.84 67.84v67.84z m-102.4-153.6v-51.2h34.56v51.2H665.6zM768 409.6c0 37.12-30.72 67.84-67.84 67.84h-67.84c-37.12 0-67.84-30.72-67.84-67.84v-67.84c0-37.12 30.72-67.84 67.84-67.84h67.84c37.12 0 67.84 30.72 67.84 67.84V409.6z" fill="#1296db" ></path>'+""+'<path d="M409.6 307.2h-67.84c-19.2 0-34.56 15.36-34.56 34.56V409.6c0 19.2 15.36 34.56 34.56 34.56H409.6c19.2 0 34.56-15.36 34.56-34.56v-67.84c0-19.2-15.36-34.56-34.56-34.56zM700.16 307.2h-67.84c-19.2 0-34.56 15.36-34.56 34.56V409.6c0 19.2 15.36 34.56 34.56 34.56h67.84c19.2 0 34.56-15.36 34.56-34.56v-67.84c-1.28-19.2-16.64-34.56-34.56-34.56zM409.6 597.76h-67.84c-19.2 0-34.56 15.36-34.56 34.56v67.84c0 19.2 15.36 34.56 34.56 34.56H409.6c19.2 0 34.56-15.36 34.56-34.56v-67.84c0-19.2-15.36-34.56-34.56-34.56zM700.16 597.76h-67.84c-19.2 0-34.56 15.36-34.56 34.56v67.84c0 19.2 15.36 34.56 34.56 34.56h67.84c19.2 0 34.56-15.36 34.56-34.56v-67.84c-1.28-19.2-16.64-34.56-34.56-34.56z" fill="#1296db" ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)