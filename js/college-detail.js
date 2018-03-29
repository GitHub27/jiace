$(function () {


    var collegeID = $.getQueryStringByName('id')
    var pageNumber = 1;
    var pageSize = 20;
    getCollegeDetail();
    getCourseList();

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

    function page_index(page_index) {
        console.log('页数', page_index);
        pageNumber = page_index + 1;
        getCourseList(true);
    };

    /**学院详情 */
    function getCollegeDetail() {
        $.AkmiiAjaxGet(window.api_list.college_detail + collegeID, {}, false).then(function (d) {
            if (d.jsonData) {
                var base_info = '<div class="base-info"><h2>' + d.jsonData.schoolName + '</h2><p><img src="/images/peple1.png"><span>' + d.jsonData.contacts + '&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;' + d.jsonData.contactPhone + '&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;' + d.jsonData.schoolAddressWholeText + '</span></p></div>'
                $('.base-info').replaceWith(base_info);
                $('.infos').append(d.jsonData.schoolBrief);
                $("#logoUrl").attr('src', d.jsonData.logoUrl)
                $('.collge-banner').css('background-image', 'url("' + d.jsonData.schoolBanner.replace('0|', '') + '")')
            }
        }, function () {
        })
    }
    /**课程列表 */
    function getCourseList(iscb) {
        $.AkmiiAjaxGet(window.api_list.college_courselist, { 'institutionInfoId': collegeID, 'pageIndex': pageNumber, 'pageSize': pageSize }, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<a href="/html/course-detail.html?id={7}" class="course-warp {0}"><div class="c-line1"><h4>{1}</h4><p><img src="/images/online.png">\
                <span>{6}</span></p></div><hr><div class="c-line2">适合工种：{2}</div><div class="c-line3">{3}</div>\
                <hr class="w100"><div class="c-line5"><p class="price"><span class="price-now">￥{4}</span>\
                <span class="price-old">￥{5}</span></p><p><img src="/images/buy.png"></p></div></a>';
                d.jsonData.rows.forEach(function (item, index) {
                    str += template.format([
                        (index % 2) == 0 ? '' : 'odd',
                        item.packageName, item.workType,
                        item.summary, item.price,
                        item.originalPrice,
                        item.orderNum,
                        item.id
                    ]);
                });
                $("#coursesList").html(str);
                if (!iscb) {
                    pagination(d.jsonData.records);
                }
            }
        }, function () {

        })
    }
})