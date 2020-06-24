import { Laya, loader } from "Laya";
import { AtlasInfoManager } from "laya/net/AtlasInfoManager";
import { Handler } from "laya/utils/Handler";
import { Sprite } from "laya/display/Sprite";
import { Point } from "laya/maths/Point";

export function layaInit() {
  return new Promise((resolve) => {
    Laya.init(500, 500);
    Laya.stage.scaleMode = "fixedwidth";
    Laya.stage.screenMode = "horizontal";
    Laya.stage.alignV = "middle";
    Laya.stage.alignH = "center";
    AtlasInfoManager.enable(
      "fileconfig.json",
      Handler.create(null, async () => {
        resolve();
      })
    );
  });
}

export type FunProgress = (progress: number) => void;

/** 加载资源... */
export function loadRes(res: string[], on_progress?: FunProgress) {
  return new Promise((resolve, reject) => {
    let loading_fun: Handler;
    if (on_progress) {
      loading_fun = new Handler(
        null,
        (val: number) => {
          on_progress(val);
        },
        null,
        false
      );
    }
    const loaded_fn = new Handler(this, () => {
      setImmediate(resolve);
    });

    loader.load(res, loaded_fn, loading_fun);
  });
}

export function drawShape(node: Sprite, color = "#fff") {
  let { width: w, height: h } = node.getBounds();
  const { width, height } = node;
  w = Math.max(w, width);
  h = Math.max(h, height);
  node.graphics.clear();
  node.graphics.drawRect(0, 0, w, h, color);
}
