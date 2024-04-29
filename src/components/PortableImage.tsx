import { getImageDimensions } from "@sanity/asset-utils"
import { urlForImage } from '~/lib/sanity.image'

export default function PortableImage({ value }) {
  const { width, height } = getImageDimensions(value)
  const imageURL = urlForImage(value).url();
  
  return (
    <img
      src={imageURL}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        maxWidth: '100%',
        aspectRatio: width / height,
      }}
    />
  )
}