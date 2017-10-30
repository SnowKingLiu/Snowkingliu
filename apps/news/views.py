# _*_ coding: utf-8 _*_
import re
import time

import datetime
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from snownlp import SnowNLP

from extra_db import db_get_news, db_query_title, query_id, db_get_type_news, acquire_news_img,\
    acquire_news_noimg, get_title, get_id_by_tag, get_correlation_news, db_get_class_news, \
    mark_tort


def news(request):
    return render(request, 'news_home.html', {'tiytle': '资讯'})


# def

# api
def get_news(request):
    ts = int(time.time())
    res = {
        "success": False,
        "msg": "",
        "data": None,
        "timestamp": ts
        }
    if request.method == 'GET':
        try:
            # 取出资讯
            data_news = []

            for new in db_get_news(0, 100):
                one = {}
                img_urls = []
                one['id'] = new[0]
                for img_url in re.findall(r'http:?[a-zA-Z0-9\&%_\./-~-]+', new[5]):
                    img_urls.append(img_url)
                one['title'] = new[3]
                one['img_urls'] = img_urls
                data_news.append(one)

            res['news'] = data_news
            res['success'] = True
        except Exception as e:
            res['msg'] = str(e.message)

    return JsonResponse(res)


def query_title(request):
    # 模糊查询标题
    ts = int(time.time())
    res = {
        "success": False,
        "msg": "",
        "data": None,
        "timestamp": ts
    }
    if request.method == 'GET':
        try:
            # 取出资讯
            data_news = []
            for new in db_query_title(request.GET['content']):
                one = {}
                img_urls = []
                one['id'] = new[0]
                for img_url in re.findall(r'http:?[a-zA-Z0-9\&%_\./-~-]+', new[5]):
                    img_urls.append(img_url)
                one['title'] = new[3]
                one['img_urls'] = img_urls
                data_news.append(one)

            res['news'] = data_news
            res['success'] = True
        except Exception as e:
            res['msg'] = str(e.message)

    return render(request, 'news_search.html', {'search': request.GET['content'], })


def get_category_news(request):
    ts = int(time.time())
    res = {
        "success": False,
        "msg": "",
        "data": None,
        "timestamp": ts
    }
    if request.method == 'GET':
        try:
            # 取出资讯
            data_news = []

            for new in db_get_type_news(0, 100, request.GET['type']):
                one = {}
                img_urls = []
                one['id'] = new[0]
                for img_url in re.findall(r'http:?[a-zA-Z0-9\&%_\./-~-]+', new[5]):
                    img_urls.append(img_url)
                one['title'] = new[3]
                one['img_urls'] = img_urls
                data_news.append(one)

            res['news'] = data_news
            res['success'] = True
        except Exception as e:
            res['msg'] = str(e.message)

    return JsonResponse(res)


