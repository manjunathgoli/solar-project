import { SITE } from '../../shared/site.js';

export const BRAND = SITE;
export const money = (amount) => new Intl.NumberFormat(BRAND.locale, { style: 'currency', currency: BRAND.currency, maximumFractionDigits: 0 }).format(amount || 0);
