#大转盘抽奖
##维护者邮箱:cgf_150@163.com
##维护者github:https://github.com/cgf150
##公司名称：湖南快乐益科技有限公司
##用法：
    配置参数：
        var lottery=new Lottery();
        lottery.init({
            tar:oRound,
            num:'5', //轮盘的奖项数量
            trick:'3', //要转动到哪个奖项
            fn:function(obj){ //结束之后要调用的函数，可用参数为prize，即此次得到的奖项
                alert(obj.prize)
            }
        });
        调用
        lottery.rotate();