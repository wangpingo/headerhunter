var getParams = function (url) {
	var reg = /(\w+)=([^&]+)/g,
		params = {},
		result = [];

	url = (url.split('?')[1] || '');

	while(result = reg.exec(url)) {
		params[result[1]] = result[2];
	}

	return params;
};

var extend = function (o1, o2) {
	for (var key in o2) {
		if (o2.hasOwnProperty(key) && o2[key] !== void 0) {
			o1[key] = o2[key];
		}
	}
};

module.exports = {

    /**
     * 获取token
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    "GET　/sys/getToken":function(req,res,next) {

        res.send({
            'code': 200,
            'data': '00001',
            'msg': '成功'
        })
    },


    /**
	 *
     * @param req   登录需要的参数（用户名 密码等）
     * @param res   登录后返回的信息
     * @param next
     * @constructor
     */
	"POST /sys/getLogin": function (req,res,next) {
		res.send({
			'code':200,
			'data':{
				userType:2,     //1 管理员   2:普通用户
				companyName: "浙江外服"     //公司名称
			},
			'msg':'成功'
		})
	},
    /**
     * 发送获取验证码的请求
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    'GET /sys/getVerifyCode':function(req,res,next){
        res.send({
            'code':200,
            'data':{
                srcImg:'',
            },
            'msg':'成功'
        })
    },
    /**
	 *
     * @param req  需要更改密码的邮箱
     * @param res
     * @param next
     * @constructor
     */
    "POST /forgotPwd/mail":function(req,res,next){
        res.send({
            'code':200,
            'data':'sl_cheng@126.com',
            'msg':'成功'
        })
    },

    /**
	 *忘记密码修改新的密码
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    "POST /sys/forgotPwd/reset/resetPwd":function(req,res,next){

        res.send({
            'code':200,
            'data':null,
            'msg':'成功'
        })
    },



    /**
	 * 登出
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
    'GET /sys/logout':function(req,res,next) {
		res.send({
			'code': 200,
			'data': null,
			'msg': '成功'
		})
    },

    /**
	 * 发送重置密码邮件
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
    "POST /forgotPwd/mail":function(req,res,next){
        res.send({
            'code':200,
            'data':'sl_cheng@126.com',
            'msg':'成功'
        })
    },
    /**
	 * 修改密码
	 * @param req
	 * @param res
	 * @param next
	 * @constructor
	 */
    "POST /sys/resetPwd":function(req,res,next){

		res.send({
			'code':200,
			'data':null,
			'msg':'成功'
		})
    },



    //-----------------------------首页-----------------------


    /**
     * 得到职位列表的 多个选项
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    "GET  /index/option":function (req,res,next) {

        res.send({
            'code':200,
            'data':{
                workPlaceList:[{id:0,name:'不限'},{id:1,name:'北京'},{id:2,name:'上海'},{id:3,name:'广州'},{id:4,name:'杭州'},{id:5,name:'其他'}],
                workYearsList:[{id:0,name:'无工作经验'},{id:1,name:'两年以下'},{id:2,name:'3-5年'},{id:3,name:'5-10年'},{id:4,name:'10年以上'},{id:5,name:'其它'}],
                positionTypeList:[{id:0,name:'技术'},{id:1,name:'产品'},{id:2,name:'设计'},{id:3,name:'市场'},{id:4,name:'销售'},{id:5,name:'内容'},{id:6,name:'客服'},{id:7,name:'游戏'},{id:8,name:'电商'},{id:9,name:'金融'},{id:10,name:'职能'},{id:11,name:'高管'},{id:12,name:'其它'}]
		   },
            'msg':'成功'
        })

    },



    /**
     * 猎头获得首页的职位列表
     * @param req
     * @param res
     * @param next
     * @constructor
     */
    "POST  /index/positionList":function (req,res,next) {
        res.send({
            code:200,
            data:{
                page:{
                    totalPage:10,
                    totalNum:100
                },
                positionList:[{
                    'id':1,
                    'positionName':'前端开发工程师',
                    'positionStatus'	:0,
                    'positionTypeName':'市场',
                    'workPlaceName':'杭州',
                    'workYearsName':'2年',
                    'topDegreeName':'博士',
                    'hireNum':'10',
                    'updateDate':'2017-01-01',
                    'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                    'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                    'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]

                    },{
                    'id':2,
                    'positionName':'前端开发工程师',
                    'positionStatus'	:1,
                    'positionTypeName':'市场',
                    'workPlaceName':'杭州',
                    'workYearsName':'2年',
                    'topDegreeName':'博士',
                    'hireNum':'10',
                    'updateDate':'2017-01-01',
                    'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                    'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                    'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]

                    },{
                    'id':3,
                    'positionName':'前端开发工程师',
                    'positionStatus'	:0,
                    'positionTypeName':'市场',
                    'workPlaceName':'杭州',
                    'workYearsName':'2年',
                    'topDegreeName':'博士',
                    'hireNum':'10',
                    'updateDate':'2017-01-01',
                    'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                    'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                    'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]

                    },{
                    'id':4,
                    'positionName':'前端开发工程师',
                    'positionStatus'	:0,
                    'positionTypeName':'市场',
                    'workPlaceName':'杭州',
                    'workYearsName':'2年',
                    'topDegreeName':'博士',
                    'hireNum':'10',
                    'updateDate':'2017-01-01',
                    'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                    'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                    'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]

                },{
                    'id':5,
                    'positionName':'前端开发工程师',
                    'positionStatus'	:0,
                    'positionTypeName':'市场',
                    'workPlaceName':'杭州',
                    'workYearsName':'2年',
                    'topDegreeName':'博士',
                    'hireNum':'10',
                    'updateDate':'2017-01-01',
                    'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                    'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                    'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]

                    },{
                    'id':6,
                    'positionName':'前端开发工程师',
                    'positionStatus'	:0,
                    'positionTypeName':'市场',
                    'workPlaceName':'杭州',
                    'workYearsName':'2年',
                    'topDegreeName':'博士',
                    'hireNum':'10',
                    'updateDate':'2017-01-01',
                    'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                    'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                    'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]

                    },{
                    'id':7,
                    'positionName':'前端开发工程师',
                    'positionStatus'	:0,
                    'positionTypeName':'市场',
                    'workPlaceName':'杭州',
                    'workYearsName':'2年',
                    'topDegreeName':'博士',
                    'hireNum':'10',
                    'updateDate':'2017-01-01',
                    'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                    'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                    'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]

                    },{
                    'id':8,
                    'positionName':'前端开发工程师',
                    'positionStatus'	:0,
                    'positionTypeName':'市场',
                    'workPlaceName':'杭州',
                    'workYearsName':'2年',
                    'topDegreeName':'博士',
                    'hireNum':'10',
                    'updateDate':'2017-01-01',
                    'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                    'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                    'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]

                    },{
                    'id':9,
                    'positionName':'前端开发工程师',
                    'positionStatus'	:0,
                    'positionTypeName':'市场',
                    'workPlaceName':'杭州',
                    'workYearsName':'2年',
                    'topDegreeName':'博士',
                    'hireNum':'10',
                    'updateDate':'2017-01-01',
                    'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                    'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                    'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]

                    },{
                    'id':10,
                    'positionName':'前端开发工程师',
                    'positionStatus'	:0,
                    'positionTypeName':'市场',
                    'workPlaceName':'杭州',
                    'workYearsName':'2年',
                    'topDegreeName':'博士',
                    'hireNum':'10',
                    'updateDate':'2017-01-01',
                    'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                    'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                    'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]

                }],
                hrList:[{id:1,name:'强哥'},{id:2,name:'章哥'}],
                departmentList:[{id:'D001',name:'人力资源'},{id:'C002',name:'网易云音乐'}]
            },
            msg:  "成功"
        })
    },


    //--------------------详情页的请求---------------
    "GET /position/detail":function (req,res,next) {
        res.send(
            {
                'code':200,
		        'data': {
                      'positionDsc':`
                            1、日常公关传播、公关事件的策划；<br>
                            2、各种公关稿件的撰写；<br>
                            3、各社区、自媒体渠道的运营 <br>`,

                      'positionReq':`
                            1、撰稿能力强,能够驾驭各种类型的文案；<br>
                            2、了解互联网传播特点,熟悉各类互联网传播形式,关注电商行业；<br>
                            3、擅长各类话题传播的策划,脑洞大；<br>
                            4、执行能力强,有团队精神,可以协调大中型项目的团队执行；<br>
                            5、大型互联网公司公关岗位3-5年工作经验。<br> `,
                      'positionName':'高级BD专员-跨境电商050',
                      'positionTypeName':'技术',
                      'workPlaceName':'北京市',
                      'workYearsName':'2年',
                      'topDegreeName':'博士',
                      'hireNum':"10",
                      'level':'p4',
                      'HRWill':'有外企经验',
                      'postionUserNameList':[{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'},{'id':'1','name':'芭芭拉','email':'hzbalabala@corp.netease.com'}]
                },
                'msg': null,
            }
        );
    },

    //----------------我要推荐页-------------------
    "POST /file/upload":function (req,res,next) {
        res.send({
          code:200,
          data: {
              id:'1121',
              name:'example.doc',
              url:'http://example.com/example.doc'
          },
          msg: null,
        });
    },

    //获得学历页面
    "GET /options/byCode":function (req,res,next) {
        res.send({
            code:200,
            data:[{
                    "code": null,
                    "id": "01",
                    "name": "初中及以下",
                    "active": null,
                    "parentId": null
                },{
                    "code": null,
                    "id": "11",
                    "name": "其他",
                    "active": null,
                    "parentId": null
                }],
            msg: '成功'
        });
    },

    //简历上传
    "POST /recommend/upload":function (req,res,next) {
        res.send({
            code:200,
            data: null,
            msg: '成功',
        });
    },

    //选择已有简历
    "POST /resume/pick":function (req,res,next) {
        res.send({
            code:200,
            data: {
                page:{
                    totalPage:10,
                    totalNum:100
                },
		        list: [{
                "resumeId": 2032,
                "appName": "张章",
                "applicantId": 1404,
                "employeeId": 0,
                "employeeName": null,
                "postId": 0,
                "mobile": "157574511",
                "email": "1575711@163.com",
                "nowCompany": "asdasdasd",
                "nowPosition": "",
                "degreeStr": "初中及以下",
                "gender": 0,
                "appendixName": "1c5ac08ba40a.jpg",
                "workYearStr": null
                },{
                    "resumeId": 2032,
                    "appName": "张章",
                    "applicantId": 1404,
                    "employeeId": 0,
                    "employeeName": null,
                    "postId": 0,
                    "mobile": "157184511",
                    "email": "15757511@163.com",
                    "nowCompany": "adasdas",
                    "nowPosition": "",
                    "degreeStr": "初以下",
                    "gender": 0,
                    "appendixName": "1c540a.jpg",
                    "workYearStr": null
                }],
            startRow: 1,
            endRow: 20
    },
            msg: '成功',
        });
    },

    //我的推荐
    "POST /resume/detail.do":function (req,res,next) {

        res.send({
            "code": "200",
            "data":
            {
                page:{
                    totalPage:10,
                    totalNum:100
                },
                "list": [{
                    "id": 280,
                    "appName": "张章",
                    "positionId": 237,
                    "status": 0,
                    "statusName": "简历待处理",
                    "positionName": "sfdfds-财务部007",
                    "updateTime": null,
                    "updateTimeStr": "2017-04-26",
                    "email":'121@163.com',
                    "postionUserName": '王小易',
                    "applyStatus": "00",
                    },{
                    "id": 280,
                    "appName": "张章",
                    "positionId": 237,
                    "status": 0,
                    "statusName": "简历待处理",
                    "positionName": "sfdfds-财务部007",
                    "updateTime": null,
                    "updateTimeStr": "2017-04-26",
                    "email":'121@163.com',
                    "postionUserName": '王小易',
                    "applyStatus": "00",
                },{
                    "id": 280,
                    "appName": "张章",
                    "positionId": 237,
                    "status": 0,
                    "statusName": "简历待处理",
                    "positionName": "sfdfds-财务部007",
                    "updateTime": null,
                    "updateTimeStr": "2017-04-26",
                    "email":'121@163.com',
                    "postionUserName": '王小易',
                    "applyStatus": "00",
                },{
                    "id": 280,
                    "appName": "张章",
                    "positionId": 237,
                    "status": 0,
                    "statusName": "简历待处理",
                    "positionName": "sfdfds-财务部007",
                    "updateTime": null,
                    "updateTimeStr": "2017-04-26",
                    "email":'121@163.com',
                    "postionUserName": '王小易',
                    "applyStatus": "00",
                },{
                    "id": 280,
                    "appName": "张章",
                    "positionId": 237,
                    "status": 0,
                    "statusName": "简历待处理",
                    "positionName": "sfdfds-财务部007",
                    "updateTime": null,
                    "updateTimeStr": "2017-04-26",
                    "email":'121@163.com',
                    "postionUserName": '王小易',
                    "applyStatus": "00",
                },{
                    "id": 280,
                    "appName": "张章",
                    "positionId": 237,
                    "status": 0,
                    "statusName": "简历待处理",
                    "positionName": "sfdfds-财务部007",
                    "updateTime": null,
                    "updateTimeStr": "2017-04-26",
                    "email":'121@163.com',
                    "postionUserName": '王小易',
                    "applyStatus": "00",
                },{
                    "id": 280,
                    "appName": "张章",
                    "positionId": 237,
                    "status": 0,
                    "statusName": "简历待处理",
                    "positionName": "sfdfds-财务部007",
                    "updateTime": null,
                    "updateTimeStr": "2017-04-26",
                    "email":'121@163.com',
                    "postionUserName": '王小易',
                    "applyStatus": "00",
                },{
                    "id": 280,
                    "appName": "张章",
                    "positionId": 237,
                    "status": 0,
                    "statusName": "简历待处理",
                    "positionName": "sfdfds-财务部007",
                    "updateTime": null,
                    "updateTimeStr": "2017-04-26",
                    "email":'121@163.com',
                    "postionUserName": '王小易',
                    "applyStatus": "00",
                },{
                    "id": 280,
                    "appName": "张章",
                    "positionId": 237,
                    "status": 0,
                    "statusName": "简历待处理",
                    "positionName": "sfdfds-财务部007",
                    "updateTime": null,
                    "updateTimeStr": "2017-04-26",
                    "email":'121@163.com',
                    "postionUserName": '王小易',
                    "applyStatus": "00",
                },{
                    "id": 280,
                    "appName": "张章",
                    "positionId": 237,
                    "status": 0,
                    "statusName": "简历待处理",
                    "positionName": "sfdfds-财务部007",
                    "updateTime": null,
                    "updateTimeStr": "2017-04-26",
                    "email":'121@163.com',
                    "postionUserName": '王小易',
                    "applyStatus": "00",
                }]
                },
                "msg": null
         })
    }
 
};






