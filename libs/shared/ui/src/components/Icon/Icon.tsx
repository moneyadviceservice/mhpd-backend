import { HTMLAttributes } from 'react';
import Accessibility from '../../assets/images/accessibility.svg';
import ArrowCurved from '../../assets/images/arrow-curved.svg';
import ArrowBrandCurved from '../../assets/images/arrow-brand-curved.svg';
import ArrowBrandStraight from '../../assets/images/arrow-brand-straight.svg';
import ArrowUp from '../../assets/images/arrow-up.svg';
import Bookmark from '../../assets/images/bookmark.svg';
import Budgeting from '../../assets/images/budgeting.svg';
import BurgerClose from '../../assets/images/burger-close.svg';
import BurgerIcon from '../../assets/images/burger.svg';
import Calculator from '../../assets/images/calculator.svg';
import Checklist from '../../assets/images/checklist.svg';
import Chevron from '../../assets/images/chevron.svg';
import ChevronDown from '../../assets/images/chevron-down-icon.svg';
import ChevronLeft from '../../assets/images/chevron-left.svg';
import ChevronRight from '../../assets/images/chevron-right.svg';
import Close from '../../assets/images/close-icon.svg';
import CloseRed from '../../assets/images/close-red.svg';
import Costs from '../../assets/images/costs.svg';
import Download from '../../assets/images/download.svg';
import Edit from '../../assets/images/edit.svg';
import EmergencySavings from '../../assets/images/emergency_savings.svg';
import England from '../../assets/images/england.svg';
import EstatePlanning from '../../assets/images/estate_planning.svg';
import Facebook from '../../assets/images/facebook.svg';
import FaceToFace from '../../assets/images/facetoface.svg';
import HandShake from '../../assets/images/hand-shake.svg';
import Home from '../../assets/images/home.svg';
import Hyphen from '../../assets/images/hyphen.svg';
import IncomeProtection from '../../assets/images/income_protection.svg';
import InfoIcon from '../../assets/images/info-icon.svg';
import LinkArrow from '../../assets/images/link-arrow.svg';
import LogoCompactCy from '../../assets/images/logo-compact-cy.svg';
import LogoCompactIcon from '../../assets/images/logo-compact.svg';
import LogoCyIcon from '../../assets/images/logo-cy.svg';
import LogoIcon from '../../assets/images/logo.svg';
import Mail from '../../assets/images/mail.svg';
import Minus from '../../assets/images/minus.svg';
import NorthernIreland from '../../assets/images/northern-ireland.svg';
import Online from '../../assets/images/online.svg';
import Planning from '../../assets/images/planning.svg';
import Plus from '../../assets/images/plus.svg';
import PlusVariant from '../../assets/images/plus-variant.svg';
import PreventingDebt from '../../assets/images/preventing_debt.svg';
import Savings from '../../assets/images/savings.svg';
import Scotland from '../../assets/images/scotland.svg';
import SearchCloseIcon from '../../assets/images/search-close.svg';
import SearchIcon from '../../assets/images/search.svg';
import Spinner from '../../assets/images/spinner.svg';
import Telephone from '../../assets/images/telephone.svg';
import TelephoneSmall from '../../assets/images/small-telephone.svg';
import Tick from '../../assets/images/tick.svg';
import TickGreen from '../../assets/images/tick-green.svg';
import Twitter from '../../assets/images/twitter.svg';
import W3C from '../../assets/images/w3c.svg';
import Wales from '../../assets/images/wales.svg';
import Warning from '../../assets/images/warning.svg';
import WebChat from '../../assets/images/webchat.svg';
import WebForm from '../../assets/images/webform.svg';
import Whatsapp from '../../assets/images/whatsapp.svg';
import XClose from '../../assets/images/x-close.svg';
import XFilter from '../../assets/images/x-filter.svg';

export enum IconType {
  ACCESSIBILITY = 'accessibility',
  ARROW_CURVED = 'arrow-curved',
  ARROW_BRAND_CURVED = 'arrow-brand-curved',
  ARROW_BRAND_STRAIGHT = 'arrow-brand-straight',
  ARROW_UP = 'arrow-up',
  BOOKMARK = 'bookmark',
  BUDGETING = 'budgeting',
  BURGER_CLOSE = 'burger-close',
  BURGER_ICON = 'burger-icon',
  CALCULATOR = 'calculator',
  CHECKLIST = 'checklist',
  CHEVRON = 'chevron',
  CHEVRON_DOWN = 'chevron-down',
  CHEVRON_LEFT = 'chevron-left',
  CHEVRON_RIGHT = 'chevron-right',
  CLOSE = 'close',
  CLOSE_RED = 'close-red',
  COSTS = 'costs',
  DOWNLOAD = 'download',
  EDIT = 'edit',
  EMERGENCY_SAVINGS = 'emergency-savings',
  ENGLAND = 'england',
  ESTATE_PLANNING = 'estate-planning',
  FACEBOOK = 'facebook',
  FACE_TO_FACE = 'face-to-face',
  HAND_SHAKE = 'hand-shake',
  HOME = 'home',
  HYPHEN = 'hyphen',
  INCOME_PROTECTION = 'income-protection',
  INFO_ICON = 'info-icon',
  LINK_ARROW = 'link-arrow',
  LOGO_COMPACT_CY = 'logo-compact-cy',
  LOGO_COMPACT_ICON = 'logo-compact-icon',
  LOGO_CY_ICON = 'logo-cy-icon',
  LOGO_ICON = 'logo-icon',
  MAIL = 'mail',
  MINUS = 'minus',
  NORTHERN_IRELAND = 'northern-ireland',
  ONLINE = 'online',
  PLANNING = 'planning',
  PLUS = 'plus',
  PLUS_VARIANT = 'plus-variant',
  PREVENTING_DEBT = 'preventing-debt',
  SAVINGS = 'savings',
  SCOTLAND = 'scotland',
  SEARCH_CLOSE_ICON = 'search-close-icon',
  SEARCH_ICON = 'search-icon',
  SPINNER = 'spinner',
  TELEPHONE = 'telephone',
  TELEPHONE_SMALL = 'telephone-small',
  TICK = 'tick',
  TICK_GREEN = 'tick-green',
  TWITTER = 'twitter',
  W3C = 'w3c',
  WALES = 'wales',
  WARNING = 'warning',
  WEB_CHAT = 'web-chat',
  WEB_FORM = 'web-form',
  WHATSAPP = 'whatsapp',
  X_CLOSE = 'x-close',
  X_FILTER = 'x-filter',
}

