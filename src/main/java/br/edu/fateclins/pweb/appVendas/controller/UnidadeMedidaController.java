package br.edu.fateclins.pweb.appVendas.controller;


import br.edu.fateclins.pweb.appVendas.dto.UnidadeMedidaDTO;
import br.edu.fateclins.pweb.appVendas.modelo.UnidadeMedida;

import br.edu.fateclins.pweb.appVendas.repository.UnidadeMedidaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/unidademedidas")

public class UnidadeMedidaController {

    @Autowired
    UnidadeMedidaRepository repositorioUnidadeMedida;

    @PostMapping
    public ResponseEntity<UnidadeMedida> salvarUnidadeMedida(@RequestBody UnidadeMedidaDTO undDto){
        var unidademedida = new UnidadeMedida();
        BeanUtils.copyProperties(undDto, unidademedida);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(repositorioUnidadeMedida.save(unidademedida));
    }

    @GetMapping
    public ResponseEntity<List<UnidadeMedida>> getAllUnidadeMedidas(){
        return ResponseEntity.status(HttpStatus.OK).body(repositorioUnidadeMedida.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUnidadeMedidaPorId(@PathVariable(value="id") Integer id){
        Optional<UnidadeMedida> unidadeMedida = repositorioUnidadeMedida.findById(id);
        if(unidadeMedida.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("UM não encontrada");
        }
        return ResponseEntity.status(HttpStatus.OK).body(unidadeMedida.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarUnidadeMedida(@PathVariable(value="id") Integer id,
                                                   @RequestBody UnidadeMedidaDTO dto){
        Optional<UnidadeMedida> unidadeMedida = repositorioUnidadeMedida.findById(id);
        if(unidadeMedida.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("UM não encontrada");
        }
        BeanUtils.copyProperties(dto, unidadeMedida.get());
        return ResponseEntity.status(HttpStatus.OK)
                .body(repositorioUnidadeMedida.save(unidadeMedida.get()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluirUnidadeMedida(@PathVariable(value="id") Integer id){
        Optional<UnidadeMedida> unidadeMedida = repositorioUnidadeMedida.findById(id);
        if(unidadeMedida.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("UM não encontrada");
        }
        repositorioUnidadeMedida.delete(unidadeMedida.get());
        return ResponseEntity.status(HttpStatus.OK)
                .body("UM removida com sucesso!");
    }

}
