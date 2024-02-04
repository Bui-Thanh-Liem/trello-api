/**
 * @param {*} originalArray
 * @param {*} orderArray
 * @param {*} key = Key to order
 * @return new Ordered Array
 *
 * Xác định các phần tử trong array gốc ban đầu (originalArray)
 *  xem nó nằm ở đâu trong array thứ 2 (orderArray) (là array mà mình dùng để sắp xếp)
 *  bằng cách tìm index (indexOf)
 *  rồi sẽ sắp xếp theo index đó bằng hàm sort của Javascript.
 */

export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return [];

  const clonedArray = [...originalArray];
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });

  return orderedArray;
};
