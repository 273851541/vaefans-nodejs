const express = require('express');
const router = express.Router();
const todayModel = require('../db/model/todayModel');


/**
 * @api {post} /today/addToday 添加today
 * @apiName addToday
 * @apiGroup today
 *
 * @apiParam {String} content 内容
 * @apiParam {String} songId 歌曲ID
 * @apiParam {String} bgUrl 背景图
 * @apiParam {String} title 文章标题
 * @apiParam {String} author 作者
 *
 */
router.post('/addToday',(req, res)=>{
    if(req.body){
        todayModel.insertMany(req.body)
            .then(()=>{

                res.send({err:0,msg:'添加成功'})
            })
            .catch(()=>{
                res.send({err:-2,msg:'添加失败'})
            })
    }else{
        res.send({err:-1,msg:'缺少必要字段'})
    }
})


/**
 * @api {post} /today/removeToday 删除today
 * @apiName removeToday
 * @apiGroup today
 *
 * @apiParam {String} _id today ID
 *
 */
router.post('/removeToday',(req, res)=>{
    let {_id} = req.body;
    if(_id){
        todayModel.find({_id:{$in:_id}})
            .then((data)=>{
                if(data.length===0){
                    res.send({err:0,msg:'项目不存在'})
                }else{
                    return todayModel.deleteMany({_id:{$in:_id}});
                }
            })
            .then(()=>{
                res.send({err:0,msg:'删除成功'})
            })
            .catch(()=>{
                res.send({err:-1,msg:'删除成功'})
            })
    }else{
        res.send({err:-1,msg:'缺少必要字段'})
    }
})

module.exports = router;