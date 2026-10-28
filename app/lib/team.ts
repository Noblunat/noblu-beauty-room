export const teamUpdatedAt = "2026-10-27";
export const staff = {
  natalia: {
    id: "natalia", name: "Natalia", label: "Natalia", image: "/team/natalia-noblu.jpg", role: "Właścicielka salonu",
    description: ["Moim celem jest tworzenie trwałych i estetycznych stylizacji paznokci. Szczególną uwagę poświęcam skórze, ponieważ bez bezpiecznego opracowania manicure czy pedicure, żaden kolor nie będzie robił wrażenia."],
  },
  julia: {
    id: "julia", name: "Julia", label: "Julia (stylistka junior)", image: "/team/julia-noblu.jpg", role: undefined,
    description: ["Stylistka paznokci z zamiłowaniem do szalonych stylizacji oraz zdobień 3D. Kreatywność to moje drugie imię.", "Zmalujmy razem coś wyjątkowego!"],
  },
} as const;
export type StaffId = keyof typeof staff;
