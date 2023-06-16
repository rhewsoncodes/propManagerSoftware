package propManagementProject.emailService.emailService.entity.request;

import lombok.Data;

@Data
public class SendEmailRequest {
    String subject, body, recipient;
}
