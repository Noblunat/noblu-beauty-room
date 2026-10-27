// Source: Booksy Biz, business 105150, read-only UI verification on 2026-10-26.
// Evidence is archived in the marketing workspace: work/booksy-catalog-2026-10-26.
export type BooksyService = {
  serviceId: number;
  name: string;
  category: string;
  description: string;
  variants: {name: string; pricePLN: number; durationMinutes: number; staff: string[]; booksyVariantId?: number}[];
};

export const booksyServices: BooksyService[] = [
  {
    "serviceId": 1571875,
    "name": "Stylizacja hybrydowa",
    "category": "Stylizacja hybrydowa",
    "description": "Usunięcie poprzedniej stylizacji wykonanej przeze mnie, manicure z opracowaniem skórek, stylizacja hybrydowa jednym kolorem.",
    "variants": [
      {
        "name": "Natalia",
        "pricePLN": 160,
        "durationMinutes": 90,
        "staff": [
          "Natalia"
        ],
        "booksyVariantId": 6017028
      },
      {
        "name": "Julia - Stylistka Junior",
        "pricePLN": 130,
        "durationMinutes": 120,
        "staff": [
          "Julia"
        ],
        "booksyVariantId": 23177096
      }
    ]
  },
  {
    "serviceId": 8288958,
    "name": "MODELKA hybryda na naturalnej płytce",
    "category": "Stylizacja hybrydowa",
    "description": "Zapraszamy na manicure hybrydowy w roli modelki do doskonalenia techniki i czasu pracy dla naszej nowej stylistki!\n \nJeśli masz naturalną płytkę oraz chęć spędzenia na paznokciach odrobinę więcej czasu, ta opcja jest dla Ciebie!\n \nJeśli masz ochotę zadbać o swoje paznokcie oraz pomóc naszej stylistce rozwinąć skrzydła - zapraszamy! \n \nUwaga: ta opcja dotyczy wyłącznie hybrydy na naturalnej płytce, bez żelu oraz przedłużania. Możesz mieć poprzednią stylizację jeśli też jest ona hybrydą.",
    "variants": [
      {
        "name": "MODELKA hybryda na naturalnej płytce",
        "pricePLN": 80,
        "durationMinutes": 150,
        "staff": [
          "Julia"
        ]
      }
    ]
  },
  {
    "serviceId": 1770927,
    "name": "Stylizacja hybrydowa - więcej niż 1 kolor",
    "category": "Stylizacja hybrydowa",
    "description": "Usunięcie poprzedniej stylizacji wykonanej przeze mnie, manicure z opracowaniem skórek, stylizacja hybrydowa z użyciem więcej niż jednego koloru.",
    "variants": [
      {
        "name": "Natalia",
        "pricePLN": 170,
        "durationMinutes": 90,
        "staff": [
          "Natalia"
        ],
        "booksyVariantId": 6017045
      },
      {
        "name": "Julia - Stylistka Junior",
        "pricePLN": 140,
        "durationMinutes": 130,
        "staff": [
          "Julia"
        ],
        "booksyVariantId": 23177111
      }
    ]
  },
  {
    "serviceId": 1670867,
    "name": "Usunięcie stylizacji hybrydowej z manicure",
    "category": "Stylizacja hybrydowa",
    "description": "Usunięcie stylizacji hybrydowej, manicure z opracowaniem skórek, wykończenie odżywką na życzenie klientki.",
    "variants": [
      {
        "name": "Usunięcie stylizacji hybrydowej z manicure",
        "pricePLN": 120,
        "durationMinutes": 60,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 1670885,
    "name": "Naprawa jednego paznokcia",
    "category": "Stylizacja hybrydowa",
    "description": "Usunięcie pozostałości stylizacji z paznokcia, korekta manicure, stylizacja hybrydowa.",
    "variants": [
      {
        "name": "Naprawa jednego paznokcia",
        "pricePLN": 30,
        "durationMinutes": 20,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 1670869,
    "name": "Żel na naturalnej płytce - paznokcie przed opuszek",
    "category": "Stylizacja żelowa",
    "description": "Usunięcie poprzedniej stylizacji wykonanej przeze mnie, manicure z opracowaniem skórek, wzmocnienie żelem naturalnej płytki paznokci, stylizacja hybrydowa w jednym kolorze.\nDotyczy stylizacji bez korekty paznokci rosnących w dół, oraz w przypadku wykonywania jej przy wszystkich paznokciach naturalnych o długości maksymalnej do opuszka. Gdy część paznokci jest przedłużonych, lub długość paznokci jest za opuszek - wykonywana jest usługa uzupełniania żelowego.",
    "variants": [
      {
        "name": "Żel na naturalnej płytce - paznokcie przed opuszek",
        "pricePLN": 180,
        "durationMinutes": 115,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 8300280,
    "name": "Przedłużenie żelowe na tipsie",
    "category": "Stylizacja żelowa",
    "description": "Usługa zawiera opracowanie skórek, przygotowanie paznokci do przedłużenia, przedłużenie na flexy tipsach, wyrównanie, nałożenie koloru.",
    "variants": [
      {
        "name": "Przedłużenie żelowe na tipsie",
        "pricePLN": 180,
        "durationMinutes": 155,
        "staff": [
          "Julia"
        ]
      }
    ]
  },
  {
    "serviceId": 5368098,
    "name": "Żel na naturalnej płytce - paznokcie za opuszek",
    "category": "Stylizacja żelowa",
    "description": "Usunięcie poprzedniej stylizacji wykonanej przeze mnie, manicure z opracowaniem skórek, wzmocnienie żelem naturalnej płytki paznokci, stylizacja hybrydowa w jednym kolorze.\nDotyczy stylizacji bez korekty paznokci rosnących w dół, oraz w przypadku wykonywania jej przy wszystkich paznokciach naturalnych dłuższych niż do opuszka. Gdy część paznokci jest przedłużonych - wykonywana jest usługa uzupełniania żelowego.",
    "variants": [
      {
        "name": "Żel na naturalnej płytce - paznokcie za opuszek",
        "pricePLN": 190,
        "durationMinutes": 130,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 1670872,
    "name": "Przedłużenie żelowe na szablonie",
    "category": "Stylizacja żelowa",
    "description": "Manicure z opracowaniem skórek, przedłużenie żelem na szablonie, stylizacja hybrydowa w jednym kolorze.",
    "variants": [
      {
        "name": "Przedłużenie żelowe na szablonie",
        "pricePLN": 220,
        "durationMinutes": 150,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 1670879,
    "name": "Uzupełnienie żelowe",
    "category": "Stylizacja żelowa",
    "description": "Usunięcie poprzedniej stylizacji wykonanej przeze mnie, manicure z opracowaniem skórek, uzupełnienie żelu, korekta paznokci opadających w razie potrzeby, stylizacja hybrydowa w jednym kolorze.",
    "variants": [
      {
        "name": "Uzupełnienie żelowe",
        "pricePLN": 190,
        "durationMinutes": 130,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 1670883,
    "name": "Usunięcie stylizacji żelowej z manicure",
    "category": "Stylizacja żelowa",
    "description": "Usunięcie stylizacji żelowej, manicure z opracowaniem skórek, wykończenie odżywką na życzenie klienta.",
    "variants": [
      {
        "name": "Usunięcie stylizacji żelowej z manicure",
        "pricePLN": 140,
        "durationMinutes": 70,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 4764877,
    "name": "Usunięcie hybrydy z pedicure SPA",
    "category": "Pedicure",
    "description": "Usługa zawiera: aromatyczną kąpiel stóp, usunięcie hybrydy, pełne opracowanie stopy, opracowanie paznokci oraz skórek, wykończenie zabiegu polerowaniem lub peelingiem w zależności od stanu stopy. Na życzenie możliwość wykończenia paznokci odżywką tradycyjną.",
    "variants": [
      {
        "name": "Usunięcie hybrydy z pedicure SPA",
        "pricePLN": 190,
        "durationMinutes": 75,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 4733643,
    "name": "Pedicure hybrydowy same paznokcie",
    "category": "Pedicure",
    "description": "Usługa zawiera opracowanie paznokci oraz skórek u stóp i malowanie lakierem hybrydowym w jednym kolorze",
    "variants": [
      {
        "name": "Natalia",
        "pricePLN": 160,
        "durationMinutes": 80,
        "staff": [
          "Natalia"
        ],
        "booksyVariantId": 14208784
      },
      {
        "name": "Julia - Stylistka Junior",
        "pricePLN": 130,
        "durationMinutes": 100,
        "staff": [
          "Julia"
        ],
        "booksyVariantId": 23177076
      }
    ]
  },
  {
    "serviceId": 4733644,
    "name": "Pedicure SPA z hybrydą",
    "category": "Pedicure",
    "description": "Usługa zawiera: aromatyczną kąpiel stóp, pełne opracowanie stopy, opracowanie skórek oraz paznokci, malowanie lakierem hybrydowym w jednym kolorze, wykończenie polerowaniem lub peelingiem w zależności od stanu stóp.",
    "variants": [
      {
        "name": "Pedicure SPA z hybrydą",
        "pricePLN": 200,
        "durationMinutes": 100,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 4733645,
    "name": "Pedicure SPA bez hybrydy",
    "category": "Pedicure",
    "description": "Usługa zawiera: aromatyczną kąpiel stóp, pełne opracowanie stopy, opracowanie skórek oraz paznokci, wykończenie polerowaniem lub peelingiem w zależności od stanu stóp. Na życzenie możliwość wykończenia paznokci odżywką tradycyjną.",
    "variants": [
      {
        "name": "Pedicure SPA bez hybrydy",
        "pricePLN": 180,
        "durationMinutes": 70,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 4733648,
    "name": "Pedicure same paznokcie bez hybrydy",
    "category": "Pedicure",
    "description": "Usługa zawiera: opracowanie paznokci oraz skórek u stóp, wykończenie odżywką tradycyjną.",
    "variants": [
      {
        "name": "Pedicure same paznokcie bez hybrydy",
        "pricePLN": 100,
        "durationMinutes": 40,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 4764873,
    "name": "Usunięcie hybrydy z pedicure same paznokcie",
    "category": "Pedicure",
    "description": "Usługa zawiera: usunięcie hybrydy, opracowanie paznokci oraz skórek, na życzenie możliwość wykończenia paznokci odżywką tradycyjną.",
    "variants": [
      {
        "name": "Natalia",
        "pricePLN": 120,
        "durationMinutes": 50,
        "staff": [
          "Natalia"
        ],
        "booksyVariantId": 14324659
      },
      {
        "name": "Julia - Stylistka Junior",
        "pricePLN": 100,
        "durationMinutes": 60,
        "staff": [
          "Julia"
        ],
        "booksyVariantId": 23177122
      }
    ]
  },
  {
    "serviceId": 1571874,
    "name": "Manicure",
    "category": "Manicure",
    "description": "Manicure z opracowaniem skórek, wykończenie odżywką na życzenie klientki.",
    "variants": [
      {
        "name": "Manicure",
        "pricePLN": 100,
        "durationMinutes": 50,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 1770810,
    "name": "Manicure męski",
    "category": "Manicure",
    "description": "Manicure z opracowaniem skórek, wykończenie odżywką na życzenie klienta.",
    "variants": [
      {
        "name": "Manicure męski",
        "pricePLN": 100,
        "durationMinutes": 50,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 7597933,
    "name": "Manicure z laminacją paznokci - NOWOŚĆ",
    "category": "Laminacja paznokci",
    "description": "Manicure z opracowaniem paznokci i skórek oraz laminacją Bye Bye Repair System Yokaba.",
    "variants": [
      {
        "name": "Manicure z laminacją paznokci - NOWOŚĆ",
        "pricePLN": 130,
        "durationMinutes": 60,
        "staff": [
          "Natalia"
        ]
      }
    ]
  },
  {
    "serviceId": 7597949,
    "name": "Laminacja paznokci - NOWOŚĆ",
    "category": "Laminacja paznokci",
    "description": "Laminacja paznokci Bye Bye Repair System Yokaba, bez opracowania paznokci i skórek.",
    "variants": [
      {
        "name": "Laminacja paznokci - NOWOŚĆ",
        "pricePLN": 50,
        "durationMinutes": 20,
        "staff": [
          "Natalia"
        ]
      }
    ]
  }
];

export const booksyAddons = [
  {
    "name": "Usunięcie stylizacji z innego salonu",
    "priceType": "Darmowa",
    "pricePLN": 0,
    "durationMinutes": 5,
    "description": "Usunięcie stylizacji wykonanej w innym salonie przed wykonaniem usługi.",
    "linkedServices": [
      {
        "serviceId": 1571875,
        "name": "Stylizacja hybrydowa"
      },
      {
        "serviceId": 1770927,
        "name": "Stylizacja hybrydowa - więcej niż 1 kolor"
      },
      {
        "serviceId": 1670869,
        "name": "Żel na naturalnej płytce - paznokcie przed opuszek"
      },
      {
        "serviceId": 1670872,
        "name": "Przedłużenie żelowe na szablonie"
      },
      {
        "serviceId": 1670879,
        "name": "Uzupełnienie żelowe"
      },
      {
        "serviceId": 4733643,
        "name": "Pedicure hybrydowy same paznokcie"
      },
      {
        "serviceId": 4733644,
        "name": "Pedicure SPA z hybrydą"
      }
    ]
  },
  {
    "name": "Zdobienie",
    "priceType": "Zaczyna się od",
    "pricePLN": 10,
    "durationMinutes": 15,
    "description": "Cena uzależniona od wielkości, ilości oraz trudności zdobienia. Ustalana indywidualnie podczas wizyty.",
    "linkedServices": [
      {
        "serviceId": 1571875,
        "name": "Stylizacja hybrydowa"
      },
      {
        "serviceId": 1670869,
        "name": "Żel na naturalnej płytce - paznokcie przed opuszek"
      },
      {
        "serviceId": 1670872,
        "name": "Przedłużenie żelowe na szablonie"
      },
      {
        "serviceId": 1670879,
        "name": "Uzupełnienie żelowe"
      }
    ]
  },
  {
    "name": "French/Ombre/Babyboomer",
    "priceType": "Stała",
    "pricePLN": 20,
    "durationMinutes": 20,
    "description": "",
    "linkedServices": [
      {
        "serviceId": 1571875,
        "name": "Stylizacja hybrydowa"
      },
      {
        "serviceId": 1670869,
        "name": "Żel na naturalnej płytce - paznokcie przed opuszek"
      },
      {
        "serviceId": 1670872,
        "name": "Przedłużenie żelowe na szablonie"
      },
      {
        "serviceId": 1670879,
        "name": "Uzupełnienie żelowe"
      }
    ]
  },
  {
    "name": "Pyłek",
    "priceType": "Stała",
    "pricePLN": 5,
    "durationMinutes": 5,
    "description": "",
    "linkedServices": [
      {
        "serviceId": 1571875,
        "name": "Stylizacja hybrydowa"
      },
      {
        "serviceId": 1770927,
        "name": "Stylizacja hybrydowa - więcej niż 1 kolor"
      },
      {
        "serviceId": 1670869,
        "name": "Żel na naturalnej płytce - paznokcie przed opuszek"
      },
      {
        "serviceId": 1670872,
        "name": "Przedłużenie żelowe na szablonie"
      },
      {
        "serviceId": 1670879,
        "name": "Uzupełnienie żelowe"
      }
    ]
  },
  {
    "name": "French",
    "priceType": "Stała",
    "pricePLN": 20,
    "durationMinutes": 10,
    "description": "",
    "linkedServices": [
      {
        "serviceId": 4733643,
        "name": "Pedicure hybrydowy same paznokcie"
      },
      {
        "serviceId": 4733644,
        "name": "Pedicure SPA z hybrydą"
      }
    ]
  },
  {
    "name": "Laminacja paznokci",
    "priceType": "Stała",
    "pricePLN": 30,
    "durationMinutes": 10,
    "description": "zabieg odbudowujący dla wzmocnienia naturalnych paznokci",
    "linkedServices": [
      {
        "serviceId": 1670867,
        "name": "Usunięcie stylizacji hybrydowej z manicure"
      },
      {
        "serviceId": 1670883,
        "name": "Usunięcie stylizacji żelowej z manicure"
      },
      {
        "serviceId": 4764877,
        "name": "Usunięcie hybrydy z pedicure SPA"
      },
      {
        "serviceId": 4733648,
        "name": "Pedicure same paznokcie bez hybrydy"
      },
      {
        "serviceId": 4764873,
        "name": "Usunięcie hybrydy z pedicure same paznokcie"
      },
      {
        "serviceId": 1571874,
        "name": "Manicure"
      }
    ]
  },
  {
    "name": "Zdobienie 3D",
    "priceType": "Zaczyna się od",
    "pricePLN": 20,
    "durationMinutes": 20,
    "description": "Np. kwiatki, cena obejmuje komplet - 1 kwiatek na 1 dłoni",
    "linkedServices": [
      {
        "serviceId": 8300280,
        "name": "Przedłużenie żelowe na tipsie"
      }
    ]
  }
];

export function serviceDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return [hours ? hours + "h" : "", remainder ? remainder + "min" : ""].filter(Boolean).join(" ");
}
