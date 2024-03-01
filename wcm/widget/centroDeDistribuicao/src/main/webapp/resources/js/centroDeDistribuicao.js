var MyWidget = SuperWidget.extend({

    variavelNumerica: null,
    variavelCaracter: null,
    
    //método iniciado quando a widget é carregada
    init: function() {
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

            myLoading2.show()
            $('.screen').hide();
            $('#fakeRouter').removeAttr('hidden');
            var relatedDiv = $(this).data('related-div');
            console.log(relatedDiv)
            if(relatedDiv === 'telaSaida'){
                $('#navbar-logo-texto').text("Controle de Saida")
            } else if(relatedDiv === 'telaConsulta'){
                $('#navbar-logo-texto').text("Histórico de movientações")
            } else if(relatedDiv === 'telaEntrada'){
                $('#navbar-logo-texto').text("Controle de Entrada")
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
        var filterOs = FLUIGC.filter('#NUM_OS', settingsExampleDatasetOS);
        var filterPlanoCorte = FLUIGC.filter('#NUMPLANOCORTE', settingsExampleDatasetPlanoCorte)
        var filterOsSaida = FLUIGC.filter('#NUM_OS_SAIDA', settingsExampleDatasetOSSaida);
        var filterPlanoCorteSaida = FLUIGC.filter('#NUMPLANOCORTE_SAIDA', settingsExampleDatasetPlanoCorteSaida)
        var filterOsConsulta = FLUIGC.filter('#NUM_OS_CONSULTA', settingsExampleDatasetOSConsulta);
        var filterPlanoConsulta = FLUIGC.filter('#NUMPLANOCORTE_CONSULTA', settingsExampleDatasetPlanoCorteConsulta)

        filterOs.on('fluig.filter.item.added', function(data){

            console.log(data.item)

            // PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
            $("#NUM_OS").val(String(data.item.CODPRJ))
            $("#CODCOLIGADA").val(String(data.item.CODCOLIGADA))
            $("#CODFILIAL").val(String(data.item.CODFILIAL))
            $("#NUMPLANOCORTE").val(String(data.item.NUMPLANOCORTE))

            filterPlanoCorte.reload(MyWidget.reloadFilter("PLANO"))
            
        })
        filterOsSaida.on('fluig.filter.item.added', function(data){

            console.log(data.item)

            // PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
            $("#NUM_OS_SAIDA").val(String(data.item.OS))
            $("#NUMPLANOCORTE_SAIDA").val(String(data.item.PLANOCORTE))

            filterPlanoCorteSaida.reload(MyWidget.reloadFilter("PLANO_SAIDA"))
            
        })
        filterOsConsulta.on('fluig.filter.item.added', function(data){

            console.log(data.item)

            // PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
            $("#NUM_OS_CONSULTA").val(String(data.item.OS))
            $("#NUMPLANOCORTE_CONSULTA").val(String(data.item.PLANOCORTE))

            filterPlanoConsulta.reload(MyWidget.reloadFilter("PLANO_CONSULTA"))
            
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

        var myAutocomplete = FLUIGC.autocomplete(id);
        myAutocomplete.removeAll();
        
    },
    reloadFilter : function(id){
        if(id =="PLANO"){
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
        if(id =="PLANO_SAIDA"){
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
        if(id =="PLANO_CONSULTA"){
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
        if(id =="OS"){
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
        if(id =="OS_SAIDA"){
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
    }
});





function isNullOrEmptyOrUndefined(value) {
    return value === null || value === undefined || value === '';
}

