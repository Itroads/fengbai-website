<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WCBuildingSiteListPage.aspx.cs" Inherits="FengBai.Website.WeChat.BuildingSite.WCBuildingSiteListPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="../../CSS/WeChat/weui.css" rel="stylesheet" />
    <link href="../../CSS/WeChat/style.css" rel="stylesheet" />
    <script src="../../PlugIn/JQuery/jquery-1.11.0.min.js"></script>
    <style>
        a {
            text-decoration: none;
            color: #000;
        }

        ul li {
            list-style: none;
        }
        /*头部*/
        .header {
            height: 80px;
            width: 100%;
            background-color: #f8f8f8;
            font-size: 1.35em;
            line-height: 80px;
        }

        .header-center {
            width: 50%;
            padding-left: 18%;
        }
        /*导航*/
        .navigation {
            height: 65px;
            background-color: #fff !important;
            border-top: 2px solid #bbb;
            border-bottom: 2px solid #bbb;
            padding-top: 5px;
            padding-bottom: 5px;
        }

        .nav {
            background-color: #fff;
            border-radius: 50px;
            border: 1px solid #bbb;
            margin-right: 1%;
            margin-left: 1%;
            cursor: pointer;
            font-size: 37px;
            padding-top: 5px !important;
        }

        .weui-tab {
            height: 63px;
        }

        .weui-navbar__item:after {
            border-right: none;
        }
        /*每个工程*/
        .weui-media-box::before {
            border-top: none !important;
        }

        .project {
            border-bottom: 1px solid #bbb !important;
        }

        .pro {
            height: 200px;
        }

        .weui-media-box_appmsg .weui-media-box__hd {
            height: 140px !important;
        }

        .weui-media-box {
            height: 170px !important;
        }

        .picture1 {
            width: 15% !important;
        }

        .picture2 {
            width: 65% !important;
        }

        .picture3 {
            width: 20% !important;
        }

        .picture2 h4 {
            font-size: 37px;
            line-height: 220%;
        }

        .circle-pic {
            border-radius: 50%;
            width: 130px !important;
            height: 130px !important;
            padding-top: 5px;
        }

        .block-pic {
            height: 140px !important;
            width: 140px !important;
        }

        .projectdetail {
            height: 80px;
            width: 100%;
            background-color: #E8E1E8;
            border-bottom: 1px solid #bbb;
        }

            .projectdetail span {
                width: 15%;
                height: 60px;
                display: inline-block;
                font-size: 35px;
                line-height: 240%;
                margin-left: 2%;
            }

        .time {
            width: 40% !important;
        }

        .text {
            color: red;
            margin-left: 3% !important;
            text-align: right;
        }

        .line {
            background-color: #F0F0F2;
            height: 35px;
            width: 100%;
            border-bottom: 1px solid #bbb;
        }
        /*底部*/
        .order {
            background-color: #F0EBF0;
            height: 105px;
            width: 100%;
            padding-top: 10px;
            text-align: center;
            border-top: 1px solid #bbb;
            border-bottom: 1px solid #bbb;
        }

        .order {
            position: fixed;
            bottom: 0;
        }

        .orderul {
            width: 30% !important;
            height: 100px;
            background-color: #E84E40;
            border-radius: 15px;
            text-align: center;
            margin-left: 35%;
        }

            .orderul li {
                color: #fff !important;
                height: 100px;
                line-height: 100px;
                font-size: 39px;
            }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="page">
            <!-- 头部 -->
            <div class="page__hd header">
                <h1 class="page__title">
                    <span class="icon-fb-left">返回</span>
                    <span class="header-center">峰柏在建工地</span>
                    <span class="icon-fb-h"></span>
                </h1>
            </div>
            <!-- 导航 -->
            <div class="weui-tab">
                <div class="weui-navbar navigation">
                    <div class="weui-navbar__item nav setcolor">准备阶段</div>
                    <div class="weui-navbar__item nav setcolor">水电阶段</div>
                    <div class="weui-navbar__item nav setcolor">泥土阶段</div>
                    <div class="weui-navbar__item nav setcolor">油漆阶段</div>
                    <div class="weui-navbar__item nav setcolor">安装阶段</div>
                </div>
            </div>
            <!-- 每个工程 -->
            <div class="page__bd everyproject">
                <div class="weui-panel weui-panel_access project">
                    <div class="weui-panel__bd pro">
                        <a href="ConstructionDetail.html" class="weui-media-box weui-media-box_appmsg">
                            <div class="weui-media-box__hd picture1">
                                <img class="weui-media-box__thumb circle-pic" src="css/image/1.jpg" alt="">
                            </div>
                            <div class="weui-media-box__bd picture2">
                                <h4 class="weui-media-box__title">江场西路1288号12栋1单元903室内工地直播江场西路1288号12栋1单元903室内工地直播江场西路1288号12栋1单元903室内工地直播江场西路1288号12栋1单元903室内工地直播</h4>
                                <h4 class="weui-media-box__title">浏览：1000次</h4>
                            </div>
                            <div class="weui-media-box__hd picture3">
                                <img class="weui-media-box__thumb block-pic" src="../../CSS/Images/WeChat/1.jpg" />
                            </div>
                        </a>
                    </div>
                </div>
                <div class="weui-panel__bd projectdetail">
                    <div class="weui-media-box__bd">
                        <a href="">
                            <span class="icon-fb-detail">12篇</span>
                            <span class="icon-fb-photo">100张</span>
                            <span class="icon-fb-time time">2016-09-14 19:10</span>
                            <span class="text">验收阶段</span>
                        </a>
                    </div>
                </div>
                <div class="weui-panel__bd line"></div>
            </div>

            <!-- 底部 -->
            <div class="page__ft order">
                <a href="">
                    <ul class="orderul">
                        <li>我要预约</li>
                    </ul>
                </a>
            </div>
        </div>
    </form>
</body>
</html>
<script>
    $(".setcolor").click(function () {
        $(".nav").css('background-color', '#fff');
        $(".nav").css('color', '#000');
        $(this).css('background-color', '#FF7043');
        $(this).css('color', '#fff');
    })
</script>
