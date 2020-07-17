const express = require('express');
const router = express.Router();
const Mail = require('../utils/mail')
const userModel = require('../db/model/userModel');
let utils = require('../utils')
let codes = []

/**
 * @api {post} /user/login 用户登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 用户密码
 *
 */
router.post('/login', (req, res) => {
    let {username, password} = req.body
    if (username && password) {
        userModel.find({username})
            .then((data) => {
                if (data.length > 0) {
                    res.send({err: 0, msg: '登录成功'})
                } else {
                    res.send({err: -3, msg: '用户名或密码不正确'})
                }
            })
            .catch(() => {
                res.send({err: -2, msg: "登录失败"})
            })
    } else {
        res.send({err: -1, msg: "用户名或密码为空"})
    }
})


/**
 * @api {post} /user/register 用户注册
 * @apiName register
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 用户密码
 * @apiParam {String} mailCode 邮箱验证码
 *
 */
router.post('/register', (req, res) => {
    let {username, password, mailCode} = req.body
    if (username && password) {
        if (!mailCode) {
            return res.send({err: -1, msg: "验证码为空"})
        }
        if (codes[username].code !== parseInt(mailCode)) {
            res.send({err: -2, msg: "验证码不正确"})
        } else if ((new Date().getTime() - codes[username].time) > 300000) {
            res.send({err: -3, msg: '验证码已过期,请重新获取'});
        } else {
            userModel.find({username})
                .then((data) => {
                    if (data.length > 0) {
                        res.send({err: 1, msg: '邮箱已注册'})
                    } else {
                        return userModel.insertMany({
                            username,
                            password,
                            created_at: utils.getNowFormatDate(),
                            updated_at: utils.getNowFormatDate()
                        });
                    }
                })
                .then(() => {
                    res.send({err: 0, msg: "注册成功"})
                })
                .catch(() => {
                    res.send({err: -2, msg: "登录失败"})
                })
        }
    } else {
        res.send({err: -1, msg: "用户名或密码为空"})
    }
})


/**
 * @api {post} /user/getMailCode 获取邮箱密码
 * @apiName getMailCode
 * @apiGroup User
 *
 * @apiParam {String} username 邮箱账号
 *
 */
router.post('/getMailCode', (req, res) => {
    let {username} = req.body;
    let randomCode = parseInt(Math.random().toFixed(6).slice(-6))
    if (username) {
        userModel.find({username})
            .then((data) => {
                if (data.length > 0) {
                    res.send({err: 1, msg: '邮箱已注册'})
                } else {
                    let codeObjInit = {
                        code: randomCode,
                        time: new Date().getTime(),
                        count: 0
                    }
                    let codeObj = codes[username] || codeObjInit;
                    let updateObj = () => {
                        Mail.send(username, codeObj.code)
                            .then(() => {
                                console.log(codeObj)
                                codeObj.count++;
                                codes[username] = codeObj;
                                res.send({err: 0, msg: '验证码发送成功'});
                            })
                            .catch((err) => {
                                res.send({err: -1, msg: '验证码发送失败', data: err})
                            })
                    }
                    if ((new Date().getTime() - codeObj.time) > 300000) {
                        codeObj = codeObjInit;
                        updateObj()
                    } else {
                        if (codeObj.count > 2) {
                            res.send({err: -2, msg: '获取次数超限,请五分钟后再试'});
                        } else {
                            codeObj = {
                                code: randomCode,
                                time: new Date().getTime(),
                                count: codeObj.count++
                            }
                            updateObj()
                        }
                    }
                }
            })
            .catch(() => {
                res.send({err: -2, msg: "登录失败"})
            })

    } else {
        res.send({err: -1, msg: '参数错误'})
    }
})


/**
 * @api {post} /user/getUserInfo 获取用户信息
 * @apiName getUserInfo
 * @apiGroup User
 *
 * @apiParam {String} _id 邮箱账号
 *
 */
router.post('/getUserInfo', (req, res) => {
    let {_id} = req.body;
    if (_id) {
        // userModel.aggregate([
        //     {
        //         $lookup: {
        //             from: "loves",
        //             localField: "_id",
        //             foreignField: "_userId",
        //             as: "loves"
        //         }
        //     }
        // ])
        userModel.find({}).populate({path:'_user',select:{_id:"5f116fb2d7a2b626a41dfce2"}})
            .then((data) => {
                res.send({err: 0, msg: '查询成功', data})
            })
            .catch(() => {
                res.send({err: -2, msg: "查询失败"})
            })
    } else {
        res.send({err: -1, msg: '参数错误'})
    }
})


module.exports = router