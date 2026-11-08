import { LogoMark } from "./Logo";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header({ locale }: { locale?: string }) {
  const t = useTranslations("Common");

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20">
      <div className="container-page flex items-center justify-between py-5">
        <span className="flex items-center gap-3 text-forest-ink">
          <LogoMark size={38} />
          <span className="font-display text-[19px] font-semibold tracking-[-0.02em]">{t('name')}</span>
        </span>
         <LanguageSwitcher locale={locale}/>
      </div>
    </header>
  );
}
