# _*_ coding: utf-8 _*_
# by:Snowkingliu
# 2017/4/6 下午8:17
# 打开数据库连接
import re

import MySQLdb
import datetime

db_config = ["localhost", "root", "root", "xuejun", "utf8"]


def db_get_news(start_number, amount):
    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # SQL 查询语句 select * from xuejun.article limit 0,10;
    sql = "SELECT distinct * FROM xuejun.article order by create_time desc limit {},{};".format(start_number, amount)
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for row in results:
            id = row[0]
            title = row[3]
            # lname = row[1]
            # age = row[2]
            # sex = row[3]
            # income = row[4]
            # 打印结果
            print "id:{},title:{}".format(id, title)
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return results


def db_query_title(content):
    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # SQL 查询语句 select * from xuejun.article limit 0,10;
    sql = "SELECT * FROM xuejun.news WHERE title LIKE '%{}%' order by create_time desc".format(content)
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for row in results:
            id = row[0]
            title = row[3]
            # lname = row[1]
            # age = row[2]
            # sex = row[3]
            # income = row[4]
            # 打印结果
            print "id:{},title:{}".format(id, title)
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return results


def query_id(id):
    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    title = ''
    content = ''
    web_dic = {
        '39.net': '39健康网',
        'toutiao.com': '今日头条',
        'weibo.com': '微博',
        'qq.com': '腾讯',
        'usst.edu.cn': '上海理工大学',
    }

    # SQL 查询语句 select * from xuejun.article limit 0,10;
    sql = "SELECT * FROM xuejun.news WHERE id = {}".format(int(id))
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchone()
        title = results[3]
        content = results[4]
        createtime = results[1]
        read = results[8]
        web = web_dic[results[6]]
        cursor.execute("UPDATE xuejun.news SET `read`=`read`+1 "
                       "WHERE id = '{}' ;".format(id))
        # 提交到数据库执行
        db.commit()
        # 打印结果
        print "id:{},title:{}".format(id, title)
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return {'title': title, 'content': content, 'createtime': createtime, 'read': read, 'web': web}


def db_get_type_news(start_number, amount, type):
    tpyes = {u"男科": ("nk", "man"), u"妇科": ("fk", "woman"), u"老人": ("oldman",), u"育儿": ("baby",),
             u"整形外科": ("zx", "face"),
             u"不孕不育": ("byby",), u"肿瘤科": ("cancer",), u"胃病": ("wei",), u"肾病科": ("shen",), u"糖尿病科": ("tnb",),
             u"心血管科": ("heart",),
             u"肝病科": ("gan",), u"肛肠科": ("gc",), u"泌尿科": ("mn",), u"耳鼻喉科": ("ebh",), u"眼科": ("eye",), u"口腔科": ("mouth",),
             u"骨科": ("gk",), u"皮肤科": ("pf",), u"神经科": ("sj",), u"保健": ("care",), u"减肥": ("fitness",), u"心理科": ("xl",),
             u"美食": ("food",), u"营养科": ("food",)}

    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # SQL 查询语句 select * from xuejun.article limit 0,10;
    sql = "SELECT distinct * FROM xuejun.article where url like '%{}.39%' order by create_time desc limit {},{};".format(tpyes[type][0], start_number, amount)
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for row in results:
            id = row[0]
            title = row[3]
            # lname = row[1]
            # age = row[2]
            # sex = row[3]
            # income = row[4]
            # 打印结果
            print "id:{},title:{}".format(id, title)
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return results


def acquire_news_img(type, start_number, amount):
    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    # 查询
    # SQL 查询语句 SELECT distinct * FROM xuejun.news where image_url != '' and `type` = '肾病科' order by create_time desc limit 0,4;
    sql = "SELECT distinct * FROM xuejun.news where image_url != '' and `type` = '{}' " \
          "order by create_time desc limit {},{};".format(type, start_number, amount)
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for row in results:
            id = row[0]
            title = row[3]
            # 打印结果
            print "id:{},title:{}".format(id, title)
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return results


def acquire_news_noimg(type, start_number, amount):
    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    # 查询
    # SQL 查询语句 SELECT distinct * FROM xuejun.news where image_url != '' and `type` = '肾病科' order by create_time desc limit 0,4;
    sql = "SELECT distinct * FROM xuejun.news where image_url = '' and `type` = '{}' " \
          "order by create_time desc limit {},{};".format(type, start_number, amount)
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for row in results:
            id = row[0]
            title = row[3]
            # 打印结果
            print "id:{},title:{}".format(id, title)
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return results


