import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils"
import { urlForImage } from '~/lib/sanity.image'
import styles from '~/styles/components/image.module.css';

export default function PortableImage({ value }) {
  const { width, height } = getImageDimensions(value)
  const imageURL = urlForImage(value).url();


  return (
    <div className={styles[value.layout]}>
      <img
        src={imageURL}
        alt={value.alt || ' '}
        loading="lazy"
        className={value.layout !== 'block' ? styles['flex-image']: ''}
        style={{
          maxWidth: '100%',
          aspectRatio: width / height,
          margin: value.layout === 'block' ? '0 auto': '',
          display: 'block'
        }}
      />
      <PortableText value={value.text} components={{ types: { image: PortableImage } }} />
    </div>
  )
}