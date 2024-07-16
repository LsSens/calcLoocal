$(document).ready(function() {
    $('#custoAtual1, #custoEntregaLocal1, #custoAtual2, #custoEntregaLocal2, #custoAtual3, #custoEntregaLocal3, #custoAtual4, #custoEntregaLocal4, #custoAtual5, #custoEntregaLocal5, #custoAtual6, #custoEntregaLocal6, #custoAtual7, #custoEntregaLocal7').mask('000.000.000.000.000,00', {reverse: true});
    $('#ticketMedio').mask('000.000.000.000.000,00', {reverse: true});
    $('#reducaoComissao').mask('##0,00', {reverse: true});
    
    function calcular() {
        var ticketMedio = parseFloat($('#ticketMedio').val().replace(/\./g, '').replace(',', '.'));
        var reducaoComissao = parseFloat($('#reducaoComissao').val().replace(',', '.'));
        var totalEntregas = parseFloat($('#totalEntregas').val().replace(/\./g, '').replace(',', '.'));
        var variacaoMedia = parseFloat($('#variacaoMedia').val().replace(',', '.'));

        if (isNaN(ticketMedio) || isNaN(reducaoComissao) || isNaN(totalEntregas) || isNaN(variacaoMedia)) {
            return;
        }
        
        var faturamento = ticketMedio * totalEntregas;
        var economiaBruta = faturamento * (reducaoComissao / 100);
        var economiaLiquida = economiaBruta - (variacaoMedia * totalEntregas);
        var porcentagemGanho = (economiaLiquida * 100) / faturamento;
        
        $('#faturamento').val(faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        $('#economiaBruta').val(economiaBruta.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        $('#economiaLiquida').val(economiaLiquida.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        $('#porcentagemGanho').val(porcentagemGanho.toFixed(2).replace('.', ','));
    }

    function calcularDiferencaCusto() {
        for (var i = 1; i <= 7; i++) {
            var custoAtual = parseFloat($('#custoAtual' + i).val().replace(/\./g, '').replace(',', '.'));
            var custoEntregaLocal = parseFloat($('#custoEntregaLocal' + i).val().replace(/\./g, '').replace(',', '.'));

            if (isNaN(custoAtual) || isNaN(custoEntregaLocal)) {
                $('#diferencaCusto' + i).val('0,00');
                continue;
            }

            var diferenca = custoEntregaLocal - custoAtual;
            $('#diferencaCusto' + i).val(diferenca.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }
    }

    calcular();
    calcularDiferencaCusto();

    $('#ticketMedio, #reducaoComissao, #totalEntregas, #variacaoMedia').on('input', function() {
        calcular();
    });

    $('#custoAtual1, #custoEntregaLocal1, #custoAtual2, #custoEntregaLocal2, #custoAtual3, #custoEntregaLocal3, #custoAtual4, #custoEntregaLocal4, #custoAtual5, #custoEntregaLocal5, #custoAtual6, #custoEntregaLocal6, #custoAtual7, #custoEntregaLocal7').on('input', function() {
        calcularDiferencaCusto();
    });
});