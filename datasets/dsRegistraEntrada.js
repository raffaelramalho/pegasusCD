function createDataset(fields, constraints, sortFields) {
    var dsRegistraEntrada = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);


    var numOS = ""
    var codfilial = ""
    var codcoligada = ""
    var numplanocortes = ""
    var desenhos = ""
    var sequencias = ""
    var ordens = ""
    var quantidades = ""
    var descricoes = ""
    var dimensoes = ""
    var planos = ""
    var posicoes = ""
    var atividades = ""
    var dscatividades = ""
    var entregue = ""
    var recebido = ""
    var dataEntregue=""

    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        	
        	}
        	if(constraints[i].fieldName == "CODFILIAL"){
        		
        		codfilial = constraints[i].initialValue;
        	
        	}
        	if(constraints[i].fieldName == "CODCOLIGADA"){
        		
        		codcoligada = constraints[i].initialValue;
        		
        	}
            if(constraints[i].fieldName == "NUMPLANOCORTE"){
        		
        		numplanocortes = constraints[i].initialValue;
        		
        	}
            if(constraints[i].fieldName == "ENTREGUE"){
        		
        		entregue = constraints[i].initialValue;
        		
        	}
            if(constraints[i].fieldName == "RECEBIDO"){
        		
        		recebido = constraints[i].initialValue;
        		
        	}
            if(constraints[i].fieldName == "NUMDESENHOS"){
        		
        		desenhos=constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "NSEQPLANOCORTE"){
        		
        		sequencias= constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "CODORDEM"){
        		
        		ordens= constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "QUANTIDADE"){
        		
        		quantidades= constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "DESCRICAO"){
        		
        		descricoes= constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "DIMENSOES"){
        		
        		dimensoes=constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "POSICAODESENHO"){
        		
        		posicoes=constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "CODATIVIDADE"){
        		
        		atividades= constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "DSCATIVIDADE"){
        		
        		dscatividades = constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "DATAENTREGUE"){
        		
        		dataEntregue = constraints[i].initialValue
        		
        	}
        }
        
    }

   
        
        var myQuery =   " INSERT INTO ESTOQUECD ( QUANTIDADE, SEQUENCIA, NUMDESENHO, ORDEM, OS, PLANOCORTE, ATIVIDADE, DSCATIVIDADE, DIMENSOES, DESCRICAO, POSICAO, NOMERETIRADA, NOMEENTREGUE,DATAENTREGUE) "+
                        " VALUES ("+quantidades+" , "+sequencias+" , '"+desenhos+"' , '"+ordens+"' ,  '"+numOS+"' , '"+numplanocortes+"' , '"+atividades+"' , '"+dscatividades+"' , '"+dimensoes+"' , '"+descricoes+"' , '"+posicoes+"' , '"+recebido+"' , '"+entregue+"','"+dataEntregue+"' ) "
        log.info("QUERY dsRegistraEntrada Rodando " + myQuery);                
     
    

    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.execute(myQuery);
        
        
    } catch (e) {
        
    	log.error("ERRO==============> " + e.message);
    
    } finally {
    	
        if (stmt != null) {
        	
            stmt.close();
            
        }
        
        if (conn != null) {
        	
            conn.close();
            
        }
        
    }

    return dsRegistraEntrada

}	