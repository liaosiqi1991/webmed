using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Oracle.ManagedDataAccess.Client;
using Webmedrec.Models;

namespace Webmedrec.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        //用于显示到病案接接收管理界面
        public ActionResult<String> GetMecRecInfo(string roomID, string inNo, string inNoTo, string outDate, string outDateto,
            string getDate, string getDateto, string makeDate, string makeDateto, string sendp, string getp)
        {
            string strwhere = "";
            DB dB = new DB();
            dB.InitOracle();

            List<OracleParameter> psList = new List<OracleParameter>();

            DateTime dtout = DateTime.Now;
            DateTime dtoutto = DateTime.Now;
            DateTime dtmake = DateTime.Now;
            DateTime dtmaketo = DateTime.Now;
            DateTime dtget = DateTime.Now;
            DateTime dtgetto = DateTime.Now;

            string strFind = "";
            string strBillHead = "";
            string strSql = "";
            string strjson = "";

            if (roomID != "0" )
            {
                strwhere = " And U.出院科室id =:p11 ";

                psList.Add(new OracleParameter(":p11", Convert.ToInt32(roomID)));
            }

            strFind = "";
            if (inNo != null && inNo == null)
            { 
                strFind = strFind + " and A.住院号=:p1";

                psList.Add(new OracleParameter(":p1", Convert.ToInt32(inNo)));
            }

            if (inNo != null && inNoTo != null)
            {
                strFind = strFind + " and A.住院号 Between  :p1  And :p2  ";

                psList.Add(new OracleParameter(":p1", Convert.ToInt32(inNo)));
                psList.Add(new OracleParameter(":p2", Convert.ToInt32(inNoTo)));
            }

            if (inNo == null && inNoTo != null)
            {
                strFind = strFind + " and A.住院号=:p1";

                psList.Add(new OracleParameter(":p1", Convert.ToInt32(inNo)));
            }

            if (sendp != null)
            {
                strFind = strFind + " and A.运送人 = :p3";

                psList.Add(new OracleParameter(":p3", sendp));
            }

            if (getp != null)
            {
                strFind = strFind + " and A.接收人 = :p4";

                psList.Add(new OracleParameter(":p4", getp));
            }

            if (outDate!= null && outDateto != null)
            {
                strFind = strFind + " and A.出院日期 Between  :p5  And :p6";

                dtout = DateTime.Parse(outDate);
                dtoutto = DateTime.Parse(outDateto);

                psList.Add(new OracleParameter(":p5", dtout));
                psList.Add(new OracleParameter(":p6", dtoutto));
            }

            if (getDate != null && getDateto != null)
            {
                strFind = strFind + " and A.接收时间 Between  :p7  And :p8";

                dtget = DateTime.Parse(getDate);
                dtgetto = DateTime.Parse(getDateto);

                psList.Add(new OracleParameter(":p7", dtget));
                psList.Add(new OracleParameter(":p8", dtgetto));
            }

            if (makeDate != null && makeDateto != null)
            {
                strFind = strFind + " and A.编目日期 Between  :p9  And :p10";

                dtmake= DateTime.Parse(makeDate);
                dtmaketo = DateTime.Parse(makeDateto);

                psList.Add(new OracleParameter(":p9", dtmake));
                psList.Add(new OracleParameter(":p10", dtmaketo));
            }

            OracleParameter[] psAry = psList.ToArray();

            if (roomID == "0")
            {
                strBillHead = "" +
                  " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 住院次数, X.出生日期, X.出生地点," +
                  "      U.出院日期, U.入院日期, U.入院科室id, U.出院科室id," +
                  "      U.编目日期, Null As 运送人, Null As 接收人, Null As 接收时间, Null As 记录时间," +
                  "      Decode(Nvl(to_char(U.编目日期), '0'), '0', '未接收', '已编目') As 状态, U.病案号 " +
                  " From 病案主页 U, 病人信息 X " +
                  " Where U.病人ID = X.病人ID And Not Exists" +
                  "      (Select 1 From 病案接收记录 A Where A.病人id = U.病人id And A.主页id = U.主页id) And U.病人性质 = 0 And U.主页ID <> 0 And U.出院日期 is not null ";

                strBillHead = strBillHead + " Union All ";
                strBillHead = strBillHead +
                " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 住院次数, X.出生日期, X.出生地点," +
                "      U.出院日期, U.入院日期, U.入院科室id, U.出院科室id," +
                "       U.编目日期, A.运送人, A.接收人, A.接收时间, A.记录时间," +
                "      Decode(Nvl(to_char(U.编目日期), '0'), '0', '已接收', '已编目') As 状态, U.病案号 " +
                " From 病案主页 U, 病人信息 X,病案接收记录 A" +
                " Where U.病人id = X.病人id And U.病人性质 = 0 And U.主页ID <> 0 And " +
                "       A.病人id = U.病人id And A.主页ID = U.主页ID";
                strSql = "" +
                "   Select distinct A.病人ID, A.主页ID, A.住院号, A.姓名, A.性别, A.年龄, A.住院次数, A.出生日期," +
                "    A.出院日期, A.入院日期, B1.名称 As 入院科室, B2.名称 As 出院科室,出院科室ID," +
                "    A.编目日期, A.运送人, A.接收人, A.接收时间, A.记录时间,A.状态, A.病案号 " +
                "    From (" + strBillHead + ") A,部门表 B1, 部门表 B2" +
                "    Where A.入院科室id=B1.id And A.出院科室id=B2.id " + strFind +
                "    Order by A.出院日期 desc ";
                //strSql = "" +
                //"    Select distinct A.姓名, A.性别, A.年龄 " +
                //"    From (" + strBillHead + ") A,部门表 B1, 部门表 B2" +
                //"    Where A.入院科室id=B1.id And A.出院科室id=B2.id " + strFind;
            }
            else
            {
                strBillHead = "" +
                  " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 住院次数, X.出生日期, X.出生地点," +
                  "      U.出院日期, U.入院日期, U.入院科室id, U.出院科室id," +
                  "      U.编目日期, Null As 运送人, Null As 接收人, Null As 接收时间, Null As 记录时间," +
                  "      Decode(Nvl(to_char(U.编目日期), '0'), '0', '未接收', '已编目') As 状态, U.病案号 " +
                  " From 病案主页 U, 病人信息 X " +
                  " Where U.病人ID = X.病人ID " + strwhere + " And Not Exists" +
                  "      (Select 1 From 病案接收记录 A Where A.病人id = U.病人id And A.主页id = U.主页id) And U.病人性质 = 0 And U.主页ID <> 0 And U.出院日期 is not null ";

                strBillHead = strBillHead + " Union All ";
                strBillHead = strBillHead +
                " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 住院次数, X.出生日期, X.出生地点," +
                "      U.出院日期, U.入院日期, U.入院科室id, U.出院科室id," +
                "      U.编目日期, A.运送人, A.接收人, A.接收时间, A.记录时间," +
                "      Decode(Nvl(to_char(U.编目日期), '0'), '0', '已接收', '已编目') As 状态, U.病案号 " +
                " From 病案主页 U, 病人信息 X,病案接收记录 A" +
                " Where U.病人id = X.病人id And U.病人性质 = 0 And U.主页ID <> 0 " + strwhere + " And " +
                "       A.病人id = U.病人id And A.主页ID = U.主页ID";
                strSql = "" +
                "   Select distinct A.病人ID, A.主页ID, A.住院号, A.姓名, A.性别, A.年龄, A.住院次数 ,A.出生日期," +
                "    A.出院日期, A.入院日期, B1.名称 As 入院科室, B2.名称 As 出院科室,出院科室ID," +
                "    A.编目日期, A.运送人, A.接收人, A.接收时间, A.记录时间,A.状态, A.病案号 " +
                "    From (" + strBillHead + ") A,部门表 B1, 部门表 B2" +
                "    Where A.入院科室id=B1.id And A.出院科室id=B2.id " + strFind +
                "    Order by A.出院日期 desc ";
            }

            DataTable dt = DB.ExecToSqlGetTable(strSql, psAry);
            strjson = DB.DataTableToJsonWithStringBuilder(dt);

            return strjson;

        }

        //新增操作根据查询信息获取病案信息
        //输入框类别 1:病人ID   2:住院号   3:姓名
        public ActionResult<String> GetMedInfo(string calltype, string txt, string roomID)
        {
            string strSql = "";
            string strre = "";
            string strwhere = "";
            string strBillHead = "";

            DB dB = new DB();
            dB.InitOracle();

            List<OracleParameter> psList = new List<OracleParameter>();

            if (roomID != "0")
            {
                strwhere = "  And U.出院科室id =:p1 ";
                psList.Add(new OracleParameter(":p1", Convert.ToInt32(roomID)));
            }

            if (calltype=="1")
            {
                strwhere = "  And X.病人id =:p2 ";
                psList.Add(new OracleParameter(":p2", Convert.ToInt32(txt)));
            }
            else if (calltype == "2")
            {
                strwhere = "  And X.住院号 =:p2 ";
                psList.Add(new OracleParameter(":p2", Convert.ToInt32(txt)));
            }
            else if (calltype == "3")
            {
                strwhere = "  And X.姓名 =:p2 ";
                psList.Add(new OracleParameter(":p2", txt));
            }

            strBillHead = " " +
                " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 总住院次数," +
                "      U.出院日期,U.出院科室id,U.入院科室id, U.入院日期, '' as 运送人, '' as 接收人, ''as 接收时间, " +
                " U.病案号 " +
                " From 病案主页 U, 病人信息 X " +
                " Where U.病人id = X.病人id And U.病人性质 = 0 And U.主页ID <> 0 " + strwhere ;
            strSql = "" +
            "   Select distinct A.住院号, A.病人ID , A.姓名, A.性别, A.年龄, A.总住院次数 as 住院次数," +
            "    A.出院日期 as 出院时间, A.入院日期 as 入院时间, B1.名称 As 入院科室, B2.名称 As 出院科室,A.运送人,A.接收人,A.接收时间," +
            "    A.病案号 " +
            "    From (" + strBillHead + ") A,部门表 B1, 部门表 B2" +
            "    Where A.入院科室id=B1.id And A.出院科室id=B2.id " +
            "    Order by A.出院日期 desc ";

            OracleParameter[] psAry = psList.ToArray();

            DataTable dt = DB.ExecToSqlGetTable(strSql, psAry);

            foreach (DataRow dr in dt.Rows)
            {
                if (strre!="")
                {
                    strre = strre + ",";
                }
                strre = strre + dr["病人id"] + "_" + dr["住院次数"];
            }

            return strre;
        }


        //calltype 操作类型 1 新增  2 修改  
        //medinfo选中病案数据  病人ID_主页ID
        //roomID 科室ID
        public ActionResult<String> GetAddData(string calltype, string medinfo,string roomID)
        {
            string strBillHead = "";
            string strSql = "";
            string strjson = "";
            string strRoom = "";

            DB dB = new DB();
            dB.InitOracle();

            List<OracleParameter> psList = new List<OracleParameter>();

            if(roomID!="0")
            {
                strRoom = "And U.出院科室id =:p1";
                psList.Add(new OracleParameter(":p1", Convert.ToInt16(roomID)));
            }

            if (Convert.ToInt32(calltype) == 1)
                {
                strBillHead = " " +
                " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 总住院次数, X.出生日期," +
                "      U.出院日期, U.入院日期, U.入院科室id, U.出院科室id, '' as 运送人, '' as 接收人, ''as 接收时间," +
                " U.病案号 " +
                " From 病案主页 U, 病人信息 X,Table(Cast(f_Str2list(:p2) As zlTools.t_Strlist)) B" +
                " Where U.病人id = X.病人id And U.病人性质 = 0 And U.主页ID <> 0 " + strRoom + " And U.病人id = substr(B.Column_Value,1,instr(B.Column_Value,'_')-1) And " +
                "       U.主页ID = substr(B.Column_Value,instr(B.Column_Value,'_')+1)";
                strSql = "" +
                "   Select distinct A.住院号, A.病人ID , A.姓名, A.性别, A.年龄, A.总住院次数 as 住院次数," +
                "    A.出院日期 as 出院时间, A.入院日期 as 入院时间, B1.名称 As 入院科室, B2.名称 As 出院科室," +
                "    A.病案号 " +
                "    From (" + strBillHead + ") A,部门表 B1, 部门表 B2" +
                "    Where A.入院科室id=B1.id And A.出院科室id=B2.id " +
                "    Order by A.出院日期 desc ";
            }
            else
            {
                strBillHead = " " +
                " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 总住院次数, X.出生日期," +
                "      U.出院日期, U.入院日期, U.入院科室id, U.出院科室id," +
                "     U.编目日期, A.运送人, A.接收人, A.接收时间, A.记录时间," +
                "      Decode(Nvl(to_char(U.编目日期), '0'), '0', '已接收', '已编目') As 状态, U.病案号 " +
                " From 病案主页 U, 病人信息 X,病案接收记录 A,Table(Cast(f_Str2list(:p2) As zlTools.t_Strlist)) B" +
                " Where U.病人id = X.病人id And U.病人性质 = 0 And U.主页ID <> 0 " + strRoom + " And A.病人id = substr(B.Column_Value,1,instr(B.Column_Value,'_')-1) And " +
                "       A.主页ID = substr(B.Column_Value,instr(B.Column_Value,'_')+1) And A.病人id = U.病人id And A.主页ID = U.主页ID";
                strSql = "" +
                "   Select distinct A.住院号, A.病人ID ,A.姓名, A.性别, A.年龄, A.总住院次数 as 住院次数," +
                "    A.出院日期 as 出院时间, A.入院日期 as 入院时间, B1.名称 As 入院科室, B2.名称 As 出院科室," +
                "    A.病案号, A.运送人, A.接收人, A.接收时间 " +
                "    From (" + strBillHead + ") A,部门表 B1, 部门表 B2" +
                "    Where A.入院科室id=B1.id And A.出院科室id=B2.id " +
                "    Order by A.出院日期 desc ";
            }

            psList.Add(new OracleParameter(":p2", medinfo));

            OracleParameter[] psAry = psList.ToArray();


            DataTable dt = DB.ExecToSqlGetTable(strSql, psAry);
            strjson = DB.DataTableToJsonWithStringBuilder(dt);

            return strjson;
        }

        //calltype 操作类型 1 新增  2 修改  
        //medinfo选中病案数据  病人ID_主页ID
        //roomID 科室ID
        public ActionResult<String> GetRoom()
        {
            string strSql = "";
            string strRe = "";

            DB dB = new DB();
            dB.InitOracle();

            strSql= "SELECT  A.名称 as name, A.编码 as code,A.id " +
                    "   FROM  部门表 A" +
                    "   Where ( TO_CHAR (A.撤档时间, 'yyyy-MM-dd') = '3000-01-01' or A.撤档时间 is null) AND A.ID in (" +
                    "         Select B.部门ID From 部门性质说明 B" +
                    "         Where (B.工作性质='临床' or B.工作性质='护理') and (B.服务对象=2 or B.服务对象=3)) " +
                    "         start with A.上级id is null connect by prior A.id=A.上级id";


            DataTable dt = dB.ExecToSqlGetTable(strSql);

            strRe = DB.DataTableToJsonWithStringBuilder(dt);
            return strRe;
        }

        //strjson json数组，每个对应一条病案记录，另外每个额外包含了4个参数 
        [HttpPost]
        public ActionResult<String> SaveMedRecs([FromBody] List<Med> strjson)
        {
            Int32 PageID = 0;
            Int32 PatiID = 0;
            DateTime DTGet = DateTime.Now;
            DateTime DTSend = DateTime.Now;
            string PSend = "";
            string PGet = "";

            List<OracleParameter> psList = new List<OracleParameter>();
            
            DB db = new DB();
            db.InitOracle();

            foreach (Med med in strjson)
            {
                PatiID = Convert.ToInt32(med.病人id);
                PageID = Convert.ToInt32(med.住院次数);
                DTSend = DateTime.Parse(med.dtsend); 
                DTGet = DateTime.Parse(med.dtget); 
                PSend = med.psend;
                PGet = med.pget;

                psList.Clear();
                psList.Add(new OracleParameter("病人id_In", PatiID));
                psList.Add(new OracleParameter("主页id_In", PageID));
                psList.Add(new OracleParameter("运送人_In", PSend));
                psList.Add(new OracleParameter("接收人_In", PGet));
                psList.Add(new OracleParameter("接收时间_In", DTGet));
                psList.Add(new OracleParameter("记录时间_In", DTGet));

                OracleParameter[] psAry = psList.ToArray();
                db.ExecToStoredProcedure("Zl_病案接收记录_Insert", psAry);
            }

            return ("成功收到对象 执行成功:" );
        }

        [HttpGet]
        public ActionResult<string> DelMedRec(string medinfo)
        {
            string[] sArray = medinfo.Split('_');
            List<OracleParameter> psList = new List<OracleParameter>();
            DB db = new DB();

            db.InitOracle();

            psList.Add(new OracleParameter("病人id_In", Convert.ToInt32(sArray[0])));
            psList.Add(new OracleParameter("主页id_In", Convert.ToInt32(sArray[1])));

            OracleParameter[] psAry = psList.ToArray();
            db.ExecToStoredProcedure("Zl_病案接收记录_Delete", psAry);

            return "ok";
        }

        /// <summary>
        /// 根据时间获取住院日报
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<string> GetInPatiDailyList(string time)
        {
            List<OracleParameter> psList = new List<OracleParameter>();
            DB db = new DB();
            string strSQL = "";
            string strjson = "";
            DateTime dtdate = DateTime.Now;

            dtdate = DateTime.Parse(time);

            db.InitOracle();
        
                strSQL = "" +
                    "   Select A.日期,A.后一日期,A.科室ID,A.开放床数,A.原人数,A.入院数,A.出院数,A.其中死亡,A.转入数," +
                    "          A.转出数,A.死亡数,A.现人数,A.空床数,A.加床数,A.危重人次,A.陪伴人次,A.护理天数,A.褥疮人数," +
                    "          A.抢救人数,A.床位占用数,A.家庭病床,A.科室床位,A.本日加床,A.备注,A.本日空床,A.医疗事故,A.严重差错," +
                    "          A.床位使用率 ,A.记录人,A.记录时间,A.审核人,A.审核日期 ,B.名称  " +
                    "   From 住院日报 A,部门表 B " +
                    "   Where A.科室ID=B.ID and A.日期=:p1" +
                    "   Order by B.编码 ";

            psList.Add(new OracleParameter(":p1", dtdate));

            OracleParameter[] psAry = psList.ToArray();

            DataTable dt = DB.ExecToSqlGetTable(strSQL, psAry);
            strjson = DB.DataTableToJsonWithStringBuilder(dt);


            return strjson;
        }

        /// <summary>
        /// 获取最近一次编辑住院日报的时间
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<string> GetLastInDailyDate()
        {

            DB db = new DB();
            string strSQL = "";
            string strjson = "";

            db.InitOracle();

            strSQL = "select max(日期) as 最后日期  from 住院日报";

            DataTable dt = db.ExecToSqlGetTable(strSQL);
            strjson = DB.DataTableToJsonWithStringBuilder(dt);

            return strjson;
        }

        /// <summary>
        /// 保存住院日报数据
        /// </summary>
        /// <param name="strjson"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<String> SaveInPatiDaily([FromBody] List<InPaitDaily> strjson)
        {
            List<OracleParameter> psList = new List<OracleParameter>();

            DB db = new DB();
            db.InitOracle();

            psList.Clear();

            string time = DateTime.Parse(strjson[0].日期).ToString("yy-MM-dd");
            DateTime dt = DateTime.Parse(time);

            psList.Add(new OracleParameter("日期_In", dt));
            OracleParameter[] psAry = psList.ToArray();
            db.ExecToStoredProcedure("ZL_住院日报_Delete", psAry);

            foreach (InPaitDaily ipd in strjson)
            {
                psList.Clear();
                psList.Add(new OracleParameter("日期_In", DateTime.Parse(ipd.日期)));
                psList.Add(new OracleParameter("科室id_In", Convert.ToInt32(ipd.科室id)));
                psList.Add(new OracleParameter("开放床数_In", Convert.ToInt32(ipd.开放床数)));
                psList.Add(new OracleParameter("本日空床_In", Convert.ToInt32(ipd.本日空床)));
                psList.Add(new OracleParameter("原人数_In", Convert.ToInt32(ipd.原人数)));

                psList.Add(new OracleParameter("入院数_In", Convert.ToInt32(ipd.入院数)));
                psList.Add(new OracleParameter("转入数_In", Convert.ToInt32(ipd.转入数)));
                psList.Add(new OracleParameter("出院数_In", Convert.ToInt32(ipd.出院数)));
                psList.Add(new OracleParameter("其中死亡_In", Convert.ToInt32(ipd.其中死亡)));
                psList.Add(new OracleParameter("转出数_In", Convert.ToInt32(ipd.转出数)));

                psList.Add(new OracleParameter("现人数_In", Convert.ToInt32(ipd.现人数)));
                psList.Add(new OracleParameter("危重人次_In", Convert.ToInt32(ipd.危重人次)));
                psList.Add(new OracleParameter("陪伴人次_In", Convert.ToInt32(ipd.陪伴人次)));
                psList.Add(new OracleParameter("护理天数_In", Convert.ToInt32(ipd.护理天数)));
                psList.Add(new OracleParameter("褥疮人数_In", Convert.ToInt32(ipd.褥疮人数)));

                psList.Add(new OracleParameter("本日加床_In", Convert.ToInt32(ipd.本日加床)));
                psList.Add(new OracleParameter("医疗事故_In", Convert.ToInt32(ipd.医疗事故)));
                psList.Add(new OracleParameter("严重差错_In", Convert.ToInt32(ipd.严重差错)));
                psList.Add(new OracleParameter("床位使用率_In", Convert.ToDouble(ipd.床位使用率)));
                psList.Add(new OracleParameter("空床数_In", Convert.ToInt32(ipd.空床数)));

                psList.Add(new OracleParameter("加床数_In", Convert.ToInt32(ipd.加床数)));
                psList.Add(new OracleParameter("记录人_In", ipd.记录人));
                psList.Add(new OracleParameter("抢救人数_In", Convert.ToInt32(ipd.抢救人数)));
                psList.Add(new OracleParameter("床位占用数_In", Convert.ToInt32(ipd.床位占用数)));
                psList.Add(new OracleParameter("家庭病床_In", Convert.ToInt32(ipd.家庭病床)));
                psList.Add(new OracleParameter("科室床位_In", Convert.ToInt32(ipd.科室床位)));

                psAry = psList.ToArray();
                db.ExecToStoredProcedure("ZL_住院日报_INSERT", psAry);
            }
            //return ("成功收到对象 测试成功:" + strjson.ToString());
            return ("OK");
        }

        /// <summary>
        /// 审核
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<string> DailyVerify(string date,string roomid,string name, string vdate)
        {
            List<OracleParameter> psList = new List<OracleParameter>();
            DB db = new DB();
            db.InitOracle();

            psList.Add(new OracleParameter("日期_IN", DateTime.Parse(date)));
            psList.Add(new OracleParameter("科室ID_IN", null));
            psList.Add(new OracleParameter("审核人_IN", name));
            psList.Add(new OracleParameter("审核日期_IN", DateTime.Parse(vdate)));

            OracleParameter[] psAry = psList.ToArray();
            db.ExecToStoredProcedure("ZL_住院日报_Verify", psAry);

            return "OK";
        }

        /// <summary>
        /// 取消审核
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<string> CancelDailyVerify(string date, string roomid)
        {
            List<OracleParameter> psList = new List<OracleParameter>();
            DB db = new DB();
            db.InitOracle();

            psList.Add(new OracleParameter("日期_IN", DateTime.Parse(date)));
            psList.Add(new OracleParameter("科室ID_IN", roomid));

            OracleParameter[] psAry = psList.ToArray();
            db.ExecToStoredProcedure("ZL_住院日报_CANCEL", psAry);

            return "OK";
        }

        /// <summary>
        /// 删除住院日报
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<string> DeleteDaily(string date, string roomid)
        {
            List<OracleParameter> psList = new List<OracleParameter>();
            DB db = new DB();
            db.InitOracle();

            psList.Add(new OracleParameter("日期_IN", DateTime.Parse(date)));
            psList.Add(new OracleParameter("科室ID_IN", roomid));

            OracleParameter[] psAry = psList.ToArray();
            db.ExecToStoredProcedure("ZL_住院日报_CANCEL", psAry);

            return "OK";
        }

        /// <summary>
        /// 删除门诊日报
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<string> DeleteOutDaily(string date, string roomid)
        {
            List<OracleParameter> psList = new List<OracleParameter>();
            DB db = new DB();
            db.InitOracle();

            psList.Add(new OracleParameter("日期_IN", DateTime.Parse(date)));
            psList.Add(new OracleParameter("科室ID_IN", roomid));

            OracleParameter[] psAry = psList.ToArray();
            db.ExecToStoredProcedure("ZL_门诊日报_DELETE", psAry);

            return "OK";
        }

        /// <summary>
        /// 保存门诊日报数据
        /// </summary>
        /// <param name="strjson"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<String> SaveOutPatiDaily([FromBody] List<OutPaitDaily> strjson)
        {
            List<OracleParameter> psList = new List<OracleParameter>();

            DB db = new DB();
            db.InitOracle();

            Int64 ID = 0;

            psList.Clear();

            string time = DateTime.Parse(strjson[0].记录日期).ToString("yy-MM-dd");
            DateTime dt = DateTime.Parse(time);
            DataTable dtt = new DataTable();

            OracleParameter[] psAry = psList.ToArray();


            foreach (OutPaitDaily opd in strjson)
            {
                psList.Clear();
                psList.Add(new OracleParameter("日期_IN", dt));
                psList.Add(new OracleParameter("科室ID_IN", Convert.ToInt32(opd.科室ID)));
                psAry = psList.ToArray();
                db.ExecToStoredProcedure("ZL_门诊日报_DELETE", psAry);
            }

            foreach (OutPaitDaily opd in strjson)
            {
                psList.Clear();



                dtt = db.ExecToSqlGetTable("Select 门诊日报_ID.Nextval as ID From Dual");
                ID = Convert.ToInt64(dtt.Rows[0]["ID"].ToString());

                psList.Add(new OracleParameter("ID_IN", ID));
                psList.Add(new OracleParameter("日期_IN", DateTime.Parse(opd.记录日期)));
                psList.Add(new OracleParameter("科室ID_IN", Convert.ToInt32(opd.科室ID)));
                psList.Add(new OracleParameter("门诊人次_IN", Convert.ToInt32(opd.门诊人次)));
                psList.Add(new OracleParameter("急诊人次_IN", Convert.ToInt32(opd.急诊人次)));

                psList.Add(new OracleParameter("急抢人次_IN", Convert.ToInt32(opd.急抢人次)));
                psList.Add(new OracleParameter("急死人次_IN", Convert.ToInt32(opd.急死人次)));
                psList.Add(new OracleParameter("出诊人次_IN", Convert.ToInt32(opd.出诊人次)));
                psList.Add(new OracleParameter("巡诊人次_IN", Convert.ToInt32(opd.巡诊人次)));
                psList.Add(new OracleParameter("体检_IN", Convert.ToInt32(opd.体检)));

                psList.Add(new OracleParameter("其他_IN", Convert.ToInt32(opd.其他)));
                psList.Add(new OracleParameter("主治医师_IN", Convert.ToInt32(opd.主治医师)));
                psList.Add(new OracleParameter("专家_IN", Convert.ToInt32(opd.专家)));
                psList.Add(new OracleParameter("初诊人次_IN", Convert.ToInt32(opd.初诊人次)));
                psList.Add(new OracleParameter("复诊人次_IN", Convert.ToInt32(opd.复诊人次)));

                psList.Add(new OracleParameter("记录人_IN", opd.记录人));


                psAry = psList.ToArray();
                db.ExecToStoredProcedure("ZL_门诊日报_INSERT", psAry);
            }
            return ("OK");
        }

        /// <summary>
        /// 根据时间获取门诊日报
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<string> GetOutPatiDailyList(string time)
        {
            List<OracleParameter> psList = new List<OracleParameter>();
            DB db = new DB();
            string strSQL = "";
            string strjson = "";
            DateTime dtdate = DateTime.Now;

            dtdate = DateTime.Parse(time);

            db.InitOracle();

            strSQL = " Select A.科室ID,A.门诊人次,A.初诊人次,A.复诊人次,A.急诊人次,A.急抢人次,A.急死人次,A.出诊人次,A.巡诊人次,A.体检,A.其他,A.主治医师 as 主治医师,A.专家 as 专家,B.名称,a.记录人,to_char(a.记录时间,'yyyy-mm-dd') as 记录日期 " +
                " From 门诊日报 A,部门表 B " +
                " Where A.科室ID=B.ID and A.日期=:p1" +
                " order by B.编码";
 
            psList.Add(new OracleParameter(":p1", dtdate));

            OracleParameter[] psAry = psList.ToArray();

            DataTable dt = DB.ExecToSqlGetTable(strSQL, psAry);
            strjson = DB.DataTableToJsonWithStringBuilder(dt);

            return strjson;
        }

        /// <summary>
        /// 获取最近一次编辑住院日报的时间
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult<string> GetLastOutDailyDate()
        {

            DB db = new DB();
            string strSQL = "";
            string strjson = "";

            db.InitOracle();

            strSQL = "select max(日期) as 最后日期  from 门诊日报";

            DataTable dt = db.ExecToSqlGetTable(strSQL);
            strjson = DB.DataTableToJsonWithStringBuilder(dt);

            return strjson;
        }





    }




}
