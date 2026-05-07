package br.edu.fateclins.pweb.appVendas.repository;

import br.edu.fateclins.pweb.appVendas.modelo.UnidadeMedida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UnidadeMedidaRepository extends JpaRepository<UnidadeMedida, Integer> {
}
