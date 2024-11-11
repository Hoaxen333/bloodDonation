package com.blood_donation.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blood_donation.api.Models.Doacao;
import com.blood_donation.api.Services.Servico;

@RestController
@CrossOrigin(origins = "*")
public class DoacaoController {
    @Autowired
    private Servico servico;

    @PostMapping("/api/doacao")
    public ResponseEntity<?> cadastrarDoacao(@RequestBody Doacao d){
        return servico.cadastrarDoacao(d);
    }
    @GetMapping("/api/doacao")
    public ResponseEntity<?> listarDoacaoes(){
        return servico.listarDoacoes();
    }
    @GetMapping("/api/doacao/{id}")
    public ResponseEntity<?> listarDoacaoesPorId(@PathVariable Long id){
        return servico.listarDoacaoById(id);
    }
    @GetMapping("/api/doacao/hospital/{id}")
    public ResponseEntity<?> listarDoacaoesPorHospital(@PathVariable int id){
        return servico.listarDoacaoByHospital(id);
    }
    @GetMapping("/api/doacao/Doador/{id}")
    public ResponseEntity<?> listarDoacaoesPorDoador(@PathVariable int id){
        return servico.listarDoacaoByDoador(id);
    }
}
