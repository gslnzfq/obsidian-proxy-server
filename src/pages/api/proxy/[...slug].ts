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
  axios.get(requestUrl).then(response => {
    if (isJSON) {
      return res.status(response.status).json(response.data);
    }
    res.status(response.status).end(response.data);
  });
}
