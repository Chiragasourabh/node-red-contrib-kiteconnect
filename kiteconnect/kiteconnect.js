module.exports = function (RED) {

    function getProfileNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            this.config.kc.getProfile()
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function getPositionsNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            this.config.kc.getPositions()
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function getHoldingsNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            this.config.kc.getHoldings()
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function getMarginsNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            var segment = msg.payload.segment || msg.segment || n.segment || "equity";
            console.log(segment);
            this.config.kc.getMargins(segment)
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function getOrdersNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            this.config.kc.getOrders()
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function getOrderTradesNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            var order_id = msg.payload.order_id || msg.order_id || n.order_id;
            this.config.kc.getOrderTrades(order_id)
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function placeOrderNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            var variety = msg.payload.variety || msg.variety || n.variety;
            var params = {};
            params.exchange = msg.payload.exchange || msg.exchange || n.exchange;
            params.tradingsymbol = msg.payload.tradingsymbol || msg.tradingsymbol || n.tradingsymbol;
            params.transaction_type = msg.payload.transaction_type || msg.transaction_type || n.transaction_type;
            params.quantity = msg.payload.quantity || msg.quantity || n.quantity;
            params.product = msg.payload.product || msg.product || n.product;
            params.order_type = msg.payload.order_type || msg.order_type || n.order_type;
            // var validity = null
            // var price = null
            // var disclosed_quantity
            this.config.kc.placeOrder(variety, params)
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function cancelOrderNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            var variety = msg.payload.variety || msg.variety || n.variety;
            var order_id = msg.payload.order_id || msg.order_id || n.order_id;
            var params = {};
            params.parent_order_id = msg.payload.parent_order_id || msg.parent_order_id || n.parent_order_id;
            this.config.kc.cancelOrder(variety, order_id, params)
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function convertPositionNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            var params = {};
            params.exchange = msg.payload.exchange || msg.exchange || n.exchange;
            params.tradingsymbol = msg.payload.tradingsymbol || msg.tradingsymbol || n.tradingsymbol;
            params.transaction_type = msg.payload.transaction_type || msg.transaction_type || n.transaction_type;
            params.position_type = msg.payload.position_type || msg.position_type || n.position_type;
            params.quantity = msg.payload.quantity || msg.quantity || n.quantity;
            params.old_product = msg.payload.old_product || msg.old_product || n.old_product;
            params.new_product = msg.payload.new_product || msg.new_product || n.new_product;
            this.config.kc.convertPosition(params)
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function exitOrderNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            var variety = msg.payload.variety || msg.variety || n.variety;
            var order_id = msg.payload.order_id || msg.order_id || n.order_id;
            var params = {};
            params.parent_order_id = msg.payload.parent_order_id || msg.parent_order_id || n.parent_order_id;
            this.config.kc.exitOrder(variety, order_id, params)
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function getHistoricalDataNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            var instrument_token = msg.payload.instrument_token || msg.instrument_token || n.instrument_token;
            var interval = msg.payload.interval || msg.interval || n.interval;
            var from_date = msg.payload.from_date || msg.from_date || n.from_date;
            var to_date = msg.payload.to_date || msg.to_date || n.to_date;
            var continuous = msg.payload.continuous || msg.continuous || n.continuous || false;
            this.config.kc.getHistoricalData(instrument_token, interval, from_date, to_date, continuous)
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            this.send(msg);
        });
    }

    function getInstrumentsDataNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.kiteconnectConfig);
        this.on('input', function (msg) {
            var exchanges = msg.payload.exchange || msg.exchange || [];
            if (exchanges.length==0){
                n.nse ? exchanges.push("NSE"): "";
                n.bse ? exchanges.push("BSE"): "";
                n.nfo ? exchanges.push("NFO"): "";
                n.cds ? exchanges.push("CDS"): "";
                n.bcd ? exchanges.push("BCD"): "";
                n.bfo ? exchanges.push("BFO"): "";
                n.mcx ? exchanges.push("MCX"): "";
            }
            this.config.kc.getInstruments(exchanges)
                .then(function (response) {
                    console.log(response);
                    msg.response = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
            msg.exchange = exchanges
            this.send(msg);
        });
    }

    RED.nodes.registerType("cancel order", cancelOrderNode);
    RED.nodes.registerType("convert position", convertPositionNode);
    RED.nodes.registerType("exit order", exitOrderNode);
    RED.nodes.registerType("get historical data", getHistoricalDataNode);
    RED.nodes.registerType("get holdings", getHoldingsNode);
    RED.nodes.registerType("get instruments", getInstrumentsDataNode);
    RED.nodes.registerType("get margins", getMarginsNode);
    RED.nodes.registerType("get orders", getOrdersNode);
    RED.nodes.registerType("get order trades", getOrderTradesNode);
    RED.nodes.registerType("get positions", getPositionsNode);
    RED.nodes.registerType("get profile", getProfileNode);
    RED.nodes.registerType("place order", placeOrderNode);

}