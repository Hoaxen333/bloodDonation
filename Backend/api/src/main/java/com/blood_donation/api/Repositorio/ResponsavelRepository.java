package com.blood_donation.api.Repositorio;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.blood_donation.api.Models.Hospital;
import com.blood_donation.api.Models.Responsavel;
import java.util.List;

public interface ResponsavelRepository extends CrudRepository<Responsavel,Integer>{

    @SuppressWarnings("null")
    List<Responsavel> findAll();
    Responsavel findById(int id);
    List<Responsavel> findByHospital(Hospital hospital);
    Responsavel findByUsernameContaining(String username);

    @Query(value="SELECT id FROM Responsavel WHERE username = :username")
    Integer findIdByUsername(String username);

    

    @Query("SELECT r FROM Responsavel r WHERE r.username = :username AND r.password = :password")
    Responsavel login(@Param("username") String username, @Param("password") String password);


    List<Responsavel> findByNomeContaining(String nome);
    List<Responsavel> findByApelidoContaining(String apelido);
    default boolean usernameExists(String username) {
        return findIdByUsername(username) != null;
    }
}
