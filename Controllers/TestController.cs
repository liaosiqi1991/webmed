using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;

namespace Webmedrec.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestController : ControllerBase
    {
       

        [HttpGet]
        public ActionResult<String> GetMecRecInfo2(string roomID, string inNo, string inNoTo, string outDate, string outDateto,
            string getDate, string getDateto, string makeDate, string makeDateto, string sendp, string getp)
        {

            string strsql = "";
            strsql = inNo;
            return "参数测试";

        }
        /// <summary>
        /// 带入参的SQL测试
        /// </summary>
        /// <param name="ApplyId"></param>
        /// <param name="name"></param>
        /// <param name="isok"></param>
        /// <returns></returns>
        public ActionResult<String> sqltest1()
        {
            string strsql = "";
            DB dB = new DB();
            string strRe = "";

            //首先不加参数设置
            strsql = "SELECT* FROM 病人信息 WHERE 病人id =:p1  OR 姓名 = :p4";
            //strsql = "SELECT* FROM 病人信息 WHERE 病人id =:p1 OR 门诊号 =:p2 OR 姓名 = :p3 OR 姓名 = :p4";

            DB db = new DB();
            db.InitOracle();

            if (db.checkDBok())
            {
                OracleParameter p1 = new OracleParameter(":p1", OracleDbType.Int32, 32);
                OracleParameter p2 = new OracleParameter(":p2", OracleDbType.Int32, 32);
                OracleParameter p3 = new OracleParameter(":p3", OracleDbType.Varchar2, 100);
                OracleParameter p4 = new OracleParameter(":p3", OracleDbType.Varchar2, 100);

                p1.Value = 120854;
                p2.Value = 68727;
                p3.Value = "张金兰";
                p4.Value = "文田";

                OracleParameter[] ps = { p1, p2, p3, p4 };
                //OracleParameter[] ps = { p1,  p4 };

                DataTable dt = DB.ExecToSqlGetTable(strsql, ps);


                System.Diagnostics.Debug.WriteLine("test2查询到的数据数量：" + dt.Rows);
                strRe = DB.DataTableToJsonWithStringBuilder(dt);
            }
            else
            {
                strRe = "数据库没连上";
            }

            return strRe;


        }

        /// <summary>
        /// 俩一波参数测试
        /// </summary>
        /// <returns></returns>
        public ActionResult<String> GetMecRecInfotest(int ApplyId, string name, bool isok)
        {
            string strSql = "";
            string strBillHead = "";
            string strFind = "";
            string strjson = "";

            strFind = " AND ROWNUM<5 ";

            if (ApplyId == 0)
            {
                strBillHead = "" +
                  " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 总住院次数, X.出生日期, X.出生地点," +
                  "      U.出院日期, U.入院日期, U.入院科室id, U.出院科室id," +
                  "      U.编目日期, Null As 运送人, Null As 接收人, Null As 接收时间, Null As 记录时间," +
                  "      Decode(Nvl(to_char(U.编目日期), '0'), '0', '未接收', '已编目未登记') As 状态, U.病案号 " +
                  " From 病案主页 U, 病人信息 X " +
                  " Where U.病人ID = X.病人ID And Not Exists" +
                  "      (Select 1 From 病案接收记录 A Where A.病人id = U.病人id And A.主页id = U.主页id) And U.病人性质 = 0 And U.主页ID <> 0 And U.出院日期 is not null ";

                strBillHead = strBillHead + " Union All ";
                strBillHead = strBillHead +
                " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 总住院次数, X.出生日期, X.出生地点," +
                "      U.出院日期, U.入院日期, U.入院科室id, U.出院科室id," +
                "       U.编目日期, A.运送人, A.接收人, A.接收时间, A.记录时间," +
                "      Decode(Nvl(to_char(U.编目日期), '0'), '0', '已接收', '已编目') As 状态, U.病案号 " +
                " From 病案主页 U, 病人信息 X,病案接收记录 A" +
                " Where U.病人id = X.病人id And U.病人性质 = 0 And U.主页ID <> 0 And " +
                "       A.病人id = U.病人id And A.主页ID = U.主页ID";
                strSql = "" +
                "   Select distinct A.病人id, A.主页id, A.住院号, A.姓名, A.性别, A.年龄, A.总住院次数, A.出生日期, A.出生地点," +
                "    A.出院日期, A.入院日期, B1.名称 As 入院科室, B2.名称 As 出院科室,出院科室id," +
                "    A.编目日期, A.运送人, A.接收人, A.接收时间, A.记录时间,A.状态, A.病案号 " +
                "    From (" + strBillHead + ") A,部门表 B1, 部门表 B2" +
                "    Where A.入院科室id=B1.id And A.出院科室id=B2.id " + strFind +
                "    Order by A.出院日期 desc ";
            }
            else
            {
                strBillHead = "" +
                  " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 总住院次数, X.出生日期, X.出生地点," +
                  "      U.出院日期, U.入院日期, U.入院科室id, U.出院科室id," +
                  "      U.编目日期, Null As 运送人, Null As 接收人, Null As 接收时间, Null As 记录时间," +
                  "      Decode(Nvl(to_char(U.编目日期), '0'), '0', '未接收', '已编目未登记') As 状态, U.病案号 " +
                  " From 病案主页 U, 病人信息 X " +
                  " Where U.病人ID = X.病人ID And U.出院科室id =[11] And Not Exists" +
                  "      (Select 1 From 病案接收记录 A Where A.病人id = U.病人id And A.主页id = U.主页id) And U.病人性质 = 0 And U.主页ID <> 0 And U.出院日期 is not null ";

                strBillHead = strBillHead + " Union All ";
                strBillHead = strBillHead +
                " Select Distinct X.病人id, U.主页id, U.住院号, U.姓名, U.性别, U.年龄, U.主页id As 总住院次数, X.出生日期, X.出生地点," +
                "      U.出院日期, U.入院日期, U.入院科室id, U.出院科室id," +
                "      U.编目日期, A.运送人, A.接收人, A.接收时间, A.记录时间," +
                "      Decode(Nvl(to_char(U.编目日期), '0'), '0', '已接收', '已编目') As 状态, U.病案号 " +
                " From 病案主页 U, 病人信息 X,病案接收记录 A" +
                " Where U.病人id = X.病人id And U.病人性质 = 0 And U.主页ID <> 0 And U.出院科室id =[11] And " +
                "       A.病人id = U.病人id And A.主页ID = U.主页ID";
                strSql = "" +
                "   Select distinct A.病人id, A.主页id, A.住院号, A.姓名, A.性别, A.年龄, A.总住院次数, A.出生日期, A.出生地点," +
                "    A.出院日期, A.入院日期, B1.名称 As 入院科室, B2.名称 As 出院科室,出院科室id," +
                "    A.编目日期, A.运送人, A.接收人, A.接收时间, A.记录时间,A.状态, A.病案号 " +
                "    From (" + strBillHead + ") A,部门表 B1, 部门表 B2" +
                "    Where A.入院科室id=B1.id And A.出院科室id=B2.id " + strFind +
                "    Order by A.出院日期 desc ";
            }

            DB db = new DB();
            db.InitOracle();


            //strSql = "SELECT 姓名,性别,年龄 FROM 病人信息 WHERE ROWNUM<10";
            if (db.checkDBok())
            {
                DataTable dt = db.ExecToSqlGetTable(strSql);

                System.Diagnostics.Debug.WriteLine("查询到的数据数量：" +dt.Rows);
                strjson = DB.DataTableToJsonWithStringBuilder(dt);
            }
            else
            {
                strjson = "数据库没连上";
            }
            return strjson;
        }
    }
}
