package com.blood_donation.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blood_donation.api.Models.Responsavel;
import com.blood_donation.api.Services.Servico;

@RestController
public class ReponsavelController {
    @Autowired
    private Servico servico;

    @PostMapping("/api/responsavel")
    public ResponseEntity<?> cadastrarResponsavel(@RequestBody Responsavel r){
        return servico.cadastrarResponsavel(r);
    }
    @GetMapping("/api/respondavel")
    public ResponseEntity<?> listarResponsaveis(){
        return servico.listarResponsaveis();
    }
    
}
