import { ADD_IMAGE } from './addImage'
import { FOLDER_UPLOAD } from './folderUpload'
import { CALENDAR } from './calendar'
import { MARKER_MAP } from './markerMap'
import { PLATFORM } from './platform'
import { DEPARTMENT } from './department'
import { GRADUATION_CAP } from './graduationCap'
import { SEARCH } from './search'
import { ANGLE_DOWN } from './angleDown'
import { ANGLE_UP } from './angleUp'
import { MENU_DOTS } from './menuDots'
import { EYE } from './eye'
import { EYE_CLOSED } from './eyeClosed'
import { DOWNLOAD } from './download'
import { ANGLE_LEFT } from './angleLeft'
import { ANGLE_RIGHT } from './angleRight'
import { ADD } from './add'
import { CROSS } from './cross'
import { CHECK } from './check'
import { TIME } from './time'
import { TIMER } from './timer'
import { ARROW_SMALL_LEFT } from './arrowSmallLeft'
import { PLUS } from './plus'
import { DRAG_GRIP } from './dragGrip'
import { EDIT } from './edit'
import { DELETE } from './delete'
import { EXCEL } from './excel'
import { TAOM } from './taom'
import { LOGOUT } from './logout'

export const ICON_MAP = {
  ADD_IMAGE: ADD_IMAGE,
  FOLDER_UPLOAD: FOLDER_UPLOAD,
  CALENDAR: CALENDAR,
  MARKER_MAP: MARKER_MAP,
  PLATFORM: PLATFORM,
  DEPARTMENT: DEPARTMENT,
  GRADUATION_CAP: GRADUATION_CAP,
  SEARCH: SEARCH,
  ANGLE_DOWN: ANGLE_DOWN,
  ANGLE_UP: ANGLE_UP,
  MENU_DOTS: MENU_DOTS,
  EYE: EYE,
  EYE_CLOSED: EYE_CLOSED,
  DOWNLOAD: DOWNLOAD,
  ANGLE_LEFT: ANGLE_LEFT,
  ANGLE_RIGHT: ANGLE_RIGHT,
  ADD: ADD,
  CROSS: CROSS,
  CHECK: CHECK,
  TIME: TIME,
  TIMER: TIMER,
  ARROW_SMALL_LEFT: ARROW_SMALL_LEFT,
  PLUS: PLUS,
  DRAG_GRIP: DRAG_GRIP,
  EDIT: EDIT,
  DELETE: DELETE,
  EXCEL: EXCEL,
  TAOM: TAOM,
  LOGOUT: LOGOUT,
}

type IconName = keyof typeof ICON_MAP

export function getIcon(iconName: IconName): string {
  return ICON_MAP[iconName]
}
