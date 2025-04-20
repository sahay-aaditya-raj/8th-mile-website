'use client';

import { useRef } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Card, CardContent } from '@/components/ui/card';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from 'next/image';

function ThreeDCardDemo() {
    return (
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            Make things float in air
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            Hover over this card to unleash the power of CSS perspective
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/images/image1.jpeg"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as="a"
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Sign up
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    );
  }

export default function ParallaxPage() {
  const contentRef = useRef(null);

  return (
    <div className="min-h-screen">
      {/* First Hero Section */}
      <ParallaxBanner
        layers={[
          {
            speed: -20,
            children: (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-700 to-blue-500">
                <div className="text-center p-4">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Welcome to Our Universe</h1>
                  <p className="text-xl md:text-2xl text-white mb-8">Scroll down to explore more</p>
                </div>
              </div>
            ),
          },
        ]}
        className="min-h-screen"
      />

      {/* Content Section with Sticky Image */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sticky Image Side */}
        <div className="md:w-1/2 relative">
          <div className="sticky top-0 h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
            <Image 
              src="/home-bg.png" 
              alt="Placeholder" 
              width={600}
              height={800}
              className="object-cover rounded-lg shadow-xl max-h-4/5 max-w-4/5"
            />
          </div>
        </div>

        {/* Scrolling Text Content */}
        <div ref={contentRef} className="md:w-1/2 p-6 md:p-12">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
              </p>
              <p className="text-lg mb-4">
                Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-4">
                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
              </p>
              <p className="text-lg mb-4">
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras mattis consectetur purus sit amet fermentum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
              </p>
              <p className="text-lg mb-4">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg mb-4">
                Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
              </p>
              <p className="text-lg mb-4">
                Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
              <p className="text-lg mb-4">
                Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              </p>
              <p className="text-lg mb-4">
                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sed posuere consectetur est at lobortis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final Hero Section */}
      <ParallaxBanner
        layers={[
          {
            speed: -20,
            children: (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500">
                <div className="text-center p-4">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Join Our Journey</h1>
                  <p className="text-xl md:text-2xl text-white mb-8">Let&apos;s create something amazing together</p>
                  <ThreeDCardDemo/>
                </div>
              </div>
            ),
          },
        ]}
        className="min-h-screen"
      />
    </div>
  );
}