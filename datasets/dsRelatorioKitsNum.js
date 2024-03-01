function createDataset(fields, constraints, sortFields) {
    var dsRelatorioKitsNum = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

    var numOS = ""
    var codfilial = ""
    var codcoligada = ""
    var numplanocorte = ""


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

    var myQuery =   "   SELECT NSEQPLANOCORTE,ZP.QUANTIDADE,KO.CODCCUSTO,ZP.CODORDEM,ZEX.NUMDESENHO,ZEX.DESCRICAO,ZEX.POSICAODESENHO,CAST(ZEX.BITOLA AS VARCHAR) + ' x ' + CAST(ZEX.COMPRIMENTO AS VARCHAR) + ' x ' + CAST(ZEX.LARGURA AS VARCHAR) AS DIMENSOES,KAT.CODATIVIDADE,ZP.NUMPLANOCORTE,KAV.DSCATIVIDADE FROM KITEMORDEM AS KO "+
    "                   INNER JOIN  ZMDPLANOAPROVEITAMENTOCORTE  AS ZP ON    "+
    "                   ZP.CODCOLIGADA=KO.CODCOLIGADA AND  "+
    "                   ZP.CODFILIAL=KO.CODFILIAL AND  "+
    "                   ZP.CODORDEM=KO.CODORDEM   "+
    "					INNER JOIN KORDEM AS KOR ON "+
    "					ZP.CODCOLIGADA = KOR.CODCOLIGADA "+
    "					AND ZP.CODFILIAL = KOR.CODFILIAL "+
    "					AND ZP.CODORDEM = KOR.CODORDEM "+
    "					INNER JOIN KORDEMCOMPL AS KPL ON "+
    "					ZP.CODCOLIGADA = KPL.CODCOLIGADA "+
    "					AND ZP.CODFILIAL = KPL.CODFILIAL "+
    "					AND ZP.CODORDEM = KPL.CODORDEM "+
    "					INNER JOIN FLUIG.dbo.Z_CRM_EX001005 AS ZEX ON "+
    "					ZP.CODCOLIGADA =  ZEX.CODCOLIGADA "+
    "					AND ZP.CODFILIAL = ZEX.CODFILIAL "+
    "					AND KO.CODESTRUTURA =  ZEX.CODIGOPRD COLLATE SQL_Latin1_General_CP1_CI_AI "+
    "					AND KO.CODCCUSTO = ZEX.OS COLLATE SQL_Latin1_General_CP1_CI_AI "+
    "					AND KPL.NUMEXEC = ZEX.EXECUCAO "+
    "					INNER JOIN KATVORDEM AS KAT ON  "+
    "					ZP.CODCOLIGADA=KAT.CODCOLIGADA AND  "+
    "                   ZP.CODFILIAL=KAT.CODFILIAL AND  "+
    "                   ZP.CODORDEM=KAT.CODORDEM AND "+
    "					ZP.CODESTRUTURA=KAT.CODESTRUTURA AND "+
    "					ZP.CODATIVIDADE=KAT.CODATIVIDADE AND  "+
    "					KO.CODMODELO=KAT.CODMODELO "+
    "					INNER JOIN KATIVIDADE AS KAV ON "+
    "					ZP.CODCOLIGADA=KAV.CODCOLIGADA AND  "+
    "                   ZP.CODFILIAL=KAV.CODFILIAL AND  "+
    "                   KAT.CODATIVIDADE = KAV.CODATIVIDADE "+
    "                   WHERE  "+
    "                   KO.CODCCUSTO ='"+numOS+"' "+
    "                   AND ZP.CODFILIAL="+codfilial+"  "+
    "                   AND ZP.CODCOLIGADA = "+codcoligada+" "+
    "                   AND ZP.NUMPLANOCORTE = '"+numplanocorte+"' "
    log.info("QUERY dsRelatorioKitsNum: " + myQuery);

    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsRelatorioKitsNum.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsRelatorioKitsNum.addRow(Arr);
            
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

    return dsRelatorioKitsNum

}	