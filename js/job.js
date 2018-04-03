$(function () {
    var provinceCodeSelected = '',
        cityCodeSelected = '',
        serviceTypeSelected = '',
        ageSelected = '',
        salarySelected = '',
        salaryTypeSelected = '',
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
            } else {
                $("#incomeList").html('<div class="option-container disabled"><span class="option-head">&nbsp;</span></div>')
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
                var template = '<span class="option" data-id="{0}">{1}</span>';
                d.jsonData.forEach(function (item) {
                    str += template.format([item.code, item.serviceType]);
                });
                $("#serviceTypeList").html(str)
            }
            else {
                $("#serviceTypeList").html('<span class="option disabled">&nbsp;</span>')
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
                var template = '<span class="option" data-id="{0}">{1}</span>';
                d.jsonData.forEach(function (item) {
                    str += template.format([item.id, item.value]);
                });
                $("#ageRangeList").html(str)
            } else {
                $("#ageRangeList").html('<span class="option disabled">&nbsp;</span>')
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
                var template = '<div data-id="{0}" data-name="{1}" class="option-container"><span class="option-head">{1}</span></div>';
                d.jsonData.forEach(function (item) {
                    str += template.format([item.id, item.value]);
                    var str2 = '';
                    var template2 = '<span class="option" data-id="{0}" data-pid="' + item.id + '" data-name="' + item.value + '-{1}">{1}</span>';
                    item.ceList.forEach(function (item2) {
                        str2 += template2.format([item2.id, item2.value]);
                    });
                    $("#incomeItemList").append('<p class="option-item"><span data-id="" data-pid="' + item.id + '" data-name="' + item.value + '" class="region-def">不限</span>' + str2 + "</p>");
                });
                $("#incomeList").html(str)
            }
            else {
                $("#incomeList").html('<div class="option-container disabled"><span class="option-head">&nbsp;</span></div>')
            }
        }, function () {

        })
    }

    /**根据条件筛选 */
    function jobFilter(iscb) {
        $.AkmiiAjaxGet(window.api_list.job_list, {
            showMore: 'yes',
            pageNumber: pageIndex,
            pageSize: pageSize,
            province: provinceCodeSelected,
            city: cityCodeSelected,
            serviceType: serviceTypeSelected,
            age: ageSelected,
            salary: salarySelected,
            salaryType: salaryTypeSelected
        }, false).then(function (d) {
            if (d.jsonData && d.jsonData.rows && d.jsonData.rows.length > 0) {
                var str = '';
                var template = '<div class="job-detail"><div class="job-info-main"><h3>{0}</h3>\
                <p class="salary">工资范围：<span>{1}{2}</span></p><p>年龄要求：<span>{3}</span></p>\
                <p class="mechanism">发布机构:<a href="{4}">{5}</a></p></div ><div class="job-desc"><span>岗位要求：</span>\
                <p>{6}</p></div>\
                <div class="teacher"><img src="/images/phone.png">{7}<div class="teacher-phone"><span class="triangle"></span><p>联系电话：</p>\
                <p>{8}</p></div></div></div>';
                d.jsonData.rows.forEach(function (item) {
                    var salary = "";
                    if (item.salary != null) {
                        salary = $.RetainedDecimalPlacesNF(item.salary);
                    }
                    str += template.format([
                        item.positionName,
                        salary,
                        item.salaryTypeValue,
                        item.age,
                        'http://' + item.websiteUrl + '/job.html',
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
        //清除已选
        $('.selected-text').html('');
        $('.clear-all').hide();
        //清除服务工种菜单
        $("#serviceTypeList span").removeClass('active');
        //清除年龄菜单
        $("#ageRangeList span").removeClass('active');
        //清除薪资
        $("#incomeList .option-container").removeClass('region-active');
        $("#incomeItemList .option").removeClass('region-selected');
        $(".option-item").hide();
        //清除省市
        $("#province .option-container").removeClass('region-active');
        $(".option-item").hide();

        //启动“不限”
        $(".option-default").addClass('active');
        provinceCodeSelected = '';
        cityCodeSelected = '';
        serviceTypeSelected = '';
        ageSelected = '';
        salarySelected = '';
        salaryTypeSelected = '';
        pageIndex = 1;
        jobFilter();
    });

    /**
     * 删除工种条件
     */
    $('.selected').on('click', '._servicetype', function () {
        $('#allServiceType').click();
        toggleClearAll();
        serviceTypeSelected = '';
        pageIndex = 1;
        jobFilter();
    })

    /**
     * 删除年龄条件
     */
    $('.selected').on('click', '._agerange', function () {
        $('#allAgeRange').click();
        toggleClearAll();
        ageSelected = '';
        pageIndex = 1
        jobFilter();
    })

    /**
     * 删除薪资条件
     */
    $('.selected').on('click', '._salary', function () {
        $('#allIncome').click();
        toggleClearAll();
        salarySelected = '';
        salaryTypeSelected = '';
        pageIndex = 1;
        jobFilter();

    })

    /**
     * 删除区域条件
     */
    $('.selected').on('click', '._city', function () {
        $('#allRegion').click();
        toggleClearAll();
        provinceCodeSelected = '';
        cityCodeSelected = '';
        pageIndex = 1;
        jobFilter();
    })

    //薪资大类
    $("#incomeList").on('click', '.option-container', function () {
        var _self = $(this),
            _index = _self.index(),
            _isactive = _self.hasClass('region-active');
        var _self = $(this);
        if (_self.hasClass('disabled')) {
            return;
        }
        if (_isactive) {
            _self.removeClass('region-active')
            $('.option-item').hide();
            return;
        }
        $('.option-item').hide();
        $('.option-container').removeClass('region-active').css('z-index', '2');
        $("#incomeItemList .option-item").eq(_index).show().siblings().hide();
        _self.addClass('region-active').siblings().removeClass('region-active');
        _self.css('z-index', '4').siblings().css('z-index', '2');
    });

    //薪资小类
    $('#income').on('click', '#incomeItemList .option-item span,#allIncome', function () {
        var _self = $(this);
        $('#allIncome').removeClass('active');
        $('#incomeItemList .option-item span').removeClass('region-selected');
        if (_self.hasClass('option-default')) {
            $('._salary').remove();
            _self.addClass('active');
            salarySelected = '';
            salaryTypeSelected = '';
        } else {
            salarySelected = _self.data('id');
            salaryTypeSelected = _self.data('pid');
            var _selected = $(".selected-text").find('._salary');
            if (_selected.length > 0) {
                _selected.replaceWith("<span class='_salary'>" + _self.data('name') + "&nbsp;×</span>");
            } else {
                $(".selected-text").append("<span class='_salary'>" + _self.data('name') + "&nbsp;×</span>");
            }
            _self.addClass('region-selected')
        }
        $('.option-item').hide();
        $('#province').find('.region-active').removeClass('region-active');
        $("#incomeList .option-container").removeClass('region-active');
        pageIndex = 1;
        toggleClearAll();
        jobFilter()
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
    $('#province').on('click', '.option-container', function () {
        var _self = $(this);
        if (_self.hasClass('disabled')) {
            return;
        }
        if (_self.hasClass('region-active')) {
            _self.removeClass('region-active')
            $('.option-item').hide();
            return;
        }
        $('.option-item').hide();
        $('.option-container').removeClass('region-active').css('z-index', '2');

        getCity(_self.data('areacode'), _self.data('areaname'));
        $("#region .option-container").removeClass('active').removeClass('region-active');
        var top = _self.offset().top,
            baseOffsetTop = $($('#province .option-container')[1]).offset().top,
            baseOffsetTop = baseOffsetTop || 290;
        //290是省份第一行距离最上面的高度
        //53是省份的高度
        if (top <= baseOffsetTop) {
            $('#region .option-item').css('top', '42px').show();
        } else if (top <= baseOffsetTop + 43) {
            $('#region .option-item').css('top', '85px').show();
        } else if (top <= baseOffsetTop + 43 * 2) {
            $('#region .option-item').css('top', '128px').show();
        } else {
            $('#region .option-item').css('top', '171px').show();
        }
        _self.css('z-index', '4').siblings().css('z-index', '2');
        _self.addClass('region-active');
    })
    //市区域
    $('.cities').on('click', 'span', function () {
        var _self = $(this);
        $('#allRegion').removeClass('active');
        cityCodeSelected = _self.data('areacode')
        provinceCodeSelected = _self.data('pcode')
        var citySelected = $(".selected-text").find('._city')
        if (citySelected.length > 0) {
            citySelected.replaceWith("<span class='_city'>" + _self.data('areaname') + "&nbsp;×</span>");
        } else {
            $(".selected-text").append("<span class='_city'>" + _self.data('areaname') + "&nbsp;×</span>");
        }
        if (_self.hasClass('region-def')) {
            //$('#region .option-default').addClass('active');
            //选中的城市，不标记颜色，因为下次重新填充html
            // _self.siblings().removeClass('region-selected');
            // _self.addClass('region-selected')
        } else {
            //$('#region .option-default').removeClass('active');
            // _self.siblings().removeClass('region-selected');
            // _self.addClass('region-selected')
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

    //服务工种
    $('#serviceType').on('click', '.option-default,.option', function () {
        var _self = $(this);
        if (_self.hasClass('disabled')) {
            return;
        }
        $('#serviceType').find('.option-default,.option').removeClass('active');
        _self.addClass('active');
        //不限分类
        if (_self.hasClass('option-default')) {
            serviceTypeSelected = '';
            $('._servicetype').remove();
        } else {
            serviceTypeSelected = $(this).data('id');
            var _selected = $(".selected-text").find('._servicetype');
            if (_selected.length > 0) {
                _selected.replaceWith("<span class='_servicetype'>" + _self.html() + "&nbsp;×</span>");
            } else {
                $(".selected-text").append("<span class='_servicetype'>" + _self.html() + "&nbsp;×</span>");
            }
        }
        pageIndex = 1;
        toggleClearAll();
        jobFilter();
    });

    //年龄要求
    $('#ageRange').on('click', '.option-default,.option', function () {
        var _self = $(this);
        var _self = $(this);
        if (_self.hasClass('disabled')) {
            return;
        }
        $('#ageRange').find('.option-default,.option').removeClass('active');
        _self.addClass('active');
        //不限分类
        if (_self.hasClass('option-default')) {
            ageSelected = '';
            $('._agerange').remove();
        } else {
            ageSelected = $(this).data('id');
            var _selected = $(".selected-text").find('._agerange');
            if (_selected.length > 0) {
                _selected.replaceWith("<span class='_agerange'>" + _self.html() + "&nbsp;×</span>");
            } else {
                $(".selected-text").append("<span class='_agerange'>" + _self.html() + "&nbsp;×</span>");
            }
        }
        pageIndex = 1;
        toggleClearAll();
        jobFilter();
    });


    //查看详情
    $('.course-list').on('click', '.course-item', function () {
        window.location.href = '/html/college-detail.html?id=' + $(this).data('id');
    })


})