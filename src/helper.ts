import * as config from './config.json'

export const cn = (classname: string): string => {
    return config.css_prefix + classname;
}
