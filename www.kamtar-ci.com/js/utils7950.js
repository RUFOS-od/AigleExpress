function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split("&"),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split("=");
		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}

/**
 * Gestion des erreurs de l'api
 */
function handle_ajax_error(textStatus, xhr, div_errors, div_errors_content) {
	$("#" + div_errors).show(0);
	var erreurs = "";
	if (textStatus === "timeout") {
		erreurs = "Veuillez vérifier votre connexion internet.";
	} else if (xhr.readyState == "0") {
		erreurs = "Le serveur est injoignable. Veuillez réessayer dans quelques secondes.";
		if (xhr.statusText != undefined && xhr.statusText != "") {
			erreurs = erreurs + "<br />" + xhr.statusText;
		}
	} else if (xhr.status == 403) {
		// message par défaut
		erreurs = "Vous n'êtes pas autorisé à effectuer cette opération";
		// va chercher le message spécifique si il existe
		try {
			var json = JSON.parse(xhr.responseText);
			if (json != undefined) {
				erreurs = json.message;
			}
		} catch (e) {}
	} else if (xhr.status == 400 || xhr.status == 404 || xhr.status == 406) {
		try {
			var json = JSON.parse(xhr.responseText);
			if (json.message != undefined && json.errors == undefined) {
				erreurs = erreurs + json.message + "<br />";
			} else {
				$.each(json.errors, function (index, value) {
					//console.log("value :", value);
					//console.log("value.defaultMessage :", value.defaultMessage);

					erreurs = erreurs + value.defaultMessage + "<br />";
				});
			}
		} catch (e) {}
	} else if (xhr.status != 200) {
		erreurs = xhr.readyState + " - " + xhr.status + " - " + xhr.responseText;
	}
	$("#" + div_errors_content).html(erreurs);
}

/**
 * Gestion des erreurs de l'api V2
 */
function handle_ajax_error2(textStatus, xhr, div_errors, div_errors_content) {
	$("#" + div_errors)
		.fadeIn(300)
		.delay(4000)
		.fadeOut();
	var erreurs = "";
	if (textStatus === "timeout") {
		erreurs = "Veuillez vérifier votre connexion internet.";
	} else if (xhr.readyState == "0") {
		erreurs = "Le serveur est injoignable. Veuillez réessayer dans quelques secondes.";
		if (xhr.statusText != undefined && xhr.statusText != "") {
			erreurs = erreurs + "<br />" + xhr.statusText;
		}
	} else if (xhr.status == 403) {
		// message par défaut
		erreurs = "Vous n'êtes pas autorisé à effectuer cette opération";
		// va chercher le message spécifique si il existe
		try {
			var json = JSON.parse(xhr.responseText);
			if (json != undefined) {
				erreurs = json.error.message;
			}
		} catch (e) {}
	} else if (xhr.status == 400 || xhr.status == 404 || xhr.status == 406) {
		try {
			var json = JSON.parse(xhr.responseText);
			if (json.error.message != undefined && json.errors == undefined) {
				erreurs = erreurs + json.error.message + "<br />";
			} else {
				$.each(json.error, function (index, value) {
					//console.log("value :", value);
					//console.log("value.defaultMessage :", value.defaultMessage);

					erreurs = erreurs + value.message + "<br />";
				});
			}
		} catch (e) {}
	} else if (xhr.status != 200) {
		erreurs = xhr.readyState + " - " + xhr.status + " - " + xhr.responseText;
	}
	$("#" + div_errors_content).html(erreurs);
}

/**
 * Nettoyage avant réapple de l'api
 */
function clean_form(div_errors, div_errors_content) {
	$("#div_errors_content").text("");
	$("#div_errors").hide(0);
}

/**
 * Changement de page avec mise à jour du hastag du parent
 * @param {*} url_page
 * @param {*} hashtag_parent
 */
function goto(url_page, hashtag_parent) {
	window.location.href = "./" + url_page;
	top.window.location.href = "page#" + hashtag_parent;
}

