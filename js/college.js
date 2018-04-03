
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
                    cityStr += cityTemplate.format([item.areaName, item.areaCode]);
                });
                $(".option-item").html('<span  data-pcode="' + pcode + '" data-areacode="' + pcode + '" data-areaname="' + pname + '" class="region-def">全部</span>' + cityStr)
            }
        }, function () {

        })
    }
    /**
     * 获取课程条件
     */
    function getCourseBase() {
        $.AkmiiAjaxGet(window.api_list.course_usable, {}, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<span class="option" data-courseid="{0}">{1}</span>';
                d.jsonData.forEach(function (item) {
                    str += template.format([item.courseId, item.courseName]);
                });
                $("#courseId").html(str)
            }
        }, function () {

        })
    }

    /**根据条件筛选 */
    function courseFilter(iscb) {
        $.AkmiiAjaxGet(window.api_list.college_filter, {
            courseId: courseIDSelected, pageIndex: pageIndex, pageSize: pageSize, province: provinceCodeSelected, city: cityCodeSelected
        }, false).then(function (d) {
            if (d.jsonData && d.jsonData.rows.length > 0) {
                var str = '';
                var template = '<div class="course-item" data-id="{6}"><div class="course-detail"><div class="course-column course-logo">\
                <img src="{5}"></div><div class="course-column"><p class="course-name">{0}<span class="course-online">\
                <img src="/images/online.png">{4}</span></p><p class="course-info"><img src="/images/course-teacher.png">{7}</p><p class="course-info">\
                <img src="/images/course-phone.png">{1}</p><p class="course-info"><img src="/images/course-address.png">{2}</p></div>\
                <div class="course-column score"><p><img src="/images/stars.png"></p>\
                <p class="score-text">{3}</p></div></div></div>';
                d.jsonData.rows.forEach(function (item) {
                    str += template.format([
                        item.schoolName,
                        item.schoolPhone,
                        item.schoolAddress,
                        item.learnTypes,
                        item.orderNum || 0,
                        (item.logoUrl || '/images/colloge-logo.png'),
                        item.id,
                        item.contacts
                    ]);
                });
                $(".course-list").html(str);
                $(".course-list").find('.course-logo img').error(function () {
                    $(this).attr('src', '/images/colloge-logo.png')
                });
                if (!iscb) {
                    pagination(d.jsonData.records);
                }
            } else {
                $(".course-list").html('<div class="isnull"><img src = "/images/null.png"></div>')
            }
        }, function () {

        })
    }
    /**
     * 分页
     */
    function pagination(records) {
        $("#pagination").pagination(records, {
            num_edge_entries: 1,
            num_display_entries: 4,
            current_page: pageIndex - 1,
            items_per_page: pageSize,
            prev_text: "上一页",
            next_text: "下一页",
            callback: page_index
        });
    }
    function page_index(page_index) {
        pageIndex = page_index + 1;
        var iscb = true;
        courseFilter(iscb);
        //queryNearbyCompany(pageNumber, pageSize, obj.more, obj.privince, obj.area);
    };

    /**
     * 切换显示“清除全部”
     */
    function toggleClearAll() {
        if ($('.selected-text span').length >= 1) {
            $('.clear-all').show();
        } else {
            $('.clear-all').hide();
        }
    }

    courseFilter();
    getCourseBase()
    getProvince();

    /**清除全部 */
    $('.clear-all').click(function () {
        //清除已选
        $('.selected-text').html('');
        $('.clear-all').hide();
        //清除课程菜单
        $("#courseId span").removeClass('active');
        //清除省市
        $("#province .option-container").removeClass('region-active');
        $(".option-item").hide();
        //启动“不限”
        $(".option-default").addClass('active');
        provinceCodeSelected = '';
        cityCodeSelected = '';
        courseIDSelected = '';
        pageIndex = 1;
        courseFilter();
    });

    /**
     * 删除城市条件
     */
    $('.selected').on('click', '._city', function () {
        $('.region .option-default').click();
        provinceCodeSelected = '',
            cityCodeSelected = '',
            pageIndex = 1,
            toggleClearAll();
        courseFilter();
    })
    /**
     * 删除课程条件
     */
    $('.selected').on('click', '._course', function () {
        $('.course-warp .option-default').click();
        courseIDSelected = '',
            pageIndex = 1,
            toggleClearAll();
        courseFilter();
    })

    //区域不限
    $("#allRegion").click(function () {
        $('._city').remove();
        $("#province .option-container").removeClass('region-active');
        $(".option-item").hide();
        $(this).addClass("active");
        provinceCodeSelected = '',
            cityCodeSelected = '',
            pageIndex = 1,
            toggleClearAll();
        courseFilter();
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
        $("#region .option-container").removeClass('active').removeClass('region-active');
        var top = _self.offset().top;
        var offsetTop = 163 + $("#courseId").height();
        var top = _self.offset().top,
            baseOffsetTop = $($('#province .option-container')[1]).offset().top,
            baseOffsetTop = baseOffsetTop || 227;
        if (top <= baseOffsetTop) {
            $('.option-item').css('top', '42px').show();
        } else if (top <= baseOffsetTop + 43) {
            $('.option-item').css('top', '85px').show();
        } else if (top <= baseOffsetTop + (43 * 2)) {
            $('.option-item').css('top', '128px').show();
        } else {
            $('.option-item').css('top', '171px').show();
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
        $('#region .option-default').removeClass('active');
        $('.option-item').hide();
        $('#province').find('.region-active').removeClass('region-active')
        pageIndex = 1,
            toggleClearAll();
        courseFilter()
    });
    //课程
    $('.course-warp').on('click', '.option-default,.option', function () {
        var _self = $(this);
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
        pageIndex = 1,
            toggleClearAll();
        courseFilter();
    })
    //查看详情
    $('.course-list').on('click', '.course-item', function () {
        window.location.href = '/html/college-detail.html?id=' + $(this).data('id');
    })


})