def get_title(id):
    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    # 查询
    # SQL 查询语句 select title from xuejun.news where id = 32212;
    sql = "select title from xuejun.news where id = {};".format(id)
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchone()
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return results[0]


def get_id_by_tag(tag, old_id):
    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    # 查询
    # SQL 查询语句 select title from xuejun.news where id = 32212;
    sql = "select id from xuejun.news where title like '%{}%' and id != {};".format(tag[0], int(old_id[0]))
    ids = []
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for row in results:
            id = row[0]
            ids.append(id)
            if len(ids) >= 5:
                break
            # 打印结果
            print "相关id:{}".format(id)
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return ids


def get_correlation_news(ids):
    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    # 查询
    # SQL 查询语句 select title from xuejun.news where id = 32212;
    sql = "select * from xuejun.news where id = {};"
    correlations = {}
    try:
        i = 0
        for a_id in ids:
            img_urls = []
            # 执行SQL语句
            cursor.execute(sql.format(a_id))
            # 获取所有记录列表
            results = cursor.fetchone()
            id = results[0]
            title = results[3]
            content = re.findall(r'[\\u4E00-\\u9FFF]+', results[4])
            for img_url in re.findall(r'http:?[a-zA-Z0-9\&%_\./-~-]+', results[5]):
                img_urls.append(img_url)
            if img_urls:
                url = img_urls[0]
            else:
                url = ''
            correlation = {
                'id': id,
                'title': title,
                'content': content,
                'url': url,
            }
            correlations[i] = correlation
            i += 1

    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return correlations


def db_get_class_news(type, start, amount):
    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # SQL 查询语句 select * from xuejun.article limit 0,10;
    sql = "SELECT distinct * FROM xuejun.news where `type` = '{}' order by create_time desc limit {},{};".format(
        type, start, amount)
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        data = {}
        for row in results:
            a_data = {}
            a_data['id'] = row[0]
            a_data['title'] = row[3]
            a_data['image_url'] = ''
            for img_url in re.findall(r'http:?[a-zA-Z0-9\&%_\./-~-]+', row[5]):
                a_data['image_url'] = img_url
                break
            a_data['read'] = row[8]
            # 判断时间
            news_time = datetime.datetime.utcfromtimestamp(row[1] / 1000 + 8 * 3600)
            now_time = datetime.datetime.now()
            difference = now_time - news_time
            if now_time < news_time:
                a_data['createtime'] = '未来'
            elif int(now_time.strftime("%Y")) - int(news_time.strftime("%Y")) > 0:
                a_data['createtime'] = str(int(now_time.strftime("%Y")) - int(news_time.strftime("%Y"))) + '年前'
            elif int(now_time.strftime("%m")) - int(news_time.strftime("%m")) > 0:
                a_data['createtime'] = str(int(now_time.strftime("%m")) - int(news_time.strftime("%m"))) + '月前'
            elif int(now_time.strftime("%d")) - int(news_time.strftime("%d")) > 0:
                a_data['createtime'] = str(int(now_time.strftime("%d")) - int(news_time.strftime("%d"))) + '天前'
            elif int(now_time.strftime("%H")) - int(news_time.strftime("%H")) > 0:
                a_data['createtime'] = str(int(now_time.strftime("%H")) - int(news_time.strftime("%H"))) + '小时前'
            elif int(now_time.strftime("%M")) - int(news_time.strftime("%M")) > 0:
                a_data['createtime'] = str(int(now_time.strftime("%M")) - int(news_time.strftime("%M"))) + '分前'
            else:
                a_data['createtime'] = '1分钟以内'
            data[a_data['id']] = a_data

            # lname = row[1]
            # age = row[2]
            # sex = row[3]
            # income = row[4]
            # 打印结果
            print "id:{},title:{}".format(id, a_data['title'])
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return data


# 侵删
def mark_tort(tort_id):
    res = False
    # 打开数据库连接
    db = MySQLdb.connect(db_config[0], db_config[1], db_config[2], db_config[3], charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    try:
        # 执行SQL语句
        cursor.execute("UPDATE xuejun.news SET `tort`=`tort`+1 "
                       "WHERE id = '{}' ;".format(tort_id))
        # 提交到数据库执行
        db.commit()
        res = True
    except:
        print "Error: unable to fecth data"

    # 关闭数据库连接
    db.close()
    return res
