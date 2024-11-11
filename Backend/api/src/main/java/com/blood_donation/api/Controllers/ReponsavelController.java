package com.blood_donation.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blood_donation.api.Models.Responsavel;
import com.blood_donation.api.Models.ResponsavelDTO;
import com.blood_donation.api.Services.Servico;

@RestController
@CrossOrigin(origins = "*")
public class ReponsavelController {
    @Autowired
    private Servico servico;

    @PostMapping("/api/responsavel")
    public ResponseEntity<?> cadastrarResponsavel(@RequestBody Responsavel r){
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
}
