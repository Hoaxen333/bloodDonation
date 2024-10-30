package com.blood_donation.api.Repositorio;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.blood_donation.api.Models.Doador;

import java.util.List;
import java.util.Date;

@Repository
public interface DoadorRepository extends CrudRepository<Doador,Integer>{
    @SuppressWarnings("null")
    List<Doador> findAll();
    Doador findById(int id);
    Doador findByBi(String bi);
    List<Doador> findByNacionalidade(String nacionalidade);
    List<Doador> findByTipoSanguineo(String tipoSanguineo);
    List<Doador> findByPeso(double peso);
    List<Doador> findByDisponibilidade(Boolean disponibilidade);
    List<Doador> findByDataNascimento(Date dataNascimento);
    List<Doador> findByNomeContaining(String termo);
}

