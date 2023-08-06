package propManageProject.accountService.logic;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import propManageProject.accountService.entity.AccountEntity;
import propManageProject.accountService.entity.request.CreateClientRequest;
import propManageProject.accountService.repository.AccountRepository;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ClientService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<String> createClientAccount(
            CreateClientRequest request
    ){
        try {
            String username = request.getFirstName().charAt(0) + request.getLastName();
            String password = Integer.toString(request.getDob().getMonth()) + request.getLastName() + Integer.toString(request.getDob().getYear());
            String encodedPassword = passwordEncoder.encode(password);
            boolean uniqueEmail = accountRepository.findAccountByEmail(request.getEmail()).isEmpty();

            if (uniqueEmail) {
                boolean uniqueUsername = accountRepository.findAccountByUsername(username).isEmpty();
                int i = 1;
                while (!uniqueUsername) {
                    username = username + Integer.toString(i);
                    uniqueUsername = accountRepository.findAccountByUsername(username).isEmpty();
                }
                AccountEntity user = AccountEntity.builder().username(username)
                        .password(password)
                        .email(request.getEmail())
                        .firstName(request.getFirstName())
                        .lastName(request.getLastName())
                        .accountType(request.getAccountType())
                        .managerId(request.getManagerId())
                        .build();
                accountRepository.save(user);
                return ResponseEntity.status(HttpStatus.CREATED).body("Client account created");

            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
            }
        } catch (Exception err) {
            err.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
