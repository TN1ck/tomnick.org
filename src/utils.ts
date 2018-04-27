const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function dateFormatter(date: Date) {
  date = new Date(date);
  return MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear();
}
