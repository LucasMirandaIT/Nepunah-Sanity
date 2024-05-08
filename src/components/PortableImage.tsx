import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils"
import { urlForImage } from '~/lib/sanity.image'

export default function PortableImage({ value }) {
  const { width, height } = getImageDimensions(value)
  const imageURL = urlForImage(value).url();

  const containerClasses = {
    flex: {display: 'flex', justifyContent: 'space-between'},
    'flex-reverse': {display: 'flex', flexDirection: 'row-reverse'},
    block: {display: 'block'}
  }

  const handleStyleForContainer = (layout) => {
    return {...containerClasses[layout], textAlign: 'justify'};
  };

  const flexMargin = value.layout === 'flex' ? '0 16px 0 0' : '0 0 0 16px';

  return (
    <div style={handleStyleForContainer(value.layout)}>
      <img
        src={imageURL}
        alt={value.alt || ' '}
        loading="lazy"
        style={{
          maxWidth: '100%',
          aspectRatio: width / height,
          width: value.layout !== 'block' ? '30%' : '80%',
          margin: value.layout === 'block' ? '0 auto': flexMargin,
          display: 'block'
        }}
      />
      <PortableText value={value.text} components={{ types: { image: PortableImage } }} />
    </div>
  )
}