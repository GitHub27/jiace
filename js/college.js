$(function () {
    $(".region-name").mouseover(function (e) {
        var _width = $(e.target).offset().left
        $(e.target).addClass('active').siblings("div").removeClass('active');
        var width = 0;
        var preAll = $(e.target).prevAll("div").each(function (i) {
            width += $(this).innerWidth();
        });
        $(".region-cities").show().css('margin-left', (width + 167) + 'px')
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

    //菜单
    $(".region .option-default,.region .option-container").click(function () {
        $(".region .option-default,.region .option-container").removeClass('active').removeClass('region-active');
        var _self = $(this);
        if (_self.hasClass('option-default')) {
            _self.addClass('active');
        } else {
            _self.addClass('region-active');
        }
    });
    //城市区域

})