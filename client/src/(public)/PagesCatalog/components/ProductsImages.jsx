export function ProductsImages({ relatedImages }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {relatedImages.map((image, index) => (
        <div key={index} className="">
          <img
            src={image}
            alt={`Related image ${index + 1}`}
            className="h-[500px] w-full object-cover rounded-3xl"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}