package propManageProject.accountService.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import propManageProject.accountService.entity.request.AuthenticationRequest;
import propManageProject.accountService.entity.request.CreateAccountRequest;
import propManageProject.accountService.entity.response.AuthenticationResponse;
import propManageProject.accountService.logic.accountLogic;


@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private accountLogic accountLogic;

    @PostMapping("/createAccount")
    public ResponseEntity<AuthenticationResponse> createAccount(@RequestBody CreateAccountRequest request){
        return ResponseEntity.ok(accountLogic.createAccount(request).getBody());
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(accountLogic.authenticate(request).getBody());
    }

}
