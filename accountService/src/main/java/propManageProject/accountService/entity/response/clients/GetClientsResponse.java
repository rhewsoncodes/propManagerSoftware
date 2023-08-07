package propManageProject.accountService.entity.response.clients;

import lombok.Builder;
import lombok.Data;
import propManageProject.accountService.entity.AccountEntity;

@Data
@Builder
public class GetClientsResponse {
    AccountEntity[] accounts;
}
