using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Webmedrec.Models;

namespace Webmedrec.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }



        /*public IActionResult Index()
        {
            return View();
        }*/

        public IActionResult Add()
        {
            return View();
        }

        public IActionResult Main()
        {
            return View();
        }

        public IActionResult Receive()
        {
            return View();
        }

        public IActionResult InPatient()
        {
            return View();
        }

        public IActionResult OutPatient()
        {
            return View();
        }


        public HttpResponseMessage funtest2()
        {
            String userName = "hehehjhbjhbhjbjhjhehe";
            HttpResponseMessage result = new HttpResponseMessage { Content = new StringContent(userName, Encoding.GetEncoding("UTF-8"), "application/json") };
            return result;
        }

        public void DBtest()
        {
            DB db = new DB();

            db.InitOracle();

            /*string t = "";
            t = "跑起来再说";
            Response.BodyWriter(t);*/
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
