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

import com.blood_donation.api.Models.Hospital;
import com.blood_donation.api.Services.Servico;

@RestController
@CrossOrigin(origins = "*")
public class HospitalController {

    @Autowired
    private Servico servico;

    @PostMapping("/api/hospital")
    public ResponseEntity<?> cadastrarHospital(@RequestBody Hospital h){
        return servico.cadastrarHospital(h);
    }

    
    @GetMapping("/api/hospital")
    public ResponseEntity<?> listarHospitais(){
        return servico.listarHospitais();
    }

    @GetMapping("/api/hospital/{id}")
    public ResponseEntity<?> listarHospitalId(@PathVariable int id){
        return servico.listarHospitalPorId(id);
    }

    @GetMapping("/api/hospital/localizacao/{location}")
    public ResponseEntity<?> listarHospitaPorLocalizacao(@PathVariable String location){
        return servico.listarHospitalPorLocation(location);
    }

    @GetMapping("/api/hospital/nome/{nome}")
    public ResponseEntity<?> listarHospitaPorNome(@PathVariable String nome){
        return servico.listarHospitalPorNome(nome);
    }

    @GetMapping("/api/hospital/contacto/{contacto}")
    public ResponseEntity<?> listarHospitaPorContacto(@PathVariable String contacto){
        return servico.listarHospitalPorContacto(contacto);
    }

    @PutMapping("/api/hospital")
    public ResponseEntity<?> editarHospital(@RequestBody Hospital h){
        return servico.editarHospital(h);
    }
    
    @DeleteMapping("/api/hospital/{id}")
    public ResponseEntity<?> removerHospital(@PathVariable int id){
        return servico.deletarHospital(id);
    }
}
