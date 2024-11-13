package com.blood_donation.api.Services;

import java.util.*;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.blood_donation.api.Models.Doacao;
import com.blood_donation.api.Models.Doador;
import com.blood_donation.api.Models.Hospital;
import com.blood_donation.api.Models.Inventario;
import com.blood_donation.api.Models.Message;
import com.blood_donation.api.Models.Responsavel;
import com.blood_donation.api.Models.ResponsavelDTO;
import com.blood_donation.api.Repositorio.DoacaoRepository;
import com.blood_donation.api.Repositorio.DoadorRepository;
import com.blood_donation.api.Repositorio.HospitalRepository;
import com.blood_donation.api.Repositorio.InventarioRepository;
import com.blood_donation.api.Repositorio.ResponsavelRepository;


@Service
public class Servico {
    
    @Autowired
    private Message mensagem;

    @Autowired
    private DoadorRepository donateRepo;

    @Autowired
    private HospitalRepository hospiRepo;

    @Autowired
    private ResponsavelRepository responsaRepo;

    @Autowired
    private InventarioRepository inventRepository;

    @Autowired
    private DoacaoRepository donRepository;

    //Doadores

    //cadastro
    public ResponseEntity<?> cadastrarDoador(Doador obj){
        if(obj.getNome().equals("")){
            mensagem.setMensagem("O nome precisa ser preenchido");
            return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
        }else if(obj.getPeso() < 50){
            mensagem.setMensagem("Insira um valor válido > 50");
            return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
        }else if(obj.getBi().equals("")){
            mensagem.setMensagem("O BI precisa ser preenchido");
            return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
        }
        else if(obj.getTipoSanguineo().equals("")){
            mensagem.setMensagem("O tipo sanguíneo precisa ser preenchido");
            return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
        }else{
            donateRepo.save(obj);
            return new ResponseEntity<>(donateRepo.save(obj),HttpStatus.CREATED);
        }
    }

    //listar doadores
    public ResponseEntity<?> listarDoadores(){
        return new ResponseEntity<>(donateRepo.findAll(),HttpStatus.OK); 
    }

    //listar por id
    public ResponseEntity<?> listarDoadorPorId(int id){
        if(donateRepo.findById(id) != null){
            return new ResponseEntity<>(donateRepo.findById(id),HttpStatus.OK); 
        }
        mensagem.setMensagem("Doador com id "+id+" não encontrado");
        return new ResponseEntity<>(mensagem,HttpStatus.NOT_FOUND);
    }

    //listar por Bi
    public ResponseEntity<?> listarDoadorPorBi(String bi){
        if(donateRepo.findByBi(bi) != null){
            return new ResponseEntity<>(donateRepo.findByBi(bi),HttpStatus.OK); 
        }
        mensagem.setMensagem("Doador com bi "+bi+" não encontrado");
        return new ResponseEntity<>(mensagem,HttpStatus.NOT_FOUND);
    }

    //listar por tipo sanguineo
    public ResponseEntity<?> listarDoadoresPorTipoSaguineo(String type){
        return new ResponseEntity<>(donateRepo.findByTipoSanguineo(type),HttpStatus.OK);
    }

    //listar por nacionalidade
    public ResponseEntity<?> listarDoadoresPorNacionalidade(String nacionalidade){
        return new ResponseEntity<>(donateRepo.findByNacionalidade(nacionalidade),HttpStatus.OK);
    }

    public ResponseEntity<?> listarNomeContendo(String nome){
        return new ResponseEntity<>(donateRepo.findByNomeContaining(nome),HttpStatus.OK);
    }

