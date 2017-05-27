;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-qianjin" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M480 1024c265.152 0 480-214.848 480-480C960 278.912 745.152 64 480 64 214.912 64 0 278.912 0 544 0 809.152 214.912 1024 480 1024zM394.88 374.976c-12.48-12.48-12.48-32.768 0-45.248 6.272-6.272 14.464-9.344 22.656-9.344s16.384 3.136 22.656 9.344l191.488 191.552c12.48 12.48 12.48 32.768 0 45.248l-192.768 192.832c-12.48 12.48-32.768 12.48-45.248 0s-12.48-32.768 0-45.248l170.112-170.176L394.88 374.976z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-houtui-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M544 63.999c-265.152 0-480 214.848-480 480 0 265.089 214.848 480 480 480 265.089 0 480-214.912 480-480 0-265.152-214.912-480-480-480zM629.12 713.023c12.48 12.48 12.48 32.768 0 45.248-6.272 6.272-14.464 9.344-22.656 9.344s-16.384-3.136-22.656-9.344l-191.488-191.552c-12.48-12.48-12.48-32.768 0-45.248l192.768-192.832c12.48-12.48 32.768-12.48 45.248 0s12.48 32.768 0 45.248l-170.112 170.176 168.896 168.96z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)