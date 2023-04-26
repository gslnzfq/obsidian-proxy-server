import { useEffect, useState } from "react";
import Image from "next/image";

export default function App() {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  return <div>
    <h3>代理服务器</h3>
    <p>使用 <a href="https://github.com/gslnzfq/obsidian-plugin-proxy">Obsidian Github Proxy</a> 请粘贴下面代码添加到配置中：
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
  </div>;
}
