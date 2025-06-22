import { useEffect, useRef, useState } from 'react'
import { Department } from '../../models/department'
import { UserLeaderboardPosition } from '../../models/userLeaderbordPositioin'
import { commonEntities } from '../../services/api/commonModule/commonEntities/commonEntities'
import { users } from '../../services/api/userModule/users/users'
import { Loading } from '../../components/Loading/Loading'
import { Dropdown } from '../../components/UI/Dropdown/Dropdown'
import { isArray } from 'lodash'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { selectAuth } from '../../redux/auth/authSlice'
import './Leaderboard.scss'
import { serverFiles } from '../../services/api/commonModule/serverFiles/serverFiles'
import { ServerFile } from '../../models/serverFile'

import { UserAvatarInfo } from '../../components/User/UserAvatarInfo/UserAvatarInfo'

const POSITIONS_ON_SCREEN = 12
const FIRST_PLACE_MEDAL_IMAGE_ID = 20
const SECOND_PLACE_MEDAL_IMAGE_ID = 21
const THIRD_PLACE_MEDAL_IMAGE_ID = 22

const MEDALS_IMAGES_IDS = [
  FIRST_PLACE_MEDAL_IMAGE_ID,
  SECOND_PLACE_MEDAL_IMAGE_ID,
  THIRD_PLACE_MEDAL_IMAGE_ID,
]

