package propManageProject.accountService.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import propManageProject.accountService.entity.AccountEntity;
import propManageProject.accountService.entity.request.clients.CreateClientRequest;
import propManageProject.accountService.entity.request.clients.EditClientRequest;
import propManageProject.accountService.entity.response.clients.GetClientsResponse;
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

    @GetMapping("/get-client/{clientId}")
    public ResponseEntity<AccountEntity> getClientDetails(@PathVariable("clientId") String clientId){
        System.out.println(clientId);
        return clientService.getClientDetails(clientId);
    }

    @PatchMapping("/edit-client")
    public ResponseEntity<String> editClientDetails(@RequestBody EditClientRequest request){
        return clientService.editClientDetails(request);
    }

    @DeleteMapping("/delete-client/{clientId}")
    public ResponseEntity<String> deleteClient(@PathVariable("clientId") String clientId){
        return clientService.deleteClient(clientId);
    }

    @GetMapping("/get-owners/{managerId}")
    public ResponseEntity<GetClientsResponse> getOwners(@PathVariable("managerId") String managerId){
        System.out.println("COMPLETED");
        return clientService.getOwnersByManagerId(managerId);
    }

    @GetMapping("/get-tenants/{managerId}")
    public ResponseEntity<GetClientsResponse> getTenants(@PathVariable("managerId") String managerId){
        return clientService.getTenantsByManagerId(managerId);
    }


}
