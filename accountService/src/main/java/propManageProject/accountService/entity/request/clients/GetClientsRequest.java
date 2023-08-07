package propManageProject.accountService.entity.request.clients;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetClientsRequest {
    private String managerId;
}
