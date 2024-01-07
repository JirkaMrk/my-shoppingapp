import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useWindowSize } from "@uidotdev/usehooks";

function Chart(props) { // komponenta pro zobrazení grafu
    const size = useWindowSize();
    const isMobile = size.width < 768;
    const [chartSize, setChartSize] = useState(150);

    useEffect(() => { // nastavení velikosti grafu podle velikosti okna
        if (size.width > 1000) {
            setChartSize(350);
        } else if (size.width > 750) {
            setChartSize(250);
        } else {
            setChartSize(150);
        }
    }, [size.width]);

    const translations = { // překlady
        active: {
            en: 'Active',
            cs: 'Aktivní',
        },
        inactive: {
            en: 'Inactive',
            cs: 'Neaktivní',
        }
    };

    const data = [  // data pro graf
        { name: `${translations.active[props.isEnglish ? 'en' : 'cs']}`, numberOfItems: props.dataActive },
        { name: `${translations.inactive[props.isEnglish ? 'en' : 'cs']}`, numberOfItems: props.dataInactive },
    ];

    const COLORS = ['#00C49F', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, numberOfItems }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return ( // popisky pro graf
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${name} ${(percent * 100).toFixed(0)}% (${numberOfItems})`}
            </text>
        );
    };

    return ( // zobrazení grafu
        <ResponsiveContainer width="100%" aspect={1}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="numberOfItems"
                    outerRadius={chartSize} // velikost grafu
                    label={renderCustomizedLabel}
                >
                    {data.map((entry, index) => (   // barvy pro graf
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default Chart;