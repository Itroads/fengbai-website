
if (typeof tc == "undefined") {
    tc = {}
}

if (typeof WebUploader == "undefined") {
    //document.write("<script src='../../PlugIn/WebUpload/webuploader.js'><\/script>");

    //AjaxPage("webuploader", "../../PlugIn/WebUpload/webuploader.js");

    $.ajax({
        async: false,//使用同步的Ajax请求  
        url: "../../PlugIn/WebUpload/webuploader.js",
        success: function (msg) {
            IncludeJS("webuploader", msg);
        }
    });
}


//文件上传
tc.uploader = function (btnId, ashx, callback) {
    if (typeof tc.uploader.tag == "undefined") {
        tc.uploader.tag = [];
    }


    tc.uploader.tag[getBtnId(btnId)] = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf: '../../PlugIn/WebUpload/Uploader.swf',

        // 文件接收服务端。
        server: ashx,

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: getBtnId(btnId, true),
        resize: false,
        // 只允许选择图片文件。
        accept: {
            title: '文件类型',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        formData: {
            fileType: "IdentityCard",
            openId: "testOpenId"
        },
        compress: false,
        sendAsBinary: true
    });

    if (typeof callback == "function") {
        tc.uploader.tag[getBtnId(btnId)].uploadCompleteCallBack = function (fileName) {
            //如果返回的是一个网络路径
            if (fileName.indexOf("~") == 0) {
                callback(fileName);
                return;
            }
            //如果返回的是一个对象
            if (fileName.indexOf("{") == 0 && fileName.lastIndexOf("}") == fileName.length - 1) {
                callback(eval("(" + fileName + ")"));
                return;
            }

            alert(fileName);
            return;
        }
    }

    tc.uploader.tag[getBtnId(btnId)].on('uploadProgress', function (file, percentage) {
        wait.show("文件上传中，请稍后。。。");
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    tc.uploader.tag[getBtnId(btnId)].on('uploadSuccess', function (file, result, callback) {
        var fileName = result._raw;
        if (typeof tc.uploader.tag[getBtnId(btnId)].uploadCompleteCallBack == "function") {
            tc.uploader.tag[getBtnId(btnId)].uploadCompleteCallBack(fileName);
        }
    });

    // 文件上传失败，显示上传出错。
    tc.uploader.tag[getBtnId(btnId)].on('uploadError', function (file) {
        alert('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    tc.uploader.tag[getBtnId(btnId)].on('uploadComplete', function (file) {
        wait.hide();
    });


}
function getBtnId(btnId, has) {
    if (has) {
        if (btnId.indexOf("#") != 0) {
            return "#" + btnId;
        }
        return btnId;
    }
    else {
        return btnId.replace("#", "");
    }
}


function IncludeJS(sId, source) {
    if ((source != null) && (!document.getElementById(sId))) {

        var oHead = document.getElementsByTagName('HEAD').item(0);

        var oScript = document.createElement("script");



        oScript.language = "javascript";

        oScript.type = "text/javascript";

        oScript.id = sId;

        oScript.defer = true;

        oScript.text = source;



        oHead.appendChild(oScript);

    }

}


