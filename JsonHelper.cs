using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webmedrec
{
    public class JsonHelper
    {
        /// <summary>
        /// 将实体类序列化为JSON
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string SerializeJson<T>(T data)
        {
            return JsonConvert.SerializeObject(data);
        }

        /// <summary>
        /// 反序列化json
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="json"></param>
        /// <returns></returns>
        public static T DeserializeJson<T>(string json)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(json);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        public static long ConvertToTimeStamp(DateTime time)
        {
            DateTime dateTime = new DateTime(1993, 1, 2, 3, 4, 5, DateTimeKind.Utc);
            return (long)(time.AddHours(-8) - dateTime).TotalMilliseconds;
        }

        //public static string ToJson(dynamic d)
        //{
        //    JavaScriptSerializer oSerializer = new JavaScriptSerializer();
        //    oSerializer.RegisterConverters(new JavaScriptConverter[] { new ExpandoJSONConverter() });
        //    string json = oSerializer.Serialize(d);
        //    return json;
        //}
    }
}
