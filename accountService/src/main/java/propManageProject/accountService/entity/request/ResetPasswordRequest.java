package propManageProject.accountService.entity.request;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String newPassword, confirmPassword;
}
