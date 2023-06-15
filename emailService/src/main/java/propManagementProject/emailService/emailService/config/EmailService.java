package propManagementProject.emailService.emailService.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSenderImpl emailSender;

    public void sendSimpleMessage(String from, String to, String subject, String text){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("propertymanagementsoftwareproj@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }


}
