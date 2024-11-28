export function numberToWords(n: number): string {
  const words = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
    "mười",
    "mười một",
    "mười hai",
    "mười ba",
    "mười bốn",
    "mười lăm",
    "mười sáu",
    "mười bảy",
    "mười tám",
    "mười chín",
    "hai mươi",
    "hai mốt",
    "hai hai",
    "hai ba",
    "hai bốn",
    "hai năm",
    "hai sáu",
    "hai bảy",
    "hai tám",
    "hai chín",
  ];

  const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

  if (n === 0) return "Không";

  let result = "";
  let unitIndex = 0;

  while (n > 0) {
    const group = n % 1000;
    if (group > 0) {
      result =
        processGroup(group) + (units[unitIndex] ? " " + units[unitIndex] : "") + " " + result;
    }
    n = Math.floor(n / 1000);
    unitIndex++;
  }

  function processGroup(group: number): string {
    let str = "";
    const hundreds = Math.floor(group / 100);
    const tens = Math.floor((group % 100) / 10);
    const ones = group % 10;

    if (hundreds > 0) {
      str += words[hundreds] + " trăm ";
    }

    if (tens > 1) {
      str += words[tens] + " mươi";
      if (ones > 0) {
        str += " " + words[ones];
      }
    } else if (tens === 1) {
      str += "mười " + (ones > 0 ? words[ones] : "");
    } else if (ones > 0) {
      str += words[ones];
    }

    return str.trim();
  }

  return result.trim();
}

export function speakText(text: string): void {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "vi-VN";
  const voices = speechSynthesis.getVoices();
  const voice = voices.find((voice) => voice.lang === "vi-VN");
  if (voice) {
    utterance.voice = voice;
  }

  speechSynthesis.speak(utterance);
}