def acquire_news(request):
    ts = int(time.time())
    res = {
        "success": False,
        "msg": "",
        "data": None,
        "timestamp": ts
    }
    web_dic = {
        '39.net': '39健康网',
        'toutiao.com': '今日头条',
        'weibo.com': '微博',
        'qq.com': '腾讯',
        'usst.edu.cn': '上海理工大学',
    }
    data = {}
    if request.method == 'GET':
        try:
            # 获取类别
            article_type = request.GET['type']
            article_amount = int(request.GET['amount'])
            if article_amount == 0:
                article_amount_img = 3
                article_amount_noimg = 2

            # 取出带图片资讯
            data_news_img = []
            # 取出无图片资讯
            data_news_noimg = []
            for new in acquire_news_img(article_type, 0, article_amount_img):
                one = {}
                img_urls = []
                one['id'] = new[0]
                for img_url in re.findall(r'http:?[a-zA-Z0-9\&%_\./-~-]+', new[5]):
                    img_urls.append(img_url)
                one['title'] = new[3]
                one['img_urls'] = img_urls
                one['read'] = new[8]
                one['type'] = new[7]
                one['web'] = web_dic[new[6]]
                # 判断时间
                news_time = datetime.datetime.utcfromtimestamp(new[1] / 1000 + 8 * 3600)
                now_time = datetime.datetime.now()
                difference = now_time - news_time
                if now_time < news_time:
                    one['createtime'] = '未来'
                elif int(now_time.strftime("%Y")) - int(news_time.strftime("%Y")) > 0:
                    one['createtime'] = str(int(now_time.strftime("%Y")) - int(news_time.strftime("%Y"))) + '年前'
                elif int(now_time.strftime("%m")) - int(news_time.strftime("%m")) > 0:
                    one['createtime'] = str(int(now_time.strftime("%m")) - int(news_time.strftime("%m"))) + '月前'
                elif int(now_time.strftime("%d")) - int(news_time.strftime("%d")) > 0:
                    one['createtime'] = str(int(now_time.strftime("%d")) - int(news_time.strftime("%d"))) + '天前'
                elif int(now_time.strftime("%H")) - int(news_time.strftime("%H")) > 0:
                    one['createtime'] = str(int(now_time.strftime("%H")) - int(news_time.strftime("%H"))) + '小时前'
                elif int(now_time.strftime("%M")) - int(news_time.strftime("%M")) > 0:
                    one['createtime'] = str(int(now_time.strftime("%M")) - int(news_time.strftime("%M"))) + '分前'
                else:
                    one['createtime'] = '1分钟以内'
                data_news_img.append(one)
            for new in acquire_news_noimg(article_type, 0, article_amount_noimg):
                one = {}
                one['id'] = new[0]
                one['title'] = new[3]
                one['read'] = new[8]
                one['type'] = new[7]
                one['web'] = web_dic[new[6]]
                # 判断时间
                news_time = datetime.datetime.utcfromtimestamp(new[1]/1000 + 8 * 3600)
                now_time = datetime.datetime.now()
                difference = now_time - news_time
                if now_time < news_time:
                    one['createtime'] = '未来'
                elif int(now_time.strftime("%Y")) - int(news_time.strftime("%Y")) > 0:
                    one['createtime'] = str(int(now_time.strftime("%Y")) - int(news_time.strftime("%Y"))) + '年前'
                elif int(now_time.strftime("%m")) - int(news_time.strftime("%m")) > 0:
                    one['createtime'] = str(int(now_time.strftime("%m")) - int(news_time.strftime("%m"))) + '月前'
                elif int(now_time.strftime("%d")) - int(news_time.strftime("%d")) > 0:
                    one['createtime'] = str(int(now_time.strftime("%d")) - int(news_time.strftime("%d"))) + '天前'
                elif int(now_time.strftime("%H")) - int(news_time.strftime("%H")) > 0:
                    one['createtime'] = str(int(now_time.strftime("%H")) - int(news_time.strftime("%H"))) + '小时前'
                elif int(now_time.strftime("%M")) - int(news_time.strftime("%M")) > 0:
                    one['createtime'] = str(int(now_time.strftime("%M")) - int(news_time.strftime("%M"))) + '分前'
                else:
                    one['createtime'] = '1分钟以内'
                data_news_noimg.append(one)
            data[article_type.decode()] = {'img': data_news_img, 'no_img': data_news_noimg}

            res['data'] = data
            res['success'] = True
        except Exception as e:
            res['msg'] = str(e.message)

    return JsonResponse(res)


# 获取主页 开销太大 用上面的
def home_news(request):
    ts = int(time.time())
    res = {
        "success": False,
        "msg": "",
        "data": {},
        "timestamp": ts
    }
    type_list = {u'肿瘤科': 0, u'胃病': 0, u'糖尿病科': 0, u'心血管科': 0, u'肝病科': 0, u'肾病科': 0,
                 u'男科': 0, u'妇科': 0, u'耳鼻喉科': 0, u'眼科': 0, u'口腔科': 0, u'神经科': 0, u'骨科': 0, u'泌尿科': 0,
                 u'皮肤科': 0, u'营养科': 0, u'肛肠科': 0, u'整形外科': 0, u'不孕不育': 0, u'心理科': 0, u'育儿': 0,
                 u'老人': 0, u'保健': 0, u'养生': 0, u'减肥': 0, u'科普': 0, u'体育': 0, u'社会': 0, u'科技': 0, u'时尚': 0,
                 u'军事': 0, u'财经': 0, u'美食': 0}
    if request.method == 'GET':
        try:
            data = {}
            for a_type in type_list:
                # 获取类别
                article_type = a_type
                article_amount_img = 3
                article_amount_noimg = 2

                # 取出带图片资讯
                data_news_img = []
                data_news_noimg = []
                for new in acquire_news_img(article_type, 0, article_amount_img):
                    one = {}
                    img_urls = []
                    one['id'] = new[0]
                    for img_url in re.findall(r'http:?[a-zA-Z0-9\&%_\./-~-]+', new[5]):
                        img_urls.append(img_url)
                    one['title'] = new[3]
                    one['img_urls'] = img_urls
                    one['read'] = new[1]
                    one['read'] = new[7]
                    data_news_img.append(one)
                for new in acquire_news_noimg(article_type, 0, article_amount_noimg):
                    one = {}
                    one['id'] = new[0]
                    one['title'] = new[3]
                    one['read'] = new[1]
                    one['read'] = new[7]
                    data_news_noimg.append(one)
                data[a_type.decode()] = {'img': data_news_img, 'no_img': data_news_noimg}

            res['success'] = True
        except Exception as e:
            res['msg'] = str(e.message)

    return JsonResponse(res)


