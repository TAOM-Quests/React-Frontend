import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { Icon } from '../../../components/UI/Icon/Icon'
import { Tag } from '../../../components/UI/Tag/Tag'
import { QuestGroup } from '../../../models/questGroup'
import { QuestMinimize } from '../../../models/questMinimize'
import { getTwoShortestTags } from '../../../utils/getTwoShortestTags'
import './Group.scss'

export interface QuestHomeGroupProps {
  group: QuestGroup
  quests: QuestMinimize[]
  groupIndex: number
}

export const QuestHomeGroup = ({
  group,
  quests,
  groupIndex,
}: QuestHomeGroupProps) => {
  function splitToChunks<T>(arr: T[], chunkSize: number): (T | null)[][] {
    const result: (T | null)[][] = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk: (T | null)[] = arr.slice(i, i + chunkSize)
      while (chunk.length < chunkSize) {
        chunk.push(null)
      }
      result.push(chunk)
    }
    // Если квестов вообще нет, всё равно возвращаем одну пустую группу
    if (result.length === 0) result.push(Array(chunkSize).fill(null))
    return result
  }

  const questChunks = splitToChunks(quests, 8)

  return (
    // <div className="group">
    //   <div className="group__header">
    //     <h1>{group.name}</h1>
    //     {/* <p>{group.description}</p> */}
    //   </div>

    //   <div className="group__questGrid">
    //     {questChunks.map((quest, index) => (
    //       <div className="group__questItem" key={index}>
    //         {quest.name}
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="group">
      <h4 className="heading_4 group__title">{group.name}</h4>

      {questChunks.map((chunk, chunkIdx) => (
        <div
          className={`group__questGrid groupTest-${groupIndex % 2 === 0 ? 'right' : 'left'}`}
          key={chunkIdx}
        >
          <div className="titleGroupTests" />
          {chunk.map((quest, index) => {
            const shortestTags = quest?.tags
              ? getTwoShortestTags(quest.tags.map(tag => tag.name))
              : []

            return quest ? (
              <div
                className={`group__questItem index-${index}-of-test-in-group`}
                style={{
                  backgroundImage: `url(${quest.image?.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="group__questItem--overlay">
                  <div className="group__questItem--tags">
                    {quest.difficult ? (
                      <>
                        <Tag
                          text={quest.difficult.name}
                          type="subdued"
                          size="small"
                        />
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
                          <Tag
                            key={index}
                            text={tag}
                            type="secondary"
                            size="small"
                          />
                        ))}
                      </>
                    )}
                  </div>

                  <div className="group__questItem--name-wrapper">
                    <div className="group__questItem--logo">
                      <div className="group__questItem--line"></div>
                      <Icon icon="TAOM" colorIcon="primary" size="large" />
                      <div className="group__questItem--line"></div>
                    </div>
                    <p className="body_xl_sb group__questItem--title">
                      {quest.name}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`group__questItem group__questItem--empty index-${index}-of-test-in-group`}
                key={`empty-${index}`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
