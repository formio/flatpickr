import { key, CustomLocale } from "../types/locale";

import { Arabic as ar } from "./flatpickr-ar";
import { Austria as at } from "./flatpickr-at";
import { Azerbaijan as az } from "./flatpickr-az";
import { Belarusian as be } from "./flatpickr-be";
import { Bosnian as bs } from "./flatpickr-bs";
import { Bulgarian as bg } from "./flatpickr-bg";
import { Bangla as bn } from "./flatpickr-bn";
import { Catalan as cat } from "./flatpickr-cat";
import { Kurdish as ckb } from "./flatpickr-ckb";
import { Czech as cs } from "./flatpickr-cs";
import { Welsh as cy } from "./flatpickr-cy";
import { Danish as da } from "./flatpickr-da";
import { German as de } from "./flatpickr-de";
import { english as en } from "./default";
import { Esperanto as eo } from "./flatpickr-eo";
import { Spanish as es } from "./flatpickr-es";
import { Estonian as et } from "./flatpickr-et";
import { Persian as fa } from "./flatpickr-fa";
import { Finnish as fi } from "./flatpickr-fi";
import { Faroese as fo } from "./flatpickr-fo";
import { French as fr } from "./flatpickr-fr";
import { Greek as gr } from "./flatpickr-gr";
import { Hebrew as he } from "./flatpickr-he";
import { Hindi as hi } from "./flatpickr-hi";
import { Croatian as hr } from "./flatpickr-hr";
import { Hungarian as hu } from "./flatpickr-hu";
import { Armenian as hy } from "./flatpickr-hy";
import { Indonesian as id } from "./flatpickr-id";
import { Icelandic as is } from "./flatpickr-is";
import { Italian as it } from "./flatpickr-it";
import { Japanese as ja } from "./flatpickr-ja";
import { Georgian as ka } from "./flatpickr-ka";
import { Korean as ko } from "./flatpickr-ko";
import { Khmer as km } from "./flatpickr-km";
import { Kazakh as kz } from "./flatpickr-kz";
import { Lithuanian as lt } from "./flatpickr-lt";
import { Latvian as lv } from "./flatpickr-lv";
import { Macedonian as mk } from "./flatpickr-mk";
import { Mongolian as mn } from "./flatpickr-mn";
import { Malaysian as ms } from "./flatpickr-ms";
import { Burmese as my } from "./flatpickr-my";
import { Dutch as nl } from "./flatpickr-nl";
import { NorwegianNynorsk as nn } from "./flatpickr-nn";
import { Norwegian as no } from "./flatpickr-no";
import { Punjabi as pa } from "./flatpickr-pa";
import { Polish as pl } from "./flatpickr-pl";
import { Portuguese as pt } from "./flatpickr-pt";
import { Romanian as ro } from "./flatpickr-ro";
import { Russian as ru } from "./flatpickr-ru";
import { Sinhala as si } from "./flatpickr-si";
import { Slovak as sk } from "./flatpickr-sk";
import { Slovenian as sl } from "./flatpickr-sl";
import { Albanian as sq } from "./flatpickr-sq";
import { Serbian as sr } from "./flatpickr-sr";
import { Swedish as sv } from "./flatpickr-sv";
import { Thai as th } from "./flatpickr-th";
import { Turkish as tr } from "./flatpickr-tr";
import { Ukrainian as uk } from "./flatpickr-uk";
import { Uzbek as uz } from "./flatpickr-uz";
import { UzbekLatin as uzLatn } from "./flatpickr-uz_latn";
import { Vietnamese as vn } from "./flatpickr-vn";
import { Mandarin as zh } from "./flatpickr-zh";
import { MandarinTraditional as zh_tw } from "./flatpickr-zh-tw";

const l10n: Record<key, CustomLocale> = {
  ar,
  at,
  az,
  be,
  bg,
  bn,
  bs,
  ca: cat,
  ckb,
  cat,
  cs,
  cy,
  da,
  de,
  default: { ...en },
  en,
  eo,
  es,
  et,
  fa,
  fi,
  fo,
  fr,
  gr,
  he,
  hi,
  hr,
  hu,
  hy,
  id,
  is,
  it,
  ja,
  ka,
  ko,
  km,
  kz,
  lt,
  lv,
  mk,
  mn,
  ms,
  my,
  nl,
  nn,
  no,
  pa,
  pl,
  pt,
  ro,
  ru,
  si,
  sk,
  sl,
  sq,
  sr,
  sv,
  th,
  tr,
  uk,
  vn,
  zh,
  zh_tw,
  uz,
  uz_latn: uzLatn,
};

export default l10n;
