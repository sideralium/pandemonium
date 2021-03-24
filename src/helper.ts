import * as config from './config.json'

interface MapsI {
    basic: {
        width: number,
        height: number,
    },
}

export const cn = (classname: string): string => {
    return config.css_prefix + classname;
}

export const maps: MapsI = config.maps;