function changer_couleur_menu_bas(id_item, dans_iframe) {
	// colore le menu d'en bas du parent
	if (dans_iframe) {
		$(".item", window.parent.document).removeClass("menu_selectionne");
		$("#item_" + id_item, window.parent.document).addClass("menu_selectionne");
	} else {
		$(".item").removeClass("menu_selectionne");
		$("#item_" + id_item).addClass("menu_selectionne");
	}
	return false;
}

function inject_numero_telephone() {
	var host = window.location.hostname;

	// cote d'ivoire
	var numero_telephone_kamtar_ci = "25 22 009 001";
	var zendesk_ci = "https://static.zdassets.com/ekr/snippet.js?key=e3bcd035-04f6-4e76-9d5e-61f7ebb130a7";

	// sénégal
	var numero_telephone_kamtar_sn = "77 356 40 31";
	var zendesk_sn = "https://static.zdassets.com/ekr/snippet.js?key=bf00d91d-ae3e-44c0-a4c4-c9494ed65c89";

	// autre
	var numero_telephone_kamtar_autre = "25 22 009 001";
	var zendesk_autre = "https://static.zdassets.com/ekr/snippet.js?key=e3bcd035-04f6-4e76-9d5e-61f7ebb130a7";

	if (host.indexOf("kamtar-sn") >= 0) {
		$(".numero_telephone_kamtar_pays").html(numero_telephone_kamtar_sn);
		$("#appelez_bouton").prop("value", "Appelez le " + numero_telephone_kamtar_sn);
		$("#appelez_bouton2").prop("value", "Appelez le " + numero_telephone_kamtar_sn);
		$("#appelez_bouton3").prop("value", "Appelez le " + numero_telephone_kamtar_sn);

		// zendesk
		if ($('[id="ze-snippet"]').length == 0) {
			var head = document.getElementsByTagName("head")[0];
			var js = document.createElement("script");
			js.type = "text/javascript";
			js.id = "ze-snippet";
			js.src = zendesk_sn;
			head.appendChild(js);
		}
	} else if (host.indexOf("kamtar-ci") >= 0) {
		$(".numero_telephone_kamtar_pays").html(numero_telephone_kamtar_ci);
		$("#appelez_bouton").prop("value", "Appelez le " + numero_telephone_kamtar_ci);
		$("#appelez_bouton2").prop("value", "Appelez le " + numero_telephone_kamtar_ci);
		$("#appelez_bouton3").prop("value", "Appelez le " + numero_telephone_kamtar_ci);

		// zendesk
		if ($('[id="ze-snippet"]').length == 0) {
			var head = document.getElementsByTagName("head")[0];
			var js = document.createElement("script");
			js.type = "text/javascript";
			js.id = "ze-snippet";
			js.src = zendesk_ci;
			head.appendChild(js);
		}
	} else {
		$(".numero_telephone_kamtar_pays").html(numero_telephone_kamtar_autre);
		$("#appelez_bouton").prop("value", "Appelez le " + numero_telephone_kamtar_autre);
		$("#appelez_bouton2").prop("value", "Appelez le " + numero_telephone_kamtar_autre);
		$("#appelez_bouton3").prop("value", "Appelez le " + numero_telephone_kamtar_autre);

		// zendesk
		if ($('[id="ze-snippet"]').length == 0) {
			var head = document.getElementsByTagName("head")[0];
			var js = document.createElement("script");
			js.type = "text/javascript";
			js.id = "ze-snippet";
			js.src = zendesk_autre;
			head.appendChild(js);
		}
	}
}

var url_webapp_client = null;
var url_webapp_driver = null;

