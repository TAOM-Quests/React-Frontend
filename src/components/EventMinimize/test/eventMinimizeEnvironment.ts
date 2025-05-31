import moment from 'moment'
import { EventMinimizeProps } from '../EventMinimize'

export const eventFullData: EventMinimizeProps = {
  id: 1,
  date: moment('2023-01-01').toDate(),
  name: 'IT Open Doors',
  type: 'Open Doors',
  address: 'Yagodnoe',
  status: 'Ready',
  platform: 'Zoom',
  imageUrl: '',
  tags: [],
  departmentName: 'IT',
}

export const eventEmptyData: EventMinimizeProps = {
  id: 2,
  date: null,
  name: '',
  type: '',
  address: '',
  status: 'Ready',
  platform: '',
  imageUrl: '',
  tags: [],
  departmentName: 'IT',
}
