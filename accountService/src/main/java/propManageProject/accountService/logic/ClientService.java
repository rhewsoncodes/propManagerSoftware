package propManageProject.accountService.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import propManageProject.accountService.entity.AccountEntity;
import propManageProject.accountService.entity.request.clients.CreateClientRequest;
import propManageProject.accountService.entity.request.emails.SendEmailRequest;
import propManageProject.accountService.entity.response.clients.GetClientsResponse;
import propManageProject.accountService.repository.AccountRepository;

import java.util.UUID;

@Service
public class ClientService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${emailservice.url}")
    private String emailServiceUrl;

    public ResponseEntity<String> createClientAccount(
            CreateClientRequest request
    ){
        try {
            String username = request.getFirstName().charAt(0) + request.getLastName();
            String password = Integer.toString(request.getDob().getMonth()) + request.getLastName() + Integer.toString(request.getDob().getYear());
            password = password.replace(" ","_");
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

                SendEmailRequest sendEmailRequest = SendEmailRequest.builder().subject("Your account has been created")
                        .body("Your username is " + username + "Your password is" + password)
                        .recipient(request.getEmail())
                                .build();

                restTemplate.postForObject(emailServiceUrl + "send", sendEmailRequest, String.class);
                return ResponseEntity.status(HttpStatus.CREATED).body("Client account created");

            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
            }
        } catch (Exception err) {
            err.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    public ResponseEntity<GetClientsResponse> getClientsByManagerId (String managerId){
        System.out.println("FORBIDDEN MY ASS NUMERO DOS");
        UUID managerUUID = UUID.fromString(managerId);
        AccountEntity[] clients = accountRepository.findAllByManagerId(managerUUID);
        GetClientsResponse request = GetClientsResponse.builder().accounts(clients).build();
        return ResponseEntity.ok(request);
    }

}
