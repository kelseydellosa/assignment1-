console.log("bonjour");

$(function () {
    'use strict';
    $("a[href='#']").click(function (e) {
        e.preventDefault();
    });
    $('.simulatepost').clone().css({
        'opacity': '.6'
    }).appendTo('.sp_02');
    $('.sp_02').clone().css({
        'opacity': '.6'
    }).appendTo('.sp_03');
    $('.sp_03').clone().css({
        'opacity': '.6'
    }).appendTo('.sp_04');

    $("#datepicker").datepicker();

    var calendarModal = app.calendar.create({
        inputEl: '#datepicker',
        openIn: 'customModal',
        header: true,
        footer: true,
    });

    //    function update() {
    //        var d = new Date(),
    //            currentDay = d.getDate(),
    //            day = d.getDay(),
    //            month = d.getMonth(),
    //            year = d.getFullYear(),
    //            d_names = Array("Sunday", "Monday", "Tuesday",
    //                "Wednesday", "Thursday", "Friday", "Saturday"),
    //            m_names = new Array("January", "February", "March",
    //                "April", "May", "June", "July", "August", "September",
    //                "October", "November", "December"),
    //            hour = d.getHours(),
    //            minutes = d.getMinutes(),
    //            sup = "",
    //            a_p = "";
    //
    //        if (currentDay == 1 || currentDay == 21 || currentDay == 31) {
    //            sup = 'st';
    //        } else if (currentDay == 2 || currentDay == 22) {
    //            sup = 'nd';
    //        } else if (currentDay == 3 || currentDay == 23) {
    //            sup = 'rd';
    //        } else {
    //            sup = "th";
    //        }
    //        if (hour < 12) {
    //            a_p = 'AM';
    //        } else {
    //            a_p = 'PM';
    //        }
    //        if (hour > 12) {
    //            hour = hour - 12;
    //        }
    //        if (hour == 0) {
    //            hour = 12;
    //        }
    //        if (hour < 10) {
    //            hour = '0' + hour;
    //        }
    //        if (minutes < 10) {
    //            minutes = '0' + minutes;
    //        }
    //        $('.date-container .t-day').html(currentDay + '<SUP>' + sup + '</SUP>');
    //        $('.fulldate .day').html(d_names[day]);
    //        $('.fulldate .date').html(m_names[month] + ', ' + year);
    //        $('.fulldate .timing').html(hour + '<span class="dot">:</span>' + minutes + ' ' + a_p);
    //        $('.pre-loading .wel-day').html(d_names[day]);
    //    }
    //    update();
    //    setInterval(update, 1000);

    function reseted() {
        $("#overlay, #card-main").fadeOut();
        $("#card-main input").val('').removeClass('wobble');
        $('input[type=text]').css('border-color', 'rgba(0,0,0,.12)');
        $('.notification').removeClass('checked');
        $('.notification .left').removeClass('animated-checked');
        $('.textCounter').html('');
        $('.notice').html('').removeClass('wobble');
        $('input[type=text]').prev('label').removeClass('effect');

    }

    $('input[type=text]').on('focus blur', function (e) {
        var $this = $(this),
            label = $this.prev('label');
        if (e.type === 'focus') {

            if ($this.val() === '') {
                label.addClass('effect');
                $this.attr("placeholder");
            }
        } else if (e.type === 'blur') {
            if ($this.val() === '') {
                label.removeClass('effect');

            } else {
                label.addClass('effect');
            }
        }

    });



    $('#tmp').on('click', function () {
        $('.notification').toggleClass('checked');
        $('.notification .left').toggleClass('animated-checked');
    });

    $('#search').on('keyup', function () {
        $.expr[":"].contains = function (a, i, m) {
            return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };
        var filter = $(this).val();
        if (filter) {
            $('.list').find(".listed01:not(:contains(" + filter + "))").closest('li').fadeTo('slow', 0.3);
            $('.list').find(".listed01:contains(" + filter + ")").closest('li').fadeTo('slow', 1);
        } else {
            $('.list').find("li").fadeTo('slow', 1);
        }
    });

    $('input[type=text]').on('keyup', function () {
        var maxLength = $(this).attr('maxlength'),
            textLength = $(this).val().length,
            remText = (maxLength - textLength),
            moc = $(this).next('.textCounter');

        if (remText == 0) {
            moc.css('color', '#df4a32');
        } else {
            moc.css('color', 'initial');
        }
        if (textLength == 0) {
            moc.fadeOut();
        } else {
            moc.fadeIn().html(remText + ' W/R');
        }
    });

    $('#title, #location').keydown(function (e) {
        var key = e.keyCode;
        var notice = 'Only Letters (aA-zZ)';
        if (e.shiftKey || e.ctrlKey || e.altKey || key == '9') {

            return true

        }
        if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {

            $(this).parent().find('.notice').html(notice).addClass('wobble');
            e.preventDefault();
        } else {
            $(this).parent().find('.notice').html('').removeClass('wobble');
        }
    });




    $('.icon').on('click', function () {
        $('.search-cont').toggleClass('togglesearch');
        $('input#search').toggleClass('togglesearchbackground');
    });
    $(document).mouseup(function (e) {
        var container = $('.search-cont')
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('togglesearch');
            $('input#search').removeClass('togglesearchbackground');
        }
    });

    $('#open_todoT').on('click', function () {
        $('.counter').removeClass('numric-animated');
        $('#overlay, #card-main').fadeIn();
    });




    var counter = 0;
    $('#submit').on('click', function () {
        counter++;

        var myTitle = $('#title').val(),
            myLocation = $('#location').val(),
            myDescription = $('#description').val(),
            myDate = $('input#datepicker').val(),
            myTime = $('input[type=time]').val(),
            showChar = 25,
            ellipsestext = "...";
        $('#card-main input').not(':input[type=checkbox]').each(function (e) {

            if ($(this).val() == '') {
                $(this).css('border-color', '#df4a32').addClass('wobble');
                e.preventDefault();
            }

        });


        if (myDescription.length > showChar) {

            var c = myDescription.substr(0, showChar);
            var h = myDescription.substr(showChar, myDescription.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext + '</span><span class="morecontent"><span>' + h + '</span><a href="#" class="morelink"><svg class="icon-arrow-down" viewBox="0 0 32 32"><polygon points="28.2,6.1 16,18.3 3.8,6.1 0,9.9 16,25.9 32,9.9"></polygon></svg></a></span>';

        } else {
            html = myDescription
        }

        $('.morelink').click(function (e) {
            var hidden = $(e.target).closest('.morecontent');

            $(this).find('.icon-arrow-down').toggleClass('rotated');



            hidden.find('span').toggle();

        });
        $('.category p').html('queued').css({
            'background': 'rgba(0,0,0,0.3)'
        });
        if (counter > 0) {
            $('.list').prepend("<li><div class='listed'><div class='options'><a href='#' class='erase' title='Erase Task'></a><a href='#' class='min' title='Minimize'></a><a href='#' class='max' title='Maximize'></a></div><div class='category'><span></span><p>New</p></div><div class='listed01'><h3>" + myTitle + "<span class='at'> — in </span>" + myLocation + "</h3><span class='rem-status'>Reminder Mode: on</span><p class='paragraph'>" + html + "</p></div><div class='listed02'><span class='listed-date'>" + myDate + "</span><span class='listed-time'> at <b>" + myTime + "</b></span><span class='priority'><input type='radio' id='star1'><label for='star1'></label><input type='radio' id='star2'><label  for='star2'></label><input type='radio' id='star3'><label  for='star3'></label><span class='tolip'></span></span></div></div></li>");
            $('.pre-loading').hide();
            $('#search').prop('disabled', false);
            $('#search').attr('placeholder', 'Filter tasks by keywords ..');
            $('.counter').addClass('numric-animated');

        }
        reseted();

        $('.options .erase').click(function (event) {
            var title = $(event.target).closest('li').find('h3').text();
            $(' #overlay, .main-message').fadeIn();
            $('.message, .answer').css({
                'opacity': '1'
            });
            $('.message p').html('This task <b>(' + title + ' )</b> will be deleted and you will no longer be able to find it.');
            $('.answer button').on('click', function (e) {

                if ($('#yes').is(e.target)) {
                    $('.circular').fadeIn();
                    $('.message, .answer').animate({
                        opacity: '0'
                    });

                    setTimeout(function () {
                        $('#overlay, .main-message').fadeOut()
                        $('.circular').fadeOut();
                        $(event.target).closest('li').remove();

                        var co = $('.list li').length;
                        $('.counter').html(co + ' task(s) pending');

                        if (co == 0) {
                            $('.counter').html('No Tasks Pending');
                            $('.pre-loading').fadeIn();
                            $('#search').prop('disabled', true);
                            $('#search').attr('placeholder', 'No tasks so far');
                            $('#search').val('');
                        }
                    }, 2500);
                    clearTimeout()



                } else if ($('#no').is(e.target)) {
                    $(' #overlay, .main-message').fadeOut();

                }

            })
        });

        $('.options .min').on('click', function (e) {
            var item = $(e.target).closest('li');
            var itm = $('.list').width();
            item.css({
                'right': itm - 16
            })
            $(this).css({
                'background': '#ddd'
            })
            item.find(' .max').css({
                'background': '#89cb5a'
            });

        });

        $('.options .max').click(function (e) {
            var item = $(e.target).closest('li')
            item.css({
                'right': 0
            })
            $(this).css({
                'background': '#ddd'
            })
            item.find(' .min').css({
                'background': '#f7bf67'
            });
        });


        $('.morelink').click(function (e) {
            var hidden = $(e.target).closest('.morecontent');

            $(this).find('.icon-arrow-down').toggleClass('rotated');


            hidden.find('span').toggle();

        });


        var co = $('.list li').length;
        $('.counter').html(co + ' Task(s) Pending');
    });
    $('#overlay').mouseup(function (e) {
        var container = $("#card-main, .main-message");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".main-message").fadeOut();
            reseted();
        }
    });
    $('#close-icon').on('click', function () {
        reseted();
    });

    $('.credit-list').html('<div class="list-heading"><a class="avatar-50" href="https://www.facebook.com/Dani4Real" target="_blank"><span class="ova"></span><img src="https://goo.gl/aVijkX" ></a></div><div class="about-me"></div><ul><li><a href="https://www.facebook.com/Dani4Real" target="_blank">Muhammad Khairy</a></li><li><a href="#">Rate the app</a></li><li><a href="#">Terms of use</a></li><li><a href="#">FAQ</a></li><li><a id="collapse" href="#">Collapse The bar</a></li></ul>');

    $('#close-icon, .credit-list ul li a').append("<span class='ripple'></span>");

    $('#collapse, .list-order').on('click', function () {
        $('.ova').toggleClass('animateme');
        $('.fa-ellipsis-h').toggleClass('ba');
        $('.credit-list').toggle();
    });



    $('#close-icon, #submit, .credit-list ul li a, .icon, .list-order').on('mouseup mousedown', function (e) {

        if (e.type === 'mouseup') {
            var ofs = $(this).offset(),
                dX = e.pageX - ofs.left,
                dY = e.pageY - ofs.top;
            $('.ripple').css({
                left: dX,
                top: dY
            });
            $(this).find('.ripple').addClass('click-effect');
        }
        if (e.type === 'mousedown') {
            $('.ripple').removeClass("click-effect");
        }
    });
});
