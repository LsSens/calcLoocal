$(document).ready(function() {
    $('.money').mask('000.000.000.000.000,00', {reverse: true});
    $('.porcent').mask('##0,00', {reverse: true});
    $('#userPhone').mask('(00) 0000-00009');
    $('#userPhone').blur(function() {
        var phone = $(this).val().replace(/\D/g, '');
        if (phone.length == 11) {
            $(this).mask('(00) 00000-0009');
        } else {
            $(this).mask('(00) 0000-00009');
        }
    });
    $('.km').on('input', calcularKM);
    $('#btn-calc').on('click', function() {
        $('#userModal').modal('show');
    });

    function calcularKM() {
        var custoAtual = parseFloat($('#custoAtual').val().replace(/\./g, '').replace(',', '.'));
        var custoLoocal = parseFloat($('#custoLoocal').val().replace(/\./g, '').replace(',', '.'));

        if (isNaN(custoAtual) || isNaN(custoLoocal)) {
            return;
        }

        var difKM = Math.abs(custoLoocal - custoAtual);

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

        if (isNaN(taxaMarketplace) || isNaN(taxaFullservice) || isNaN(valorVariacao) || isNaN(entregasMes) || isNaN(ticketMedio)) {
            return;
        }

        var diferencaComissionamento = Math.abs(taxaMarketplace - taxaFullservice);
        var economiaBruta = ticketMedio * entregasMes * (diferencaComissionamento / 100);
        var economiaLiquida = economiaBruta - valorVariacao * entregasMes;

        $('#diferencaComissionamento').val(diferencaComissionamento.toFixed(2));
        $('#economiaBruta').val(economiaBruta.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        $('#economiaLiquida').val(economiaLiquida.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }

    $('#addCard').on('click', function() {
        var distanciaKM = $('#distanciaKM').val();
        var custoAtual = $('#custoAtual').val();
        var custoLoocal = $('#custoLoocal').val();
        var diferencaEntrega = $('#diferencaEntrega').val();

        var cardExists = false;

        $('#cardsContainer .card').each(function() {
            var cardKM = $(this).find('.card-body p').first().text().split(': ')[1].split(' ')[0];
            if (cardKM === distanciaKM) {
                cardExists = true;
                $(this).addClass('highlight');
                setTimeout(() => {
                    $(this).removeClass('highlight');
                }, 2000);
            }
        });

        if (!cardExists) {
            var newCardCol = $('<div>').addClass('col-12 col-sm-6 col-md-4 mb-4');
            var newCard = $('<div>').addClass('card');

            var cardHeader = $('<h5>').addClass('card-header d-flex justify-content-between').text('Dados da entrega');
            var closeButton = $('<button>').addClass('btn btn-danger btn-sm close').text('X');

            var cardBody = $('<div>').addClass('card-body');

            var cardContent = `
                <p>Distancia: ${distanciaKM} KM, Custo Atual: R$ ${custoAtual}, Novo Custo: R$ ${custoLoocal}</p>
                <p>Diferença valor da entrega: R$ ${diferencaEntrega}</p>
            `;

            cardHeader.append(closeButton);
            cardBody.html(cardContent);
            newCard.append(cardHeader).append(cardBody);
            newCardCol.append(newCard);
            $('#cardsContainer').append(newCardCol);

            sortCards();

            $('#distanciaKM').val(1);
            $('#custoAtual').val(0);
            $('#custoLoocal').val(0);
            $('#diferencaEntrega').val(0);
        }
    });

    function sortCards() {
        var cards = $('#cardsContainer .col-12');
        cards.sort(function(a, b) {
            var kmA = parseInt($(a).find('.card-body p').first().text().split(': ')[1].split(' ')[0]);
            var kmB = parseInt($(b).find('.card-body p').first().text().split(': ')[1].split(' ')[0]);
            return kmA - kmB;
        });
        $('#cardsContainer').html(cards);
        $('.close').on('click', function() {
            $(this).closest('.col-12').remove();
        });
    }

    $('#userInfoForm').on('submit', function(e) {
        e.preventDefault();
        $('#userModal').modal('hide');
        calcularEntradas();
        $('#resulModal').modal('show');
    });

});
