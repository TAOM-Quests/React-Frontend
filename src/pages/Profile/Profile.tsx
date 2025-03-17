import { useState } from "react";
import TabButton from "../../components/TabButton/TabButton";

const TABS = [
  'Персональные данные',
  'Мои мероприятия',
  'Мои квесты'
]

export default function Profile() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div>
      {TABS.map((tab, index) => (
        <TabButton text={tab} isActive={tabIndex === index} onClick={() => setTabIndex(index)}/>
      ))}
    </div>
  )
}