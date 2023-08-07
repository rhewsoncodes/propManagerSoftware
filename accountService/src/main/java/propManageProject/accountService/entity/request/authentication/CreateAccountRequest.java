package propManageProject.accountService.entity.request.authentication;

import lombok.Data;

@Data
public class CreateAccountRequest {
    private String accountType, email, firstName, lastName, password, username;
}
