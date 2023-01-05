module.exports = function (RED) {
	var kiteConnect = require("kiteconnect").KiteConnect;

	function kiteconnectConfig(n) {
		RED.nodes.createNode(this, n);
		this.kc = new kiteConnect({
			api_key: this.credentials.api_key,
			debug: true
		});

		this.kc.generateSession(this.credentials.request_token, this.credentials.api_secret)
			.then(function (response) {
				console.log("Response", response);
			})
			.catch(function (err) {
				console.log(err);
			});
	}
	RED.nodes.registerType("kiteconnect-config", kiteconnectConfig, {
		credentials: {
			api_key: {
				type: "password"
			},
			request_token: {
				type: "password"
			},
			api_secret: {
				type: "password"
			}
		}
	});
};