angular.module("jaborandi", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ionicLazyLoad","jaborandi.controllers", "jaborandi.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Jaborandi" ;
		$rootScope.appLogo = "" ;
		$rootScope.appVersion = "0.1" ;
		$rootScope.headerShrink = false ;

		$rootScope.liveStatus = "pause" ;
		$ionicPlatform.ready(function(){
			$rootScope.liveStatus = "run" ;
		});
		$ionicPlatform.on("pause",function(){
			$rootScope.liveStatus = "pause" ;
		});
		$ionicPlatform.on("resume",function(){
			$rootScope.liveStatus = "run" ;
		});


		$rootScope.hide_menu_inicio = false ;
		$rootScope.hide_menu_servicos = false ;
		$rootScope.hide_menu_empregos = false ;
		$rootScope.hide_menu_solucoes = false ;
		$rootScope.hide_menu_onibus = false ;
		$rootScope.hide_menu_telefones = false ;
		$rootScope.hide_menu_informacoes = false ;
		$rootScope.hide_menu_noticias = false ;
		$rootScope.hide_menu_eventos = false ;
		$rootScope.hide_menu_secretarias = false ;
		$rootScope.hide_menu_diario = false ;
		$rootScope.hide_menu_contato = false ;
		$rootScope.hide_menu_sobre = false ;
		$rootScope.hide_menu_imoveis = false ;


		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "jaborandi",
				storeName : "jaborandi",
				description : "The offline datastore for Jaborandi app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			//required: cordova plugin add cordova-plugin-network-information --save
			$interval(function(){
				if ( typeof navigator == "object" && typeof navigator.connection != "undefined"){
					var networkState = navigator.connection.type;
					$rootScope.is_online = true ;
					if (networkState == "none") {
						$rootScope.is_online = false ;
						$window.location = "retry.html";
					}
				}
			}, 5000);

			//required: cordova plugin add onesignal-cordova-plugin --save
			if(window.plugins && window.plugins.OneSignal){
				window.plugins.OneSignal.enableNotificationsWhenActive(true);
				var notificationOpenedCallback = function(jsonData){
					try {
						$timeout(function(){
							$window.location = "#/jaborandi/" + jsonData.notification.payload.additionalData.page ;
						},200);
					} catch(e){
						console.log("onesignal:" + e);
					}
				}
				window.plugins.OneSignal.startInit("1d8bd600-8bc4-40f4-88fb-8192519e8bf7").handleNotificationOpened(notificationOpenedCallback).endInit();
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("jaborandi.inicio");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("pt-br");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("pt-br");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?mabus\.com\.br/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?imprensaoficialmunicipal\.com\.br/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("jaborandi",{
		url: "/jaborandi",
			abstract: true,
			templateUrl: "templates/jaborandi-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("jaborandi.about_us", {
		url: "/about_us",
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.contato", {
		url: "/contato",
		cache:true,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-contato.html",
						controller: "contatoCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.cursos", {
		url: "/cursos",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-cursos.html",
						controller: "cursosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.cursos_singles", {
		url: "/cursos_singles/:id",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-cursos_singles.html",
						controller: "cursos_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.dashboard", {
		url: "/dashboard",
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.diario", {
		url: "/diario",
		cache:true,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-diario.html",
						controller: "diarioCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.empregos", {
		url: "/empregos",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-empregos.html",
						controller: "empregosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.empregos_singles", {
		url: "/empregos_singles/:id",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-empregos_singles.html",
						controller: "empregos_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.eventos", {
		url: "/eventos",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-eventos.html",
						controller: "eventosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.eventos_singles", {
		url: "/eventos_singles/:id",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-eventos_singles.html",
						controller: "eventos_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.imoveis", {
		url: "/imoveis",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-imoveis.html",
						controller: "imoveisCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.imoveis_singles", {
		url: "/imoveis_singles/:id",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-imoveis_singles.html",
						controller: "imoveis_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.inicio", {
		url: "/inicio",
		cache:true,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-inicio.html",
						controller: "inicioCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.noticias", {
		url: "/noticias",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-noticias.html",
						controller: "noticiasCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.noticias_singles", {
		url: "/noticias_singles/:id",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-noticias_singles.html",
						controller: "noticias_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.onibus", {
		url: "/onibus",
		cache:true,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-onibus.html",
						controller: "onibusCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.secretarias", {
		url: "/secretarias",
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-secretarias.html",
						controller: "secretariasCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.sobre", {
		url: "/sobre",
		cache:false,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-sobre.html",
						controller: "sobreCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.solucoes", {
		url: "/solucoes",
		cache:true,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-solucoes.html",
						controller: "solucoesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("jaborandi.telefones", {
		url: "/telefones",
		cache:true,
		views: {
			"jaborandi-side_menus" : {
						templateUrl:"templates/jaborandi-telefones.html",
						controller: "telefonesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/jaborandi/inicio");
});
