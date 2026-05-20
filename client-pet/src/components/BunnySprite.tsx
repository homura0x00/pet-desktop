import {
    Assets,
    Texture,
} from 'pixi.js';
import {
    useEffect,
    useRef,
    useState,
} from 'react';

interface BunnySpriteProps {
  onHoverChange?: (hovered: boolean) => void;
  onDragStart?: () => void;
}

export function BunnySprite({ onHoverChange, onDragStart }: BunnySpriteProps) {
    const spriteRef = useRef(null)

    const [texture, setTexture] = useState(Texture.EMPTY)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets
                .load('https://pixijs.com/assets/bunny.png')
                .then((result) => {
                    setTexture(result)
                });
        }
    }, [texture]);

    return (
        <>
            <pixiContainer>
                <pixiSprite
                    ref={spriteRef}
                    anchor={0.5}
                    eventMode={'static'}
                    onPointerDown={() => onDragStart?.()}
                    onClick={() => setIsActive(!isActive)}
                    onPointerOver={() => onHoverChange?.(true)}
                    onPointerOut={() => onHoverChange?.(false)}
                    scale={isActive ? 1 : 1.5}
                    texture={texture}
                    x={160}
                    y={240}
                />
            </pixiContainer>
        </>
    );
}