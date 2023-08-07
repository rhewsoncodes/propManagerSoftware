package propManageProject.accountService.entity.request.emails;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SendEmailRequest {
    String subject, body, recipient;
}