    public ResponseEntity<?> listarDoadoresPorDisponibilidade(Boolean disp){
        return new ResponseEntity<>(donateRepo.findByDisponibilidade(disp),HttpStatus.OK);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    public ResponseEntity<?> editarDoador(Doador d){
        if(d != null){
            return new ResponseEntity(donateRepo.save(d),HttpStatus.OK);
        }
        mensagem.setMensagem("Insira um Doador!");
        return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
    }
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public ResponseEntity<?> editarDoadorDisp(int id){
        Doador d = donateRepo.findById(id);
        if(d != null){
            d.setDisponibilidade(!d.isDisponibilidade());
            return new ResponseEntity(donateRepo.save(d),HttpStatus.OK);
        }
        mensagem.setMensagem("Insira um Doador!");
        return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
    }
    public ResponseEntity<?> deletarDoador(int id){
        Doador d = donateRepo.findById(id);
        if(d != null){
            donateRepo.delete(d);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        mensagem.setMensagem("Não existe doador com id : "+id);
        return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
    }


    //Hospital

    public ResponseEntity<?> cadastrarHospital(Hospital h){
        if(h == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(hospiRepo.save(h),HttpStatus.CREATED);
    }
    public ResponseEntity<?> listarHospitais(){
        return new ResponseEntity<>(hospiRepo.findAll(),HttpStatus.OK);
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ResponseEntity<?> listarHospitalPorId(int id){
        if(id<=0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Hospital h = hospiRepo.findById(id);
        if(h == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(h,HttpStatus.OK);
    }

    public ResponseEntity<?> listarHospitalPorContacto(String contacto){
        return new ResponseEntity<>(hospiRepo.findByContactoContaining(contacto),HttpStatus.OK);
    }

    public ResponseEntity<?> listarHospitalPorLocation(String location){
        return new ResponseEntity<>(hospiRepo.findByLocalizacaoContaining(location),HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> listarHospitalPorNome(String nome){
        return new ResponseEntity<>(hospiRepo.findByNomeContaining(nome),HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?>  editarHospital(Hospital h){
        if(h != null){
            return new ResponseEntity<>(hospiRepo.save(h),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?>  deletarHospital(int id){
        Hospital h = hospiRepo.findById(id);
        if(h != null){
            hospiRepo.delete(h);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        mensagem.setMensagem("Não existe hospital com id : "+id);
        return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> obterHospitalPorNome(String nome){
        Integer id = hospiRepo.findIdHospitalByNome(nome);
        if (id != null){
            return new ResponseEntity<>(id,HttpStatus.OK);
        }
        return new ResponseEntity<>("null",HttpStatus.NOT_FOUND);
    }

    //Responsavel

    //cadastrar responsavel
    public ResponseEntity<?> cadastrarResponsavel(Responsavel r){
        if(r==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(responsaRepo.save(r),HttpStatus.CREATED);
        }
    }

    //listar Responsaveis
    public ResponseEntity<?> listarResponsaveis(){
        return new ResponseEntity<>(responsaRepo.findAll(),HttpStatus.OK);
    }

    //listar Responsavel por id
    public ResponseEntity<?> listarResponsaveisPorId(int id){
        if(id <= 0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Responsavel r = responsaRepo.findById(id);
        if(r == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(r,HttpStatus.OK);
    } 

    public ResponseEntity<?> listarResponsaveisPorHospital(String nomeHospital){
        Hospital h = hospiRepo.findByNome(nomeHospital);
        if(h == null){
            mensagem.setMensagem("O hospital nao existe");
            return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
        }
        
        List<Responsavel> r = responsaRepo.findByHospital(h);
        if( r == null){
            mensagem.setMensagem("Lista Vazia");
            return new ResponseEntity<>(mensagem,HttpStatus.OK);
        }
        return new ResponseEntity<>(r,HttpStatus.OK);
    }
    public ResponseEntity<?> login(ResponsavelDTO rDto){
        if(rDto.getUsername() == "" || rDto.getPassword() == ""){
            mensagem.setMensagem("Preencha corretamente os campos!");
            return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
        }
        Responsavel responsa = responsaRepo.login(rDto.getUsername(), rDto.getPassword());
        if(responsa == null){
            mensagem.setMensagem("O username ou password estao incorrectos!");
            return new ResponseEntity<>(mensagem,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(responsa,HttpStatus.OK);
    } 

    public ResponseEntity<?> listarResponsaveisPorNome(String nome){
        return new ResponseEntity<>(responsaRepo.findByNomeContaining(nome),HttpStatus.OK);
    } 
    public ResponseEntity<?> listarResponsaveisPorUsername(String username){
        return new ResponseEntity<>(responsaRepo.findByUsernameContaining(username),HttpStatus.OK);
    } 
    public ResponseEntity<?> listarResponsaveisPorApelido(String apelido){
        return new ResponseEntity<>(responsaRepo.findByApelidoContaining(apelido),HttpStatus.OK);
    } 
    public boolean checkUsernameExists(String username){
        return responsaRepo.usernameExists(username);
    }

    public ResponseEntity<?>  editarResponsavel(Responsavel r){
        if(r != null){
            return new ResponseEntity<>(responsaRepo.save(r),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?>  deletarResponsavel(int id){
        Responsavel r = responsaRepo.findById(id);
        if(r != null){
            responsaRepo.delete(r);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        mensagem.setMensagem("Não existe Responsavel com id : "+id);
        return new ResponseEntity<>(mensagem,HttpStatus.BAD_REQUEST);
    }

    //Inventario

    public ResponseEntity<?> cadastrarInventario(Inventario i){
        if(i == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(inventRepository.save(i),HttpStatus.CREATED);
    }

    public ResponseEntity<?> editarInventario(Inventario i){
        if(i == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(inventRepository.save(i),HttpStatus.CREATED);
    }

    public ResponseEntity<?> deletarInventario(int id){
        Inventario i = inventRepository.findById(id);
        if(i == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        inventRepository.delete(i);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<?> listarInventarios(){
        return new ResponseEntity<>(inventRepository.findAll(),HttpStatus.OK);
    }
    
    public ResponseEntity<?> listarInventarioPorId(int id){
        if(id<=0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Inventario i = inventRepository.findById(id);
        if (i == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(i,HttpStatus.OK);
    }

    public ResponseEntity<?> listarInventarioPorNome(String nome){
        return new ResponseEntity<>(inventRepository.findByNomeHospital(nome),HttpStatus.OK);
    }

    public ResponseEntity<?> listarPorA_mais(){
        return new ResponseEntity<>(inventRepository.findA_mais(),HttpStatus.OK);
    }

    public ResponseEntity<?> listarPorA_menos(){
        return new ResponseEntity<>(inventRepository.findA_menos(),HttpStatus.OK);
    }

    public ResponseEntity<?> listarPorAB_menos(){
        return new ResponseEntity<>(inventRepository.findAB_menos(),HttpStatus.OK);
    }

    public ResponseEntity<?> listarPorAB_mais(){
        return new ResponseEntity<>(inventRepository.findAB_mais(),HttpStatus.OK);
    }

    public ResponseEntity<?> listarPorB_menos(){
        return new ResponseEntity<>(inventRepository.findB_menos(),HttpStatus.OK);
    }

    public ResponseEntity<?> listarPorB_mais(){
        return new ResponseEntity<>(inventRepository.findB_mais(),HttpStatus.OK);
    }

    public ResponseEntity<?> listarPorO_menos(){
        return new ResponseEntity<>(inventRepository.findO_menos(),HttpStatus.OK);
    }

    public ResponseEntity<?> listarPorO_mais(){
        return new ResponseEntity<>(inventRepository.findO_mais(),HttpStatus.OK);
    }

    //Doacao
    public ResponseEntity<?> cadastrarDoacao(Doacao doa){
        if(doa.getDoador().getId() <=0 || doa.getHospital().getId() <=0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Doador d = donateRepo.findById(doa.getDoador().getId());

        Hospital h = hospiRepo.findById(doa.getHospital().getId());

        Date date = new Date(System.currentTimeMillis());
        doa.setDataHoraDoacao(date);

        if(d==null || h==null || !d.isDisponibilidade()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        

        Inventario i = inventRepository.findByNomeHospitalD(doa.getHospital().getId());

        if(d.getTipoSanguineo().equals("A+")){
            i.setA_mais(i.getA_mais()+1);
        }else if(d.getTipoSanguineo().equals("A-")){
            i.setA_menos(i.getA_menos()+1);
        }else if(d.getTipoSanguineo().equals("AB+")){
            i.setAB_mais(i.getAB_mais()+1);
        }else if(d.getTipoSanguineo().equals("AB-")){
            i.setAB_menos(i.getAB_menos()+1);
        }else if(d.getTipoSanguineo().equals("B+")){
            i.setB_mais(i.getB_mais()+1);
        }else if(d.getTipoSanguineo().equals("B-")){
            i.setB_menos(i.getB_menos()+1);
        }else if(d.getTipoSanguineo().equals("O+")){
            i.setO_mais(i.getO_mais()+1);
        }else if(d.getTipoSanguineo().equals("O-")){
            i.setO_menos(i.getO_menos()+1);
        }
        inventRepository.save(i);
        return new ResponseEntity<>(donRepository.save(doa),HttpStatus.CREATED);
    }
    public ResponseEntity<?> listarDoacoes(){
        return new ResponseEntity<>(donRepository.findAll(),HttpStatus.OK);
    }
    public ResponseEntity<?> listarDoacaoById(Long id){
        if(id<=0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Doacao d = donRepository.findById(id);
        if (d == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(d,HttpStatus.OK);
    }
    public ResponseEntity<?> listarDoacaoByDoador(int id){
        if(id<=0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Doador d = donateRepo.findById(id);

        if (d == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(donRepository.findByDoador(d),HttpStatus.OK);
    }
    public ResponseEntity<?> listarDoacaoByHospital(int id){
        if(id<=0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Hospital h = hospiRepo.findById(id);

        if (h == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(donRepository.findByHospital(h),HttpStatus.OK);
    }
}
