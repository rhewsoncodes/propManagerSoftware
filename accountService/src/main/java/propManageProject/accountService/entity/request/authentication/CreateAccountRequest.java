package propManageProject.accountService.entity.request.authentication;

import lombok.Data;

import java.util.Date;

@Data
public class CreateAccountRequest {
    private String accountType, email, firstName, lastName, password, username, phoneNumber;
    private Date dob;
}
