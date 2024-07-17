$(document).ready(function() {
    $('#ticketMedio, #faturamentoDelivery, #valorAtual, #novoValor').mask('000.000.000.000.000,00', {reverse: true});
    $('#taxaMarketplace, #taxaFullservice, #diferencaComissao').mask('##0,00', {reverse: true});
    $('#phone').mask('(00) 00000-0000');

    function calcular() {
        var valorAtual = parseFloat($('#valorAtual').val().replace(/\./g, '').replace(',', '.'));
        var novoValor = parseFloat($('#novoValor').val().replace(/\./g, '').replace(',', '.'));
        var totalEntregas = parseFloat($('#entregasMes').val().replace(/\./g, '').replace(',', '.'));
        var ticketMedio = parseFloat($('#ticketMedio').val().replace(/\./g, '').replace(',', '.'));
        var faturamentoDelivery = parseFloat($('#faturamentoDelivery').val().replace(/\./g, '').replace(',', '.'));
        var taxaMarketplace = parseFloat($('#taxaMarketplace').val().replace(',', '.'));
        var taxaFullservice = parseFloat($('#taxaFullservice').val().replace(',', '.'));

        var variacaoMedia = novoValor - valorAtual;
        $('#variacaoMedia').val(variacaoMedia.toFixed(2).replace('.', ','));

        var faturamento = ticketMedio ? ticketMedio * totalEntregas : faturamentoDelivery;
        var diferencaComissao = (taxaFullservice - taxaMarketplace) / 100;
        $('#diferencaComissao').val(diferencaComissao.toFixed(2).replace('.', ','));

        var economiaBruta = faturamento * diferencaComissao;
        var economiaLiquida = economiaBruta - (variacaoMedia * totalEntregas);

        $('#economiaBruta').val(economiaBruta.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        $('#economiaLiquida').val(economiaLiquida.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }

    $('#calcularBtn').on('click', function() {
        $('#contactModal').modal('show');
    });

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var name = $('#name').val();
        var phone = $('#phone').val();
        var email = $('#email').val();

        // Simulating email sending (replace with your actual email sending logic)
        console.log('Enviando dados para leads@loocalapp.com:', { name, phone, email });

        $('#contactModal').modal('hide');
        calcular();
    });

    $('#valorAtual, #novoValor, #entregasMes, #ticketMedio, #faturamentoDelivery, #taxaMarketplace, #taxaFullservice').on('input', function() {
        calcular();
    });
});
