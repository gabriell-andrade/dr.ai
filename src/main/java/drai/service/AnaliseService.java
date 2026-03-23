package drai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import drai.dto.AnaliseRequest;
import drai.dto.AnaliseResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AnaliseService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final String URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

    public AnaliseResponse analisar(AnaliseRequest request) {

        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper mapper = new ObjectMapper();

        String prompt = """
        Analise a seguinte discussão de casal.

        Pessoa A:
        %s

        Pessoa B:
        %s

        Responda APENAS em JSON válido:

        {
          "errosA": "...",
          "errosB": "...",
          "responsabilidade": "...",
          "resumo": "...",
          "sugestao": "..."
        }

        Seja imparcial e construtivo.
        """.formatted(request.getPessoaA(), request.getPessoaB());

        String body = """
        {
          "contents": [
            {
              "parts": [
                {
                  "text": "%s"
                }
              ]
            }
          ]
        }
        """.formatted(prompt.replace("\"", "\\\"").replace("\n", "\\n"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        try {
            String fullUrl = URL + "?key=" + apiKey;

            ResponseEntity<String> response = restTemplate.exchange(
                    fullUrl,
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            System.out.println("RESPONSE BODY:");
            System.out.println(response.getBody());

            JsonNode root = mapper.readTree(response.getBody());

            String content = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            System.out.println("CONTENT:");
            System.out.println(content);

            // limpa JSON (caso venha texto junto)
            String jsonLimpo = content.substring(
                    content.indexOf("{"),
                    content.lastIndexOf("}") + 1
            );
            System.out.println("JSON LIMPO:");
            System.out.println(jsonLimpo);

            JsonNode json = mapper.readTree(jsonLimpo);

            AnaliseResponse result = new AnaliseResponse();
            result.setErrosA(json.path("errosA").asText());
            result.setErrosB(json.path("errosB").asText());
            result.setResponsabilidade(json.path("responsabilidade").asText());
            result.setResumo(json.path("resumo").asText());
            result.setSugestao(json.path("sugestao").asText());

            return result;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao chamar Gemini", e);
        }
    }
}