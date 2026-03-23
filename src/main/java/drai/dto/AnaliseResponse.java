package drai.dto;

public class AnaliseResponse {

    private String errosA;
    private String errosB;
    private String responsabilidade;
    private String resumo;
    private String sugestao;

    public String getErrosA() {
        return errosA;
    }

    public void setErrosA(String errosA) {
        this.errosA = errosA;
    }

    public String getErrosB() {
        return errosB;
    }

    public void setErrosB(String errosB) {
        this.errosB = errosB;
    }

    public String getResponsabilidade() {
        return responsabilidade;
    }

    public void setResponsabilidade(String responsabilidade) {
        this.responsabilidade = responsabilidade;
    }

    public String getResumo() {
        return resumo;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    public String getSugestao() {
        return sugestao;
    }

    public void setSugestao(String sugestao) {
        this.sugestao = sugestao;
    }
}
