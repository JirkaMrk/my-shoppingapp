import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useWindowSize } from "@uidotdev/usehooks";

function Chart(props) { // komponenta pro zobrazení grafu
    const dataX = props.dataX;
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
            en: 'Actcccive',
            cs: 'Akticccvní',
        },
        inactive: {
            en: 'Inacccctive',
            cs: 'Neakccctivní',
        }
    };

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink','#0088FE', '#00C49F', '#FFBB28', 
                    '#FF8042', 'red', 'pink','#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

        const data = [
        {
            name: 'Page A',
            uv: 4000,
        },
        {
            name: 'Page B',
            uv: 3000,
        },
        {
            name: 'Page C',
            uv: 2000,
        },
        {
            name: 'Page D',
            uv: 2780,
        },
        {
            name: 'Page E',
            uv: 1890,
        },
        {
            name: 'Page F',
            uv: 2390,
        },
        {
            name: 'Page G',
            uv: 3090,
        },
        {
            name: 'Page H', 
            uv: 3090,
        },
        {
            name: 'Page I',
            uv: 3090,
        },
    
        ];

        const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

    return ( // zobrazení grafu
            <BarChart
                width={size.width - 50}
                height={300}
                data={data}
                margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
                </Bar>
            </BarChart>
        );
    
}

export default Chart;