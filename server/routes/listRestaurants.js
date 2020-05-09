var express = require("express");
var router = express.Router();
let mysql = require("mysql");
var connection = require("../connection");

/* GET users listing. */
router.get("/", function (req, res, next) {
  //res.send('Hello')
  connection.query("SELECT * from GlintsRestaurant.Table", function (
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("Error while performing Query.");
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

router.get("/searchName", function (req, res, next) {
  //res.send('Hello')
  const { name, openingTime } = req.query;
  var sqlSearchName =
    "SELECT * from GlintsRestaurant.Table WHERE Name Like ? OR openingTime Like ?";
  connection.query(
    sqlSearchName,
    ["%" + name + "%", "%" + openingTime + "%"],
    function (error, results, fields) {
      if (error) {
        console.log("Error while performing Query.");
      } else {
        return res.json({
          data: results,
        });
      }
    }
  );
});

router.get("/searchOpeningTimes", function (req, res, next) {
  //res.send('Hello')
  connection.query(
    "SELECT * from GlintsRestaurant.Table WHERE openingTime Like ?",
    ["%" + openingTime + "%"],
    function (error, results, fields) {
      if (error) {
        console.log("Error while performing Query.");
      } else {
        return res.json({
          data: results,
        });
      }
    }
  );
});

router.get("/createTable", function (req, res, next) {
    //res.send('Hello')
    
    const { tableName } = req.query;
    connection.query("CREATE TABLE IF NOT EXISTS ?? (id INT not null AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(100) not null, openingTime VARCHAR(1000) not null)",[tableName], function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log("Error while performing Query.");
      } else {
        res.send(tableName + "table created");
      }
    });
    
  });

  router.get("/dropTable", function (req, res, next) {
    //res.send('Hello')
    
    const { tableName } = req.query;
    connection.query("DROP TABLE ??",[tableName], function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log("Error while performing Query.");
      } else {
        res.send(tableName + "table dropped");
      }
    });
    
  });

  router.get("/insertIntoTable", function (req, res, next) {
    //res.send('Hello')
    
    const { tableName, name, openingTime } = req.query;
    connection.query("INSERT INTO ?? (Name, openingTime) VALUES ( ? , ?)",[tableName, name, openingTime ], function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log("Error while performing Query.");
      } else {
        res.send(name + ' and ' + openingTime + ' added into ' + tableName);
      }
    });
    
  });

  router.get("/removeFromTable", function (req, res, next) {
    //res.send('Hello')
    
    const { tableName, name, openingTime } = req.query;
    connection.query("DELETE FROM ?? WHERE Name = ? AND openingTime = ?  AND id <> 0",[tableName, name, openingTime ], function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log("Error while performing Query.");
      } else {
        res.send(name + ' and ' + openingTime + ' deleted from ' + tableName);
      }
    });
    
  });

  router.get("/allTable", function (req, res, next) {
    //res.send('Hello')
    connection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'GlintsRestaurant'", function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log("Error while performing Query.");
      } else {
        return res.json({
          data: results,
        });
      }
    });
  });

  router.get("/listItemTable", function (req, res, next) {
    //res.send('Hello')
    const { tableName } = req.query;
    connection.query("SELECT * from (GlintsRestaurant.??)", [tableName],function (
      error,
      results,
      fields
    ) {
      if (error) {
        console.log("Error while performing Query.");
      } else {
        return res.json({
          data: results,
        });
      }
    });
  });
  
  
/*
    if (err) throw err;
    var data=[];
    for(i=0;i<rows.length;i++)
    {
    data.push(rows[i].Name);
    }
    res.end(JSON.stringify(data));
    */
module.exports = router;
