const express = require('express');
const router = express.Router();
const blogModel = require('../db/model/blogModel');


/**
 * @api {post} /blog/addBlog 添加blog
 * @apiName addBlog
 * @apiGroup blog
 *
 * @apiParam {String} content 内容
 * @apiParam {String} songId 歌曲ID
 * @apiParam {String} bgUrl 背景图
 * @apiParam {String} title 文章标题
 * @apiParam {String} author 作者
 *
 */
router.post('/addBlog',(req, res)=>{
    if(req.body){
        blogModel.insertMany(req.body)
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
 * @api {post} /blog/removeBlog 删除blog
 * @apiName removeBlog
 * @apiGroup blog
 *
 * @apiParam {String} _id blog ID
 *
 */
router.post('/removeBlog',(req, res)=>{
    let {_id} = req.body;
    if(_id){
        blogModel.find({_id:{$in:_id}})
            .then((data)=>{
                if(data.length===0){
                    res.send({err:0,msg:'项目不存在'})
                }else{
                    return blogModel.deleteMany({_id:{$in:_id}});
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


/**
 * @api {post} /blog/removeBlog 查询blog
 * @apiName removeBlog
 * @apiGroup blog
 *
 * @apiParam {String} _id blog ID
 *
 */
router.post('/getBlog',(req, res)=>{
    let {pageSize,pageIndex} = req.body;
    console.log(pageSize,pageIndex)
    // if(_userId){
        blogModel.find({}).limit(pageSize||10).skip(pageIndex||0)
            .then((data)=>{
                if(data.length===0){
                    res.send({err:0,msg:'项目不存在'})
                }else{
                    res.send({err:0,msg:'查询成功',data})
                }
            })
            .catch(()=>{
                res.send({err:-1,msg:'查询失败'})
            })
    // }else{
    //     res.send({err:-1,msg:'缺少必要字段'})
    // }
})

module.exports = router;