export const Leaderboard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [medalsImages, setMedalsImages] = useState<ServerFile[]>([])

  const [departments, setDepartments] = useState<Department[]>([])
  const [positions, setPositions] = useState<UserLeaderboardPosition[]>([])
  const [userPosition, setUserPosition] =
    useState<UserLeaderboardPosition | null>(null)
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(
    null,
  )

  const [isAllPositionsLoaded, setIsAllPositionsLoaded] = useState(false)
  const [isEndOfPositionsList, setIsEndOfPositionsList] = useState(false)

  const [isUserRowVisible, setIsUserRowVisible] = useState(false)
  const [isUserRowAboveViewport, setIsUserRowAboveViewport] = useState(false)
  const [isListVisible, setIsListVisible] = useState(true)

  const user = useAppSelector(selectAuth)
  const userRowRef = useRef<HTMLDivElement>(null)
  const leaderboardListRef = useRef<HTMLDivElement>(null)
  const positionsListEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!leaderboardListRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsListVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )
    observer.observe(leaderboardListRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!userRowRef.current) return

    const visibleObserver = new IntersectionObserver(
      ([entry]) => setIsUserRowVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )
    visibleObserver.observe(userRowRef.current)

    const aboveObserver = new IntersectionObserver(
      ([entry]) =>
        setIsUserRowAboveViewport(
          entry.boundingClientRect.top < 0 && !entry.isIntersecting,
        ),
      { threshold: [0, 1] },
    )
    aboveObserver.observe(userRowRef.current)

    return () => {
      visibleObserver.disconnect()
      aboveObserver.disconnect()
    }
  }, [positions, userPosition])

  const renderUserRow = (
    position: UserLeaderboardPosition,
    positionClassName = '',
  ) => (
    <div
      className={`leaderboard__rank--${position.rank} leaderboard__item leaderboard__item--user leaderboard__item--${positionClassName}`}
    >
      <p className="body_l_sb leaderboard__rank--number">{position.rank}</p>
      <UserAvatarInfo
        text={position.user.name}
        avatarSrc={position.user.image?.url}
        className="leaderboard__avatar"
      />
      <p className="body_l_sb">{position.experience}</p>
    </div>
  )

  useEffect(() => {
    setIsLoading(true)
    try {
      fetchDepartments()
      fetchMedalsImages()
      setEventsListObserver()
    } catch (e) {
      console.log(`[Leaderboard] ${e}`)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    setCurrentDepartment(departments[0])
    setIsLoading(false)
  }, [departments])

  useEffect(() => {
    if (
      isEndOfPositionsList &&
      !isAllPositionsLoaded &&
      positions.length >= POSITIONS_ON_SCREEN
    ) {
      setIsLoading(true)
      try {
        fetchPositions()
      } catch (e) {
        console.log(`[Leaderboard] ${e}`)
      }
      setIsLoading(false)
    }
  }, [isEndOfPositionsList])

  useEffect(() => {
    setIsLoading(true)
    try {
      fetchPositions(true)
    } catch (e) {
      console.log(`[Leaderboard] ${e}`)
    }
    setIsLoading(false)
  }, [currentDepartment])

  const fetchMedalsImages = async () => {
    const images = MEDALS_IMAGES_IDS.map(id => serverFiles.getFile(id))
    setMedalsImages(await Promise.all(images))
  }

  const fetchDepartments = async () => {
    setDepartments(await commonEntities.getDepartments())
  }

  const fetchPositions = async (isClear?: boolean) => {
    if (!currentDepartment) throw Error('Department not found')

    const newPositions = await users.getExperience({
      departmentId: currentDepartment.id,
      limit: POSITIONS_ON_SCREEN,
      offset: isClear ? 0 : positions.length,
    })

    if (newPositions.length < POSITIONS_ON_SCREEN) {
      setIsAllPositionsLoaded(true)
    }

    if (user?.id && !userPosition) {
      const [foundUserPosition] = await users.getExperience({
        userId: user.id,
        departmentId: currentDepartment.id,
      })

      setUserPosition(foundUserPosition)
    }

    setPositions(prev => (isClear ? newPositions : [...prev, ...newPositions]))
  }

  const setEventsListObserver = () => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsEndOfPositionsList(entry.isIntersecting),
      { threshold: 0.1 },
    )

    if (positionsListEndRef.current) {
      observer.observe(positionsListEndRef.current)
    }

    return () => observer.disconnect()
  }

  return (
    <>
      {!isLoading ? (
        <div className="leaderboard">
          <h1 className="heading_4 leaderboard__title">Таблица лидеров</h1>
          <div className="leaderboard__list" ref={leaderboardListRef}>
            <Dropdown
              items={departments.map(dep => ({ id: dep.id, text: dep.name }))}
              selectedItems={
                currentDepartment
                  ? [{ id: currentDepartment.id, text: currentDepartment.name }]
                  : []
              }
              onChangeDropdown={selected =>
                !isArray(selected) && selected
                  ? setCurrentDepartment(
                      departments.find(dep => dep.id === selected.id) ?? null,
                    )
                  : setCurrentDepartment(null)
              }
            />

            {userPosition &&
              isListVisible &&
              !isUserRowVisible &&
              !isUserRowAboveViewport &&
              renderUserRow(userPosition, 'bottom')}
            {userPosition &&
              isListVisible &&
              isUserRowAboveViewport &&
              renderUserRow(userPosition, 'top')}

            <div className="leaderboard__items">
              {positions.map(pos => {
                const isCurrentUser =
                  userPosition && pos.user.id === userPosition.user.id
                return (
                  <div
                    key={pos.user.id}
                    ref={isCurrentUser ? userRowRef : undefined}
                    className={`leaderboard__rank--${pos.rank} leaderboard__item leaderboard__item ${isCurrentUser ? ' leaderboard__item--user' : ''}`}
                  >
                    {pos.rank === 1 || pos.rank === 2 || pos.rank === 3 ? (
                      <img
                        src={medalsImages[pos.rank - 1]?.url}
                        alt="medal"
                        className="leaderboard__medal"
                      />
                    ) : (
                      <p className="body_l_sb leaderboard__rank--number">
                        {pos.rank}
                      </p>
                    )}
                    <UserAvatarInfo
                      text={pos.user.name}
                      avatarSrc={pos.user.image?.url}
                      className="leaderboard__avatar"
                    />

                    <p className="body_l_sb">{pos.experience}</p>
                  </div>
                )
              })}
            </div>
            <div ref={positionsListEndRef} className="anchor" />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
