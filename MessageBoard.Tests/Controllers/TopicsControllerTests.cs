using MessageBoard.Controllers;
using MessageBoard.Data;
using MessageBoard.Tests.Fakes;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;
using System.Web.Http.Routing;

namespace MessageBoard.Tests.Controllers
{
    [TestClass]
    public class TopicsControllerTests
    {
        private TopicsController _ctrl;

        [TestInitialize]        
        public void Init()
        {
            _ctrl = new TopicsController(new FakeMessageBoardRepository());
        }


        [TestMethod] 
        public void TopicsController_Get()
        {

            var results = _ctrl.Get(true);
            Assert.IsNotNull(results);
            Assert.IsTrue(results.Count()>0);
            Assert.IsNotNull(results.First());
            Assert.IsNotNull(results.First().Title);
        }

        [TestMethod]
        public void TopicsController_Post()
        {
            //Tessting Post is bit harder, Process requires some initial steps,
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post,"http://localhost/api/topics");
            var route = config.Routes.MapHttpRoute("DefaultApi","api/{controller}/{id}");
            var routeData = new HttpRouteData(route,new HttpRouteValueDictionary { { "controller","topics"} });

            _ctrl.ControllerContext = new System.Web.Http.Controllers.HttpControllerContext(config,routeData,request);
            _ctrl.Request = request;
            _ctrl.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;

            var newTopic = new Topic()
            {
                Title="Test Topic",
                Body="This is a test of a topic..."
            };
            

            var result=_ctrl.Post(newTopic);
            Assert.AreEqual(HttpStatusCode.Created,result.StatusCode);

            var json = result.Content.ReadAsStringAsync().Result;
            var topic = JsonConvert.DeserializeObject<Topic>(json);

            Assert.IsNotNull(topic);
            Assert.IsTrue(topic.Id>0);
            Assert.IsTrue(topic.Created>DateTime.MinValue);
        }
    }
}
