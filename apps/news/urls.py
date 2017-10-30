# _*_ coding: utf-8 _*_
# by:Snowkingliu
# 2017/4/5 下午5:25

from django.conf.urls import url
from django.views.generic import TemplateView

from news.views import get_news, query_title, read_article, get_category_news, news,\
    acquire_news, home_news, news_correlation, news_class, get_class_news, tort,\
    search_news

urlpatterns = [
    # url(r'^home', news_home, name='news_home'),
    # url('^$', TemplateView.as_view(template_name="home.html"), name="home"),
    # url(r'^news/$', news),
    url(r'^$', news),
    url(r'^get_news', get_news, name='get_news'),
    url(r'^acquire_news', acquire_news, name='acquire_news'),
    url(r'^query_title', query_title, name='query_title'),
    url(r'n\d+', read_article, name='read_article'),
    url(r'^get_category_news/?.+', get_category_news, name='get_category_news'),
    url(r'^home_news/?.+', home_news, name='home_news'),
    url(r'^news_correlation/?.+', news_correlation, name='news_correlation'),
    url(r'^class/?.+', news_class, name='news_class'),
    url(r'^get_class_news/?.+', get_class_news, name='get_class_news'),
    url(r'^tort', tort, name='tort'),
    url(r'^search_news/?.+', search_news, name='search_news'),

]
