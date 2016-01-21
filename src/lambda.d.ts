/**
 * Created by koichi.matsuda on 2016/01/14.
 */
/// <reference path="../.tmp/typings/tsd.d.ts" />


interface Event {
    Records: Record[]
}

interface Record {
    eventVersion: string,
    eventSource: string,
    awsRegion: string,
    eventTime: string,
    eventName: string,
    userIdentity: {
        principalId: string
    },
    requestParameters: {
        sourceIPAddress: string
    },
    responseElements: {
        "x-amz-request-id": string,
        "x-amz-id-2": string
    },
    s3: {
        s3SchemaVersion: string,
        configurationId: string,
        bucket: {
            name: string,
            ownerIdentity: {
                principalId: string
            },
            arn: string
        },
        object: {
            key: string,
            size: number,
            eTag: string,
            sequencer: string
        }
    }
}