/**
 * Created by koichi.matsuda on 15/08/14.
 *  d=`pwd`&&zip -r lambdaFunction.zip ./* && aws lambda update-function-code --function-name uploadedUserfiles  --profile dev-lambda --zip-file fileb://${d}/lambdaFunction.zip --region ap-northeast-1
 */
/// <reference path="lambda.d.ts" />

var MAX_APP_ZIP_SIZE = 25 * 1024 * 1024; // 25[MByte]

import aws = require('aws-sdk');
aws.config.update({region : 'ap-northeast-1'});
var s3: any = new aws.S3({apiVersion: '2006-03-01', region: 'ap-northeast-1'});
import async = require('async');

// entry point
exports.handler = function(event: any, context: any) {

    // console.log(JSON.stringify(event));
    async.each<any>(event.Records, startTask,
        function (err: any)
        {
            // console.log('err: ' + err);
            context.done(err, null);
        }
    );
};


function startTask(record: any, done: any) {

    var tasks = [
        function (next: any) {
            next(null, record);
        },
        check,
        function(result: any, next: any) {

            // console.log('result', result);
            // console.log('next', next);
            done(null, result);
        }
    ];

    async.waterfall(tasks, done);

}

function check(record: any, next: any) {

    var s3 = record.s3;
    // var bucket = s3.bucket;
    var object = s3.object;

    // if (bucket.name !== SOURCE_BUCKET)
    // {
    //    next("not target: " + bucket.name, record);
    //    return;
    // }

    if (object.key.indexOf('.zip') < 0) {
        console.log('拡張子不正:' + object.key);
        deleteObject(record, function(err: any, value: any){
            next('delete object', record);
        });
        return;
    }

    if (object.size >= MAX_APP_ZIP_SIZE) {
        console.log('容量オーバー:' + object.size);
        deleteObject(record, function(err: any, value: any){
            next('delete object', record);
        });
        return;
    }

    next(null, record);
}

function deleteObject(record: Bucket, next: any) {

    var param = {
        Bucket: record.s3.bucket.name,
        Key: decodeURIComponent(record.s3.object.key)
        // - RequestPayer: 'requester'
    };
    console.log('PARAM', param);
    s3.deleteObject(param, function(err: any, data: any) {
        if (err) {
            console.log('ERR', err, err.stack);
        } else if (data) {
            console.log('DT', data);
        }
        // callback(err);
        next('delete object', null);
    });

}
