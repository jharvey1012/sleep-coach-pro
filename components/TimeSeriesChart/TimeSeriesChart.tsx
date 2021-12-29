import moment from 'moment';
import { ResponsiveLine } from '@nivo/line';
import styles from './TimeSeriesChart.module.scss';
import Checkbox from '../Checkbox/Checkbox';

const TimeSeriesChart = (props: { data: Array<object>, controls: Array<object>, onToggleSeries: Function }) => (
    <div className={styles.chartContainer}>
        <div className={styles.controlsContainer}>
            <h1> Sleep Quality Data 03/07-03/10 </h1>
            <div className={styles.controls}>
                {props.controls.map(control => (
                    <Checkbox 
                        label={control.label}
                        isChecked={control.isChecked}
                        onClick={() => props.onToggleSeries(control.label)}
                    />
                ))}
            </div>
        </div>
        <ResponsiveLine
        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 1,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={7.5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
)

export default TimeSeriesChart;