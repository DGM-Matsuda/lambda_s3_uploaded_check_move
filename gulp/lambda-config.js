/**
 * Created by koichi.matsuda on 2016/01/14.
 */
module.exports = {
    profile: 'dev-lambda',
    region: 'ap-northeast-1',
    handler: 'index.handler',
    role: 'arn:aws:iam::493564659491:role/lambda_s3_event_role',
    functionName: 'lambdaS3UploadedCheckMove',
    timeout: 10
    // eventSource: {
    //  EventSourceArn: <event source such as kinesis ARN>,
    //  BatchSize: 200,
    //  StartingPosition: "TRIM_HORIZON"
    //}
}