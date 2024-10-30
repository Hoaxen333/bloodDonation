package com.blood_donation.api.Repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.blood_donation.api.Models.Doacao;
import com.blood_donation.api.Models.Doador;
import com.blood_donation.api.Models.Hospital;

import java.util.List;


@Repository
public interface DoacaoRepository extends CrudRepository<Doacao,Integer>{
    @SuppressWarnings("null")
    List<Doacao> findAll();
    Doacao findById(Long id);
    List<Doacao> findByDoador(Doador d);
    List<Doacao> findByHospital(Hospital h);
}
