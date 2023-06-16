package propManagementProject.emailService.emailService.logic;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import propManagementProject.emailService.emailService.entity.request.SavedEmailEntity;
import propManagementProject.emailService.emailService.entity.request.SendAttachmentEmailRequest;
import propManagementProject.emailService.emailService.entity.request.SendEmailRequest;
import propManagementProject.emailService.emailService.repository.SavedEmailRepository;

@Service
@AllArgsConstructor
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    private SavedEmailRepository repository;

    public void sendSimpleMessage(SendEmailRequest sendEmailRequest){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("propertymanagementsoftwareproj@gmail.com");
        message.setTo(sendEmailRequest.getRecipient());
        message.setSubject(sendEmailRequest.getSubject());
        message.setText(sendEmailRequest.getBody());
        emailSender.send(message);
        SavedEmailEntity savedMessage = SavedEmailEntity.builder()
                .subject(sendEmailRequest.getSubject())
                .body(sendEmailRequest.getBody())
                .recipient(sendEmailRequest.getRecipient())
                .build();
        repository.save(savedMessage);
    }

    public void sendAttachmentMessage(SendAttachmentEmailRequest sendAttachmentEmailRequest) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("propertmanagementsoftwareproj@gmail.com");
        helper.setTo(sendAttachmentEmailRequest.getRecipient());
        helper.setSubject(sendAttachmentEmailRequest.getSubject());
        helper.setText(sendAttachmentEmailRequest.getBody());

        emailSender.send(message);
    }



}
