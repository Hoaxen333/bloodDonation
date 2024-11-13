package com.blood_donation.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blood_donation.api.Models.Responsavel;
import com.blood_donation.api.Models.ResponsavelDTO;
import com.blood_donation.api.Repositorio.ResponsavelRepository;
import com.blood_donation.api.Services.EmailService;
import com.blood_donation.api.Services.Servico;

import jakarta.mail.MessagingException;

@RestController
@CrossOrigin(origins = "*")
public class ReponsavelController {
    @Autowired
    private Servico servico;
    private EmailService emailService;
    @Autowired
    public void ResponsavelController( EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/api/responsavel")
    public ResponseEntity<?> cadastrarResponsavel(@RequestBody Responsavel r){
        try {
            emailService.sendCredentials(
                r.getEmail(),
                r.getUsername(),
                r.getPassword()
            );
        } catch (MessagingException e) {
            return new ResponseEntity<>("Erro ao enviar e-mail.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return servico.cadastrarResponsavel(r);
    }
    @PostMapping("/api/responsavel/login")
    public ResponseEntity<?> loginResponsavel(@RequestBody ResponsavelDTO rDto){
        return servico.login(rDto);
    }
    @GetMapping("/api/responsavel")
    public ResponseEntity<?> listarResponsaveis(){
        return servico.listarResponsaveis();
    }
    @GetMapping("api/responsavel/verificar-username")
    public ResponseEntity<Boolean> verificarUsername(@RequestParam String username) {
        boolean exists = servico.checkUsernameExists(username);
        return ResponseEntity.ok(exists);
    }
}
