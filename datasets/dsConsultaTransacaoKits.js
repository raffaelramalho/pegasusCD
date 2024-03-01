function createDataset(fields, constraints, sortFields) {
    var dsConsultaTransacaoKitsCD = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

    var numOS = ""
    var numplanocorte = ""
    var myQuery = ""

    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        	
        	}
            if(constraints[i].fieldName == "NUMPLANOCORTE"){
        		
        		numplanocorte = constraints[i].initialValue;
        		
        	}

        }

        myQuery     =   "   select * FROM TRANSACAOCD "+
                        "   WHERE OS = '"+numOS+"' "+
                        "   AND PLANOCORTE = '"+numplanocorte+"' "
        
        log.info("QUERY dsConsultaTransacaoKitsCD: " + myQuery);

    } else {

        myQuery     =   "   select * FROM TRANSACAOCD "
        
        log.info("QUERY dsConsultaTransacaoKitsCD: " + myQuery);
    }

   

    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsConsultaTransacaoKitsCD.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsConsultaTransacaoKitsCD.addRow(Arr);
            
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

    return dsConsultaTransacaoKitsCD

}	