// BUSCA TODOS OS PROJETOS (OS) CADASTRADOS NO RM
function createDataset(fields, constraints, sortFields) {

	var dsConsultaPermissao = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var login = ""
    var grupo = ""
    var grupo2 = ""

    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "LOGIN"){
        		
        		login = constraints[i].initialValue;
        	
        	}
            if(constraints[i].fieldName == "GROUPCODE"){
        		
        		grupo = constraints[i].initialValue;
        	
        	}
            if(constraints[i].fieldName == "GROUPCODEALT"){
        		
        		grupo2 = constraints[i].initialValue;
        	
        	}
        }
        
    }


    var myQuery =   " DECLARE @UserLogin NVARCHAR(50) = '"+login+"'; "+
                    " DECLARE @GroupCode1 NVARCHAR(50) = '"+grupo+"'; "+
                    " DECLARE @GroupCode2 NVARCHAR(50) = '"+grupo2+"'; "+
                    " IF EXISTS (SELECT 1 FROM FDN_GROUPUSERROLE WHERE login = @UserLogin AND GROUP_CODE = @GroupCode1) "+
                    " BEGIN "+
                    "     SELECT * "+
                    "     FROM FDN_GROUPUSERROLE "+
                    "     WHERE login = @UserLogin AND GROUP_CODE = @GroupCode1; "+
                    " END "+
                    " ELSE "+
                    " BEGIN "+
                    "     SELECT * "+
                    "     FROM FDN_GROUPUSERROLE "+
                    "     WHERE login = @UserLogin AND GROUP_CODE = @GroupCode2; "+
                    " END ";
        
    log.info("QUERY dsConsultaPermissao: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsConsultaPermissao.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsConsultaPermissao.addRow(Arr);
            
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
    
    return dsConsultaPermissao;
	
}