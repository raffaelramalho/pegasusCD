var MyWidget = SuperWidget.extend({

    variavelNumerica: null,
    variavelCaracter: null,
    filterOs : null,
    filterPlanoCorte : null,
    filterOsSaida : null,
    filterPlanoCorteSaida : null,
    filterOsConsulta : null,
    filterPlanoConsulta : null,

    //método iniciado quando a widget é carregada
    init: async function() {
        myLoading2.show()
        setTimeout((
            $("#opcoesExtra").addClass("ninjaOculto")
        ),500)
        $('#telaEntrada').hide()
        $('#telaSaida').hide()
        $('#telaConsulta').hide()
        $('.custom-menu-btn').click(function() {
            //Limpadores de telas
            limparConsultaPagina()
            limparTudo() //Entrada
            limparSaidaPagina()
            
            
            $('.screen').hide();
            $('#fakeRouter').removeAttr('hidden');
            var relatedDiv = $(this).data('related-div');
            console.log(relatedDiv)
            if(relatedDiv === 'telaSaida'){
                $('#navbar-logo-texto').text("Controle de Saida")
                reiniciaFiltros()
            } else if(relatedDiv === 'telaConsulta'){
                $('#navbar-logo-texto').text("Histórico de movientações")
                reiniciaFiltros()
            } else if(relatedDiv === 'telaEntrada'){
                $('#navbar-logo-texto').text("Controle de Entrada")
                reiniciaFiltros()
            }
            $('#' + relatedDiv).show();
            myLoading2.hide()
        });
        
        $('#voltaMenu').click(function() {
            myLoading2.show()
            $('.screen').hide();
            $('#fakeRouter').attr('hidden',true);
            var relatedDiv = $(this).data('related-div');
            $('#navbar-logo-texto').val('')
            $('#' + relatedDiv).show();
            myLoading2.hide()
        });
        verificaPermissao()
        
        myLoading2.hide()
        //Animação
        $('.animate').css({
            'opacity': '1',
            'transform': 'translateX(0)'
        });

       this.filter()
    },
    getDatasetOS: function() {
        console.log("Entrei para montar o OS")
        try {
                var dataset = DatasetFactory.getDataset('dsOSEstrutura');
                var ret = dataset.values;
                return ret;
        } catch(error) {
                console.error(error);
                return reject(new Error(e));
        }
    },
    getDatasetOSSaida: function() {
        console.log("Montando select saida")
        try {
                var dataset = DatasetFactory.getDataset('dsOSEstruturaConsultaCD');
                var ret = dataset.values;
                return ret;
        } catch(error) {
                console.error(error);
                return reject(new Error(e));
        }
    },
    getDatasetOSConsulta: function() {
        console.log("Montando select consulta")
        try {
                var dataset = DatasetFactory.getDataset('dsOSEstruturaConsultaTransacaoCD');
                var ret = dataset.values;
                return ret;
        } catch(error) {
                console.error(error);
                return reject(new Error(e));
        }
    },
    getDatasetPlanoCorte: function (){
        console.log("Entrei para montar o Plano de corte")
        try{
            var os = $("#NUM_OS").val();
            var coligada = $("#CODCOLIGADA").val();
            var filial = $("#CODFILIAL").val();

            var a1,a2,a3;
            var constraints = new Array()
            if(!isNullOrEmptyOrUndefined(os)){
                a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST);
                constraints.push(a1);
            }
            if(!isNullOrEmptyOrUndefined(coligada)){
                a2 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST);
                constraints.push(a2);
            }
            if(!isNullOrEmptyOrUndefined(filial)){
                a3 = DatasetFactory.createConstraint("CODFILIAL",filial,filial,ConstraintType.MUST);
                constraints.push(a3);
            }
            var dataset = DatasetFactory.getDataset('dsPlanoCorte',null,constraints,null);
                var ret = dataset.values;
                return ret;
        }catch(error){
            console.error(error);
            return reject(new Error(e));
        }
    },
    getDatasetPlanoCorteSaida: function (){
        console.log("Entrei para montar a Saida Plano Corte")
        try{
            var os = $("#NUM_OS_SAIDA").val();

            var a1;
            var constraints = new Array()
            if(!isNullOrEmptyOrUndefined(os)){
                a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST);
                constraints.push(a1);
            }

            var dataset = DatasetFactory.getDataset('dsConsultaPlanoCD',null,constraints,null);
                var ret = dataset.values;
                return ret;
        }catch(error){
            console.error(error);
            return reject(new Error(e));
        }
    },
    getDatasetPlanoCorteConsulta: function (){
        console.log("Entrei para montar a CONSULTA Plano Corte")
        try{
            var os = $("#NUM_OS_CONSULTA").val();

            var a1;
            var constraints = new Array()
            if(!isNullOrEmptyOrUndefined(os)){
                a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST);
                constraints.push(a1);
            }

            var dataset = DatasetFactory.getDataset('dsConsultaTransacaoPlanoCD',null,constraints,null);
                var ret = dataset.values;
                return ret;
        }catch(error){
            console.error(error);
            return reject(new Error(e));
        }
    },
    filter: function(){
        $("#adicionaTabela").hide()

        var Os = this.getDatasetOS();
        var OsSaida = this.getDatasetOSSaida();
        var OsConsulta = this.getDatasetOSConsulta();

        var settingsExampleDatasetOS = {
            source: Os,
            displayKey: 'OS',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [{
                    'title': 'Os',
                    'size': 'col-xs-9',
                    'dataorder': 'OS',
                    'standard': true
                }],
                renderContent: ['OS']
            }
        };
        var settingsExampleDatasetOSSaida = {
            source: OsSaida,
            displayKey: 'OS',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [{
                    'title': 'Os',
                    'size': 'col-xs-9',
                    'dataorder': 'OS',
                    'standard': true
                }],
                renderContent: ['OS']
            }
        };
        var settingsExampleDatasetOSConsulta = {
            source: OsConsulta,
            displayKey: 'OS',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [{
                    'title': 'Os',
                    'size': 'col-xs-9',
                    'dataorder': 'OS',
                    'standard': true
                }],
                renderContent: ['OS']
            }
        };
        var PlanoCorte = this.getDatasetPlanoCorte()
        var PlanoCorteSaida = this.getDatasetPlanoCorteSaida()
        var PlanoCorteConsulta = this.getDatasetPlanoCorteConsulta()

        var settingsExampleDatasetPlanoCorte = {
            source: PlanoCorte,
            displayKey: 'NUMPLANOCORTE',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [{
                    'title': 'Num. Plano de Corte',
                    'size': 'col-xs-9',
                    'dataorder': 'NUMPLANOCORTE',
                    'standard': true
                }],
                renderContent: ['NUMPLANOCORTE']
            }
        };
        var settingsExampleDatasetPlanoCorteSaida = {
            source: PlanoCorteSaida,
            displayKey: 'PLANOCORTE',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [{
                    'title': 'Num. Plano de Corte Saida',
                    'size': 'col-xs-9',
                    'dataorder': 'PLANOCORTE',
                    'standard': true
                }],
                renderContent: ['PLANOCORTE']
            }
        };
        var settingsExampleDatasetPlanoCorteConsulta = {
            source: PlanoCorteConsulta,
            displayKey: 'PLANOCORTE',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [{
                    'title': 'Num. Plano de Corte Saida',
                    'size': 'col-xs-9',
                    'dataorder': 'PLANOCORTE',
                    'standard': true
                }],
                renderContent: ['PLANOCORTE']
            }
        };
        if( MyWidget.filterOs==null){
            MyWidget.filterOs = FLUIGC.filter('#NUM_OS', settingsExampleDatasetOS);
        }else{
            MyWidget.filterOs.reload(settingsExampleDatasetOS)
        }
        if( MyWidget.filterPlanoCorte==null){
            MyWidget.filterPlanoCorte = FLUIGC.filter('#NUMPLANOCORTE', settingsExampleDatasetPlanoCorte)
        }else{
            MyWidget.filterPlanoCorte.reload(settingsExampleDatasetPlanoCorte)
        }
        if( MyWidget.filterOsSaida==null){
            MyWidget.filterOsSaida = FLUIGC.filter('#NUM_OS_SAIDA', settingsExampleDatasetOSSaida);
        }else{
            MyWidget.filterOsSaida.reload(settingsExampleDatasetOSSaida)
        }
        if( MyWidget.filterPlanoCorteSaida==null){
            MyWidget.filterPlanoCorteSaida = FLUIGC.filter('#NUMPLANOCORTE_SAIDA', settingsExampleDatasetPlanoCorteSaida)
        }else{
            MyWidget.filterPlanoCorteSaida.reload(settingsExampleDatasetPlanoCorteSaida)
        }
        if( MyWidget.filterOsConsulta==null){
            MyWidget.filterOsConsulta = FLUIGC.filter('#NUM_OS_CONSULTA', settingsExampleDatasetOSConsulta);
        }else{
            MyWidget.filterOsConsulta.reload(settingsExampleDatasetOSConsulta)
        }
        if( MyWidget.filterPlanoConsulta==null){
            MyWidget.filterPlanoConsulta = FLUIGC.filter('#NUMPLANOCORTE_CONSULTA', settingsExampleDatasetPlanoCorteConsulta)
        }else{
            MyWidget.filterPlanoConsulta.reload(settingsExampleDatasetPlanoCorteConsulta)
        }

        MyWidget.filterOs.on('fluig.filter.item.added', function(data){

            console.log(data.item)

            // PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
            $("#NUM_OS").val(String(data.item.CODPRJ))
            $("#CODCOLIGADA").val(String(data.item.CODCOLIGADA))
            $("#CODFILIAL").val(String(data.item.CODFILIAL))
            $("#NUMPLANOCORTE").val(String(data.item.NUMPLANOCORTE))

            MyWidget.filterPlanoCorte.reload(MyWidget.reloadFilter("#PLANO"))
            
        })
        MyWidget.filterOsSaida.on('fluig.filter.item.added', function(data){

            console.log(data.item)

            // PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
            $("#NUM_OS_SAIDA").val(String(data.item.OS))
            $("#NUMPLANOCORTE_SAIDA").val(String(data.item.PLANOCORTE))

            MyWidget.filterPlanoCorteSaida.reload(MyWidget.reloadFilter("#PLANO_SAIDA"))
            
        })
        MyWidget.filterOsConsulta.on('fluig.filter.item.added', function(data){

            console.log(data.item)

            // PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
            $("#NUM_OS_CONSULTA").val(String(data.item.OS))
            $("#NUMPLANOCORTE_CONSULTA").val(String(data.item.PLANOCORTE))

            MyWidget.filterPlanoConsulta.reload(MyWidget.reloadFilter("#PLANO_CONSULTA"))
            
        })
    },
    //BIND de eventos
    bindings: {
        local: {
            'execute': ['click_executeAction']
        },
        global: {}
    },
    
    executeAction: function(htmlElement, event) {
    },
    limpaInput: function(id){

        if(id=="#NUM_OS"){
            MyWidget.filterOs.removeAll();
        }
        else if(id=="#NUMPLANOCORTE"){
            MyWidget.filterPlanoCorte.removeAll();
        }
        else if(id=="#NUM_OS_SAIDA"){
            MyWidget.filterOsSaida.removeAll();
        }
        else if(id=="#NUMPLANOCORTE_SAIDA"){
            MyWidget.filterPlanoCorteSaida.removeAll();
        }
        else if(id=="#NUM_OS_CONSULTA"){
            MyWidget.filterOsConsulta.removeAll();
        }
        else if(id=="#NUMPLANOCORTE_CONSULTA"){
            MyWidget.filterPlanoConsulta.removeAll();
        }
        else{
            console.log("Filtro não encontrado para limpeza")
        }

        
    },
    recarregaInput: function(){
        this.filter()
    },
    reloadFilter : function(id){
        if(id =="#PLANO"){
            var planoCorte = this.getDatasetPlanoCorte();

            var settingsExampleDatasetPlanoCorte = {
                source: planoCorte,
                displayKey: 'NUMPLANOCORTE',
                multiSelect: false,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [{
                        'title': 'Num. Plano de Corte',
                        'size': 'col-xs-9',
                        'dataorder': 'NUMPLANOCORTE',
                        'standard': true
                    }],
                    renderContent: ['NUMPLANOCORTE']
                }
            };

            return settingsExampleDatasetPlanoCorte;
        }
        if(id =="#PLANO_SAIDA"){
            var planoCorte = this.getDatasetPlanoCorteSaida();

            var settingsExampleDatasetPlanoCorteSaida = {
                source: planoCorte,
                displayKey: 'PLANOCORTE',
                multiSelect: false,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [{
                        'title': 'Num. Plano de Corte',
                        'size': 'col-xs-9',
                        'dataorder': 'PLANOCORTE',
                        'standard': true
                    }],
                    renderContent: ['PLANOCORTE']
                }
            };

            return settingsExampleDatasetPlanoCorteSaida;
        }
        if(id =="#PLANO_CONSULTA"){
            var planoCorte = this.getDatasetPlanoCorteConsulta();

            var settingsExampleDatasetPlanoCorteConsulta = {
                source: planoCorte,
                displayKey: 'PLANOCORTE',
                multiSelect: false,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [{
                        'title': 'Num. Plano de Corte',
                        'size': 'col-xs-9',
                        'dataorder': 'PLANOCORTE',
                        'standard': true
                    }],
                    renderContent: ['PLANOCORTE']
                }
            };

            return settingsExampleDatasetPlanoCorteConsulta;
        }
        if(id =="#OS"){
            var os = this.getDatasetOS();
            var settingsExampleDatasetOS = {
                source: os,
                displayKey: 'OS',
                multiSelect: false,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [{
                        'title': 'Os',
                        'size': 'col-xs-9',
                        'dataorder': 'OS',
                        'standard': true
                    }],
                    renderContent: ['OS']
                }
            };

            return settingsExampleDatasetOS;
        }
        if(id =="#OS_SAIDA"){
            var os = this.getDatasetOSSaida();
            var settingsExampleDatasetOSSaida = {
                source: os,
                displayKey: 'OS_SAIDA',
                multiSelect: false,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [{
                        'title': 'Os',
                        'size': 'col-xs-9',
                        'dataorder': 'OS',
                        'standard': true
                    }],
                    renderContent: ['OS']
                }
            };

            return settingsExampleDatasetOSSaida;
        }
        if(id =="#OS_CONSULTA"){
            var os = this.getDatasetOSConsulta();
            var settingsExampleDatasetOSConsulta = {
                source: os,
                displayKey: 'OS_CONSULTA',
                multiSelect: false,
                style: {
                    autocompleteTagClass: 'tag-gray',
                    tableSelectedLineClass: 'info'
                },
                table: {
                    header: [{
                        'title': 'Os',
                        'size': 'col-xs-9',
                        'dataorder': 'OS',
                        'standard': true
                    }],
                    renderContent: ['OS']
                }
            };

            return settingsExampleDatasetOSConsulta;
        }
    }
});





