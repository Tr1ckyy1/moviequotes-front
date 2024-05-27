import { useI18n } from 'vue-i18n'
import { format } from 'date-fns'

export default function formatRelativeDate(date: Date) {
  const { t } = useI18n()
  const now = new Date()
  const createdDate = new Date(date)

  const diff = now.getTime() - createdDate.getTime()

  const secondsAgo = Math.floor(diff / 1000)

  const intervals = [
    { label: t('notifications.seconds_ago', { count: secondsAgo }), threshold: 60 }, // Less than 1 minute
    {
      label: t('notifications.minutes_ago', { count: Math.floor(secondsAgo / 60) }),
      threshold: 3600
    },
    {
      label: t('notifications.hours_ago', { count: Math.floor(secondsAgo / 3600) }),
      threshold: 86400
    },
    {
      label: t('notifications.days_ago', { count: Math.floor(secondsAgo / 86400) }),
      threshold: 2592000
    },
    {
      label: t('notifications.months_ago', { count: Math.floor(secondsAgo / 2592000) }),
      threshold: 31536000
    },
    { label: format(createdDate, 'dd/MM/yyyy'), threshold: 63072000 } // More than 2 years (exact date)
  ]

  const interval = intervals.find((interval) => secondsAgo < interval.threshold)

  if (interval) {
    return interval.label
  } else {
    return format(createdDate, 'dd/MM/yyyy')
  }
}
