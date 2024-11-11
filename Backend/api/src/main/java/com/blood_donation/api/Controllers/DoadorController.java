package com.blood_donation.api.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blood_donation.api.Models.Doador;
import com.blood_donation.api.Services.Servico;

@RestController
@CrossOrigin(origins = "*")
public class DoadorController {

    @Autowired
    private Servico service;

    @PostMapping("/api/doador")
    public ResponseEntity<?> cadastrarDoador(@RequestBody Doador d){
        return service.cadastrarDoador(d);
    }

    @GetMapping("/api/doador")
    public ResponseEntity<?> listarDoadores(){
        return service.listarDoadores();
    }

    @GetMapping("/api/doador/{id}")
    public ResponseEntity<?> obterDoadorPeloId(@PathVariable int id){
        return service.listarDoadorPorId(id);
    }

    @GetMapping("/api/doador/nacionalidade/{nacionalidade}")
    public ResponseEntity<?> obterDoadorPelaNacionalidade(@PathVariable String nacionalidade){
        return service.listarDoadoresPorNacionalidade(nacionalidade);
    }

    @GetMapping("/api/doador/grupoSanguineo/{grupoSanguineo}")
    public ResponseEntity<?> obterDoadoresPeloGrupoSanguineo(@PathVariable String grupoSanguineo){
        return service.listarDoadoresPorTipoSaguineo(grupoSanguineo);
    }

    @GetMapping("/api/doador/disponibilidade/{disponibilidade}")
    public ResponseEntity<?> obterDoadoresPelaDisponibilidade(@PathVariable Boolean disponibilidade){
        return service.listarDoadoresPorDisponibilidade(disponibilidade);
    }

    @PutMapping("/api/doador")
    public ResponseEntity<?> editarDoador(@RequestBody Doador d){
        return service.editarDoador(d);
    }
    @PutMapping("/api/doador/d")
    public ResponseEntity<?> editarDoadorDisp(@RequestBody int id){
        return service.editarDoadorDisp(id);
    }

    @DeleteMapping("/api/doador/{id}")
    public ResponseEntity<?> removerDoador(@PathVariable int id){
        return service.deletarDoador(id);
    }
}
