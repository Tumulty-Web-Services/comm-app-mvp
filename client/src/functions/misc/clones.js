export function cloneArrayOfObjects(originalArray) {
    return [
        ...originalArray
      ].map(i => ({ ...i}));
}