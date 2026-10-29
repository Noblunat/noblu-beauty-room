import { business } from "./business";

export type GalleryItem = {
  src: string;
  type: "image" | "video";
  category: string;
  poster?: string;
  alt: string;
};

export const galleryItems: GalleryItem[] = [
  // Kolejność jest celowo mieszana, żeby filmy nie pojawiały się obok siebie.
  {
    src: "/gallery/salon/salon.mp4",
    type: "video",
    category: "Salon",
    poster: "/gallery/salon/salon1.webp",
    alt: "Podgląd filmu: wejście do Noblu i szyld salonu",
  },
  {
    src: "/gallery/salon/salon7.webp",
    type: "image",
    category: "Salon",
    alt: "Stanowisko manicure przy oknie i drewnianej ściance w Noblu",
  },
  {
    src: "/gallery/paznokcie/manicure-hybrydowy-blekitny-krakow-noblu.webp",
    type: "image",
    category: "Paznokcie",
    alt: "Błękitne paznokcie z jasnym zdobieniem na dwóch palcach",
  },
  {
    src: "/gallery/salon/salon2.mp4",
    type: "video",
    category: "Salon",
    poster: "/gallery/salon/salon4.webp",
    alt: "Podgląd filmu: wyposażone stanowisko manicure przy oknie",
  },
  {
    src: "/gallery/rzesy/stylizacja-rzes-krakow-noblu.webp",
    type: "image",
    category: "Rzęsy",
    alt: `Stylizacja rzęs w ${business.name} Kraków`,
  },
  {
    src: "/gallery/salon/salon5.webp",
    type: "image",
    category: "Salon",
    alt: "Filiżanka kawy na białym blacie w salonie Noblu",
  },
  {
    src: "/gallery/salon/salon3.mp4",
    type: "video",
    category: "Salon",
    poster: "/gallery/salon/salon5.webp",
    alt: `Podgląd filmu: kawa na blacie w ${business.name}`,
  },
  {
    src: "/gallery/paznokcie/IMG_2406(2).webp",
    type: "image",
    category: "Paznokcie",
    alt: "Ciemnozielone paznokcie z brokatem i kwadratową końcówką",
  },
  {
    src: "/gallery/salon/salon6.webp",
    type: "image",
    category: "Salon",
    alt: `Stolik do manicure z lampą i białymi fotelami w ${business.name}`,
  },
  {
    src: "/gallery/salon/salon5.mp4",
    type: "video",
    category: "Salon",
    poster: "/gallery/salon/salon6.webp",
    alt: "Podgląd filmu: stolik do manicure i fotele klientek",
  },
  {
    src: "/gallery/rzesy/IMG_6993(1).webp",
    type: "image",
    category: "Rzęsy",
    alt: "Zbliżenie oka z wyraźnie podkreśloną linią rzęs",
  },
  {
    src: "/gallery/paznokcie/IMG_2440(1).webp",
    type: "image",
    category: "Paznokcie",
    alt: "Czerwone paznokcie o kwadratowym kształcie",
  },
  {
    src: "/gallery/salon/salon6.mp4",
    type: "video",
    category: "Salon",
    poster: "/gallery/salon/salon8.webp",
    alt: "Podgląd filmu: herbata w słonecznym wnętrzu salonu",
  },
  {
    src: "/gallery/salon/salon8.webp",
    type: "image",
    category: "Salon",
    alt: "Herbata przy oknie salonu w popołudniowym słońcu",
  },
  {
    src: "/gallery/paznokcie/manicure-hybrydowy-nude-krakow-noblu.webp",
    type: "image",
    category: "Paznokcie",
    alt: `Naturalny manicure hybrydowy nude w ${business.name} Kraków`,
  },
  {
    src: "/gallery/salon/salon8.mp4",
    type: "video",
    category: "Salon",
    poster: "/gallery/salon/salon9.webp",
    alt: "Podgląd filmu: poczęstunek dla klientek z logo Noblu",
  },
  {
    src: "/gallery/rzesy/przedluzanie-rzes-krakow-noblu.webp",
    type: "image",
    category: "Rzęsy",
    alt: `Przedłużanie rzęs w ${business.name} Kraków`,
  },
  {
    src: "/gallery/paznokcie/paznokcie-hybrydowe-ombre-krakow-noblu.webp",
    type: "image",
    category: "Paznokcie",
    alt: `Paznokcie hybrydowe ombre ze zdobieniem w ${business.name} Kraków`,
  },
  {
    src: "/gallery/salon/salon1.webp",
    type: "image",
    category: "Salon",
    alt: `Wejście do ${business.name} z szyldem przy ${business.address.shortStreetLocative}`,
  },
  {
    src: "/gallery/paznokcie/manicure-video-krakow-noblu.mp4",
    type: "video",
    category: "Paznokcie",
    poster: "/gallery/paznokcie/IMG_7523.webp",
    alt: "Podgląd filmu ze stylizacją paznokci w jasnoróżowym kolorze",
  },
  {
    src: "/gallery/salon/salon9.webp",
    type: "image",
    category: "Salon",
    alt: "Szklana patera z cukierkami Noblu na tle wnętrza salonu",
  },
  {
    src: "/gallery/paznokcie/IMG_6470.webp",
    type: "image",
    category: "Paznokcie",
    alt: "Paznokcie na różowej bazie z niebieskimi zdobieniami",
  },
  {
    src: "/gallery/rzesy/IMG_9083.webp",
    type: "image",
    category: "Rzęsy",
    alt: "Stylizacja rzęs na obu oczach klientki w salonie",
  },
  {
    src: "/gallery/salon/salon11.webp",
    type: "image",
    category: "Salon",
    alt: "Cukierki z logo Noblu przygotowane dla klientek przy stanowisku manicure",
  },
  {
    src: "/gallery/paznokcie/IMG_6724.webp",
    type: "image",
    category: "Paznokcie",
    alt: "Pastelowe ombre w odcieniach błękitu i fioletu",
  },
  {
    src: "/gallery/salon/salon12.webp",
    type: "image",
    category: "Salon",
    alt: "Drzwi z napisem Gabinet i widok na pomieszczenie zabiegowe Noblu",
  },
  {
    src: "/gallery/paznokcie/IMG_6737(1).webp",
    type: "image",
    category: "Paznokcie",
    alt: "Zbliżenie błękitno-fioletowej stylizacji ombre",
  },
  {
    src: "/gallery/paznokcie/IMG_6990.webp",
    type: "image",
    category: "Paznokcie",
    alt: "French z białą końcówką i delikatnym połyskiem",
  },
  {
    src: "/gallery/paznokcie/IMG_7021.webp",
    type: "image",
    category: "Paznokcie",
    alt: "Krótkie kwadratowe paznokcie w czterech pastelowych kolorach",
  },
  {
    src: "/gallery/paznokcie/IMG_7523.webp",
    type: "image",
    category: "Paznokcie",
    alt: "Krótkie paznokcie w jasnoróżowym kolorze",
  },
];
