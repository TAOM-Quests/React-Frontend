import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { Employee } from '../../../models/user'

export interface EventExecutorsProps {
  executors: Employee[]
}

export const EventExecutors = ({ executors }: EventExecutorsProps) => {
  return (
    <ContainerBox>
      {executors.map(executor => (
        <img src={executor.avatar?.url} />
      ))}
    </ContainerBox>
  )
}
