package br.edu.fateclins.pweb.appVendas.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permite CORS para todos os endpoints da API
        registry.addMapping("/**")
                // Coloque aqui a URL exata do seu Apache local (ex: http://localhost)
                .allowedOrigins("http://localhost", "http://127.0.0.1")
                // Permite os métodos que seu CRUD utiliza
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // Permite todos os headers (importante para Content-Type: application/json)
                .allowedHeaders("*")
                // Permite o envio de cookies ou autenticação se necessário futuramente
                .allowCredentials(true);
    }
}