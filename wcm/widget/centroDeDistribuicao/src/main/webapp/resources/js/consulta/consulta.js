var hotC;

function consultaTabela(){
    

    console.log("ESTOU CONSULTANDO A TABELA :D ")
    myLoading2.show();
    var os = $("#NUM_OS_CONSULTA").val();
    var plano = $("#NUMPLANOCORTE_CONSULTA").val();
    console.log("Esses são meus filtros de consulta")
    console.log(os, plano)
    var a1, a2
    var constraints = new Array()
    if (!isNullOrEmptyOrUndefined(os)) {
               a1 = DatasetFactory.createConstraint("OS", os, os, ConstraintType.MUST);
               constraints.push(a1);
    }
    if (!isNullOrEmptyOrUndefined(plano)) {
            a2 = DatasetFactory.createConstraint("NUMPLANOCORTE", plano, plano, ConstraintType.MUST);
            constraints.push(a2);
    }
    
    var dataset = DatasetFactory.getDataset('dsConsultaTransacaoKits', null, constraints, null);
    var row = dataset.values
    console.log("Esses são os valores retornados:")
    console.log(row)

    if(row == null || row == undefined || row == ""){

        myLoading2.hide();
        // EXIBE ALERTA
        FLUIGC.toast({
          title: 'Sem retorno: ',
          message: 'Verifique filtros, busca não encontrada',
          type: 'danger'
        });
        return

    } else {
        try {
        let megaObjeto = transformaArrayEmObjeto(row);
        console.log(megaObjeto);
        var container = document.getElementById('tabelaConsulta');
        
        try {
            $('#tabelaConsulta').empty()
        } catch (e) {
            console.log("Não tenho tabela para apagar")
        }
        hotC = new Handsontable(container, {
            data: row,
            rowHeaders: false,
            colHeaders: [
                'Desenho', 
                'Sequência', 
                'Ordem', 
                'Quantidade',
                'Desc',
                'Dimensões',
                'OS', 
                'Plano',
                'Posição',
                'Atv',
                'Desc Atv',  
                'Entregue', 
                'Retirada' ,
                'Data Entregue', 
                'Data Saída'
            ],
            filters: true,
            dropdownMenu: true,
            rowHeaders: false,
            licenseKey: 'non-commercial-and-evaluation',
            stretchH: 'all', // Estica as colunas para preencher o contêiner horizontalmente
            width: '100%', // Define a largura da tabela como 100% do contêiner
            height: '300px', // Define a altura da tabela
            colWidths:[30, 150, 80, 80, 50, 150, 200, 50, 130, 80, 80, 80, 100, 100, 120, 120, 250, 180],
            hiddenColumns: {
                columns: [ 0, 4, 5, 8, 9, 10],
                indicators: true
            },
            columns: [
                {readOnly: true, data: "NUMDESENHO"},
                {readOnly: true, data: "SEQUENCIA"},
                {readOnly: true, data: "ORDEM"},
                {readOnly: true, data: "QUANTIDADE"},
                {readOnly: true, data: "DESCRICAO"},
                {readOnly: true, data: "DIMENSAO"},
                {readOnly: true, data: "OS"},
                {readOnly: true, data: "PLANOCORTE"},
                {readOnly: true, data: "POSICAO"},
                {readOnly: true, data: "ATIVIDADE"},
                {readOnly: true, data: "DSCATIVIDADE"},
                {readOnly: true, data: "NOMEENTREGUE"},
                {readOnly: true, data: "NOMERETIRADA"},
                {
                    readOnly: true, data: "DATAENTREGUE",
                    renderer: function(instance, td, row, col, prop, value, cellProperties) {
                        var parsedDate = moment(value, 'YYYY-MM-DD HH:mm:ss');
                        td.innerHTML = parsedDate.format('HH:mm:ss DD/MM/YYYY');
                        return td; 
                    }
                },
                {
                    readOnly: true, data: "DATARETIRADA",
                    renderer: function(instance, td, row, col, prop, value, cellProperties) {
                        var parsedDate = moment(value, 'YYYY-MM-DD HH:mm:ss');
                        td.innerHTML = parsedDate.format('HH:mm:ss DD/MM/YYYY');
                        return td; 
                    }
                }
              ],
              afterLoadData: function() {
                this.render();
              },
        });
        } catch (e) {
        console.log(e)
        }
        myLoading2.hide();
    }
    myLoading2.hide();
}

function limparConsultaPagina(){
    $('#tabelaConsulta').empty()
    $("#NUMPLANOCORTE_SAIDA").val()
    $('#NUM_OS_CONSULTA').val('')
    $('#NUMPLANOCORTE_CONSULTA').empty()
    MyWidget.limpaInput("#NUM_OS_CONSULTA");
    MyWidget.limpaInput("#NUMPLANOCORTE_CONSULTA");
}