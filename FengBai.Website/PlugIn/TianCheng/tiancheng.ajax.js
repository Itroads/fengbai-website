/// <reference path="../JQuery/jquery-1.8.2-vsdoc.js" />
(function ($) {
    jQuery.extend({
        ajaxSimple: function (ajaxOption) {
            var getOptions = function (ajaxOption) {
                var baseSuccess = function (result, onSucceed, onWrong, option) {

                    var resultObject = {};
                    if (typeof result.d == "string") {
                        resultObject = eval("(" + result.d + ")");
                    }
                    if (typeof result == "object" && typeof result.Status != "undefined") {
                        resultObject = result;
                    }

                    //如果返回结果状态是错误的。
                    if (resultObject.Status == "0") {
                        if (typeof (onWrong) == "undefined") { alert(resultObject.ErrorInfo); }
                        else { onWrong(resultObject.ErrorInfo, option); }
                        return;
                    }
                    //返回结果状态是处理成功的
                    if (resultObject.Status == "1") {
                        if (typeof (onSucceed) == "undefined") { alert(resultObject.DataObject); }
                        else {
                            var reObj = resultObject.DataObject;
                            //如果是一个数组，转换一下
                            if (typeof reObj == "string" && reObj.length >= 2 && reObj.slice(0, 1) == "[" && reObj.slice(-1) == "]") {
                                reObj = eval("(" + reObj + ")");
                            }
                            //如果是一个对象，转换一下
                            if (typeof reObj == "string" && reObj.length >= 2 && reObj.slice(0, 1) == "{" && reObj.slice(-1) == "}") {
                                reObj = eval("(" + reObj + ")");
                            }

                            //判断是否有时间类型，进行时间转换
                            for (var p in reObj) {
                                if (typeof reObj[p] == "object") {
                                    for (var sp in reObj[p]) {
                                        if (typeof reObj[p][sp] == "string" && reObj[p][sp].indexOf("T") > reObj[p][sp].indexOf("-")) {
                                            reObj[p][sp] = Date.fromJsonNet(reObj[p][sp]);
                                        }
                                    }
                                }
                                if (typeof reObj[p] == "string" && reObj[p].indexOf("T") > reObj[p].indexOf("-")) {
                                    reObj[p] = Date.fromJsonNet(reObj[p]);
                                }
                            }
                            onSucceed(reObj, option);
                        }
                        return;
                    }
                }
                var baseSending = function (XMLHttpRequest, onSend, option) {
                    if (typeof (onSend) == "undefined") { return true; }
                    else { onSend(XMLHttpRequest, option); return true; }
                }

                var option = {
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function (XMLHttpRequest) { this.bSending(XMLHttpRequest, this.onSend, this.conOption); },
                    bSending: baseSending,
                    onSend: ajaxOption.sending,
                    success: function (result) { this.bSuccess(result, this.onSucceed, this.onWrong, this.conOption); },
                    error: function (result, status) {
                        /* 运行到此处，说明ajax调用出现异常。 */
                    },
                    bSuccess: baseSuccess,
                    onSucceed: ajaxOption.sFun,
                    onWrong: ajaxOption.eFun,
                    conOption: ajaxOption.conOption


                };
                //获取异步调用的地址和方法
                var locaUrl;
                if (ajaxOption.selUrl != null && ajaxOption.selUrl != 'undefined') {
                    locaUrl = ajaxOption.selUrl;
                }
                else {
                    locaUrl = window.location.href;
                    if (locaUrl.indexOf("?") > 0) {
                        locaUrl = locaUrl.substring(0, locaUrl.indexOf("?"));
                    }
                }

                //设置调用后台的url地址以及方法名称
                if (typeof (ajaxOption.mn) == 'undefined') {
                    option.url = locaUrl;
                } else if (typeof (ajaxOption.mn) == 'string' && ajaxOption.mn.length > 0) {
                    option.url = locaUrl + "/" + ajaxOption.mn;
                }

                var getOptionData = function () {
                    //无参调用
                    if (typeof (ajaxOption.pn) == 'undefined') {
                        return "";
                    }

                    //将一个参数改成多个
                    if (typeof (ajaxOption.pn) != "object") {
                        ajaxOption.pn = [ajaxOption.pn];
                        ajaxOption.pv = [ajaxOption.pv];
                    }
                    //多个参数
                    var submitObject = new function () { };
                    for (var i = 0; i < ajaxOption.pn.length; i++) {
                        var pn = ajaxOption.pn[i];
                        var pv = typeof (ajaxOption.pv[i]) == "function" ? ajaxOption.pv[i]() : ajaxOption.pv[i];
                        if (typeof (pn) == "undefined" || pn == "") continue;
                        if (typeof (pv) == "undefined") pv = "";
                        submitObject[pn] = typeof (pv) == "object" ? $.toJSON(pv) : pv;
                    }
                    return $.toJSON(submitObject);
                }
                option.data = getOptionData();

                return option;
            }
            $.ajax(getOptions(ajaxOption));
        }
    });

})(jQuery);

