import {useEffect, useState} from "react";
import "./Tile.css";
import {TileData} from "Frontend/views/2048/TileData.js";
import {usePrevProps} from "Frontend/views/2048/UsePrevProps.js";


export const Tile = ({value, position}: TileData) => {
    const [prevTilePosition, setPrevTilePosition] = useState<[number, number]>();
    const [scale, setScale] = useState(1)

    const previousValue = usePrevProps<number>(value);
    // if it is a new tile...
    const isNew = previousValue === 0;
    // ...or its value has changed...
    const hasChanged = previousValue !== value;
    // ... then the tile should be highlighted.
    const shallHighlight = value !== 0 && hasChanged && !isNew;
    const tileClass = `tile tile-${value} ${position === prevTilePosition ? "tile-prev" : ""} ${prevTilePosition != null ? "tile-new" : ""}`;

    useEffect(() => {
        setPrevTilePosition(position);
    }, [position]);

    useEffect(() => {
        if(shallHighlight) {
            setScale(1.1)
            setTimeout(() => setScale(1), 100);
        }
    }, [shallHighlight, scale]);

    const style = {
        transform: `scale(${scale})`
    }

    return (
        <div style={style} className={tileClass}>
            {value}
        </div>
    );
};
