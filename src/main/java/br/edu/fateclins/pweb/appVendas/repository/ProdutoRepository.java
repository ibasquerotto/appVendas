package br.edu.fateclins.pweb.appVendas.repository;

import br.edu.fateclins.pweb.appVendas.modelo.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
}
