package propManageProject.accountService.logic;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import propManageProject.accountService.entity.AccountEntity;
import propManageProject.accountService.entity.request.AuthenticationRequest;
import propManageProject.accountService.entity.request.CreateAccountRequest;
import propManageProject.accountService.entity.response.AuthenticationResponse;
import propManageProject.accountService.repository.AccountRepository;

@Service
@AllArgsConstructor
public class accountLogic {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<AuthenticationResponse> createAccount (CreateAccountRequest createAccountRequest){
        try {
            String encodedPassword = passwordEncoder.encode(createAccountRequest.getPassword());
            boolean unique = accountRepository.findAccountByUsername(createAccountRequest.getUsername()).isEmpty()
                    && accountRepository.findAccountByEmail(createAccountRequest.getEmail()).isEmpty();
            if (unique) {
                AccountEntity account = AccountEntity.builder()
                        .username(createAccountRequest.getUsername())
                        .password(encodedPassword)
                        .email(createAccountRequest.getEmail())
                        .firstName(createAccountRequest.getFirstName())
                        .lastName((createAccountRequest.getLastName()))
                        .accountType((createAccountRequest.getAccountType()))
                        .build();
                accountRepository.save(account);
                var jwtToken = jwtService.generateToken(account);
                AuthenticationResponse response = AuthenticationResponse.builder().token(jwtToken).build();
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(), request.getPassword()));
        var user = accountRepository.findAccountByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        AuthenticationResponse response = AuthenticationResponse.builder().token(jwtToken).build();
        return ResponseEntity.ok(response);
    }
}
