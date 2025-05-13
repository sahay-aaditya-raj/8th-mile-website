import domToImage from 'dom-to-image-more';

export const generateAndDownloadImage = async (
  element: HTMLElement | null, 
  filename: string
): Promise<void> => {
  if (!element) {
    console.error('No element provided for image generation');
    return;
  }

  try {
    // Prepare the element for rendering by adding extra space around it
    const originalStyles = {
      padding: element.style.padding,
      margin: element.style.margin,
      transform: element.style.transform,
      position: element.style.position,
    };

    // Temporariy add a class and some extra padding for better results
    element.classList.add('rendering');
    
    // Generate the image at 2x scale for better quality
    const dataUrl = await domToImage.toPng(element, {
      height: element.offsetHeight * 2,
      width: element.offsetWidth * 2,
      style: {
        transform: 'scale(2)',
        transformOrigin: 'top left',
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
      },
      quality: 1
    });
    
    // Restore original styles
    element.classList.remove('rendering');
    
    // Create download link and trigger download
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
    alert('Failed to generate image. Please try again.');
  }
};

// Additional utility function for creating an image blob
export const generateImageBlob = async (
  element: HTMLElement | null
): Promise<Blob | null> => {
  if (!element) {
    console.error('No element provided for image generation');
    return null;
  }

  try {
    element.classList.add('rendering');
    
    const blob = await domToImage.toBlob(element, {
      height: element.offsetHeight * 2,
      width: element.offsetWidth * 2,
      style: {
        transform: 'scale(2)',
        transformOrigin: 'top left',
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
      },
      quality: 1
    });
    
    element.classList.remove('rendering');
    return blob;
  } catch (error) {
    console.error('Error generating image blob:', error);
    return null;
  }
};