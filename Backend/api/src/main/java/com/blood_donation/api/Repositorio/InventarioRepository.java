package com.blood_donation.api.Repositorio;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.blood_donation.api.Models.Inventario;
import java.util.List;


public interface InventarioRepository extends CrudRepository<Inventario,Integer>{

    Inventario findById(int id);
    
    @SuppressWarnings("null")
    @Query(value="SELECT * FROM hospital INNER JOIN inventarion ON hospital.id=hospital_id",nativeQuery = true)
    List<Inventario> findAll();

    @Query(value = "SELECT * FROM hospital INNER JOIN inventario ON hospital.id = inventario.hospital_id WHERE hospital.nome LIKE :nomeH", nativeQuery = true)
    List<Inventario> findByNomeHospital(@Param("nomeH") String nomeH);

    
    @Query(value = "SELECT * FROM hospital INNER JOIN inventario ON hospital.id = inventario.hospital_id WHERE hospital.nome = :nomeH", nativeQuery = true)
    Inventario findByNomeHospitalD(@Param("nomeH") String nomeH);

    @Query(value="SELECT * FROM hospital INNER JOIN inventarion ON hospital.id=hospital_id ORDER BY A_mais DESC",nativeQuery = true)
    List<Inventario> findA_mais();

    @Query(value="SELECT * FROM hospital INNER JOIN inventarion ON hospital.id=hospital_id ORDER BY A_menos DESC",nativeQuery = true)
    List<Inventario> findA_menos();
    
    @Query(value="SELECT * FROM hospital INNER JOIN inventarion ON hospital.id=hospital_id ORDER BY B_mais DESC",nativeQuery = true)
    List<Inventario> findB_mais();

    @Query(value="SELECT * FROM hospital INNER JOIN inventarion ON hospital.id=hospital_id ORDER BY B_menos DESC",nativeQuery = true)
    List<Inventario> findB_menos();

    @Query(value="SELECT * FROM hospital INNER JOIN inventarion ON hospital.id=hospital_id ORDER BY AB_mais DESC",nativeQuery = true)
    List<Inventario> findAB_mais();

    @Query(value="SELECT * FROM hospital INNER JOIN inventarion ON hospital.id=hospital_id ORDER BY AB_menos DESC",nativeQuery = true)
    List<Inventario> findAB_menos();

    @Query(value="SELECT * FROM hospital INNER JOIN inventarion ON hospital.id=hospital_id ORDER BY O_mais DESC",nativeQuery = true)
    List<Inventario> findO_mais();

    @Query(value="SELECT * FROM hospital INNER JOIN inventarion ON hospital.id=hospital_id ORDER BY O_menos DESC",nativeQuery = true)
    List<Inventario> findO_menos();
}