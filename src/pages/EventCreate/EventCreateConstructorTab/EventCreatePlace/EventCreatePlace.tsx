import Input from '../../../../components/UI/Input/Input'
import { NumberInput } from '../../../../components/UI/NumberInput/NumberInput'

interface EventCreatePlaceProps {
  address: string
  setAddress: (value: string) => void
  floor: number | null
  setFloor: (value: number | null) => void
  officeNumber: string
  setOfficeNumber: (value: string) => void
  platform: string
  setPlatform: (value: string) => void
  connectionLink: string
  setConnectionLink: (value: string) => void
  recordLink: string
  setRecordLink: (value: string) => void
  identifier: string
  setIdentifier: (value: string) => void
  accessCode: string
  setAccessCode: (value: string) => void
}

export const EventCreatePlace = ({
  address,
  setAddress,
  floor,
  setFloor,
  officeNumber,
  setOfficeNumber,
  platform,
  setPlatform,
  connectionLink,
  setConnectionLink,
  recordLink,
  setRecordLink,
  identifier,
  setIdentifier,
  accessCode,
  setAccessCode,
}: EventCreatePlaceProps) => (
  <>
    <Input
      label="Адрес"
      placeholder="Введите адрес"
      value={address}
      onChange={e => setAddress(e.target.value)}
    />
    <div className="places">
      <div className="places__miniInput">
        <NumberInput
          min={0}
          label="Этаж"
          value={floor}
          placeholder="Введите этаж"
          onChange={setFloor}
        />
        <Input
          label="Аудитория"
          placeholder="С-..."
          value={officeNumber}
          onChange={e => setOfficeNumber(e.target.value)}
        />
      </div>

      <Input
        label="Площадка"
        placeholder="Введите площадку"
        value={platform}
        onChange={e => setPlatform(e.target.value)}
      />
      <Input
        label="Ссылка для подключения"
        placeholder="https://..."
        value={connectionLink}
        onChange={e => setConnectionLink(e.target.value)}
      />
      <Input
        label="Ссылка на запись и презентацию"
        placeholder="https://..."
        value={recordLink}
        onChange={e => setRecordLink(e.target.value)}
      />
      <Input
        label="Идентификатор"
        placeholder="Введите идентификатор"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
      />
      <Input
        label="Код доступа"
        placeholder="Введите код доступа"
        value={accessCode}
        onChange={e => setAccessCode(e.target.value)}
      />
    </div>
  </>
)
