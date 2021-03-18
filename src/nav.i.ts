import { ComponentClass, FunctionComponent } from "react";

interface Route {
    to: string,
    name: string,
    exact?: boolean,
    component: string | FunctionComponent<any> | ComponentClass<any, any>,
}

export interface Routes extends Array<Route> { }