# 获取文章
def read_article(request):
    path = request.path_info
    id = re.findall(r'\d+', path)
    news_id = query_id(id[0])

    createtime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(news_id['createtime']) / 1000))
    read = news_id['read']
    title = news_id['title']
    content = news_id['content']
    web = news_id['web']

    return render(request, 'news_article.html', {'title': title, 'content': content, 'createtime': createtime,
                                                 'read': read, 'web': web})


def news_correlation(request):
    id = re.findall(r'\d+', request.GET['pathname'])
    s = SnowNLP(get_title(int(id[0])).decode())
    s_tags = s.tags
    ids = []
    for s_tag in s_tags:
        if len(ids) >= 10:
            break
        if s_tag[1] == "n" or s_tag[1] == "vn":
            for a_id in get_id_by_tag(s_tag, id):
                if len(ids) >= 10:
                    break
                ids.append(a_id)
    correlations = get_correlation_news(ids)
    return JsonResponse(correlations)


def news_class(request):
    path = request.path_info
    class_type = path.split('/')[-1]
    type_dic = {'推荐': 'recommend', '肿瘤科': 'cancer', '胃病': 'stomach', '糖尿病科': 'diabetes', '心血管科': 'cvd',
                '肝病科': 'liver', '肾病科': 'kidney', '男科': 'man', '妇科': 'woman', '耳鼻喉科': 'ent', '眼科': 'eye',
                '口腔科': 'mouth', '神经科': 'nerve', '骨科': 'bone', '泌尿科': 'urinary', '皮肤科': 'skin',
                '营养科': 'nutrition', '肛肠科': 'anorectum', '整形外科': 'plastic', '不孕不育': 'infertility',
                '心理科': 'psychology', '育儿': 'baby', '老人': 'oldman', '保健': 'care', '养生': 'health',
                '减肥': 'weight', '科普': 'science', '体育': 'sports', '社会': 'society', '科技': 'technology',
                '时尚': 'fashion', '军事': 'military', '财经': 'economy', '美食': 'cate'}
    type = list(type_dic.keys())[list(type_dic.values()).index(class_type)]

    return render(request, 'news_class.html', {'title': type, })


def get_class_news(request):
    path = request.GET['pathname']
    class_type = path.split('/')[-1]
    type_dic = {'推荐': 'recommend', '肿瘤科': 'cancer', '胃病': 'stomach', '糖尿病科': 'diabetes', '心血管科': 'cvd',
                '肝病科': 'liver', '肾病科': 'kidney', '男科': 'man', '妇科': 'woman', '耳鼻喉科': 'ent', '眼科': 'eye',
                '口腔科': 'mouth', '神经科': 'nerve', '骨科': 'bone', '泌尿科': 'urinary', '皮肤科': 'skin',
                '营养科': 'nutrition', '肛肠科': 'anorectum', '整形外科': 'plastic', '不孕不育': 'infertility',
                '心理科': 'psychology', '育儿': 'baby', '老人': 'oldman', '保健': 'care', '养生': 'health',
                '减肥': 'weight', '科普': 'science', '体育': 'sports', '社会': 'society', '科技': 'technology',
                '时尚': 'fashion', '军事': 'military', '财经': 'economy', '美食': 'cate'}
    type = list(type_dic.keys())[list(type_dic.values()).index(class_type)]
    last_time = int(request.GET['last_time'])
    news = db_get_class_news(type, last_time * 30, 30)

    return JsonResponse(news)


    # id = re.findall(r'\d+', path)
    # news_id = query_id(id[0])
    #
    # createtime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(news_id['createtime']) / 1000))
    # read = news_id['read']
    # title = news_id['title']
    # content = news_id['content']
    #
    # return render(request, 'news_article.html', {'title': title, 'content': content,
    #                                              'createtime': createtime, 'read': read})


def tort(request):
    tort_id = re.findall(r'\d+', request.POST['url'])

    return JsonResponse({'success': mark_tort(tort_id[0])})


