
module.exports ={
    NOTIFYNUM:0,
    ADMIN:1,                   //管理员
    USER:2,                    //普通用户（猎头）
    USERNAVS:[{                //普通用户导航栏
        name:'首   页',
        url:'#/home',
        match:'home|detail|upload'
    },{
        name:'我的推荐',
        url:'#/recommend',
        match:'recommend'
    },{
        name:'关于猎头',
        url:'#/headhunter',
        match:'headhunter'
    }],
    ADMINNAVS:[{               // 管理员导航栏
        name:'猎头管理',
        url:'#/admin',
        match:'admin|hunterDetail'
    }]

}