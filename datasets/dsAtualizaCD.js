function createDataset(fields, constraints, sortFields) {
    var dsAtualizaCD = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);


    var numOS = ""
    var desenhos = ""
    var sequencias = ""
    var quantidades = ""
    var planos = ""
    var dataSaida=""

    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        	
        	}
        	
            if(constraints[i].fieldName == "NUMPLANOCORTE"){
        		
        		planos = constraints[i].initialValue;
        		
        	}
            
            if(constraints[i].fieldName == "NUMDESENHOS"){
        		
        		desenhos=constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "SEQUENCIA"){
        		
        		sequencias= constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "QUANTIDADE"){
        		
        		quantidades= constraints[i].initialValue
        		
        	}
            if(constraints[i].fieldName == "DATARETIRADA"){
        		
        		dataSaida = constraints[i].initialValue
        		
        	}
        }
        
    }

   
        
        var myQuery =   "   UPDATE ESTOQUECD "+
                        "    SET QUANTIDADE = CASE  WHEN QUANTIDADE > 0 THEN QUANTIDADE - "+quantidades+" ELSE QUANTIDADE,"+
                        "    DATARETIRADA = '"+dataSaida+"' "+
                        "    WHERE OS = '"+numOS+"' "+
                        "    AND PLANOCORTE = '"+planos+"' "+
                        "    AND SEQUENCIA = '"+sequencias+"' "
        log.info("QUERY dsAtualizaCD Rodando " + myQuery);                
     
    

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

    return dsAtualizaCD

}	