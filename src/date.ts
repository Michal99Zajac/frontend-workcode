import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// translation
import 'dayjs/locale/en'
import 'dayjs/locale/pl'

dayjs.extend(relativeTime)
