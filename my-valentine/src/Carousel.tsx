//import React from 'react'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
// Only keep withPrefix if you plan to mix local images with the URLs
//import { withPrefix } from 'gatsby' 

interface CarouselProps {
  photos: string[];
}

export const CarouselCrossfadeExample = ({ photos }: CarouselProps) => {
  return (
    <CCarousel controls transition="crossfade" interval={3000}>
      {photos.map((url, index) => (
        <CCarouselItem key={index}>
          <CImage 
            className="d-block w-100" 
            src={url} 
            alt={`Slide ${index + 1}`} 
            style={{ 
              borderRadius: '15px', 
              objectFit: 'cover', 
              aspectRatio: '4/5' // Keeps images consistent
            }}
          />
        </CCarouselItem>
      ))}
    </CCarousel>
  )
}