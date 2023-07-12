// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
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

  const isImage = /\.(png|jpe?g|webp|gif|bmp)$/i.test(requestUrl);

  axios.get(requestUrl, {
    responseType: isImage ? 'arraybuffer' : 'text'
  }).then(response => {
    if (isImage) {
      res.setHeader('content-type', response.headers['content-type']);
      res.setHeader('cache-control', 'public, max-age=31536000, immutable');
      res.status(response.status).end(response.data);
      return;
    }
    // 替换https://github.com开头的图片资源为本站代理的的图片
    response.data = response.data.replace(/https:\/\/github.com\/(\S*?)\/(\S*?)\/blob\/(.*)\)/g, function (match: string, user: string, repos: string, path: string) {
      return `${req.headers["x-forwarded-proto"]}://${req.headers["host"]}/api/proxy/raw/${user}/${repos}/${path})`;
    });
    res.status(response.status).end(response.data);
  });
}
