package propManageProject.accountService.entity.request.authentication;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String newPassword, confirmPassword;
}
