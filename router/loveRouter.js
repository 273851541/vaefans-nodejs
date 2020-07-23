const express = require('express');
const router = express.Router();
const loveModel = require('../db/model/loveModel');
const LoveSong = loveModel.LoveSong;
const LoveVideo = loveModel.LoveVideo;
const LoveToday = loveModel.LoveToday;

/**
 * @api {post} /today/removeToday 添加/修改 收藏数据
 * @apiName addLove
 * @apiGroup love
 *
 * @apiParam {String} _userId 用户ID
 * @apiParam {String} loveId 收藏ID
 * @apiParam {String} type 查询类型
 *
 */
router.post('/addLove', (req, res) => {
    let {_userId, loveId, type} = req.body;
    if (_userId && loveId && type) {
        let loveModels = loveModelsFun(type)
        loveModels.findOne({_userId})
            .then((data) => {
                if (data) {
                    return loveModels.findOne({_userId, loveList: {$elemMatch: {$eq: loveId}}})
                } else {
                    return loveModels.insertMany({loveList: Array(loveId), _userId})
                }
            })
            .then((data) => {
                if (data) {
                    if (data instanceof Array) {
                        res.send({err: 0, msg: '新增用户成功', data})
                    } else {
                        res.send({err: 0, msg: '项目已存在', data})
                    }
                } else {
                    return loveModels.updateOne({_userId}, {$push: {loveList: [loveId]}})
                }
            })
            .then((data) => {
                res.send({err: 0, msg: '添加成功'})
            })
            .catch((err) => {
                res.send({err: 0, msg: '添加失败', data: err})
            });
    } else {
        res.send({err: 0, msg: '参数错误'})
    }

})


/**
 * @api {post} /today/removeToday 删除收藏数据
 * @apiName removeLove
 * @apiGroup love
 *
 * @apiParam {String} _userId 用户ID
 * @apiParam {String} loveId 收藏ID
 * @apiParam {String} type 查询类型
 *
 */
router.post('/removeLove', (req, res) => {
    let {_userId, loveId, type} = req.body;
    if (_userId && loveId && type) {
        let loveModels = loveModelsFun(type);
        loveModels.findOneAndUpdate({_userId}, {$pull: {loveList: loveId}})
            .then((data) => {
                if(data){
                    if(data.length>0){
                        res.send({err: 0, msg: '删除成功', data})
                    }else{
                        res.send({err: 0, msg: '项目不存在', data})
                    }
                }else{
                    res.send({err: 0, msg: '操作的用户ID不存在', data})
                }
            })
            .catch((err) => {
                res.send({err: 0, msg: '删除失败', data: err})
            });
    } else {
        res.send({err: 0, msg: '参数错误'})
    }
})


/**
 * @api {post} /today/removeToday 删除收藏数据
 * @apiName removeLove
 * @apiGroup love
 *
 * @apiParam {String} _userId 用户ID
 * @apiParam {String} type 查询类型
 *
 */
router.post('/getLoveInfo', (req, res) => {
    let {_userId,type} = req.body;
    let loveModels = loveModelsFun(type);

    if (type === 'loveToday') {
        loveModels.aggregate([
            {
                $lookup: {
                    from: 'todays',  // 数据库中关联的表名
                    localField: 'loveList',  // LoveSong文档中关联的字段
                    foreignField: '_id',// users文档中关联的字段
                    as: 'loveList'// 返回数据的字段名
                }
            }
        ])
            .then((data) => {
                res.send({err: 0, msg: '查询成功', data})
            })
            .catch((err) => {
                res.send({err: 0, msg: '查询失败', data: err})
            })
    }else{
        loveModels.findOne({_userId})
            .then((data) => {
                if(!data){
                    res.send({err: 0, msg: '项目不存在', data})
                }else{
                    res.send({err: 0, msg: '查询成功', data})
                }
            })
            .catch((err) => {
                res.send({err: 0, msg: '查询失败', data: err})
            })
    }
})


function loveModelsFun(type) {
    switch (type) {
        case "loveSong":
            return LoveSong
            break;
        case "loveVideo":
            return LoveVideo
            break;
        case "loveToday":
            return LoveToday
            break;
    }
};

module.exports = router;
