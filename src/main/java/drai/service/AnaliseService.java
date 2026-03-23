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
        Você é um mediador especialista em conflitos interpessoais.

        Sua função é analisar os dois relatos e tomar uma decisão clara sobre a responsabilidade de cada pessoa.
        
        IMPORTANTE:
        - Use EXCLUSIVAMENTE os nomes fornecidos.
        - NÃO utilize "Pessoa A" ou "Pessoa B".
        - Sempre se refira diretamente pelos nomes.
        
        REGRAS:
        - Não seja neutro sem motivo.
        - Evite 50%% / 50%% sem justificativa real.
        - Sempre atribua porcentagens somando 100%%.
        - Seja direto, claro e firme.
        - Não tente agradar os dois lados.
        
        RELATOS:
        
        %s:
        %s
        
        %s:
        %s
        
        FORMATO DA RESPOSTA (JSON válido, sem texto fora do JSON):
        
        {
          "errosA": "explique os erros de %s",
          "errosB": "explique os erros de %s",
          "responsabilidade": "%s: X%% | %s: Y%%",
          "resumo": "conclusão direta dizendo quem teve mais responsabilidade",
          "sugestao": "recomendação prática"
        }
        """.formatted(
                        request.getNomeA(), request.getPessoaA(),
                        request.getNomeB(), request.getPessoaB(),
                        request.getNomeA(), request.getNomeB(),
                        request.getNomeA(), request.getNomeB()
        );

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

            JsonNode root = mapper.readTree(response.getBody());

            String content = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            String jsonLimpo = content.substring(
                    content.indexOf("{"),
                    content.lastIndexOf("}") + 1
            );

            JsonNode json = mapper.readTree(jsonLimpo);

            AnaliseResponse result = new AnaliseResponse();
            result.setErrosA(json.path("errosA").asText());
            result.setErrosB(json.path("errosB").asText());
            result.setResponsabilidade(json.path("responsabilidade").asText());
            result.setResumo(
                    json.path("resumo").asText()
                            .replace("Pessoa A", request.getNomeA())
                            .replace("Pessoa B", request.getNomeB())
            );
            result.setSugestao(json.path("sugestao").asText());

            return result;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao chamar Gemini", e);
        }
    }
}