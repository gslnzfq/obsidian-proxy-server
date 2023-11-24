# Obsidian Proxy Server

为了解决国内无法访问插件商店和主题商店的问题，我写了这个代理服务器，可以部署在netlify上运行。

## 部署

部署方法，请登录netlify，点击New site from Git，选择GitHub，然后选择你的仓库，点击Deploy site，稍等片刻，就可以访问你的网站了。

## 使用

需要结合Obsidian Proxy Github插件使用，插件地址：

- [Github下载最新插件](https://github.com/gslnzfq/obsidian-plugin-proxy/releases)
- [点击下载插件，可能比较旧](./public/obsidian-plugin-proxy.zip)

## 配置

部署完成后会生成一个网址，然后再obsidian中进行配置即可，配置文件如下：

```json
{
  "id": "myproxy",
  "raw": "<your site url>/api/proxy/raw/",
  "page": "<your site url>/api/proxy/site/",
  "userImages": "<your site url>/api/proxy/user-images/"
}
```

将上面的`<your site url>`替换成你的网址即可。

![](public/obsidian_proxy.jpg)

添加配置后，重启Obsidian，就可以使用了。

## 常见问题

1、 自己部署的服务，帮助页面的图片看不到了？

为了防止带宽被用完，图片没有放到本站的目录，第三方的域名有防盗链，不影响使用。