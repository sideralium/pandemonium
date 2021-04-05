import React from 'react';
import { maps } from '../../../helper';

export interface ShipPropsI {
    file: string,
}

export class Ship extends React.Component<ShipPropsI> {
    constructor(props: ShipPropsI) {
        super(props);

        this.state = {
            file: props.file,
        };
    }

    private getCanvasId(): string {
        return 'ship';
    }

    private getContext(): string {
        return 'webgl2';
    }

    componentDidMount(): void {
        const canvas: HTMLCanvasElement = document.getElementById(this.getCanvasId()) as any;
        if (!canvas) {
            console.error(`The canvas with the id "${this.getCanvasId()}" could not be found.`);
            return;
        };

        // block right click on canvas
        canvas.addEventListener('contextmenu', e => e.preventDefault());

        const ctx: (CanvasRenderingContext2D | null) = canvas.getContext(this.getContext()) as any;
        if (!ctx) {
            console.error(`The canvas's context "${this.getContext()}" is not available.`);
            return;
        };
    }

    render(): JSX.Element {
        return (
            <canvas id={this.getCanvasId()} width={maps.basic.width * 2} height={maps.basic.height * 2} />
        );
    }
};