$(window).on("load", function () {
	console.log("declaration menumaker");
	$.fn.menumaker = function (options) {
		var cssmenu = $(this),
			settings = $.extend(
				{
					title: "",
					format: "dropdown",
					breakpoint: 768,
					sticky: false,
				},
				options
			);

		return this.each(function () {
			cssmenu.find("li ul").parent().addClass("has-sub");
			if (settings.format != "select") {
				cssmenu.prepend('<div id="menu-button">' + settings.title + "</div>");
				$(this)
					.find("#menu-button")
					.on("click", function () {
						$(this).toggleClass("menu-opened");
						var mainmenu = $(this).next("ul");
						if (mainmenu.hasClass("open")) {
							mainmenu.hide().removeClass("open");
						} else {
							mainmenu.show().addClass("open");
							if (settings.format === "dropdown") {
								mainmenu.find("ul").show();
							}
						}
					});

				multiTg = function () {
					cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
					cssmenu.find(".submenu-button").on("click", function () {
						$(this).toggleClass("submenu-opened");
						if ($(this).siblings("ul").hasClass("open")) {
							$(this).siblings("ul").removeClass("open").hide();
						} else {
							$(this).siblings("ul").addClass("open").show();
						}
					});
				};

				if (settings.format === "multitoggle") multiTg();
				else cssmenu.addClass("dropdown");
			} else if (settings.format === "select") {
				cssmenu.append('<select style="width: 100%"/>').addClass("select-list");
				var selectList = cssmenu.find("select");
				selectList.append("<option>" + settings.title + "</option>", {
					selected: "selected",
					value: "",
				});
				cssmenu.find("a").each(function () {
					var element = $(this),
						indentation = "";
					for (i = 1; i < element.parents("ul").length; i++) {
						indentation += "-";
					}
					selectList.append('<option value="' + $(this).attr("href") + '">' + indentation + element.text() + "</option");
				});
				selectList.on("change", function () {
					window.location = $(this).find("option:selected").val();
				});
			}

			if (settings.sticky === true) cssmenu.css("position", "fixed");

			resizeFix = function () {
				if ($(window).width() > settings.breakpoint) {
					cssmenu.find("ul").show();
					cssmenu.removeClass("small-screen");
					if (settings.format === "select") {
						cssmenu.find("select").hide();
					} else {
						cssmenu.find("#menu-button").removeClass("menu-opened");
					}
				}

				if ($(window).width() <= settings.breakpoint && !cssmenu.hasClass("small-screen")) {
					cssmenu.find("ul").hide().removeClass("open");
					cssmenu.addClass("small-screen");
					if (settings.format === "select") {
						cssmenu.find("select").show();
					}
				}
			};
			resizeFix();
			return $(window).on("resize", resizeFix);
		});
	};

	var host = window.location.hostname;
	// affichage du menu en haut
	$.get("/components/menu_top.html", function (response) {
		$("header").html(response);
	});

	if ($.isFunction($.fn.menumaker)) {
		console.log("menumaker dispo");
	} else {
		console.log("menumaker pas dispo");
	}

	// affichage de la navbar en haut
	$.get("/components/navbar.html", function (response) {
		$("#navbar").html(response);
		if ($("#cssmenu").length > 0) {
			$("#cssmenu").menumaker({
				//title: "<a href='/'><img src='/img/logo blanc.png' class='accueil_logo2'></a>",
				format: "multitoggle",
			});
		}

		//affichage ou non de kamtar-kool
		var host = window.location.hostname;

		if (host.indexOf("kamtar-ci") >= 0) {
			$("#kamtar_kool_ci").html("<a id='navbar_kamtar_kool' href='/kamtar-kool'>Kamtar Kool</a>");			
		} 

		if (host.indexOf("kamtar-sn") >= 0) {
			url_webapp_client = "https://transport-client.kamtar-sn.com/";
			url_webapp_driver = "https://transport-driver.kamtar-sn.com/";
			$("#presentation_titre_trajets").text("Trajets simples sur Dakar.");
		} else if (host.indexOf("kamtar-ci") >= 0) {
			url_webapp_client = "https://transport-client.kamtar-ci.com/";
			url_webapp_driver = "https://transport-driver.kamtar-ci.com/";
			$("#presentation_titre_trajets").text("Trajets simples sur Abidjan, à l'intérieur ou l'hinterland.");
		}

		console.log("url_webapp_driver :>> ", url_webapp_driver);
		console.log("url_webapp_client :>> ", url_webapp_client);

		$(".menu_webapp_driver").attr("href", url_webapp_driver);
		$(".menu_webapp_client").attr("href", url_webapp_client);

		// affiche le surlignage en dessous de l'item courante
		var pathname = window.location.pathname;
		if (pathname == "/presentation") {
			$("#navbar_presentation").addClass("underline underline--bacon_blanc");
		} else if (pathname == "/kamtar-kool") {
			$("#navbar_kamtar_kool").addClass("underline underline--bacon_blanc");
		} else if (pathname == "/contact") {
			$("#navbar_contact").addClass("underline underline--bacon_blanc");
		} else if (pathname == "/connexion" || pathname == "/mot_de_passe_oublie") {
			$("#navbar_compte").addClass("underline underline--bacon_blanc");
		} else if (pathname == "/transporteur" || pathname == "/mot_de_passe_oublie") {
			$("#navbar_transporteur").addClass("underline underline--bacon_blanc");
		} else if (pathname == "/equipe" || pathname == "/offres-d-emploi" || pathname == "/espace-candidat") {
			$("#navbar_carriere").addClass("underline underline--bacon_blanc");
		}
	});
	// affichage du footer
	$.get("/components/footer.html", function (response) {
		$("footer").html(response);
		inject_numero_telephone();

		if (host.indexOf("kamtar-sn") >= 0) {
			$(".lien_page_facebook").attr("href", "https://www.facebook.com/kamtar.sn");
			$(".lien_page_twitter").attr("href", "https://twitter.com/Kamtar_sn");
			$(".lien_adresse_email").attr("href", "mailto:sales@kamtar-sn.com");
		} else if (host.indexOf("kamtar-ci") >= 0) {
			$(".lien_page_facebook").attr("href", "https://www.facebook.com/kamtar.ci");
			$(".lien_page_twitter").attr("href", "https://twitter.com/Kamtar_ci");
			$(".lien_adresse_email").attr("href", "mailto:bonjour@kamtar-ci.com");
		}
	});

	// numro de téléphone par pays
	inject_numero_telephone();

	//injection numero de téléphone kamtar_kool
	inject_numero_telephone_kamtar_kool();

	// affichage du body une fois la page chargée
	$("body").show(0);
});

