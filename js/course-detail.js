$(function () {
    $(".tablist span").click(function () {
        var _self = $(this);
        _self.addClass('active').siblings().removeClass('active')
        var type = _self.data('type');
        console.log(type)
        var relationDom = $("#" + type);
        relationDom.show().siblings().hide();
    });
    var pageNumber = 1;
    var pageSize = 12;
    var courseid = $.getQueryStringByName('id')
    getCourseDetail();
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
        var pageNumber = page_index + 1;
        //queryNearbyCompany(pageNumber, pageSize, obj.more, obj.privince, obj.area);
    };


    //课程详情
    function getCourseDetail() {
        $.AkmiiAjaxGet(window.api_list.course_detail + courseid, {}, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<div class="course-detail-head"><div class="course-column course-logo-big" >\
                <img src="{0}">{1}</div>\
                <div class="course-column course-info-warp"><p class="course-name">{2}<span class="course-online">已有{3}人参加</span></p>\
                <div class="course-info-list"><p class="course-info bb-dashed">适合工种：{4}</p><p class="course-info course-line1">\
                <span>总课时：{5}课时</span><span>课程等级：{6}</span></p><p class="course-info">发证机构：{7}</p>\
                </div><img class="stydy" src="/images/stydy.png"></div></div>';
                str = template.format([
                    d.jsonData.courseImg || "/images/course-detail-logo.png",
                    gradeImg(d.jsonData.authenticateGrade),
                    d.jsonData.courseName,
                    d.jsonData.orderNum,
                    d.jsonData.courseSuitableJob,
                    d.jsonData.totalHours,
                    d.jsonData.authenticateGrade,
                    d.jsonData.authorityName,
                ]);
                $(".course-detail-head").replaceWith(str);
                $("#outline .info-item").html(d.jsonData.courseBrief);//简介
                $("#intro .info-item").html(d.jsonData.courseOutline);//大纲
            }
        }, function () {

        })
    }

    //学院列表
    function getCourseList(iscb) {
        $.AkmiiAjaxGet(window.api_list.schoollist_incourse, { "courseId": courseid, 'pageIndex': pageNumber, 'pageSize': pageSize }, false).then(function (d) {
            if (d.jsonData) {
                var str = '';
                var template = '<div class="course-item"><div class="course-detail"><div class="course-column course-logo">\
                <img src="/images/course-logo.png"></div><div class="course-column"><p class="course-name">家策健康学院</p><p class="course-info">\
                <img src="/images/course-teacher.png">王老师、杨老师</p><p class="course-info"><img src="/images/course-phone.png">021-84188797</p>\
                <p class="course-info"><img src="/images/course-address.png">上海市徐汇区南丹东路300号亚都商务楼1201室</p></div><div class="course-column score">\
                <p><img src="/images/stars.png"></p><p class="score-text">母婴护理 育婴师 家政服务员 健康照护 养老护理员 泌乳师</p></div></div></div>';
                d.jsonData.rows.forEach(function (item) {
                    str += template.format([
                        d.jsonData.courseImg || "/images/course-detail-logo.png",
                        gradeImg(d.jsonData.authenticateGrade),
                        d.jsonData.courseName,
                        d.jsonData.orderNum,
                        d.jsonData.courseSuitableJob,
                        d.jsonData.totalHours,
                        d.jsonData.authenticateGrade,
                        d.jsonData.authorityName,
                    ])
                });
                $(".course-detail-head").replaceWith(str);
                $("#outline .info-item").html(d.jsonData.courseBrief);//简介
                $("#intro .info-item").html(d.jsonData.courseOutline);//大纲
                if (!iscb) {
                    pagination(d.jsonData.records);
                }
            } else {
                $(".course-list").html('<div style="margin:300px 0 250px;background-color:#f6f6f6;" class="isnull" style="margin"><img src = "/images/null.png"></div>')
            }
        }, function () {

        })
    }

    /**
     * 等级
     * 初级02  中级03  高级04
     */
    function gradeImg(no) {
        switch (no) {
            case '02':
                return '<img class="grade" src="/images/grade1.png">';
            case '03':
                return '<img class="grade" src="/images/grade2.png">';
            case '04':
                return '<img class="grade" src="/images/grade3.png">';
            default:
                return '';
        }
    }

})