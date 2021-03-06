/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/
(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this);
;
/* ========================================================================
 * Bootstrap: affix.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#affix
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
        .prop('checked', !this.$element.hasClass('active'))
        .trigger('change')
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) {
  "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  $(document).ready(function(){
    var KEY = {
          RIGHT: 39,
          LEFT:  37,
          UP:    38,
          DOWN:  40,
          TAB:   9,
          SHIFT: 16,
          ESC:   27
        },
        $megamenu = $("#megamenu"),
        relevantKeyCodes = [];

    for (var key in KEY) {
      relevantKeyCodes.push(KEY[key]);
    }

    $(document).on("keydown", "#main-menu > li > a", topLevelKeyUp);
    $(document).on("keydown", "#main-menu .dropdown-menu", dropDownMenuKeyUp);

    function topLevelKeyUp(e){
      if(relevantKeyCodes.indexOf(e.which) === -1) return;

      var $this = $(this),
          $parent = $this.parent(),
          $prev = $parent.prev(),
          $next = $parent.next(),
          $dropDownMenu = $parent.children(".dropdown-menu"),
          keyCode = e.which,
          keepOpen = false,
          $targetHyperlink;

      switch(keyCode){
        case KEY.LEFT:
          if(!$prev.length) break;
          if($parent.hasClass("open")) {
            keepOpen = true;
            $this.click();
          }
          $targetHyperlink = $prev.children("a").focus();
          if(keepOpen){
            $targetHyperlink.click();
          }
          break;
        case KEY.RIGHT:
          if(!$next.length) break;
          if($parent.hasClass("open")) {
            keepOpen = true;
            $this.click();
          }
          $targetHyperlink = $next.children("a").focus();
          if(keepOpen){
            $targetHyperlink.click();
          }
          break;
        case KEY.DOWN:
          if(!$dropDownMenu.length) break;
          $targetHyperlink = $dropDownMenu.find("a:eq(0)");
          $targetHyperlink.focus();
      }
    };

    function dropDownMenuKeyUp(e){
      if(relevantKeyCodes.indexOf(e.which) === -1) return;

      var $target = $(e.target),
          $currentContainer = $target.closest(".col, .feature-links"),
          $prevColumn       = $currentContainer.prev(".col"),
          $nextColumn       = $currentContainer.next(".col"),
          $hyperlinks       = $currentContainer.find("a"),
          hyperlinkIndex    = $hyperlinks.index($target),
          $siblingListItem;

      switch(e.which){
        case KEY.LEFT:
          if($prevColumn.length){
            // move to first hyperlink in previous column
            $prevColumn.find("a:eq(0)").focus();
          } else if($target.closest(".feature-links").length){
            if(hyperlinkIndex > 0) {
              // move to previous hyperlink in this container
              $hyperlinks.eq(hyperlinkIndex - 1).focus();
            } else {
              // from first hyperlink in feature links move to last link in last column
              $target.closest(".feature-links").prev(".yamm-content").find("a:last").focus();
            }
          } else {
            // from first hyperlink in first column move to top-level nav
            $target.closest(".dropdown-menu").prev(".dropdown-toggle").focus();
          }
          break;
        case KEY.RIGHT:
          if($nextColumn.length) {
            // move to first hyperlink in next column
            $nextColumn.find("a:eq(0)").focus();
          } else if($target.closest(".feature-links").length){
            // move between items in feature links
            // if last link then
            if($target.is(':last-child')) {
              $target.closest(".dropdown-menu").prev(".dropdown-toggle").focus();
            } else {
              $hyperlinks.eq(hyperlinkIndex + 1).focus();
            }
          } else {
            $target.closest(".dropdown-menu").find(".feature-links a:eq(0)").focus();
          }
          break;
        case KEY.DOWN:
          if($hyperlinks.eq(hyperlinkIndex + 1).length){
            // move to next hyperlink
            $hyperlinks.eq(hyperlinkIndex + 1).focus();
          } else if($nextColumn.length) {
            // move to first hyperlink in next column
            $nextColumn.find("a:eq(0)").focus();
          } else if($target.closest(".feature-links").length){
            // when there isn't a next one and we're in feature links
            $target.closest(".dropdown-menu").prev(".dropdown-toggle").focus();
          } else {
            // from last hyperlink in last column move to feature links' first hyperlink
            $target.closest(".dropdown-menu").find(".feature-links a:eq(0)").focus();
          }
          e.preventDefault();
          break;
        case KEY.UP:
          if(hyperlinkIndex > 0 && $hyperlinks.eq(hyperlinkIndex - 1).length){
            // move between hyperlinks in the current container
            $hyperlinks.eq(hyperlinkIndex - 1).focus();
          } else if($target.closest(".feature-links").length){
            // in feature links so move to last hyperlink in last column
            $target.closest(".feature-links").prev(".yamm-content").find("a:last").focus();
          } else if($prevColumn.length) {
            // 2nd or greater column so move to previous
            $prevColumn.find("a:last").focus();
          } else {
            // first hyperlink in the left column
            // need to set aria-expanded before moving focus to prevent delayed reading NVDA
            $target.closest(".dropdown-menu").prev(".dropdown-toggle").attr("aria-expanded", "false").focus().click();
          }
          e.preventDefault();
          break;
        case KEY.ESC:
          $target.closest(".dropdown-menu").prev(".dropdown-toggle").focus().click();
          break;
        case KEY.TAB:
          // only catch shift+tab
          if (!e.shiftKey) {
            break;
          }
          if (!$prevColumn.length && !$target.closest(".feature-links").length && $target.hasClass('menu-header')) {
            $target.closest(".dropdown-menu").prev(".dropdown-toggle").attr("aria-expanded", "false").focus().click();
            e.preventDefault();
          }
      }
    }



  });


  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    $this.attr("aria-expanded", isActive ? "false" : "true");

    clearMenus();

    $this.next(".dropdown-menu").attr("aria-hidden", isActive);

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#scrollspy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);
;
/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);
;
/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

  // key and value given, set cookie...
  if (arguments.length > 1 && (value === null || typeof value !== "object")) {
    options = jQuery.extend({}, options);

    if (value === null) {
      options.expires = -1;
    }

    if (typeof options.expires === 'number') {
      var days = options.expires, t = options.expires = new Date();
      t.setDate(t.getDate() + days);
    }

    return (document.cookie = [
      encodeURIComponent(key), '=',
      options.raw ? String(value) : encodeURIComponent(String(value)),
      options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
      options.path ? '; path=' + options.path : '',
      options.domain ? '; domain=' + options.domain : '',
      options.secure ? '; secure' : ''
    ].join(''));
  }

  // key and possibly options given, get cookie...
  options = value || {};
  var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
  return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;
(function ($) {

  function ieCheckShadow() {
    $('.ie-shadow').each(function() {
      $(this).css('top', function() {
        return $(this).next().offset().top;
      })
    });
  }

// Turns element into an announcement that can be hidden.
$.fn.announcement = function(options) {
  return this.each(function() {
    // User needs to accept cookies.
    if(!document.cookie) {
      return;
    }

    var announcement = $(this);
    var parent = announcement.closest('.view-announcements');
    var cookiename = announcement.attr('id');

    // If there is a cookie for this announcement, then the user has already
    // dismissed it, the announcement is already in-line display:none, so we
    // don't need to do anything further here.
    if($.cookie(cookiename)) {
      return;
    }
    // else add in the click handler
    else {
      if ($.browser.msie && parseInt($.browser.version) == 8) {
        $('body').addClass('ie8-announcement');
      }

      // Show the initially hidden announcement.
      parent.find('#' + cookiename).css('display', 'block')

      parent
        .css('display', 'block')
        .find('.close')
        .click(function() {
          $.cookie(cookiename, '1');
          parent.fadeOut(ieCheckShadow);
          parent.css("display", "none");
          // IE8 is special.
          if ($.browser.msie && parseInt($.browser.version) == 8) {
            annoucementHeight = $(".region-announcement").height();
            $('body').removeClass('ie8-announcement');
            $("#content .section:first").css("margin-top", annoucementHeight);
          }
        });
    }
  });
};

})(jQuery);
;
/*
 * SVGeezy.js 1.0
 *
 * Copyright 2012, Ben Howdle http://twostepmedia.co.uk
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 *
 * Date: Sun Aug 26 20:38 2012 GMT
 */