def search_news(request):
    # 模糊查询标题
    ts = int(time.time())
    res = {
        "success": False,
        "msg": "",
        "data": None,
        "timestamp": ts
    }
    html = ''
    a_html_img = '''
    <div class="news-piece-out">
        <a style="color: inherit" href="/news/n{id}">
            <div class="news-piece snow-size-3">
                <!--标题-->
                <h3>{title}</h3>
                <!--操作-->
                <div>
                    <span class="glyphicon glyphicon-time" style="color: #999999;">{createtime}</span>
                    <b style="color: #999999;">|</b>
                    <span class="glyphicon glyphicon-comment" style="color: #999999;">{read}</span>
                </div>
                <!--图片-->
                <div class="news-img-sm">
                    <img class="news_img" src="{img_url}" alt="{title}">
                </div>
            </div>
        </a>
    </div>
    '''
    a_html_noimg = '''
    <div class="news-piece-out">
        <a style="color: inherit" href="/news/n{id}">
            <div class="news-piece snow-size-3-0">
                <!--标题-->
                <h3>{title}</h3>
                <!--操作-->
                <div>
                    <span class="glyphicon glyphicon-time" style="color: #999999;">{createtime}</span>
                    <b style="color: #999999;">|</b>
                    <span class="glyphicon glyphicon-comment" style="color: #999999;">{read}</span>
                </div>
            </div>
        </a>
    </div>
    '''
    a_html_1 = '''
    <div id = "row_1" class ="col-lg-3 col-md-3 col-sm-3" >

    '''
    a_html_2 = '''
    <div id = "row_2" class ="col-lg-3 col-md-3 col-sm-3" >

    '''
    a_html_3 = '''
    <div id = "row_3" class ="col-lg-3 col-md-3 col-sm-3" >

    '''
    a_html_4 = '''
    <div id = "row_4"  class ="col-lg-3 col-md-3 col-sm-3" >

    '''

    a_1 = 0
    a_2 = 0
    a_3 = 0
    a_4 = 0
    now_time = datetime.datetime.now()

    if request.method == 'GET':
        try:
            # 取出资讯
            # '2', '1493533635107', 'http://tnb.39.net/a/2011117/1837354.html', '使用胰岛素泵后不能忽视锻炼', '<p>（责任编辑：司徒穗铮）</p>', '', '39.net', '糖尿病科', '0', '0', '0'
            data_news = []
            for new in db_query_title(request.GET['content']):
                img_url = ''
                for a_img_url in re.findall(r'http:?[a-zA-Z0-9\&%_\./-~-]+', new[5]):
                    img_url = a_img_url
                    break

                # 判断时间
                news_time = datetime.datetime.utcfromtimestamp(new[1] / 1000 + 8 * 3600)
                difference = now_time - news_time
                if now_time < news_time:
                    createtime = '未来'
                elif int(now_time.strftime("%Y")) - int(news_time.strftime("%Y")) > 0:
                    createtime = str(int(now_time.strftime("%Y")) - int(news_time.strftime("%Y"))) + '年前'
                elif int(now_time.strftime("%m")) - int(news_time.strftime("%m")) > 0:
                    createtime = str(int(now_time.strftime("%m")) - int(news_time.strftime("%m"))) + '月前'
                elif int(now_time.strftime("%d")) - int(news_time.strftime("%d")) > 0:
                    createtime = str(int(now_time.strftime("%d")) - int(news_time.strftime("%d"))) + '天前'
                elif int(now_time.strftime("%H")) - int(news_time.strftime("%H")) > 0:
                    createtime = str(int(now_time.strftime("%H")) - int(news_time.strftime("%H"))) + '小时前'
                elif int(now_time.strftime("%M")) - int(news_time.strftime("%M")) > 0:
                    createtime = str(int(now_time.strftime("%M")) - int(news_time.strftime("%M"))) + '分前'
                else:
                    createtime = '1分钟以内'
                if img_url != '':
                    temp_html = a_html_img.format(id=new[0], title=new[3], createtime=createtime, read=new[8],
                                                  img_url=img_url)
                    if a_1 <= a_2 and a_1 <= a_3 and a_1 <= a_4:
                        a_1 += 2
                        a_html_1 += temp_html
                    elif a_2 <= a_3 and a_2 < a_4:
                        a_2 += 2
                        a_html_2 += temp_html
                    elif a_3 <= a_4:
                        a_3 += 2
                        a_html_3 += temp_html
                    else:
                        a_4 += 2
                        a_html_4 += temp_html
                else:
                    temp_html = a_html_noimg.format(id=new[0], title=new[3], createtime=createtime, read=new[8])
                    if a_1 <= a_2 and a_1 <= a_3 and a_1 <= a_4:
                        a_1 += 1
                        a_html_1 += temp_html
                    elif a_2 <= a_3 and a_2 < a_4:
                        a_2 += 1
                        a_html_2 += temp_html
                    elif a_3 <= a_4:
                        a_3 += 1
                        a_html_3 += temp_html
                    else:
                        a_4 += 1
                        a_html_4 += temp_html
            a_html_1 += '</div>'
            a_html_2 += '</div>'
            a_html_3 += '</div>'
            a_html_4 += '</div>'
            html = a_html_1 + a_html_2 + a_html_3 + a_html_4
        except Exception as e:
            return render(request, 'news_search.html', {'search': '出错了！', 'content': e})
    return render(request, 'news_search.html', {'search': request.GET['content'], 'content': html})

