using Newtonsoft.Json.Serialization;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace MessageBoard.App_Start
{
    public class WebApiConfig
    {

        public static void Register(HttpConfiguration config)
        {
            var jsonFormater = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormater.SerializerSettings.ContractResolver =
                new CamelCasePropertyNamesContractResolver();
            
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "RepliesRoute",
                routeTemplate: "api/topics/{topicid}/replies/{id}",
                defaults: new { controller = "replies", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/topics/{id}",
                defaults: new {controller="topics", id = RouteParameter.Optional }
            );
        }

    }
}


