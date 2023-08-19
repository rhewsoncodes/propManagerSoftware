package propManageProject.accountService.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import propManageProject.accountService.entity.request.authentication.AuthenticationRequest;
import propManageProject.accountService.entity.request.authentication.CreateAccountRequest;
import propManageProject.accountService.entity.response.authentication.AuthenticationResponse;
import propManageProject.accountService.logic.AccountService;
import propManageProject.accountService.logic.JwtService;


@RestController
@AllArgsConstructor
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private AccountService accountService;
    private JwtService jwtService;

    @PostMapping("/createAccount")
    public ResponseEntity<AuthenticationResponse> createAccount(@RequestBody CreateAccountRequest request, HttpServletResponse response){
        return accountService.createAccount(request, response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response){
        return accountService.authenticate(request, response);
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(@CookieValue("refreshToken") String refreshToken,
                                                               HttpServletRequest request,
                                                               HttpServletResponse response){
        return accountService.refreshToken(refreshToken, request, response);
    }

    @GetMapping("/validate-token/{token}")
    public ResponseEntity<Boolean> validateToken(@PathVariable("token") String token, String username){
        return jwtService.isTokenValidForGateway(token, username);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(@CookieValue("refreshToken") String refreshToken, HttpServletRequest request, HttpServletResponse response){
        return accountService.logout(refreshToken, request, response);
    }



}
