/**
 * Created by hzgaoquankang on 2017/5/3.
 */

var Component = require('../../base/component');
var template = require('./index.html');
var _ = require('../../base/util.js');
var cacheService = require('../../service.js');
var Notify = require('../../common/notify');
var Mask = require('../../common/mask.js');
var Modal = require('../../common/modal.js');
var mk = require('marked');
var selectModel=require('./selectModel.html');
var Pager = require('../../common/pager.js');

var Recommend = Component.extend({
    template:template,

    config() {

        this.data.uploadFile='true';     //便于解构赋值  用字符串true
        this.data.form1Data={};          //上传新简历表单初始值为空
        this.data.form1button='false';   //上传简历中我要推荐按钮
        this.data.work={};              //参加工作时间 下拉选项
        this.data.errData={};          //初始错误信息为空
        this.data.currentPage=1;       //初始第一页
        this.data.currentResume={};    //当前简历
        this.data.degree={};          //当前学位
    },

    init() {
        this.getYearsAndMonth();
        this.checkTab1();
        this.degree();
    },

    enter(option) {
        let id =option.param.id;
        this.__getPositionDetail(id);
        this.data.form1Data.id=id;   //获取职位id
    },

    /**
     * 切换选项卡
     * @param uploadFile   上传新简历选项卡控制
     * @param selectFile   选择以有简历选项卡控制
     */
    switchMoudel({uploadFile='fasle',selectFile='fasle'}){
        let data=this.data;
        [data.uploadFile,data.selectFile] = [uploadFile,selectFile] ;
        this.$update();
    },


    /**
     * 得到职位信息
     * @param id
     * @private
     */
    __getPositionDetail(id){


        /**
         * 获取职位详细信息;
         * @param 职位编号
         */
        cacheService.getPositionDetail(id,result=>{
            this.data.detail=result;
            this.$update();
        })
    },


    /**
     * 上传新简历点击推荐推荐
     */
    submitIntab1() {
        let form1button=this.data.form1button,
            form1Data=this.data.form1Data;
        form1button=='true'?this.recommendUpload(form1Data):[];
    },

    /**
     * 点击我要推荐 上传简历
     * @param form1Data
     */
    recommendUpload(form1Data) {

        /**
         * 出现弹窗
         */
        new Modal({
            data: {
                title: '提示',
                contentTemplate: mk('<p class="card-p">确认候选人简历信息准确<br>推荐成功猎头保护期为 6 个月</p>'),
                okButton: '确认',
                cancelButton: '取消',
                width:400
            }

        }).$on('ok', function () {

            /**
             * 点击ok 提交上传简历请求。
             */
            cacheService.recommendUpload(form1Data,(data)=>{
                new Modal({
                    data: {
                        title: '通知',
                        contentTemplate: mk('<p class="card-p">推荐成功！</p>'),
                        okButton: '确认',
                        width:400
                    }

                }).$on('ok', function () {

                })


            },(errdata,errResult)=>{

                let msg=errResult.msg;
                // msg   在errResult里面
                new Modal({
                    data: {
                        title: '推荐失败',
                        contentTemplate: mk('<p class="card-p">'+msg+'</p>'),
                        okButton: '确认',
                        width:400
                    }

                }).$on('ok', function () {

                })
            })
        })


    },

    /**
     * 选择已有简历推荐
     */
    submitIntab2() {
        let currentResume=this.data.currentResume;
        this.recommendUpload(currentResume);
    },


    /**
     * 判断号码和邮箱      （号码只对长度做了判断）
     * @param option     需要判断的值
     * @param name       需要判断的属性名
     */
    control(option,name) {
       let  errData=this.data.errData;
       if(name=='mobile'){
           option.length==11?errData[name]=0:errData[name]=1;
       }else {
           let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
           reg.test(option)==true?errData[name]=0:errData[name]=1;
       }
            this.$update();
    },

    degree() {
        cacheService.getDegree((result)=> {
            this.data.degree=result;
            this.$update();
        })
    },
    /**
     * 选择已有简历
     */
    selectHaveFile() {
        let _self = this;

        this.getResume(null,1,function () {

            let resume=_self.data.resume,
                page=_self.data.page;
            new Modal({
                data: {
                    title: '选择已有简历',
                    contentTemplate: mk(selectModel),    // selectModel 模板
                    okButton: false,
                    width:860,
                    resume,
                    page
                },

                /**
                 * 猎头得到简历
                 */
                getResume(appName,currentPage){
                    _self.getResume(appName,currentPage,()=>{
                        this.data.resume=_self.data.resume;
                        this.data.page=_self.data.page;
                        this.$update();
                    });
                },

                /**
                 * 让父组件获得page
                 * @param obj
                 */
                pageNow(obj){
                    let page=obj.current,
                        data=this.data;
                    _self.data.currentPage=page;
                    this.getResume(data.appName,page)
                },

                /**
                 * 当前简历
                 * @param obj
                 */
                resume(obj){
                    _self.data.currentResume=obj;
                    _self.$update();
                    this.destroy();
                }

            })
        });

    },


    /**
     * 获得猎头已有的简历
     * @param appName     搜索框输入的内容
     * @param currentPage 当前页
     * @param callback
     */
     getResume(appName,currentPage,callback){

        let selectObj={
            appName:appName || null,
            currentPage:currentPage || 1,
            rows:6
        };
        cacheService.selectHaveFile(selectObj,(data) =>{
            this.data.resume=data.list;
            this.data.page=data.page;
            this.$update();
            callback&&callback();
        })
    },


    /**
     *  得到工作的年份月份
     */
    getYearsAndMonth() {
        let date=new Date(),
            data=this.data;
        let yearNow=date.getFullYear(),
            arr=[0,1,2,3,4,5,6,7,8,9];
            data.yearsArray=Array.from([...arr], (x) => yearNow - x);
            data.monthsArray=Array.from([...arr,10,11],(x) => x+1);
            this.$update();
    },

    /**
     * 检验表单 tab1 是否填写完整
     */
    checkTab1() {
        let form1Data=this.data.form1Data,
            errData=this.data.errData;
        let Flag=['id','appName','appendixId','email','gender','mobile','nowCompany','nowPosition','topDegree','workYearsStr'];

        /**
         * 监听表单
         */
        this.$watch('form1Data',(newV)=>{
            for (let key in Flag){
                if (newV[Flag[key]]==undefined || newV[Flag[key]]===''|| errData[Flag[key]]==1)
                    return this.data.form1button='false';
            }
            this.data.form1button='true';
            this.$update();
        },true)


        /**
         * 监听工作年和月份的变化
         */
        this.$watch('work',(newV)=>{
            if(newV.Year !=undefined && newV.Month !=undefined)
            form1Data.workYearsStr=newV.Year+'-0'+newV.Month+'-01';
        },true)
    },

    __uploadFile(e) {
        let file = e.target,
            fileSize = this.__getFileSize(file);


        if (!/\.(png|jpg|jpeg|pdf)$/i.test(file.value)) {
            Notify.warning('文件格式非法');
            return;
        }

        if (fileSize > 20 * 1024) {
            Notify.warning('附件必须小于20Mb');

            return;
        }

        this.$update();
        this.__fileUpHandle();
    },


    /**
     * 获取文件大小
     * @param input 上传文件的input元素
     * @returns {number}
     * @private
     */
    __getFileSize(input) {

        var  fileSize = 0;
        if (!input.files) {
            return;
        }
        if (input.files[0]) {
            fileSize = input.files[0].size;
        }
        return fileSize / 1024;
    },

    /**
     * 主要处理上传的回调
     * @param id
     * @private
     */
    __fileUpHandle(){

        let refs = this.$refs,
            data=this.data;
        let mask = new Mask().$inject(document.body);
        this.__upload(refs['form'],(json)=>{
            mask.close();
            data.form1Data.appendixId=json.data.id;
            data.filename=json.data.name;
            refs['form'].elements.file.value='';
            this.$update();
        })
    },

    /**
     * 上传
     * @param form
     * @param callback
     * @private
     */
    __upload(form, callback) {

        let ifr = document.createElement('iframe'),
            rnd = (Math.random() + '').substr(-8),
            name = 'upload-ifr' + rnd;
            ifr.style.display = 'none';

        ifr.setAttribute('name', name);
        document.body.appendChild(ifr);
        form.setAttribute('target', name);

        ifr.onload = function () {
            var ifrBody = ifr.contentDocument.body,
                html = ifrBody.innerHTML,
                json;

            html = html.replace(/^<.+?>/, '').replace(/<.+?>$/, '');

            json = eval('(' + html + ')');
            callback && callback(json);
            ifr.remove();
        };

        // 延迟零毫秒，再次提交
        setTimeout(()=> {
            form.submit();
        }, 0);
    }
});

Recommend.component('Pager',Pager);
module.exports=Recommend;