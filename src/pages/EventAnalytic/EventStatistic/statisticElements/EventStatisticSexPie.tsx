import { uniq } from 'lodash'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'
import { ResponsivePie } from '@nivo/pie'
import { useEffect, useState } from 'react'

interface PieData {
  id: string
  label: string
  value: number
}

export const EventStatisticSexPie = ({
  participants,
}: EventAnalyticElementProps) => {
  const [data, setData] = useState<PieData[]>([])

  useEffect(() => {
    const sexes = participants.map(participant => participant.sex)
    const newData: PieData[] = uniq(sexes).map(sex => ({
      id: sex ?? 'Не указан',
      label: sex ?? 'Не указан',
      value: participants.filter(participant => participant.sex === sex).length,
    }))

    setData(newData)
  }, [participants])

  return (
    <div style={{ height: '500px', width: '500px' }}>
      <ResponsivePie
        data={data}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        arcLinkLabelsColor={{ from: 'color' }}
        margin={{ top: 160, right: 160, bottom: 160, left: 160 }}
        activeOuterRadiusOffset={8}
        arcLinkLabelsThickness={2}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        arcLabelsSkipAngle={10}
      ></ResponsivePie>
    </div>
  )
}
