package propManageProject.accountService.logic;

import io.jsonwebtoken.impl.DefaultClaims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import propManageProject.accountService.entity.AccountEntity;
import propManageProject.accountService.entity.request.authentication.AuthenticationRequest;
import propManageProject.accountService.entity.request.authentication.CreateAccountRequest;
import propManageProject.accountService.entity.response.authentication.AuthenticationResponse;
import propManageProject.accountService.repository.AccountRepository;


import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

@Service
@AllArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<AuthenticationResponse> createAccount(CreateAccountRequest createAccountRequest, HttpServletResponse response) {
        try {
            String encodedPassword = passwordEncoder.encode(createAccountRequest.getPassword());
            boolean unique = accountRepository.findAccountByUsername(createAccountRequest.getUsername()).isEmpty()
                    && accountRepository.findAccountByEmail(createAccountRequest.getEmail()).isEmpty();
            System.out.println(unique);
            if (unique) {
                AccountEntity account = AccountEntity.builder()
                        .username(createAccountRequest.getUsername())
                        .password(encodedPassword)
                        .email(createAccountRequest.getEmail())
                        .firstName(createAccountRequest.getFirstName())
                        .lastName((createAccountRequest.getLastName()))
                        .accountType((createAccountRequest.getAccountType()))
                        .phoneNumber(createAccountRequest.getPhoneNumber())
                        .dob(createAccountRequest.getDob())
                        .build();
                accountRepository.save(account);
                var jwtToken = jwtService.generateToken(account);
                var refreshToken = jwtService.generateRefreshToken(account);
                account.setRefreshToken(refreshToken);
                accountRepository.save(account);
                Cookie cookie = new Cookie("refreshToken", refreshToken);
                cookie.setHttpOnly(true);
                response.addCookie(cookie);
                AuthenticationResponse responseBody = AuthenticationResponse.builder()
                        .accessToken(jwtToken)
                        .user_id(account.getUuid())
                        .role(account.getAccountType())
                        .build();

                return ResponseEntity.ok(responseBody);
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUsername(), request.getPassword()));
            System.out.println("AUTHORIZED");
            var user = accountRepository.findAccountByUsername(request.getUsername()).orElseThrow();
            System.out.println(user);
            var jwtToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);
            AuthenticationResponse responseBody = AuthenticationResponse.builder().accessToken(jwtToken)
                    .user_id(user.getUuid())
                    .role(accountRepository.findAccountByUsername(request.getUsername())
                            .get().getAccountType()).build();
            user.setRefreshToken(refreshToken);
            accountRepository.save(user);
            Cookie cookie = new Cookie("refreshToken", refreshToken);
            cookie.setHttpOnly(true);
            response.addCookie(cookie);
            return ResponseEntity.ok(responseBody);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }


    public Map<String, Object> getMapFromIoJsonwebtokenClaims(DefaultClaims claims) {
        Map<String, Object> expectedMap = new HashMap<String, Object>();
        for (Entry<String, Object> entry : claims.entrySet()) {
            expectedMap.put(entry.getKey(), entry.getValue());
        }
        return expectedMap;
    }


    public ResponseEntity<AuthenticationResponse> refreshToken(
            String refreshToken, HttpServletRequest request, HttpServletResponse response
    ) {
        try {
            String username;
            username = jwtService.extractUsername(refreshToken);
            if (username != null) {
                var userDetails = accountRepository.findAccountByUsername(username).orElseThrow();
                if (jwtService.isTokenValid(refreshToken, userDetails)) {
                    var accessToken = jwtService.generateToken(userDetails);
                    AuthenticationResponse authenticationResponse = AuthenticationResponse
                            .builder()
                            .accessToken(accessToken)
                            .role(userDetails.getAccountType())
                            .user_id(userDetails.getUuid())
                            .build();
                    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, refreshToken).body(authenticationResponse);
                }
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }

    public ResponseEntity<String> logout(
            String refreshToken, HttpServletRequest request, HttpServletResponse response
    ){
        try {
            if (refreshToken == null) {
                return ResponseEntity.ok("User not logged in");
            }

            AccountEntity account = accountRepository.findAccountEntityByRefreshToken(refreshToken).get();

            if (account == null) {
                return ResponseEntity.ok().build();
            }

            account.setRefreshToken("");
            accountRepository.save(account);
            Cookie deleteRefreshTokenCookie = new Cookie("refreshToken", null);
            deleteRefreshTokenCookie.setMaxAge(0);
            response.addCookie(deleteRefreshTokenCookie);

            return ResponseEntity.ok("User logged out");
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
