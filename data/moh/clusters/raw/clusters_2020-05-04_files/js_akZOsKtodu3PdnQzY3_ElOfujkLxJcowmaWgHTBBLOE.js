/**
 * @file
 * Extend d3 library to support table to chart.
 */
(function($, Drupal) {

    /**
     * Drupal behaviors for D3 Graph from table module.
     */
    Drupal.behaviors.tableD3Chart = {
        attach: function(context, settings) {

            // Get existing table data.
            $('.table-d3chart-markup').each(function(i, e) {

                // Data settings array is stored in a div above the table.
                var data = $.parseJSON($(this).children('.graph-data').text());

                if (data.length != 0) {

                    // Rely on D3 js to build the graph.
                    var id = $(this).attr('id');
                    Drupal.d3.draw(id, data);

                    // Set up link if graph.
                    if ($(this).has('svg').length) {

                        // Handle link to hide/show table.
                        var link = $('#' + id + '-graph-button').addClass('graph-toggle');
                        var target = $('.' + id + '-graph-toggle').next('table');

                        target.hide().addClass('processed');

                        // Button function click handler.
                        link.click(function() {
                            $(this).toggleClass('down');
                            target.toggle().toggleClass('processed');
                            if (target.hasClass('processed')) {
                                $(this).val(settings.tableD3.show);
                            } else {
                                $(this).val(settings.tableD3.hide);
                            }
                        });
                    } else {
                        // Hide the button, and add an info because d3 is silent.
                        $('#' + id + '-graph-button').hide();
                        console.info('Graph svg has not been build from table #' + id);
                    }
                }

            });
        }
    };

})(jQuery, Drupal);
;
/**
 * @file
 * Extend d3 library to support table to chart.
 */

(function($, Drupal) {

  /**
   * Drupal behaviors for D3 Graph from table module.
   */
  Drupal.behaviors.mohD3 = {
    attach: function(context, settings) {

      $('.table-d3chart-markup').each(function(i, e) {
        var id = $(e).attr('data-graph-source');
        // Processed each graph once.
        if (!$('#graph-' + id).hasClass('processed')) {
          // Title and desc accessibility managment.
          var table = $('table#' + id);
          var svg = $('#graph-' + id + ' svg');
          // Add title and desc for accessibility.
          var title = table.attr('data-graph-title');
          var desc = table.attr('data-graph-desc');
          var aria = [];
          if (desc !== undefined && desc.length > 0) {
            svg.prepend('<desc>' + desc + '</desc>');
            aria.push('desc');
          }
          if (title !== undefined && title.length > 0) {
            svg.prepend('<title>' + title + '</title>');
            aria.push('title');
          }
          if (aria.length !== 0) {
            svg.attr('aria-labelledby', aria.join(' '));
          }

          // DirtyFix, @see functions below.
          var link = $('#graph-' + id + '-graph-button');
          link.click(function() {
            equalizeHeightsFix();
          });

          // Change the display of legend.
          // Get lines dashed and/or dotted.
          if ($('#' + id).attr('data-graph-render') == 'line') {
            var is_dashed = $('#' + id).attr('data-graph-line-dashed');
            if (typeof is_dashed !== typeof undefined && is_dashed !== false) {
              is_dashed = $.parseJSON(is_dashed);
            }
            else {
              is_dashed = new Array();
            }
            $('.c3-legend-item-tile', svg).each(function(k, v) {
              $(v).attr('stroke-width', '3');
              if ($.inArray(k + 1, is_dashed) !== -1) {
                $(v).attr('stroke-dasharray', '2, 2');
              }
            });

          }
        }
        $('#graph-' + id).addClass('processed');
      });
    }
  };

  // DirtyFix: because of a content auto height on load for the column layout
  // we need to add our own height fix to be sure the height is ok.
  // Source of the problem : WR #248651 #41 9)
  // Code copy from themes/mohpub_bootstrap/js/script.js.
  function viewportFix() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) { // I don't think in does that... does this work?
      a = 'client';
      e = document.documentElement || document.body;
    }
    return { width: e[ a + 'Width' ], height: e[ a + 'Height' ] };
  }
  function equalizeHeightsFix() {
    if ($('html.ie8').length) {
      return;
    }
    if (viewportFix().width <= 991) {
      return;
    }
    $('.dropdown-menu').toggleClass('menu-fixer');
    equalheightFix(".row .panel-panel");
    $('.dropdown-menu').toggleClass('menu-fixer');
  }
  function equalheightFix(container) {
    var currentTallest = 0,
      currentRowStart = 0,
      rowDivs = [],
      $el,
      topPostion = 0,
      currentDiv;
    $(container).each(function () {
      $el = $(this);
      $($el).height('auto');
      topPostion = $el.position().top;

      if (currentRowStart != topPostion) {
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
        rowDivs.length = 0; // Empty the array.
        currentRowStart = topPostion;
        currentTallest = $el.height();
        rowDivs.push($el);
      }
      else {
        rowDivs.push($el);
        currentTallest = (currentTallest < $el.height()) ? $el.height() : currentTallest;
      }
      if (currentTallest == 0) {
        var addition = 0;
      }
      else {
        var addition = 20;
      }
      for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {

        rowDivs[currentDiv].height(currentTallest + addition);
      }
    });
  }

})(jQuery, Drupal);
;

/*
     FILE ARCHIVED ON 19:05:37 May 04, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:58:39 May 11, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 183.195 (4)
  exclusion.robots: 100.524
  PetaboxLoader3.resolve: 110.158 (2)
  RedisCDXSource: 141.561
  xauthn.chkprivs: 0.041
  PetaboxLoader3.datanode: 169.92 (6)
  xauthn.identify: 100.213
  load_resource: 135.55
  esindex: 0.012
  exclusion.robots.policy: 100.511
  CDXLines.iter: 66.325 (4)
  captures_list: 803.155
*/