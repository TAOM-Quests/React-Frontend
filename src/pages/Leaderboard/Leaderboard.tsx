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

const POSITIONS_ON_SCREEN = 10

export const Leaderboard = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [departments, setDepartments] = useState<Department[]>([])
  const [positions, setPositions] = useState<UserLeaderboardPosition[]>([])
  const [userPosition, setUserPosition] =
    useState<UserLeaderboardPosition | null>(null)
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(
    null,
  )

  const [isAllPositionsLoaded, setIsAllPositionsLoaded] = useState(false)
  const [isEndOfPositionsList, setIsEndOfPositionsList] = useState(false)

  const user = useAppSelector(selectAuth)
  const positionsListEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoading(true)
    try {
      fetchDepartments()
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
      fetchPositions(0)
    } catch (e) {
      console.log(`[Leaderboard] ${e}`)
    }
    setIsLoading(false)
  }, [currentDepartment])

  const fetchDepartments = async () => {
    setDepartments(await commonEntities.getDepartments())
  }

  const fetchPositions = async (offset?: number) => {
    if (!currentDepartment) throw Error('Department not found')

    const newPositions = await users.getExperience({
      departmentId: currentDepartment.id,
      limit: POSITIONS_ON_SCREEN,
      offset: offset ?? positions.length,
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

    setPositions(prev => [...prev, ...newPositions])
  }

  const setEventsListObserver = () => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsEndOfPositionsList(entry.isIntersecting),
      { threshold: 1 },
    )

    if (positionsListEndRef.current) {
      observer.observe(positionsListEndRef.current)
    }

    return () => observer.disconnect()
  }

  return (
    <>
      {!isLoading ? (
        <div>
          <h1>Таблица лидеров</h1>
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

          {positions.map(pos => (
            <div>
              {pos.rank}
              {pos.user.name}
              {pos.experience}
            </div>
          ))}

          {userPosition &&
            !positions
              .map(pos => pos.user.id)
              .includes(userPosition.user.id) && (
              <div>
                {userPosition.rank}
                {userPosition.user.name}
                {userPosition.experience}
              </div>
            )}

          <div ref={positionsListEndRef} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
