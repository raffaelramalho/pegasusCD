// BUSCA TODOS OS PROJETOS (OS) CADASTRADOS NO RM
function createDataset(fields, constraints, sortFields) {

	var dsOSEstrutura = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var myQuery = "SELECT CONCAT(CODPRJ,' - ',DESCRICAO) AS OS, CODPRJ, IDPRJ, DESCRICAO, CODCOLIGADA, CODFILIAL FROM MPRJ WHERE CODCOLIGADA=1 AND CODCCUSTO=CODPRJ AND POSICAO IN(1,4) ";
        
    log.info("QUERY dsOSEstrutura: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsOSEstrutura.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsOSEstrutura.addRow(Arr);
            
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
    
    return dsOSEstrutura;
	
}