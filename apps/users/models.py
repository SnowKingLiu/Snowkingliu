# _*_ coding: utf-8 _*_
from __future__ import unicode_literals

import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models


# class UserProfile(AbstractUser):
#     nick_name = models.CharField(max_length=50, verbose_name=u"昵称", default="")
#     birday = models.DateField(verbose_name=u"生日", null = True, blank=True)
#     gender = models.CharField(choices=(("male", u"男"), ("female", "女")),default="femal", verbose_name=u"性别",
#                               max_length=6)
#     address = models.CharField(max_length=100, default="")
#     mobile = models.CharField(max_length=11, null=11, blank=True)
#     image = models.ImageField(upload_to="img/userimage/%Y/%m", default=u"img/image/default.png", max_length=100)
#
#     class Meta:
#         verbose_name = "用户信息"
#         verbose_name_plural = verbose_name
#
#     def __unicode__(self):
#         return self.username

#
# class EmailVerifyRecord(models.Model):
#     code = models.CharField(max_length=20,verbose_name=u"验证码")
#     email = models.EmailField(max_length=50,verbose_name=u"邮箱")
#     send_type = models.CharField(choices=(("register",u"注册"), ("forget",u"找回密码")),max_length=10, verbose_name=u"验证码类型")
#     send_time = models.DateTimeField(default=datetime.datetime.now,verbose_name=u"发送时间")
#
#     class Meta:
#         verbose_name = "邮箱验证码"
#         verbose_name_plural = verbose_name
#
#     def __unicode__(self):
#         return '{0}({1})' .format(self.code,self.email)
