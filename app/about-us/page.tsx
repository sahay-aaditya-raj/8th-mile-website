// app/about/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-8">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-center mb-5">About Us</h1>

      {/* About RVCE Section */}
      <div className="mb-5">
        <Card>
          <CardHeader>
            <CardTitle className="samarkan text-2xl">About R.V. College of Engineering</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              R.V. College of Engineering (RVCE), established in 1963, is one of the premier autonomous engineering colleges in India. Affiliated to VTU, Belagavi, it is accredited by NAAC with &lsquo;A++&rsquo; Grade and NBA. The college offers undergraduate and postgraduate programs in various engineering disciplines.
            </p>
            <p className="text-muted-foreground mb-4">
              RVCE has been consistently ranked among the top engineering colleges in India by various ranking agencies. The college has state-of-the-art infrastructure, modern laboratories, and a well-equipped library. The campus is spread over 90 acres with lush green surroundings providing an ideal environment for learning.
            </p>
            <p className="text-muted-foreground mb-4">
              The college has produced numerous successful engineers, entrepreneurs, and researchers who have made significant contributions to the field of engineering and technology.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* About 8th Mile Section */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="samarkan text-2xl">About 8th Mile Fest</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              8th Mile is the annual techno-cultural fest organized by R.V. College of Engineering. It is one of the most anticipated events on campus, bringing together students from various colleges to participate in a wide range of technical, cultural, and fun-filled activities.
            </p>
            <p className="text-muted-foreground mb-4">
              The fest showcases student talent through competitions, exhibitions, performances, and guest sessions from industry experts and artists. It aims to foster creativity, innovation, and collaboration among students.
            </p>
            <p className="text-muted-foreground mb-4">
              8th Mile has grown to become a platform that celebrates knowledge, culture, and student engagement — truly embodying the vibrant spirit of RVCE.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
