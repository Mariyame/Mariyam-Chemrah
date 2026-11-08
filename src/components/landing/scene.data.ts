export type Root = { d: string; w: number; delay: number };
export type Word = { t: string; x: string; y: string; size: number; rotate: number; delay?: number };
export type Dot = { x: string; y: string; dur: number; delay: number };

export const ROOTS = {
  desktop: {
    viewBox: "0 0 1440 600",
    fit: "xMidYMin slice",
    items: [
      { d: "M720 0 C720 80 700 140 640 200 C590 250 520 280 430 300", w: 3, delay: 0 },
      { d: "M720 0 C722 90 760 150 830 200 C900 250 990 270 1080 330", w: 3, delay: 0 },
      { d: "M720 0 C718 120 710 220 720 340 C726 420 700 480 690 580", w: 3.5, delay: 0 },
      { d: "M640 200 C600 260 560 340 470 420", w: 2, delay: 0.15 },
      { d: "M830 200 C860 270 900 330 990 420", w: 2, delay: 0.15 },
      { d: "M430 300 C350 320 260 300 160 340", w: 2, delay: 0.25 },
      { d: "M1080 330 C1170 350 1250 330 1340 380", w: 2, delay: 0.25 },
      { d: "M720 340 C760 380 820 420 860 500", w: 1.6, delay: 0.3 },
      { d: "M720 340 C680 390 620 420 590 500", w: 1.6, delay: 0.3 },
      { d: "M470 420 C420 460 380 520 300 580", w: 1.4, delay: 0.4 },
      { d: "M990 420 C1040 470 1080 520 1160 580", w: 1.4, delay: 0.4 },
      { d: "M160 340 C110 360 70 400 30 470", w: 1.2, delay: 0.5 },
      { d: "M1340 380 C1380 400 1410 440 1430 500", w: 1.2, delay: 0.5 },
      { d: "M560 340 C520 360 470 360 420 380", w: 1, delay: 0.45 },
    ] as Root[],
  },
  mobile: {
    viewBox: "0 0 390 420",
    fit: "xMidYMid meet",
    items: [
      { d: "M195 0 C195 60 170 110 120 150 C80 180 40 190 0 230", w: 2.4, delay: 0 },
      { d: "M195 0 C196 70 230 120 280 160 C320 190 360 200 390 240", w: 2.4, delay: 0.6 },
      { d: "M195 0 C194 100 190 200 196 300 C200 350 190 390 186 420", w: 2.8, delay: 1.2 },
      { d: "M120 150 C100 200 80 260 30 330", w: 1.6, delay: 1.8 },
      { d: "M280 160 C300 220 330 270 370 340", w: 1.6, delay: 2.4 },
      { d: "M196 300 C230 330 260 360 280 420", w: 1.3, delay: 3 },
      { d: "M196 300 C160 330 130 370 110 420", w: 1.3, delay: 0.3 },
      { d: "M30 330 C20 360 10 390 0 410", w: 1, delay: 0.9 },
      { d: "M370 340 C380 370 386 390 390 410", w: 1, delay: 1.5 },
    ] as Root[],
  },
} as const;

export const WORDS: Record<"desktop" | "mobile", Word[]> = {
  desktop: [
    { t: "Laravel", x: "9%", y: "22%", size: 22, rotate: -6 },
    { t: "Symfony", x: "22%", y: "58%", size: 18, rotate: 4 },
    { t: "React", x: "38%", y: "30%", size: 26, rotate: -3 },
    { t: "Next.js", x: "31%", y: "82%", size: 16, rotate: 8 },
    { t: "TypeScript", x: "52%", y: "70%", size: 20, rotate: -5 },
    { t: "REST APIs", x: "62%", y: "20%", size: 17, rotate: 3 },
    { t: "Docker", x: "74%", y: "86%", size: 22, rotate: -8 },
    { t: "MySQL", x: "86%", y: "62%", size: 18, rotate: 6 },
    { t: "MongoDB", x: "12%", y: "86%", size: 17, rotate: -2 },
    { t: "Redis", x: "45%", y: "48%", size: 15, rotate: 10 },
    { t: "GCP", x: "92%", y: "30%", size: 20, rotate: -4 },
    { t: "webhooks()", x: "66%", y: "50%", size: 15, rotate: 5 },
  ],
  mobile: [
    { t: "Laravel", x: "10%", y: "74%", size: 14, rotate: -6, delay: 0 },
    { t: "React", x: "64%", y: "82%", size: 14, rotate: 4, delay: 2 },
    { t: "TypeScript", x: "28%", y: "90%", size: 14, rotate: -3, delay: 4 },
  ],
};

export const FIREFLIES: Record<"desktop" | "mobile", Dot[]> = {
  desktop: [
    { x: "6%", y: "30%", dur: 3, delay: 0 }, { x: "14%", y: "64%", dur: 4, delay: 1.2 },
    { x: "27%", y: "44%", dur: 3.5, delay: 0.4 }, { x: "36%", y: "78%", dur: 5, delay: 2 },
    { x: "48%", y: "58%", dur: 3.2, delay: 1.6 }, { x: "61%", y: "82%", dur: 4.4, delay: 0.8 },
    { x: "70%", y: "66%", dur: 3.8, delay: 2.4 }, { x: "82%", y: "80%", dur: 4.6, delay: 0.2 },
    { x: "90%", y: "48%", dur: 3.4, delay: 1.4 }, { x: "96%", y: "72%", dur: 5.2, delay: 3 },
  ],
  mobile: [
    { x: "10%", y: "80%", dur: 4, delay: 0 },
    { x: "48%", y: "90%", dur: 5, delay: 1.6 },
    { x: "86%", y: "76%", dur: 4.4, delay: 0.8 },
  ],
};

export const POLLEN: Record<"desktop" | "mobile", Dot[]> = {
  desktop: [
    { x: "8%", y: "78%", dur: 9, delay: 0 }, { x: "18%", y: "88%", dur: 11, delay: 2 },
    { x: "30%", y: "70%", dur: 10, delay: 4.5 }, { x: "42%", y: "90%", dur: 12, delay: 1 },
    { x: "58%", y: "82%", dur: 9.5, delay: 3 }, { x: "66%", y: "92%", dur: 13, delay: 6 },
    { x: "74%", y: "76%", dur: 10.5, delay: 0.5 }, { x: "84%", y: "88%", dur: 11.5, delay: 5 },
    { x: "92%", y: "80%", dur: 9, delay: 7 },
  ],
  mobile: [
    { x: "62%", y: "72%", dur: 11, delay: 0 },
    { x: "78%", y: "58%", dur: 12, delay: 4 },
    { x: "50%", y: "44%", dur: 10, delay: 7 },
  ],
};

export const SPROUT = {
  stem: "M110 280 C110 230 104 180 112 120 C116 90 112 60 118 30",
  leaves: [
    { d: "M110 210 C84 196 58 200 34 220 C60 230 90 226 110 210 Z", origin: "110px 210px", scale: "--leaf-a", delay: 100 },
    { d: "M112 160 C138 140 164 142 188 158 C164 172 136 172 112 160 Z", origin: "112px 160px", scale: "--leaf-b", delay: 250 },
    { d: "M114 100 C92 84 70 84 52 96 C72 110 96 110 114 100 Z", origin: "114px 100px", scale: "--leaf-c", delay: 400 },
  ],
  bud: { d: "M118 30 C126 12 142 4 162 4 C156 22 140 34 118 30 Z", origin: "118px 30px", delay: 550 },
} as const;
