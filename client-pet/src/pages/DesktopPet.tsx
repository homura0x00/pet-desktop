import { useCallback, useRef, useState } from "react";
import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";

import { BunnySprite } from "@/components/BunnySprite.tsx";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

extend({ Container, Graphics, Sprite });

const WIDTH = 320;
const HEIGHT = 480;

/** 鼠标离开宠物后悬浮菜单保持可见的时长 (ms) */
export const MENU_HIDE_DELAY_MS = 3000;


export default function DesktopPet() {
  const [menuVisible, setMenuVisible] = useState(false);

  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hoveringPetRef = useRef(false);

  const cancelHide = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = undefined;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    cancelHide();
    hideTimerRef.current = setTimeout(() => {
      setMenuVisible(false);
    }, MENU_HIDE_DELAY_MS);
  }, [cancelHide]);

  const handlePetHover = useCallback(
    (hovered: boolean) => {
      hoveringPetRef.current = hovered;
      if (hovered) {
        cancelHide();
        setMenuVisible(true);
      } else {
        scheduleHide();
      }
    },
    [cancelHide, scheduleHide],
  );

  return (
    <div
      className="relative select-none overflow-hidden"
      style={{ width: WIDTH, height: HEIGHT }}
    >
      <Application width={WIDTH} height={HEIGHT} className="w-full h-full">
        <BunnySprite
          onHoverChange={handlePetHover}
        />
      </Application>

      {/* 悬浮关闭按钮 */}
      <Button
        className={`pointer-events-auto absolute right-2 top-2 z-50 flex size-7 items-center justify-center rounded-full bg-white/80 text-muted-foreground shadow transition-all duration-200 hover:bg-white hover:text-foreground ${menuVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
        variant={"outline"}
        size={"icon"}
      >
        <X className="size-4" />
      </Button>

    </div>
  );
}
