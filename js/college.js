$(function () {
    var provinceCode = '',
        cityCode = ''
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
    function getCity(pcode, pname) {
        $.AkmiiAjaxGet(window.api_list.city, { 'pcode': pcode }, false).then(function (d) {
            if (d.jsonData) {
                var cityStr = '';
                var cityTemplate = '<span data-areacode="{1}" data-areaname="{0}">{0}</span>';
                d.jsonData.forEach(function (item) {
                    item.childList.forEach(function (item2) {
                        cityStr += cityTemplate.format([item2.areaName, item2.areaCode]);
                    });
                });
                $(".option-item").html('<span data-areacode="' + pcode + '" data-areaname="' + pname + '" class="region-def">不限</span>' + cityStr)
            }
        }, function () {

        })
    }
    getProvince();

    //城市区域
    $('.region').on('click', '.option-default', function () {
        $(".region .option-default").removeClass('active').removeClass('region-active');
        var _self = $(this);
        if (_self.hasClass('option-default')) {
            _self.addClass('active');
            $('.option-item').hide();
        } else {

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
        if (top < 248) {
            $('.option-item').css('top', '51px').show();
        } else if (top < 301) {
            $('.option-item').css('top', '104px').show();
        } else {
            $('.option-item').css('top', '155px').show();
        }
        _self.css('z-index', '4').siblings().css('z-index', '2');
        _self.addClass('region-active');
    })
    //市区域
    $('.option-item').on('click', 'span', function () {
        var _self = $(this);
        if (_self.hasClass('region-def')) {
            $('.region .option-default').addClass('active');
            _self.siblings().removeClass('region-selected');
            _self.addClass('region-selected')
        } else {
            // cityCode=
            $('.region .option-default').removeClass('active');
            _self.siblings().removeClass('region-selected');
            _self.addClass('region-selected')
        }
    })


    // $("#province").mouseout(function (params) {
    //     // setTimeout(function (params) {
    //     //     $('.option-item').hide();
    //     // }, 10);

    // })
    // $(".option-item").mouseover(function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     return false;
    // })
    // $('.region').on('mouseout', '.option-container', function () {
    //     //$(".region .option-container").removeClass('active').removeClass('region-active');

    // })



    //课程
    $('.option-warp').on('click', '.option-default,.option', function () {
        var parent = $(this).parents(".option-warp")
        $(parent).find('.option-default,.option').removeClass('active');
        $(this).addClass('active');
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