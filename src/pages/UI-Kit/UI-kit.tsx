import { ICON_IMAGE, IconType } from '../../assets/icons/constants'
import { Button } from '../../components/UI/Button/Button';
import { Icon } from '../../components/UI/Icon/Icon';
import "./UI-kit.scss";
export default function UiKit() {

  const handleClick = () => {
    console.log('Кнопка нажата!');
  };

  return (
    <>
      <div className='ui-icons'>
        {/* Установка размера иконки на extra_large */}
        <Icon 
          icon={ICON_IMAGE}                 
          size="extra_large" 
        />

        {/* Установка размера иконки на large */}
        <Icon 
          icon={ICON_IMAGE} 
          size="large" 
        />

        {/* Установка размера иконки на small (по умолчанию) */}
        <Icon 
          icon={ICON_IMAGE} 
          size="small" 
        />

        {/* Установка размера иконки на extra_small */}
        <Icon 
          icon={ICON_IMAGE} 
          size="extra_small" 
        />

        {/* Установка цвета иконки на небесно-голубой */}
        <Icon 
          icon={ICON_IMAGE} 
          colorIcon="accent" 
        />

        {/* Установка цвета иконки на мягкий синий */}
        <Icon  
          icon={ICON_IMAGE} 
          colorIcon="soft-blue" 
        />

        {/* Установка цвета иконки на нейтральный */}
        <Icon 
          icon={ICON_IMAGE} 
          colorIcon="neutral" 
        />

        {/* Установка цвета иконки на белый */}
        <Icon 
          icon={ICON_IMAGE} 
          colorIcon="secondary" 
        />
        
        {/* Установка размера иконки через fontSize в пикселях */}
        <Icon 
          icon={ICON_IMAGE} 
          fontSize="60px" 
        />

        {/* Изменение цвета иконки на синий */}
        <Icon 
          icon={ICON_IMAGE} 
          color="blue" 
        />

        {/* Изменение цвета иконки на конкретный HEX-код */}
        <Icon 
          icon={ICON_IMAGE} 
          color="#8586ff" 
        />

        {/* Комбинирование размера, цвета и пользовательского класса */}
        <Icon 
          icon={ICON_IMAGE} 
          size="large"
          color="red"
        />
      </div>
      



      <div className='ui-buttons'>
        {/* Обычная кнопка */}
        <Button 
          text="Создать" 
          color="primary" 
          size="large" 
          iconBefore={IconType.IMAGE}
        />

        {/* Кнопка только с иконкой */}
        <Button
          iconBefore={IconType.IMAGE}
          color="secondary"
          isButtonCircle={true}
          size="small"
        />

        {/* Кнопка с иконкой после текста */}
        <Button
          text="Отправить"
          color="accent"
          iconAfter={IconType.IMAGE}
        />

        
        <Button
          text="Недоступно"
          color="subdued"
        />

         {/* Заблокированная кнопка */}
         <Button
          text="Недоступно"
          color="subdued"
          disabled
        />
      </div>
  
    </>
  )
}