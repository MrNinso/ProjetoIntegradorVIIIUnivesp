module.exports = ({ config: { mysql } }) => {
    mysql.lib = require('mysql')
    
    mysql._connect = async () => new Promise((resolve) => {
        if (mysql._conn === undefined) {
            mysql._conn = mysql.lib.createConnection({
                host: mysql.host,
                user: mysql.user,
                password: mysql.password,
                port: mysql.port ?? undefined,
                database: mysql.database,                
            })
        }

        resolve(mysql._conn)
    })

    mysql.healthcheck = (procedure, params) => mysql._connect().then(
        conn => new Promise((resolve, reject) => {
            const query =  `SELECT 1 AS OKAY`

            conn.query(query, [], (error, result) => {
                if (error) {
                    return reject({ errID: 'BLMY001', error })
                }

                resolve({})
            })
        }),
        error => { return { errID: 'BLMY002', error } }
    )

    mysql.execProcecure = (procedure, params) => mysql._connect().then(
        conn => new Promise((resolve, reject) => {
            const query =  `CALL ${procedure} (${", ?".repeat(params.length).substring(2)})`
            const queryParams = params.map(item => item.value)

            conn.query(query, queryParams, (error, result) => {
                if (error) {
                    return reject({ errID: 'BLMY003', error })
                }

                resolve(result.length === 2 ? result[0] : result.slice(0, -1))
            })

        }),
        error => { return { errID: 'BLMY004', error } }
    )

    mysql.selectAllWhere = (table, where, params) => mysql._connect().then(
        conn => new Promise((resolve, reject) => {
            if (where !== "") {
                where = `WHERE ${where}`
            }

            const query =  `SELECT * FROM ${table} ${where}`
            

            conn.query(query, params.map(item => item.value), (error, result) => {
                if (error) {
                    return reject({ errID: 'BLMY005', error })
                }

                resolve(result)
            })

        }),
        error => { return { errID: 'BLMY006', error } }
    )

    return mysql
}