function isNullOrEmptyOrUndefined(value) {
    return value === null || value === undefined || value === '';
}

function reiniciaFiltros(){
    MyWidget.recarregaInput()
}

async function verificaPermissao(){
        var usuario = window.parent.window.WCMAPI.userLogin
        var grupo = 'editorCD'
        var grupo2 = 'visualizarCD'
        var a1,a2,a3
            var constraints = new Array()
            if (!isNullOrEmptyOrUndefined(usuario)) {
                a1 = DatasetFactory.createConstraint("LOGIN", usuario, usuario, ConstraintType.MUST);
                constraints.push(a1);
            }
            if (!isNullOrEmptyOrUndefined(grupo)) {
                a2 = DatasetFactory.createConstraint("GROUPCODE", grupo, grupo, ConstraintType.MUST);
                constraints.push(a2);
            }
            if (!isNullOrEmptyOrUndefined(grupo2)) {
                a3 = DatasetFactory.createConstraint("GROUPCODEALT", grupo2, grupo2, ConstraintType.MUST);
                constraints.push(a3);
            }
            var dataset = DatasetFactory.getDataset('dsConsultaPermissao', null, constraints, null);
            var row = dataset.values
            console.log("Esses são os valores retornados:")
            console.log(row[0].GROUP_CODE)
            var cargo = row[0].GROUP_CODE
            if(row == null || row == undefined || row == ""){
                console.log("usuário sem permissão")
                myLoading2.hide();
                FLUIGC.toast({
                  title: 'Sem retorno: ',
                message: 'Você não pode acessar o CD',
                  type: 'danger'
                });
                $(".menu").empty()
                return false
            } else if(cargo === 'visualizarCD') {
                console.log("usuario tem permissão parcial")
                $(".btn2").addClass("semPermissao")
                $(".btn1").addClass("semPermissao")
                return true
            }
}



