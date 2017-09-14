/**
 * Created by easterCat on 2017/9/14.
 */


const connect = require('../config/connect');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

var insertData = function (db, data, callback) {
    //连接到表 site
    var collection = db.collection('site');
    //插入数据
    var data = data;
    collection.insert(data, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
};
var selectData = function (db, data, callback) {
    //连接到表
    var collection = db.collection('site');
    //查询数据
    var whereStr = data;
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


var addUser = function (data) {
    connect.open(function (err, db) {
        console.log("连接成功！");
        insertData(db, data, function (result) {
            console.log(result);
            db.close();
        });
    });
};

var queryUser = function (data, callback) {
    connect.open(function (err, db) {
        console.log("连接成功！");
        selectData(db, data, function (result) {
            callback(result);
            db.close();
        });
    });
};

module.exports = {
    addUser,
    queryUser
};
