var tcWindow = {
    //打开一个窗口
    open: function (option) {
        if (typeof option == "string") {
            var url = option;
            option = {};
            option.url = url;
        }
        if (typeof option == "object") {
            if (!option.url) return;
            if (!option.title) {
                option.title = "选择窗口";
            }
            if (!option.width) { option.width = 900; }
            if (!option.height) { option.height = 500; }
            if (option.callBack) {
                tcWindow.callBack = option.callBack;
            }
            if (typeof option.hasClose == "undefined") {
                option.hasClose = true;
            }
        }

        if (typeof tcWindow.tag == "undefined") {
            var html = "";

            html += '<div class="modal fade tcWindow-dialog" data-backdrop="static">';
            html += '  <div class="modal-dialog">';
            html += '    <div class="modal-content">';
            html += '      <div class="modal-header">';
            html += '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            html += '        <h4 class="modal-title" style="text-align:center;">' + option.title + '</h4>';
            html += '      </div>';
            html += '      <div class="modal-body" style="overflow:auto;">';
            html += '        <iframe src="' + option.url + '" style="border:none;width:100%;height:100%;" ></iframe>';
            html += '      </div>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';
            
            tcWindow.tag = $(html).appendTo($("body", top.document));
        }

        $(tcWindow.tag).find(".modal-title").text(option.title);
        $(tcWindow.tag).find("iframe").attr("src", option.url);
        $(tcWindow.tag).find(".modal-dialog").css("width", option.width);
        $(tcWindow.tag).find(".modal-body").css("height", option.height);
        if (!option.hasClose) {
            $(tcWindow.tag).find(".modal-header .close").hide();
        }
        $(tcWindow.tag).modal("show");
    },
    hideClose:function(){
        $(tcWindow.tag).find(".modal-header .close").hide();
    },
    //关闭当前打开的窗口
    close: function (returnValue) {
        $(tcWindow.tag).modal("hide");
        setInterval(function () { }, 1000);
        if (typeof tcWindow.callBack == "function") {
            tcWindow.callBack(returnValue);
            $(tcWindow.tag).hide();
        }
    },
    alert: function (text) {
        if (typeof tcWindow.alertTag == "undefined") {
            var html = "";
            html += '<div class="modal fade" data-backdrop="static">';
            html += '  <div class="modal-dialog">';
            html += '    <div class="modal-content">';
            html += '      <div class="modal-header">';
            html += '        <button type="button" class="close tcWindow_cancel" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            html += '        <h4 class="modal-title">错误提示</h4>';
            html += '      </div>';
            html += '      <div class="modal-body">';
            html += '        <span class="alertText"></span>';
            html += '      </div>';
            html += '      <div class="modal-footer">';
            html += '        <button type="button" class="btn btn-default tcWindow_cancel" data-dismiss="modal">确定</button>';
            html += '      </div>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';

            tcWindow.alertTag = $(html).appendTo($("body", top.document));
        }
        $(tcWindow.alertTag).find(".modal-body .alertText").text(text);
        $(tcWindow.alertTag).find(".tcWindow_cancel").click(function () { $(tcWindow.alertTag).modal("hide"); });
        $(tcWindow.alertTag).modal("show");
    },
    test: function () {
        var html = '';
        html += '<div class="modal fade" data-backdrop="static">';
        html += '  <div class="modal-dialog">';
        html += '    <div class="modal-content">';
        html += '      <div class="modal-header">';
        html += '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        html += '        <h4 class="modal-title">Modal title</h4>';
        html += '      </div>';
        html += '      <div class="modal-body">';
        html += '        <p>One fine body&hellip;</p>';
        html += '      </div>';
        html += '      <div class="modal-footer">';
        html += '        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
        html += '        <button type="button" class="btn btn-primary">Save changes</button>';
        html += '      </div>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';

        

        tcWindow.testTag = $(html).appendTo($("body",top.document));
        $(tcWindow.testTag).modal("show");
    }
}
$(function () {
    top.tcWindow = tcWindow;
});