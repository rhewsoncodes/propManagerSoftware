package propManageProject.accountService.controller;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {


    @GetMapping("/poop123")
    public ResponseEntity<String> testRoute(HttpServletRequest request){
        return ResponseEntity.ok().build();
    }
}
