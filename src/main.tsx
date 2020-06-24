import React, { useEffect, useRef } from "react";
import { Box, CustomRenderer, Label, Sprite } from "customRenderer";
import { Laya } from "Laya";
import { layaInit, drawShape } from "layaUtils";

function App() {
  const ref = useRef<any>();
  const ref2 = useRef<any>();

  useEffect(() => {
    drawShape(Laya.stage);
    drawShape(ref.current, "#ddd");
    drawShape(ref2.current, "#eee");
    console.log(ref.current);
  }, []);
  return (
    <Box width={300} height={300} ref={ref} centerX={0} centerY={0}>
      <Label
        text="hello world"
        fontSize={30}
        width={200}
        height={100}
        align="center"
        valign="middle"
        ref={ref2}
        centerX={0}
        centerY={0}
      />
    </Box>
  );
}

layaInit().then(() => {
  CustomRenderer.render(<App />, Laya.stage);
});
