﻿(function ($) {
    $(".mark").click(function () {
        $(".mark,.fixed-login").hide();
    });
    $(".login-menu,.login-img").click(function () {
        $(".mark,.fixed-login").show();
    });
    defaultError = "网络异常"
    var apiprefix = "http://139.224.49.192:9006";
    window.api_list = {
        /**省份 */
        province: apiprefix + "/jiacerapps/api/common/area/province",
        city: apiprefix + "/jiacerapps/api/common/area/city",
        course_base: apiprefix + "/jiacerapps/course/base/page/",
        course_detail: apiprefix + '/jiacerapps/course/base/',
        college_filter: apiprefix + '/jiacerapps/api/school/pageSchoolwithLearn',
        college_detail: apiprefix + '/jiacerapps/api/school/',
        college_courselist: apiprefix + '/jiacerapps/course/page',
    }
    String.prototype.format = function (e) {
        var result = this;
        if (arguments.length > 0) {
            if ((e.constructor + '').indexOf('Array') > 0) {
                for (var i = 0; i < e.length; i++) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, e[i]);
                }
            } else if (typeof (e) === 'object') {

            }
        }
        return result;
    }
    $.extend({
        AkmiiAjaxPost: function (url, data, loading) {
            var dtd = $.Deferred();
            if (loading) { };
            $.ajax(url, {
                type: "POST",
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (request) { },
            }).then(function (d) {
                if (loading) { }
                dtd.resolve(d);
            }, function (d) {
                if (loading) { }
                dtd.reject(defaultError);
            });
            return dtd.promise();
        },
        AkmiiAjaxGet: function (url, data, loading) {
            if (loading) { }
            var dtd = $.Deferred();
            url = url + $.ObjectToParameter(data);
            var thisurl = url;
            if (url.indexOf('?') < 0) {
                thisurl += '?_timestamp=' + (new Date()).getTime();
            } else {
                thisurl += '&_timestamp=' + (new Date()).getTime();
            }
            $.ajax({
                url: thisurl,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (request) {

                }
            }).then(function (d) {
                dtd.resolve(d);
            }, function (d) {
                dtd.reject(defaultError);
            });
            return dtd.promise();
        },
        ObjectToParameter: function (obj) {
            var arr = Object.keys(obj);
            if (arr.length == 0)
                return '';
            var result = '';
            arr.forEach(function (item, index) {
                if (index == 0) {
                    result += "?" + item + "=" + obj[item] + "&";
                } else {
                    result += item + "=" + obj[item] + "&";
                }
            });
            return result.substring(0, result.length - 1);
        },
        //获取url参数
        getQueryStringByName: function (name) {
            var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return result[1];
        },
    })
})($)