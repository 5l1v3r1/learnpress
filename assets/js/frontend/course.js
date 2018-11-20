;
/**
 * LearnPress frontend course app.
 *
 * @version 3.x.x
 * @author ThimPress
 * @package LearnPress/JS/Course
 */
(function ($, LP) {

    'use strict';

    function LP_Storage(key) {
        var storage = window.localStorage;
        this.key = key;
        this.get = function (id) {
            var val = storage.getItem(this.key) || '',
                sections = val.split(',');
            if (id) {
                id = id + '';
                var pos = sections.indexOf(id);
                if (pos >= 0) {
                    return sections[pos];
                }
            }
            return sections;
        }
        this.set = function (sections) {
            if (typeof sections !== 'string') {
                sections = sections.join(',');
            }
            storage.setItem(this.key, sections);
            return sections.split(',');
        }
        this.hasSection = function (id) {
            id = id + '';
            var sections = this.get(),
                at = sections.indexOf(id);

            return at >= 0 ? at : false;
        }
        this.add = function (id) {
            id = id + '';
            var sections = this.get();
            if (this.hasSection(id)) {
                return;
            }
            sections.push(id);
            this.set(sections);
            return sections;
        }
        this.remove = function (id) {
            id = id + '';
            var at = this.hasSection(id);
            if (at !== false) {
                var sections = this.get();
                sections.splice(at, 1);
                this.set(sections);
                return sections;
            }
            return false;
        }
    }

    /**
     * LP_Course
     *
     * @param settings
     * @constructor
     */
    function LP_Course(settings) {

        var sectionStorage = new LP_Storage('sections'),
            $body = $('body'),
            $content = $('.content-item-scrollable'),
            $curriculum = $('#learn-press-course-curriculum'),
            $contentItem = $('#learn-press-content-item'),
            $curriculumScrollable = $curriculum.find('.curriculum-scrollable'),
            $header = $('#course-item-content-header'),
            $footer = $('#course-item-content-footer'),
            $courseItems = $curriculum.find('.course-item'),
            isShowingHeader = true,
            fullScreen, contentTop = 0, headerTimer,
            inPopup = false,
            isRTL = $body.hasClass('rtl');

        /**
         * fire native event of a DOM
         *
         * @param node
         * @param eventName
         */
        function fireNativeEvent(node, eventName) {
            var doc, event;
            if (node.ownerDocument) {
                doc = node.ownerDocument;
            } else if (node.nodeType == 9) {
                doc = node;
            } else {
                throw new Error("Invalid node passed to fireEvent: " + node.id);
            }

            if (node.dispatchEvent) {
                var eventClass = "";

                switch (eventName) {
                    case "click":
                    case "mousedown":
                    case "mouseup":
                        eventClass = "MouseEvents";
                        break;

                    case "focus":
                    case "change":
                    case "blur":
                    case "select":
                        eventClass = "HTMLEvents";
                        break;

                    default:
                        throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                        break;
                }
                event = doc.createEvent(eventClass);
                event.initEvent(eventName, true, true);
                event.synthetic = true;
                node.dispatchEvent(event, true);
            } else if (node.fireEvent) {
                event = doc.createEventObject();
                event.synthetic = true;
                node.fireEvent("on" + eventName, event);
            }
        }

        /**
         * Toggle answer option check/uncheck
         */
        function toggleAnswerOptions(event) {
            var $el = $(event.target),
                $chk;
            if ($el.is('input.option-check')) {
                return;
            }

            $chk = $el.closest('.answer-option').find('input.option-check');

            if (!$chk.length) {
                return;
            }

            if ($chk.is(':disabled')) {
                return;
            }

            fireNativeEvent($chk[0], 'click');
        }

        /**
         * Show/Hide section content
         */
        function toggleSection() {
            var id = $(this).closest('.section').data('section-id');
            $(this).siblings('.section-content').slideToggle(function () {
                if ($(this).is(':visible')) {
                    sectionStorage.remove(id);
                } else {
                    sectionStorage.add(id);
                }
            });
        }

        /**
         * Init sections
         */
        function initSections() {
            var $activeSection = $('.course-item.current').closest('.section'),
                sections = $('.curriculum-sections').find('.section'),
                sectionId = $activeSection.data('section-id'),
                hiddenSections = [];

            if ($activeSection) {
                hiddenSections = sectionStorage.remove(sectionId);
            } else {
                hiddenSections = sectionStorage.get();
            }

            for (var i = 0; i < hiddenSections.length; i++) {
                sections.filter('[data-section-id="' + hiddenSections[i] + '"]').find('.section-content').hide();
            }
        }

        /**
         * Prepare form before submitting
         *
         * @param form
         */
        function prepareForm(form) {
            var $answerOptions = $('.answer-options'),
                $form = $(form),
                data = $answerOptions.serializeJSON(),
                $hidden = $('<input type="hidden" name="question-data" />').val(JSON.stringify(data));

            if (($form.attr('method') + '').toLowerCase() !== 'post') {
                return;
            }

            $form.find('input[name="question-data"]').remove();
            return $form.append($hidden).append($('<div />').append($answerOptions.clone()).hide());
        }

        /**
         * Tab course event
         *
         * @param e
         * @param tab
         */
        function onTabCourseClick(e, tab) {

            if ($(document.body).hasClass('course-item-popup')) {
                return;
            }

            var $tab = $(tab),
                $parent = $tab.closest('.course-nav');

            if ($parent.siblings().length === 0) {
                return;
            }
            LP.setUrl($tab.attr('href'))
        }

        /**
         * Event on press any key into search
         *
         * @param e
         * @returns {boolean}
         */
        function onSearchInputKeypress(e) {
            if (e.type === 'keypress' && e.keyCode === 13) {
                return false;
            }

            var s = this.value,
                r = new RegExp(s, 'ig');

            $courseItems.map(function () {
                var $item = $(this),
                    itemName = $item.find('.item-name').text();
                if (itemName.match(r) || !s.length) {
                    $item.show();
                } else {
                    $item.hide();
                }
            });

            $('.section').show().each(function () {
                if (s.length) {
                    if (!$(this).find('.section-content').children(':visible').length) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                } else {
                    $(this).show();
                }
            });

            $(this).closest('.course-item-search').toggleClass('has-keyword', !!this.value.length);
        }

        function onClearSearchInputClick(e) {
            var $form = $(this).closest('.course-item-search');
            $form.find('input').val('').trigger('keyup')
        }

        function onClickQM() {
            $('#qm').css({'z-index': 999999999, position: 'relative'});
            $('html, body').css('overflow', 'auto');
        }

        function getCurriculumWidth() {
            return $curriculum.outerWidth();
        }

        function maybeShowCurriculum(e) {
            var offset = $(this).offset(),
                offsetX = e.pageX - offset.left,
                curriculumWidth = getCurriculumWidth();

            if (!fullScreen || (offsetX > 50)) {
                return;
            }

            timeoutToClose();

            if (!isShowingHeader) {
                $body.removeClass('distraction-on').addClass('distraction-auto-close');

                /*
                 $curriculum.stop().animate({
                 left: 0
                 }, function () {
                 getCurriculum();
                 });

                 $contentItem.stop().animate({
                 //left: curriculumWidth
                 });

                 $footer.stop().animate({
                 left: curriculumWidth
                 }, function () {
                 $(document, window).trigger('learn-press/toggle-content-item');
                 });

                 $header.find('.course-item-search').show();*/
                getCurriculum();
                toggleEventShowCurriculum(true);
                isShowingHeader = true;
            }
        }

        function toggleEventShowCurriculum(b) {
            $(document)[b ? 'off' : 'on']('mousemove.maybe-show-curriculum', 'body', maybeShowCurriculum);
        }

        function timeoutToClose() {
            headerTimer && clearTimeout(headerTimer);
            headerTimer = setTimeout(function () {
                var curriculumWidth = getCurriculumWidth();

                if (!fullScreen) {
                    return;
                }

                /**
                 $curriculum.stop().animate({
                    left: -curriculumWidth
                });

                 $contentItem.stop().animate({
                    //left: 0
                });

                 $footer.stop().animate({
                    left: 0
                }, function () {
                    $(document, window).trigger('learn-press/toggle-content-item');
                });

                 $header.find('.course-item-search').hide();
                 */

                $body.addClass('distraction-on').removeClass('distraction-auto-close');
                isShowingHeader = false;
                toggleEventShowCurriculum();
            }, 2000);
        }

        function toggleContentItem(e) {
            e.preventDefault();
            var curriculumWidth = getCurriculumWidth();
            fullScreen = $body.toggleClass('distraction-on').hasClass('distraction-on');
            // $curriculum
            //     .stop()
            //     .animate({
            //         left: fullScreen ? -curriculumWidth : 0
            //     }, 750, function () {
            //         getCurriculum();
            //     });
            //
            // $contentItem
            //     .stop()
            //     .animate({
            //         left: fullScreen ? 0 : curriculumWidth
            //     }, 750);
            //
            // $footer.stop().animate({
            //     left: fullScreen ? 0 : curriculumWidth
            // }, function () {
            //     $(document, window).trigger('learn-press/toggle-content-item');
            // });

            isShowingHeader = !fullScreen;
            window.localStorage && window.localStorage.setItem('lp-full-screen', fullScreen ? 'yes' : 'no');
            getCurriculum();
            $.ajax({
                url: '',
                data: {
                    'lp-ajax': 'toggle-distraction-mode',
                    distraction: fullScreen ? 'yes' : 'no'
                },
                success: function () {

                }
            });

            fullScreen && toggleEventShowCurriculum();
            //$header.find('.course-title').stop().animate({marginLeft: fullScreen ? -curriculumWidth : 0})
            //$header.find('.course-item-search').stop().animate({opacity: fullScreen ? 0 : 1});
            //$body.toggleClass('distraction-on', fullScreen);
        }

        function initEvents() {
            // Live events
            $(document)
                .on('learn-press/nav-tabs/clicked', onTabCourseClick)
                .on('keyup keypress', '.course-item-search input', onSearchInputKeypress)
                .on('click', '.course-item-search button', onClearSearchInputClick)
                .on('click', '#wp-admin-bar-query-monitor', onClickQM)
                .on('click', '.answer-options .answer-option', toggleAnswerOptions)
                .on('click', '.section-header', toggleSection)
                .on('submit', 'form.lp-form', function () {
                    prepareForm(this);
                }).on('click', '.toggle-content-item', toggleContentItem);

            $curriculum.hover(function () {
                headerTimer && clearTimeout(headerTimer);
            }, function () {
                if (fullScreen) timeoutToClose();
            })

        }

        function initScrollbar() {
            $content.addClass('scrollbar-light')
                .scrollbar({
                    scrollx: false
                });

            $content.parent().css({
                position: 'absolute',
                top: 0,
                bottom: $('#course-item-content-footer:visible').outerHeight() || 0,
                width: '100%'
            }).css('opacity', 1).end().css('opacity', 1);

            $curriculumScrollable = $curriculum.find('.curriculum-scrollable')
            $curriculumScrollable.addClass('scrollbar-light')
                .scrollbar({
                    scrollx: false
                });

            $curriculumScrollable.parent().css({
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '100%'
            }).css('opacity', 1).end().css('opacity', 1);
        }

        function fitVideo() {
            var $wrapContent = $('.content-item-summary.content-item-video');

            if (!$wrapContent.length) {
                return;
            }

            var $entryVideo = $wrapContent.find('.entry-video'),
                $frame = $entryVideo.find('iframe'),
                width = $frame.attr('width'),
                height = $frame.attr('height'),
                ratio = 1,
                contentHeight, timer;

            function resizeVideo() {
                var frameWidth = $frame.width();
                contentHeight = frameWidth * ratio;
                $frame.css({
                    height: contentHeight,
                    marginLeft: ( $entryVideo.width() - frameWidth) / 2
                });

                $wrapContent.css({
                    paddingTop: contentHeight
                });
            }

            if (!$entryVideo.length) {
                return false;
            }

            if (width && height) {
                if (width.indexOf('%') === -1 && height.indexOf('%') === -1) {
                    ratio = height / width;
                }
            }

            $(window).on('resize.fit-content-video learn-press/toggle-content-item', function () {
                timer && clearTimeout(timer);
                timer = setTimeout(resizeVideo, 250);
            }).trigger('resize.fit-content-video');

            $('.content-item-scrollable').scroll(function () {
                $(this).find('.entry-video').css('padding-top', this.scrollTop);
            });
        }

        function curriculumIsVisible() {
            return !isRTL ? parseInt($curriculum.css('left')) >= 0 : parseInt($curriculum.css('right')) >= 0;
        }

        function getCurriculum() {
            setTimeout(function () {
                if (curriculumIsVisible() && $curriculum.attr('data-loaded') !== 'true' && $curriculum.data('use_ajax') === 'yes') {
                    $.ajax({
                        url: window.location.href.addQueryVar('get-raw-content', 'curriculum'),
                        success: function (response) {
                            var $content = $(response);

                            if (!$content.is('.course-curriculum')) {
                                $content = $content.find('.course-curriculum')
                            }
                            $curriculum.html($content.html()).attr('data-loaded', 'true');
                            $courseItems = $curriculum.find('.course-item')
                            if (inPopup) {
                                initScrollbar();

                                setTimeout(function () {
                                    var $cs = $body.find('.curriculum-sections').parent();
                                    $cs.scrollTo($cs.find('.course-item.current'), 100);

                                    if (window.location.hash) {
                                        $('.content-item-scrollable:last').scrollTo($(window.location.hash));
                                    }
                                }, 300);
                            }
                        }
                    })
                }
            }, 300)
        }

        /**
         * Init
         */
        function init() {
            inPopup = $body.hasClass('course-item-popup');
            initSections();
            initEvents();

            if (!inPopup) {
                getCurriculum();
                return;
            }

            //$contentItem.appendTo($body);
            //$curriculum.appendTo($body);

            $('.course-summary.item-summary').appendTo($body);

            if ($('#wpadminbar').length) {
                //$body.addClass('wpadminbar');
                contentTop = 32;
            }

            initScrollbar();
            fitVideo();

            fullScreen = $body.hasClass('distraction-on');// window.localStorage && 'yes' === window.localStorage.getItem('lp-full-screen');

            if($(window).width()<=768){
                fullScreen = true;
            }

            if (fullScreen) {
                var curriculumWidth = getCurriculumWidth();
                //$body.addClass('distraction-on');
                //$contentItem.css('left', 0);
                //$curriculum.css('left', -curriculumWidth);
                //$footer.css('left', 0);
                isShowingHeader = !fullScreen;
                // $header.find('.course-title').css({marginLeft: fullScreen ? -curriculumWidth : 0})
                // $header.find('.course-item-search').css({opacity: fullScreen ? 0 : 1});
                toggleEventShowCurriculum();
            }

            getCurriculum();

            $body.css('opacity', 1);

        }

        $('.lp-form.lp-form-ajax').submit(function () {
            $body.addClass('lp-loading');
            var data = $.extend({}, $('.answer-options').serializeJSON(), $(this).serializeJSON());
            $.ajax({
                url: lpCourseSettings.root_url,
                data: data,
                type: 'post',
                success: function (response) {
                    response = LP.parseJSON(response);
                    if (response.redirect) {
                        window.location.href = response.redirect;
                    }

                    $body.removeClass('lp-loading');
                },
                error: function () {
                    $body.removeClass('lp-loading');
                }
            });
            return false;
        });

        $(document).on('learn-press/toggle-content-item', function () {

        })

        new LP.Alerts();

        init();
    }

    LP.Alerts = function () {
        this.isShowing = false;
        var $doc = $(document),
            self = this,
            trigger = function (action, args) {
                var triggered = $doc.triggerHandler(action, args);

                if (triggered !== undefined) {
                    return triggered;
                }

                return $.isArray(args) ? args[0] : undefined;
            },
            confirmHandle = function (e) {
                try {
                    var $form = $(this),
                        message = $form.data('confirm'),
                        action = $form.data('action');

                    message = trigger('learn-press/confirm-message', [message, action]);

                    if (!message) {
                        return true;
                    }

                    jConfirm(message, '', function (confirm) {
                        confirm && $form.off('submit.learn-press-confirm', confirmHandle).submit();
                        self.isShowing = false;
                    });

                    self.isShowing = true;

                    return false;
                } catch (ex) {
                    console.log(ex)
                }

                return true;
            }

        this.watchChange('isShowing', function (prop, oldVal, newVal) {
            if (newVal) {
                setTimeout(function () {
                    $.alerts._reposition();
                    $('#popup_container').addClass('ready')
                }, 30)

                var $a = $('<a href="" class="close"><i class="fa fa-times"></i></a>')
                $('#popup_container').append($a);
                $a.on('click', function () {
                    $.alerts._hide();
                    return false;
                });
            }
            $(document.body).toggleClass('confirm', newVal);
            return newVal;
        });

        var $forms = $('form[data-confirm]').on('submit.learn-press-confirm', confirmHandle);
    }


    $(document).ready(function () {
        $(document).ready(function () {
            new LP_Course({});

            $(this).on('submit', 'form[name="course-external-link"]', function () {
                var redirect = $(this).attr('action');
                if (redirect) {
                    window.location.href = redirect;
                    return false;
                }
            })
        });
    });
})
(jQuery, LP);