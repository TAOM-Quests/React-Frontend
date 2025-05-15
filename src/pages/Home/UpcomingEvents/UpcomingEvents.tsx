import { events as eventsApi } from '../../../services/api/eventModule/events/events'
import moment from 'moment'
import { PlaceOffline, PlaceOnline } from '../../../models/event'
import { EventMinimize as EventMinimizeComponent } from '../../../components/EventMinimize/EventMinimize'
import { useEffect, useState } from 'react'
import { EventMinimize } from '../../../models/eventMinimize'
import { Loading } from '../../../components/Loading/Loading'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './UpcomingEvents.scss'

export const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventMinimize[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      setIsLoading(true)
      const now = new Date()
      const threeDaysLater = new Date()
      threeDaysLater.setDate(now.getDate() + 5)

      try {
        const events = await eventsApi.getManyByParams({
          dateStart: now,
          dateEnd: threeDaysLater,
          limit: 5,
        })

        const filtered = events
          .filter(
            event =>
              event.date &&
              moment(event.date).isBetween(
                now,
                threeDaysLater,
                undefined,
                '[]',
              ),
          )
          .sort((a, b) => {
            if (!a.date && !b.date) return 0
            if (!a.date) return 1
            if (!b.date) return -1
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          })

        setUpcomingEvents(filtered)
      } catch (e) {
        console.error('Ошибка загрузки мероприятий:', e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUpcomingEvents()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="upcoming-events">
      <h4 className="heading_4 upcoming-events__title">
        Ближайшие мероприятия
      </h4>
      {upcomingEvents.length > 0 ? (
        <div className="upcoming-events__slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
            }}
            speed={900}
          >
            {upcomingEvents.map(event => {
              const onlinePlace: PlaceOnline | null =
                event.places?.find(place => place.is_online) ?? null
              const offlinePlace: PlaceOffline | null =
                event.places?.find(place => !place.is_online) ?? null

              return (
                <SwiperSlide key={event.id}>
                  <EventMinimizeComponent
                    id={event.id}
                    date={event.date ?? null}
                    status={event.status.name}
                    name={event.name ?? ''}
                    tags={event.tags?.map(tag => tag.name) ?? []}
                    type={event.type?.name ?? ''}
                    imageUrl={event.image?.url ?? ''}
                    address={offlinePlace?.address ?? ''}
                    platform={onlinePlace?.platform ?? ''}
                    departmentName={event.department.name}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      ) : (
        <div className="upcoming-events__empty">
          В ближайшее время мероприятий не запланировано
        </div>
      )}
    </div>
  )
}
