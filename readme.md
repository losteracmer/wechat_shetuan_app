
####最好能在触底刷新时，在页面最下面那添加一个动画效果，保证前面数据显示的情况下，可视化更新新列表数据


####每个请求数据页面都应该有设置加载动画，如果请求失败了，wx.module提示



社团登录，输入密码的时候要对账号和密码进行加密，在后台进行解密，数据库不能存密码明文，md5加密，登录后，要在app.gloable.key中存这个管理账号key，每次发送请求，都要带上这个信息，以便在后台判断是否有权限修改社团信息

活动页图片排版（盒子模型） 
    len ：活动图片数量
    if（数量 == 2 ||len == 4）{
        for（item in acts）
        show（左，右）
    } else {
        for（item in acts）
        show（左，中，右）
    }


我的关注页面取消，重复了

bug?侧滑时不显示加载动画

发布动态页面太丑了，可以效仿一下QQ

并没有实现同步到相册的功能，不过这个做起来好像比较麻烦，可以考虑不做了

搜索功能还没有做

目前一个管理账号 sst 密码sst acm的管理

###---8.5   （事实上后台已经跟新到9.0.1了）
缩略图问题，在图片上传后，后台压缩图片，生成250X250的缩略图（30kb左右)，请求缩略图 在url后面加上参数  ?ys=1  就行，活动页已经实现小图显示缩略图，大图显示原图，不过动态图压缩的好像有点问题，显示的很怪，这个没办法了。。

####这个版本出现的问题
1，社团也侧滑不显示加载动画
2，活动页点赞成功了，图片没有发生改变，（但是已经修改标志变量了），刷新后就能显示，很玄学
3，这个问题，可以留到最后期，请求时候应该每次都显示加载动画，或者使用wx.showloading接口来提示用户正在请求数据
4，我的页面，=》 我的关注    这一个不要了，因为和社团页的重复了
5，社联要求活动也要有分类。。。。
6，我突然想到一个问题，要不要给每个社团信息加上校区？老区和新区肯定不一样啊，虽然现在只有老区社团的资料
7，社团管理，可以修改或者删除动态，修改比较麻烦，可以先不做。。


longlong

有一个bug，活动页最后一个活动总是不能打开大图。。
解决了，是因为四张图的images没有绑定事件

0.9.7实现功能
社团管理页的功能已经完成，样式，搞一搞
搜索记录缓存bug修复

待完成：
界面问题；
一张图时候应该显示的大一点
##社团信息详情页的相册删除了吧，这个功能太难实现了

1，活动，如果可能，增加一个活动详情页，可以进行评论，查看评论
2，管理社团页，增加一个能管理活动的页面，活动不需要像活动页那样完全展示出来，只要一部分，或者尺寸调小一点，添加一个删除按钮，可以删除活动

0.9.8
待完成：
社团信息修改页资料修改过后，按钮依旧是提交修改，应该重新变为修改


0.9.14
社团页增加校区分类按钮，最好是能固定在左侧不动
社团一览表，没有任何样式。。
社团登录后，有一个消息页，页没有样式，作用是显示社团 简介的更改信息，如果社联账号登录的话，能看到所有社团所提交的更改信息，还会显示一个小齿轮，可以进行通过或拒绝，如果是普通账号，就只能看到自己的，而且无权限更改
管理账号：sst/sst   普通账号：whr/whr# wechat_shetuan_app
