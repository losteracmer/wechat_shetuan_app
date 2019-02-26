/**
 * 小程序配置文件
 */


var host = "http://localhost"
var host = 'https://supersst.com'

var config = {

  // 下面的地址配合云端 Server 工作
  host:host,

  // 登录地址，用于建立会话
  loginUrl: `${host}/login`,

  // 测试的请求地址，用于测试会话
  requestUrl: `${host}/testRequest`,

  // 用code换取openId
  openIdUrl: `${host}/openid`,

  // 测试的信道服务接口
  tunnelUrl: `${host}/tunnel`,

  // 生成支付订单的接口
  paymentUrl: `${host}/payment`,

  // 发送模板消息接口
  templateMessageUrl: `${host}/templateMessage`,

  // 上传文件接口
  uploadFileUrl: `${host}/upload`,

  //获取图片URL数组地址接口
  getimageslist:`${host}/getimageslist`,

  // 下载示例图片接口
  downloadExampleUrl: `${host}/static/weapp.jpg`,

  getkindsUrl:`${host}/getkinds`,

  //申请接口
  applyUrl: `${host}/apply`,

  //获取社团list接口
  getcommlistUrl: `${host}/getcommlist`,

  //获取社团信息接口
  getcommInfoUrl:`${host}/getcommInfo`,

  //登录获取sessionkey接口
  loginUrl:`${host}/login`,

  //获取我的社团列表
  mycommUrl:`${host}/mycomm`,

  //同步用户info
  setuserInfoUrl:`${host}/setuserInfo`,

  //社团管理登录接口
  adminLoginUrl:`${host}/admin/login`,

  adminChangepwUrl:`${host}/admin/changepw`,

  //活动列表接口
  activitiesUrl:`${host}/activities`,

  //点赞接口
  dianzanUrl:`${host}/dianzan`,

  //关注接口
  guanzhuUrl:`${host}/guanzhu`,

  //搜索社团接口
  searchcommUrl: `${host}/searchcomm`,

  //上传社团logo接口
  uploadlogoUrl:`${host}/uploadlogo`,

  //修改社团信息接口
  changecommUrl: `${host}/changecomm`,

  //修改活动状态
  changeactivities: `${host}/changecomm/activities`,

  //
  commtableUrl: `${host}/commtable`,
  
  //提交反馈皆苦
  submitmsg:`${host}/submitmsg`,

  //管理账号
  operateaccount:`${host}/operateaccount`,

  //
  getupdatemsg:`${host}/getupdatemsg`
};

module.exports = config
