var hot;
var myLoading2 = FLUIGC.loading(window);

function adicionaEntrada() {

  console.log("Estou montando a entrada.....")

  var os = $("#NUM_OS").val();
  var coligada = $("#CODCOLIGADA").val();
  var filial = $("#CODFILIAL").val();
  var plano = $("#NUMPLANOCORTE").val();
  var entregue = $("#adicionaEntregue").val();
  var recebido = $("#adicionaRecebido").val();

  if (isNullOrEmptyOrUndefined(entregue) || isNullOrEmptyOrUndefined(recebido)) {
    chamaAlerta("Atenção","warning","Os campos Entregue e Recebido devem estar preenchidos")
    return
  }
  
  var x1, x2
  //arrays
   var verificaC = new Array()
   if (!isNullOrEmptyOrUndefined(os)) {
     x1 = DatasetFactory.createConstraint("OS", os, os, ConstraintType.MUST);
     verificaC.push(x1);
   }
   if (!isNullOrEmptyOrUndefined(plano)) {
     x2 = DatasetFactory.createConstraint("NUMPLANOCORTE", plano, plano, ConstraintType.MUST);
     verificaC.push(x2);
   }

    var verificacao = DatasetFactory.getDataset('dsOSparaCDverifica', null, verificaC, null);
    console.log("Estou verificando se já num ta pa dentro ")
    console.log(verificacao)
    var resultadoMatriz = verificacao.values[0];
    if (resultadoMatriz && !isNullOrEmptyOrUndefined(resultadoMatriz.OS)) {
      chamaAlerta("Erro", "error", "O plano de corte já foi adicionado ao centro de distribuição");
      return;
    }

  var desenhos = hot.getDataAtCol(0);
  var sequencias = hot.getDataAtCol(1);
  var ordens = hot.getDataAtCol(2);
  var quantidades = hot.getDataAtCol(3);
  var descricoes = hot.getDataAtCol(4);
  var dimensoes = hot.getDataAtCol(5);
  var custos = hot.getDataAtCol(6); //os
  var planos = hot.getDataAtCol(7);
  var posicoes = hot.getDataAtCol(8);
  var atividades = hot.getDataAtCol(9);
  var dscatividades = hot.getDataAtCol(10);

  console.log({ desenhos, sequencias, ordens, quantidades, descricoes, dimensoes, custos, planos, posicoes, atividades, dscatividades });
  console.log(os, coligada, filial, plano, entregue, recebido)
  
  
  for(let i=0;i<=desenhos.length;i++){
    var a1, a2, a3, a4, a5, a6;
   //arrays
    var constraints = new Array()
    if (!isNullOrEmptyOrUndefined(os)) {
      a1 = DatasetFactory.createConstraint("OS", os, os, ConstraintType.MUST);
      constraints.push(a1);
    }
    if (!isNullOrEmptyOrUndefined(coligada)) {
      a2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
      constraints.push(a2);
    }
    if (!isNullOrEmptyOrUndefined(filial)) {
      a3 = DatasetFactory.createConstraint("CODFILIAL", filial, filial, ConstraintType.MUST);
      constraints.push(a3);
    }
    if (!isNullOrEmptyOrUndefined(plano)) {
      a4 = DatasetFactory.createConstraint("NUMPLANOCORTE", plano, plano, ConstraintType.MUST);
      constraints.push(a4);
    }
    if (!isNullOrEmptyOrUndefined(entregue)) {
      a5 = DatasetFactory.createConstraint("ENTREGUE", entregue, entregue, ConstraintType.MUST);
      constraints.push(a5);
    }
    if (!isNullOrEmptyOrUndefined(recebido)) {
      a6 = DatasetFactory.createConstraint("RECEBIDO", recebido, recebido, ConstraintType.MUST);
      constraints.push(a6);
    }
    var b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11,b12
    if (!isNullOrEmptyOrUndefined(desenhos[i])) {
      var desenho = desenhos[i]
      b1 = DatasetFactory.createConstraint("NUMDESENHOS", desenho, desenho, ConstraintType.MUST);
      constraints.push(b1);
    }
    if (!isNullOrEmptyOrUndefined(sequencias[i])) {
      var seq = sequencias[i]
      b2 = DatasetFactory.createConstraint("NSEQPLANOCORTE", seq, seq, ConstraintType.MUST);
      constraints.push(b2);
    }
    if (!isNullOrEmptyOrUndefined(ordens[i])) {
      var ordem = ordens[i]
      b3 = DatasetFactory.createConstraint("CODORDEM", ordem, ordem, ConstraintType.MUST);
      constraints.push(b3);
    }
    if (!isNullOrEmptyOrUndefined(quantidades[i])) {
      var quantidade = quantidades[i]
      b4 = DatasetFactory.createConstraint("QUANTIDADE", quantidade, quantidade, ConstraintType.MUST);
      constraints.push(b4);
    }
    if (!isNullOrEmptyOrUndefined(descricoes[i])) {
      var descricao = descricoes[i]
      b5 = DatasetFactory.createConstraint("DESCRICAO", descricao, descricao, ConstraintType.MUST);
      constraints.push(b5);
    }
    if (!isNullOrEmptyOrUndefined(dimensoes[i])) {
      var dimensao = dimensoes[i]
      b6 = DatasetFactory.createConstraint("DIMENSOES", dimensao, dimensao, ConstraintType.MUST);
      constraints.push(b6);
    }
    if (!isNullOrEmptyOrUndefined(custos[i])) {
      var custo = custos[i]
      b7 = DatasetFactory.createConstraint("CODCUSTO", custo, custo, ConstraintType.MUST);
      constraints.push(b7);
    }
    if (!isNullOrEmptyOrUndefined(planos[i])) {
      var plano = planos[i]
      b8 = DatasetFactory.createConstraint("NUMPLANOCORTE", plano, plano, ConstraintType.MUST);
      constraints.push(b8);
    }
    if (!isNullOrEmptyOrUndefined(posicoes[i])) {
      var posicao = posicoes[i]
      b9 = DatasetFactory.createConstraint("POSICAODESENHO", posicao, posicao, ConstraintType.MUST);
      constraints.push(b9);
    }
    if (!isNullOrEmptyOrUndefined(atividades[i])) {
      var atividade = atividades[i]
      b10 = DatasetFactory.createConstraint("CODATIVIDADE", atividade, atividade, ConstraintType.MUST);
      constraints.push(b10);
    }
    if (!isNullOrEmptyOrUndefined(dscatividades[i])) {
      var dscatividade = dscatividades[i]
      b11 = DatasetFactory.createConstraint("DSCATIVIDADE", dscatividade, dscatividade, ConstraintType.MUST);
      constraints.push(b11);
    }
    var dataEntregue = dataAtualFormatoSQL()
    b12 = DatasetFactory.createConstraint("DATAENTREGUE", dataEntregue, dataEntregue, ConstraintType.MUST);
    constraints.push(b12);
    
    console.log(constraints)
    var dataset = DatasetFactory.getDataset('dsRegistraEntrada', null, constraints, null);

  }

  swal({
    title: "Sucesso",
    text: "As peças foram registradas com exito ",
    icon: "success",
  });
  limparTudo()
}

