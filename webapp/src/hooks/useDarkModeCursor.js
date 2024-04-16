import { useEffect } from 'react';
import * as cursoreffect_dark from 'cursor-effects';

// Custom hook for creating character cursor only in dark mode
const useDarkModeCursor = (theme) => {
    useEffect(() => {
        if (theme === 'dark') {
            const characterCursor = new cursoreffect_dark.characterCursor({
                element: document.querySelector('#character'),
                characters: ['s', 'a', 'b', 'e', 'r'],
                font: '15px serif',
                colors: [
                    '#e3c83b',
                    '#d5c17d',
                    '#c2b5a1',
                    '#e7d8c5',
                    '#eeece7',
                ],
                characterLifeSpanFunction: function () {
                    return Math.floor(Math.random() * 60 + 80);
                },
                initialCharacterVelocityFunction: function () {
                    return {
                        x: (Math.random() < 0.2 ? -1 : 1) * Math.random() * 5,
                        y: (Math.random() < 0.2 ? -1 : 1) * Math.random() * 5,
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
