
const AWS = require('aws-sdk')

class Table {

    constructor(config) {
        this.config = config
        // Create a client for database queries
        this.client = new AWS.DynamoDB.DocumentClient({
            region: config.aws.region,
            endpoint: config.aws.endpoint
        })
        // Key function
        this.keyFunction = (id) => ({ id })
    }

    async get(id, get) {
        let query = {
            TableName: 'user',
            Key: (typeof id === 'object') ? id : this.keyFunction(id)
        }
        if (get)
            query.AttributesToGet = get

        return new Promise((resolve, reject) => {
            this.client.get(query,
                (error, data) => {
                    if (error) {
                        console.log(error)
                        resolve({})
                    }
                    else
                        resolve(data.Item)
                })
        })        
    }

    async put(item) {
        return new Promise((resolve, reject) => {
            this.client.put({
                TableName: 'user',
                Item: item
            },
            (error, data) => {
                console.log(error,data)
                if (error) {
                    console.log(error)
                    resolve()
                }
                else
                    resolve(item)
            })
        })
    }
}

module.exports = Table