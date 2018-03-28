/**
 * 筛选条件清除全部功能没做
 * 清除单个也没做
 */

$(function () {
    var provinceCodeSelected = '',
        cityCodeSelected = '',
        courseIDSelected = '',
        pageIndex = 1,
        pageSize = 10
        ;
    /**获取省数据 */
    function getProvince() {
        $.AkmiiAjaxGet(window.api_list.province, {}, false).then(function (d) {
            if (d.jsonData) {
                var provinceStr = '';
                var provinceTemplate = '<div data-areacode="{1}" data-areaname="{0}" class="option-container"><span class="option-head">{0}</span></div>';
                d.jsonData.forEach(function (item) {
                    provinceStr += provinceTemplate.format([item.areaName, item.areaCode]);
                });
                $("#province").html(provinceStr)
            }
        }, function () {

        })

    }
    /**获取城市数据 */
    function getCity(pcode, pname) {
        $.AkmiiAjaxGet(window.api_list.city, { 'pcode': pcode }, false).then(function (d) {
            if (d.jsonData) {
                var cityStr = '';
                var cityTemplate = '<span data-pcode="' + pcode + '" data-areacode="{1}" data-areaname="{0}">{0}</span>';
                d.jsonData.forEach(function (item) {
                    item.childList.forEach(function (item2) {
                        cityStr += cityTemplate.format([item2.areaName, item2.areaCode]);
                    });
                });
                $(".option-item").html('<span  data-pcode="' + pcode + '" data-areacode="' + pcode + '" data-areaname="' + pname + '" class="region-def">不限</span>' + cityStr)
            }
        }, function () {

        })
    }
    function getCourseBase() {
        $.AkmiiAjaxGet(window.api_list.course_base, { pageIndex: 1, pageSize: 100 }, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<span class="option" data-courseid="{0}">{1}</span>';
                d.jsonData.rows.forEach(function (item) {
                    str += template.format([item.courseId, item.courseName]);
                });
                $("#courseId").html(str)
            }
        }, function () {

        })
    }
    /**根据条件筛选 */
    function courseFilter() {
        $.AkmiiAjaxGet(window.api_list.course_filter, {
            courseId: courseIDSelected, pageIndex: pageIndex, pageSize: pageSize, province: provinceCodeSelected, city: cityCodeSelected
        }, false).then(function (d) {
            if (d.jsonData && d.jsonData.rows.length > 0) {
                var str = '';
                var template = '<div class="course-item"><div class="course-detail"><div class="course-column course-logo">\
                <img src="/images/course-logo.png"></div><div class="course-column"><p class="course-name">{0}<span class="course-online">\
                <img src="/images/online.png">{4}</span></p><p class="course-info"><img src="/images/course-teacher.png">王老师、杨老师</p><p class="course-info">\
                <img src="/images/course-phone.png">{1}</p><p class="course-info"><img src="/images/course-address.png">{2}</p></div>\
                <div class="course-column score"><p><img src="/images/stars.png"></p>\
                <p class="score-text">{3}</p></div></div></div>';
                d.jsonData.rows.forEach(function (item) {
                    str += template.format([item.schoolName, item.schoolPhone, item.schoolAddress, item.learnTypes, item.addAccount || 0, (item.logoUrl || '/images/course-logo.png')]);
                });
                $(".course-list").html(str)
            } else {
                $(".course-list").html('<div class="isnull"><img src = "/images/null.png"></div>')
            }
        }, function () {

        })
    }
    courseFilter();
    getCourseBase()
    getProvince();


    $('.selected').on('click', '._city', function () {
        $('.region .option-default').click();
    })
    $('.selected').on('click', '._course', function () {
        $('.course-warp .option-default').click();
    })

    //城市区域-不限
    $('.region').on('click', '.option-default', function () {
        $(".region .option-default").removeClass('active').removeClass('region-active');
        var _self = $(this);
        cityCodeSelected = '';
        provinceCodeSelected = '';
        $('._city').remove();
        courseFilter();
        if (_self.hasClass('option-default')) {
            _self.addClass('active');
            $('.option-item').hide();
        }
    });


    //省区域
    $('.region').on('click', '.option-container', function () {
        var _self = $(this);
        if (_self.hasClass('region-active')) {
            _self.removeClass('region-active')
            $('.option-item').hide();
            return;
        }
        getCity(_self.data('areacode'), _self.data('areaname'));
        $(".region .option-container").removeClass('active').removeClass('region-active');
        var top = _self.offset().top;
        var offsetTop = 163 + $("#courseId").height();
        if (top <= offsetTop) {
            $('.option-item').css('top', '51px').show();
        } else if (top <= offsetTop + 53) {
            $('.option-item').css('top', '104px').show();
        } else if (top <= offsetTop + (53 * 2)) {
            $('.option-item').css('top', '157px').show();
        } else {
            $('.option-item').css('top', '210px').show();
        }
        _self.css('z-index', '4').siblings().css('z-index', '2');
        _self.addClass('region-active');
    })
    //市区域
    $('.option-item').on('click', 'span', function () {
        var _self = $(this);
        cityCodeSelected = _self.data('areacode')
        provinceCodeSelected = _self.data('pcode')
        var citySelected = $(".selected-text").find('._city')
        if (citySelected.length > 0) {
            citySelected.replaceWith("<span class='_city'>" + _self.data('areaname') + "&nbsp;×</span>");
        } else {
            $(".selected-text").append("<span class='_city'>" + _self.data('areaname') + "&nbsp;×</span>");
        }
        if (_self.hasClass('region-def')) {
            $('.region .option-default').addClass('active');
            _self.siblings().removeClass('region-selected');
            _self.addClass('region-selected')
        } else {
            $('.region .option-default').removeClass('active');
            _self.siblings().removeClass('region-selected');
            _self.addClass('region-selected')
        }
        $('.option-item').hide();
        $('#province').find('.region-active').removeClass('region-active')
        courseFilter()
    })

    //课程
    $('.course-warp').on('click', '.option-default,.option', function () {
        var _self = $(this);
        // var parent = $(this).parents(".option-warp")
        $('.course-warp').find('.option-default,.option').removeClass('active');
        $(this).addClass('active');
        //不限分类
        if (_self.hasClass('option-default')) {
            courseIDSelected = '';
            $('._course').remove();
        } else {
            courseIDSelected = $(this).data('courseid')
            var courseSelected = $(".selected-text").find('._course')
            if (courseSelected.length > 0) {
                courseSelected.replaceWith("<span class='_course'>" + $(this).html() + "&nbsp;×</span>");
            } else {
                $(".selected-text").append("<span class='_course'>" + $(this).html() + "&nbsp;×</span>");
            }
        }
        courseFilter()
    })






    var pageNumber = 1;
    var pageSize = 12;

    function pagination(records) {
        $("#pagination").pagination(records, {
            num_edge_entries: 1,
            num_display_entries: 4,
            current_page: pageNumber - 1,
            items_per_page: pageSize,
            prev_text: "上一页",
            next_text: "下一页",
            callback: page_index
        });
    }
    pagination(100);

    function page_index(page_index) {
        console.log('页数', page_index);
        var pageNumber = page_index + 1;
        //queryNearbyCompany(pageNumber, pageSize, obj.more, obj.privince, obj.area);
    };

})