(function ($) {
    jQuery.extend({
        tcAjax: function (tcOption) {
            var option = {};
            //if (tcOption.pn) option.pn = tcOption.pn;
            //if (tcOption.pv) option.pv = tcOption.pv;
            //if (tcOption.sending) option.sending = tcOption.sending;
            //if (tcOption.sFun) option.sFun = tcOption.sFun;
            //if (tcOption.eFun) option.eFun = tcOption.eFun;
            //if (tcOption.mn) option.eFun = tcOption.mn;
            if (!tcOption.cn) alert("必须输入调用类名");

            $.ajaxSimple({
                selUrl: "TCAjax.ajax.tc",
                mn: tcOption.mn, pn: tcOption.pn, pv: tcOption.pv,
                sending: function (XMLHttpRequest, option) {
                    XMLHttpRequest.setRequestHeader("TC-RequestType", "Ajax");
                    if (typeof tcOption.an != "undefined") {
                        XMLHttpRequest.setRequestHeader("assembly", tcOption.an);
                    }
                    XMLHttpRequest.setRequestHeader("className", tcOption.cn);
                    XMLHttpRequest.setRequestHeader("methodName", tcOption.mn);
                    if (typeof tcOption.sending == "function") {
                        tcOption.sending(XMLHttpRequest, option);
                    }
                    return;
                },
                sFun: tcOption.sFun,
                eFun: tcOption.eFun
            });
        }
    });
})(jQuery);


(function ($) {
    jQuery.extend({
        tcAjaxHtml: function (tcOption) {
            var option = {};
            $.ajaxSimple({
                selUrl: "TCAjax.ajax.tc",
                mn: tcOption.mn, pn: tcOption.pn, pv: tcOption.pv,
                sending: function (XMLHttpRequest, option) {
                    XMLHttpRequest.setRequestHeader("TC-RequestType", "AjaxHtml");
                    if (typeof tcOption.an != "undefined") {
                        XMLHttpRequest.setRequestHeader("assembly", tcOption.an);
                    }
                    XMLHttpRequest.setRequestHeader("srcName", tcOption.sn);
                    if (typeof tcOption.sending == "function") {
                        tcOption.sending(XMLHttpRequest, option);
                    }
                    return;
                },
                sFun: tcOption.sFun,
                eFun: tcOption.eFun
            });
        }
    });
})(jQuery);

$(function () {
    $(".button_default").hover(function () { if (!$(this).hasClass("button_disable")) { $(this).addClass("button_hover"); } },
                               function () { $(this).removeClass("button_hover"); });
});

