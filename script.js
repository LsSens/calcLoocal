$(document).ready(function() {
    $('.money').mask('000.000.000.000.000,00', {reverse: true});
    $('.porcent').mask('##0,00', {reverse: true});
    $('input[name="variacao"]').change(toggleVariacaoInput);
    $('#selectOption').change(calcularEntradas);

    function toggleVariacaoInput() {
        $('#variacaoInputGroup').toggle($('#sim').is(':checked'));
    }

    function calcularKM() {
        var distanciaKM = $('#distanciaKM').val();
        var custoAtual = parseFloat($('#custoAtual').val().replace(/\./g, '').replace(',', '.'));
        var custoLoocal = parseFloat($('#custoLoocal').val().replace(/\./g, '').replace(',', '.'));

        var difKM = custoLoocal - custoAtual;

        $('#diferencaEntrega').val(difKM.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }

    function calcularEntradas() {
        var taxaMarketplace = parseFloat($('#taxaMarketplace').val().replace(',', '.'));
        var taxaFullservice = parseFloat($('#taxaFullservice').val().replace(',', '.'));
        var valorVariacao = parseFloat($('#valorVariacao').val().replace(/\./g, '').replace(',', '.'));
        var entregasMes = $('#entregasMes').val();
        if ($('#selectOption').val() == '2') {
            var ticketMedio = parseFloat($('#ticketMedio').val().replace(/\./g, '').replace(',', '.') / $('#entregasMes').val());
        } else {
            var ticketMedio = parseFloat($('#ticketMedio').val().replace(/\./g, '').replace(',', '.'));
        }
        // var faturamento = parseFloat($('#ticketMedio').val().replace(/\./g, '').replace(',', '.'));

        var diferencaComissionamento = taxaMarketplace - taxaFullservice;
        var economiaBruta = ticketMedio * entregasMes * (diferencaComissionamento / 100);
        var economiaLiquida = economiaBruta - valorVariacao * entregasMes;

        $('#diferencaComissionamento').val(diferencaComissionamento);
        $('#economiaBruta').val(economiaBruta.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        $('#economiaLiquida').val(economiaLiquida.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }

    $('.entradas').on('input', function(){
        calcularEntradas();
    });

    $('.km').on('input', function() {
        calcularKM();
    });

});