function preencheTabela() {
  myLoading2.show();
  $("#opcoesExtra").addClass("ninjaOculto");
  var os = $("#NUM_OS").val();
  var coligada = $("#CODCOLIGADA").val();
  var filial = $("#CODFILIAL").val();
  var plano = $("#NUMPLANOCORTE").val();

  console.log("Esses são meus filtros")
  console.log(os, coligada, filial, plano)
  var a1, a2, a3, a4
  var constraints = new Array()
  if (!isNullOrEmptyOrUndefined(os)) {
    a1 = DatasetFactory.createConstraint("OS", os, os, ConstraintType.MUST);
    constraints.push(a1);
  }
  if (!isNullOrEmptyOrUndefined(coligada)) {
    a2 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
    constraints.push(a2);
  }
  if (!isNullOrEmptyOrUndefined(filial)) {
    a3 = DatasetFactory.createConstraint("CODFILIAL", filial, filial, ConstraintType.MUST);
    constraints.push(a3);
  }
  if (!isNullOrEmptyOrUndefined(plano)) {
    a4 = DatasetFactory.createConstraint("NUMPLANOCORTE", plano, plano, ConstraintType.MUST);
    constraints.push(a4);
  }
  var dataset = DatasetFactory.getDataset('dsRelatorioKitsNum', null, constraints, null);
  var row = dataset.values
  console.log("Esses são os valores retornados:")
  console.log(row)
  if (row == null || row == undefined || row == "") {

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
      
      var container = document.getElementById('tabelaEntrada');
      $("#opcoesExtra").removeClass("ninjaOculto");
      try {
        $('#tabelaEntrada').empty()
      } catch (e) {
        console.log("Não tenho tabela para apagar")
      }
      hot = new Handsontable(container, {
        data: row,
        rowHeaders: false,
        colHeaders: ['Desenho', 'Seq.', 'Ordem', 'Qtd.', 'Desc.', 'Dimensões', 'OS', 'Plano de Corte', 'Posição', 'Atividade', 'Descrição Atv'],
        filters: true,
        stretchH: 'all',
        width: '100%',
        colWidths:[15, 15, 10, 8, 8, 15, 15, 15, 10, 15, 15],
        dropdownMenu: true,
        licenseKey: 'non-commercial-and-evaluation',
        columns: [
          
          {readOnly: true, data: "NUMDESENHO"},
          {readOnly: true, data: "NSEQPLANOCORTE"},
          {readOnly: true, data: "CODORDEM"},
          {readOnly: false,data: "QUANTIDADE"},
          {readOnly: true, data: "DESCRICAO"},
          {readOnly: true, data: "DIMENSOES"},
          {readOnly: true, data: "CODCCUSTO"},
          {readOnly: true, data: "NUMPLANOCORTE"},
          {readOnly: true, data: "POSICAODESENHO"},
          {readOnly: true, data: "CODATIVIDADE"},
          {readOnly: true, data: "DSCATIVIDADE"}
        ],
      });
    } catch (e) {
      console.log(e)
    }
    myLoading2.hide();
    $("#adicionaTabela").show()
  }

  myLoading2.hide();
}

