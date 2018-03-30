$(function () {
    var provinceCodeSelected = '',
        cityCodeSelected = '',
        courseIDSelected = '',
        pageIndex = 1,
        pageSize = 10
        ;
    /**获取省数据 */
    function getProvince() {
        $.AkmiiAjaxGet(window.api_list.job_province, {}, false).then(function (d) {
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
        $.AkmiiAjaxGet(window.api_list.job_city, { 'pcode': pcode }, false).then(function (d) {
            if (d.jsonData) {
                var cityStr = '';
                var cityTemplate = '<span data-pcode="' + pcode + '" data-areacode="{1}" data-areaname="{0}">{0}</span>';
                d.jsonData.forEach(function (item) {
                    cityStr += cityTemplate.format([item.areaName, item.areaCode]);
                });
                $("#region .option-item").html('<span  data-pcode="' + pcode + '" data-areacode="' + pcode + '" data-areaname="' + pname + '" class="region-def">不限</span>' + cityStr)
            }
        }, function () {

        })
    }
    /**
     * 获取工种条件
     */
    function getServiceTypeList() {
        $.AkmiiAjaxGet(window.api_list.job_service_type, {}, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<span class="option" data-code="{0}">{1}</span>';
                d.jsonData.forEach(function (item) {
                    str += template.format([item.code, item.serviceType]);
                });
                $("#serviceTypeList").html(str)
            }
        }, function () {

        })
    }

    /**
     * 获取年龄条件
     */
    function getAgeRangeList() {
        $.AkmiiAjaxGet(window.api_list.job_age_range, {}, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<span class="option" data-ageid="{0}">{1}</span>';
                d.jsonData.forEach(function (item) {
                    str += template.format([item.id, item.value]);
                });
                $("#ageRangeList").html(str)
            }
        }, function () {

        })
    }

    /**
     * 获取薪资条件
     */
    function getIncomeList() {
        $.AkmiiAjaxGet(window.api_list.job_service_income, {}, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<div data-areacode="{0}" data-areaname="{1}" class="option-container"><span class="option-head">{1}</span></div>';
                d.jsonData.forEach(function (item) {
                    str += template.format([item.id, item.value]);
                    var str2 = '';
                    var template2 = '<span class="option" data-courseid="{0}">{1}</span>';
                    item.ceList.forEach(function (item2) {
                        str2 += template2.format([item2.id, item2.value]);
                    });
                    $("#incomeItemList").append('<p class="option-item"><span class="region-def">不限</span>' + str2 + "</p>");
                });
                $("#incomeList").html(str)
            }
        }, function () {

        })
    }

    /**根据条件筛选 */
    function jobFilter(iscb) {
        $.AkmiiAjaxGet(window.api_list.job_list, {
            showMore: 'yes', pageIndex: pageIndex, pageSize: pageSize, province: provinceCodeSelected, city: cityCodeSelected,
            serviceType: '', age: '', salary: '', salaryType: ''
        }, false).then(function (d) {
            if (d.jsonData && d.jsonData.rows.length > 0) {
                var str = '';
                var template = '<div class="job-detail"><div class="job-info-main"><h3>{0}</h3>\
                <p class="salary">工资范围：<span>{1}{2}</span></p><p>年龄要求：<span>{3}</span></p>\
                <p class="mechanism">发布机构:<a href="{4}">{5}</a></p></div ><div class="job-desc"><span>岗位要求：</span>\
                <p>{6}</p></div>\
                <div class="teacher"><img src="/images/phone.png">{7}<div class="teacher-phone"><span class="triangle"></span><p>联系电话：</p>\
                <p>{8}</p></div></div></div>';
                d.jsonData.rows.forEach(function (item) {
                    str += template.format([
                        item.positionName,
                        item.salary,
                        item.salaryTypeValue,
                        item.age,
                        item.websiteUrl,
                        item.websiteName,
                        item.demand,
                        item.loginName,
                        item.telephone,
                    ]);
                });
                $("#job-detail-warp").html(str);
                if (!iscb) {
                    pagination(d.jsonData.records);
                }
            } else {
                $("#job-detail-warp").html('<div class="isnull"><img src = "/images/null.png"></div>')
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
        console.log('页数', page_index);
        pageIndex = page_index + 1;
        var iscb = true;
        jobFilter(iscb);
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

    jobFilter();
    getServiceTypeList()
    getAgeRangeList();
    getIncomeList();
    getProvince();

    $("#serviceType,#ageRange").on('click', '.option,.option-default', function () {
        $('.option-item').hide();
        $('.option-container').removeClass('region-active');
    });

    /**清除全部 */
    $('.clear-all').click(function () {
        $('.selected-text').html('');
        $('.clear-all').hide();
        //不能这么写
        $("#allCourse").click();
        $("#allRegion").click();
    });
    /**
     * 删除城市条件
     */
    $('.selected').on('click', '._city', function () {
        $('.region .option-default').click();
        toggleClearAll();
    })
    /**
     * 删除课程条件
     */
    $('.selected').on('click', '._course', function () {
        $('.course-warp .option-default').click();
        toggleClearAll();
    })

    //薪资大类
    $("#incomeList").on('click', '.option-container', function () {
        $('.option-item').hide();
        $('.option-container').removeClass('region-active').css('z-index', '2');

        var _self = $(this),
            _index = _self.index()
        console.log(_index)
        $("#incomeItemList .option-item").eq(_index).show().siblings().hide();
        if (_self.hasClass('region-active')) {
            _self.removeClass('region-active')
            $('.option-item').hide();
            return;
        }
        _self.addClass('region-active').siblings().removeClass('region-active');
        _self.css('z-index', '4').siblings().css('z-index', '2');
    });

    //薪资小类：待完成
    $('#incomeItemList .option-item').on('click', 'span', function () {
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
        toggleClearAll();
        jobFilter()
    })

    //省区域
    $('#province').on('click', '.option-container', function () {
        var _self = $(this);
        if (_self.hasClass('region-active')) {
            _self.removeClass('region-active')
            $('.option-item').hide();
            return;
        }
        $('.option-item').hide();
        $('.option-container').removeClass('region-active').css('z-index', '2');


        getCity(_self.data('areacode'), _self.data('areaname'));
        $("#region .option-container").removeClass('active').removeClass('region-active');
        var top = _self.offset().top;
        if (top <= 290) {
            $('#region .option-item').css('top', '51px').show();
        } else if (top <= 290 + 53) {
            $('#region .option-item').css('top', '104px').show();
        } else if (top <= 290 + 53 * 2) {
            $('#region .option-item').css('top', '157px').show();
        } else {
            $('#region .option-item').css('top', '210px').show();
        }
        _self.css('z-index', '4').siblings().css('z-index', '2');
        _self.addClass('region-active');
    })
    //市区域
    $('.cities').on('click', 'span', function () {
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
            $('#region .option-default').addClass('active');
            _self.siblings().removeClass('region-selected');
            _self.addClass('region-selected')
        } else {
            $('#region .option-default').removeClass('active');
            _self.siblings().removeClass('region-selected');
            _self.addClass('region-selected')
        }
        $('.option-item').hide();
        $('#province').find('.region-active').removeClass('region-active')
        toggleClearAll();
        jobFilter()
    })

    //城市区域-不限
    $('#region').on('click', '.option-default', function () {
        $("#region .option-default").removeClass('active').removeClass('region-active');
        var _self = $(this);
        cityCodeSelected = '';
        provinceCodeSelected = '';
        $('._city').remove();
        jobFilter();
        if (_self.hasClass('option-default')) {
            _self.addClass('active');
            $('#region .option-item').hide();
        }
        toggleClearAll();
    });


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
        toggleClearAll();
        jobFilter();
    })

    //查看详情
    $('.course-list').on('click', '.course-item', function () {
        window.location.href = '/html/college-detail.html?id=' + $(this).data('id');
    })


})