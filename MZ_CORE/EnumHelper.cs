using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MZ_CORE
{
    public class EnumHelper
    {

        /// <summary>  
        /// 枚举转字典集合  
        /// </summary>  
        /// <typeparam name="T">枚举类名称</typeparam>  
        /// <param name="keyDefault">默认key值</param>  
        /// <param name="valueDefault">默认value值</param>  
        /// <returns>返回生成的字典集合</returns>  
        public static Dictionary<string, object> EnumListDic<T>(string keyDefault, string valueDefault = "")
        {
            Dictionary<string, object> dicEnum = new Dictionary<string, object>();
            Type enumType = typeof(T);
            if (!enumType.IsEnum)
            {
                return dicEnum;
            }
            if (!string.IsNullOrEmpty(keyDefault)) //判断是否添加默认选项  
            {
                dicEnum.Add(keyDefault, valueDefault);
            }
            string[] fieldstrs = Enum.GetNames(enumType); //获取枚举字段数组  
            foreach (var item in fieldstrs)
            {
                string description = string.Empty;
                var field = enumType.GetField(item);
                object[] arr = field.GetCustomAttributes(typeof(DescriptionAttribute), true); //获取属性字段数组  
                if (arr != null && arr.Length > 0)
                {
                    description = ((DescriptionAttribute)arr[0]).Description;   //属性描述  
                }
                else
                {
                    description = item;  //描述不存在取字段名称  
                }
                dicEnum.Add(description, (int)Enum.Parse(enumType, item));  //不用枚举的value值作为字典key值的原因从枚举例子能看出来，其实这边应该判断他的值不存在，默认取字段名称  
            }
            return dicEnum;
        }
    }


    /// <summary>
    /// 考勤打卡加班计算规则
    /// </summary>
    public enum KQDKEmun
    {
        //加班开始时间以下班时间做为计算起点，最后一次打卡时间为终点计算出加班时间
        [Description("以下班时间")]
        A = 1,
        //以打加班卡时间：在班次段中设置班次类型为加班段，设置加班卡的打卡时间，打加班上班卡及加班下班卡，推算出加班时间
        [Description("以打加班卡时间")]
        B = 2,
        //不考虑加班
        [Description("不计算")]
        C = 3
    }

    /// <summary>
    /// 考勤加班计算取整规则(分钟)
    /// </summary>
    public enum KQJBEmun
    {
        //代表计算出来的加班时间换算成小时时直接按四舍五入的方式折合小时数（保留1位小数）
        [Description("0")]
        A = 0,
        //代表计算出来的加班时间换算成小时时按30分钟取整型小值
        [Description("30")]
        B = 30,
        //代表计算出来的加班时间换算成小时时按60分钟取整型小值
        [Description("60")]
        C = 60
    }


    /// <summary>
    /// 加班计数方式
    /// </summary>
    public enum KQJBJSEmun
    {
        //计时
        [Description("计时")]
        A = 1,
        //计数
        [Description("计数")]
        B = 2
       
    }



    /// <summary>
    /// 上班刷卡
    /// </summary>
    public enum KQSBSKEmun
    {
        //无
        [Description("==请选择==")]
        A = -1,
        //代表上班不刷卡
        [Description("上班不刷卡")]
        B = 0,
        //代表上班刷卡
        [Description("上班刷卡")]
        C = 1
       
    }


    /// <summary>
    /// 下班刷卡
    /// </summary>
    public enum KQXBSKEmun
    {
        //无
        [Description("==请选择==")]
        A = -1,
        //代表下班不刷卡
        [Description("下班不刷卡")]
        B = 0,
        //代表下班刷卡
        [Description("下班刷卡")]
        C = 1

    }



    /// <summary>
    /// 跨天
    /// </summary>
    public enum KQKTEmun
    {
        //无
        [Description("==请选择==")]
        A = -1,
        //代表班段不跨天
        [Description("班段不跨天")]
        B = 0,
        //代表班段跨天
        [Description("班段跨天")]
        C = 1

    }


    /// <summary>
    /// 班段类型
    /// </summary>
    public enum KQBDLXEmun
    {
        //正常上下班的时段，用来计算旷工、早退、迟到的时间段 
        [Description("正常段")]
        A = 1,
        //用来计算加班的时间段
        [Description("加班段")]
        B = 2,
        //主要用于查看，不做任何数据处理
        [Description("休息段")]
        C = 3

    }


    /// <summary>
    /// 周期单位
    /// </summary>
    public enum KQZYREmun
    {
        //日
        [Description("按日")]
        A = 1,
        //周
        [Description("按周")]
        B = 2,
        //月
        [Description("按月")]
        C = 3

    }



    /// <summary>
    /// 适用对象
    /// </summary>
    public enum KQSYDXEmun
    {
        //全部
        [Description("全部")]
        A = 0,
        //部门
        [Description("部门")]
        B = 1,
        //考勤班组
        [Description("考勤班组")]
        C = 2,
        [Description("员工")]
        D = 3

    }
}

