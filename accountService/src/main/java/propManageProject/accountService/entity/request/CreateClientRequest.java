package propManageProject.accountService.entity.request;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class CreateClientRequest {
    private String email, firstName, lastName;
    private UUID managerId;
    private Date dob;
}
