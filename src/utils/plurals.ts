/**
 * Основано на репозитории
 * @see https://github.com/megatolya/plural-ru
 */

const formattedString = (str: string, num: number) => str.replace(/%d/g, String(num));

const getNounPluralForm = (a: number) => {
  if (a % 10 === 1 && a % 100 !== 11) {
    return 0;
  }
  if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
    return 1;
  }
  return 2;
};

const getVerbPluralForm = (num: number) => {
  let n = num;
  if (n > 1000000) {
    return 2;
  }
  if (n > 1000 && n < 1000000 && String(n).endsWith('000')) {
    n /= 1000;
  }
  if ((n % 10 === 1 && n % 100 !== 11) || String(n).endsWith('1000')) {
    return 0;
  }
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    return 1;
  }
  return 2;
};

export const getPluralNoun = (num: number, ...forms: string[]) => {
  switch (forms.length) {
    case 1:
      throw new Error('Not enough forms');
    case 2:
      return formattedString(num > 1 ? forms[1] : forms[0], num);
    default:
      return formattedString(forms[getNounPluralForm(num)], num);
  }
};

export const getPluralVerb = (num: number, ...forms: string[]) => (
  formattedString(forms[getVerbPluralForm(num)], num)
);
