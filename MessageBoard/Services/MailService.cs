using System.Net.Mail;

namespace MessageBoard.Services
{
    public class MailService : IMailService
    {
        public bool SendMail(string from, string to, string subject, string body)
        {
            try
            {
                var msg = new System.Net.Mail.MailMessage(from, to, subject, body);

                var client = new SmtpClient();
                client.Send(msg);
            }
            catch (System.Exception)
            {

                return false;
            }
            return true;
        }
    }
}