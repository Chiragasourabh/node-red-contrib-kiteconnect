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
            node.send(msg);
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
            node.send(msg);
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
            node.send(msg);
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
            node.send(msg);
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
            node.send(msg);
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
            node.send(msg);
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
            node.send(msg);
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
            node.send(msg);
        });
    }

    RED.nodes.registerType("cancel order", cancelOrderNode);
    RED.nodes.registerType("get holdings", getHoldingsNode);
    RED.nodes.registerType("get margins", getMarginsNode);
    RED.nodes.registerType("get orders", getOrdersNode);
    RED.nodes.registerType("get order trades", getOrderTradesNode);
    RED.nodes.registerType("get positions", getPositionsNode);
    RED.nodes.registerType("get profile", getProfileNode);
    RED.nodes.registerType("place order", placeOrderNode);

}