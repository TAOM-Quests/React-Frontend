import { DefaultRawDatum, ResponsivePie } from '@nivo/pie'
import { uniq } from 'lodash'
import { useState, useEffect } from 'react'
import { EventAnalyticElementProps } from '../../eventAnalyticElementProps'
import moment from 'moment'

export const EventStatisticAgePie = ({
  participants,
}: EventAnalyticElementProps) => {
  const [data, setData] = useState<DefaultRawDatum[]>([])

  useEffect(() => {
    const ages = participants.map(participant =>
      participant.birthDate
        ? moment().diff(participant.birthDate, 'years')
        : null,
    )
    const newData: DefaultRawDatum[] = uniq(ages).map(age => ({
      id: age ?? 'Не указан',
      value: participants.filter(participant =>
        age
          ? moment().diff(participant.birthDate, 'years') === age
          : participant.birthDate === null,
      ).length,
    }))

    console.log('Ages', ages)
    console.log('New data', newData)

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
