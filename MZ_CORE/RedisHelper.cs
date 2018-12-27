using Newtonsoft.Json;
using ServiceStack.Redis;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Dynamic;

namespace MZ_CORE
{
    public static class RedisHelper
    {
        private static string RedisPath = ConfigurationManager.AppSettings["RedisHost"] + ":" + ConfigurationManager.AppSettings["RedisPort"];
        //private static string readOnly = ConfigurationManager.AppSettings["RedisHostOnly"] + ":" + ConfigurationManager.AppSettings["RedisPortOnly"];



        #region -- 连接信息 --
        //http://127.0.0.1:6379
        public static PooledRedisClientManager prcm = CreateManager(new string[] { RedisPath }, new string[] { RedisPath });
        private static PooledRedisClientManager CreateManager(string[] readWriteHosts, string[] readOnlyHosts)
        {
            // 支持读写分离，均衡负载 
            return new PooledRedisClientManager(readWriteHosts, readOnlyHosts, new RedisClientManagerConfig
            {
                MaxWritePoolSize = 5, // “写”链接池链接数 
                MaxReadPoolSize = 5, // “读”链接池链接数 
                AutoStart = true,
            });
        }
        #endregion

        #region -- Redis Item --
        public static bool ExpireEntryAt(string key, DateTime time)
        {
            try
            {
                using (IRedisClient redis = prcm.GetClient())
                {
                    return redis.ExpireEntryAt(key, time);
                }
            }
            catch (Exception ex)
            {
                // LogInfo
            }
            return false;
        }
        public static bool Item_Set<T>(string key, T t)
        {
            try
            {
                using (IRedisClient redis = prcm.GetClient())
                {
                    int a = redis.Port;
                    redis.Set<T>(key, t);
                    redis.Save();
                    return true;
                }
            }
            catch (Exception ex)
            {
                // LogInfo
            }
            return false;
        }

        public static bool Item_Set<T>(string key, T t, DateTime datetime)
        {
            try
            {
                using (IRedisClient redis = prcm.GetClient())
                {
                    int a = redis.Port;
                    redis.Set<T>(key, t, datetime);
                    redis.Save();
                    return true;
                }
            }
            catch (Exception ex)
            {
                // LogInfo
            }
            return false;
        }



        /// <summary>
        /// 获取单体
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public static T Item_Get<T>(string key) where T : class
        {
            using (IRedisClient redis = prcm.GetReadOnlyClient())
            {
                int a = redis.Port;
                return redis.Get<T>(key);
            }
        }

        /// <summary>
        /// 移除单体
        /// </summary>
        /// <param name="key"></param>
        public static bool Item_Remove(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return (string.IsNullOrEmpty(key)) ? false : redis.Remove(key);
            }
        }

        #endregion

        #region -- Redis List --

