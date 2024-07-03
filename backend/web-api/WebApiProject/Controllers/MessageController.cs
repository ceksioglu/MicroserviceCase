using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace WebApiProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            return Ok(new { Status = "API is working" });
        }

        [HttpPost]
        [Route("send")]
        public IActionResult Post([FromBody] MessageModel message)
        {
            try
            {
                var factory = new ConnectionFactory() { HostName = "localhost" };
                using (var connection = factory.CreateConnection())
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "first_q",
                                         durable: true,
                                         exclusive: false,
                                         autoDelete: false,
                                         arguments: null);

                    var json = JsonSerializer.Serialize(message);
                    var body = Encoding.UTF8.GetBytes(json);

                    channel.BasicPublish(exchange: "",
                                         routingKey: "first_q",
                                         basicProperties: null,
                                         body: body);
                }

                return Ok(new { Status = "Message sent to RabbitMQ" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Error", Message = ex.Message });
            }
        }
    }

    public class MessageModel
    {
        public string? Date { get; set; }
        public string? MenuContent { get; set; }
        public string? Campus { get; set; }
        public string? Menu { get; set; }
    }
}
