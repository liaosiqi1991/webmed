using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webmedrec.Models
{
    public class Med
    {
        public string 住院号 { get; set; }
        public string 病人id { get; set; }
        public string 姓名 { get; set; }
        public string 性别 { get; set; }
        public string 年龄 { get; set; }
        public string 住院次数 { get; set; }
        public string 出院时间 { get; set; }
        public string 入院时间 { get; set; }
        public string 入院科室 { get; set; }
        public string 出院科室 { get; set; }
        public string 病案号 { get; set; }
        public string pget { get; set; }
        public string psend { get; set; }
        public string dtsend { get; set; }
        public string dtget { get; set; }

    }
}
