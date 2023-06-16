package propManagementProject.emailService.emailService.entity.request;

import lombok.Data;

@Data
public class SendAttachmentEmailRequest {
    String subject, body, recipient, filepath;
}
