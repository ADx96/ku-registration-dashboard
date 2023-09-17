export function getGovernor(data) {
  if (!data) {
    return;
  }
  switch (data) {
    case 1:
      return 'محافظة العاصمة';
    case 2:
      return 'محافظة حولي';
    case 3:
      return 'محافظة الأحمدي';
    case 4:
      return 'محافظة الجهراء';
    case 5:
      return 'محافظة الفروانية';
    case 6:
      return 'محافظة مبارك الكبير';
    default:
      throw new Error('Unknown step');
  }
}

export function removeEmptyKeys(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeEmptyKeys);
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const cleanedValue = removeEmptyKeys(value);

    if (
      cleanedValue !== null &&
      cleanedValue !== undefined &&
      cleanedValue !== ''
    ) {
      acc[key] = cleanedValue;
    }

    return acc;
  }, {});
}
