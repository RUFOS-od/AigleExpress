$(function () {
	// injection de la configuration

	var config = "<script>";
	config += "var api_timeout = 30000;";
	config += "var cookie_ttl = 60;"; // en jours

	var api_path_relais = "https://relais-api.kamtar-ci.com:8086/";
	var api_path_transport = "https://transport-api.kamtar-ci.com:8088/";
	var api_erp_dolibar = "@@URL_API_DOLIBAR@@";
	var key_erp_dolibar = "3ba4a6406dac81bc3f9bd3e16a40986193f70f8b";
	if (localStorage.getItem("api_path_relais")) {
		api_path_relais = localStorage.getItem("api_path_relais");
	}
	if (localStorage.getItem("api_path_transport")) {
		api_path_transport = localStorage.getItem("api_path_transport");
	}
	if (localStorage.getItem("api_erp_dolibar")) {
		api_erp_dolibar = localStorage.getItem("api_erp_dolibar");
	}
	if (localStorage.getItem("key_erp_dolibar")) {
		key_erp_dolibar = localStorage.getItem("key_erp_dolibar");
	}
	config += 'var api_path_transport = "' + api_path_transport + '";';
	config += 'var api_path_relais = "' + api_path_relais + '";';
	config += 'var api_erp_dolibar = "' + api_erp_dolibar + '";';
	config += 'var key_erp_dolibar = "' + key_erp_dolibar + '";';

	var i18n_debug = false;
	if (localStorage.getItem("i18n_debug")) {
		i18n_debug = localStorage.getItem("i18n_debug") == "true";
	}
	config += "var i18n_debug = " + i18n_debug + ";";

	config += "var api_cross_domain = true;";
	config += 'var moment_js_language = "fr";';

	config += "</script>";

	$("#config_js").after(config);
});
