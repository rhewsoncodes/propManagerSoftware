package propManageProject.accountService.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import propManageProject.accountService.entity.request.clients.CreateClientRequest;
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

    @GetMapping("/get-owners/{managerId}")
    public ResponseEntity<GetClientsResponse> getOwners(@PathVariable("managerId") String managerId){
        return clientService.getOwnersByManagerId(managerId);
    }

    @GetMapping("/get-tenants/{managerId}")
    public ResponseEntity<GetClientsResponse> getTenants(@PathVariable("managerId") String managerId){
        return clientService.getTenantsByManagerId(managerId);
    }
}
