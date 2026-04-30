package br.edu.fateclins.pweb.appVendas.modelo;

import jakarta.persistence.*;

import java.io.Serializable;
@Entity
public class ItensVendidos implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 5, nullable = false)
    private int quantidade;
    @Column(length = 10, precision = 2)
    private double precoUnitario;

    // Associação: Cada item refere-se a 1 Produto
    @ManyToOne
    @JoinColumn(name = "idProduto")
    private Produto produto;
    // Associação: Cada item refere-se a 1 Venda
    @ManyToOne
    @JoinColumn(name = "idVenda")
    private Venda venda;

    public ItensVendidos(Produto produto, int quantidade, double precoUnitario) {
        this.produto = produto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }

    public ItensVendidos() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Venda getVenda() {
        return venda;
    }

    public void setVenda(Venda venda) {
        this.venda = venda;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public double getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(double precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}