//等待窗口
var wait = {
    show: function (message) {
        if ($("#waitModal").length == 0) {
            $("body").append(wait.html());
            $("#waitModal .wait-backdrop").css("height", $(document).height());
            $("#waitModal .wait-content").css("top", ($(document).height() - 100) / 2).css("left", ($(document).width() - 800) / 2);
        }
        if (typeof message != "undefined") {
            $("#waitModal .waitText").text(message);
        }

        $("#waitModal").show();
    },
    hide: function () {
        $("#waitModal").hide();
    },
    html: function () {

        var str = '';
        //var str = '<div class="modal " id="waitModal" data-backdrop="static" style="margin: 0 auto; width: 800px; top: 150px; z-index: 9999">';
        //str += '<div class="modal-body modal-content">';
        //str += '<img src="Wechat/Src/loading.gif.tc" style="width:25px;height:25px;"/>';
        //str += '<span class="waitText">加载中，请稍后。</span>';
        //str += '</div>';
        //str += '</div>';

        str += '<div id="waitModal" style="display: block;">';
        str += '    <div class="wait-backdrop" style="width: 100%; z-index: 9999; position: fixed; top: 0px; left: 0px; opacity: 0.5; background-color: #000;"></div>';
        str += '    <div class="wait-content" style="width: 800px; height: 55px; z-index: 10000; padding: 15px; position: fixed; background-color: #FFF; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 6px;">';
        str += '        <img style="width: 25px; height: 25px; margin: 0 20px 0 30px" src="Wechat/Src/loading.gif.tc" />';
        str += '        <span class="waitText">加载中，请稍后。</span>';
        str += '    </div>';
        str += '</div>';

        return str;
    }
};


var jsonTran = {
    toDataString: function (data) {
        if (typeof data == "function") {
            data = data();
        }
        var da = eval('new ' + data.replace(/\//g, ''));
        return da.getFullYear() + "年" + da.getMonth() + "月" + da.getDate() + "日";
    },
    toDataValue: function (data) {
        if (typeof data == "function") {
            data = data();
        }
        var da = eval('new ' + data.replace(/\//g, ''));
        return da.getFullYear() + "-" + parseInt(parseInt(da.getMonth()) + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();
    }
}



// 格式化时间
Date.prototype.tcString = function (fm) {
    if (typeof fm != "string") {
        alert("格式不正确");
    }
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var day = this.getDate();
    var hours = this.getHours();
    var minutes = this.getMinutes();
    var seconds = this.getSeconds();

    var MM = month.toString().length < 2 ? "0" + month.toString() : month.toString();
    var dd = day.toString().length < 2 ? "0" + day.toString() : day.toString();
    var hh = hours.toString().length < 2 ? "0" + hours.toString() : hours.toString();
    var mm = minutes.toString().length < 2 ? "0" + minutes.toString() : minutes.toString();
    var ss = seconds.toString().length < 2 ? "0" + seconds.toString() : seconds.toString();

    var result = fm;
    result = result.replace("yyyy", year.toString());
    result = result.replace("yyy", year.toString().slice(-3));
    result = result.replace("yy", year.toString().slice(-2));
    result = result.replace("MM", MM);
    result = result.replace("M", month.toString());
    result = result.replace("dd", dd);
    result = result.replace("d", day.toString());
    result = result.replace("hh", hh);
    result = result.replace("h", hours.toString());
    result = result.replace("mm", mm);
    result = result.replace("m", minutes.toString());
    result = result.replace("ss", ss);
    result = result.replace("s", seconds.toString());
    return result;
}
//将josn.net的时间转换成时间对象
Date.fromJsonNet = function (json) {
    if (typeof json == "string") {
        var s_1 = json.indexOf("-");
        var s_2 = json.indexOf("-", s_1 + 1);
        var st = json.indexOf("T");
        var sm1 = json.indexOf(":");
        var sm2 = json.indexOf(":", sm1 + 1);

        if (s_1 == 4 && s_2 > s_1 && st > s_2 && sm1 > st && sm2 > sm1) {
            var year = json.substr(0, 4);
            var month = parseInt(json.slice(s_1 + 1, s_2)) - 1;
            var day = json.slice(s_2 + 1, st);
            var hours = json.slice(st + 1, sm1);
            var minutes = json.slice(sm1 + 1, sm2);
            var seconds = json.substr(sm2 + 1, 2);
            return new Date(year, month, day, hours, minutes, seconds);
        }
    }
    return json;
}