import './Footer.scss'
import { LOGO } from '../../assets/images/logo.ts'
import { Icon } from '../UI/Icon/Icon.tsx'
import { ICON_MAP } from '../../assets/icons/index.ts'

interface SocialLink {
  href: string
  icon: keyof typeof ICON_MAP
}

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface ContactInfo {
  phone: string
  email: string
  addressLines: string[]
}

interface FooterData {
  logoAlt: string
  socialLinks: SocialLink[]
  sections: FooterSection[]
  contacts: ContactInfo
  copyright: string
}

const footerData: FooterData = {
  logoAlt: 'Тольяттинская академия управления',
  socialLinks: [
    { href: 'https://vk.com/taom_ru', icon: 'VK' },
    { href: 'https://dzen.ru/taom', icon: 'DZEN' },
    { href: 'https://taom.academy', icon: 'TAOM' },
  ],
  sections: [
    {
      title: 'Основные разделы',
      links: [
        { label: 'Главная', href: '/' },
        { label: 'Календарь', href: '/calendar' },
        { label: 'Лидеры', href: '/leaders' },
        { label: 'Конструктор квестов', href: '/quest/create' },
      ],
    },
    {
      title: 'Вспомогательные',
      links: [
        {
          label: 'Политики в отношении обработки персональных данных',
          href: 'https://taom.academy/upload/%E2%84%9611_13_02_2023.pdf',
        },
        {
          label: 'Политика в отношении обработки данных',
          href: 'https://taom.academy/upload/politic_obrabotka_pd.pdf',
        },
        { label: 'Официальный сайт Академии', href: 'https://taom.academy' },
      ],
    },
    {
      title: 'Квесты',
      links: [
        {
          label: 'Прикладная информатика и высшая математика',
          href: '/quest/1',
        },
        { label: 'Реклама и связь с общественностью', href: '/quest/2' },
        { label: 'Экономика и финансы', href: '/quest/3' },
        { label: 'Управление', href: '/quest/4' },
        { label: 'Дизайн', href: '/quest/5' },
      ],
    },
    {
      title: 'Игры',
      links: [
        {
          label: 'Прикладная информатика и высшая математика',
          href: '/game/1',
        },
        { label: 'Реклама и связь с общественностью', href: '/game/2' },
        { label: 'Экономика и финансы', href: '/game/3' },
        { label: 'Управление', href: '/game/4' },
        { label: 'Дизайн', href: '/game/5' },
      ],
    },
  ] as FooterSection[],
  contacts: {
    phone: '+7 (8482) 55-50-44',
    email: 'abitur.taom@gmail.com',
    addressLines: [
      '445144, Самарская область,',
      'Ставропольский район, территория оздоровительный комплекс Алые паруса,',
      'здание 5, Тольятти',
    ],
  } as ContactInfo,
  copyright: '© 2025 Тольяттинская академия управления. Все права защищены.',
}

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__logo-social">
          <div className="footer__logo" aria-label={footerData.logoAlt}>
            {/* Здесь можно вставить svg или img логотип */}
            <svg
              width="233"
              height="64"
              viewBox="0 0 233 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              dangerouslySetInnerHTML={{ __html: LOGO }}
            />
          </div>
          <div className="footer__social">
            {footerData.socialLinks.map(({ href, icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label={icon}
              >
                <Icon icon={icon} size="extraLarge" colorIcon="primary" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__sections">
          {footerData.sections.map(section => (
            <div key={section.title} className="footer__section">
              <h4 className="body_l_sb footer__section-title">
                {section.title}
              </h4>
              <ul className="footer__links">
                {section.links.map(link => (
                  <li key={link.label} className="footer__link-item">
                    {link.href ? (
                      <a href={link.href} className="body_m_m footer__link">
                        {link.label}
                      </a>
                    ) : (
                      <span>{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__section footer__contacts">
            <h4 className="footer__section-title">Контакты</h4>
            <ul className="footer__contacts-list">
              <li>
                <a
                  href={`tel:${footerData.contacts.phone.replace(/[^\d+]/g, '')}`}
                  className="body_m_m footer__link"
                >
                  {footerData.contacts.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${footerData.contacts.email}`}
                  className="body_m_m footer__link"
                >
                  {footerData.contacts.email}
                </a>
              </li>
              {footerData.contacts.addressLines.map((line, i) => (
                <li key={i} className="body_m_m footer__address-line">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="body_s_r">{footerData.copyright}</span>
      </div>
    </footer>
  )
}
