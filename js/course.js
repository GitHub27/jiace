$(function () {

    var pageNumber = 1;
    var pageSize = 20;
    getCourseBase();
    function getCourseBase(iscb) {
        $.AkmiiAjaxGet(window.api_list.course_base, { pageIndex: pageNumber, pageSize: pageSize }, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<div data-href="/html/course-detail.html?id={6}" class="course-item"><div class="course-detail"><div class="course-column course-logo">\
                <img src="{1}"></div><div class="course-column"><p class="course-name">{0}<span class="course-online">\
                <img {7} src="/images/course-hot.png"></span></p><hr class="hr"><p class="course-info">课程等级：{2}</p>\
                <p class="course-info">适合工种：{3}</p><p class="course-info">发证机构：{4}</p></div>\
                <div class="course-column score"><p class="online"><img src="/images/online.png">{5}</p><a href="javascript:void(0);" class="course-link"></a></div></div></div>';
                d.jsonData.rows.forEach(function (item) {
                    str += template.format([
                        item.courseName,
                        item.courseImg || '/images/course-logo-big.png',
                        item.authenticateGrade,
                        item.courseSuitableJob,
                        item.authorityName,
                        item.orderNum,
                        item.courseId,
                        item.isHot ? "" : "style='visibility: hidden;'"
                    ]);
                });
                $(".course-list").html(str);
                if (!iscb) {
                    pagination(d.jsonData.records);
                }
            } else {
                $(".course-list").html('<div style="margin:300px 0 250px;background-color:#f6f6f6;" class="isnull" style="margin"><img src = "/images/null.png"></div>')
            }
        }, function () {

        })
    }
    //查看详情
    $('.course-list').on('click', '.course-item', function () {
        window.location.href = $(this).data('href');
    });

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
        getCourseBase(true);
    };
})