/*
	//call like so, pass in a class name that you don't want it to check and a filetype to replace .svg with
	svgeezy.init('nocheck', 'png');
*/
window.svgeezy=function(){return{init:function(t,i){this.avoid=t||false;this.filetype=i||"png";this.svgSupport=this.supportsSvg();if(!this.svgSupport){this.images=document.getElementsByTagName("img");this.imgL=this.images.length;this.fallbacks()}},fallbacks:function(){while(this.imgL--){if(!this.hasClass(this.images[this.imgL],this.avoid)||!this.avoid){var t=this.images[this.imgL].getAttribute("src");if(t===null){continue}if(this.getFileExt(t)=="svg"){var i=t.replace(".svg","."+this.filetype);this.images[this.imgL].setAttribute("src",i)}}}},getFileExt:function(t){var i=t.split(".").pop();if(i.indexOf("?")!==-1){i=i.split("?")[0]}return i},hasClass:function(t,i){return(" "+t.className+" ").indexOf(" "+i+" ")>-1},supportsSvg:function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")}}}();;
/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0.3
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {

      var div = document.createElement('div'),
          ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0],
          cssStyles = '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';

      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = cssStyles;

      ref.parentNode.insertBefore(div,ref);

    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );
;
!function ($) {

  "use strict";

  function accordionGroupTemplate(parentId, $heading){
    var tabSelector = $heading.attr('data-target'),
      active = $heading.parent().is('.active');

    if (!tabSelector) {
      tabSelector = $heading.attr('href');
      tabSelector = tabSelector && tabSelector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
    }

    var $tabContent = $(tabSelector),
      groupId = $tabContent.attr('id') + '-collapse';


    return '<div class="panel panel-default">' +
      '   <div class="panel-heading">' +
      '      <p class="panel-title">' +
      '        <a class="' + (active ? '' : 'collapsed') + '" data-toggle="collapse" data-parent="#' + parentId + '" href="#' + groupId + '">' +
      '           ' + $heading.html() +
      '        </a>' +
      '      </p>' +
      '   </div>' +
      '   <div id="' + groupId + '" class="panel-collapse collapse ' + (active ? 'in' : '') + '">' +
      '       <div class="panel-body">' +
      '           ' + $tabContent.html() +
      '       </div>' +
      '   </div>' +
      '</div>';
  }

  function accordionTemplate(id, $headings, clazz){
    var accordionTemplate = '<div class="panel-group ' + clazz + '" id="' + id +'">';
    $headings.each(function(){
      var $heading = $(this);
      accordionTemplate += accordionGroupTemplate(id, $heading);
    });
    accordionTemplate += '</div>';
    return accordionTemplate;
  }


  /**
   * Tab-collapse plugin definition.
   */
  $.fn.tabCollapse = function (options) {
    return this.each(function () {
      var $this = $(this),
        $headings =  $this.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]');
      options = $.extend({}, $.fn.tabCollapse.defaults, options);
      var accordionHtml = accordionTemplate($this.attr('id') + '-accordion', $headings, options.accordionClass);
      $this.after(accordionHtml);
      $this.addClass(options.tabsClass);
      $this.siblings('.tab-content').addClass(options.tabsClass);
    })
  };

  $.fn.tabCollapse.defaults = {
    accordionClass: 'visible-xs',
    tabsClass: 'hidden-xs'
  }

}(window.jQuery);;
/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.12
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}};return j}));
;
/*jslint browser: true, nomen: true, white: true */
/*global $, jQuery, svgeezy*/

