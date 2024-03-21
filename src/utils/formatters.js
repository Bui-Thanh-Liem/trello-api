export const slugify = (val) => {
  if (!val) return '';
  return String(val)
    .normalize('NFKD') // Chia các kí tự có dấu thành kí tự base hoặc có dấu phụ
    .replace(/[\u0300-\u036f]/g, '') // Xóa kí tự có dấu, thay thành không dấu
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // Xóa tất cả các kí tự không phải là số, chữ, dấu gạch nối
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // Xóa 2 dấu gạch nối liên tiếp
};

