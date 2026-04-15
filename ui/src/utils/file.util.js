export function bytesToHuman(bytes = 0) {
  const units = ["B", "KB", "MB", "GB"];
  let v = Math.max(0, Number(bytes));
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
