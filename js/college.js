$(function () {

    function getProvince() {
        // $.AkmiiAjaxGet(window.api_list.province, {}, false).then(function () {
        //     console.log(0)
        // })
        var jsonData = [{
                "areaCode": "110000",
                "areaName": "北京市",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "120000",
                "areaName": "天津市",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "130000",
                "areaName": "河北省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "140000",
                "areaName": "山西省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "150000",
                "areaName": "内蒙古自治区",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "210000",
                "areaName": "辽宁省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "220000",
                "areaName": "吉林省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "230000",
                "areaName": "黑龙江省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "310000",
                "areaName": "上海市",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "320000",
                "areaName": "江苏省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "330000",
                "areaName": "浙江省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "340000",
                "areaName": "安徽省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "350000",
                "areaName": "福建省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "360000",
                "areaName": "江西省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "370000",
                "areaName": "山东省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "410000",
                "areaName": "河南省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "420000",
                "areaName": "湖北省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "430000",
                "areaName": "湖南省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "440000",
                "areaName": "广东省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "450000",
                "areaName": "广西壮族自治区",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "460000",
                "areaName": "海南省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "500000",
                "areaName": "重庆市",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "510000",
                "areaName": "四川省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "520000",
                "areaName": "贵州省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "530000",
                "areaName": "云南省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "540000",
                "areaName": "西藏自治区",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "610000",
                "areaName": "陕西省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "620000",
                "areaName": "甘肃省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "630000",
                "areaName": "青海省",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "640000",
                "areaName": "宁夏回族自治区",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            },
            {
                "areaCode": "650000",
                "areaName": "新疆维吾尔自治区",
                "parentCode": null,
                "areaLevel": null,
                "parent": null,
                "childList": null
            }
        ];
        var provinceStr = '';
        var provinceTemplate = '<div class="option-container"><span class="option-head">{0}</span></div>';
        jsonData.forEach(function (item) {
            provinceStr += provinceTemplate.format([item.areaName]);
        });
        $("#province").html(provinceStr)
        console.log(provinceStr);
    }
    //getProvince();


    //城市区域
    $('.region').on('click', '.option-default,.option-container', function () {
        $(".region .option-default,.region .option-container").removeClass('active').removeClass('region-active');
        var _self = $(this);
        if (_self.hasClass('option-default')) {
            _self.addClass('active');
            $('.option-item').hide();
        } else {
            _self.css('z-index', '4').siblings().css('z-index', '2');
            _self.addClass('region-active');
            $('.option-item').show();
        }
    });


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