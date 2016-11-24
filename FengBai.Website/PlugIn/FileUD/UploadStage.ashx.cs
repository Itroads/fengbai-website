using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LiuHe.InsuranceServices.Website.PlugIn.FileUD
{
    /// <summary>
    /// UploadStage 的摘要说明
    /// </summary>
    public class UploadStage : TianCheng.Web.BLL.UploadBinaryFileBase
    {

        /// <summary>
        /// 设置文件的保存路径
        /// </summary>
        protected override string WebFilePath
        {
            get { return "~/UploadFile/StageFile/"; }
        }
    }
}