package propManagementProject.emailService.emailService.entity.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SendEmailRequest {
    String subject, body, recipient;
}
