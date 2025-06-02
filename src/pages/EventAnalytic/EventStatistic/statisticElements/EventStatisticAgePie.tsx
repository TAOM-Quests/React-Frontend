import { DefaultRawDatum, ResponsivePie } from '@nivo/pie'
import { uniq } from 'lodash'
import { useState, useEffect } from 'react'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'
import moment from 'moment'
import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'

const ageGroups = [
  { id: '8-14', min: 8, max: 14 },
  { id: '15-19', min: 15, max: 19 },
  { id: '20-25', min: 20, max: 25 },
  { id: '26-30', min: 26, max: 30 },
  { id: '31-40', min: 31, max: 40 },
  { id: '41+', min: 41, max: Infinity },
  { id: 'Не указан', min: null, max: null },
]

export const EventStatisticAgePie = ({
  participants,
}: EventAnalyticElementProps) => {
  const [data, setData] = useState<DefaultRawDatum[]>([])
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const total = data.reduce((acc, item) => acc + item.value, 0)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const ages = participants.map(participant =>
      participant.birthDate
        ? moment().diff(participant.birthDate, 'years')
        : null,
    )
    const newData: DefaultRawDatum[] = ageGroups
      .map(group => {
        if (group.min === null) {
          return {
            id: group.id,
            value: participants.filter(p => !p.birthDate).length,
          }
        }
        return {
          id: group.id,
          value: ages.filter(
            age => age !== null && age >= group.min && age <= group.max,
          ).length,
        }
      })
      .filter(item => item.value > 0)

    setData(newData)
  }, [participants])

  return (
    <ContainerBox className="event-statistic--Pie">
      <h6 className="heading_6 event-statistic--Pie__title">
        Распределение участников по возрастным группам
      </h6>
      <ResponsivePie
        data={data}
        margin={{ top: 0, right: 10, bottom: 80, left: 10 }}
        innerRadius={0.2}
        padAngle={2}
        cornerRadius={10}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={isSmallScreen ? 360 : 10}
        arcLabelsSkipAngle={10}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: 'color' }}
        colors={{ scheme: 'blues' }}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        arcLabel={datum => {
          const percent = ((datum.value / total) * 100).toFixed(1)
          return isSmallScreen
            ? `${datum.value}`
            : `${datum.value} (${percent}%)`
        }}
        theme={{
          labels: {
            text: {
              fontFamily: 'Montserrat',
              fontSize: 15,
              fontWeight: 500,
            },
          },
        }}
        tooltip={({ datum }) => {
          const percent = ((datum.value / total) * 100).toFixed(1)
          return (
            <div className="event-statistic--Pie__tooltip">
              <strong>{datum.id}</strong>
              <br />
              Количество: {datum.value}
              <br />
              Процент: {percent}%
            </div>
          )
        }}
      ></ResponsivePie>
    </ContainerBox>
  )
}
