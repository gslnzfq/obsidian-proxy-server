// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const baseUrls: Record<string, string> = {
  "raw": "https://raw.githubusercontent.com",
  "user-images": "https://user-images.githubusercontent.com",
  "site": "https://github.com",
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug as string[];
  const [target, ...url] = slug as [string, string];
  if (!url.length) {
    res.status(400).json({msg: "参数不能为空"});
    return;
  }
  // 类型检查，必须是已存在的
  if (!baseUrls[target]) {
    res.status(400).json({msg: "路径不合法"});
    return;
  }
  const requestUrl = `${baseUrls[target]}/${url.join("/")}`;
  console.log("requestUrl", requestUrl);

  const isJSON = requestUrl.endsWith(".json");
  const isMD = requestUrl.endsWith(".md");
  axios.get(requestUrl).then(response => {
    if (isJSON) {
      return res.status(response.status).json(response.data);
    }
    if (isMD) {
      // 替换https://github.com开头的图片资源为本站代理的的图片
      response.data = response.data.replace(/https:\/\/github.com\/(\S*?)\/(\S*?)\/blob\/(.*)\)/g, function (match: string, user: string, repos: string, path: string) {
        return `${req.headers["x-forwarded-proto"]}://${req.headers["host"]}/api/proxy/raw/${user}/${repos}/${path})`;
      });
    }
    res.status(response.status).end(response.data);
  });
}
