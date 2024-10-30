package com.blood_donation.api.Repositorio;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.blood_donation.api.Models.Hospital;
import java.util.List;


public interface HospitalRepository extends CrudRepository<Hospital,Integer>{
    @SuppressWarnings("null")
    List<Hospital> findAll();
    Hospital findById(int id);

    @Query(value="SELECT id FROM Hospital WHERE nome = :nome")
    Integer findIdHospitalByNome(String nome);

    Hospital findByContacto(String contacto);
    List<Hospital> findByContactoContaining(String contacto);
    Hospital findByNome(String nome);
    List<Hospital> findByNomeContaining(String nome);
    List<Hospital> findByLocalizacao(String localizacao);
    List<Hospital> findByLocalizacaoContaining(String localizacao);
}
