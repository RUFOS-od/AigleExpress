var code_pays_contact = "ci";
var host = "";

$(function () {
	// injection des éléments du header

	var header = "";

	// scripts CSS
	//header += '<link rel="stylesheet" href="/css/style.css?v=1.0.265">';
	header += '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css?v=1.0.265" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">';
	header += '<link href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap" rel="stylesheet"></link>';

	// scripts JS
	header += '<script src="/js/moment-with-locales.js?v=1.0.265"></script>';
	header += '<script src="/js/utils.js?v=1.0.265"></script>';

	// cookiejs
	header += '<script src="/js/js.cookie.min.js?v=1.0.265"></script>';

	header += '<script src="/js/jwt-decode.min.js?v=1.0.265"></script>';

	header += '<script src="/js/i18next/i18next.min.js" ></script>';
	header += '<script src="/js/i18next/jquery-i18next.min.js" ></script>';
	header += '<script src="/js/i18next/i18nextXHRBackend.js" ></script>';

	// GTM
	header += "<script>";
	header += "(function (w, d, s, l, i) {";
	header += "w[l] = w[l] || [];";
	header += 'w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });';
	header += "var f = d.getElementsByTagName(s)[0],";
	header += "j = d.createElement(s),";
	header += 'dl = l != "dataLayer" ? "&l=" + l : "";';
	header += "j.async = true;";
	header += 'j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;';
	header += "f.parentNode.insertBefore(j, f);";
	header += '})(window, document, "script", "dataLayer", "GTM-5PNFTZ5");';
	header += "</script>";

	// i18n
	header += "<script>var json_traduction = JSON.parse(localStorage.getItem('i18n_v1.0.265')); var i18nOptions = {";
	header += "	debug: false,";
	header += '	whitelist: ["en-US", "en"],';
	header += '	fallbackLng: "en",';
	header += "	getAsync: true,";
	header += "	backend: {";
	header += '		loadPath: "/locale/{{lng}}/translation.json"';
	header += "	}";
	header += "};</script>";

	// code pays
	header += "<script>";
	header += "var host = window.location.hostname;";
	header += "var codePaysKamtar = 'CI';";
	header += "if (host.indexOf('kamtar-sn') >= 0){";
	header += "	codePaysKamtar = 'SN';";
	header += "} ";
	header += "</script>";

	// environnement
	header += "<script>";
	header += "var isProd = false;";
	header += "if (host.indexOf('.com') >= 0){";
	header += "	isProd = true;";
	header += "} ";
	header += "</script>";

	// zendesk
	//header += "<!-- Start of  Zendesk Widget script -->";
	//header += "<script id='ze-snippet' src='https://static.zdassets.com/ekr/snippet.js?key=e3bcd035-04f6-4e76-9d5e-61f7ebb130a7'> </script>";
	//header += "<!-- End of  Zendesk Widget script -->";

	$("#header_js").after(header);

	var json_traduction = null;

	if (localStorage.getItem("i18n_v1.0.265") != null) {
		JSON.parse(localStorage.getItem("i18n_v1.0.265"));
	}

	// i18n
	$(document).ready(function ($) {
		i18next.use(i18nextXHRBackend);
		i18next.init(
			{
				debug: i18n_debug,
				whitelist: ["en-US", "en"],
				fallbackLng: "en",
				getAsync: true,
				backend: {
					loadPath: "/locale/{{lng}}/translation.json",
				},
			},
			function (err, t) {
				jqueryI18next.init(i18next, $);
				$("body").localize();
				$("head").localize();

				json_traduction = JSON.stringify(i18next.store.data.en.translation);

				if (localStorage.getItem("i18n_v1.0.265") === null) {
					localStorage.setItem("i18n_v1.0.265", json_traduction);
					location.reload(); // reload avec les trads
				}
				$(document).trigger("i18nOK");
				console.log("i18nOK envoyé");
			}
		);
	});

	$(document).ready(function ($) {
		var host = window.location.hostname;
		if (host == "www.kamtar-sn.com") {
			code_pays_contact = "sn";
		}
	});

	$(document).on("click", ".click_to_call, #appelez_bouton, #appelez_bouton2", function () {
		// numéros de téléphone
		var numero_telephone_kamtar_ci = "25 22 009 001";
		var numero_telephone_kamtar_sn = "77 356 40 31";

		var host = window.location.hostname;
		if (host == "www.kamtar-sn.com") {
			window.location.href = "tel:" + numero_telephone_kamtar_sn;
		} else {
			window.location.href = "tel:" + numero_telephone_kamtar_ci;
		}
	});

	$(document).on("click", ".click_to_call_kamtar_kool", function () {
		// numéros de téléphone
		var numero_telephone_kamtar_kool_ci = "07 04 750 343";
		var numero_telephone_kamtar_kool_sn = "";

		var host = window.location.hostname;
		if (host == "www.kamtar-ci.com") {
			window.location.href = "tel:" + numero_telephone_kamtar_kool_ci;
		}
	});

	$(document).on("click", "#blocs_bouton_reserver, #presentation_reserver_bouton, #reservez_bouton, .reservez_bouton, #contact_form_bouton_reservez", function () {
		var host = window.location.hostname;
		if (host == "www.kamtar-sn.com") {
			window.location.href = "https://transport-client.kamtar-sn.com/";
		} else {
			window.location.href = "https://transport-client.kamtar-ci.com/";
		}
		//window.location.href = "/reserver";
	});
});
