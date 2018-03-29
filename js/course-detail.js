$(function () {
    $(".tablist span").click(function () {
        var type = $(this).data('type');
        console.log(type)
        var relationDom = $("#" + type);
        relationDom.show().siblings().hide();
    });
    var pageNumber = 1;
    var pageSize = 12;
    var courseid = $.getQueryStringByName('id')
    getCourseDetail();

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


    //课程详情
    function getCourseDetail() {
        $.AkmiiAjaxGet(window.api_list.course_detail + courseid, {}, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<span class="option" data-courseid="{0}">{1}</span>';
                d.jsonData.rows.forEach(function (item) {
                    str += template.format([item.courseId, item.courseName]);
                });
                $(".course-detail-head").html(str)
            }
        }, function () {

        })
    }

})