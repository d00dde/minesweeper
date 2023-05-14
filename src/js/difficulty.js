export const settings = [
  { rows: 5, columns: 5, mines: 2, className: 'easy', title: 'Easy', index: 0, isDefault: false },
  { rows: 10, columns: 10, mines: 10, className: 'normal', title: 'Normal', index: 1, isDefault: true },
  { rows: 20, columns: 20, mines: 70, className: 'hard', title: 'Hard', index: 2, isDefault: false },
];

export function getSettingsByIndex(index) {
  const setting = settings.find((item) => item.index === index);
  if(!setting) {
    throw new Error(`Not found setting for index ${index}`);
  }
  return setting;
}
