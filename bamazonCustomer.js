var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Maverick7",
    database: "bamazon_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    productSearch();
  });

//displays products
  function productSearch(answer){
    var query = "SELECT item_id,product_name,price,stock_quantity FROM products";
    connection.query(query,  function(err, res) {
      var theDisplayTable = new Table({
        head: ['Item ID', 'Product Name', 'Price', 'Quantity'],

          colWidths: [10, 30, 10, 14]
        });

        for (var i = 0; i < res.length; i++) {
            theDisplayTable.push(
             [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
             );
          }
             console.log(theDisplayTable.toString());


       customerSelect();
     });
}

//Customer Selects product ////////////////////////////
function customerSelect(answer) {
    inquirer.prompt([
      {
        name: "item",
        type: "input",
        message: "Select the ID of item you would like to buy"
      },
      {
        name: "count",
        type: "input",
        message: "How many units would you like to buy?"
      }

      ]).then(function(answer) {
          connection.query("SELECT item_id,product_name,price,stock_quantity FROM products WHERE ?",
            {item_id: answer.item},  function(err, res) {

              //console.log("count " + answer.count);

              if (parseInt(answer.count) > res[0].stock_quantity) {

                console.log("Insufficient quantity! " + res[0].stock_quantity + " left");
                customerSelect();

              }

              else {
                console.log("Your purchase of " + answer.count + ' ' + res[0].product_name +"/s total cost is: $ " + parseInt(res[0].price) * parseInt(answer.count));
               var quantityLeft = res[0].stock_quantity - answer.count;
                      console.log(quantityLeft);
                      connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: quantityLeft
                          },
                          {
                            item_id: answer.item
                          }
                        ],
                        function(error) {
                          if (error) throw err;
                         
                         
                        }); 
                      console.log("Inventory updated. There are  " + quantityLeft + " left"); 
                      customerSelect();
               }


               
            })
      });

};      