$(document).ready(function () {
	$(document).on("click", ".notification", function () {
		$(this).fadeOut(500);
	});
});

function get_timezone() {
	var current_date = new Date();
	var time_zone = parseInt(-current_date.getTimezoneOffset() / 60);
	return time_zone;
}

/**
 * Déconnexion
 */
$(document).on("click", ".logout", function () {
	Cookies.remove("token");
	window.location.href = "/login";
});

/**
 * Change les picto du menu aun survol de la souris sur le menu desktop
 */
$(".item_menu_desktop")
	.on("mouseover", function () {
		var id = $(this).attr("id").replace("item_", "");

		$(this).addClass("item_selectionne");

		var src = $("#image_" + id).attr("src");
		src = src.replace("Green", "White");

		$("#image_" + id).attr("src", src);
	})
	.on("mouseout", function () {
		var id = $(this).attr("id").replace("item_", "");
		$(this).removeClass("item_selectionne");

		var src = $("#image_" + id).attr("src");
		src = src.replace("White", "Green");

		$("#image_" + id).attr("src", src);
	});

$(document).bind("i18nOK", function () {});
/**
 * Change les picto du menu aun survol de la souris sur le menu mobile
 */
$(".item_menu_mobile ").on("click", function () {
	$(".item_menu_mobile").removeClass("item_selectionne");
	$(".item_menu_mobile > img").each(function () {
		var src = $(this).attr("src");
		src = src.replace("Green", "Black");
		console.log("src :", src);
		$(this).attr("src", src);
	});

	$(this).addClass("item_selectionne");

	var elem = $(this).children("img").eq(0);

	var src = elem.attr("src");
	src = src.replace("Black", "Green");
	console.log("src :", src);
	elem.attr("src", src);
});

