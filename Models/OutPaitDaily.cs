using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webmedrec.Models
{
    public class OutPaitDaily
    {
        public string 操作类型 { get; set; }
        public string 记录日期 { get; set; }
        public string 科室ID { get; set; }
        public string 门诊人次 { get; set; }
        public string 急诊人次 { get; set; }
        public string 急抢人次 { get; set; }
        public string 急死人次 { get; set; }
        public string 出诊人次 { get; set; }
        public string 巡诊人次 { get; set; }
        public string 体检 { get; set; }
        public string 其他 { get; set; }
        public string 主治医师 { get; set; }
        public string 专家 { get; set; }
        public string 初诊人次 { get; set; }
        public string 复诊人次 { get; set; }
        public string 记录人 { get; set; }
    }
}
