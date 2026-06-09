package br.com.fiap.orbiteye.dto;

/*
 * DTO retornado pela funcionalidade real de análise de risco.
 */
public class AnaliseRiscoResponse {

    private String regiao;
    private Double temperatura;
    private Double chuva;
    private Double umidade;
    private String nivelRisco;
    private String recomendacao;

    public AnaliseRiscoResponse(
            String regiao,
            Double temperatura,
            Double chuva,
            Double umidade,
            String nivelRisco,
            String recomendacao
    ) {
        this.regiao = regiao;
        this.temperatura = temperatura;
        this.chuva = chuva;
        this.umidade = umidade;
        this.nivelRisco = nivelRisco;
        this.recomendacao = recomendacao;
    }

    public String getRegiao() {
        return regiao;
    }

    public Double getTemperatura() {
        return temperatura;
    }

    public Double getChuva() {
        return chuva;
    }

    public Double getUmidade() {
        return umidade;
    }

    public String getNivelRisco() {
        return nivelRisco;
    }

    public String getRecomendacao() {
        return recomendacao;
    }
}