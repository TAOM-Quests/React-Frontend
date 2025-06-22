import { uniq } from 'lodash'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'
import { DefaultRawDatum, ResponsivePie } from '@nivo/pie'
import { useEffect, useState } from 'react'
import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'

export const EventStatisticSexPie = ({
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
    const sexes = participants.map(participant => participant.sex)
    const newData: DefaultRawDatum[] = uniq(sexes).map(sex => ({
      id: sex ?? 'Не указан',
      value: participants.filter(participant => participant.sex === sex).length,
    }))

    setData(newData)
  }, [participants])

  return (
    <ContainerBox className="statistic--Pie">
      <h6 className="heading_6 statistic--Pie__title">
        Распределение участников по половому признаку
      </h6>
      {data.length === 0 ? (
        <p className="body_l_r statistic--Pie__no-data">Нет данных</p>
      ) : (
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
              <div className="statistic--Pie__tooltip">
                <strong>{datum.id}</strong>
                <br />
                Количество: {datum.value}
                <br />
                Процент: {percent}%
              </div>
            )
          }}
        />
      )}
    </ContainerBox>
  )
}
