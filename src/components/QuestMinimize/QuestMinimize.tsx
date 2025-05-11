import { useState } from 'react'
import { useNavigate } from 'react-router'
import { OptionProps } from '../UI/Option/Option'
import { ContainerBox } from '../ContainerBox/ContainerBox'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import { Icon } from '../UI/Icon/Icon'
import './QuestMinimize.scss'
import { Tag } from '../UI/Tag/Tag'
import { getTwoShortestTags } from '../../utils/getTwoShortestTags'

export interface QuestMinimizeProps {
  id: number
  name: string
  tags?: string[]
  imageUrl?: string
  onDelete?: () => void
  difficulty?: string
  isEmployeeView?: boolean
  participantsCount?: number
}

export default function QuestMinimize({
  id,
  name,
  tags,
  imageUrl,
  onDelete,
  difficulty,
  isEmployeeView,
  participantsCount,
}: QuestMinimizeProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  const navigate = useNavigate()

  const shortestTags = tags ? getTwoShortestTags(tags) : []

  const questOptionsContextMenu: OptionProps[] = [
    {
      id: 1,
      text: 'Редактировать',
      onSelect: () => {
        navigate(`/quest/${id}/edit`)
      },
    },
    {
      id: 2,
      text: 'Удалить',
      onSelect: async () => {
        // Добавить метод удаления квеста
        // await quests.delete(id)
        // onDelete?.()
      },
    },
  ]

  const toggleMenu = () => {
    if (openMenuId === id) {
      setOpenMenuId(null)
    } else {
      setOpenMenuId(id)
    }
  }

  return (
    <ContainerBox
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={() => navigate(`/quest/${id}`)}
      className="questMinimize"
    >
      <div className="questMinimize__image-wrapper">
        <div className="questMinimize__overlay"></div>
      </div>

      <div className="questMinimize__header">
        <div className="questMinimize__header--left">
          <div className="questMinimize__header--tags">
            {difficulty ? (
              <>
                <Tag text={difficulty} type="subdued" size="small" />
                {shortestTags.length > 0 && (
                  <Tag
                    key={0}
                    text={shortestTags[0]}
                    type="secondary"
                    size="small"
                  />
                )}
              </>
            ) : (
              <>
                {shortestTags.map((tag, index) => (
                  <Tag key={index} text={tag} type="secondary" size="small" />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="questMinimize__header--right">
          {/* {isEmployeeView && ( */}
          <>
            <ContextMenu
              isVisible={openMenuId === id}
              onToggle={toggleMenu}
              options={questOptionsContextMenu}
              className="questMinimize__header--menu"
            >
              <Icon colorIcon="primary" icon="MENU_DOTS" />
            </ContextMenu>
          </>
          {/* )} */}
        </div>
      </div>
      <div className="questMinimize__name-wrapper">
        <div className="questMinimize__logo">
          <div className="questMinimize__logo--line"></div>
          <Icon icon="TAOM" colorIcon="primary" size="large" />
          <div className="questMinimize__logo--line"></div>
        </div>
        <p className="body_xl_sb questMinimize__name">{name}</p>
      </div>

      <div className="questMinimize__info">
        <p className="body_m_m">{participantsCount || 0}</p>
        <Icon icon="USER" colorIcon="primary" />
      </div>
    </ContainerBox>
  )
}
