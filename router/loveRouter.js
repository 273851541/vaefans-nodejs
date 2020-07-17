const express = require('express');
const router = express.Router();
const loveModel = require('../db/model/loveModel');

router.post('/addLove',(req,res)=>{
    let obj = {
        "duration": 233326,
        "epname": "青年晚报",
        "id": 418602450,
        "name": "奇谈",
        "picUrl": "https://p2.music.126.net/Wcs2dbukFx3TUWkRuxVCpw==/3431575794705764.jpg",
        "singer": "许嵩",
        "webUrl": "https://music.163.com/song/media/outer/url?id=418602450.mp3"
    }
    loveModel.insertMany(obj)
        .then((data)=>{
            console.log(data)
            console.log("成功")
        })
        .catch(()=>{
            console.log("成功")
        })

})


router.post('/removeLove',(req,res)=>{

})

router.post('/getLoveInfo',(req,res)=>{
    loveModel.find().populate("_user")
        .then((data)=>{
            res.send({err: 0, msg: '查询成功', data})
        })
        .catch((err)=>{
            res.send({err: 0, msg: '查询失败', data:err})
        })
})

module.exports = router