function show_message_erreur_http_code(code) {
	if (code != undefined && code != "") {
		$("#erreur_titre").text("Erreur " + code);
		switch (code) {
			case "404":
				$("#div_errors_content").html("Page introuvable");
				break;
			case "403":
				$("#div_errors_content").html("Vous n'avez pas le droit d'accéder à cette page");
				break;
			case "500":
				$("#div_errors_content").html("Un serveur a rencontré un problème");
				break;
			default:
				$("#div_errors_content").html("Une erreur inconnue est survenue");
		}
	}
}

function show_error(div, message) {
	$("#" + div).html(message);
	$("#" + div)
		.parent()
		.show(0);
}

//recupérer le type de contrat
function get_type_contrat(id_type_contrat) {
	var type_contrat = "";
	if (id_type_contrat == 1) {
		type_contrat = "CDI";
	} else if (id_type_contrat == 2) {
		type_contrat = "CDD";
	} else if (id_type_contrat == 3) {
		type_contrat = "Contrat d'apprentissage";
	} else if (id_type_contrat == 4) {
		type_contrat = "Contrat de stage";
	} else if (id_type_contrat == 6) {
		type_contrat = "Contrat de professionnalisation";
	}

	return type_contrat;
}

//recupérer le secteur d'activité (département)
function get_departement(id_departement) {
	var departement = "";
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: api_erp_dolibar + "departement/departements/" + id_departement,
		dataType: "json",
		cache: false,
		async: false,
		timeout: api_timeout,
		headers: {
			DOLAPIKEY: "3ba4a6406dac81bc3f9bd3e16a40986193f70f8b",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		},
		crossDomain: true,
		success: function (json) {
			if (json == undefined) {
				show_error("form_message", "Impossible de récupérer ce secteur d'activité");
			} else {
				departement = json.label;
				console.log("departement " + departement);
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			console.log("error");

			handle_ajax_error(textStatus, xhr, "notification_warning", "div_errors_content");
		},
	}).always(function () {});

	return departement;
}

//recupérer le nombre d'années d'expérience
function get_experience(nb_annees) {
	var experience = "";
	if (nb_annees == 0) {
		experience = "Aucune expérience";
	} else if (nb_annees == 1) {
		experience = "1 an";
	} else if (nb_annees == 2) {
		experience = "2 ans";
	} else if (nb_annees == 3) {
		experience = "3 ans";
	} else if (nb_annees == 4) {
		experience = "4 ans";
	} else if (nb_annees == 5) {
		experience = "5 ans";
	} else if (nb_annees == 6) {
		experience = "6 ans";
	} else if (nb_annees == 7) {
		experience = "7 ans";
	} else if (nb_annees == 8) {
		experience = "8 ans";
	} else if (nb_annees == 9) {
		experience = "9 ans";
	} else if (nb_annees == 10) {
		experience = "10 ans et +";
	}

	return experience;
}

//injection des numeros de telephone kamtar-kool
function inject_numero_telephone_kamtar_kool() {
	var host = window.location.hostname;

	// cote d'ivoire
	var numero_telephone_kamtar_kool_ci = "07 04 750 343";

	// sénégal
	var numero_telephone_kamtar_kool_sn = "";

	// autre
	var numero_telephone_kamtar_kool_autre = "";

	if (host.indexOf("kamtar-ci") >= 0) {
		$(".numero_telephone_kamtar_kool_pays").html(numero_telephone_kamtar_kool_ci);
		$("#appelez_bouton_kool").prop("value", "Appelez le " + numero_telephone_kamtar_kool_ci);
		$("#appelez_bouton2_kool").prop("value", "Appelez le " + numero_telephone_kamtar_kool_ci);
		$("#appelez_bouton3_kool").prop("value", "Appelez le " + numero_telephone_kamtar_kool_ci);
		
	}
}
