
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
        this.name = 'user'
    }

    async get(id, get) {
        let query = {
            TableName: this.name,
            Key: (typeof id === 'object') ? id : this.keyFunction(id)
        }
        if (get)
            query.AttributesToGet = get

        return new Promise((resolve) => {
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
    async query(index, email) {
        return new Promise((resolve) => {
            this.client.query({
                    TableName: this.name,
                    IndexName: index,
                    KeyConditionExpression: '#k=:v',
                    ExpressionAttributeNames: {
                        '#email': index
                    },
                    ExpressionAttributeValues: {
                        ':email': email
                    }
                },
                (error, data) => {
                    console.log(error,data)
                    if (error)
                        resolve(null)
                    else
                        resolve(data.Items)
                }
            )
        })
    }
    
    async put(item) {
        return new Promise((resolve, reject) => {
            this.client.put({
                TableName: this.name,
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