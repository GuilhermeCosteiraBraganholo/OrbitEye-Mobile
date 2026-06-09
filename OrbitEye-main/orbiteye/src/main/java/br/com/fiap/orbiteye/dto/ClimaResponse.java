package br.com.fiap.orbiteye.dto;

/*
 * DTO que simula o retorno de uma API externa de clima.
 */
public class ClimaResponse {

    private String cidade;
    private Double temperatura;
    private Double chuva;
    private Double umidade;

    public ClimaResponse() {
    }

    public ClimaResponse(String cidade, Double temperatura, Double chuva, Double umidade) {
        this.cidade = cidade;
        this.temperatura = temperatura;
        this.chuva = chuva;
        this.umidade = umidade;
    }

    public String getCidade() {
        return cidade;
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
}