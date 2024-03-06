<meta name="viewport" content="width=device-width, initial-scale=1.0">
<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide montserrat-font App flex-column" data-params="MyWidget.instance()">
    <div id="telaInicial" class="screen">
        <nav class="navbar animate">
            <div class="container-fluid" style="justify-content:space-around;">
                <a href="/delp5031:8080/portal/" class="navbar-order ">
                    <img class="icon-navbar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1klEQVR4nO3Yu0rEUBCA4UHfaktRWbXTVWy0VPGhtXEbwUIWL+Dlk1OJSxYExTiH+Z4gP0kmcxJRSimllFLKX8EMt7jHSWSEY7z61GLWIxMc4sVXd1iLLHAwENHuzFFkgV08L0W84TSywM5AxDvOIgtM8TQQcR5ZYHtFxEVkga0VEZeRBTbxmD1iAw/Gc92Gy08jJlgY302F/KNH66qN/PgNXbzsXY3frj6IXa0oXS2NXa3x3zhYzSIbw0fdeXTy82EeWWG/BbS9CHtjX08ppZRSSimx7AOxXwwKTXfxtgAAAABJRU5ErkJggg==">
                    <p class="navbar-title">
                        Voltar
                    </p>
                </a>
                <div class="d-flex align-items-center">
                    <a class="navbar-brand" href="/delp5031:8080/portal/">
                        <div class="navbar-logo"></div>
                    </a>
                </div>
            </div>
        </nav>
        <div class="container App-body">
            <section class="row justify-content-center " style="display:flex;height: 100%;">
                <div class="col-2 animate">
                </div>
                <div class="col-8 animate d-flex align-items-center justify-content-center h-full">
                    <section class="menu">
                        <p class="form-title">
                            Centro de distribuição
                        </p>
                        <button data-related-div="telaEntrada" href="#" class="btn btn-primary custom-menu-btn btn1">
                            <img class="btn-icon" src="data:image/png;base64,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">
                            Entrada de peças
                        </button>
                        <button data-related-div="telaSaida" href="#" class="btn btn-primary custom-menu-btn btn2" >
                            <img class="btn-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADNklEQVR4nO2aPWgUURDHN4Y7FQIhoqBGjIURIZXaRFAiYmtpYWFKESLYCFaKaGFs0gteikCaWKYRYoxFtBARiSABwcbCiB9w4kcwiT+ZOJvMbd6du3sve3ewf1iyvN35evN/M+/2JQhy5GgtAL3ALeCdXnLfG7QCgE5gEJgC/uDGC+AKsDNoJgAF4CzwAFg0Dn8DRoFTeo3qWIhFlRHZQiMD6AOGgQXj3AowC1wEOhwy24BzwCSwZOS+AveAE1k5v0dp8TJClzfATeBAAl17femKhSxmMU12YwM4po6WI7ye1MC88xpoB84AY8APY/cnMKHP2uIqKwLPI+l+BlwCunw7X8OPLrUpti3Et61xFNxohpJJ7VJ+PU4T+6WCQ1oyy1mVTKqX8rL6MqS+iY+HaimS6AWlZl3sQEmfP3GuF02j4DOwK4Pym0oXsAP4qO9eqPVwsAEN8UuS7FI56evr1qRrOnZ528jrCQevRe+AXiXHeptIs96ANuBRxTIATuoCEsWHkyhs5KaRysJ0WgZeq4EZoVg9yh2GJMMhpn1u4/m3HMRnwVygnLYdVChw1IMhyc4no1vuOz3oPQLcV19DzMqDLdr6ha/LEQrIot2e0uBdB62GU+oqapEI2wNKqSkdb3fRYSRi/IP+uutOYLjH8NcalrGeBHq61bb4YDESi6ZGYM7cL2nWBmLIj6tM+Nfej8eQH1Bbv12+xJ2ItUDMLngsonReK09HFQ6vhLNvZPbpjlYyc7xKjxkEXhmZZe05q7veugIxY7uBa8B7Y6isjazPvBdWqjuOSZEGiu5oV/sVcFDHpSmGWNCx/f/zK3EgkYV3PlLtZJYfKp8rKlQkEFvJbquMZC/ErOouJvUrcSAOGklGvlOJoWq6gMuRd8MO3+/Lr9QC2pyu6tp5bLccjkAK+s68ysRuwmx2IE2rizyQjcgz4kBOrcADcmo5kFMr8ICcWj6p5eO4zEdGWD/GSxyIfMWzeJr2I3baQFj/iC22LWYacqyQJBB8His4lNf17TdOIJt60OPre221QDI/eqt3Fm0gTXMYmvJMI0SmZy1Bht9+nUcXTQdT+9/q1Tr/wpEjR7CGv8CyXqVfaDnnAAAAAElFTkSuQmCC">
                            Saida de peças
                        </button>
                        <button data-related-div="telaConsulta" href="#" class="btn btn-primary custom-menu-btn btn3" >
                            <img class="btn-icon" src="data:image/png;base64,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">
                            Histórico de movientações
                        </button>
                    </section>
                </div>
                <div class="col-2 animate">
                </div>
            </section>
        </div>
    </div>
    <div id="fakeRouter" hidden>
        <nav class="navbar operational-navbar">
            <div class="container-operacional">
                <button id="voltaMenu" data-related-div="telaInicial" href="#" class="btn btn-primary custom-menu-btn-operacional">
                    <img class="btn-icon-operacional" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADyUlEQVR4nO2YX4/VRBiH58LEi1URRAQFJXrhF5B4QZSAyIZVEdjoGlQioGTXsIrrZs2iRwVBNP6PX2uT3dPOtJ1pT6fT9sxM27N7zjc45g3nJLhZ28QL857EJ2nSy9+vnZn2eQn5n3/H+vr64Y2NjWkyibiue4gxdtd13T8dxzlLJglK6dOU0juMsd8opX+MSpwkk0AYhvDkb3qe9xNj7JdxCbjW1tYOEMwIIQ4GQdDyff+u53k/bi/hOM45ghXO+VNhGK4GQfBdEAR3dirhuu4CwRpeCLESBME3nPObNSUuE2z4vv9kGIZLnPMvhRCthhIvE0x4nncgjuNFIcQXsHzqSvi+f0MI8SDBgpRyv5RyodPpLMVxvNxQotVutw8SLGitH0+S5KM4jj+RUl6vKxGG4SqcTgQL3W53b5qml6SUHydJcq2hxApscIKFIAj2JknyvlLqqlJqvqHEEqrweZ4/JqW8kKbp5SRJPmwosQinE8FCmqZ78jx/O8uyi0qpDxpKLMDpRLCglNqttT6fpumFLMveqysRx/FVOJ0IFvr9/qPGmDeMMW/lef5OXQm473Q6TxAsbG1t7dJaz1hrz2mtZ+tKKKUuRlG0j2Ch0+nsKoriFDx9a+2bdSXgHr4LBAu9Xu+RqqpOlGV5uizL1+pKKKXm4LtAsFBV1cNlWR6z1r5aFMV0XYksy2bhaCVYKIrioaIojlZVdbyqqlfqSlhrzwwGgz0EC8PhcKrX671YluVL8AbqSpRlOTMYDHYTTBhjpqqqOrK5uXm0rgQUcF13xff9wwQbpqFElmUzjuN8DRMG13V/YIw9QyalRLfbPUUpbUF4SunvjLFfKaW3YXxCsJcwxpxwHOdv4RljP480Ef73DxGsJbTWx9rt9lc7hQdNDILgNuf8Biphuf9YdRzn84bwtzjn36ITl23zze8bwrfAvkBgUDnAGJBxxtithvCrURSthGG4mCQJHhcYA8sDJgsN4ZellJ9JKedROcEYWB6c89W68HEcfwo6CY6Ayg3GgCpyzpfrwoOZwVsAV0DlCGNgeURRdL0hPBjalTRN3xVC4HGFMbA8wjC81hD+0sja5lA5w7bR4nxdeLC29J6xnUf3BwtQSvfDhq0Lb4yZAwECvx4Ohw8QbBhj9o3kvi78rLX2rFLqOYIRkHrYsHXhrbVntNYvEKzARoUN+0/hjTGva62PEMyA5MOG3Sl8WZanq6p6nmAHZB9Cbw9f3JszTZFJAI7MkUOPw09rrfEpaNNo0lp7EsJba58lkwiU6Pf7+CYY/zV/AS0J91X5KdarAAAAAElFTkSuQmCC">
                    Voltar
                </button>
                <div>
                    <p id="navbar-logo-texto">
                    </p>
                </div>
                <div class="navbar-logo-operacional"></div>
            </div>
        </nav>
        <div id="telaEntrada" class="screen screen-hold">
            <section class="container custom-card">
                <div class="row">
                    <div> 
                        <div class="flex-row w-full around">
                            <div class="form-size">
                                <label class="info">Projeto</label>
                                <div id="PROJETO_fluigFilter" class="fluig-filter">
                                    <div class="input-group fs-full-width">
                                        <input id="NUM_OS" type="text" name="NUM_OS" />
                                        <input id="CODFILIAL" name="CODFILIAL" hidden />
                                        <input id="CODCOLIGADA" name="CODCOLIGADA" hidden />
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-size">
                                <label class="info">Plano de Corte</label>
                                <div id="PLANOCORTE_fluigFilter" class="fluig-filter">
                                    <div class="input-group fs-full-width">
                                        <input id="NUMPLANOCORTE" type="text" name="NUMPLANOCORTE" />
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-add-form" onclick="preencheTabela()">Buscar Kits</button>
                        </div>
                        <div id="tabelaEntrada" class="tabelaEntrada" style="height:300px;overflow-x:auto;"></div>
                        <nav>
                        <div class="flex-col center" style="margin-top:10px">
                            <div class="flex-row w-full h-full around ninjaOculto" id="opcoesExtra" name="opcoesExtra">
                                <div class="form-size">
                                    <label class="info">Entregue por *</label>
                                    <div class="input-group fs-full-width">
                                        <input class="form-control  w-full" id="adicionaEntregue" name="adicionaEntregue" />
                                    </div>
                                </div>
                                <div class="form-size">
                                    <label class="info">Recebido por *</label>
                                    <div class="input-group fs-full-width">
                                        <input class="form-control  w-full" id="adicionaRecebido" name="adicionaRecebido" />
                                    </div>
                                </div>
                                <button class="btn btn-primary btn-add-form" onclick="adicionaEntrada()" id="adicionaTabela"> Adicionar Entrada</button>
                            </div>
                        </div>
                    </nav>
                    </div>
                </div>
        </div>
        </section>
        <div id="telaSaida" class="screen screen-hold">
        <section class="container custom-card">
            <div class="row">
                <div>
                    <div id="tabelaEntrada" class="tabelaEntrada"></div>
                    <div class="flex-row w-full around center">
                        <div class="form-size">
                            <label class="info">Projeto</label>
                            <div id="PROJETO_fluigFilter" class="fluig-filter">
                                <div class="input-group fs-full-width">
                                    <input id="NUM_OS_SAIDA" type="text" name="NUM_OS_SAIDA" />
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                        <div class="form-size">
                            <label class="info">Plano de Corte</label>
                            <div id="PLANOCORTE_fluigFilter" class="fluig-filter">
                                <div class="input-group fs-full-width">
                                    <input id="NUMPLANOCORTE_SAIDA" type="text" name="NUMPLANOCORTE_SAIDA" />
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-add-form" onclick="preencheTabelaSaida()" >Buscar Peças</button>
                    </div>
                </div>
                <div style="margin-top:25px;">
                <div id="tabelaSaida" class="tabelaSaida" style="height:300px;overflow-x:auto;overflow-y:auto;"></div>
                    <div class="flex-row w-full around ninjaOculto"  id="opcoesExtra2" name="opcoesExtra2" style="margin-top:10px">
                                <div class="form-size">
                                    <label class="info">Entregue por *</label>
                                    <div class="input-group fs-full-width">
                                        <input class="form-control  w-full" id="saidaEntregue" name="saidaEntregue" required />
                                    </div>
                                </div>
                                <div class="form-size">
                                    <label class="info">Recebido por *</label>
                                    <div class="input-group fs-full-width">
                                        <input class="form-control  w-full" id="saidaRecebido" name="saidaRecebido" required />
                                    </div>
                                </div>
                      <button class="btn btn-primary btn-add-form" onclick="registrarSaida()"  id="registraSaida">Registrar Saída</button>
                    </div>
                </div>
            </div>
    </div>
    </section>
        <div id="telaConsulta" class="screen screen-hold">
    <section class="container custom-card">
        <div class="row">
            <div>
                <div class="flex-row w-full around">
                    <div class="form-size">
                        <label class="info">Projeto</label>
                        <div id="PROJETO_fluigFilter" class="fluig-filter">
                            <div class="input-group fs-full-width">
                                <input id="NUM_OS_CONSULTA" type="text" name="NUM_OS_CONSULTA" />
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div class="form-size">
                        <label class="info">Plano de Corte</label>
                        <div id="PLANOCORTE_fluigFilter" class="fluig-filter">
                            <div class="input-group fs-full-width">
                                <input id="NUMPLANOCORTE_CONSULTA" type="text" name="NUMPLANOCORTE_CONSULTA" />
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-add-form" onclick="consultaTabela()" id="consultarKit" >Consultar Kits</button>
                </div>   
            </div>
            <div style="margin-top:10px;">
                <div id="tabelaConsulta" class="tabelaConsulta" style="height:500px;overflow-x:auto;overflow-y:auto;"></div>            
            </div>
        </div>
</div>
    </div>
    
</div>

</section>
</div>
</div>
</div>
</div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,400;0,500;1,700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js"></script>
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<link rel="stylesheet" type="text/css" href="/style-guide/css/fluig-style-guide-filter.min.css">
<script src="/style-guide/js/fluig-style-guide-filter.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.4/xlsx.full.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css">
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css">
<script src="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js"></script>
