package br.com.fiap.orbiteye.service;

import br.com.fiap.orbiteye.client.ClimaClient;
import br.com.fiap.orbiteye.dto.AnaliseRiscoResponse;
import br.com.fiap.orbiteye.dto.ClimaResponse;
import br.com.fiap.orbiteye.entity.Regiao;
import br.com.fiap.orbiteye.repository.RegiaoRepository;
import org.springframework.stereotype.Service;

/*
 * Service com regra de negócio real.
 *
 * Ele busca uma região no Oracle, consulta dados climáticos via Feign,
 * calcula o nível de risco climático e envia uma mensagem para a fila
 * quando o risco for crítico.
 */
@Service
public class AnaliseRiscoService {

    private final RegiaoRepository regiaoRepository;
    private final ClimaClient climaClient;
    private final MensagemService mensagemService;

    /*
     * Injeção de dependências:
     * - RegiaoRepository acessa a tabela TB_REGIAO no Oracle.
     * - ClimaClient consome dados climáticos via Feign.
     * - MensagemService envia mensagens para a fila de alertas.
     */
    public AnaliseRiscoService(
            RegiaoRepository regiaoRepository,
            ClimaClient climaClient,
            MensagemService mensagemService
    ) {
        this.regiaoRepository = regiaoRepository;
        this.climaClient = climaClient;
        this.mensagemService = mensagemService;
    }

    /*
     * Método principal da regra de negócio.
     * Recebe o ID da região, busca a região no banco, consulta o clima
     * e calcula o nível de risco.
     */
    public AnaliseRiscoResponse analisar(Long idRegiao) {

        // Busca a região no Oracle.
        Regiao regiao = regiaoRepository.findById(idRegiao)
                .orElseThrow(() -> new RuntimeException("Região não encontrada"));

        // Consulta dados climáticos usando Feign Client.
        ClimaResponse clima = climaClient.buscarClimaAtual();

        String nivelRisco;
        String recomendacao;

        /*
         * Regra de negócio:
         * chuva >= 120 e umidade >= 85 representam risco crítico.
         */
        if (clima.getChuva() >= 120 && clima.getUmidade() >= 85) {

            nivelRisco = "CRITICO";
            recomendacao = "Emitir alerta imediato para a população e acionar a defesa civil.";

            /*
             * Mensageria:
             * Quando o risco é crítico, uma mensagem é enviada para a fila.
             */
            mensagemService.enviarAlerta(
                    "ALERTA CRITICO EM " + regiao.getNmRegiao()
            );

        } else if (clima.getChuva() >= 80) {

            nivelRisco = "ALTO";
            recomendacao = "Monitorar áreas de risco e preparar equipes de emergência.";

        } else if (clima.getChuva() >= 40) {

            nivelRisco = "MEDIO";
            recomendacao = "Manter acompanhamento preventivo da região.";

        } else {

            nivelRisco = "BAIXO";
            recomendacao = "Condição estável no momento.";
        }

        /*
         * Retorna o resultado final da análise para a API.
         */
        return new AnaliseRiscoResponse(
                regiao.getNmRegiao(),
                clima.getTemperatura(),
                clima.getChuva(),
                clima.getUmidade(),
                nivelRisco,
                recomendacao
        );
    }
}