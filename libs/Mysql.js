//

const mysql = require('promise-mysql');

export default {
    get_connection: function() {
        let connection = mysql.createConnection({
            host: "localhost",
            user: "db_user",
            password: "password",
            database: "vue1",
            multipleStatements: true
        });
        return connection;
    },    
    func1 :function(){
        console.log('#_func1aa')
    },

}
