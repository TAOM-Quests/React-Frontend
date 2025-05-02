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
import { ARROW_SMALL_RIGHT } from './arrowSmallRight'
import { PLUS } from './plus'
import { DRAG_GRIP } from './dragGrip'
import { EDIT } from './edit'
import { DELETE } from './delete'
import { BOLD } from './bold'
import { ITALIC } from './italic'
import { UNDERLINE } from './underline'
import { STRIKE } from './strike'
import { LIST } from './list'
import { LINK } from './link'
import { LEFT } from './left'
import { CENTER } from './center'
import { RIGHT } from './right'
import { JUSTIFY } from './justify'
import { HEADING_1 } from './heading_1'
import { HEADING_2 } from './heading_2'
import { HEADING_3 } from './heading_3'
import { HEADING_4 } from './heading_4'
import { HEADING_5 } from './heading_5'
import { HEADING_6 } from './heading_6'
import { FILE } from './file'
import { EXCEL } from './excel'
import { TAOM } from './taom'
import { LOGOUT } from './logout'
import { DZEN } from './dzen'
import { VK } from './vk'

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
  ARROW_SMALL_RIGHT: ARROW_SMALL_RIGHT,
  PLUS: PLUS,
  DRAG_GRIP: DRAG_GRIP,
  EDIT: EDIT,
  DELETE: DELETE,
  BOLD: BOLD,
  ITALIC: ITALIC,
  UNDERLINE: UNDERLINE,
  STRIKE: STRIKE,
  LIST: LIST,
  LINK: LINK,
  LEFT: LEFT,
  CENTER: CENTER,
  RIGHT: RIGHT,
  JUSTIFY: JUSTIFY,
  HEADING_1: HEADING_1,
  HEADING_2: HEADING_2,
  HEADING_3: HEADING_3,
  HEADING_4: HEADING_4,
  HEADING_5: HEADING_5,
  HEADING_6: HEADING_6,
  FILE: FILE,
  EXCEL: EXCEL,
  TAOM: TAOM,
  LOGOUT: LOGOUT,
  DZEN: DZEN,
  VK: VK,
}

type IconName = keyof typeof ICON_MAP

export function getIcon(iconName: IconName): string {
  return ICON_MAP[iconName]
}
