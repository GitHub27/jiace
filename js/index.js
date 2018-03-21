$(function () {
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
