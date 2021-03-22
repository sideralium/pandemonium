import React from 'react';
import { cn } from '../../helper';
import './background.scss';

export interface BackgroundProps {
    stars: number,
    inverted: boolean,
}

export const Background: React.FC<BackgroundProps> = ({ stars, inverted, ...props }) => {
    let particles = [];
    for (let i = 0; i <= stars; i++) {
        particles.push(
            <div key={i} className={['particle', (inverted ? 'inverted' : '')].join(' ')}></div>
        );
    }

    return (
        <div
            className={[cn('background'), (inverted ? 'inverted' : '')].join(' ')}
            {...props}
        >
            {particles}
        </div>
    );
};
