// I care about a lot of things. JS is not one of them.

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const dayNum = (d: Date) => {
  const d_1_31 = d.getDate();
  return `${d_1_31}`;
};

export const dayNumPadded = (d: Date) => {
  const d_1_31 = d.getDate();
  return d_1_31 < 10 ? `0${d_1_31}` : `${d_1_31}`;
};

export const monthName = (d: Date) => {
  const m_0_11 = d.getMonth();
  return monthNames[m_0_11] ?? 'January';
};

export const monthNumPadded = (d: Date) => {
  const m_1_12 = d.getMonth() + 1;
  return m_1_12 < 10 ? `0${m_1_12}` : `${m_1_12}`;
};

export const year = (d: Date) => `${d.getFullYear()}`;
