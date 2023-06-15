package propManageProject.accountService.entity.request;

import lombok.Data;

@Data
public class CreateAccountRequest {
    private String username, password, email, firstName, lastName, accountType;
}