(function ($) {

  /**
   * Captures an a-z link to an anchor on the same page , and scrolls to the
   * anchor, Prevents page refresh when there is no need.
   * Note: Some pages have links to anchors on this page, so we need to make
   * sure we aren't killing those links
   *
   * @param  Event | e
   */
  function aZIndexLinks(e) {
    var currentPath = window.location.pathname.split('#')[0],
      link = $(e.target).attr('href'),
      hash = link.split('#', 2)[1],
      linkPath = link.split('#', 2)[0],
      scrollTo,
      name = null;


    if (hash && linkPath && currentPath === linkPath) {
      e.preventDefault();

      hash = hash.toString();
      name = $('[name=' + hash + ']');

      scrollTo = $('[name=' + hash + ']').offset().top;
      $('html, body').animate({
        scrollTop: scrollTo
      }, 500);
    }
  }

  function getIEVersion() {
    var agent = navigator.userAgent;
    var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
    var matches = agent.match(reg);
    if (matches != null) {
      return {
        major: matches[1],
        minor: matches[2]
      };
    }
    return {
      major: "-1",
      minor: "-1"
    };
  }

  function posTop() {
    return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
  }

  function handleScroll() {
    if (posTop() > 100) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
  }

  /**
   * Ensure the active tab has screen-reader only text to indicate that this
   * is the case. This function should be called everytime there is a change
   * to the tabs.
   *
   * @param Object $selector
   *   The jQuery selector for the tabs parent, this should be the <ul>.
   */
  function accessibleTabTitles($selector, firstRun) {
    firstRun = firstRun || false;
    if (firstRun) {
      $selector.find('li:first-child a').append('<span class="sr-only">(active tab)</span>');
    }
    else {
      $selector.find('span').remove();
      $selector.find('li.active a').append('<span class="sr-only">(active tab)</span>');
    }
  }

  $(document).ready(function () {

    // Drupal's misc.js adds the class of "js" here.
    $('html').removeClass('no-js');

    // Do it in document.ready to stop visual out zoom on load.
    // Set custom zoom level on premise page for leaflet map.
    if (typeof Drupal.settings.leaflet != 'undefined' && $('body').hasClass('page-moh-premise')) {
      // Get the map on the map.
      var map = Drupal.settings.leaflet[0].lMap;
      // Set a zoom level.
      map.setZoom(16);
    }

    $('.a-z-index a').on('click', function (e) {
      aZIndexLinks(e);
    });

    // Print button.
    $('#block-moh-tools-page-tools .print').click(function () {
      window.print();
      return false;
    })

    // Initialize SVG backwards support.
    svgeezy.init(false, 'png');

    //table functions
    $('.pane-node-content table, .tabbable table').each(function () {
      if ($(this).parent().hasClass('responsive-table')) {
      }
      else {
        if (($(this).css("float") == "left" ) || ($(this).css("float") == "right" )) {
          $(this).addClass('floated-table');
        }
        else {
          $(this).addClass('table').wrap('<div class="table-responsive"></div>');
        }
      }
    });

    // Navbar classes.
    $('.navbar-collapse .dropdown-menu a').click(function () {
      $(this).addClass('clicked');
    });

    // Clicking for search facet collapsible sections.
    $(document).on('click tap', '.solr-search-facets.active .panel-pane .pane-title', function () {
      $(this).toggleClass('open');
      $(this).next().toggle();
    });

    $(document).on('click tap', '.solr-search-facets.active .pane-1 .pane-title', function () {
      $('.solr-search-facets.active .panel-pane').toggle();
    });

    // Closable popovers.
    $.fn.extend({
      popoverClosable: function (options) {
        var defaults = {
          template: '<div class="popover">\
<div class="arrow"></div>\
<div class="popover-header">\
<button type="button" class="close" data-dismiss="popover" aria-hidden="true">&times;</button>\
<h3 class="popover-title"></h3>\
</div>\
<div class="popover-content"></div>\
</div>'
        };
        options = $.extend({}, defaults, options);
        var $popover_togglers = this;
        $popover_togglers.popover(options);
        $popover_togglers.on('click', function (e) {
          e.preventDefault();
          $popover_togglers.not(this).popover('hide');
        });
        $('html').on('click', '[data-dismiss="popover"]', function () {
          $popover_togglers.popover('hide');
        });
      }
    });

    $('.navbar-toggle').click(function () {
      var $this = $(this),
          wasActive = $this.hasClass("active");

      $this.toggleClass('active', !wasActive);
      $this.attr("aria-expanded", !wasActive);

    });

    // Service links popover.
    $('.share-this-content').popoverClosable();
    $('.share-this-content').click(function () {
      return false;
    });

    $(document).on('click', '.yamm .dropdown-menu', function (e) {
      e.stopPropagation();
    });

    // PRMS - fix PRMS Search blocks.
    $('#edit-name-submit').appendTo('div.form-item-name');
    $('#edit-submit-prms-solr').appendTo('div.form-item-city-town');
    $('.pane-prms-solr-result-list-right .search-results-right').appendTo('.facetapi-facet-im-field-premise-dhb li.expanded li.leaf');
    $('.pane-prms-solr-result-list-right').remove();

    // Fix issue where pressing enter from city town search submitted the
    // form using the name submit button.
    if ($('#views-exposed-form-prms-solr-prms-solr-results, #views-exposed-form-prms-solr-prms-solr-map').length) {
      $('#edit-city-town').on('keyup keypress', (function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
          e.preventDefault()
          e.stopPropagation();
          $('#edit-submit-prms-solr').click();
        }
       }));
    }

    // Make the videos responsive.
    $(".panel-pane").fitVids();

    $('#edit-name').keyup(function (e) {
      if (e.keyCode == 13) {
        $('#edit-name-submit').click();
      }
    });

    // Switch tabs to accordions on mobile devices.
    // @see https://github.com/flatlogic/bootstrap-tabcollapse
    $('#quicktabs-moh_topic_sheet_tabs .nav.nav-tabs').tabCollapse();
    $('.pane-moh-bootstrap-theme-section-outline #accordion').collapse();

    $('#quicktabs-moh_premise_tabs .nav.nav-tabs').tabCollapse();
    $('#quicktabs-moh_premise_tabs1-collapse').collapse();

    // Scroll to expanded accordion top.
    $('#undefined-accordion .collapsed').click(function () {
      $('html, body').animate({
        scrollTop: $('#undefined-accordion').offset().top
      }, 20);
    });

    // Set focus on expanded accordion title, only do this when you expand
    // the accordion. This is for mobile devices.
    $('#undefined-accordion .panel-heading a').on('click', function () {
      if ($(this).attr('class') == 'collapsed') {
        var accordionContentId = $(this).attr('href');
        $(accordionContentId + ' h2.tab-title').focus();
      }
    });

    // Set the focus on tab select on desktop or tablets.
    $('#quicktabs-moh_premise_tabs .nav-tabs a, \
           #quicktabs-moh_topic_sheet_tabs .nav-tabs a').on('click', function () {
      var accordionContentId = $(this).attr('href');
      $(accordionContentId + ' h2.tab-title').focus();
    });

    // Add screen-reader only text when a tab is clicked.
    accessibleTabTitles($('#quicktabs-moh_premise_tabs ul.nav-tabs, #quicktabs-moh_topic_sheet_tabs ul.nav-tabs'), true);
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      accessibleTabTitles($(e.target).parents('ul'));
    });

    // Scroll to expanded accordion top.
    $('#navbar #main-menu .dropdown-toggle').click(function () {
      $('.navbar-collapse').scrollTo("0px", 0);
    });

    // We don't want any accordion expanded by default.
    $('#undefined-accordion .panel-heading a').not('.collapsed').addClass('collapsed');
    $('#quicktabs-moh_topic_sheet_tabs #summary-collapse').removeClass('in').addClass('collapse');

    // Add CSS classes for older Android devices.
    var ua = navigator.userAgent;
    if (ua.indexOf("Android") >= 0) {
      var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
      if (androidversion <= 2.3) {
        $('body').addClass('old-android');
        $('.search-toggle').click(function () {
          window.location = '/search/results';
        });
      }
    }

    var ie_version = getIEVersion();
    if (ie_version.major == 10 && ie_version.major >= 0) {
      $("html").addClass("ie10");
    }
    if (ie_version.major <= 9 && ie_version.major >= 0) {
      $("html").addClass("ie9");
    }
    if (ie_version.major <= 8 && ie_version.major >= 0) {
      $("html").addClass("ie8");
    }
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      $('html').addClass('ie');
    }

    // Help out IE8.
    if ($('html.ie8').length) {
      $('*:last-child').addClass('last-child');
    }

    // If not IE8 or below, then add a little "Scroll to the top" widget.
    if ($('html.ie8').length === 0) {
      var scrollTimer = null;
      $(window).scroll(function () {
        if (scrollTimer) {
          clearTimeout(scrollTimer);   // clear any previous pending timer
        }
        scrollTimer = setTimeout(handleScroll, 500);   // set new timer
      });

      // Click event to scroll to top.
      $('.scrollToTop').click(function () {
        $('html, body').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
    }

    $("#skipper").click(function () {
      $('#skip-content').next().attr('tabIndex', -1).focus();
    });

    // So users don't have to scroll down to view results after submitting a
    // rest home search.
    if (window.location.pathname == '/your-health/certified-providers/aged-care'
      && (query_param_exists('name') || query_param_exists('city_town'))) {
      window.location.hash = 'prms_solr-prms_solr_search_form';
    }

    // Initialise homepage sliders.
    initialiseHomepageSliders();

  });

  /**
   * Collapsible righthand nav for mobile.
   */
  function rightMenuCollapse() {
    if (!$('body').hasClass('node-type-book')) {
      return;
    }
    var mobileWidth = 992,
      panel = $('.right .menu').closest('.panel-panel.right');

    panel.height('auto');

    if (viewport().width < mobileWidth) {
      // Set initial mobile state.
      $('.right .menu li.depth-1 > ul').addClass('collapse').removeClass('in');
    }
    else {
      // Reset for sizing.
      $('.right .menu li.depth-1 > ul').addClass('collapse in');
    }

    $('.right .menu li.depth-1 > a').on('click', function (e) {
      if (viewport().width < mobileWidth) {
        e.preventDefault();
        var target = $(this).siblings('ul'),
          collapsed = target.hasClass('collapse');

        panel = $(this).closest('.panel-panel.right');

        if (target.hasClass('collapsing')) {
          return false; //if still animating, abort event
        }

        if (collapsed) {
          $('.right .menu li.depth-1 > ul').collapse('show');
          $(this).addClass('open');
        }
        else {
          $('.right .menu li.depth-1 > ul').collapse('hide');
          $(this).removeClass('open');
        }
      }
    });
  }

  // Viewport to media query fixes.
  function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) { //I don't think in does that... does this work?
      a = 'client';
      e = document.documentElement || document.body;
    }
    return { width: e[ a + 'Width' ], height: e[ a + 'Height' ] };
  }

  function windowResize() {
    var b = 767;
    if (viewport().width <= b) {
      $(".solr-search-facets").addClass("active");
    }
    else {
      $(".solr-search-facets").removeClass("active");
    }
  }

  function searchResize() {
    if ($('.solr-search-facets.active').length) {
      if (!$('body').hasClass('search-moved-tablet')) {
        $('body').addClass('search-moved-tablet');
        $('.pane-page-title, p.intro-text, .pane-apachesolr-form, .pane-apachesolr-info').prependTo('.left');
        $('.pane-current-search-moh-current-search').appendTo('.left');

        if ($('body').hasClass('page-publications')) {
          $('.pane-apachesolr-info').appendTo('.left');
          $('.pane-current-search-moh-current-search').appendTo('.left');
        }
      }
    }
    else {
      if ($('body').hasClass('search-moved-tablet')) {
        $('.pane-page-title, p.intro-text, .pane-apachesolr-form, .pane-apachesolr-info').prependTo('.middle');
        $('.pane-current-search-moh-current-search').prependTo('.left');
        $('body').removeClass('search-moved-tablet');
      }
    }
    if ($('#moh-prms-map.active').length) {
      if (!$('body').hasClass('maps-moved-tablet')) {
        $('body').addClass('maps-moved-tablet');
        $('.pane-pst-csv').appendTo('.middle');
      }
    }
    else {
      if ($('body').hasClass('maps-moved-tablet')) {
        $('.pane-pst-csv').appendTo('.left');
        $('body').removeClass('maps-moved-tablet');
      }
    }

    if ($('#moh-prms-map-results.active').length) {
      if (!$('body').hasClass('maps-moved-tablet-results')) {
        $('body').addClass('maps-moved-tablet-results');
        $('.pane-pst-csv').appendTo('.right');
      }
    }
    else {
      if ($('body').hasClass('maps-moved-tablet-results')) {
        $('.pane-pst-csv').appendTo('.left');
        $('body').removeClass('maps-moved-tablet-results');
      }
    }
  }

  /**
   * Grab anchor link if there is one and scroll to it.
   */
  function goToHash() {
    if ($('.ie8').length > 0) {
      return;
    }
    var hash = escapeHtml(window.location.hash.substring(1));
    var name = null;
    var scrollTo = 0;

    if (hash.length > 0) {
      name = $('[name=' + hash + ']');
    }

    if (name !== null && name.length > 0) {
      scrollTo = name.offset().top;
      $('html, body').animate({
        scrollTop: scrollTo
      }, 500);
    }
  }

  /**
   * Test if parameter exists in query string
   */
  function query_param_exists(key) {
    return location.search.indexOf(key) != -1;
  }

  $(window).load(function () {
    $('#undefined-accordion .panel-heading, #accordion .panel-heading').each(function () {
      $(this).find('a').append('<span class="caret" />');
    });
    if ($('.ie10').length) {
      var iestring = $('.ie #footer_logos .first img').attr("src");
      iestring = iestring.substring(0, iestring.indexOf('.svg'));
      $('.ie #footer_logos .first img').attr("src", (iestring + ".png"));
    }
    // android device detection
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if (isAndroid) {
      $('body').addClass('android');
    }
    var androidversion = parseFloat(ua.slice(ua.indexOf("android") + 8));
    if (androidversion < 3.6) {
      $('body').addClass('androidthree');
    }

    //fix captioned images.
    $('figure.image-captioned').each(function () {
      $(this).width($(this).find('img').attr('width'));
    });

    windowResize();
    searchResize();
    rightMenuCollapse();
    goToHash();
  });

  $(window).bind('resizeEnd', function () {
    windowResize();
    searchResize();
    rightMenuCollapse();
  });

  $(window).resize(function () {
    if (this.resizeDelay) {
      clearTimeout(this.resizeDelay);
    }
    // Make sure resize event isn't executing every millisecond.
    this.resizeDelay = setTimeout(function () {
      $(this).trigger('resizeEnd');
    }, 500);
  });

  // Add aria elements on tabs on load.
  $(window).load(function () {
    var uniqueId = function(prefix) {
      return (prefix || 'ui-id') + '-' + Math.floor((Math.random()*1000)+1)
    }
    var $tablist = $('.nav-tabs, .nav-pills')
        , $tabs = $tablist.find('[data-toggle="tab"], [data-toggle="pill"]')

    if ($tabs){
      $tabs.each(function( index ) {
        var tabpanel = $($(this).attr('href'))
          , tab = $(this)
          , tabid = tab.attr('id') || uniqueId('ui-tab')

        if (tab.parent().hasClass('active')){
          tab.attr( { 'tabIndex' : '0', 'aria-selected' : 'true', 'aria-controls': tab.attr('href').substr(1) } )
          tabpanel.attr({ 'role' : 'tabpanel', 'tabIndex' : '0', 'aria-hidden' : 'false', 'aria-labelledby':tabid })
        } else {
          tab.attr( { 'tabIndex' : '-1', 'aria-selected' : 'false', 'aria-controls': tab.attr('href').substr(1) } )
          tabpanel.attr( { 'role' : 'tabpanel', 'tabIndex' : '-1', 'aria-hidden' : 'true', 'aria-labelledby':tabid } )
        }
      })
    }
  });

  // Flexslider.
  var timer;
  function initialiseHomepageSliders() {
    var sliders = $('.para-slider, .home-page-slider-items');
    if (sliders.length){
      sliders.removeClass('nojs');
      result = createSlider();

      // Monitor for breakpoints to reinitialise.
      $(window).on('resize', function(){
        // Delay execution so slider doesn't
        // reinitialise a thousand times.
        window.clearTimeout(timer);
        timer = window.setTimeout(function(){
          createSlider();}, 200);
      });

      // Show slider after initialisation..
      var curHeight = sliders.height(),
          autoHeight = sliders.css('height', 'auto').height();
      sliders.height(curHeight)
        .delay(500)
        .animate(
          {opacity: 1, height: autoHeight},
          {
            duration:100,
            easing: "swing",
            complete: function() {
                // Fix for overflow:hidden that's added while animating.
                // Navigation arrows will be hidden without this.
                $(this).css('overflow', 'visible');
              }
          });
    }
  }

  /**
   * Create the appropriate slider based on the breakpoint.
   */
  function createSlider() {
    var breakpoint = minBreakpoint();
    var container = $('.para-slider, .home-page-slider-items');
    var options = {
      animation: "slide",
      animationLoop: false,
      slideshow: false,
      controlNav: false,
      // Remove the navigation from tabindex.
      after: function(slider){
        $(slider).find('.flex-prev, .flex-next').attr({
          'tabindex': '-1',
          'aria-hidden': 'true'
        });
      },
    };
    switch(breakpoint) {
      case 0:
      case 480:
        options['minItems'] = 1;
        options['maxItems'] = 1;
        options['move'] = 1;
        options['itemWidth'] = 0;
        options['itemMargin'] = 0;
        break;

      case 768:
        options['minItems'] = 2;
        options['maxItems'] = 2;
        options['move'] = 2;
        options['itemWidth'] = 285;
        options['itemMargin'] = 24;
        break;

      case 992:
      case 1200 :
      default:
        options['minItems'] = 4;
        options['maxItems'] = 4;
        options['move'] = 4;
        options['itemWidth'] = 210;
        options['itemMargin'] = 24;
        break;
    }

    // Create or refresh the slider.
    if (container.data("flexslider")) {
      starting_slide = container.data("flexslider").currentSlide;
      options['startAt'] = starting_slide;
      container.removeData("flexslider");
      // Reinitialise.
      slider = container.flexslider(options);
      // Remove the old containers.
      // This had to be done manually since the destroy method
      // still hasn't been implemented in the core version.
      // https://github.com/woocommerce/FlexSlider/pull/771
      container.find('.flex-direction-nav').first().remove();
      container.find('.flex-viewport').first().remove();
    }
    else {
      slider = container.flexslider(options);
    }

    // Check focus events and recenter.
    slide_links = container.find('.slides > li > a');
    slide_links.focus(function(event) {
      var index = slide_links.index($(this));
      var slider_obj = container.data('flexslider');
      var move = typeof slider_obj.move !== 'undefined' ? slider_obj.move : 1;
      var screen = index !== 0 ? Math.floor(index/move) : 0;
      slider_obj.flexAnimate(screen);

      // Ensure the viewport has not scrolled.
      // Fix for https://github.com/woocommerce/FlexSlider/issues/25
      var viewport = slider_obj.find('.flex-viewport');
      viewport.scrollTo(0, 0);
      setTimeout(function() {
        viewport.scrollTo(0, 0);
      }, 0);
    });

    // Remove the navigation from tabindex.
    slider.find('.flex-prev, .flex-next').attr({
      'tabindex': '-1',
      'aria-hidden': 'true'
    });
    return slider;
  }

  /** Helper function for breakpoints.
   * Used in flexslider
   */

  function minBreakpoint() {
      var bps = [0, 480, 768, 992, 1200],
      w = $(window).width();
      for (var i = 1; i < bps.length; i++) {
        // If the current screen width is less than the breakpoint,
        // return the previous breakpoint.
        if (w < bps[i]) {
          return bps[i-1];
        }
      }
      // Return the last breakpoint if the screen width is greater
      // than all.
      return bps[bps.length - 1];
  }

}(jQuery));



