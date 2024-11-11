package com.blood_donation.api.Models;
import java.util.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Doacao {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Date dataHoraDoacao;

    @ManyToOne
    @JoinColumn(name = "doador_id")
    private Doador doador;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDataHoraDoacao() {
        return dataHoraDoacao;
    }

    public void setDataHoraDoacao(Date dataHoraDoacao) {
        this.dataHoraDoacao = dataHoraDoacao;
    }

    public Doador getDoador() {
        return doador;
    }

    public void setDoador(Doador doador) {
        this.doador = doador;
    }

    public Hospital getHospital() {
        return hospital;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }

}
