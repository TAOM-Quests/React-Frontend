import { useState } from 'react'
import { useNavigate } from 'react-router'
import { OptionProps } from '../UI/Option/Option'
import { ContainerBox } from '../ContainerBox/ContainerBox'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import { Icon } from '../UI/Icon/Icon'
import './QuestMinimize.scss'
import { Tag } from '../UI/Tag/Tag'
import { getTwoShortestTags } from '../../utils/getTwoShortestTags'
import { quests } from '../../services/api/questModule/quests/quests'

export interface QuestMinimizeProps {
  id: number
  name: string
  tags?: string[]
  imageUrl?: string
  completeId?: number
  difficulty?: string
  onDelete?: () => void
  completedCount?: number
  isEmployeeView?: boolean
}

export default function QuestMinimize({
  id,
  name,
  tags,
  imageUrl,
  onDelete,
  completeId,
  difficulty,
  completedCount,
  isEmployeeView,
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
      text: 'Посмотреть статистику',
      onSelect: () => {
        navigate(`/quest/${id}/statistic`)
      },
    },
    {
      id: 3,
      text: 'Удалить',
      onSelect: async () => {
        await quests.delete(id)
        onDelete?.()
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
      onClick={() =>
        isEmployeeView
          ? navigate(`/quest/${id}`)
          : navigate(`/quest/complete/${completeId}`)
      }
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
          {isEmployeeView && (
            <ContextMenu
              isVisible={openMenuId === id}
              onToggle={toggleMenu}
              options={questOptionsContextMenu}
              className="questMinimize__header--menu"
            >
              <Icon colorIcon="primary" icon="MENU_DOTS" />
            </ContextMenu>
          )}
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

      {isEmployeeView && (
        <div className="questMinimize__info">
          <p className="body_m_m">{completedCount ?? 0}</p>
          <Icon icon="USER" colorIcon="primary" />
        </div>
      )}
    </ContainerBox>
  )
}
