import { useEffect, useState } from "react";

export default function App() {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
    document.title = "Obsidian Proxy Server";
  }, []);
  return (
    <div>
      <h2>Obsidian代理服务</h2>
      <p>Obsidian是一款非常优秀的笔记软件，但是由于众所周知的原因，国内用户访问官网和插件库都会比较慢，甚至无法访问。</p>
      <p>本站提供一个代理服务，可以让国内用户更快的访问Obsidian官网和插件库。</p>

      <h3>下载插件</h3>
      <p>
        <a target="_blank" href="/obsidian-plugin-proxy.zip">点击下载</a>
        <span>（该插件是基于<a target="_blank" href="https://github.com/binyu1231/obsidian-plugin-proxy">原开发者</a>修改，添加了一些功能）</span>
      </p>

      <p>在原来的基础上新增了下面的功能</p>
      <ol>
        <li>1. 支持自定义添加代理地址</li>
        <li>2. 支持图形化设置，修改，删除地址</li>
        <li>3. 优化消息提示</li>
      </ol>

      <p>如图所示</p>
      <img src="https://assets.gslnzfq.cn/files/20230427/feature.png" width={600} alt=""/>

      <h3>配置方法</h3>
      <p>打开Obsidian设置 - Plugin Proxy 进行下面设置</p>
      <p>请粘贴下面代码添加到配置中（上述的插件已经添加了就无需添加）：</p>
      <pre>
      {JSON.stringify({
        "id": "myproxy",
        "raw": `${origin}/api/proxy/raw/`,
        "page": `${origin}/api/proxy/site/`,
        "userImages": `${origin}/api/proxy/user-images/`,
      }, null, 2)}
    </pre>
      <img src="https://assets.gslnzfq.cn/files/20230427/obsidian_proxy.jpg" width={600} alt=""/>
      <h3>注意事项</h3>
      <p>上述是一个演示配置，有时候可能不太稳定，如果条件允许请fork该站仓库自己部署到netlify后使用。</p>
      <p>仓库地址：
        <a target="_blank" href="https://github.com/gslnzfq/obsidian-proxy-server">
          https://github.com/gslnzfq/obsidian-proxy-server
        </a>
      </p>
    </div>
  );
}
