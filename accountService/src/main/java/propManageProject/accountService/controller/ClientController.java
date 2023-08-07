package propManageProject.accountService.controller;


import jakarta.persistence.GeneratedValue;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import propManageProject.accountService.entity.AccountEntity;
import propManageProject.accountService.entity.request.clients.CreateClientRequest;
import propManageProject.accountService.entity.request.clients.GetClientsRequest;
import propManageProject.accountService.entity.response.clients.GetClientsResponse;
import propManageProject.accountService.logic.ClientService;

@RestController
@AllArgsConstructor
@RequestMapping("/client")
@CrossOrigin
public class ClientController {

    private ClientService clientService;

    @PostMapping("/create-client")
    public ResponseEntity<String> createClient(@RequestBody CreateClientRequest request){
        return clientService.createClientAccount(request);
    }

    @PostMapping("/get-clients")
    public ResponseEntity<GetClientsResponse> getClients(@RequestBody GetClientsRequest request){
        return clientService.getClientsByManagerId(request.getManagerId());
    }
}
