package drai.service;

import drai.dto.AnaliseRequest;
import drai.dto.AnaliseResponse;
import org.springframework.stereotype.Service;

@Service
public class AnaliseService {

    public AnaliseResponse analisar(AnaliseRequest request) {

        AnaliseResponse response = new AnaliseResponse();

        response.setErrosA("Possível tom agressivo e generalizações.");
        response.setErrosB("Falta de clareza e evitou confronto direto.");
        response.setResponsabilidade("Pessoa A: 60% | Pessoa B: 40%");
        response.setResumo("Falha de comunicação e expectativas desalinhadas.");
        response.setSugestao("Tente expressar sentimentos sem acusar e ouvir o outro lado.");

        return response;
    }
}
