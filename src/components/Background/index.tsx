import React from 'react';
import { maps } from '../../helper';
import './background.scss';

export interface BackgroundPropsI {
    file: string,
}

export class Background extends React.Component<BackgroundPropsI> {
    constructor(props: BackgroundPropsI) {
        super(props);

        this.state = {
            file: props.file,
        };
    }

    private getCanvasId(): string {
        return 'background';
    }

    private getContext(): string {
        return '2d';
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

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, maps.basic.width * 2, maps.basic.height * 2);

        // draw lines to visualize ship's movements while no graphics are present
        let columns: number = 16;
        for (let i = 0; i <= columns; i++) {
            let xline = maps.basic.height / 2 + (maps.basic.height / columns * i);

            for (let j = 0; j <= columns; j++) {
                let yline = maps.basic.width / 2 + (maps.basic.width / columns * i);

                ctx.fillStyle = 'white';
                ctx.fillText(`x${j} y${i}`, yline + 6, (maps.basic.height / 2 + (maps.basic.height / columns * j)) - 6);

                ctx.lineWidth = 1;
                ctx.strokeStyle = 'darkblue';
                ctx.moveTo(yline, maps.basic.height / 2);
                ctx.lineTo(yline, maps.basic.height / 2 + maps.basic.height);
                ctx.stroke();
            }

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'darkblue';
            ctx.moveTo(maps.basic.width / 2, xline);
            ctx.lineTo(maps.basic.width / 2 + maps.basic.width, xline);
            ctx.stroke();
        }
    }

    render(): JSX.Element {
        return (
            <canvas id={this.getCanvasId()} width={maps.basic.width * 2} height={maps.basic.height * 2} />
        );
    }
};
