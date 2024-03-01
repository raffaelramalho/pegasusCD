function createDataset(fields, constraints, sortFields) {
    var dsInsereLogCD = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);


    var numOS = ""
    var numplanocortes = ""
    var desenhos = ""
    var sequencias = ""
    var ordens = ""
    var quantidades = ""
    var dimensoes = ""
    var entregue = ""
    var recebido = ""
    var dataEntregue=""
    var dataRetirada=""
    var nomeRecebe = ""
    var nomeEntregue = ""

    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        	
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
            if(constraints[i].fieldName == "SEQUENCIA"){
        		
        		sequencias = constraints[i].initialValue
        		
        	}
    
            if(constraints[i].fieldName == "QUANTIDADE"){
        		
        		quantidades= constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "DIMENSOES"){
        		
        		dimensoes=constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "POSICAODESENHO"){
        		
        		posicoes=constraints[i].initialValue
        		
        	}

            if(constraints[i].fieldName == "DATAENTREGUE"){
        		
        		dataEntregue = constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "DATARETIRADA"){
        		
        		dataRetirada = constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "ORDEM"){
        		
        		ordens = constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "DIMENSAO"){
        		
        		dimensoes = constraints[i].initialValue
        		
        	}
        }
        
    }

   
        
        var myQuery =   " INSERT INTO TRANSACAOCD ( QUANTIDADE, SEQUENCIA, NUMDESENHO, ORDEM, OS, PLANOCORTE, DIMENSAO, NOMERETIRADA, NOMEENTREGUE,DATAENTREGUE, DATARETIRADA) "+
                        " VALUES ("+quantidades+" , "+sequencias+" , '"+desenhos+"' , '"+ordens+"' ,  '"+numOS+"' , '"+numplanocortes+"' , '"+dimensoes+"' , '"+recebido+"' , '"+entregue+"','"+dataEntregue+"' , '"+dataRetirada+"' ) "
        log.info("QUERY dsInsereLogCD Rodando " + myQuery);                
     
    

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

    return dsInsereLogCD

}	