import { defaultLang } from '@/i18n/index'
import zh_CN from '@/i18n/zh_CN'
import en_US from '@/i18n/en_US'

const languages = {
  zh_CN,
  en_US
}

type CurrentLang = keyof typeof languages

export default function (type: string, source: string): string {
  const currentLang: CurrentLang = (sessionStorage.getItem('lang') as CurrentLang) || defaultLang
  const currentItems: any =
    languages[currentLang][type as keyof (typeof languages)[typeof currentLang]]
  return (currentItems && currentItems[source]) || source
}
