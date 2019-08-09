require('dotenv').config()
const Alexa = require('ask-sdk')
const AWS = require('aws-sdk')
const DynamoDBAdapter = require('ask-sdk-dynamodb-persistence-adapter')

const config = require('./config/dev')
const skillBuilder = Alexa.SkillBuilders.standard()

exports.handler = skillBuilder
    .addRequestHandlers(
        require('./handlers/general/LaunchHandler.js'),
        require('./handlers/QuestionHandler.js'),
        require('./handlers/ReplyHandler.js'),
        require('./handlers/general/YesHandler.js'),
        require('./handlers/general/NoHandler.js'),
        require('./handlers/general/HelpHandler.js'),
        require('./handlers/general/StopHandler.js'),
        require('./handlers/general/CancelHandler.js'),
        require('./handlers/general/FallbackHandler.js'),
        require('./handlers/general/SessionEndedHandler.js'),
    )
    .addRequestInterceptors(require('./interceptors/LocalizationInterceptor.js'))
    .addErrorHandlers(require('./handlers/general/ErrorHandler.js'))
    .withTableName('advice')
    .withAutoCreateTable(true)
	.withDynamoDbClient(new AWS.DynamoDB({
        apiVersion: config.aws.apiVersion, 
        region: config.aws.region, 
        accessKeyId: config.aws.accessKeyId, 
        secretAccessKey: config.aws.secretAccessKey
	}))
	.withPartitionKeyGenerator(DynamoDBAdapter.PartitionKeyGenerators.userId)
    .lambda()
