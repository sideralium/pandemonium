import React from 'react';
import { maps } from '../../helper';
import './background.scss';

export interface BackgroundPropsI {
    file: string,
}

interface StateI {
    connected: boolean,
}

export class Background extends React.Component<BackgroundPropsI, StateI> {
    constructor(props: BackgroundPropsI) {
        super(props);

        this.state = {
            connected: false,
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
        let columns: number = 4;
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

        var localConnection = new RTCPeerConnection(),
            sendChannel = localConnection.createDataChannel("sendChannel");

        const handleSendChannelStatusChange = () => {
            if (sendChannel) {
                this.setState({ connected: sendChannel.readyState === 'open' });
            }
        }

        sendChannel.onopen = handleSendChannelStatusChange;
        sendChannel.onclose = handleSendChannelStatusChange;

        var remoteConnection = new RTCPeerConnection(),
            receiveChannel: RTCDataChannel;

        localConnection.onicecandidate = e => {
            !e.candidate || remoteConnection.addIceCandidate(e.candidate).catch(() => console.log('failed.'));
        };

        remoteConnection.onicecandidate = e => {
            !e.candidate || localConnection.addIceCandidate(e.candidate).catch(() => console.log('failed.'));
        };

        const handleReceiveChannelStatusChange = () => {
            if (receiveChannel) console.log(`received channels status has changed to ${receiveChannel.readyState}`);
        }

        remoteConnection.ondatachannel = e => {
            receiveChannel = e.channel;
            receiveChannel.onmessage = e => console.log(e.data);
            receiveChannel.onopen = handleReceiveChannelStatusChange;
            receiveChannel.onclose = handleReceiveChannelStatusChange;
        };

        localConnection.createOffer({ voiceActivityDetection: false })
            .then(offer => {
                console.log(offer);
                return localConnection.setLocalDescription(offer);
            })
            .then(() => remoteConnection.setRemoteDescription(localConnection.localDescription as any))
            .then(() => remoteConnection.createAnswer())
            .then(answer => {
                console.log(answer);
                return remoteConnection.setLocalDescription(answer);
            })
            .then(() => localConnection.setRemoteDescription(remoteConnection.localDescription as any))
            .catch((error) => { console.log("Unable to create an offer: " + error.toString()) });

        setInterval(() => !this.state.connected || sendChannel.send('PING'), 1000);
    }

    render(): JSX.Element {
        return (
            <>
                <div
                    style={{
                        backgroundColor: this.state.connected ? 'green' : 'red',
                        position: 'absolute',
                        padding: '60px 220px',
                    }}
                >
                    {this.state.connected ? 'connected' : 'disconnected'}
                </div>

                <canvas id={this.getCanvasId()} width={maps.basic.width * 2} height={maps.basic.height * 2} />
            </>
        );
    }
};
