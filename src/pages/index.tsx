import { useEffect, useState } from "react";

export default function App() {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
    document.title = "Obsidian Proxy Server";
  }, []);
  return (
    <div>
      <h3>代理服务器</h3>
      <p>使用
        <a target="_blank" href="https://github.com/gslnzfq/obsidian-plugin-proxy">Obsidian Github Proxy插件</a>
        的用户请粘贴下面代码添加到配置中：
      </p>
      <pre>
      {JSON.stringify({
        "id": "myproxy",
        "raw": `${origin}/api/proxy/raw/`,
        "page": `${origin}/api/proxy/site/`,
        "userImages": `${origin}/api/proxy/user-images/`,
      }, null, 2)}
    </pre>
      <h4>使用方式</h4>
      <p>打开Obsidian设置 - Plugin Proxy 进行下面设置</p>
      <img src="/obsidian_proxy.jpg" width={600} alt=""/>
      <h4>注意事项</h4>
      <p>上述是一个演示配置，有时候可能不太稳定，如果条件允许请fork该站仓库自己部署到netlify后使用。</p>
      <p>仓库地址：
        <a target="_blank" href="https://github.com/gslnzfq/obsidian-proxy-server">
          https://github.com/gslnzfq/obsidian-proxy-server
        </a>
      </p>
    </div>
  );
}