        public static void List_Add<T>(string key, T t)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                redisTypedClient.AddItemToList(redisTypedClient.Lists[key], t);
            }
        }



        public static bool List_Remove<T>(string key, T t)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                return redisTypedClient.RemoveItemFromList(redisTypedClient.Lists[key], t) > 0;
            }
        }
        public static void List_RemoveAll<T>(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                redisTypedClient.Lists[key].RemoveAll();
            }
        }

        public static int List_Count(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return Convert.ToInt32(redis.GetListCount(key));
            }
        }

        public static List<T> List_GetRange<T>(string key, int start, int count)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var c = redis.As<T>();
                return c.Lists[key].GetRange(start, start + count - 1);
            }
        }


        public static List<T> List_GetList<T>(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var c = redis.As<T>();
                return c.Lists[key].GetRange(0, c.Lists[key].Count);
            }
        }

        public static List<T> List_GetList<T>(string key, int pageIndex, int pageSize)
        {
            int start = pageSize * (pageIndex - 1);
            return List_GetRange<T>(key, start, pageSize);
        }

        /// <summary>
        /// 设置缓存过期
        /// </summary>
        /// <param name="key"></param>
        /// <param name="datetime"></param>
        public static void List_SetExpire(string key, DateTime datetime)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                redis.ExpireEntryAt(key, datetime);
            }
        }
        #endregion

        #region -- Redis Set --
        public static void Set_Add<T>(string key, T t)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                redisTypedClient.Sets[key].Add(t);
            }
        }
        public static bool Set_Contains<T>(string key, T t)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                return redisTypedClient.Sets[key].Contains(t);
            }
        }
        public static bool Set_Remove<T>(string key, T t)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                return redisTypedClient.Sets[key].Remove(t);
            }
        }
        #endregion

        #region -- Redis Hash --
        /// <summary>
        /// 存储数据到hash表
        /// </summary>
        /// <param name="key"></param>
        /// <param name="dataKey"></param>
        /// <returns></returns>
        public static bool Hash_Set(string key, string dataKey, string value)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.SetEntryInHash(key, dataKey, value);
            }
        }

        /// <summary>
        /// 移除hash中的某值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="dataKey"></param>
        /// <returns></returns>
        public static bool Hash_Remove(string key, string dataKey)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.RemoveEntryFromHash(key, dataKey);
            }
        }

        /// <summary>
        /// 从hash表获取数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="dataKey"></param>
        /// <returns></returns>
        public static string Hash_Get(string key, string dataKey)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.GetValueFromHash(key, dataKey);
            }
        }

        /// <summary>
        /// 设置缓存过期
        /// </summary>
        /// <param name="key"></param>
        /// <param name="datetime"></param>
        public static void Hash_SetExpire(string key, DateTime datetime)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                redis.ExpireEntryAt(key, datetime);
            }
        }

        #endregion

        #region -- Redis SortedSet --
        /// <summary>
        ///  添加数据到 SortedSet
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <param name="score"></param>
        public static bool SortedSet_Add(string key, string value, double score)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.AddItemToSortedSet(key, value, score);
            }
        }

        /// <summary>
        /// 移除数据从SortedSet
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool SortedSet_Remove(string key, string value)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.RemoveItemFromSortedSet(key, value);
            }
        }

        /// <summary>
        /// 获取SortedSet的长度
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static int SortedSet_Count(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return Convert.ToInt32(redis.GetSortedSetCount(key));
            }
        }

        /// <summary>
        /// 获取SortedSet的全部数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public static List<T> SortedSet_GetListALL<T>(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var list = redis.GetRangeFromSortedSet(key, 0, 9999999);
                if (list != null && list.Count > 0)
                {
                    List<T> result = new List<T>();
                    foreach (var item in list)
                    {
                        result.Add(ServiceStack.Text.JsonSerializer.DeserializeFromString<T>(item));
                    }
                    return result;
                }
            }
            return null;
        }

        /// <summary>
        /// 区间查询 按照数字倒序排列 键值对
        /// </summary>
        /// <param name="key"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public static IDictionary<string, double> SortedSet_GetDictionary(string key, long start, long end)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.GetRangeWithScoresFromSortedSetByHighestScore(key, start, end);
            }
        }

        /// <summary>
        /// 区间查询 按照数字倒序排列 键
        /// </summary>
        /// <param name="key"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public static List<string> SortedSet_GetList(string key, long start, long end)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.GetRangeFromSortedSetByHighestScore(key, start, end);
            }
        }

        /// <summary>
        /// 区间查询 按照数字倒序排列 记录数 
        /// </summary>
        /// <param name="key"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public static long SortedSet_GetCount(string key, long start, long end)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.GetSortedSetCount(key, start, end);
            }
        }

        /// <summary>
        /// 设置缓存过期
        /// </summary>
        /// <param name="key"></param>
        /// <param name="datetime"></param>
        public static void SortedSet_SetExpire(string key, DateTime datetime)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                redis.ExpireEntryAt(key, datetime);
            }
        }

        /// <summary>
        /// 查询Score
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static double SortedSet_GetItemScore(string key, string value)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.GetItemScoreInSortedSet(key, value);
            }
        }
        #endregion

        public static List<ExpandoObject> AutoMap(List<dynamic> list)
        {
            List<ExpandoObject> listMap = new List<ExpandoObject>();

            foreach (string column in list)
            {
                var item = new ExpandoObject();
                var itemDictionary = (IDictionary<string, object>)item;
                string[] arr = column.Replace("{", "").Replace("}", "").Split(',');
                for (int i = 0; i < arr.Length; i++)
                {
                    string key = arr[i].Split(':')[0];
                    string value = arr[i].Split(':')[1];

                    itemDictionary.Add(key, value);
                }
                listMap.Add(item);
                // string key=column.Split(',')

                //if (_reader.IsDBNull(column.Index))
                //itemDictionary.Add(column.Name, null);
                //else
                //itemDictionary.Add(column.Name, _reader[column.Index]);
            }
            return listMap;
        }

        public static List<T> AutoMap<T>(List<T> list)
        {
            List<T> listMap = new List<T>();

            foreach (dynamic column in list)
            {
                T model = JsonConvert.DeserializeObject<T>(column);
                listMap.Add(column);
            }
            return listMap;
        }
    }

    public static class RedisHelperMobile
    {
        private static string RedisPath = ConfigurationManager.AppSettings["RedisMobileHost"] + ":" + ConfigurationManager.AppSettings["RedisMobilePort"];
        //private static string readOnly = ConfigurationManager.AppSettings["RedisMobileHostOnly"] + ":" + ConfigurationManager.AppSettings["RedisMobilePortOnly"];



        #region -- 连接信息 --
        //http://127.0.0.1:6379
        public static PooledRedisClientManager prcm = CreateManager(new string[] { RedisPath }, new string[] { RedisPath });
        private static PooledRedisClientManager CreateManager(string[] readWriteHosts, string[] readOnlyHosts)
        {
            // 支持读写分离，均衡负载 
            return new PooledRedisClientManager(readWriteHosts, readOnlyHosts, new RedisClientManagerConfig
            {
                MaxWritePoolSize = 5, // “写”链接池链接数 
                MaxReadPoolSize = 5, // “读”链接池链接数 
                AutoStart = true,
            });
        }
        #endregion

        #region -- Redis Item --
        public static bool ExpireEntryAt(string key, DateTime time)
        {
            try
            {
                using (IRedisClient redis = prcm.GetClient())
                {
                    return redis.ExpireEntryAt(key, time);
                }
            }
            catch (Exception ex)
            {
                // LogInfo
            }
            return false;
        }
        public static bool Item_Set<T>(string key, T t)
        {
            try
            {
                using (IRedisClient redis = prcm.GetClient())
                {
                    int a = redis.Port;
                    redis.Set<T>(key, t);
                    redis.Save();
                    return true;
                }
            }
            catch (Exception ex)
            {
                // LogInfo
            }
            return false;
        }

        public static bool Item_Set<T>(string key, T t, DateTime datetime)
        {
            try
            {
                using (IRedisClient redis = prcm.GetClient())
                {
                    int a = redis.Port;
                    redis.Set<T>(key, t, datetime);
                    redis.Save();
                    return true;
                }
            }
            catch (Exception ex)
            {
                // LogInfo
            }
            return false;
        }



        /// <summary>
        /// 获取单体
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public static T Item_Get<T>(string key) where T : class
        {
            using (IRedisClient redis = prcm.GetReadOnlyClient())
            {
                int a = redis.Port;
                return redis.Get<T>(key);
            }
        }

        /// <summary>
        /// 移除单体
        /// </summary>
        /// <param name="key"></param>
        public static bool Item_Remove(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return (string.IsNullOrEmpty(key)) ? false : redis.Remove(key);
            }
        }

        #endregion

        #region -- Redis List --

        public static void List_Add<T>(string key, T t)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                redisTypedClient.AddItemToList(redisTypedClient.Lists[key], t);
            }
        }



        public static bool List_Remove<T>(string key, T t)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                return redisTypedClient.RemoveItemFromList(redisTypedClient.Lists[key], t) > 0;
            }
        }
        public static void List_RemoveAll<T>(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                redisTypedClient.Lists[key].RemoveAll();
            }
        }

        public static int List_Count(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return Convert.ToInt32(redis.GetListCount(key));
            }
        }

        public static List<T> List_GetRange<T>(string key, int start, int count)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var c = redis.As<T>();
                return c.Lists[key].GetRange(start, start + count - 1);
            }
        }


        public static List<T> List_GetList<T>(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var c = redis.As<T>();
                return c.Lists[key].GetRange(0, c.Lists[key].Count);
            }
        }

        public static List<T> List_GetList<T>(string key, int pageIndex, int pageSize)
        {
            int start = pageSize * (pageIndex - 1);
            return List_GetRange<T>(key, start, pageSize);
        }

        /// <summary>
        /// 设置缓存过期
        /// </summary>
        /// <param name="key"></param>
        /// <param name="datetime"></param>
        public static void List_SetExpire(string key, DateTime datetime)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                redis.ExpireEntryAt(key, datetime);
            }
        }
        #endregion

        #region -- Redis Set --
        public static void Set_Add<T>(string key, T t)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                redisTypedClient.Sets[key].Add(t);
            }
        }
        public static bool Set_Contains<T>(string key, T t)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                return redisTypedClient.Sets[key].Contains(t);
            }
        }
        public static bool Set_Remove<T>(string key, T t)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var redisTypedClient = redis.As<T>();
                return redisTypedClient.Sets[key].Remove(t);
            }
        }
        #endregion

        #region -- Redis Hash --
        /// <summary>
        /// 存储数据到hash表
        /// </summary>
        /// <param name="key"></param>
        /// <param name="dataKey"></param>
        /// <returns></returns>
        public static bool Hash_Set(string key, string dataKey, string value)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.SetEntryInHash(key, dataKey, value);
            }
        }

        /// <summary>
        /// 移除hash中的某值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="dataKey"></param>
        /// <returns></returns>
        public static bool Hash_Remove(string key, string dataKey)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.RemoveEntryFromHash(key, dataKey);
            }
        }

        /// <summary>
        /// 从hash表获取数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="dataKey"></param>
        /// <returns></returns>
        public static string Hash_Get(string key, string dataKey)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.GetValueFromHash(key, dataKey);
            }
        }

        /// <summary>
        /// 设置缓存过期
        /// </summary>
        /// <param name="key"></param>
        /// <param name="datetime"></param>
        public static void Hash_SetExpire(string key, DateTime datetime)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                redis.ExpireEntryAt(key, datetime);
            }
        }

        #endregion

        #region -- Redis SortedSet --
        /// <summary>
        ///  添加数据到 SortedSet
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <param name="score"></param>
        public static bool SortedSet_Add(string key, string value, double score)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.AddItemToSortedSet(key, value, score);
            }
        }

        /// <summary>
        /// 移除数据从SortedSet
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static bool SortedSet_Remove(string key, string value)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.RemoveItemFromSortedSet(key, value);
            }
        }

        /// <summary>
        /// 获取SortedSet的长度
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static int SortedSet_Count(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return Convert.ToInt32(redis.GetSortedSetCount(key));
            }
        }

        /// <summary>
        /// 获取SortedSet的全部数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public static List<T> SortedSet_GetListALL<T>(string key)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                var list = redis.GetRangeFromSortedSet(key, 0, 9999999);
                if (list != null && list.Count > 0)
                {
                    List<T> result = new List<T>();
                    foreach (var item in list)
                    {
                        result.Add(ServiceStack.Text.JsonSerializer.DeserializeFromString<T>(item));
                    }
                    return result;
                }
            }
            return null;
        }

        /// <summary>
        /// 区间查询 按照数字倒序排列 键值对
        /// </summary>
        /// <param name="key"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public static IDictionary<string, double> SortedSet_GetDictionary(string key, long start, long end)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.GetRangeWithScoresFromSortedSetByHighestScore(key, start, end);
            }
        }

        /// <summary>
        /// 区间查询 按照数字倒序排列 键
        /// </summary>
        /// <param name="key"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public static List<string> SortedSet_GetList(string key, long start, long end)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.GetRangeFromSortedSetByHighestScore(key, start, end);
            }
        }

        /// <summary>
        /// 区间查询 按照数字倒序排列 记录数 
        /// </summary>
        /// <param name="key"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public static long SortedSet_GetCount(string key, long start, long end)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.GetSortedSetCount(key, start, end);
            }
        }

        /// <summary>
        /// 设置缓存过期
        /// </summary>
        /// <param name="key"></param>
        /// <param name="datetime"></param>
        public static void SortedSet_SetExpire(string key, DateTime datetime)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                redis.ExpireEntryAt(key, datetime);
            }
        }

        /// <summary>
        /// 查询Score
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static double SortedSet_GetItemScore(string key, string value)
        {
            using (IRedisClient redis = prcm.GetClient())
            {
                return redis.GetItemScoreInSortedSet(key, value);
            }
        }
        #endregion

        public static List<ExpandoObject> AutoMap(List<dynamic> list)
        {
            List<ExpandoObject> listMap = new List<ExpandoObject>();

            foreach (string column in list)
            {
                var item = new ExpandoObject();
                var itemDictionary = (IDictionary<string, object>)item;
                string[] arr = column.Replace("{", "").Replace("}", "").Split(',');
                for (int i = 0; i < arr.Length; i++)
                {
                    string key = arr[i].Split(':')[0];
                    string value = arr[i].Split(':')[1];

                    itemDictionary.Add(key, value);
                }
                listMap.Add(item);
                // string key=column.Split(',')

                //if (_reader.IsDBNull(column.Index))
                //itemDictionary.Add(column.Name, null);
                //else
                //itemDictionary.Add(column.Name, _reader[column.Index]);
            }
            return listMap;
        }

        public static List<T> AutoMap<T>(List<T> list)
        {
            List<T> listMap = new List<T>();

            foreach (dynamic column in list)
            {
                T model = JsonConvert.DeserializeObject<T>(column);
                listMap.Add(column);
            }
            return listMap;
        }
    }
}
