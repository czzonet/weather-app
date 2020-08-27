import { parse } from "https://deno.land/std@0.61.0/flags/mod.ts";

/** 获取城市输入 */
const args = parse(Deno.args);
const city = args.city;
let isCitySeted = false;
if (typeof city === "string") {
  isCitySeted = true;
  console.log("指定城市：", city);
} else {
  console.log("指定城市：", "基于IP所在地的城市");
}

/** 查询天气API */
const appid = "your-appid";
const appsecret = "your-appsecret";

let url = `https://tianqiapi.com/api?version=v1&appid=${appid}&appsecret=${appsecret}`;
if (isCitySeted) {
  url += `&city=${city}`;
}

const res = await fetch(url);
const weatherObj = await res.json();

/** 输出查询结果 */
console.log(`【${weatherObj.city}】七日天气预报`);

weatherObj.data.forEach((d: any, i: any) => {
  console.log("--------");

  console.log("日期：", d.day);
  console.log("天气：", d.wea);
  console.log("温度范围：" + d.tem2 + ` ～` + d.tem1);
  console.log("风向：", d.win[0] == d.win[1] ? d.win[0] : d.win.join("转"));
  console.log("风力等级", d.win_speed);
  if (i === 0) {
    console.log("实时温度：", d.tem);
    console.log("实时湿度：", d.humidity);
    console.log("空气质量：", d.air);
    console.log("空气质量等级：", d.air_level);
    console.log("空气质量描述：", d.air_tips);
  }
});
