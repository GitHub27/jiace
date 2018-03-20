(function ($) {
    $.extend({
        AkmiiAjaxPost: function (url, data, loading) {
            var dtd = $.Deferred();
            if (loading) {
            };
            $.ajax(url, {
                type: "POST",
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function (request) {
                },
            }).then(function (d) {
                if (loading) {
                }
                dtd.resolve(d);
            }, function (d) {
                if (loading) {
                }
                dtd.reject(defaultError);
            });
            return dtd.promise();
        },
        AkmiiAjaxGet: function (url, data, loading) {
            if (loading) {
            }
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
                }
                else {
                    result += item + "=" + obj[item] + "&";
                }
            });
            return result.substring(0, result.length - 1);
        }
    })
})($)