const map = {
  [IconType.ACCESSIBILITY]: Accessibility,
  [IconType.ARROW_CURVED]: ArrowCurved,
  [IconType.ARROW_BRAND_CURVED]: ArrowBrandCurved,
  [IconType.ARROW_BRAND_STRAIGHT]: ArrowBrandStraight,
  [IconType.ARROW_UP]: ArrowUp,
  [IconType.BOOKMARK]: Bookmark,
  [IconType.BUDGETING]: Budgeting,
  [IconType.BURGER_CLOSE]: BurgerClose,
  [IconType.BURGER_ICON]: BurgerIcon,
  [IconType.CALCULATOR]: Calculator,
  [IconType.CHECKLIST]: Checklist,
  [IconType.CHEVRON]: Chevron,
  [IconType.CHEVRON_DOWN]: ChevronDown,
  [IconType.CHEVRON_LEFT]: ChevronLeft,
  [IconType.CHEVRON_RIGHT]: ChevronRight,
  [IconType.CLOSE]: Close,
  [IconType.CLOSE_RED]: CloseRed,
  [IconType.COSTS]: Costs,
  [IconType.DOWNLOAD]: Download,
  [IconType.EDIT]: Edit,
  [IconType.EMERGENCY_SAVINGS]: EmergencySavings,
  [IconType.ENGLAND]: England,
  [IconType.ESTATE_PLANNING]: EstatePlanning,
  [IconType.FACEBOOK]: Facebook,
  [IconType.FACE_TO_FACE]: FaceToFace,
  [IconType.HAND_SHAKE]: HandShake,
  [IconType.HOME]: Home,
  [IconType.HYPHEN]: Hyphen,
  [IconType.INCOME_PROTECTION]: IncomeProtection,
  [IconType.INFO_ICON]: InfoIcon,
  [IconType.LINK_ARROW]: LinkArrow,
  [IconType.LOGO_COMPACT_CY]: LogoCompactCy,
  [IconType.LOGO_COMPACT_ICON]: LogoCompactIcon,
  [IconType.LOGO_CY_ICON]: LogoCyIcon,
  [IconType.LOGO_ICON]: LogoIcon,
  [IconType.MAIL]: Mail,
  [IconType.MINUS]: Minus,
  [IconType.NORTHERN_IRELAND]: NorthernIreland,
  [IconType.ONLINE]: Online,
  [IconType.PLANNING]: Planning,
  [IconType.PLUS]: Plus,
  [IconType.PLUS_VARIANT]: PlusVariant,
  [IconType.PREVENTING_DEBT]: PreventingDebt,
  [IconType.SAVINGS]: Savings,
  [IconType.SCOTLAND]: Scotland,
  [IconType.SEARCH_CLOSE_ICON]: SearchCloseIcon,
  [IconType.SEARCH_ICON]: SearchIcon,
  [IconType.SPINNER]: Spinner,
  [IconType.TELEPHONE]: Telephone,
  [IconType.TELEPHONE_SMALL]: TelephoneSmall,
  [IconType.TICK]: Tick,
  [IconType.TICK_GREEN]: TickGreen,
  [IconType.TWITTER]: Twitter,
  [IconType.W3C]: W3C,
  [IconType.WALES]: Wales,
  [IconType.WARNING]: Warning,
  [IconType.WEB_CHAT]: WebChat,
  [IconType.WEB_FORM]: WebForm,
  [IconType.WHATSAPP]: Whatsapp,
  [IconType.X_CLOSE]: XClose,
  [IconType.X_FILTER]: XFilter,
};

interface Props extends HTMLAttributes<SVGElement> {
  type: IconType;
  className?: string;
  fill?: string;
}

export const Icon = ({ type, className, ...props }: Props) => {
  const Component = map[type];
  return <Component className={className ?? ''} {...props} />;
};
