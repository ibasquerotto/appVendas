package br.edu.fateclins.pweb.appVendas.modelo;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;
@Entity
public class PessoaFisica extends Cliente {
    private String cpf;
    private String rg;
    @Column(length = 1)
    private String sexo;
    @Temporal(TemporalType.DATE)
    private Date dataNascimento;

    public PessoaFisica() {
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
}