/**
 * Helper function to escape HTML strings.
 * Based off example on http://benv.ca/2012/10/02/you-are-probably-misusing-DOM-text-methods/
 */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\//g, "&#x2F;")
}
;
/**
 * Custom event tracking for the site
 */

// Using the closure to map jQuery to $.
(function ($) {
$(document).ready(function () {
  // Make sure GA is defined on the page before firing random events
  if (typeof(ga) != 'undefined') {
    // Quicktab and accordion clicks should be events.
    $('#block-system-main .nav-tabs a').click(function() {
      ga('send', 'event', 'quicktab', 'click', $(this).text().toLowerCase());
    });
    $('#block-system-main .panel-heading a').click(function() {
      ga('send', 'event', 'accordion', 'click', $(this).text().toLowerCase());
    });
    // share clicks should be events
    $('#block-moh-tools-page-tools .fa-share').click(function() {
      ga('send', 'event', 'share', 'click', document.location.pathname);
    });

    try {
      (function() {
        var afterPrint = function() {
          ga('send', 'event', 'print', 'click', document.location.pathname);
        };

        // Track print event in Chrome, mediaquery bug
        // @see http://code.google.com/p/chromium/issues/detail?id=85013
        // the print event fires 4 times for each single print query initiated,
        // prevent more than 1 from running.
        if (window.matchMedia) {
          var mediaQueryList = window.matchMedia('print');
          var mqlListenerCount = 0;
          mediaQueryList.addListener(function(mql) {
            mqlListenerCount++;
            if (!mql.matches && mqlListenerCount % 4 == 0){
              afterPrint();
            }
          });
        }
        window.onafterprint = afterPrint;
      }());
    }
    catch(e) {}
  }
});
})(jQuery);
;
/*! bootstrap-accessibility-plugin - v1.0.2 - 2014-07-01
* https://github.com/paypal/bootstrap-accessibility-plugin
* Copyright (c) 2014 PayPal Accessibility Team; Licensed BSD */
!function($){"use strict";var uniqueId=function(prefix){return(prefix||"ui-id")+"-"+Math.floor(1e3*Math.random()+1)},removeMultiValAttributes=function(el,attr,val){var describedby=(el.attr(attr)||"").split(/\s+/),index=$.inArray(val,describedby);-1!==index&&describedby.splice(index,1),describedby=$.trim(describedby.join(" ")),describedby?el.attr(attr,describedby):el.removeAttr(attr)};$(".alert").attr("role","alert"),$(".close").removeAttr("aria-hidden").wrapInner('<span aria-hidden="true"></span>').append('<span class="sr-only">Close</span>');var showTooltip=$.fn.tooltip.Constructor.prototype.show,hideTooltip=$.fn.tooltip.Constructor.prototype.hide;$.fn.tooltip.Constructor.prototype.show=function(){showTooltip.apply(this,arguments);var $tip=this.tip(),tooltipID=$tip.attr("id")||uniqueId("ui-tooltip");$tip.attr({role:"tooltip",id:tooltipID}),this.$element.attr("aria-describedby",tooltipID)},$.fn.tooltip.Constructor.prototype.hide=function(){return hideTooltip.apply(this,arguments),removeMultiValAttributes(this.$element,"aria-describedby",this.tip().attr("id")),this};var showPopover=$.fn.popover.Constructor.prototype.setContent,hidePopover=$.fn.popover.Constructor.prototype.hide;$.fn.popover.Constructor.prototype.setContent=function(){showPopover.apply(this,arguments);var $tip=this.tip(),tooltipID=$tip.attr("id")||uniqueId("ui-tooltip");$tip.attr({role:"alert",id:tooltipID}),this.$element.attr("aria-describedby",tooltipID),this.$element.focus()},$.fn.popover.Constructor.prototype.hide=function(){return hidePopover.apply(this,arguments),removeMultiValAttributes(this.$element,"aria-describedby",this.tip().attr("id")),this},$(".modal-dialog").attr({role:"document"});var modalhide=$.fn.modal.Constructor.prototype.hide;$.fn.modal.Constructor.prototype.hide=function(){var modalOpener=this.$element.parent().find('[data-target="#'+this.$element.attr("id")+'"]');modalhide.apply(this,arguments),console.log("modalOpener",modalOpener),modalOpener.focus()};var $par,firstItem,toggle="[data-toggle=dropdown]",focusDelay=200,menus=$(toggle).parent().find("ul").attr("role","menu"),lis=menus.find("li").attr("role","presentation");lis.find("a").attr({role:"menuitem",tabIndex:"-1"}),$(toggle).attr({"aria-haspopup":"true","aria-expanded":"false"}),$(toggle).parent().on("shown.bs.dropdown",function(){$par=$(this);var $toggle=$par.find(toggle);$toggle.attr("aria-expanded","true"),setTimeout(function(){firstItem=$(".dropdown-menu [role=menuitem]:visible",$par)[0];try{firstItem.focus()}catch(ex){}},focusDelay)}),$(toggle).parent().on("hidden.bs.dropdown",function(){$par=$(this);var $toggle=$par.find(toggle);$toggle.attr("aria-expanded","false")}),$.fn.dropdown.Constructor.prototype.keydown=function(e){var $par;/(32)/.test(e.keyCode)&&($par=$(this).parent(),$(this).trigger("click"),e.preventDefault()&&e.stopPropagation())},$(document).on("focusout.dropdown.data-api",".dropdown-menu",function(){var $this=$(this),that=this;setTimeout(function(){$.contains(that,document.activeElement)||($this.parent().removeClass("open"),$this.parent().find("[data-toggle=dropdown]").attr("aria-expanded","false"))},150)}).on("keydown.bs.dropdown.data-api",toggle+", [role=menu]",$.fn.dropdown.Constructor.prototype.keydown);var $tablist=$(".nav-tabs, .nav-pills"),$lis=$tablist.children("li"),$tabs=$tablist.find('[data-toggle="tab"], [data-toggle="pill"]');$tablist.attr("role","tablist"),$lis.attr("role","presentation"),$tabs.attr("role","tab"),$tabs.each(function(){var tabpanel=$($(this).attr("href")),tab=$(this),tabid=tab.attr("id")||uniqueId("ui-tab");tab.attr("id",tabid),tab.parent().hasClass("active")?(tab.attr({tabIndex:"0","aria-selected":"true","aria-controls":tab.attr("href").substr(1)}),tabpanel.attr({role:"tabpanel",tabIndex:"0","aria-hidden":"false","aria-labelledby":tabid})):(tab.attr({tabIndex:"-1","aria-selected":"false","aria-controls":tab.attr("href").substr(1)}),tabpanel.attr({role:"tabpanel",tabIndex:"-1","aria-hidden":"true","aria-labelledby":tabid}))}),$.fn.tab.Constructor.prototype.keydown=function(e){var $items,index,$this=$(this),$ul=$this.closest("ul[role=tablist] "),k=e.which||e.keyCode;if($this=$(this),/(37|38|39|40)/.test(k)){$items=$ul.find("[role=tab]:visible"),index=$items.index($items.filter(":focus")),(38==k||37==k)&&index--,(39==k||40==k)&&index++,0>index&&(index=$items.length-1),index==$items.length&&(index=0);var nextTab=$items.eq(index);"tab"===nextTab.attr("role")&&nextTab.tab("show").focus(),e.preventDefault(),e.stopPropagation()}},$(document).on("keydown.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',$.fn.tab.Constructor.prototype.keydown);var tabactivate=$.fn.tab.Constructor.prototype.activate;$.fn.tab.Constructor.prototype.activate=function(element,container){var $active=container.find("> .active");$active.find("[data-toggle=tab], [data-toggle=pill]").attr({tabIndex:"-1","aria-selected":!1}),$active.filter(".tab-pane").attr({"aria-hidden":!0,tabIndex:"-1"}),tabactivate.apply(this,arguments),element.addClass("active"),element.find("[data-toggle=tab], [data-toggle=pill]").attr({tabIndex:"0","aria-selected":!0}),element.filter(".tab-pane").attr({"aria-hidden":!1,tabIndex:"0"})};var $colltabs=$('[data-toggle="collapse"]');$colltabs.attr({role:"tab","aria-selected":"false","aria-expanded":"false"}),$colltabs.each(function(){var colltab=$(this),collpanel=$(colltab.attr("data-target")?colltab.attr("data-target"):colltab.attr("href")),parent=colltab.attr("data-parent"),collparent=parent&&$(parent),collid=colltab.attr("id")||uniqueId("ui-collapse");$(collparent).find("div:not(.collapse,.panel-body), h4").attr("role","presentation"),colltab.attr("id",collid),collparent&&(collparent.attr({role:"tablist","aria-multiselectable":"true"}),collpanel.hasClass("in")?(colltab.attr({"aria-controls":colltab.attr("href").substr(1),"aria-selected":"true","aria-expanded":"true",tabindex:"0"}),collpanel.attr({role:"tabpanel",tabindex:"0","aria-labelledby":collid,"aria-hidden":"false"})):(colltab.attr({"aria-controls":colltab.attr("href").substr(1),tabindex:"-1"}),collpanel.attr({role:"tabpanel",tabindex:"-1","aria-labelledby":collid,"aria-hidden":"true"})))});var collToggle=$.fn.collapse.Constructor.prototype.toggle;$.fn.collapse.Constructor.prototype.toggle=function(){var href,prevTab=this.$parent&&this.$parent.find('[aria-expanded="true"]');if(prevTab){{var curTab,prevPanel=prevTab.attr("data-target")||(href=prevTab.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,""),$prevPanel=$(prevPanel),$curPanel=this.$element;this.$parent}this.$parent&&(curTab=this.$parent.find('[data-toggle=collapse][href="#'+this.$element.attr("id")+'"]')),collToggle.apply(this,arguments),$.support.transition&&this.$element.one($.support.transition.end,function(){prevTab.attr({"aria-selected":"false","aria-expanded":"false",tabIndex:"-1"}),$prevPanel.attr({"aria-hidden":"true",tabIndex:"-1"}),curTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:"0"}),$curPanel.hasClass("in")?$curPanel.attr({"aria-hidden":"false",tabIndex:"0"}):(curTab.attr({"aria-selected":"false","aria-expanded":"false"}),$curPanel.attr({"aria-hidden":"true",tabIndex:"-1"}))})}else collToggle.apply(this,arguments)},$.fn.collapse.Constructor.prototype.keydown=function(e){var $items,index,$this=$(this),$tablist=$this.closest("div[role=tablist] "),k=e.which||e.keyCode;$this=$(this),/(32|37|38|39|40)/.test(k)&&(32==k&&$this.click(),$items=$tablist.find("[role=tab]"),index=$items.index($items.filter(":focus")),(38==k||37==k)&&index--,(39==k||40==k)&&index++,0>index&&(index=$items.length-1),index==$items.length&&(index=0),$items.eq(index).focus(),e.preventDefault(),e.stopPropagation())},$(document).on("keydown.collapse.data-api",'[data-toggle="collapse"]',$.fn.collapse.Constructor.prototype.keydown),$(".carousel").each(function(){var $this=$(this),prev=$this.find('[data-slide="prev"]'),next=$this.find('[data-slide="next"]'),$options=$this.find(".item"),$listbox=$options.parent();$this.attr({"data-interval":"false","data-wrap":"false"}),$listbox.attr("role","listbox"),$options.attr("role","option");var spanPrev=document.createElement("span");spanPrev.setAttribute("class","sr-only"),spanPrev.innerHTML="Previous";var spanNext=document.createElement("span");spanNext.setAttribute("class","sr-only"),spanNext.innerHTML="Next",prev.attr("role","button"),next.attr("role","button"),prev.append(spanPrev),next.append(spanNext),$options.each(function(){var item=$(this);item.attr(item.hasClass("active")?{"aria-selected":"true",tabindex:"0"}:{"aria-selected":"false",tabindex:"-1"})})});var slideCarousel=$.fn.carousel.Constructor.prototype.slide;$.fn.carousel.Constructor.prototype.slide=function(type,next){var $active=this.$element.find(".item.active"),$next=next||$active[type]();slideCarousel.apply(this,arguments),$active.one($.support.transition.end,function(){$active.attr({"aria-selected":!1,tabIndex:"-1"}),$next.attr({"aria-selected":!0,tabIndex:"0"})})},$.fn.carousel.Constructor.prototype.keydown=function(e){var index,$this=$(this),$ul=$this.closest("div[role=listbox]"),$items=$ul.find("[role=option]"),$parent=$ul.parent(),k=e.which||e.keyCode;/(37|38|39|40)/.test(k)&&(index=$items.index($items.filter(".active")),(37==k||38==k)&&($parent.carousel("prev"),index--,0>index?index=$items.length-1:$this.prev().focus()),(39==k||40==k)&&($parent.carousel("next"),index++,index==$items.length?index=0:$this.one($.support.transition.end,function(){$this.next().focus()})),e.preventDefault(),e.stopPropagation())},$(document).on("keydown.carousel.data-api","div[role=option]",$.fn.carousel.Constructor.prototype.keydown)}(jQuery);;
/**
 * Switch between normal and high contrast styles.
 */
(function ($) {

  /**
   * Disable high contrast style
   *
   * @param style_title Title attribute of link element
   */
  function disable_high_contrast_style(style_title) {
    style_title = typeof style_title !== 'undefined' ? style_title : null;

    // Enable all <style> elements.
    $('style').prop('disabled', false);

    // Enable <link rel="style" ...> elements
    $('link[rel*=style]').each(function (i) {
      $(this).attr('disabled', false);
    });

    // Disable high contrast style sheet.
    $("[title='High Contrast']").attr('disabled', true);

    set_style_preference(null);
  }

  /**
   * Enable high contrast style
   *
   * @param style_title Title attribute of link element
   */
  function enable_high_contrast_style(style_title) {
    style_title = typeof style_title !== 'undefined' ? style_title : null;

    // Disable all <style> elements.
    $('style').prop('disabled', true);

    // Disable <link rel="style" ...> elements
    $('link[rel*=style]').each(function (i) {
      $(this).attr('disabled', true);
    });

    $("[title='High Contrast']").attr('disabled', false)

    set_style_preference('High Contrast');
  }

  /**
   * Test if user prefers high contrast style
   *
   * @returns {boolean} True if user prefers high contrast style
   */
  function prefer_high_contrast_style() {
    var style_title = $.cookie('style');
    if (style_title == 'High Contrast' || style_title == 'High%20Contrast') {
      return true;
    }
    return false;
  }

  /**
   * Set user's style preference
   *
   * @param style_title Title attribute of link element
   */
  function set_style_preference(style_title) {
    style_title = typeof style_title !== 'undefined' ? style_title : null;
    $.cookie('style', style_title, { path: '/', domain: document.location.hostname });
  }


  $(document).ready(function () {

    if (prefer_high_contrast_style()) {
      enable_high_contrast_style();
    }

    // Toggle style.
    $('.switch-style').click(function (event) {
      if (prefer_high_contrast_style()) {
        // Normal style.
        disable_high_contrast_style('High Contrast')
      }
      else {
        // High contrast style.
        enable_high_contrast_style('High Contrast');
      }
      event.preventDefault();
    });
  });

})(jQuery);
;

/*
     FILE ARCHIVED ON 19:27:30 Apr 13, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 02:10:43 May 11, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots.policy: 88.067
  captures_list: 913.862
  CDXLines.iter: 57.096 (4)
  LoadShardBlock: 281.27 (4)
  RedisCDXSource: 3.593
  exclusion.robots: 88.079
  esindex: 0.011
  xauthn.identify: 87.708
  xauthn.chkprivs: 0.049
  load_resource: 127.283
  PetaboxLoader3.datanode: 128.502 (6)
  PetaboxLoader3.resolve: 126.988 (3)
*/