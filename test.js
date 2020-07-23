function f1() {
    return new Promise(resolve => {
        resolve("我是f1")
    })
}

function f2() {
    return new Promise(resolve => {
        resolve("我是f2")
    })
}

function f3() {
    return new Promise(resolve => {
        resolve("我是f3")
    })
}

function f4() {
    return new Promise(resolve => {
        resolve("我是f4")
    })
}


f1()
    .then((data) => {
        if(data){

        }else{
            f2()
                .then((data)=>{
                    if (data){
                        console.log("项目已存在")
                    }else{
                        return f3()
                    }
                })
                .then(()=>{
                    console.log("1111",data)
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
    })
    .then((data)=>{
        console.log("2222",data)
    })
    .catch((err)=>{
        console.log(err)
    })