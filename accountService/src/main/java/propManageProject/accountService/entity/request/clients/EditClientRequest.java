package propManageProject.accountService.entity.request.clients;

import lombok.Data;


@Data
public class EditClientRequest {
    private String clientId, email, firstName, lastName, phoneNumber;
}
