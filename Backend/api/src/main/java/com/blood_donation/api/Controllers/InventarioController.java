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

import com.blood_donation.api.Models.Inventario;
import com.blood_donation.api.Services.Servico;

@RestController
@CrossOrigin(origins = "*")
public class InventarioController {

    @Autowired Servico service; 
    @PostMapping("/api/inventario")
    public ResponseEntity<?> cadastrarInventario(@RequestBody Inventario i){
        return service.cadastrarInventario(i);
    }
    @GetMapping("/api/inventario")
    public ResponseEntity<?> listarInventario(){
        return service.listarInventarios();
    }
    @GetMapping("/api/inventario/{id}")
    public ResponseEntity<?> obterInventarioPorId(@PathVariable int id){
        return service.listarInventarioPorId(id);
    }
    @GetMapping("/api/inventario/hospital/{nomeH}")
    public ResponseEntity<?> obterInventarioPorNomeHospital(@PathVariable String nomeH){
        return service.listarInventarioPorNome(nomeH);
    }
    @PutMapping("/api/inventario")
    public ResponseEntity<?> editarInventario(@RequestBody Inventario i){
        return service.editarInventario(i);
    }
    @GetMapping("/api/inventario/A_mais")
    public ResponseEntity<?> obterA_mais(){
        return service.listarPorA_mais();
    }
    @GetMapping("/api/inventario/A_menos")
    public ResponseEntity<?> obterA_menos(){
        return service.listarPorA_menos();
    }
    @GetMapping("/api/inventario/B_mais")
    public ResponseEntity<?> obterB_mais(){
        return service.listarPorB_mais();
    }
    @GetMapping("/api/inventario/B_menos")
    public ResponseEntity<?> obterB_menos(){
        return service.listarPorB_menos();
    }
    @GetMapping("/api/inventario/AB_mais")
    public ResponseEntity<?> obterAB_mais(){
        return service.listarPorAB_mais();
    }
    @GetMapping("/api/inventario/AB_menos")
    public ResponseEntity<?> obterAB_menos(){
        return service.listarPorAB_menos();
    }
    @GetMapping("/api/inventario/O_mais")
    public ResponseEntity<?> obterO_mais(){
        return service.listarPorO_mais();
    }
    @GetMapping("/api/inventario/0_menos")
    public ResponseEntity<?> obterO_menos(){
        return service.listarPorO_menos();
    }
    @DeleteMapping("/api/inventario/{id}")
    public ResponseEntity<?> deletarInventario(@PathVariable int id){
        return service.deletarInventario(id);
    }
}
