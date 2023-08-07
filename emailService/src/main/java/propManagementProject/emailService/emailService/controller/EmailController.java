package propManagementProject.emailService.emailService.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import propManagementProject.emailService.emailService.entity.request.SendAttachmentEmailRequest;
import propManagementProject.emailService.emailService.entity.request.SendEmailRequest;
import propManagementProject.emailService.emailService.logic.EmailService;

@RestController
@AllArgsConstructor
@RequestMapping("/email")
public class EmailController {
    private EmailService emailLogic;

    @PostMapping("/send")
    public ResponseEntity<String> sendBasicEmail(@RequestBody SendEmailRequest request){
        try {
            emailLogic.sendSimpleMessage(request);
            return ResponseEntity.ok("Email sent.");
        }
        catch(Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
