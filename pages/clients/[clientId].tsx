import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Client.module.scss';
import Layout from '../../components/Layout/Layout';
import Footer from '../../components/Footer/Footer';
import fakeClientsList from '../../clients.json';
import moment from 'moment';
import TimeSeriesChart from '../../components/TimeSeriesChart/TimeSeriesChart';
import { time } from 'console';
import Button from '../../components/Button/Button';

const Client: NextPage = () => {
  const [client, setClient] = useState<any>({});
  const [chartType, setChartType] = useState<any>('timeSeries');
  const [hiddenTimeSeries, setHiddenTimeSeries] = useState<Array<object>>([{
    id: Number,
    color: String,
    data: Array
  }])
  const [controls, setControls] = useState<Array<object>>([
    {
      label: "Heart Rate",
      isChecked: true
    },
    {
      label: "Resp Rate",
      isChecked: true
    },
    {
      label: "Bed Temp",
      isChecked: true
    },
    {
      label: "Room Temp",
      isChecked: true
    },
    {
      label: "Sleep Score",
      isChecked: true
    }    
  ])
  const router = useRouter()
  const { clientId } = router.query

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if(!router.isReady) return;
    async function fetchSleepData(s3Url: string) : Promise<object> {
      let response = await fetch(s3Url);
      const data = await response.json();
      return data
    }

    let clientData: {
      id: number,
      name: string,
      avatarUrl: string,
      dataUrl: string,
      data: Array<object>
    }

    fakeClientsList.map(async (fakeClient) => {
      if(fakeClient.id == clientId! as unknown) {
        clientData = {
          ...fakeClient,
          data: []
        };


        // Need to format chat data

        const unformattedData =  await fetchSleepData(fakeClient.dataUrl);
        let seriesData = []

        const formatSeriesData = (unformattedData: object, propertyName: string) => {
          let seriesData = [];
          unformattedData.intervals.map((interval: object) => {
            let dataToIterateOver = interval.timeseries[propertyName];
            const timeseriesData = dataToIterateOver.map((dataPoint: Array<any>) => {
              const formattedData = {};
              formattedData.x = moment(dataPoint[0]).format('M/D h:mma'),
              formattedData.y = dataPoint[1].toFixed(2)
              return formattedData
            })
            seriesData = [...timeseriesData, ...seriesData];
          })
          return seriesData
        }


        let roomTempSeriesData = formatSeriesData(unformattedData, 'tempRoomC');
        let bedTempSeriesData = formatSeriesData(unformattedData, 'tempBedC');
        let respRateSeriesData = formatSeriesData(unformattedData, 'respiratoryRate');
        let heartRateSeriesData = formatSeriesData(unformattedData, 'heartRate');

        let xAxisDisplayedDates = {};
        bedTempSeriesData.map((dataPoint) => {
          xAxisDisplayedDates[dataPoint.x] = true;
        })

        let reversedIntervals = unformattedData.intervals.reverse()
        // Map Each Time Key To The Value At The Closest Time We Have For That
        let sleepScoreSeriesData = Object.keys(xAxisDisplayedDates).map((key, index) => {
          // What is the appropriate timeseries to associate this key with?
          console.log("Setting Sleep Score");
          console.log(unformattedData.intervals[Math.floor(index / 10)].score)
          return {x: key, y: reversedIntervals[Math.floor(index / 10)].score}
        })
        sleepScoreSeriesData = sleepScoreSeriesData.reverse()

        // let sleepScoreSeriesData = [...Object.keys(xAxisDisplayedDates).map((key) => ({ x: key, y: 75}))]

        clientData.data.push({
          id: `Room Temp`,
          color: "hsl(144, 70%, 50%)",
          data: roomTempSeriesData
        })
        clientData.data.push({
          id: `Bed Temp`,
          color: "hsl(144, 70%, 50%)",
          data: bedTempSeriesData
        })
        clientData.data.push({
          id: `Resp Rate`,
          color: "hsl(144, 70%, 50%)",
          data: respRateSeriesData
        })
        clientData.data.push({
          id: `Heart Rate`,
          color: "hsl(144, 70%, 50%)",
          data: heartRateSeriesData
        })
        clientData.data.push({
          id: `Sleep Score`,
          color: "hsl(144, 70%, 50%)",
          data: sleepScoreSeriesData
        })

        setClient(clientData)
      }
    })
  }, [router.isReady]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.clientBasicInfo}>
          <div className={styles.nameAndPhotoContainer}>
            <img 
              className={styles.avatar}
              src={client.avatarUrl} 
            />
            <h1> {client.name} </h1>
          </div>
          <div className={styles.sleepScoreInfoContainer}>
            <h4> Average Sleep Score </h4>
            <h1>74</h1>
          </div>
        </div>
        <div className={styles.chartSelector}>
          <Button 
            onClick={() => setChartType('timeSeries')}
          >
            Time Series Data
          </Button>
          <Button 
            onClick={() => setChartType('stages')}
          >
            Sleep Stages
          </Button>
        </div>
        {/* Show all the basic timeseries data */}
        {client.data && chartType === 'timeSeries' && (
          <TimeSeriesChart 
            data={client.data}
            onToggleSeries={(seriesLabel) => {
              let hasSetUnchecked = null;
              setControls(controls.map((control) => {
                if(control.label === seriesLabel) {
                  control.isChecked = !control.isChecked
                  hasSetUnchecked = !control.isChecked
                }
                return control
              }))

              let data;
              if(hasSetUnchecked) { // Off
                data = client.data.filter((timeSeries) => {
                  if(timeSeries.id === seriesLabel) {
                    setHiddenTimeSeries([
                      ...hiddenTimeSeries,
                      timeSeries
                    ])
                  }
                  return timeSeries.id !== seriesLabel
                })
              } else { // And back on
                let dataToAddBack = hiddenTimeSeries.filter((timeSeries) => {
                  if(timeSeries.id === seriesLabel) {
                    setHiddenTimeSeries(hiddenTimeSeries.filter((hiddenTimeSeries) => {
                      return hiddenTimeSeries.id !== seriesLabel
                    }))
                  }
                  return timeSeries.id === seriesLabel;
                })

                data = [...client.data, ...dataToAddBack]
              }

              setClient({
                ...client,
                data
              });
            }}
            controls={controls}
          />
        )}
      </div>
    </Layout>
  )
}

export default Client
