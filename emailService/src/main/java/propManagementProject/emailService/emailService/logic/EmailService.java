package propManagementProject.emailService.emailService.logic;

import lombok.AllArgsConstructor;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import propManagementProject.emailService.emailService.entity.request.SavedEmailEntity;
import propManagementProject.emailService.emailService.entity.request.SendEmailRequest;
import propManagementProject.emailService.emailService.repository.SavedEmailRepository;

@Service
@AllArgsConstructor
public class EmailService {

    private MailSender mailSender;
    private SavedEmailRepository repository;

    public void sendSimpleMessage(SendEmailRequest sendEmailRequest){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("propertymanagementsoftwareproj@gmail.com");
        message.setTo("robertdhewson1@gmail.com"); //dummy emails because i am using the freebee SES
        message.setSubject(sendEmailRequest.getSubject());
        message.setText(sendEmailRequest.getBody());
        mailSender.send(message);
        SavedEmailEntity savedMessage = SavedEmailEntity.builder()
                .subject(sendEmailRequest.getSubject())
                .body(sendEmailRequest.getBody())
                .recipient(sendEmailRequest.getRecipient())
                .build();
        repository.save(savedMessage);
    }


}
