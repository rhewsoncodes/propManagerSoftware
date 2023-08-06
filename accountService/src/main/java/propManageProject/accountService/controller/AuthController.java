package propManageProject.accountService.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import propManageProject.accountService.entity.request.AuthenticationRequest;
import propManageProject.accountService.entity.request.CreateAccountRequest;
import propManageProject.accountService.entity.response.AuthenticationResponse;
import propManageProject.accountService.logic.AccountService;


@RestController
@AllArgsConstructor
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/createAccount")
    public ResponseEntity<AuthenticationResponse> createAccount(@RequestBody CreateAccountRequest request, HttpServletResponse response){
        return accountService.createAccount(request, response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response){
        return accountService.authenticate(request, response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(@CookieValue("refreshToken") String refreshToken,
                                                               HttpServletRequest request,
                                                               HttpServletResponse response){
        return accountService.refreshToken(refreshToken, request, response);
    }



}
