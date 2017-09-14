/**
 * Created by easterCat on 2017/9/12.
 */
const connect = require('../config/connect');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

var insertData = function (db, callback) {
    //连接到表 site
    var collection = db.collection('site');
    //插入数据
    var data = [{"name": "菜鸟教程", "url": "www.runoob.com"}, {"name": "菜鸟工具", "url": "c.runoob.com"}];
    collection.insert(data, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
};
var selectData = function (db, callback) {
    //连接到表
    var collection = db.collection('site');
    //查询数据
    var whereStr = {"name": '菜鸟教程'};
    collection.find(whereStr).toArray(function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
};
var updateData = function (db, callback) {
    //连接到表
    var collection = db.collection('site');
    //更新数据
    var whereStr = {"name": '菜鸟教程'};
    var updateStr = {$set: {"url": "https://www.runoob.com"}};
    collection.update(whereStr, updateStr, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
};
var delData = function (db, callback) {
    //连接到表
    var collection = db.collection('site');
    //删除数据
    var whereStr = {"name": '菜鸟工具'};
    collection.remove(whereStr, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
};


connect.open(function (err, db) {
    insertData(db, function (result) {
        console.log(result);
        db.close();
    });
    selectData(db, function (result) {
        console.log(result);
        db.close();
    });
    updateData(db, function (result) {
        console.log(result);
        db.close();
    });
    delData(db, function (result) {
        console.log(result);
        db.close();
    });
});