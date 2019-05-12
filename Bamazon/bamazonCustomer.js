var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

var items = [];

connection.connect(function (err) {
    if (err) throw err;
    var query = "SELECT * FROM products";
    //console.log("Will query: " + query);
    connection.query(query, function (err, res) {
        if (err) return err;

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + ", Product: " + res[i].product_name +", Department Name: "+res[i].department_name+", Price: "+res[i].price+", Available Quantity: "+res[i].stock_quantity);
            items.push("ID: " + res[i].id + ", Product: " + res[i].product_name);
        }
        items.push("exit");
         return runApp();
    });
});

function runApp() {
    inquirer
        .prompt([{
            name: "action",
            type: "list",
            message: "Which item would you like to purchase?",
            choices: items
        }, {
            name: "quantity",
            type: "input",
            message: "How many items would you like to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }])
        .then(function (answer) {
            //console.log(answer.action)
            switch (answer.action) {
                case "exit":
                    console.log("Thank you for using Bamazon!");
                    return;
                default:
                    return purchaseItems(answer);
            }
        });
        return;
}

function purchaseItems(answer) {
    
    var query = "SELECT * FROM products WHERE id = ?";
    
    connection.query(query, [answer.action.split('ID: ')[1].split(',')[0]], function (err, res) {
        if (err) return err;

        var cost = res[0].price;

        if (res[0].stock_quantity >= answer.quantity) {
            
            var newQuantity = res[0].stock_quantity - answer.quantity;
            var myId = answer.action.split('ID: ')[1].split(',')[0]

            var updateQuery = "UPDATE products SET stock_quantity = ? WHERE id = ?";
            //console.log("\nWill query: UPDATE products SET stock_quantity = "+newQuantity+" WHERE id = " + myId);
            connection.query(updateQuery, [ newQuantity , myId ], function (err, res) {
                if (err) return err;

                var totalCost = answer.quantity * cost;

                console.log("\nTotal Cost of purchase is: $"+totalCost+"\n");
                 return runApp();
                
            });
        } else {
            console.debug("\nInsufficient quantity!.\n");
            return runApp();
        } 
    });
}

function exiting() {
    console.log("Thank you for using Bamazon!");
    return;
}