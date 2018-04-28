const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function dateFormatter(dateString: string) {
  const date = new Date(dateString);
  return MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear();
}
