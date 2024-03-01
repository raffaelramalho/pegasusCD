function createDataset(fields, constraints, sortFields) {
    var dsConsultaKitsCD = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

    var numOS = ""
    var codfilial = ""
    var codcoligada = ""
    var numplanocorte = ""
    var myQuery = ""

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
        		
        		numplanocorte = constraints[i].initialValue;
        		
        	}
            
        }
        
    }

   if(numplanocorte == 'undefined'){
        myQuery =   "   select NUMDESENHO,SEQUENCIA,ORDEM,QUANTIDADE,DESCRICAO, DIMENSOES, OS,PLANOCORTE,POSICAO,ATIVIDADE,DSCATIVIDADE,NOMEENTREGUE,NOMERETIRADA,DATAENTREGUE,DATARETIRADA FROM ESTOQUECD "+
        "   WHERE OS ='"+numOS+"' "
    
   } else {
        myQuery =   "   select NUMDESENHO,SEQUENCIA,ORDEM,QUANTIDADE,DESCRICAO, DIMENSOES, OS,PLANOCORTE,POSICAO,ATIVIDADE,DSCATIVIDADE,NOMEENTREGUE,NOMERETIRADA,DATAENTREGUE,DATARETIRADA FROM ESTOQUECD "+
        "   WHERE OS ='"+numOS+"' "+
        "   AND PLANOCORTE='"+numplanocorte+"' "
   }
                    
    log.info("QUERY dsConsultaKitsCD: " + myQuery);

    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsConsultaKitsCD.addColumn(rs.getMetaData().getColumnName(i));
                	
                }
                
                created = true;
                
            }
            
            var Arr = new Array();
            
            for (var i = 1; i <= columnCount; i++) {
            	
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                
                if (null != obj) {
                	
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                    
                } else {
                	
                    Arr[i - 1] = "null";
                    
                }
                
            }
            
            dsConsultaKitsCD.addRow(Arr);
            
        }
        
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

    return dsConsultaKitsCD

}	

