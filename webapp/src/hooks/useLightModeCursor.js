import { useEffect } from 'react';
import * as cursoreffect_light from 'cursor-effects';

// Custom hook for creating character cursor only in dark mode
const useDarkModeCursor = (theme) => {
    useEffect(() => {
        if (theme === 'light') {
            const characterCursor = new cursoreffect_light.characterCursor({
                element: document.querySelector('#character'),
                characters: ['g', 'a', 'n', 'a', 'r'],
                font: '12px serif',
                colors: [
                    '#6622CC',
                    '#7762c4',
                    '#897cb0',
                    '#9a91b5',
                    '#b6add3',
                ],
                characterLifeSpanFunction: function () {
                    return Math.floor(Math.random() * 60 + 80);
                },
                initialCharacterVelocityFunction: function () {
                    return {
                        x: (Math.random() < 0.2 ? -0.5 : 0.5) * Math.random() * 5,
                        y: (Math.random() < 0.2 ? -0.5 : 0.5) * Math.random() * 5,
                    };
                },
                characterVelocityChangeFunctions: {
                    x_func: function (age, lifeSpan) {
                        return (Math.random() < 0.5 ? -1 : 1) / 30;
                    },
                    y_func: function (age, lifeSpan) {
                        return (Math.random() < 0.5 ? -1 : 1) / 15;
                    },
                },
                characterScalingFunction: function (age, lifeSpan) {
                    let lifeLeft = lifeSpan - age;
                    return Math.max(lifeLeft / lifeSpan * 2, 0);
                },
                characterNewRotationDegreesFunction: function (age, lifeSpan) {
                    let lifeLeft = lifeSpan - age;
                    console.log(age, lifeSpan);
                    return lifeLeft / 5;
                },
            });

            // Cleanup function to remove cursor when theme changes
            return () => {
                characterCursor.destroy();

            };
        }
    }, [theme]);
};

export default useDarkModeCursor;
