// Gerekli kütüphaneler
using System;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

class Program
{
    static void Main(string[] args)
    {
        try
        {
            // RabbitMQ'ya bağlanmak için bir bağlantı fabrikası oluşturuyoruz
            var factory = new ConnectionFactory() { HostName = "localhost" };
            // RabbitMQ ile bağlantı kuruyoruz
            using var connection = factory.CreateConnection();
            // RabbitMQ üzerinde bir kanal oluşturuyoruz
            using var channel = connection.CreateModel();
            // Bir kuyruk tanımlıyoruz (eğer zaten tanımlı değilse)
            channel.QueueDeclare(queue: "first_q",
                                 durable: true,  // Kuyruğun kalıcı olup olmadığını belirler
                                 exclusive: false,  // Kuyruğun sadece bu bağlantıya özel olup olmadığını belirler
                                 autoDelete: false,  // Son tüketici bağlantısı kesildiğinde kuyruğun otomatik silinip silinmeyeceğini belirler
                                 arguments: null);  // Ek argümanlar

            // Mesajları almak için bir tüketici oluşturuyoruz
            var consumer = new EventingBasicConsumer(channel);
            // Mesaj alındığında çalışacak olay işleyicisini tanımlıyoruz
            consumer.Received += (model, ea) =>
            {
                // Mesajın gövdesini byte dizisi olarak alıyoruz
                var body = ea.Body.ToArray();
                // Byte dizisini UTF8 stringine dönüştürüyoruz
                var message = Encoding.UTF8.GetString(body);
                // Mesajı konsola yazdırıyoruz
                Console.WriteLine(" [x] Gelen Mesaj : {0} ", message);
            };
            // Tüketiciyi kuyruğa bağlıyoruz ve mesajları almaya başlıyoruz
            channel.BasicConsume(queue: "first_q",
                                 autoAck: true,  // Mesajların otomatik olarak onaylanıp onaylanmadığını belirler
                                 consumer: consumer);

            // Kullanıcıdan bir giriş bekliyoruz (uygulamanın çalışmaya devam etmesi için)
            Console.WriteLine("Dinleyici hala aktif. \nÇıkmak için Enter'a basın.");
            Console.ReadLine();
        }
        catch (Exception ex)
        {
            Console.WriteLine("An error occurred: " + ex.Message);
        }
    }
}
