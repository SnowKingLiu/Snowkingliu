# _*_ coding: utf-8 _*_
# by:Snowkingliu
# 2017/4/4 下午10:14

from xadmin import views
import xadmin


class BaseSetting(object):
    enable_themes = True
    use_bootswatch = True


class GlobalSettings(object):
    site_title = "Snowkingliu.com后台管理系统"
    site_footer = "Snowkingliu在线"
    menu_style = "accordion"

# xadmin.site.register(EmailVerifyRecord,EmailVerifyRecordAdmin)
# xadmin.site.register(Banner,BannerAdmin)
xadmin.site.register(views.BaseAdminView, BaseSetting)
xadmin.site.register(views.CommAdminView, GlobalSettings)
