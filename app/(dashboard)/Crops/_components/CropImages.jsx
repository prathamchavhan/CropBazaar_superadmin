export default function CropImages({ images }) {
  if (!images?.length) return null;

  return (
    <div className="flex gap-3 mt-3 overflow-x-auto">
      {images.map((url, i) => (
        <img
          key={i}
          src={url}
          className="w-32 h-32 object-cover rounded border"
        />
      ))}
    </div>
  );
}