function transformaArrayEmObjeto(array) {
  return array.reduce((megaObjeto, obj) => {
    Object.keys(obj).forEach(key => {
      if (!megaObjeto[key]) {
        megaObjeto[key] = [];
      }
      megaObjeto[key].push(obj[key]);
    });
    return megaObjeto;
  }, {});
}


function limparTudo(){
    myLoading2.show()
   $("#NUM_OS").val('');
   $("#CODCOLIGADA").val('');
   $("#CODFILIAL").val('');
   $("#NUMPLANOCORTE").val();
   $("#adicionaEntregue").val('');
   $("#adicionaRecebido").val('');
   $('#tabelaEntrada').empty()
   $('#adicionaTabela').hide()
   $("#opcoesExtra").addClass("ninjaOculto");
   MyWidget.limpaInput("#NUM_OS");
   MyWidget.limpaInput("#NUMPLANOCORTE");
   myLoading2.hide()
}


function organizeObject(obj) {
  let order = ["NUMDESENHO","SEQUENCIA","ORDEM","QUANTIDADE","DESCRICAO", "DIMENSOES", "OS","PLANOCORTE","POSICAO","ATIVIDADE","DSCATIVIDADE","NOMEENTREGUE","NOMERETIRADA","DATAENTREGUE","DATARETIRADA"];
  let newObj = {};
  for (let key of order) {
    newObj[key] = obj[key];
  }
  return newObj;
}