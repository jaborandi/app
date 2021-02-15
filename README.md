# Aplicativo oficial de Jaborandi-SP
![licença](https://img.shields.io/badge/Licen%C3%A7a-GPLv3-green)  ![framework](https://img.shields.io/badge/Framework-AngularJS-blue)  ![backend](https://img.shields.io/badge/Backend-WordPress-blue)

Aplicativo híbrido desenvolvido com Cordova e utilizando backend em Wordpress. O aplicativo conta com diversas funcionalidades como sistema de notificações, armazenamento sqlite e templates para tratamento de dados. A lista completa de plugins e instruções para compilação do aplicativo estão disponíveis neste markdown.


# Screenshots

![prints de algumas telas do app](https://i.imgur.com/4JtuGlP.png)
[Clique aqui para baixar o aplicativo na loja de apps](https://play.google.com/store/apps/details?id=br.gov.sp.jaborandiapp)
## Funcionalidades

 - Listagem para vagas de emprego e cursos, contendo botão para compartilhar, botão para se inscrever (redireciona para um formulário), imagem destacada, datas relevantes, descrição (campo HTML livre) e localização.
 - Listagem para imóveis disponíveis para locação ou venda na cidade, contendo: Slider fullsize, descrição (campo HTML livre), localização, botão de falar com proprietário, botão de compartilhar e botão de abrir no Maps.
 - Listagem para notícias contendo: imagem destacada, título, descrição (campo HTML livre), data e botão de compartilhar.
 - Listagem para eventos contendo: título, descrição (campo HTML livre), local e data.
 - WebViews: Central de Soluções, Horários de Ônibus, Telefones Úteis e Contato.
 - Página informativa sobre o aplicativo, contendo: redes sociais, meios de contato e link para este repositório.


# Como criar seu próprio app usando este código

Você precisará ter uma instalação ativa do  **[WordPress](https://wordpress.org)** em uma hospedagem ou um servidor com acesso global. No seu computador instale [NodeJS](https://nodejs.org/en/download/), [Cordova](https://cordova.apache.org), e o SDK que pretende lançar seu app, seja ele [Android](https://developer.android.com/studio?hl=pt-br) ou [iOS](https://apps.apple.com/br/app/xcode/id497799835?mt=12).




## Plugins necessários no wordpress

Abaixo uma lista dos plugins que deverão constar no seu wordpress.

|      PLUGIN          |FUNÇÃO                          
|----------------|-------------------------------
|[WP REST API](https://br.wordpress.org/plugins/rest-api/)|Habilitar a rest-api json v2 do wordpress
|[Very Simple Event List](https://br.wordpress.org/plugins/very-simple-event-list/)          |Listagem para eventos       
|[WP Job Manager](https://br.wordpress.org/plugins/wp-job-manager/)          |Listagem para empregos e cursos
|[REST API Helper](https://br.wordpress.org/plugins/rest-api-helper/)          |Reconstrutor de conteúdos lançados pela rest-api


## Editando o aplicativo

Após instalar todos os plugins, navegue até www/js/controllers.js e altere todos os lugares com "https://seusite.com.br/" pelo site onde sua instalação do Wordpress se encontra.

> Dica: Utilize Ctrl+H para localizar e substituir em massa.

Na pasta de templates (**www/templates/**), os arquivos jaborandi-contato, jaborandi-onibus, jaborandi-solucoes e jaborandi-telefones são **webviews**, portanto você deve alterar a URL para a desejada. Dentro desses arquivos você observará um iframe, basta trocar a URL.
Caso deseje remover alguns desses menus, basta editar o html no arquivo jaborandi-inicio.

O aplicativo também conta com sistema de notificações integrado ao onesignal, para utilizá-lo basta editar o arquivo www/js/app.js na linha 86, substituindo a expressão "AppID do OneSignal" pelo seu AppID.

## Construindo o aplicativo

Utilizando o nodejs command prompt, insira estes comandos:

    cordova create {nome do projeto} "{nome do pacote, ex: com.exemplo.app}" "{Nome do APP}"
    cd {nome do projeto}

   Instale todos os plugins necessários:


    cordova plugin add cordova-plugin-device --save
    cordova plugin add cordova-plugin-console --save
    cordova plugin add cordova-plugin-splashscreen --save
    cordova plugin add cordova-plugin-statusbar --save
    cordova plugin add cordova-plugin-whitelist --save
    cordova plugin add ionic-plugin-keyboard --save
    cordova plugin add cordova-plugin-dialogs --save
    cordova plugin add cordova-plugin-inappbrowser --save
    cordova plugin add cordova-plugin-network-information --save
    cordova plugin add onesignal-cordova-plugin --save
  Agora, clone o repositório oficial do aplicativo e substitua todos os arquivos. Acesse o arquivo "config.xml" no diretório raíz e altere, na segunda linha, o "id" do seu app (atualmente definido como br.gov.sp.jaborandiapp).
Após isso, basta buildar seu aplicativo e abrir o projeto com a respectiva IDE de sua plataforma alvo.


Para criar um app Android:

      cordova platform add android@latest
      cordova build android
Para criar um app iOS:

     cordova platform add ios    
     sudo npm install --global --unsafe-perm ios-deploy
     cordova build ios

 

​    

## Contribua com o projeto

Este projeto é uma iniciativa totalmente opensource totalmente e gratuita, contribuidores e ideias são muito bem vindas!
Forneceremos o apoio e documentação necessária para que você possa contribuir com esse projeto.

![Licença GPL v3](https://www.gnu.org/graphics/gplv3-with-text-136x68.png)