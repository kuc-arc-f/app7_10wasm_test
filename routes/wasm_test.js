var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3')
var dbfileName = "./app1.sqlite"
const wasm = require("../public/pkg");
const { performance } = require('perf_hooks');
//import LibTest from "../libs/LibTest"
var LibWasmTask = require('../libs/LibWasmTask');

//
//  res.send('respond with a resource-1234');
router.get('/', function(req, res, next) {
    var db = new sqlite3.Database( dbfileName )
    var items = []
    db.serialize(function() {
        db.all('SELECT id,title, content FROM tasks order by id desc;', function(err, rows) {
            rows.forEach( function (item) {
                items.push(item  );
            });
            var t0 = performance.now();
            var elem = wasm.wasm_object_array("div_post_wrap", items);
    //console.log(elem);
            var t1 = performance.now();
            console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
            res.send(`<div>
                <a href='/'><h3>[ Top ]</h3></a>
                <hr />
                <h1>WasmTest - index</h1>
                ${elem}
            </div>`);
        });
        db.close();
    });

});
  
//
router.get('/test', function(req, res, next) {
//    res.render('wasm_test/test', {});
    var db = new sqlite3.Database( dbfileName )
    var items = []
    db.serialize(function() {
        db.all('SELECT id,title, content FROM tasks order by id desc;', function(err, rows) {
            rows.forEach( function (item) {
                items.push(item  );
            });
console.log(rows.length );
            var t0 = performance.now();
            var elem = wasm.wasm_test_array("div_post_wrap", items);
//            var elem = wasm.wasm_test_convert("div_post_wrap", items);
            var t1 = performance.now();
            console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
            res.send(`<div>
                <a href='/'><h3>[ Top ]</h3></a>
                <hr />
                <h1>WasmTest - Test</h1>
                <div>${elem}
                </div>
            </div>`);
        });
        db.close();
    });
});

//
router.get('/test_js', function(req, res, next) {
    var utl = new LibWasmTask( )
    var db = new sqlite3.Database( dbfileName )
    db.serialize(function() {
        db.all('SELECT id,title, content FROM tasks order by id desc;', function(err, rows) {
            var elem = "";
            var t0 = performance.now();
            rows.forEach( function (item) {
                var s = utl.convert_html(item);
                elem += s;
            });
//console.log(elem);
            var t1 = performance.now();
            console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
            res.send(`<div>
                <a href='/'><h3>[ Top ]</h3></a>
                <hr />
                <h1>WasmTest - Test_JS</h1>
                <div>${elem}
                </div>
            </div>`);
        });
        db.close();
    });
});


module.exports = router;
