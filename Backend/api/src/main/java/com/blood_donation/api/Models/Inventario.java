package com.blood_donation.api.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Inventario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int A_mais;
    private int A_menos;
    private int B_mais;
    private int B_menos;
    private int AB_mais;
    private int AB_menos;
    private int O_mais;
    private int O_menos;

    public void prePersist() {
        if (A_mais == 0) {
            A_mais = 0; 
        }
        if (A_menos == 0) {
            A_menos = 0; 
        }
        if (AB_mais == 0) {
            AB_mais = 0; 
        }
        if (AB_menos == 0) {
            AB_menos = 0; 
        }
        if (B_mais == 0) {
            B_mais = 0; 
        }
        if (B_menos == 0) {
            B_menos = 0; 
        }
        if (O_mais == 0) {
            O_mais = 0; 
        }
        if (O_menos == 0) {
            O_menos = 0; 
        }
    }

    @OneToOne(optional = false)
    @JoinColumn(name = "hospital_id",unique = true)
    private Hospital hospital;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Hospital getHospital() {
        return hospital;
    }
    
    public int getA_mais() {
        return A_mais;
    }

    public void setA_mais(int a_mais) {
        A_mais = a_mais;
    }

    public int getA_menos() {
        return A_menos;
    }

    public void setA_menos(int a_menos) {
        A_menos = a_menos;
    }

    public int getB_mais() {
        return B_mais;
    }

    public void setB_mais(int b_mais) {
        B_mais = b_mais;
    }

    public int getB_menos() {
        return B_menos;
    }

    public void setB_menos(int b_menos) {
        B_menos = b_menos;
    }

    public int getAB_mais() {
        return AB_mais;
    }

    public void setAB_mais(int aB_mais) {
        AB_mais = aB_mais;
    }

    public int getAB_menos() {
        return AB_menos;
    }

    public void setAB_menos(int aB_menos) {
        AB_menos = aB_menos;
    }

    public int getO_mais() {
        return O_mais;
    }

    public void setO_mais(int o_mais) {
        O_mais = o_mais;
    }

    public int getO_menos() {
        return O_menos;
    }

    public void setO_menos(int o_menos) {
        O_menos = o_menos;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }
}
