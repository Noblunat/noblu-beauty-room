import Image from "next/image";

type ServiceGalleryProps = {
  id: string;
  title: string;
  images: { src: string; alt: string }[];
};

export default function ServiceGallery({ id, title, images }: ServiceGalleryProps) {
  const single = images.length === 1;

  return (
    <section aria-labelledby={id} className="px-6 pb-24 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 id={id} className="text-3xl font-light text-[#1D1D1B] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className={single ? "mt-10 max-w-sm" : "mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"}>
          {images.map((image) => (
            <figure key={image.src} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#E8DED2]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={single
                  ? "(min-width: 432px) 384px, calc(100vw - 48px)"
                  : "(min-width: 1120px) 331px, (min-width: 1024px) calc((100vw - 128px) / 3), (min-width: 640px) calc((100vw - 80px) / 3), calc(100vw - 48px)"}
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
