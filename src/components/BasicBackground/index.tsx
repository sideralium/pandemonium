import React from 'react';
import { maps } from '../../helper';
import './background.scss';

export interface BackgroundPropsI {
    file?: string,
    parallaxScenes?: Array<ParallaxSceneI>,
}

interface ParallaxSceneI {
    /**
     * Height is a mean used to apply the parallax effect.
     *
     * The bigger the height, the further will the element
     *      be from the main perspective.
     */
    height: number,
    assets?: Array<SceneAssetI>,
    staticAssets?: Array<SceneAssetI>,
}

interface SceneAssetI {
    file: string,
    position: { x: number, y: number },
    debug?: boolean,
    activeClass?: string,
    size?: { width: number, height: number }
}

export const Background: React.FC<BackgroundPropsI> = ({ file, parallaxScenes, ...props }) => {
    const assetStyle = (asset: any): Object => {
        asset.debug = asset.debug ? ("development" === process.env.NODE_ENV) : false;

        return {
            position: 'absolute',
            left: maps.basic.width / 2 + asset.position.x,
            top: maps.basic.height / 2 + asset.position.y,
            width: asset.size ? asset.size.width : (asset.debug ? '20px' : undefined),
            height: asset.size ? asset.size.height : (asset.debug ? '20px' : undefined),
            border: asset.debug ? (asset.file ? '1px solid red' : undefined) : undefined,
            backgroundPosition: 'center',
            color: 'red',
        };
    }

    return (
        <div
            className="background"
            style={{
                width: maps.basic.width * 2,
                height: maps.basic.height * 2,
                backgroundImage: file ? `url(${file})` : undefined,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'black',
                position: 'relative',
            }}
            {...props}
        >
            {
                parallaxScenes?.map((scene, i) => {
                    return (
                        <div data-iteration={i} data-height={scene.height} key={i}>
                            {scene.assets?.map((asset, i) => {
                                return (
                                    <div
                                        key={i}
                                        style={
                                            Object.assign({
                                                background: asset.file ? `url('${asset.file}')` : `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjeWFuIiBkPSJNMjQgMTBoLTEwdi0xMGgtNHYxMGgtMTB2NGgxMHYxMGg0di0xMGgxMHoiLz48L3N2Zz4=) no-repeat`,
                                            }, assetStyle(asset))
                                        }
                                    >
                                        {
                                            asset.debug
                                                ? `${asset.file}` + (asset.size
                                                    ? `\n(${asset.size?.width}x${asset.size?.height})`
                                                    : '')
                                                : ''
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    );
                })
            }
        </div>
    );
};
