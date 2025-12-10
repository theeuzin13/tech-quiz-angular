export const iconMap: any = {
  'frontend': 'fa-solid fa-code',
  'backend': 'fa-solid fa-server',
  'database': 'fa-solid fa-database',
  'devops': 'fa-solid fa-gears',
  'security': 'fa-solid fa-shield-halved',
  'networks': 'fa-solid fa-network-wired',
  'hardware': 'fa-solid fa-microchip',
  'data-science': 'fa-solid fa-chart-line',
  'ai': 'fa-solid fa-robot'
};

export const iconList = Object.entries(iconMap).map(([key, icon]) => ({
  key,
  icon
}));
