$(function () {
    var pageIndex = 1,
        pageSize = 6,
        isFirst = true
        ;
    getCollegeList();

    //获取培训学校
    function getCollegeList() {
        $.AkmiiAjaxGet(window.api_list.college_filter, { pageIndex: pageIndex, pageSize: pageSize }, false).then(function (d) {
            if (d.jsonData && d.jsonData.rows && d.jsonData.rows.length > 0) {
                var str = '';
                var template = '<li><a class="school-link" href="{0}"><div class="school-info">\
                <div class="school-logo fl"><img src="{1}"></div><div class="school-name fl">\
                <p>{2}</p><img src="/images/stars.png"></div></div><p class="school-position">\
                {3}</p></a></li>';
                d.jsonData.rows.forEach(function (item) {
                    str += template.format([
                        "/html/college-detail.html?id=" + item.id,
                        item.logoUrl || "/images/colloge-logo.png",
                        item.schoolName,
                        item.schoolBrief || ''
                    ]);
                });
                if ($("#pagelist li").length <= 0) {
                    createPageList(d.jsonData.records);
                }
                $("#cologe-list").html(str);
                $("#cologe-list").finde('img').
            }
        }, function () {

        })
    }
    /**生成分页 */
    function createPageList(records) {
        var str = '',
            _pageSize = Math.floor(records / pageSize)
        for (var i = 1; i <= _pageSize; i++) {
            str += '<li class="' + (i == 1 ? 'active' : '') + '" data-num="' + i + '"></li>'
        }
        $("#pagelist").append(str);
    }
    $("#pagelist").on('click', 'li', function () {
        var _self = $(this);
        pageIndex = _self.data('num');
        _self.addClass('active').siblings().removeClass('active');
        getCollegeList();
    });
})