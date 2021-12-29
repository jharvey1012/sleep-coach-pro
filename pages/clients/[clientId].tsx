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

const Client: NextPage = () => {
  const [client, setClient] = useState<any>({});
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

        setClient(clientData)
      }
    })
  }, [router.isReady]);

  return (
    <Layout>
      <div className={styles.container}>
        {/* Show all the basic timeseries data */}
        {client.data &&(
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
