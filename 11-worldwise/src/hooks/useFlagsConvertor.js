import { useEffect, useState } from "react";

export function useConvertCountryCodeToEmoji(flag) {
  if (!flag) return;
  const codePoints = flag
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());

  return String.fromCodePoint(...codePoints);
}

export function useConvertCountryCodeToPNG(flag) {
  if (!flag) return;
  const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");

  return `https://flagcdn.com/24x18/${countryCode}.png`;
}
