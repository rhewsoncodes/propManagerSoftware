package propManageProject.accountService.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import propManageProject.accountService.entity.request.CreateClientRequest;
import propManageProject.accountService.logic.ClientService;

@RestController
@AllArgsConstructor
@RequestMapping("/client")
public class ClientController {

    private ClientService clientService;

    @PostMapping("/create-client")
    public ResponseEntity<String> createClient(@RequestBody CreateClientRequest request){
        return clientService.createClientAccount(request);
    }
}
