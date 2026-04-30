package br.edu.fateclins.pweb.appVendas.modelo;


import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="UnidadeMedida")
public class UnidadeMedida implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 60)
    private String descricao;

    @Column(nullable = false, length = 2)
    private String sigla;

    public UnidadeMedida() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }


    @Override
    public boolean equals(Object o) {
        if (!(o instanceof UnidadeMedida that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(descricao, that.descricao) && Objects.equals(sigla, that.sigla);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descricao, sigla);
    }
}
