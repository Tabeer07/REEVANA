/**
 * REEVANA Reusable Indian Rupee (INR - ₹) Currency Formatter Utility
 * Standardizes currency formatting across all components, mock data, and AI outputs.
 * Uses proper Indian number formatting (e.g. ₹500, ₹1,200, ₹1,25,000).
 */

export const formatCurrency = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
};

export const formatCurrencyRange = (min, max) => {
  const minStr = formatCurrency(min);
  const maxStr = formatCurrency(max);
  return `${minStr} – ${maxStr}`;
};

export const parseCurrencyNumber = (val) => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9.]/g, '');
  return Number(cleaned) || 0;
};
