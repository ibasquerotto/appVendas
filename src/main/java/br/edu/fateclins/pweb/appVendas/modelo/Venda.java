package br.edu.fateclins.pweb.appVendas.modelo;
import jakarta.persistence.*;
import org.hibernate.annotations.TenantId;

import java.io.Serializable;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
@Entity
public class Venda implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataVenda;
    @Column(nullable = false, unique = true, length = 10)
    private String notaFiscal;
    @ManyToOne
    @JoinColumn(name="idCliente")
    // Associação: 1 Venda pertence a 1 Cliente
    private Cliente cliente;
    // Composição: 1 Venda contém 1 ou mais ItensVendidos (1..*)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true,
               mappedBy = "venda")
    private List<ItensVendidos> listaItens = new ArrayList<>();

    public Venda(Cliente cliente) {
        this.cliente = cliente;
    }

    public Venda() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDataVenda() {
        return dataVenda;
    }

    public void setDataVenda(Date dataVenda) {
        this.dataVenda = dataVenda;
    }

    public String getNotaFiscal() {
        return notaFiscal;
    }

    public void setNotaFiscal(String notaFiscal) {
        this.notaFiscal = notaFiscal;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<ItensVendidos> getListaItens() {
        return listaItens;
    }

    public void setListaItens(List<ItensVendidos> listaItens) {
        this.listaItens = listaItens;
    }
}