/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const backgroundStyleByTag = (tag: any): { bgColor: string } => {
  const bgStyleMap: { [key: string]: string } = {
    Коммуникация: 'rgba(99, 185, 186, 0.8)',
    Новый: 'rgba(255, 51, 71, 0.80)',
  };

  let bgStyle = 'rgba(80, 69, 119, 0.8)';
  if (Object.prototype.hasOwnProperty.call(bgStyleMap, tag.color)) {
    bgStyle = bgStyleMap[tag.color];
  }

  return {
    bgColor: bgStyle,
  };
};

export default backgroundStyleByTag;
