function createDataset(fields, constraints, sortFields) {
    var dsConsultaKitsCD = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
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
        myQuery =    " DECLARE @Os NVARCHAR(50) = '"+numOS+"' "+
                    " DECLARE @plano nvarchar(50) = '"+numplanocorte+"' "+
                    " DECLARE @resultado VARCHAR(MAX); "+
                    " SELECT DISTINCT "+
                    "     Z.FORNPARA, "+
                    "     E.NUMDESENHO, "+
                    "     E.SEQUENCIA, "+
                    "     E.ORDEM, "+
                    "     E.QUANTIDADE, "+
                    "     E.DESCRICAO, "+
                    "     E.DIMENSOES, "+
                    "     E.OS, "+
                    "     E.PLANOCORTE, "+
                    "     E.POSICAO, "+
                    "     E.ATIVIDADE, "+
                    "     ( "+
                    "         SELECT STUFF(( "+
                    "                 SELECT ', ' + Z2.DESCATIVIDADE "+
                    "                 FROM Z_CRM_EX001021 AS Z2 "+
                    "                 INNER JOIN ESTOQUECD AS E2 ON Z2.OSPROCESSO = E2.OS COLLATE SQL_Latin1_General_CP1_CI_AI "+
                    "                 INNER JOIN Z_CRM_EX001005 AS ZZ2 ON ZZ2.OS = Z2.OSPROCESSO AND ZZ2.IDCRIACAO = Z2.IDCRIACAOPROCESSO "+
                    "                 INNER JOIN Z_CRM_EX001005COMPL AS ZCM2 ON ZCM2.OS = ZZ2.OS AND ZCM2.CODFILIAL = ZZ2.CODFILIAL  "+
                    "                     AND ZCM2.CODCOLIGADA = ZZ2.CODCOLIGADA AND Z2.EXECUCAO = ZCM2.EXECUCAO AND ZZ2.EXECUCAO = ZCM2.EXECUCAO  "+
                    "                     AND ZCM2.IDCRIACAO = Z2.IDCRIACAOPROCESSO AND ZCM2.CODORDEM = E2.ORDEM COLLATE SQL_Latin1_General_CP1_CI_AI "+
                    "                 INNER JOIN CORPORE_DEV.dbo.KATIVIDADE AS KAT2 ON KAT2.CODATIVIDADE = E2.ATIVIDADE COLLATE SQL_Latin1_General_CP1_CI_AI  "+
                    "                     AND KAT2.CODCOLIGADA = ZZ2.CODCOLIGADA AND KAT2.CODFILIAL = ZZ2.CODFILIAL "+
                    "                 WHERE Z2.OSPROCESSO = @Os "+
                    "                     AND ZZ2.NUMDESENHO = E.NUMDESENHO "+
                    "                     AND ZCM2.CODORDEM = E.ORDEM COLLATE SQL_Latin1_General_CP1_CI_AI "+
                    "                 FOR XML PATH('')), 1, 1, '') "+
                    "     ) AS DESCATIVIDADES, "+
                    "     E.NOMEENTREGUE, "+
                    "     E.NOMERETIRADA, "+
                    "     E.DATAENTREGUE, "+
                    "     E.DATARETIRADA  "+
                    " FROM "+
                    "     ESTOQUECD E "+
                    "     INNER JOIN Z_CRM_EX001005COMPL ZL ON E.ORDEM = ZL.CODORDEM COLLATE SQL_Latin1_General_CP1_CI_AI "+
                    "     INNER JOIN Z_CRM_EX001021 Z ON Z.IDCRIACAOPROCESSO = ZL.IDCRIACAO AND Z.EXECUCAO = ZL.EXECUCAO AND Z.OSPROCESSO = ZL.OS "+
                    " WHERE "+
                    "     E.OS = @Os "+
                    " ORDER BY "+
                    "     E.ORDEM, "+
                    "     Z.PRIORIDADE ASC; "
        
   } else {
        myQuery =  " DECLARE @Os NVARCHAR(50) = '"+numOS+"' "+
                    " DECLARE @plano nvarchar(50) = '"+numplanocorte+"' "+
                    " DECLARE @resultado VARCHAR(MAX); "+
                    " SELECT "+
                    "     Z.FORNPARA, "+
                    "     E.NUMDESENHO, "+
                    "     E.SEQUENCIA, "+
                    "     E.ORDEM, "+
                    "     E.QUANTIDADE, "+
                    "     E.DESCRICAO, "+
                    "     E.DIMENSOES, "+
                    "     E.OS, "+
                    "     E.PLANOCORTE, "+
                    "     E.POSICAO, "+
                    "     E.ATIVIDADE, "+
                    "     ( "+
                    "         SELECT STUFF(( "+
                    "                 SELECT ', ' + Z2.DESCATIVIDADE "+
                    "                 FROM Z_CRM_EX001021 AS Z2 "+
                    "                 INNER JOIN ESTOQUECD AS E2 ON Z2.OSPROCESSO = E2.OS COLLATE SQL_Latin1_General_CP1_CI_AI "+
                    "                 INNER JOIN Z_CRM_EX001005 AS ZZ2 ON ZZ2.OS = Z2.OSPROCESSO AND ZZ2.IDCRIACAO = Z2.IDCRIACAOPROCESSO "+
                    "                 INNER JOIN Z_CRM_EX001005COMPL AS ZCM2 ON ZCM2.OS = ZZ2.OS AND ZCM2.CODFILIAL = ZZ2.CODFILIAL  "+
                    "                     AND ZCM2.CODCOLIGADA = ZZ2.CODCOLIGADA AND Z2.EXECUCAO = ZCM2.EXECUCAO AND ZZ2.EXECUCAO = ZCM2.EXECUCAO  "+
                    "                     AND ZCM2.IDCRIACAO = Z2.IDCRIACAOPROCESSO AND ZCM2.CODORDEM = E2.ORDEM COLLATE SQL_Latin1_General_CP1_CI_AI "+
                    "                 INNER JOIN CORPORE_DEV.dbo.KATIVIDADE AS KAT2 ON KAT2.CODATIVIDADE = E2.ATIVIDADE COLLATE SQL_Latin1_General_CP1_CI_AI  "+
                    "                     AND KAT2.CODCOLIGADA = ZZ2.CODCOLIGADA AND KAT2.CODFILIAL = ZZ2.CODFILIAL "+
                    "                 WHERE Z2.OSPROCESSO = @Os "+
                    "                     AND ZZ2.NUMDESENHO = E.NUMDESENHO "+
                    "                     AND ZCM2.CODORDEM = E.ORDEM COLLATE SQL_Latin1_General_CP1_CI_AI "+
                    "                 FOR XML PATH('')), 1, 1, '') "+
                    "     ) AS DESCATIVIDADES, "+
                    "     E.NOMEENTREGUE, "+
                    "     E.NOMERETIRADA, "+
                    "     E.DATAENTREGUE, "+
                    "     E.DATARETIRADA  "+
                    " FROM "+
                    "     ESTOQUECD E "+
                    "     INNER JOIN Z_CRM_EX001005COMPL ZL ON E.ORDEM = ZL.CODORDEM COLLATE SQL_Latin1_General_CP1_CI_AI "+
                    "     INNER JOIN Z_CRM_EX001021 Z ON Z.IDCRIACAOPROCESSO = ZL.IDCRIACAO AND Z.EXECUCAO = ZL.EXECUCAO AND Z.OSPROCESSO = ZL.OS "+
                    " WHERE "+
                    "     E.OS = @Os "+
                    "     AND E.PLANOCORTE = @plano "+
                    " ORDER BY "+
                    "     E.ORDEM, "+
                    "     Z.PRIORIDADE ASC; "
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

