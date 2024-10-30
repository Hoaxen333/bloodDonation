package com.blood_donation.api.Models;

import org.springframework.stereotype.Component;

@Component
public class Message {
    
    private String mensagem;

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}
