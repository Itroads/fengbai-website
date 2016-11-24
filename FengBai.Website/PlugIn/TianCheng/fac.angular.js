angular.module('fac.angular', []).factory('PageService', ['$http', function ($http) {
    //查询列表（无分页控件模式）
    var _Search = function (postData) {
        if (typeof (postData) == 'undefined') {
            postData = {};
            postData.pn = "query";
            postData.pv = "";
        }
        var option = {};
        var localUrl = getOptionUrl(postData);
        //设置调用后台的方法名称
        if (typeof (postData.mn) == 'undefined') {
            option.url = localUrl + "/onSearch";
        } else if (typeof (postData.mn) == 'string' && postData.mn.length > 0) {
            option.url = (localUrl + "/" + postData.mn);
        }
        if (typeof (postData.pv) == 'undefined') {
            var data = postData;
            postData = {};
            postData.pv = data;
        }
        if (typeof (postData.pn) == 'undefined') {
            postData.pn = "query";
        }
        option.data = getOptionData(postData);
        return $http.post(option.url, option.data);
    }
    //查询列表（有分页控件模式）
    var _SearchPaging = function (postData) {
        var option = {};
        var localUrl = getOptionUrl(postData);
        //设置调用后台的方法名称
        if (typeof (postData.mn) == 'undefined') {
            option.url = localUrl + "/onSearchPaging";
        } else if (typeof (postData.mn) == 'string' && postData.mn.length > 0) {
            option.url = (localUrl + "/" + postData.mn);
        }
        if (typeof (postData.pv) == 'undefined') {
            var data = postData;
            postData = {};
            postData.pv = data;
        }
        if (typeof (postData.pn) == 'undefined') {
            postData.pn = ["query", "orderBy", "pageIndex", "pageSize"];
        }
        option.data = getOptionData(postData);
        return $http.post(option.url, option.data);
    }
    //单个查询
    var _SearchById = function (postData) {
        var option = {};
        var localUrl = getOptionUrl(postData);
        //设置调用后台的方法名称
        if (typeof (postData.mn) == 'undefined') {
            option.url = localUrl + "/onSearchById";
        } else if (typeof (postData.mn) == 'string' && postData.mn.length > 0) {
            option.url = (localUrl + "/" + postData.mn);
        }
        if (typeof (postData.pv) == 'undefined') {
            var data = postData;
            postData = {};
            postData.pv = data;
        }
        if (typeof (postData.pn) == 'undefined') {
            postData.pn = "id";
        }
        option.data = getOptionData(postData);
        return $http.post(option.url, option.data);
    }
    //保存方法
    var _Save = function (postData) {
        var option = {};
        var localUrl = getOptionUrl(postData);
        //设置调用后台的方法名称
        if (typeof (postData.mn) == 'undefined') {
            option.url = localUrl + "/onSave";
        } else if (typeof (postData.mn) == 'string' && postData.mn.length > 0) {
            option.url = (localUrl + "/" + postData.mn);
        }
        if (typeof (postData.pv) == 'undefined') {
            var data = postData;
            postData = {};
            postData.pv = data;
        }
        if (typeof (postData.pn) == 'undefined') {
            postData.pn = "entityInfo";
        }
        option.data = getOptionData(postData);
        return $http.post(option.url, option.data);
    }
    //删除方法
    var _Delete = function (postData) {
        var option = {};
        var localUrl = getOptionUrl(postData);
        //设置调用后台的方法名称
        if (typeof (postData.mn) == 'undefined') {
            option.url = localUrl + "/onDelete";
        } else if (typeof (postData.mn) == 'string' && postData.mn.length > 0) {
            option.url = (localUrl + "/" + postData.mn);
        }
        if (typeof (postData.pv) == 'undefined') {
            var data = postData;
            postData = {};
            postData.pv = data;
        }
        if (typeof (postData.pn) == 'undefined') {
            postData.pn = "id";
        }
        option.data = getOptionData(postData);
        return $http.post(option.url, option.data);
    }
    var _Extra = function (postData) {
        var option = {};
        var localUrl = getOptionUrl(postData);
        if (typeof (postData.mn) == 'string' && postData.mn.length > 0) {
            option.url = (localUrl + "/" + postData.mn);
        }
        option.data = getOptionData(postData);
        return $http.post(option.url, option.data);
    }
    return {
        Search: function ($scope, postData) {
            return _Search(postData).success(function (response) {
                var data = eval("(" + response.d + ")");
                $scope.dataList = data;
            });
        },
        SearchExtra: function($scope, postData){
            return _Search(postData);
        },
        SearchPaging: function ($scope, postData) {
            return _SearchPaging(postData).success(function (response) {
                var data = eval("(" + response.d + ")");
                $scope.paginationConf.totalItems = data.count;
                $scope.dataList = data.items;
            });
        },
        SearchPagingExtra: function($scope, postData){
            return _SearchPaging(postData);
        },
        SearchById: function ($scope, postData) {
            return _SearchById(postData);
        },
        Save: function ($scope, postData) {
            return _Save(postData);
        },
        Delete: function ($scope, postData) {
            return _Delete(postData);
        },
        Extra: function ($scope, postData) {
            return _Extra(postData);
        }
    }
}]);
//设置异步调用的地址
var getOptionUrl = function (queryConditions) {
    if (queryConditions == 'undefined') {
        alert("queryConditions = undefined1");
    }
    var localUrl;
    if (queryConditions.selUrl != null && queryConditions.selUrl != 'undefined') {
        localUrl = queryConditions.selUrl;
    }
    else {
        localUrl = window.location.href;
        if (localUrl.indexOf("?") > 0) {
            localUrl = localUrl.substring(0, localUrl.indexOf("?"));
        }
    }
    return localUrl;
}
var getOptionData = function (queryConditions) {
    if (queryConditions == 'undefined') {
        alert("queryConditions = undefined2");
    }
    //无参调用
    if (typeof (queryConditions.pn) == 'undefined') {
        return "";
    }

    //将一个参数改成多个
    if (typeof (queryConditions.pn) != "object") {
        queryConditions.pn = [queryConditions.pn];
        queryConditions.pv = [queryConditions.pv];
    }
    //多个参数
    var submitObject = new function () { };
    for (var i = 0; i < queryConditions.pn.length; i++) {
        var pn = queryConditions.pn[i];
        var pv = typeof (queryConditions.pv[i]) == "function" ? queryConditions.pv[i]() : queryConditions.pv[i];
        if (typeof (pn) == "undefined" || pn == "") continue;
        if (typeof (pv) == "undefined") pv = "";
        submitObject[pn] = typeof (pv) == "object" ? $.toJSON(pv) : pv;
    }
    return $.toJSON(submitObject);
}