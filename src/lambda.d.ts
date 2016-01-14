/**
 * Created by koichi.matsuda on 2016/01/14.
 */
/// <reference path="../.tmp/typings/tsd.d.ts" />

interface Bucket {
    s3: {
        bucket: {
            name: string;
        };
        object: {
            key: string;
        }
    };
}