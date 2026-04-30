package br.edu.fateclins.pweb.appVendas.controller;

import br.edu.fateclins.pweb.appVendas.dto.ProdutoDTO;
import br.edu.fateclins.pweb.appVendas.modelo.Produto;
import br.edu.fateclins.pweb.appVendas.repository.ProdutoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    ProdutoRepository repositorioProduto;

    @PostMapping
    public ResponseEntity<Produto> salvarProduto(@RequestBody ProdutoDTO prodDto){
        var produto = new Produto();
        BeanUtils.copyProperties(prodDto, produto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(repositorioProduto.save(produto));
    }

    @GetMapping
    public ResponseEntity<List<Produto>> getAllProdutos(){
        return ResponseEntity.status(HttpStatus.OK).body(repositorioProduto.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getProdutoPorId(@PathVariable(value="id") Integer id){
        Optional<Produto> produto = repositorioProduto.findById(id);
        if(produto.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Produto não encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(produto.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarProduto(@PathVariable(value="id") Integer id,
                                                   @RequestBody ProdutoDTO dto){
        Optional<Produto> produto = repositorioProduto.findById(id);
        if(produto.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Produto não encontrado");
        }
        BeanUtils.copyProperties(dto, produto.get());
        return ResponseEntity.status(HttpStatus.OK)
                .body(repositorioProduto.save(produto.get()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluirProduto(@PathVariable(value="id") Integer id){
        Optional<Produto> produto = repositorioProduto.findById(id);
        if(produto.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Produto não encontrado");
        }
        repositorioProduto.delete(produto.get());
        return ResponseEntity.status(HttpStatus.OK)
                .body("Produto removido com sucesso!");
    }

}
