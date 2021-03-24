import { maps } from "../../../helper";
import { Background } from "../../Background";

export const name = '1-1';

const Map1x1 = () => {
    return (
        <Background
            file={'/assets/backgrounds/1-1.jpeg'}
            parallaxScenes={[
                {
                    height: 100,
                    assets: [
                        {
                            size: { width: 410, height: 353 },
                            file: '/assets/portals/a.png',
                            position: { x: 100, y: 100 },
                            activeClass: 'open',
                            debug: true,
                        },
                        { file: '', position: { x: 0 - 10, y: 0 - 10 }, debug: true }, // top left
                        { file: '', position: { x: maps.basic.width - 10, y: 0 - 10 }, debug: true }, // top right
                        { file: '', position: { x: 0 - 10, y: maps.basic.height + 10 }, debug: true }, // bottom left
                        { file: '', position: { x: maps.basic.width - 10, y: maps.basic.height + 10 }, debug: true }, // bottom right
                    ],
                },
            ]}
        />
    );
}

export default Map1x1;
