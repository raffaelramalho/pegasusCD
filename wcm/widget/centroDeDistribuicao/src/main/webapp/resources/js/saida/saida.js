var hotS;
var oldValues = [];
var isUserChange = true;
var valoresParaImprimir = []
const result = {};
var tamanhoTabela = ''



function preencheTabelaSaida(){
    $("#opcoesExtra2").addClass("ninjaOculto");
    
    console.log("Montando a tabela Saida ")
    myLoading2.show();
    var os = $("#NUM_OS_SAIDA").val();
    var plano = $("#NUMPLANOCORTE_SAIDA").val();
    console.log("Esses são meus filtros de SAIDA")
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
    var dataset = DatasetFactory.getDataset('dsConsultaKitsCD', null, constraints, null);
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
        var semDuplicatas = removeDuplicatas(row, 'SEQUENCIA');
            console.log(semDuplicatas)
        var container = document.getElementById('tabelaSaida');
            tamanhoTabela = semDuplicatas.length
            console.log("Tamanho da tabela: "+tamanhoTabela)
        try {
            $('#tabelaSaida').empty()
        } catch (e) {
            console.log("Não tenho tabela para apagar")
        }
        $("#opcoesExtra2").removeClass("ninjaOculto");
        hotS = new Handsontable(container, {
            data: semDuplicatas,
            rowHeaders: true,
            colHeaders: ['','Desenho', 'Seq', 'Ordem','Qtd','OS',  'Dimensões', 'Desc',  'Plano', 'Posição', 'Atv', 'Desc Atv', 'Entregue', 'Retirada' ,'Data Entregue', 'Data Saída','Próximos','FornPara'],
            filters: true,
            dropdownMenu: [
                "filter_by_condition",
                "filter_by_condition2",
                "filter_operators",
                "filter_by_value",
                "filter_action_bar",
              ],
            rowHeaders: false,
            licenseKey: 'non-commercial-and-evaluation',
            stretchH: 'all', // Estica as colunas para preencher o contêiner horizontalmente
            width: '100%', // Define a largura da tabela como 100% do contêiner
            height: '300px', // Define a altura da tabela
            colWidths:[30, 150, 80, 80, 50, 150, 200, 50, 130, 80, 80, 80, 100, 100, 120, 120, 250, 180],
            hiddenColumns: {
                columns: [10, 11, 12, 13, 15,],
                indicators: true
            },
            beforeChange: function(changes, source) {
                if (source === 'edit') {
                    for (var i = 0; i < changes.length; i++) {
                        var change = changes[i];
                        var row = change[0];
                        var prop = change[1];
                        var oldValue = change[2];
                        var newValue = change[3];
            
                        var checkboxValue = this.getDataAtCell(row, 0);
            
                    
                        if (prop === 'QUANTIDADE' && (newValue === 0 || newValue === '') && checkboxValue) {
                            chamaAlerta('Erro', 'error', 'Não é possível colocar 0 como quantidade quando a checkbox está marcada.');
                            return false; 
                        }
            
                        if (prop !== 'CHECKBOX' && !checkboxValue) {
                            chamaAlerta('Erro', 'error', 'Você precisa marcar a checkbox para editar a linha.');
                            return false; 
                        }
                    }
                }
                return true; 
            },
            afterChange: function(changes, source) {
                if (source === 'edit') {
                    for (var i = 0; i < changes.length; i++) {
                        var change = changes[i];
                        var row = change[0];
                        var prop = change[1];
                        var oldValue = change[2];
                        var newValue = change[3];
            
                        if (prop === 'QUANTIDADE' && newValue > oldValue) {
                            this.setDataAtRowProp(row, prop, oldValue);
                        }
                    }
                }
            },
            columns: [
                {   
                    data: "CHECKBOX",
                    type: 'checkbox',
                    title: '',
                    className: 'htCenter'
                },
                {readOnly: true, data: "NUMDESENHO"},
                {readOnly: true, data: "SEQUENCIA"},
                {readOnly: true, data: "ORDEM"},
                {
                    readOnly: false, 
                    data: "QUANTIDADE",
                    type: 'numeric',
                    
                },
                {readOnly: true, data: "OS"},
                {readOnly: true, data: "DIMENSOES"},
                {readOnly: true, data: "DESCRICAO"}, 
                {readOnly: true, data: "PLANOCORTE"},
                {readOnly: true, data: "POSICAO"},
                {readOnly: true, data: "ATIVIDADE"},
                {readOnly: true, data: "DSCATIVIDADE"},
                {readOnly: true, data: "NOMEENTREGUE"},
                {readOnly: true, data: "NOMERETIRADA"},
                {readOnly: true, data: "DATAENTREGUE",
                        renderer: function(instance, td, row, col, prop, value, cellProperties) {
                            var parsedDate = moment(value, 'YYYY-MM-DD HH:mm:ss');
                            td.innerHTML = parsedDate.format('HH:mm:ss DD/MM/YYYY');
                            return td; 
                        }
                    },
                {readOnly: true, data: "DATARETIRADA",
                    renderer: function(instance, td, row, col, prop, value, cellProperties) {
                        var parsedDate = moment(value, 'YYYY-MM-DD HH:mm:ss');
                        td.innerHTML = parsedDate.format('HH:mm:ss DD/MM/YYYY');
                        return td; 
                    }
                },
                    {
                        readOnly: true, 
                        data: "DESCATIVIDADES",
                        renderer: function(instance, td, row, col, prop, value, cellProperties) {
                            Handsontable.renderers.TextRenderer.apply(this, arguments);
                            td.style.whiteSpace = 'normal'; // Quebra de texto
                            td.style.wordWrap = 'break-word'; // Quebra de texto
                            return td;
                        }
                    },
                    {readOnly: true, data: "FORNPARA"},
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

function limparSaidaPagina(){
    $('#tabelaSaida').empty()
    $('#NUM_OS_SAIDA').val('')
    $('#NUMPLANOCORTE_SAIDA').val('')
    $("#opcoesExtra2").addClass("ninjaOculto");
    $('#saidaRecebido').val('')
    $('#saidaEntregue').val('')
    MyWidget.limpaInput("#NUM_OS_SAIDA");
    MyWidget.limpaInput("#NUMPLANOCORTE_SAIDA");
    valoresParaImprimir = []
}


function isAnyCheckboxChecked() {
    // Obtém os dados da tabela
    var data = hotS.getData();
    
    // Percorre os dados para verificar se alguma checkbox está marcada
    for (var i = 0; i <= tamanhoTabela; i++) {
        var checkboxValue = data[i][0]; // A coluna 0 é a coluna "CHECKBOX"
        if (checkboxValue) {
            return true; // Retorna true se encontrar uma checkbox marcada
        }
    }
    
    return false; // Retorna false se nenhuma checkbox estiver marcada
}

function registrarSaida(){

    //Fazendo a matriz da tabela
    var tabela = ''
    tabela = hotS.getData()
    var tamanho = tabela.length-1
    var recebido = $('#saidaRecebido').val()
    var entregue = $('#saidaEntregue').val()

    if( !isAnyCheckboxChecked()){
        chamaAlerta('Atenção','warning',"Nenhuma linha foi marcada!")
        return
    }

    if(isNullOrEmptyOrUndefined(recebido)||isNullOrEmptyOrUndefined(entregue)){
        chamaAlerta('Atenção','warning',"Os campos Entregue e Recebido devem estar preenchidos")
        return
    }
    for(let i=0; i<= tamanho;i++){
        var linha = tabela[i]
        if(linha[0] == null){
            console.log("Não marcou :D")
        }else {
            var quantidades = linha[4] 
            if (quantidades == 0){
                console.log("Quantidade zerada")
                chamaAlerta('Atenção','error','A quantidade não pode ser 0')
                myLoading2.hide()
                break
            }
        }
    }
    for(let i=0; i<= tamanho;i++){
        myLoading2.show()
        var linha = tabela[i]
        console.log(linha)
        if(linha[0] == null){
            console.log("Não marcou :D")
        }else {
            var desenhos = linha[1]
            var sequencias = linha[2]
            var ordem = linha[3]
            var quantidades = linha[4]
            var dimensao  = linha[6]
            console.log("Minha quantidade é : "+quantidades)
            if (quantidades == 0){
                chamaAlerta('Atenção','error','A quantidade não pode ser 0')
                return
            }
            var planos = linha[8]
            var retirada = $('#saidaRecebido').val()
            var entregue = $('#saidaEntregue').val()
            if(isNullOrEmptyOrUndefined(retirada) || isNullOrEmptyOrUndefined(entregue) ){
                chamaAlerta('Atenção','error','A coluna de Retirada não pode estar vazia')
                return
            }
            var dtReti = dataAtualFormatoSQL()
            var dtEntre = linha[14]
            var proximo = linha[16]
            var forn = linha[17]
            var os =  $('#NUM_OS_SAIDA').val()
            var a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11
            var constraints = new Array()
            if (!isNullOrEmptyOrUndefined(os)) {
                a1 = DatasetFactory.createConstraint("OS", os, os, ConstraintType.MUST);
                constraints.push(a1);
            }
            if (!isNullOrEmptyOrUndefined(planos)) {
                a2 = DatasetFactory.createConstraint("NUMPLANOCORTE", planos, planos, ConstraintType.MUST);
                constraints.push(a2);
            }
            if (!isNullOrEmptyOrUndefined(desenhos)) {
                a3 = DatasetFactory.createConstraint("NUMDESENHO", desenhos, desenhos, ConstraintType.MUST);
                constraints.push(a3);
            }
            if (!isNullOrEmptyOrUndefined(sequencias)) {
                a4 = DatasetFactory.createConstraint("SEQUENCIA", sequencias, sequencias, ConstraintType.MUST);
                constraints.push(a4);
            }
            if (!isNullOrEmptyOrUndefined(quantidades)) {
                a5 = DatasetFactory.createConstraint("QUANTIDADE", quantidades, quantidades, ConstraintType.MUST);
                constraints.push(a5);
            }
            if (!isNullOrEmptyOrUndefined(dtReti)) {
                a6 = DatasetFactory.createConstraint("DATARETIRADA", dtReti, dtReti, ConstraintType.MUST);
                constraints.push(a6);
            }
            if (!isNullOrEmptyOrUndefined(dtEntre)) {
                a7 = DatasetFactory.createConstraint("DATAENTREGUE", dtEntre, dtEntre, ConstraintType.MUST);
                constraints.push(a7);
            }
            if (!isNullOrEmptyOrUndefined(retirada)) {
                a8 = DatasetFactory.createConstraint("RECEBIDO", retirada, retirada, ConstraintType.MUST);
                constraints.push(a8);
            }
            if (!isNullOrEmptyOrUndefined(entregue)) {
                a9 = DatasetFactory.createConstraint("ENTREGUE", entregue, entregue, ConstraintType.MUST);
                constraints.push(a9);
            }
            if (!isNullOrEmptyOrUndefined(ordem)) {
                a10 = DatasetFactory.createConstraint("ORDEM", ordem, ordem, ConstraintType.MUST);
                constraints.push(a10);
            }
            if (!isNullOrEmptyOrUndefined(dimensao)) {
                a11 = DatasetFactory.createConstraint("DIMENSAO", dimensao, dimensao, ConstraintType.MUST);
                constraints.push(a11);
            }
            var dataset = DatasetFactory.getDataset('dsAtualizaCD', null, constraints, null);
            var dataset1 = DatasetFactory.getDataset('dsInsereLogCD', null, constraints, null);
            chamaAlerta('Sucesso','success','Os materiais foram atualizados com sucesso!')
            valoresParaImprimir.push({
                "OS":os,'PLANO':planos,'DESENHO':desenhos,'QTD': quantidades,'DTRETIRADA': dtReti,'DTENTREGUE':dtEntre,'ORDEM': ordem,'DIMENSOES':dimensao,'PROXIMO': proximo,
                'RECEBIDO': retirada,'ENTREGUE': entregue, "FORNPARA": forn
            })
        }
        
        myLoading2.hide()
    }
    janelaParaImprimir(valoresParaImprimir)
    limparSaidaPagina()
}


function chamaAlerta(title, icon, message) {
    
    swal({
        title: title,
        icon: icon,
        text: message
    });
}


function dataAtualFormatoSQL() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    var sqlDatetime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return sqlDatetime;
}
function mapearDadosParaHandsontable(dados) {
    const dadosMapeados = dados.map((linha) => {
      return linha.map((item) => {
        return item._initialValue; 
      });
    });
  
    return dadosMapeados;
}
function transformaArrayEmObjeto(arrayDeArrays) {
    return arrayDeArrays.reduce((objeto, arrayAtual, indice) => {
        objeto[`propriedade${indice + 1}`] = arrayAtual;
        return objeto;
    }, {});
}

function eliminarDuplicatas(array) {
    const uniqueMap = {};
    const uniqueArray = array.filter(item => {
        const key = JSON.stringify(item);
        const isUnique = !uniqueMap[key];
        uniqueMap[key] = true;
        return isUnique;
    });
    return uniqueArray;
}

function transformaValoresEmArray(objeto) {
    return Object.values(objeto);
}


async function janelaParaImprimir(dados) {
    
    var novaJanela = window.open("", "_blank");
    console.log("========> ARRAY")
    console.log(dados)
    novaJanela.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Controle de Saída</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: "Montserrat", sans-serif;
                    font-optical-sizing: auto;
                    font-weight: 400; 
                    font-style: normal;
                    padding: 2%;
                }
                table {
                    border-collapse: collapse;
                    width: 100%;
                    font-size: 10px;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                table tr {
                    text-align: center;
                }
                .linha-assinatura{
                    display: flex;
                    justify-content: center;
                    margin-top: 5%;
                }
                .campo-assinatura{
                    width: 60%;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .nome-assinatura{
                    font-weight: bolder;
                }
                .linha-linha{
                    
                    background-color: black;
                    height: 2px;
                    width: 60%;
                }
                .linha-input{
                    background-color: black;
                    height: 3px;
                    width: 100%;
                }
                .img-header{
                    width: 20vw;
                    height: 8vh;
                }
                @media print {
                      table tbody tr {
                        page-break-inside: avoid;
                      }
                }
                .col-proximo {
                    max-height: 60px; /* Altura máxima da célula */
                    overflow-y: auto; /* Adiciona barra de rolagem vertical se necessário */
                }
                .montserrat-padrao {
                    font-family: "Montserrat", sans-serif;
                    font-optical-sizing: auto;
                    font-weight: <weight>;
                    font-style: normal;
                  }
            </style>
            
        </head>
        <body>
            
            <table>
                <colgroup>
                    <col style="width:20%">
                    <col style="width:10%">
                    <col style="width:10%">
                    <col style="width: 5%">
                    <col style="width:10%; text-align: center;">
                    <col style="width:10%; text-align: center;">
                    <col style="width:10%">
                    <col style="width:15%">
                    <col style="width:13%">
                </colgroup>
                <thead>
                
                    <div class="linha-Topo" style="display:flex;justify-content: space-between;">
                        <h1>Documento de relação do estoque</h1>
                        <img src="https://i.imgur.com/lNFgLB1.png" class="img-header"/>
                    </div>
                    <tr>
                        <th>OS</th>
                        <th>Plano de Corte</th>
                        <th>Número Desenho</th>
                        <th>Qtd.</th>
                        <th>Data Recebida</th>
                        <th>Data Saida</th>
                        <th>Ordem</th>
                        <th>Dimensão</th>
                        <th>Proximo</th>
                        <th>Fornecer P/</th>
                    </tr>
                </thead>
                <tbody>
                    ${ dados.map(item =>`
                    <tr>
                        <td>${item.OS}</td>
                        <td>${item.PLANO}</td>
                        <td>${item.DESENHO}</td>
                        <td>${item.QTD}</td>
                        <td>${formatarDataSQL(item.DTRETIRADA)}</td>
                        <td>${formatarDataSQL(item.DTENTREGUE)}</td>
                        <td>${item.ORDEM}</td>
                        <td>${item.DIMENSOES}</td>
                        <td>${item.PROXIMO}</td>
                        <td>${item.FORNPARA}</td>
                    </tr>

                    `).join('')}
                    <div class="baixo-imprime">  
                        <div class="linha-assinatura">
                                        <div class="campo-assinatura">
                                                <div class="linha-linha"></div>
                                                <p class="nome-assinatura">${  dados[0].ENTREGUE}</p>
                                        </div>
                                        <div class="campo-assinatura">
                                                <div class="linha-linha"></div>
                                                <p class="nome-assinatura">${  dados[0].RECEBIDO}</p>
                                        </div>
                                        
                        </div>
                        <div class="linha-assinatura">
                                    <div class="campo-assinatura">
                                        <div class="linha-linha"></div>
                                        <p class="nome-assinatura">Célula de destino</p>
                                    </div>      
                        </div>
                    </div>
                </tbody>
                
            </table>
            
            
        </body>
        </html>
    `);
    dadosMapeados = []
    setTimeout(() => {
        novaJanela.print();
    }, 500);
}



function formatarDataSQL(dataSQL) {
    
    var data = new Date(dataSQL);

   
    var dia = data.getDate().toString().padStart(2, '0');
    var mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Os meses começam do 0 em JavaScript
    var ano = data.getFullYear();
    var horas = data.getHours().toString().padStart(2, '0');
    var minutos = data.getMinutes().toString().padStart(2, '0');
    var segundos = data.getSeconds().toString().padStart(2, '0');

   
    return `${dia}/${mes}/${ano}`;
}

function removeDuplicatas(array, propriedade) {
    const mapa = new Map();
    array.forEach(item => {
      mapa.set(item[propriedade], item);
    });
    return [...mapa.values()];
  }
  